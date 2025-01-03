import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const publicPath = currentPath === "/login" || currentPath === "/signup" || currentPath === "/verifyemail"
    const token = request.cookies.get("token")
    if(publicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if(!publicPath && !token){
        return NextResponse.redirect(new URL('/signup', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
   "/",
   "/signup",
   "/login",
   "/profile",
   "/verifyemail"
  ],// put those path or array of path on which you want to run this middleware.
}