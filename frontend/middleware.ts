import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
