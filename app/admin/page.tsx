// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";

type PackageT = {
  slug: string; title: string; summary?: string; nights?: number; priceFromGBP?: number;
  region?: string; features: string[]; body?: string; heroEmoji?: string; isFeatured?: boolean;
  heroImageId?: string;
};
type NewsT = {
  slug: string; title: string; excerpt: string; content: string; publishedAt?: string;
  heroImageId?: string; imageUrl?: string;
};

type Tab = "packages" | "news";

async function parseJsonOrText(r: Response) {
  const ct = r.headers.get("content-type") || "";
  if (ct.includes("application/json")) return r.json();
  const text = await r.text();
  return { ok: r.ok, status: r.status, error: text || "Non-JSON response" };
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("packages");

  // Packages state
  const [packages, setPackages] = useState<PackageT[]>([]);
  const [pkgForm, setPkgForm] = useState<PackageT>({
    slug: "", title: "", summary: "", nights: undefined, priceFromGBP: undefined,
    region: "Italy", features: [], body: "", heroEmoji: "🌊", isFeatured: false,
  });
  const [pkgImagePreview, setPkgImagePreview] = useState<string | null>(null);
  const [uploadingPkg, setUploadingPkg] = useState(false);

  // News state
  const [news, setNews] = useState<NewsT[]>([]);
  const [newsForm, setNewsForm] = useState<NewsT>({
    slug: "", title: "", excerpt: "", content: "", publishedAt: "", heroImageId: undefined,
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadPackages = () => fetch("/api/packages").then((r) => r.json()).then(setPackages);
  const loadNews = () => fetch("/api/news").then((r) => r.json()).then(setNews);

  useEffect(() => { loadPackages(); loadNews(); }, []);

  // Upload endpoints reuse /admin/api/news-image-upload
  const uploadPkgImage = async (file: File) => {
    setUploadingPkg(true);
    try {
      const fd = new FormData();
      fd.append("file", file); fd.append("filename", file.name);
      const res = await fetch("/admin/api/news-image-upload", { method: "POST", body: fd });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || "Upload failed");
      setPkgForm((f) => ({ ...f, heroImageId: out.id }));
      setPkgImagePreview(out.url);
    } finally { setUploadingPkg(false); }
  };

  const uploadNewsImage = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file); fd.append("filename", file.name);
      const res = await fetch("/admin/api/news-image-upload", { method: "POST", body: fd });
      const out = await res.json();
      if (!out.ok) throw new Error(out.error || "Upload failed");
      setNewsForm((f) => ({ ...f, heroImageId: out.id, imageUrl: out.url }));
      setImagePreview(out.url);
    } finally { setUploading(false); }
  };

  const createPackage = async () => {
    const payload = { ...pkgForm, features: (pkgForm.features || []).filter(Boolean) };
    const r = await fetch("/api/packages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const out = await parseJsonOrText(r);
    if (r.ok && (out as any).ok) {
      alert("Package created");
      setPkgForm({ slug: "", title: "", summary: "", nights: undefined, priceFromGBP: undefined, region: "Italy", features: [], body: "", heroEmoji: "🌊", isFeatured: false });
      setPkgImagePreview(null);
      loadPackages();
    } else alert(`Error: ${(out as any).error || r.statusText}`);
  };

  const createNews = async () => {
    const payload = { ...newsForm, publishedAt: newsForm.publishedAt ? new Date(newsForm.publishedAt).toISOString() : null };
    const r = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const out = await parseJsonOrText(r);
    if (r.ok && (out as any).ok) {
      alert("News posted");
      setNewsForm({ slug: "", title: "", excerpt: "", content: "", publishedAt: "", heroImageId: undefined });
      setImagePreview(null);
      loadNews();
    } else alert(`Error: ${(out as any).error || r.statusText}`);
  };

  return (
    <main className="container py-10">
      <h1 className="font-brand text-4xl font-bold mb-6">Admin</h1>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("packages")} className={`btn ${tab === "packages" ? "btn-primary" : "btn-outline"}`}>Packages</button>
        <button onClick={() => setTab("news")} className={`btn ${tab === "news" ? "btn-primary" : "btn-outline"}`}>News</button>
      </div>

      {tab === "packages" && (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-semibold text-xl mb-2">New Package</h2>
            <div className="grid gap-2">
              <input className="border rounded-2xl p-2" placeholder="slug (unique)" value={pkgForm.slug} onChange={e => setPkgForm({ ...pkgForm, slug: e.target.value })} />
              <input className="border rounded-2xl p-2" placeholder="title" value={pkgForm.title} onChange={e => setPkgForm({ ...pkgForm, title: e.target.value })} />
              <textarea className="border rounded-2xl p-2" placeholder="summary" value={pkgForm.summary} onChange={e => setPkgForm({ ...pkgForm, summary: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <input className="border rounded-2xl p-2" placeholder="nights" type="number" value={pkgForm.nights || ""} onChange={e => setPkgForm({ ...pkgForm, nights: e.target.value ? parseInt(e.target.value) : undefined })} />
                <input className="border rounded-2xl p-2" placeholder="priceFromGBP" type="number" value={pkgForm.priceFromGBP || ""} onChange={e => setPkgForm({ ...pkgForm, priceFromGBP: e.target.value ? parseInt(e.target.value) : undefined })} />
              </div>
              <input className="border rounded-2xl p-2" placeholder="region (e.g., Italy)" value={pkgForm.region || ""} onChange={e => setPkgForm({ ...pkgForm, region: e.target.value })} />
              <input className="border rounded-2xl p-2" placeholder="features (comma separated)" onChange={e => setPkgForm({ ...pkgForm, features: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
              <textarea className="border rounded-2xl p-2" placeholder="body (details)" value={pkgForm.body || ""} onChange={e => setPkgForm({ ...pkgForm, body: e.target.value })} />
              <div className="grid grid-cols-2 gap-2">
                <input className="border rounded-2xl p-2" placeholder="emoji" value={pkgForm.heroEmoji || ""} onChange={e => setPkgForm({ ...pkgForm, heroEmoji: e.target.value })} />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pkgForm.isFeatured || false} onChange={e => setPkgForm({ ...pkgForm, isFeatured: e.target.checked })} /> Featured</label>
              </div>

              <label className="text-sm font-medium">Featured image</label>
              <input type="file" accept="image/*" className="border rounded-2xl p-2"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPkgImage(f); }} />
              {uploadingPkg && <div className="text-sm text-slate">Uploading…</div>}
              {pkgImagePreview && <img src={pkgImagePreview} alt="Preview" className="mt-2 rounded-2xl max-h-48 object-cover border" />}

              <button className="btn btn-primary" onClick={createPackage}>Create</button>
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold text-xl mb-2">Packages</h2>
            <div className="grid gap-3 max-h-[520px] overflow-auto">
              {packages.map((p) => (
                <div key={p.slug} className="border rounded-2xl p-3">
                  <div className="font-semibold">{p.title} {p.heroEmoji}</div>
                  <div className="text-slate text-sm">£{p.priceFromGBP ?? "—"} • {p.nights ?? "—"} nights</div>
                  <div className="text-slate text-sm truncate">{p.summary}</div>
                  {p.heroImageId && <img src={`/api/news-images/${p.heroImageId}`} className="mt-2 rounded-lg h-20 w-full object-cover border" alt="thumb" />}
                  <a className="btn btn-outline mt-2" href={`/packages/${p.slug}`} target="_blank">Open</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "news" && (
        <section className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-semibold text-xl mb-2">New News</h2>
            <div className="grid gap-2">
              <input className="border rounded-2xl p-2" placeholder="slug (unique)" value={newsForm.slug} onChange={e => setNewsForm({ ...newsForm, slug: e.target.value })} />
              <input className="border rounded-2xl p-2" placeholder="title" value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })} />
              <input className="border rounded-2xl p-2" placeholder="excerpt" value={newsForm.excerpt} onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })} />
              <textarea className="border rounded-2xl p-2" placeholder="content (plain or markdown)" value={newsForm.content} onChange={e => setNewsForm({ ...newsForm, content: e.target.value })} />
              <input className="border rounded-2xl p-2" placeholder="publishedAt (YYYY-MM-DD) optional" value={newsForm.publishedAt || ""} onChange={e => setNewsForm({ ...newsForm, publishedAt: e.target.value })} />

              <label className="text-sm font-medium">Featured image</label>
              <input type="file" accept="image/*" className="border rounded-2xl p-2"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadNewsImage(f); }} />
              {uploading && <div className="text-sm text-slate">Uploading…</div>}
              {(imagePreview || newsForm.imageUrl) && (
                <img src={imagePreview || (newsForm.imageUrl as string)} alt="Preview" className="mt-2 rounded-2xl max-h-48 object-cover border" />
              )}

              <button className="btn btn-primary" onClick={createNews}>Publish</button>
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold text-xl mb-2">Latest News</h2>
            <div className="grid gap-3 max-h-[520px] overflow-auto">
              {news.map((n) => (
                <div key={n.slug} className="border rounded-2xl p-3">
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-slate text-sm truncate">{n.excerpt}</div>
                  {n.heroImageId && <img src={`/api/news-images/${n.heroImageId}`} className="mt-2 rounded-lg h-20 w-full object-cover border" alt="thumb" />}
                  <a className="btn btn-outline mt-2" href={`/news/${n.slug}`} target="_blank">Open</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
