// app/packages/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

function normalizeFeatures(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string") {
    return v.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
  }
  if (v && typeof v === "object" && Array.isArray((v as any))) {
    return (v as any[]).map((x) => String(x));
  }
  return [];
}

export default async function PackagePage({ params: { slug } }: { params: { slug: string } }) {
  const p = await prisma.package.findUnique({
    where: { slug },
    select: {
      title: true,
      summary: true,
      nights: true,
      priceFromGBP: true,
      body: true,
      region: true,
      heroImageId: true,
      features: true, // JSON
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!p) notFound();

  const features = normalizeFeatures(p.features);

  return (
    <main className="py-14">
      <div className="container">
        <span className="hi hi-teal">Package</span>
        <h1 className="text-3xl font-brand font-bold mt-1 mb-4">{p.title}</h1>

        {p.heroImageId && (
          <img
            src={`/api/news-images/${p.heroImageId}`}
            alt={p.title}
            className="rounded-2xl w-full h-64 object-cover border mb-6"
          />
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {p.summary && <p className="text-slate mb-4">{p.summary}</p>}
            {p.body && (
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            )}
          </div>

          <aside className="card">
            <div className="text-sm text-slate">From</div>
            <div className="text-2xl font-semibold">£{p.priceFromGBP ?? "—"}</div>
            <div className="text-sm text-slate mt-1">
              {p.nights ?? "—"} nights{p.region ? ` • ${p.region}` : ""}
            </div>

            {features.length > 0 && (
              <div className="mt-4">
                <div className="pill">Features</div>
                <ul className="list-disc pl-5 mt-2 text-slate">
                  {features.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <a href="/#contact" className="btn btn-primary">
                Plan this trip
              </a>
              <Link href="/packages" className="btn btn-outline">
                Back to packages
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
