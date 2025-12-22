import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  /**
   * Optimistic auth check
   */
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    console.log('[PROXY] Auth check failed, Redirecting to register page...');
    return NextResponse.redirect(new URL('/auth/register', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|auth|_next/static|_next/image|.*\\.png$).*)'],
};
