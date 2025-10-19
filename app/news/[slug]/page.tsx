// app/news/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const fmt = (d?: Date | null) =>
  d ? new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }) : "";

export async function generateStaticParams() {
  const rows = await prisma.news.findMany({ select: { slug: true }, take: 50 });
  return rows.map((r) => ({ slug: r.slug }));
}

export default async function NewsArticle({ params }: { params: { slug: string } }) {
  const n = await prisma.news.findUnique({ where: { slug: params.slug } });
  if (!n) return <main className="py-12"><div className="container">Not found</div></main>;

  return (
    <main className="py-10">
      <div className="container max-w-3xl">
        <Link href="/news" className="text-teal underline">← Back to news</Link>

        {n.heroImageId && (
          <img
            src={`/api/news-images/${n.heroImageId}`}
            alt={n.title}
            className="rounded-2xl mb-6 w-full max-h-[460px] object-cover border mt-4"
          />
        )}

        <div className="text-slate text-sm">{fmt(n.publishedAt)}</div>
        <h1 className="font-brand text-4xl font-bold mt-1">{n.title}</h1>
        <p className="text-slate mt-2">{n.excerpt}</p>

        <article
          className="prose prose-lg mt-6 max-w-none"
          // render simple line breaks; replace with MD parser later if you like
          dangerouslySetInnerHTML={{ __html: (n.content || "").replace(/\n/g, "<br/>") }}
        />

        {/* simple social share bar (optional) */}
        <div className="mt-8 flex items-center gap-3 text-sm text-slate">
          <span>Share:</span>
          <a className="underline" target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL || "")}/news/${n.slug}`}>Facebook</a>
          <a className="underline" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL || "")}/news/${n.slug}`}>LinkedIn</a>
        </div>
      </div>
    </main>
  );
}
