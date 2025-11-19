import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="bg-[var(--brand-gradient)] py-20 min-h-screen flex items-center">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Header */}
            <div className="mb-6">
              <h1 className="slogan text-7xl md:text-8xl text-coral mb-2">404</h1>
              <span className="hi hi-teal text-lg">Oops!</span>
            </div>

            {/* Main Message */}
            <h2 className="text-3xl md:text-4xl font-brand font-bold mt-4 mb-3 text-navy">
              Looks like you took a wrong turn
            </h2>
            <p className="text-lg text-slate mb-6">
              The page you're looking for doesn't exist. But don't worry — let's get you back on track to planning your dream trip!
            </p>

            {/* Emoji Illustration */}
            <div className="text-6xl mb-8">🗺️</div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Link href="/" className="btn btn-primary text-base px-6 py-3 shadow-lg hover:shadow-xl">
                Back to Home
              </Link>
              <Link href="/#contact" className="btn btn-outline">
                Plan My Trip
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-slate text-sm mb-4">Or explore these popular pages:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/packages" className="text-teal hover:underline text-sm font-medium">
                  Packages
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/news" className="text-teal hover:underline text-sm font-medium">
                  Travel News
                </Link>
                <span className="text-gray-300">•</span>
                <a href="mailto:info@viadantravel.co.uk" className="text-teal hover:underline text-sm font-medium">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
