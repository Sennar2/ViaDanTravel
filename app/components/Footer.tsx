"use client";
import Link from "next/link";

function Icon({ name, className }: { name: "instagram" | "facebook" | "linkedin" | "mail"; className?: string }) {
  const cls = `h-5 w-5 ${className || ""}`;
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={cls} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} />
        <path d="M3 7l9 7 9-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
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

  const socialLinks = [
    { name: "instagram", href: "https://instagram.com/viadantravel", label: "Instagram" },
    { name: "facebook", href: "https://facebook.com/", label: "Facebook" },
    { name: "linkedin", href: "https://linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <footer className="mt-16 border-t border-gray-200 bg-white text-navy">
      <div className="container">
        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden py-12 flex flex-col items-center gap-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <h3 className="text-2xl font-brand font-bold text-navy mb-1">ViaDan Travel</h3>
            <p className="text-sm text-slate">Italian flair • UK based</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white hover:border-[var(--teal)] transition-all duration-200"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
              >
                <Icon name={s.name as any} />
              </a>
            ))}
            <a
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy)] text-white hover:bg-[var(--teal)] transition-all duration-200"
              href="mailto:info@viadantravel.co.uk"
              aria-label="Email"
            >
              <Icon name="mail" />
            </a>
          </div>

          {/* Accreditations */}
          <div className="text-center">
            <p className="text-xs font-semibold text-slate mb-3 uppercase tracking-wide">Trusted by</p>
            <div className="flex items-center justify-center gap-6">
              {/* ABTA Logo */}
              <a 
                href="https://www.abta.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:opacity-80 transition"
                aria-label="ABTA Member"
              >
                <svg className="h-12 w-auto" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="60" fill="#003366" rx="4"/>
                  <text x="50" y="38" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white" textAnchor="middle">ABTA</text>
                </svg>
              </a>
              {/* ATOL Logo */}
              <a 
                href="https://www.atol.org.uk" 
                target="_blank" 
                rel="noreferrer"
                className="hover:opacity-80 transition"
                aria-label="ATOL Protected"
              >
                <svg className="h-12 w-auto" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="60" fill="#1e40af" rx="4"/>
                  <text x="50" y="38" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">ATOL</text>
                </svg>
              </a>
            </div>
            <p className="text-xs text-slate mt-2">ABTA No. 111222 • ATOL No. 111222</p>
          </div>

          {/* Contact Info */}
          <div className="text-center border-t border-gray-200 pt-6 w-full">
            <p className="text-sm font-semibold text-navy mb-2">Get in touch</p>
            <a 
              href="mailto:info@viadantravel.co.uk" 
              className="text-sm text-[var(--teal)] hover:underline"
            >
              info@viadantravel.co.uk
            </a>
          </div>

          {/* Credits */}
          <div className="text-center text-xs text-slate border-t border-gray-200 pt-6 w-full">
            <p>© {year} ViaDan Travel • London, UK</p>
            <p className="mt-1">
              Made by{" "}
              <a
                className="text-[var(--teal)] hover:underline"
                href="https://honeysucklesdesign.uk"
                target="_blank"
                rel="noreferrer"
              >
                Honeysuckles Design
              </a>
            </p>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:grid md:grid-cols-4 gap-12 py-14">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-brand font-bold text-navy mb-2">ViaDan Travel</h3>
            <p className="text-sm text-slate mb-4">Italian flair • UK based</p>
            <p className="text-sm text-slate leading-relaxed">
              Bespoke travel experiences crafted with personal service and exclusive partnerships.
            </p>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-semibold text-navy mb-4 uppercase tracking-wide">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  className="flex items-center gap-2 text-sm text-slate hover:text-[var(--teal)] transition"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name={s.name as any} className="h-4 w-4" />
                  {s.label}
                </a>
              ))}
              <a
                className="flex items-center gap-2 text-sm text-slate hover:text-[var(--teal)] transition"
                href="mailto:info@viadantravel.co.uk"
              >
                <Icon name="mail" className="h-4 w-4" />
                Email us
              </a>
            </div>
          </div>

          {/* Trust Column */}
          <div>
            <h4 className="text-sm font-semibold text-navy mb-4 uppercase tracking-wide">Trust & Safety</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate mb-2">Protected by</p>
                <div className="flex gap-3">
                  {/* ABTA Logo */}
                  <a 
                    href="https://www.abta.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:opacity-80 transition"
                    aria-label="ABTA Member"
                  >
                    <svg className="h-10 w-auto" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="60" fill="#003366" rx="4"/>
                      <text x="50" y="38" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">ABTA</text>
                    </svg>
                  </a>
                  {/* ATOL Logo */}
                  <a 
                    href="https://www.atol.org.uk" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:opacity-80 transition"
                    aria-label="ATOL Protected"
                  >
                    <svg className="h-10 w-auto" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="60" fill="#1e40af" rx="4"/>
                      <text x="50" y="38" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">ATOL</text>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="text-xs text-slate">
                <p>ABTA No. 111222</p>
                <p>ATOL No. 111222</p>
              </div>
            </div>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="text-sm font-semibold text-navy mb-4 uppercase tracking-wide">Info</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate uppercase tracking-wide mb-1">Email</p>
                <a 
                  href="mailto:info@viadantravel.co.uk" 
                  className="text-sm text-[var(--teal)] hover:underline"
                >
                  info@viadantravel.co.uk
                </a>
              </div>
              <div>
                <p className="text-xs text-slate uppercase tracking-wide mb-1">Location</p>
                <p className="text-sm text-slate">London, UK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6 text-center md:text-left md:flex md:items-center md:justify-between">
          <p className="text-xs text-slate">
            © {year} ViaDan Travel. All rights reserved.
          </p>
          <p className="text-xs text-slate mt-3 md:mt-0">
            Made by{" "}
            <a
              className="text-[var(--teal)] hover:underline"
              href="https://honeysucklesdesign.uk"
              target="_blank"
              rel="noreferrer"
            >
              Honeysuckles Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
