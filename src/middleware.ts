import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  if (request.nextUrl.pathname.startsWith('/profile')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*']
};
