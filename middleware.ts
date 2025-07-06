import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_IDS: string[] = [
  "668b5ac1625cf0050152c15d",
  "62908e722b2c6a4345a309b2",
  "65dc5182bb27216490f8ee2e",
];

// Helpers
function getToken(req: NextRequest) {
  return req.cookies.get("token")?.value;
}
function getUserId(req: NextRequest) {
  return req.cookies.get("user_id")?.value;
}
function isAdmin(id?: string) {
  return !!id && ADMIN_IDS.includes(id);
}

// The one and only middleware function
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getToken(req);
  const userId = getUserId(req);

  // Public pages (blogs, home, about) are not in matcher,
  // so this function only runs for matched paths.

  // 1) Require login for /chatbot and /dashboard
  if (pathname.startsWith("/chatbot") || pathname.startsWith("/dashboard")) {
    if (!token || !userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 2) Require admin for /admin
  if (pathname.startsWith("/admin")) {
    if (!token || !userId || !isAdmin(userId)) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
    return NextResponse.next();
  }

  // 3) Other matched routes (if any) can go here...

  return NextResponse.next();
}

// Tell Next.js which paths invoke this middleware
export const config = {
  matcher: [
    "/chatbot/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    // add more protected prefixes here
  ],
};
