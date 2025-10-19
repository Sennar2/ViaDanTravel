// app/news/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const fmt = (d?: Date | null) =>
  d ? new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }) : "";

export default async function NewsPage() {
  const rows = await prisma.news.findMany({
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="py-10">
      <div className="container">
        <div className="flex items-end justify-between gap-3 mb-6">
          <h1 className="font-brand text-4xl font-bold">News & updates</h1>
          <Link href="/" className="text-teal underline">← Home</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {rows.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`} className="card hover:shadow-lg transition-shadow">
              {n.heroImageId && (
                <img
                  src={`/api/news-images/${n.heroImageId}`}
                  alt={n.title}
                  className="rounded-xl mb-3 w-full h-48 object-cover border"
                  loading="lazy"
                />
              )}
              <div className="text-slate text-sm">{fmt(n.publishedAt)}</div>
              <h3 className="font-semibold text-lg mt-1">{n.title}</h3>
              <p className="text-slate mt-1">{n.excerpt}</p>
              <span className="btn btn-outline mt-3 w-fit">Read more</span>
            </Link>
          ))}
          {rows.length === 0 && <div className="card">No news yet — publish some in the admin.</div>}
        </div>
      </div>
    </main>
  );
}
