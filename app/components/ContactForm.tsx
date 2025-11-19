"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DESTINATIONS = [
  "Italy – Ischia", "Italy – Amalfi Coast", "Italy – Capri", "Italy – Rome", "Italy – Florence",
  "Italy – Venice", "Italy – Sardinia", "Italy – Sicily",
  "France – Paris", "France – Nice & Côte d'Azur",
  "Spain – Barcelona", "Spain – Mallorca", "Spain – Ibiza", "Spain – Tenerife",
  "Portugal – Lisbon", "Portugal – Madeira", "Portugal – Algarve",
  "Greece – Santorini", "Greece – Mykonos", "Greece – Athens", "Greece – Crete",
  "Croatia – Dubrovnik", "Malta", "Cyprus",
  "UK – London", "UK – Edinburgh",
  "USA – New York", "UAE – Dubai",
  "Morocco – Marrakech",
  "Maldives", "Bali", "Thailand – Phuket",
  "Other (write in notes)"
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/manpkjwy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect to thank-you page on success
        router.push("/thank-you");
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch (err) {
      setError("Failed to submit form. Please try emailing us directly.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card border-2 border-[var(--teal)]/30 shadow-lg bg-gradient-to-br from-blue-50 to-white max-w-2xl"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        <input
          required
          name="Name"
          className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          placeholder="Your name"
          disabled={isSubmitting}
        />
        <input
          required
          name="Email"
          type="email"
          className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          placeholder="Email"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <input
          name="Phone"
          className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          placeholder="Phone (optional)"
          disabled={isSubmitting}
        />
        <select
          name="Travellers"
          className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          disabled={isSubmitting}
        >
          <option>2 travellers</option>
          <option>1 traveller</option>
          <option>3 travellers</option>
          <option>4+ travellers</option>
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-3 mt-3">
        <select
          name="Destination"
          className="md:col-span-2 border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          disabled={isSubmitting}
        >
          {DESTINATIONS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input
          name="Start date"
          type="date"
          className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          disabled={isSubmitting}
        />
        <input
          name="Return date"
          type="date"
          className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-3 mt-3">
        <input
          name="Budget"
          type="number"
          min="0"
          step="50"
          className="md:col-span-1 border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          placeholder="Budget (£ total)"
          disabled={isSubmitting}
        />
        <textarea
          name="Notes"
          className="md:col-span-3 border rounded-2xl p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          placeholder="Tell me the vibe, must-sees, flexibility on dates, special requests…"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center mt-6">
        <button
          className="btn btn-primary shadow-lg hover:shadow-xl text-base px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send enquiry"}
        </button>
        <span className="text-sm text-slate">or</span>
        <a className="btn btn-outline" href="mailto:info@viadantravel.co.uk">
          Email instead
        </a>
      </div>
    </form>
  );
}
