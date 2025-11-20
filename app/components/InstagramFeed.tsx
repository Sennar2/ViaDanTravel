'use client';

export default function InstagramFeed() {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8 text-center">
      <div className="mb-6">
        <svg
          className="w-16 h-16 mx-auto text-pink-600 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      </div>

      <h3 className="font-brand text-2xl md:text-3xl font-bold text-navy mb-3">
        Follow Us on Instagram
      </h3>

      <p className="text-slate mb-6 max-w-md mx-auto">
        Get inspired by stunning destinations, travel tips, and exclusive offers. Follow @viadantravel for daily inspiration and the latest updates from our travels.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8 max-w-sm mx-auto">
        {/* Placeholder Instagram-style cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg animate-pulse"
          />
        ))}
      </div>

      <a
        href="https://instagram.com/viadantravel"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Follow @viadantravel
      </a>

      <p className="text-sm text-slate mt-6">
        Join our community of travel enthusiasts and get exclusive travel tips, destination guides, and special offers.
      </p>
    </div>
  );
}
