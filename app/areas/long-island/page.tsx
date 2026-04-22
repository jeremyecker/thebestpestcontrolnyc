import type { Metadata } from "next";
import Link from "next/link";
import { AREAS } from "@/data/areas";

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

export const metadata: Metadata = {
  title: { absolute: "Pest Control in Long Island | The Best Pest Control NYC" },
  description: "Licensed pest control in Long Island. 54 neighborhoods served — Garden City, Hempstead, Huntington, Port Washington, and more. Free inspection. No money upfront. Same-day available.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/areas/long-island" },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thebestpestcontrolnyc.com" },
        { "@type": "ListItem", position: 2, name: "Areas", item: "https://www.thebestpestcontrolnyc.com/areas" },
        { "@type": "ListItem", position: 3, name: "Long Island", item: "https://www.thebestpestcontrolnyc.com/areas/long-island" },
      ],
    },
  ],
};

export default function LongIslandPage() {
  const areas = AREAS.filter((a) => a.borough === "Long Island").sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">Home</Link>{" › "}
        <Link href="/areas" className="hover:text-green-700">Areas</Link>{" › "}
        <span className="text-gray-900 font-medium">Long Island</span>
      </nav>

      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Pest Control in Long Island
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl">
            Licensed NYS DEC exterminators serving all {areas.length} Long Island neighborhoods. Cockroaches, bed bugs, rats, termites, wildlife, and 32 pest types. Free inspection. No money upfront.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
            <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-500 transition border border-green-400">📞 Call Us Now</a>
            <a href="/get-a-quote" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
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
          Long Island’s predominantly suburban, single-family character creates a pest profile dominated by wildlife, termites, ticks, and mosquitoes rather than the cockroach and bed bug pressures of denser urban environments — though Nassau County’s older housing stock, particularly in Hempstead, Elmont, and Valley Stream, does see roach and rodent pressure in multi-family buildings. Deer ticks are a major health concern across both Nassau and Suffolk Counties; Long Island has some of the highest Lyme disease rates in New York State, and seasonal tick control has become standard property maintenance for homeowners with lawn and wooded areas. Eastern subterranean termites are prevalent in Nassau County neighborhoods like Garden City, Rockville Centre, and Merrick, where mid-20th century wooden-frame homes are common.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Long Island’s extensive coastline and inland waterways — Great South Bay, the South Shore marshlands, the wetlands around Massapequa and Lindenhurst — create significant mosquito breeding habitat that drives summer pressure well beyond what mainland neighborhoods experience. Wildlife pressure — raccoons in attics, squirrels in soffits, groundhogs under decks — is active year-round in wooded neighborhoods throughout Nassau and western Suffolk County. Our Long Island exterminators understand the seasonal rhythm of pest activity here and design programs that address the full year-round pest profile.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-10 pb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {areas.length} Long Island Neighborhoods We Serve
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
          <h2 className="text-2xl font-bold mb-3">Need Pest Control in Long Island?</h2>
          <p className="text-green-100 mb-6">Licensed exterminators. Free inspection. No money upfront. Same-day available across all Long Island neighborhoods.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg hover:bg-green-50">📞 Call {PHONE_DISPLAY}</a>
            <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-500 border border-green-400">📞 Call Us Now</a>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Why Long Island Customers Choose Us
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3"><span className="text-green-700 font-bold text-xl">✓</span> Licensed NYS DEC exterminators with Long Island experience</li>
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
        <p className="text-green-100 text-xl mb-8 max-w-xl mx-auto">Free inspection. No money upfront. Guaranteed results. Same-day available in Long Island.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
          <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-500 transition border border-green-400">📞 Call Us Now</a>
          <a href="/get-a-quote" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
        </div>
      </section>
    </>
  );
}
