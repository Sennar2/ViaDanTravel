import ItineraryCard from './ItineraryCard'
import { itineraries } from '@/data/itineraries'

export default function HomeItineraries() {
  const top = itineraries.slice(0,3)
  return <div className="grid md:grid-cols-3 gap-4">{top.map(i => <ItineraryCard key={i.slug} i={i} />)}</div>
}
