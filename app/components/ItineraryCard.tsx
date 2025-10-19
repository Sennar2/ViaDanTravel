import Link from 'next/link'
import type { Itinerary } from '@/data/itineraries'

export default function ItineraryCard({ i }: { i: Itinerary }) {
  return (
    <div className="card flex flex-col gap-2">
      <div className="text-3xl" aria-hidden>{i.heroEmoji ?? '✈️'}</div>
      <h3 className="font-semibold text-lg">{i.title}</h3>
      <p className="text-slate">{i.summary}</p>
      <div className="text-sm text-slate">From £{i.priceFromGBP.toLocaleString()} pp • {i.nights} nights</div>
      <Link className="btn btn-outline mt-2" href={`/itineraries/${i.slug}`}>View details</Link>
    </div>
  )
}
