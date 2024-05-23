import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the cookie from the request headers
  const cookie = request.headers.get('cookie');
  let userCookie = null;

  if (cookie) {
    // Parse the cookie
    const parsedCookies = Object.fromEntries(cookie.split('; ').map(c => c.split('=')));
    userCookie = parsedCookies['AuthToken'] || null;
    console.log(parsedCookies)
  }

  let isUser = userCookie !== null;

  if (!isUser && request.nextUrl.pathname === '/dashboard') {
    // PROTECT PAGE FROM UNAUTHORIZED ACCESS
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue to the next middleware or to the requested page
  return NextResponse.next();
}

// Define the matcher to apply this middleware to specific routes
export const config = {
  matcher: ['/dashboard/:path*'],  // Apply middleware to /dashboard and its subroutes
};