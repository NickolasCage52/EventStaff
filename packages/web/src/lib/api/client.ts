import { getPublicApiBase } from '@/lib/api/publicApiBase';
import { useNetworkStore } from '@/stores/networkStore';

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Endpoints that should NOT trigger auto-refresh on 401
// (to prevent infinite loops)
const SKIP_REFRESH = new Set(['/auth/refresh', '/auth/logout', '/auth/login']);

// Shared promise so parallel 401s trigger only ONE refresh call
let refreshPromise: Promise<boolean> | null = null;

function tryRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${getPublicApiBase()}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

async function doLogout(): Promise<void> {
  try {
    await fetch(`${getPublicApiBase()}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // ignore network errors during logout
  }
  try {
    // Dynamically import to avoid circular deps at module load time
    const { useAuthStore } = await import('@/stores/authStore');
    useAuthStore.getState().logout();
  } catch {
    // ignore store errors
  }
  if (typeof window !== 'undefined') {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/auth/login?reason=session_expired&redirect=${redirect}`;
  }
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;

  let url = `${getPublicApiBase()}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)));
        } else {
          searchParams.set(key, String(value));
        }
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json', ...init.headers };

  let res: Response;
  try {
    res = await fetch(url, { ...init, headers, credentials: 'include' });
    // Successful network connection — clear error flag if set
    useNetworkStore.getState().setError(false);
  } catch (err) {
    // Network-level failure (no connection, DNS error, etc.)
    if (typeof window !== 'undefined') {
      useNetworkStore.getState().setError(true);
    }
    throw err;
  }

  // Auto-refresh on 401 (skip for auth endpoints to avoid loops)
  if (res.status === 401 && !SKIP_REFRESH.has(endpoint)) {
    const refreshed = await tryRefresh();

    if (refreshed) {
      // Retry the original request with the new access_token cookie
      const retryRes = await fetch(url, { ...init, headers, credentials: 'include' });
      const retryJson = await retryRes.json().catch(() => ({})) as Record<string, unknown>;
      if (!retryRes.ok) {
        const errObj = retryJson.error as Record<string, unknown> | undefined;
        throw new ApiError(
          retryRes.status,
          (typeof errObj?.message === 'string' ? errObj.message : null) ??
            (retryJson as { message?: string }).message ??
            `HTTP ${retryRes.status}`,
          typeof errObj?.code === 'string' ? errObj.code : undefined,
          errObj ?? retryJson,
        );
      }
      return retryJson as T;
    } else {
      // Refresh failed — session truly expired or account banned
      await doLogout();
      throw new ApiError(401, 'Сессия истекла. Пожалуйста, войдите снова.', 'SESSION_EXPIRED');
    }
  }

  const json = await res.json().catch(() => ({})) as Record<string, unknown>;

  if (!res.ok) {
    const errObj = json.error as Record<string, unknown> | undefined;
    const message =
      (typeof errObj?.message === 'string' ? errObj.message : null) ??
      (json as { message?: string }).message ??
      `HTTP ${res.status}`;
    const code = typeof errObj?.code === 'string' ? errObj.code : undefined;

    // 429 Too Many Requests — do NOT retry, let caller handle
    throw new ApiError(res.status, message, code, errObj ?? json);
  }

  return json as T;
}

export const apiClient = {
  get: <T>(endpoint: string, params?: FetchOptions['params']) =>
    request<T>(endpoint, { method: 'GET', params }),

  postMultipart: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const url = `${getPublicApiBase()}${endpoint}`;
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const json = await res.json().catch(() => ({})) as Record<string, unknown>;
    if (!res.ok) {
      const errObj = json.error as Record<string, unknown> | undefined;
      throw new ApiError(
        res.status,
        (typeof errObj?.message === 'string' ? errObj.message : null) ?? `HTTP ${res.status}`,
        typeof errObj?.code === 'string' ? errObj.code : undefined,
        errObj,
      );
    }
    return json as T;
  },

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
