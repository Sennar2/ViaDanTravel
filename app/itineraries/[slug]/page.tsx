import { itineraries } from '@/data/itineraries'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateStaticParams() {
  return itineraries.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const i = itineraries.find(x => x.slug === params.slug)
  if(!i) return { title: 'Itinerary — ViaDan Travel' }
  return {
    title: `${i.title} — ViaDan Travel`,
    description: i.summary,
    openGraph: {
      title: i.title,
      description: i.summary,
    }
  }
}

export default function ItineraryPage({ params }: { params: { slug: string } }) {
  const i = itineraries.find(x => x.slug === params.slug)
  if(!i) return <main className="py-12"><div className="container">Not found</div></main>

  return (
    <main className="py-12">
      <div className="container max-w-4xl">
        <Link href="/itineraries" className="text-teal underline">← Back to itineraries</Link>
        <h1 className="font-brand text-4xl font-bold mt-2">{i.title}</h1>
        <div className="text-slate">{i.nights} nights • From £{i.priceFromGBP.toLocaleString()} pp</div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="card">
            <div className="pill">Inclusions</div>
            <ul className="list-disc pl-5 mt-2 text-slate">
              {i.bullets.map((b,idx)=>(<li key={idx}>{b}</li>))}
            </ul>
          </div>
          <div className="card">
            <div className="pill">Highlights</div>
            <ul className="list-disc pl-5 mt-2 text-slate">
              {i.highlights.map((b,idx)=>(<li key={idx}>{b}</li>))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a className="btn btn-primary" href={`/#contact`}>Plan this trip</a>
          <a className="btn btn-outline" href="/">Home</a>
        </div>
      </div>
    </main>
  )
}
