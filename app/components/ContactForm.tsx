"use client";

const DESTINATIONS = [
  "Italy – Ischia", "Italy – Amalfi Coast", "Italy – Capri", "Italy – Rome", "Italy – Florence",
  "Italy – Venice", "Italy – Sardinia", "Italy – Sicily",
  "France – Paris", "France – Nice & Côte d’Azur",
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
  return (
    <form
      action="https://formspree.io/f/manpkjwy"
      method="POST"
      className="card border-2 border-[var(--teal)]/30 shadow-lg bg-gradient-to-br from-blue-50 to-white max-w-2xl"
    >
      <input type="hidden" name="_subject" value="Trip Enquiry — ViaDan" />
      <input type="hidden" name="_redirect" value="/thank-you" />
      <input type="text" name="_gotcha" className="hidden" aria-hidden />

      <div className="grid md:grid-cols-2 gap-3">
        <input required name="Name" className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="Your name" />
        <input required name="Email" type="email" className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="Email" />
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <input name="Phone" className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="Phone (optional)" />
        <select name="Travellers" className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
          <option>2 travellers</option><option>1 traveller</option><option>3 travellers</option><option>4+ travellers</option>
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-3 mt-3">
        <select name="Destination" className="md:col-span-2 border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]">
          {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <input name="Start date" type="date" className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" />
        <input name="Return date" type="date" className="border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" />
      </div>

      <div className="grid md:grid-cols-4 gap-3 mt-3">
        <input name="Budget" type="number" min="0" step="50" className="md:col-span-1 border rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" placeholder="Budget (£ total)" />
        <textarea
          name="Notes"
          className="md:col-span-3 border rounded-2xl p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]"
          placeholder="Tell me the vibe, must-sees, flexibility on dates, special requests…"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center mt-6">
        <button className="btn btn-primary shadow-lg hover:shadow-xl text-base px-6 py-3" type="submit">Send enquiry</button>
        <span className="text-sm text-slate">or</span>
        <a className="btn btn-outline" href="mailto:info@viadantravel.co.uk">Email instead</a>
      </div>
    </form>
  );
}
