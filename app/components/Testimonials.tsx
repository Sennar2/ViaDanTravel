import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <span className="hi hi-teal">Social proof</span>
        <h2 className="text-3xl font-brand font-bold mt-1 mb-8">
          Loved by travellers
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="card border-l-4 border-[var(--teal)] bg-gradient-to-br from-blue-50 to-white"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <p className="text-slate italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy">{testimonial.author}</p>
                  {testimonial.location && (
                    <p className="text-sm text-slate">{testimonial.location}</p>
                  )}
                </div>
                <div className="text-3xl">✈️</div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="card text-center py-8">
            <p className="text-slate">
              Testimonials coming soon! Your happy customers will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
