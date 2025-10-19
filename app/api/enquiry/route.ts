import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO = process.env.CONTACT_TO || 'hello@viadan.travel'
    const FROM = process.env.CONTACT_FROM || 'ViaDan <hello@viadan.travel>'

    if(!RESEND_API_KEY){
      // If no email provider configured, just echo back the body
      return NextResponse.json({ ok: true, message: 'Email provider not configured (set RESEND_API_KEY). Your enquiry was received (not emailed).', data }, { status: 200 })
    }

    // Send via Resend REST API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: 'New Trip Enquiry — ViaDan Site',
        text: Object.entries(data).map(([k,v])=>`${k}: ${v}`).join('\n')
      })
    })

    if(!res.ok) {
      const t = await res.text()
      return NextResponse.json({ ok:false, error: 'Email send failed', provider:t }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok:false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
