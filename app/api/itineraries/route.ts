import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const rows = await prisma.itinerary.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const data = await req.json()
  // Basic validation
  if(!data.slug || !data.title) return NextResponse.json({ ok:false, error:'Missing slug/title' }, { status: 400 })
  const created = await prisma.itinerary.create({ data })
  return NextResponse.json({ ok:true, created })
}
