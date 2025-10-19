"use client";
import Image from "next/image";
import Link from "next/link";

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm9 7L3.6 7.8A1 1 0 0 0 3 7h18a1 1 0 0 0-.6.8L12 12z" fill="currentColor"/>
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image alt="ViaDan logo" src="/logo-mark.svg" width={36} height={36} />
          <div>
            <div className="text-base md:text-lg font-brand font-extrabold leading-tight">
              ViaDan Travel
            </div>
            <div className="text-[11px] md:text-xs text-slate">Italian flair • UK based</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link href="/packages" className="btn btn-ghost">Packages</Link>
          <Link href="/news" className="btn btn-ghost">News</Link>
          <a href="#contact" className="btn btn-outline">Get a quote</a>
          <a href="mailto:info@viadantravel.co.uk" className="btn btn-primary gap-2" aria-label="Email">
            <MailIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
