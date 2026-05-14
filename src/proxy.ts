import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = '/dashboard';
const LOGIN = '/login';
const COOKIE_NAME = 'dashboard_session';
const SESSION_VALUE = 'authenticated';

// Next.js 16: renamed from middleware.ts → proxy.ts
// Function export is also renamed from `middleware` → `proxy`
// Runs on Node.js runtime (not Edge) by default in Next.js 16
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /dashboard and its sub-routes
  if (!pathname.startsWith(PROTECTED)) return NextResponse.next();

  const session = request.cookies.get(COOKIE_NAME)?.value;

  if (session === SESSION_VALUE) return NextResponse.next();

  // Not authenticated → redirect to /login, remembering the original destination
  const loginUrl = new URL(LOGIN, request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
