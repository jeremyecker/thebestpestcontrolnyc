import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Pest Control Pricing NYC | No Hidden Fees | The Best Pest Control NYC" },
  description:
    "Transparent pest control pricing in NYC. No hidden fees. Written quote before work begins. No money upfront. See all 32 services with price ranges.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/pricing" },
};

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Best Pest Control NYC",
  telephone: PHONE,
  url: "https://www.thebestpestcontrolnyc.com",
  priceRange: "$$",
};

type PricingRow = {
  name: string;
  price: string;
  guarantee: string;
  emergency: boolean;
  seasonal?: boolean;
};

const PRICING_CATEGORIES: { category: string; rows: PricingRow[] }[] = [
  {
    category: "Common Pests",
    rows: [
      { name: "Cockroach Extermination", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Bed Bug Treatment", price: "$1,200 – $4,500", guarantee: "90 days", emergency: true },
      { name: "Ant Control", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Spider Control", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Mosquito Control", price: "$125 – $150/visit", guarantee: "Seasonal", emergency: true, seasonal: true },
      { name: "Flea Treatment", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Tick Control", price: "$125 – $150/visit", guarantee: "Seasonal", emergency: true, seasonal: true },
      { name: "Fly Control", price: "$300 – $450", guarantee: "30 days", emergency: true },
    ],
  },
  {
    category: "Rodents",
    rows: [
      { name: "Rat Extermination", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Mouse Extermination", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Rodent Proofing (Full Exclusion)", price: "$500 – $3,000", guarantee: "1 year", emergency: false },
    ],
  },
  {
    category: "Wood-Destroying Insects",
    rows: [
      { name: "Termite Treatment", price: "$800 – $2,500", guarantee: "1 year", emergency: true },
      { name: "Carpenter Ant Control", price: "$300 – $450", guarantee: "30 days", emergency: true },
    ],
  },
  {
    category: "Stinging Insects",
    rows: [
      { name: "Wasp Removal", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Bee Removal", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Hornet Removal", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Yellow Jacket Removal", price: "$300 – $450", guarantee: "30 days", emergency: true },
    ],
  },
  {
    category: "Wildlife Control",
    rows: [
      { name: "Raccoon Removal", price: "$900 – $4,000", guarantee: "30 days", emergency: true },
      { name: "Squirrel Removal", price: "$900 – $2,500", guarantee: "30 days", emergency: true },
      { name: "Pigeon Control & Deterrents", price: "$550 – $5,000", guarantee: "1 year", emergency: false },
      { name: "Bat Removal & Exclusion", price: "$900 – $2,500", guarantee: "30 days", emergency: true },
    ],
  },
  {
    category: "Specialty Pests",
    rows: [
      { name: "Clothes Moth Control", price: "$550 – $5,000", guarantee: "30 days", emergency: false },
      { name: "Silverfish Control", price: "$300 – $450", guarantee: "30 days", emergency: false },
      { name: "Centipede Control", price: "$300 – $450", guarantee: "30 days", emergency: false },
      { name: "Cricket Control", price: "$300 – $450", guarantee: "30 days", emergency: false },
      { name: "Stink Bug Control", price: "$300 – $450", guarantee: "30 days", emergency: false },
      { name: "Drain Fly Treatment", price: "$300 – $450", guarantee: "30 days", emergency: false },
      { name: "Pantry Pest Control", price: "$300 – $450", guarantee: "30 days", emergency: false },
    ],
  },
  {
    category: "Commercial & General",
    rows: [
      { name: "Commercial Pest Control", price: "$175 – $1,500/mo", guarantee: "30 days", emergency: true },
      { name: "Restaurant Pest Control", price: "$175 – $600/mo", guarantee: "30 days", emergency: true },
      { name: "General Pest Control", price: "$300 – $450", guarantee: "30 days", emergency: true },
      { name: "Emergency Pest Control", price: "$350 – $1,000", guarantee: "30 days", emergency: true },
    ],
  },
];

const MAINTENANCE_PLANS = [
  {
    name: "Quarterly Plan",
    visits: "4 visits/year",
    featured: true,
    badge: "Most Popular",
    price: "Ask for quote",
    includes: ["Preventive inspection each visit", "Targeted treatment as needed", "Unlimited callbacks between visits", "Seasonal pest monitoring"],
  },
  {
    name: "Bi-Monthly Plan",
    visits: "6 visits/year",
    featured: false,
    badge: null,
    price: "Ask for quote",
    includes: ["More frequent monitoring", "Faster response to seasonal shifts", "Targeted treatment as needed", "Unlimited callbacks between visits"],
  },
  {
    name: "Monthly Plan",
    visits: "12 visits/year",
    featured: false,
    badge: null,
    price: "Ask for quote",
    includes: ["Maximum protection year-round", "Commercial-grade monitoring", "NYC DOH compliance documentation", "Priority same-day dispatch"],
  },
];

const PRICING_FAQS = [
  {
    q: "Do you charge for the initial pest inspection?",
    a: "No. Our pest inspections are completely free. A licensed exterminator inspects your property, identifies the pest and source, and gives you a written quote — no charge, no obligation.",
  },
  {
    q: "Is there money upfront?",
    a: "No money upfront. You pay when the job is done and you're satisfied. We accept all major credit cards, debit cards, and checks.",
  },
  {
    q: "Why is there a price range instead of a fixed price?",
    a: "Pest control costs vary based on property size, infestation severity, number of treatments required, and treatment type. After our free inspection, we give you an exact written quote before any work begins.",
  },
  {
    q: "What does the guarantee cover?",
    a: "If the treated pest returns during the guarantee period, we come back and retreat at no additional charge. General pest control: 30-day guarantee. Bed bug treatment: 90-day guarantee. Rodent proofing: 1-year structural guarantee. Seasonal services (mosquito, tick) have no guarantee — results depend on outdoor conditions.",
  },
  {
    q: "Do you offer discounts for maintenance plans?",
    a: "Yes. Maintenance plan clients receive priority scheduling, discounted per-visit rates compared to one-time treatments, and unlimited callbacks between scheduled visits at no extra charge.",
  },
];

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Transparent Pricing. No Hidden Fees. Ever.
          </h1>
          <p className="text-green-100 text-xl mb-8 max-w-2xl mx-auto">
            We show you the exact price before any work begins. No surprises. No pressure. No money upfront.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            {[
              { icon: "✓", text: "Free inspection before any quote" },
              { icon: "✓", text: "Written estimate upfront" },
              { icon: "✓", text: "No money upfront" },
              { icon: "✓", text: "Guaranteed results" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 bg-green-700/50 px-4 py-2 rounded-full">
                <span className="text-yellow-400 font-bold">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-green-700 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold text-white">
          <span>✓ NYS DEC Licensed</span>
          <span>✓ Fully Insured</span>
          <span>✓ Free Inspection</span>
          <span>✓ No Money Upfront</span>
          <span>✓ Guaranteed for Most Services</span>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Pest control pricing in NYC varies significantly based on pest type, property size, infestation severity, and treatment method. The ranges below represent our starting prices and upper limits across all property types we service — from studio apartments to commercial buildings.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every job starts with a free inspection. After the inspection, you receive a written quote with the exact cost, treatment plan, products to be used, and guarantee terms — before we touch anything. You only pay when the job is done.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto space-y-10">
          {PRICING_CATEGORIES.map(({ category, rows }) => (
            <div key={category}>
              <div className="bg-green-800 text-white px-6 py-3 rounded-t-xl">
                <h2 className="font-bold text-lg">{category}</h2>
              </div>
              <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-4 bg-gray-50 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <div className="col-span-2">Service</div>
                  <div>Starting Price</div>
                  <div>Guarantee</div>
                </div>
                {rows.map((row, i) => (
                  <div
                    key={row.name}
                    className={`grid grid-cols-4 px-6 py-4 items-center border-b border-gray-100 last:border-0 transition-colors hover:bg-green-50 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="font-medium text-gray-900 text-sm">{row.name}</span>
                      {row.emergency && (
                        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded uppercase">⚡ Emergency</span>
                      )}
                    </div>
                    <div className="font-bold text-green-700 text-sm">{row.price}</div>
                    <div>
                      {row.seasonal ? (
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">Seasonal</span>
                      ) : (
                        <span className="text-gray-700 text-sm">{row.guarantee}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal note */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-800">
          <strong>Seasonal Treatment Note:</strong> Mosquito and Tick Control are seasonal treatments. Results depend on outdoor conditions and property characteristics. No guarantee applies to these services — we'll set clear expectations during your free inspection.
        </div>
      </section>

      {/* Payment */}
      <section className="bg-green-50 border-y border-green-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>How Payment Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "No Money Upfront", desc: "You don't pay a cent until the job is complete and you're satisfied with the results." },
              { icon: "📄", title: "Written Quote First", desc: "We provide a detailed written estimate with exact total cost before any work begins. No surprises." },
              { icon: "✅", title: "Guaranteed or We Return", desc: "If pests return during the guarantee period, we come back and retreat at zero additional charge." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-green-100 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">We accept all major credit cards, debit cards, and checks.</p>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Maintenance Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Preventive pest control plans for homes and businesses. Scheduled visits + unlimited callbacks + priority dispatch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAINTENANCE_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 relative ${plan.featured ? "border-green-600 shadow-lg" : "border-gray-200"}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-xl mb-1">{plan.name}</h3>
                <p className="text-green-700 font-semibold text-sm mb-4">{plan.visits}</p>
                <ul className="space-y-2 mb-6">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`tel:${PHONE}`}
                  className={`block text-center font-bold px-6 py-3 rounded-xl transition text-sm ${plan.featured ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-green-700 text-white hover:bg-green-600"}`}
                >
                  Get a Quote →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Pricing FAQs</h2>
          <div className="space-y-4">
            {PRICING_FAQS.map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-green-700 ml-4 group-open:rotate-180 transition-transform shrink-0">▾</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Get Your Free Inspection & Quote</h2>
        <p className="text-green-100 text-xl mb-6 max-w-2xl mx-auto">No money upfront. Written quote before work begins. Guaranteed results for most services.</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm font-semibold text-green-200">
          <span>✓ No money upfront</span>
          <span>✓ 3,654 five-star reviews</span>
          <span>✓ Licensed & insured</span>
          <span>✓ Same-day available</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
          <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
        </div>
      </section>
    </>
  );
}
