import { itineraries } from '@/data/itineraries'
import ItineraryCard from '../components/ItineraryCard'

export const metadata = {
  title: 'Itineraries — ViaDan Travel',
  description: 'Sample tailor-made trips crafted by ViaDan.'
}

export default function ItinerariesPage() {
  return (
    <main className="py-12">
      <div className="container">
        <h1 className="font-brand text-4xl font-bold mb-6">Sample Itineraries</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {itineraries.map(i => <ItineraryCard key={i.slug} i={i} />)}
        </div>
      </div>
    </main>
  )
}
