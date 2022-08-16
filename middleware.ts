import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('jwt') || false;
  const { pathname } = req.nextUrl;

  if (!jwt && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/playlist/:path*',
    '/profile',
    '/watch-later',
    '/liked-videos',
    '/history'
  ]
};
