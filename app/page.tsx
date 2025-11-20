// app/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ContactForm from "./components/ContactForm";
import StickyContactButton from "./components/StickyContactButton";
import Testimonials from "./components/Testimonials";
import InstagramFeed from "./components/InstagramFeed";
import TravelAdviceFeed from "./components/TravelAdviceFeed";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const asArr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

function fmtDate(d?: Date | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Home() {
  const latest = await prisma.package.findFirst({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }, { id: "desc" }],
    select: {
      slug: true,
      title: true,
      nights: true,
      priceFromGBP: true,
      features: true,
      heroImageId: true,
    },
  });

  const [packages, news] = await Promise.all([
    prisma.package.findMany({
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }, { id: "desc" }],
      take: 2,
      select: {
        slug: true,
        title: true,
        summary: true,
        nights: true,
        priceFromGBP: true,
        heroEmoji: true,
        heroImageId: true,
      },
    }),
    prisma.news.findMany({
      orderBy: [
        { publishedAt: "desc" },
        { updatedAt: "desc" },
        { createdAt: "desc" },
        { id: "desc" },
      ],
      take: 2,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
        heroImageId: true,
      },
    }),
  ]);

  return (
    <main>
      <StickyContactButton />

      {/* Hero (cream/gradient background) */}
      <section className="bg-[var(--brand-gradient)] py-16 md:py-20">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="pill">From the UK • Crafted by Daniele</div>
            <h1 className="slogan text-5xl md:text-6xl lg:text-7xl mt-2 mb-3">
              Dream it. Plan it. <span className="text-[var(--teal)]">Live it.</span>
            </h1>
            <p className="text-lg text-slate mb-2">
              Bespoke holidays, city breaks and honeymoons designed by an Italian in the UK.
              Personal service, exclusive partners, stress-free planning.
            </p>
            <div className="flex items-center gap-2 mb-5 text-sm text-slate">
              <span>🛡️</span>
              <span><strong>ABTA & ATOL Protected</strong> – Your booking is safe with us.</span>
            </div>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="#contact" className="btn btn-primary text-base px-6 py-3 shadow-lg hover:shadow-xl">
                Plan my trip
              </a>
              <a href="mailto:info@viadantravel.co.uk" className="btn btn-outline">
                Email us
              </a>
            </div>
          </div>

          {/* Latest package (label can stay highlighted coral) */}
          <div className="card border-2 border-[var(--teal)]/20">
            {latest ? (
              <>
                <span className="hi hi-coral">Latest package</span>
                {latest.heroImageId && (
                  <img
                    src={`/api/news-images/${latest.heroImageId}`}
                    alt={latest.title}
                    className="rounded-xl mb-3 w-full h-48 object-cover border"
                  />
                )}
                <h3 className="text-2xl font-semibold mt-2">{latest.title}</h3>
                {asArr(latest.features).length > 0 && (
                  <ul className="list-disc pl-5 mt-2 text-slate">
                    {asArr(latest.features).slice(0, 3).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-slate">
                  From £{latest.priceFromGBP ?? "—"} pp • {latest.nights ?? "—"} nights
                </p>
                <div className="mt-4 flex gap-3">
                  <Link className="btn btn-primary" href={`/packages/${latest.slug}`}>View</Link>
                  <a className="btn btn-outline" href="/#contact">Plan this trip</a>
                </div>
              </>
            ) : (
              <>
                <span className="hi hi-coral">Latest package</span>
                <h3 className="text-2xl font-semibold mt-2">Coming soon</h3>
                <p className="text-slate mt-2">
                  Add your first package in <code>/admin</code> and it will show here.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How it works (cream background → coral highlight only on top label) */}
      <section id="how-it-works" className="py-14">
        <div className="container">
          <span className="hi hi-coral">How it works</span>
          <h2 className="text-3xl font-brand font-bold mt-1 mb-6">
            Dream it • Plan it • Live it
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="card group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--teal)] text-white grid place-items-center font-bold">1</div>
                <h3 className="font-semibold text-lg">Dream it</h3>
              </div>
              <p className="text-slate mt-2">
                Pick your destination & vibe. Share dates, budget and must-dos.
              </p>
              <a href="#contact" className="btn btn-outline mt-3 group-hover:translate-y-[-2px]">
                Fill the form
              </a>
            </div>

            <div className="card group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--teal)] text-white grid place-items-center font-bold">2</div>
                <h3 className="font-semibold text-lg">Plan it</h3>
              </div>
              <p className="text-slate mt-2">
                I work my magic with trusted partners and send curated quotes.
              </p>
              <span className="text-sm text-slate mt-3 inline-block">
                Quick tweaks until perfect.
              </span>
            </div>

            <div className="card group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--teal)] text-white grid place-items-center font-bold">3</div>
                <h3 className="font-semibold text-lg">Live it!</h3>
              </div>
              <p className="text-slate mt-2">
                Pack and go. I’m here if you need me; your booking is protected.
              </p>
              <span className="text-sm text-slate mt-3 inline-block">
                ABTA & ATOL protected.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge (white background → teal highlight only on top label) */}
      <section id="concierge" className="py-14 bg-white">
        <div className="container">
          <span className="hi hi-teal">Concierge planning</span>
          <h2 className="text-3xl font-brand font-bold mt-1 mb-6">
            Hand-picked trips, tailored to you
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="card">
              <div className="text-3xl" aria-hidden>💍</div>
              <h3 className="font-semibold text-lg mt-1">Honeymoons</h3>
              <p className="text-slate mt-1">
                Romantic stays, private transfers, little surprises — the perfect start to married life.
              </p>
            </div>
            <div className="card">
              <div className="text-3xl" aria-hidden>🏝️</div>
              <h3 className="font-semibold text-lg mt-1">Exotic escapes</h3>
              <p className="text-slate mt-1">
                Overwater villas, tropical islands and once-in-a-lifetime experiences.
              </p>
            </div>
            <div className="card">
              <div className="text-3xl" aria-hidden>🏛️</div>
              <h3 className="font-semibold text-lg mt-1">City & culture</h3>
              <p className="text-slate mt-1">
                Chic city breaks with food tours, art, and boutique hotels in the heart of it all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh picks (cream → coral highlight on label only) */}
      <section className="py-14">
        <div className="container">
          <span className="hi hi-coral">Fresh picks</span>
          <h2 className="text-3xl font-brand font-bold mt-1 mb-4">Latest packages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {packages.map((p) => (
              <div className="card" key={p.slug}>
                {p.heroImageId && (
                  <img
                    src={`/api/news-images/${p.heroImageId}`}
                    alt={p.title}
                    className="rounded-xl mb-3 w-full h-40 object-cover border"
                    loading="lazy"
                  />
                )}
                <div className="text-3xl" aria-hidden>{p.heroEmoji ?? "✈️"}</div>
                <h3 className="font-semibold text-lg mt-1">{p.title}</h3>
                <p className="text-slate mt-1">{p.summary}</p>
                <div className="text-sm text-slate mt-1">
                  From £{p.priceFromGBP ?? "—"} • {p.nights ?? "—"} nights
                </div>
                <Link className="btn btn-outline mt-3" href={`/packages/${p.slug}`}>
                  View details
                </Link>
              </div>
            ))}
            {packages.length === 0 && (
              <div className="card">No packages yet — add some in the admin.</div>
            )}
          </div>
          <div className="mt-4">
            <Link className="btn btn-outline" href="/packages">See all packages</Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* News (white → teal highlight on label only) */}
      <section className="py-14 bg-white border-y">
        <div className="container">
          <span className="hi hi-teal">News</span>
          <h2 className="text-3xl font-brand font-bold mt-1 mb-4">Latest updates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {news.map((n) => (
              <Link key={n.slug} href={`/news/${n.slug}`} className="card">
                {n.heroImageId && (
                  <img
                    src={`/api/news-images/${n.heroImageId}`}
                    alt={n.title}
                    className="rounded-xl mb-3 w-full h-48 object-cover border"
                    loading="lazy"
                  />
                )}
                <div className="text-slate text-sm">{fmtDate(n.publishedAt)}</div>
                <h3 className="font-semibold text-lg mt-1">{n.title}</h3>
                <p className="text-slate mt-1">{n.excerpt}</p>
                <span className="btn btn-outline mt-3">Read more</span>
              </Link>
            ))}
            {news.length === 0 && <div className="card">No news yet — publish some in the admin.</div>}
          </div>
          <div className="mt-4">
            <Link className="btn btn-outline" href="/news">See all news</Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-14 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container">
          <InstagramFeed />
        </div>
      </section>

      {/* Travel Advice Feed Section */}
      <section className="py-14 bg-white border-y">
        <div className="container">
          <span className="hi hi-teal">Travel news</span>
          <h2 className="text-3xl font-brand font-bold mt-1 mb-6">Latest FCDO travel updates</h2>
          <p className="text-slate mb-6 max-w-2xl">
            Stay informed with the latest travel advice and updates from the UK Foreign, Commonwealth & Development Office (FCDO).
          </p>
          <TravelAdviceFeed />
        </div>
      </section>

      {/* Contact (cream → coral highlight on label only) */}
      <section id="contact" className="py-16 bg-gradient-to-b from-cream to-white">
        <div className="container">
          <span className="hi hi-coral">Start here</span>
          <h2 className="text-3xl font-brand font-bold mt-1 mb-4">Tell me about your trip</h2>
          <p className="text-slate mb-6 max-w-2xl">
            Fill out the form below with your travel dreams, and I'll craft the perfect itinerary for you. 
            No pressure, no hidden fees — just personalized service.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
