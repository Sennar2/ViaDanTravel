import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const row = await prisma.itinerary.findUnique({ where: { slug: params.slug } })
  if(!row) return NextResponse.json({ ok:false, error:'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const data = await req.json()
  const updated = await prisma.itinerary.update({ where: { slug: params.slug }, data })
  return NextResponse.json({ ok:true, updated })
}

export async function DELETE(_: Request, { params }: { params: { slug: string } }) {
  await prisma.itinerary.delete({ where: { slug: params.slug } })
  return NextResponse.json({ ok:true })
}
