// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Accept either pair so it "just works" with different setups
const USER = process.env.ADMIN_USER || process.env.BASIC_AUTH_USER || "";
const PASS = process.env.ADMIN_PASS || process.env.BASIC_AUTH_PASS || "";

export function middleware(req: NextRequest) {
  // If creds not configured, don't block (useful in local dev)
  if (!USER || !PASS) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme?.toLowerCase() === "basic" && encoded) {
      // Edge runtime: use atob (Buffer isn't available)
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      const u = decoded.slice(0, sep);
      const p = decoded.slice(sep + 1);
      if (u === USER && p === PASS) return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="ViaDan Admin"' },
  });
}

export const config = {
  // Protect /admin and everything under it, including /admin/api/*
  matcher: ["/admin/:path*"],
};
