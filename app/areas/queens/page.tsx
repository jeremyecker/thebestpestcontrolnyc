import type { Metadata } from "next";
import Link from "next/link";
import { AREAS } from "@/data/areas";

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

export const metadata: Metadata = {
  title: { absolute: "Pest Control in Queens | The Best Pest Control NYC" },
  description: "Licensed pest control in Queens. 45 neighborhoods served — Astoria, Flushing, Jamaica, Bayside, Forest Hills, and more. Free inspection. No money upfront. Same-day available.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/areas/queens" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thebestpestcontrolnyc.com" },
        { "@type": "ListItem", position: 2, name: "Areas", item: "https://www.thebestpestcontrolnyc.com/areas" },
        { "@type": "ListItem", position: 3, name: "Queens", item: "https://www.thebestpestcontrolnyc.com/areas/queens" },
      ],
    },
  ],
};

export default function QueensPage() {
  const areas = AREAS.filter((a) => a.borough === "Queens").sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">Home</Link>{" › "}
        <Link href="/areas" className="hover:text-green-700">Areas</Link>{" › "}
        <span className="text-gray-900 font-medium">Queens</span>
      </nav>

      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Pest Control in Queens
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl">
            Licensed NYS DEC exterminators serving all {areas.length} Queens neighborhoods. Cockroaches, bed bugs, rats, termites, wildlife, and 32 pest types. Free inspection. No money upfront.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
            <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-500 transition border border-green-400">📞 Call Us Now</a>
            <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
          </div>
        </div>
      </section>

      <section className="bg-green-50 border-b border-green-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold text-green-800">
          <span>✓ NYS DEC Licensed</span>
          <span>✓ Free Inspection</span>
          <span>✓ No Money Upfront</span>
          <span>✓ Guaranteed Results</span>
          <span>✓ Same-Day Available</span>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-0">
        <p className="text-gray-700 text-lg leading-relaxed mb-5">
          Queens is the most geographically and architecturally diverse borough — ranging from dense multi-family housing in Astoria and Jackson Heights to single-family neighborhoods in Bayside, Forest Hills, and Howard Beach, with high-volume commercial corridors in Flushing that generate significant food waste. Flushing’s restaurant density rivals Midtown Manhattan for cockroach pressure, while the proximity to JFK introduces international pest risks rarely seen in other boroughs. The range of housing types means Queens residents deal with both urban pest problems (bed bugs, cockroaches) and suburban ones (wildlife, termites, ticks).
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Older two-family homes and basement apartments in Woodside, Elmhurst, and Corona are particular hot spots for mouse and roach infestations due to aging infrastructure and high occupancy turnover. Large single-family homes in Eastern Queens — Jamaica Estates, Hollis Hills, Queens Village — face more wildlife pressure: raccoons entering attics through deteriorated fascia, squirrels gaining entry around chimneys, and groundhogs burrowing under decks. Our Queens exterminators handle both the urban and suburban pest profiles across all 45 neighborhoods we serve.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-10 pb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {areas.length} Queens Neighborhoods We Serve
        </h2>
        <p className="text-gray-600 mb-8">Click any neighborhood to see all pest control services and pricing for that area.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="block bg-white border border-gray-200 hover:border-green-400 hover:shadow-md rounded-xl p-4 transition group"
            >
              <div className="font-semibold text-sm text-gray-900 group-hover:text-green-800">{area.name}</div>
              <div className="text-green-700 text-xs mt-1">32 services →</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-green-800 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Need Pest Control in Queens?</h2>
          <p className="text-green-100 mb-6">Licensed exterminators. Free inspection. No money upfront. Same-day available across all Queens neighborhoods.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg hover:bg-green-50">📞 Call {PHONE_DISPLAY}</a>
            <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-500 border border-green-400">📞 Call Us Now</a>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Why Queens Customers Choose Us
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> Licensed NYS DEC exterminators with Queens experience</li>
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> Same-day service available across all {areas.length} neighborhoods</li>
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> Free pest inspection — no obligation, no charge</li>
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> No money upfront — pay when the job is done and you’re satisfied</li>
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> 30–365 day guarantee depending on service type</li>
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> 32 pest types treated: cockroaches, bed bugs, rodents, termites, wildlife &amp; more</li>
          </ul>
        </div>
      </section>

      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to Get Started?</h2>
        <p className="text-green-100 text-xl mb-8 max-w-xl mx-auto">Free inspection. No money upfront. Guaranteed results. Same-day available in Queens.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
          <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-500 transition border border-green-400">📞 Call Us Now</a>
          <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
        </div>
      </section>
    </>
  );
}
