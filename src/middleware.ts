import { auth } from "@/auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const pathname = req.nextUrl.pathname;

  if (!isAuth && pathname !== "/" && pathname !== "/signin") {
    return Response.redirect(new URL("/", req.url));
  }

  if (isAuth && (pathname === "/" || pathname === "/signin")) {
    return Response.redirect(new URL("/home", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/error).*)"],
};
