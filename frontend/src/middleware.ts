import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Rewrite /.admin directly to /admin/login
  if (pathname === '/.admin' || pathname === '/.admin/') {
    return NextResponse.rewrite(new URL('/admin/login', request.url));
  }

  // 2. Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;

    // If unauthenticated or not an admin, redirect to /.admin
    if (!token || role !== 'ADMIN') {
      const loginUrl = new URL('/.admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/.admin', '/.admin/:path*', '/admin/:path*'],
};
