// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Example Package
  await prisma.package.upsert({
    where: { slug: "ischia-capri-5-nights" },
    update: {},
    create: {
      slug: "ischia-capri-5-nights",
      title: "Ischia & Capri — 5 nights",
      summary:
        "Thermal gardens, lemon groves and island-hopping bliss across two islands.",
      nights: 5,
      priceFromGBP: 990,
      region: "Italy",
      features: [
        "3 nights Ischia (masseria or spa hotel)",
        "2 nights Capri (boutique hotel)",
        "Thermal gardens day pass",
        "Private boat to grottoes (optional)",
      ],
      heroEmoji: "🏝️",
      isFeatured: true,
      body:
        "Day 1–3 Ischia: thermal pools & Sant’Angelo. Day 4–5 Capri: sunset at the Faraglioni.",
    },
  });

  // Example News
  await prisma.news.upsert({
    where: { slug: "hello-viadan" },
    update: {},
    create: {
      slug: "hello-viadan",
      title: "Ciao! ViaDan is live",
      excerpt:
        "Tailor-made trips with Italian flair—now taking summer & autumn enquiries.",
      content:
        "From Amalfi to Puglia and the islands, I craft bespoke itineraries with trusted partners.\nGet in touch via the form for a quote.",
      publishedAt: new Date(),
    },
  });

  // Example Itinerary
  await prisma.itinerary.upsert({
    where: { slug: "amalfi-capri-6-nights" },
    update: {},
    create: {
      slug: "amalfi-capri-6-nights",
      title: "Amalfi & Capri — 6 nights",
      nights: 6,
      priceFromGBP: 1450,
      summary:
        "Naples street-food, Positano views and a Capri finale — perfectly paced for couples.",
      bullets: [
        "2 nights Naples + street-food tour",
        "3 nights Positano + private boat day",
        "1 night Capri boutique stay",
      ],
      highlights: ["Boat day", "Cliffside hotel", "Sunset aperitivo"],
      heroEmoji: "🌊",
      region: "Italy",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  