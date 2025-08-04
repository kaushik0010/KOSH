import { NextResponse, NextRequest } from 'next/server'
 
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  const {pathname} = request.nextUrl;

  const authRoutes = ['/login', '/register', '/verify'];
  const protectedRoutes = ['/dashboard', '/profile', '/individual', '/create-group', '/groups'];

  const isMatching = (pathname: string, routes: string[]) => 
      routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
  
  const isAuthPage = isMatching(pathname, authRoutes);
    
  const isProtectedPage = isMatching(pathname, protectedRoutes);

  const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET});


  if(token && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  
  if(!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/login',
    '/register',
    '/profile',
    '/verify/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/individual/:path*',
    '/create-group',
    '/groups/:path*'
]
}
