import Link from "next/link";

export default function ThankYou() {
  return (
    <main>
      <section className="bg-gradient-to-b from-[var(--brand-gradient)] to-white py-20 min-h-screen flex items-center">
        <div className="container max-w-2xl">
          <div className="card border-2 border-[var(--teal)]/30 shadow-xl bg-gradient-to-br from-blue-50 to-white">
            {/* Success Icon */}
            <div className="text-6xl mb-4 text-center">✨</div>

            {/* Main Heading */}
            <h1 className="font-brand text-4xl md:text-5xl font-bold mb-2 text-navy text-center">
              Grazie!
            </h1>
            <span className="hi hi-coral text-center block mb-6">Your dream trip awaits</span>

            {/* Main Message */}
            <p className="text-lg text-slate text-center mb-2">
              Your enquiry is on its way to me. I'll review it and get back to you shortly with personalized quotes and options.
            </p>
            <p className="text-slate text-center mb-6">
              In the meantime, check out our latest travel inspiration or follow us for exclusive tips and destination spotlights.
            </p>

            {/* What Happens Next */}
            <div className="bg-white rounded-xl p-4 md:p-5 mb-6 border border-gray-200">
              <h3 className="font-semibold text-navy mb-3">What happens next?</h3>
              <ol className="space-y-2 text-sm text-slate">
                <li className="flex gap-3">
                  <span className="font-bold text-teal">1.</span>
                  <span>I'll review your travel preferences and budget.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal">2.</span>
                  <span>I'll craft 2-3 bespoke itineraries with my trusted partners.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal">3.</span>
                  <span>You'll receive detailed quotes and can tweak until it's perfect.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-teal">4.</span>
                  <span>Book with confidence — ABTA & ATOL protected.</span>
                </li>
              </ol>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              <Link
                href="/"
                className="btn btn-primary text-base px-6 py-3 shadow-lg hover:shadow-xl flex-1 text-center"
              >
                Back to Home
              </Link>
              <a
                href="https://instagram.com/viadantravel"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 text-center"
              >
                Follow on Instagram
              </a>
            </div>

            {/* Alternative Contact */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-slate mb-2">
                Prefer to chat directly?
              </p>
              <a
                href="mailto:info@viadantravel.co.uk"
                className="text-teal font-medium hover:underline"
              >
                Email me at info@viadantravel.co.uk
              </a>
            </div>
          </div>

          {/* Reassurance Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate flex items-center justify-center gap-2">
              <span>🛡️</span>
              <span>Your booking is protected by ABTA & ATOL. No hidden fees, just honest service.</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
