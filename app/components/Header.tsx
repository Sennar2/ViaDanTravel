"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* Crisp stroke-only envelope (no fill) */
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={2} />
      <path d="M3 7l9 7 9-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" fill="currentColor" />
    </svg>
  );
}
function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image alt="ViaDan logo" src="/logo-mark.svg" width={32} height={32} priority />
          <div className="leading-tight">
            <div className="text-[16px] font-brand font-extrabold">ViaDan Travel</div>
            <div className="hidden sm:block text-[11px] text-slate">Italian flair • UK based</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/packages" className="btn btn-ghost">Packages</Link>
          <Link href="/news" className="btn btn-ghost">News</Link>
          <a href="#contact" className="btn btn-outline">Get a quote</a>
          <a href="mailto:info@viadantravel.co.uk" className="btn btn-primary p-2" aria-label="Email">
            <MailIcon className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          {/* Never-wrap label: short on xs, full from sm+ */}
          <a href="#contact" className="btn btn-outline whitespace-nowrap px-3 py-2 text-[15px]">
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Get a quote</span>
          </a>

          <a href="mailto:info@viadantravel.co.uk" className="btn btn-primary p-2" aria-label="Email">
            <MailIcon className="h-5 w-5" />
          </a>

          <button
            className="btn btn-primary p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-gray-200 transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container py-3 flex flex-col gap-2">
          <Link href="/packages" className="btn btn-ghost" onClick={() => setOpen(false)}>
            Packages
          </Link>
          <Link href="/news" className="btn btn-ghost" onClick={() => setOpen(false)}>
            News
          </Link>
          <a href="#contact" className="btn btn-outline" onClick={() => setOpen(false)}>
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}