// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeBasic(b64: string) {
  try { return atob(b64); } catch { return ""; }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const user = process.env.ADMIN_USER || "viadan";
  const pass = process.env.ADMIN_PASS || "";

  const header = req.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }

  const decoded = decodeBasic(encoded);
  const [u, p] = decoded.split(":");
  if (u === user && p === pass) return NextResponse.next();

  return new NextResponse("Unauthorized", { status: 401 });
}

export const config = { matcher: ["/admin/:path*"] };
