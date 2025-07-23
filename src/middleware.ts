'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/actions/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isLoginRoute = pathname.startsWith('/admin/login');

  if (isAdminRoute && !session?.isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && session?.isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};