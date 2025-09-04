import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const publicPaths = ["/signin", "/signup", "/"]; // Corrected public paths
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value; // Check for accessToken cookie
  const refreshToken = request.cookies.get("refreshToken")?.value; // Check for accessToken cookie

  console.log(`[Middleware] Pathname: ${pathname}`);
  console.log(
    `[Middleware] AccessToken: ${accessToken ? "is present" : "not present"}`
  );
  console.log(
    `[Middleware] RefreshToken: ${refreshToken ? "is present" : "not present"}`
  );

  // If the path is public, allow access
  if (publicPaths.includes(pathname)) {
    console.log(`[Middleware] Path is public: ${pathname}`);
    // If user is already logged in and tries to access auth pages, redirect to home
    if (
      accessToken &&
      (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
    ) {
      // Corrected path check
      console.log(
        `[Middleware] Logged in user trying to access auth page. Redirecting to /`
      );
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // If the path is protected and no accessToken is found, redirect to signin
  if (!accessToken) {
    console.log(
      `[Middleware] Path is protected and accessToken is missing. Redirecting to /signin`
    ); // Corrected redirect path
    const signInUrl = new URL("/signin", request.url); // Corrected redirect URL
    // Optionally, add a redirect query param to go back after login
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If the path is protected and accessToken is found, allow access
  console.log(
    `[Middleware] Path is protected and accessToken is present. Allowing access.`
  );
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/disease-detection/:path*",
    "/crop-suggestions/:path*",
    "/garden/:path*",
  ],
};
