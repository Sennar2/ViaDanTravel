import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const rows = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const data = await req.json()
  if(!data.quote || !data.author) return NextResponse.json({ ok:false, error:'Missing quote/author' }, { status: 400 })
  const created = await prisma.testimonial.create({ data })
  return NextResponse.json({ ok:true, created })
}
