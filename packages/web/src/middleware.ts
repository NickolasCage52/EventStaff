import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isWorkerRoute = pathname.startsWith('/worker');
  const isEmployerRoute = pathname.startsWith('/employer');
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isWorkerRoute && !isEmployerRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token validation and role enforcement happen on the API side.
  // If the token is expired the client-side apiClient will auto-refresh
  // (POST /auth/refresh) and retry the original request transparently.
  // If refresh fails (banned account, expired refresh token) the client
  // will redirect to /auth/login automatically.
  return NextResponse.next();
}

export const config = {
  matcher: ['/worker/:path*', '/employer/:path*', '/admin/:path*'],
};
