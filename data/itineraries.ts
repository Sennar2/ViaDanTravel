export type Itinerary = {
  slug: string
  title: string
  nights: number
  priceFromGBP: number
  summary: string
  bullets: string[]
  highlights: string[]
  heroEmoji?: string
  region: 'Italy' | 'Mediterranean' | 'Further'
}

export const itineraries: Itinerary[] = [
  {
    slug: 'amalfi-capri-6-nights',
    title: 'Amalfi & Capri — 6 nights',
    nights: 6,
    priceFromGBP: 1450,
    summary: 'Naples street‑food, Positano views and a Capri finale — perfectly paced for couples.',
    bullets: [
      '2 nights Naples + street‑food tour',
      '3 nights Positano + private boat day',
      '1 night Capri boutique stay'
    ],
    highlights: ['Boat day', 'Cliffside hotel', 'Sunset aperitivo'],
    heroEmoji: '🌊',
    region: 'Italy'
  },
  {
    slug: 'puglia-trulli-coast-7-nights',
    title: 'Puglia — Trulli & Coast — 7 nights',
    nights: 7,
    priceFromGBP: 1200,
    summary: 'Olive groves, white towns and Adriatic coves from Ostuni to Polignano.',
    bullets: [
      '3 nights Ostuni masseria',
      '2 nights Polignano a Mare',
      '2 nights Alberobello trullo stay'
    ],
    highlights: ['Masseria dinner', 'Beach caves', 'Trullo charm'],
    heroEmoji: '🍋',
    region: 'Italy'
  },
  {
    slug: 'sicily-east-8-nights',
    title: 'Sicily East — 8 nights',
    nights: 8,
    priceFromGBP: 1380,
    summary: 'Baroque towns, Etna wine tasting and Ionian coast swims.',
    bullets: [
      '3 nights Ortigia (Siracusa)',
      '2 nights Noto / Ragusa',
      '3 nights Taormina area'
    ],
    highlights: ['Etna wine', 'Baroque walks', 'Island beaches'],
    heroEmoji: '🌋',
    region: 'Italy'
  }
]
