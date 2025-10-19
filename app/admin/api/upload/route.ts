import { NextResponse } from "next/server";
import { generateUploadUrl } from "@vercel/blob";

// Reuse the same Basic Auth creds as /admin middleware
function isAuthed(req: Request) {
  const header = req.headers.get("authorization") || "";
  const [scheme, encoded] = header.split(" ");
  if (scheme !== "Basic" || !encoded) return false;
  const decoded = Buffer.from(encoded, "base64").toString();
  const [u, p] = decoded.split(":");
  return (
    u === (process.env.ADMIN_USER || "viadan") &&
    p === (process.env.ADMIN_PASS || "")
  );
}

export async function POST(req: Request) {
  if (!isAuthed(req)) {
    return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' } });
  }

  const { filename, contentType } = await req.json();

  // Optionally validate mime type and size limits on your side too
  const { url, token } = await generateUploadUrl({
    contentType,
    // allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  });

  return NextResponse.json({ url, token, filename });
}
