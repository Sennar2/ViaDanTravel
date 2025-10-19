// app/packages/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function generateStaticParams() {
  const rows = await prisma.package.findMany({ select: { slug: true }, take: 50 });
  return rows.map(r => ({ slug: r.slug }));
}

export default async function PackagePage({ params }: { params: { slug: string } }) {
  const p = await prisma.package.findUnique({ where: { slug: params.slug } });
  if (!p) return <main className="py-12"><div className="container">Not found</div></main>;
  return (
    <main className="py-12">
      <div className="container max-w-4xl">
        <Link href="/packages" className="text-teal underline">← Back to packages</Link>
        <h1 className="font-brand text-4xl font-bold mt-2">{p.title}</h1>
        <div className="text-slate">{p.nights ?? "—"} nights • From £{p.priceFromGBP ?? "—"} pp</div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="card">
            <div className="pill">Features</div>
            <ul className="list-disc pl-5 mt-2 text-slate">
              {(p.features || []).map((b, idx) => (<li key={idx}>{b}</li>))}
            </ul>
          </div>
          <div className="card">
            <div className="pill">Details</div>
            <p className="text-slate whitespace-pre-wrap">{p.body || "Ask for details"}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <a className="btn btn-primary" href="/#contact">Plan this trip</a>
          <a className="btn btn-outline" href="/">Home</a>
        </div>
      </div>
    </main>
  );
}
