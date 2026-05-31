import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_URL = "https://jg-mobility-dashboard.vercel.app";
// "website" = public website only, "dashboard" = admin only
const role = process.env.DEPLOYMENT_ROLE ?? "website";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (role === "website") {
    // Website project: block all admin routes — stuur door naar het dashboard
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      return NextResponse.redirect(`${DASHBOARD_URL}${pathname}`);
    }
  } else {
    // Dashboard project: stuur de root direct door naar /admin
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Voeg pathname toe als header zodat layout.tsx hem kan lezen
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Admin auth — sla login pagina en login API over
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin" &&
    !pathname.startsWith("/api/admin/login")
  ) {
    const token = request.cookies.get("admin_token")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || !token || token !== adminPassword) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
