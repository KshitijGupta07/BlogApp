// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Public routes (no login required) — add/remove as you need
  const publicPaths = ['/login', '/register', '/help', '/favicon.ico'];

  // Skip Next.js internals and static files
  const isInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/api/auth') || // keep your auth endpoints open
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|map)$/);

  if (isInternal || publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Auth check via cookie (middleware can't read localStorage)
  const token = req.cookies.get('auth')?.value;

  if (!token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname); // redirect back after login
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Match all routes; we'll filter inside the middleware
export const config = {
  matcher: ['/:path*'],
};
