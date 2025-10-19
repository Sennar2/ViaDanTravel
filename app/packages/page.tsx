// app/packages/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const rows = await prisma.package.findMany({
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
  return (
    <main className="py-12">
      <div className="container">
        <h1 className="font-brand text-4xl font-bold mb-6">Packages</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {rows.map(p => (
            <div className="card" key={p.slug}>
              <div className="text-3xl" aria-hidden>{p.heroEmoji ?? "✈️"}</div>
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-slate">{p.summary}</p>
              <div className="text-sm text-slate">From £{p.priceFromGBP ?? "—"} • {p.nights ?? "—"} nights</div>
              <Link className="btn btn-outline mt-2" href={`/packages/${p.slug}`}>View details</Link>
            </div>
          ))}
          {rows.length === 0 && <div>No packages yet — add some in the admin.</div>}
        </div>
      </div>
    </main>
  );
}
