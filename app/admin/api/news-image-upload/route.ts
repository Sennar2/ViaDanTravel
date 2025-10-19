export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof Blob)) return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ ok: false, error: "Max 5MB" }, { status: 400 });

  const filename = (form.get("filename") as string) || "upload";
  const mimeType = file.type || "application/octet-stream";
  const buf = Buffer.from(await file.arrayBuffer());

  const row = await prisma.newsImage.create({
    data: { filename, mimeType, size: buf.length, bytes: buf },
    select: { id: true },
  });

  return NextResponse.json({ ok: true, id: row.id, url: `/api/news-images/${row.id}` });
}
