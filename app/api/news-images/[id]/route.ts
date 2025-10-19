export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const img = await prisma.newsImage.findUnique({
    where: { id: params.id },
    select: { mimeType: true, bytes: true, size: true, filename: true },
  });
  if (!img) return new NextResponse("Not found", { status: 404 });

  const body = Buffer.from(img.bytes);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": img.mimeType,
      "Content-Length": String(img.size),
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": `inline; filename="${img.filename.replace(/"/g, "")}"`,
    },
  });
}
