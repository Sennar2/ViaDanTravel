"use client";
import Image from "next/image";

function Icon({ name, className }: { name: "instagram" | "facebook" | "linkedin"; className?: string }) {
  const cls = `h-5 w-5 ${className || ""}`;
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" fill="currentColor"/>
      </svg>
    );
  if (name === "facebook")
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden>
        <path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z" fill="currentColor"/>
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={cls} aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 107.5 6 2.5 2.5 0 004.98 3.5zM3 8h4v13H3zM10 8h3.8v1.8h.05A4.16 4.16 0 0122 13.33V21h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V21h-4z" fill="currentColor"/>
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t bg-cream text-navy">
      <div className="container py-8 space-y-6">
        {/* Row: Social + Email (compact on mobile) */}
        <div className="flex flex-col gap-3">
          <div className="text-base font-semibold text-[var(--teal)]">Stay in touch</div>

          <div className="flex items-center gap-3">
            {[
              { name: "instagram", href: "https://instagram.com/viadantravel" },
              { name: "facebook", href: "https://facebook.com/" },
              { name: "linkedin", href: "https://linkedin.com/" },
            ].map((s) => (
              <a
                key={s.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-[var(--teal)] hover:bg-[rgba(18,181,164,0.08)] transition"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
              >
                <Icon name={s.name as any} />
              </a>
            ))}
          </div>

          <div className="text-sm text-slate">
            Email:{" "}
            <a href="mailto:info@viadantravel.co.uk" className="underline text-[var(--teal)]">
              info@viadantravel.co.uk
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Row: Accreditations (small, aligned) */}
        <div className="flex flex-col gap-3">
          <div className="text-base font-semibold text-[var(--teal)]">Accreditations</div>
          <div className="flex items-center gap-5">
            <Image src="/logos/abta.svg" alt="ABTA" width={80} height={32} />
            <Image src="/logos/atol.svg" alt="ATOL" width={80} height={32} />
          </div>
          <div className="text-xs text-slate">ABTA No. 111222 • ATOL No. 111222</div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Row: Credits */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="text-xs text-slate">© {year} ViaDan Travel • London, UK</div>
          <div className="text-xs text-slate">
            Made by{" "}
            <a
              className="underline text-[var(--teal)]"
              href="https://honeysucklesdesign.uk"
              target="_blank"
              rel="noreferrer"
            >
              Honeysuckles Design
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}