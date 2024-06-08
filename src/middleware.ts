import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const pathname = req.nextUrl.pathname;

  if (
    !isAuth &&
    pathname !== "/" &&
    !pathname.startsWith("/signin") &&
    !pathname.startsWith("/error")
  ) {
    return Response.redirect(new URL("/", req.url));
  }

  if (isAuth && (pathname === "/" || pathname.startsWith("/signin"))) {
    return Response.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/error).*)"],
};
