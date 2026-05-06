import { getPublicApiBase } from '@/lib/api/publicApiBase';

/**
 * Base URL of the API host (for Socket.io), e.g. http://localhost:4000
 * Prefer NEXT_PUBLIC_WS_URL when the socket is on a different host than REST.
 */
export function getApiOriginForSocket(): string {
  const ws = process.env.NEXT_PUBLIC_WS_URL?.trim();
  if (ws) {
    try {
      return new URL(ws).origin;
    } catch {
      return ws.replace(/\/$/, '');
    }
  }
  const b = getPublicApiBase();
  if (!b) return '';
  return b.replace(/\/api\/v1\/?$/, '');
}
