import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Pest Control Pricing NYC | NYC Exterminator Rates" },
  description:
    "Transparent NYC exterminator pricing determined by your specific situation. No hidden fees. Phone quote before work begins. Free consultation for all 32 pest control services.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/pricing" },
  openGraph: {
    title: "Pest Control Pricing NYC | NYC Exterminator Rates",
    description: "Transparent NYC exterminator pricing determined by your specific situation. No hidden fees. Phone quote before work begins. Free consultation for all 32 pest control services.",
    url: "https://www.thebestpestcontrolnyc.com/pricing",
    siteName: "The Best Pest Control NYC",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.thebestpestcontrolnyc.com/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pest Control Pricing NYC | NYC Exterminator Rates",
    description: "Transparent NYC exterminator pricing determined by your specific situation. No hidden fees. Phone quote before work begins. Free consultation for all 32 pest control services.",
  },
};

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Best Pest Control NYC",
  telephone: PHONE,
  url: "https://www.thebestpestcontrolnyc.com",
};

type PricingRow = {
  name: string;
  price: string;
  emergency: boolean;
  seasonal?: boolean;
  serviceAgreement?: string;
};

const PRICING_CATEGORIES: { category: string; rows: PricingRow[] }[] = [
  {
    category: "Common Pests",
    rows: [
      { name: "Cockroach Extermination", price: "Call for quote", emergency: true },
      { name: "Bed Bug Treatment", price: "Call for quote", emergency: true },
      { name: "Ant Control", price: "Call for quote", emergency: true },
      { name: "Spider Control", price: "Call for quote", emergency: true },
      { name: "Mosquito Control", price: "Call for quote", emergency: true, seasonal: true },
      { name: "Flea Treatment", price: "Call for quote", emergency: true },
      { name: "Tick Control", price: "Call for quote", emergency: true, seasonal: true },
      { name: "Fly Control", price: "Call for quote", emergency: true },
    ],
  },
  {
    category: "Rodents",
    rows: [
      { name: "Rat Extermination", price: "Call for quote", emergency: true },
      { name: "Mouse Extermination", price: "Call for quote", emergency: true },
      { name: "Rodent Proofing (Full Exclusion)", price: "Call for quote", emergency: false },
    ],
  },
  {
    category: "Wood-Destroying Insects",
    rows: [
      { name: "Termite Treatment", price: "Call for quote", emergency: true, serviceAgreement: "1-year service agreement" },
      { name: "Carpenter Ant Control", price: "Call for quote", emergency: true },
    ],
  },
  {
    category: "Stinging Insects",
    rows: [
      { name: "Wasp Removal", price: "Call for quote", emergency: true },
      { name: "Bee Removal", price: "Call for quote", emergency: true },
      { name: "Hornet Removal", price: "Call for quote", emergency: true },
      { name: "Yellow Jacket Removal", price: "Call for quote", emergency: true },
    ],
  },
  {
    category: "Wildlife Control",
    rows: [
      { name: "Raccoon Removal", price: "Call for quote", emergency: true },
      { name: "Squirrel Removal", price: "Call for quote", emergency: true },
      { name: "Pigeon Control & Deterrents", price: "Call for quote", emergency: false },
      { name: "Bat Removal & Exclusion", price: "Call for quote", emergency: true },
    ],
  },
  {
    category: "Specialty Pests",
    rows: [
      { name: "Clothes Moth Control", price: "Call for quote", emergency: false },
      { name: "Silverfish Control", price: "Call for quote", emergency: false },
      { name: "Centipede Control", price: "Call for quote", emergency: false },
      { name: "Cricket Control", price: "Call for quote", emergency: false },
      { name: "Stink Bug Control", price: "Call for quote", emergency: false },
      { name: "Drain Fly Treatment", price: "Call for quote", emergency: false },
      { name: "Pantry Pest Control", price: "Call for quote", emergency: false },
    ],
  },
  {
    category: "Commercial & General",
    rows: [
      { name: "Commercial Pest Control", price: "Call for quote", emergency: true },
      { name: "Restaurant Pest Control", price: "Call for quote", emergency: true },
      { name: "General Pest Control", price: "Call for quote", emergency: true },
      { name: "Emergency Pest Control", price: "Call for quote", emergency: true },
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
    q: "Do you charge for the initial quote?",
    a: "No. Your initial phone consultation is completely free. A licensed exterminator will talk through what you're seeing, help identify the likely pest and source, and give you a phone quote — no charge, no obligation.",
  },
  {
    q: "When do I pay?",
    a: "You pay when the job is done and you're satisfied. We accept all major credit cards, debit cards, and checks.",
  },
  {
    q: "Why is there a price range instead of a fixed price?",
    a: "Pest control costs vary based on property size, infestation severity, number of treatments required, and treatment type. After our free phone consultation, we give you an exact phone quote before any work begins.",
  },
  {
    q: "What if I still see pests after service?",
    a: "Call us. We diagnose what's happening on the phone and decide the next step case by case. Termite installs include a 1-year service agreement.",
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
            We show you the exact price before any work begins. No surprises. No pressure.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            {[
              { icon: "✓", text: "Free phone quote before any work" },
              { icon: "✓", text: "Price confirmed before work begins" },
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
          <span>✓ Licensed & Insured</span>
          <span>✓ Fully Insured</span>
          <span>✓ Free Phone Quote</span>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Pest control pricing in NYC depends on the service type, property size, infestation severity, and whether you need a one-time treatment or ongoing plan. Every situation is different — that's why we provide a free phone quote to discuss your specific situation.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            After the call, you'll know the exact cost, treatment plan, and products to be used. Every service includes a service agreement — terms depend on the service and are confirmed on the call. You only pay when the job is done.
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
                  <div>Pricing</div>
                  <div>Service Agreement</div>
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
                      {row.seasonal && (
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">Seasonal</span>
                      )}
                    </div>
                    <div className="font-bold text-green-700 text-sm">{row.price}</div>
                    <div className="text-gray-700 text-sm">{row.serviceAgreement ?? ""}</div>
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
          <strong>Seasonal Treatment Note:</strong> Mosquito and Tick Control are seasonal treatments. Results depend on outdoor conditions and property characteristics. Seasonal treatments are results-dependent — we set clear expectations on the call.
        </div>
      </section>

      {/* Payment */}
      <section className="bg-green-50 border-y border-green-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>How Payment Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "📄", title: "Phone Quote First", desc: "We provide a detailed phone quote with exact total cost before any work begins. No surprises." },
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
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Get Your Free Phone Quote</h2>
        <p className="text-green-100 text-xl mb-6 max-w-2xl mx-auto">Phone quote before work begins. Same-day available.</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm font-semibold text-green-200">
          <span>✓ EPA-Registered Products</span>
          <span>✓ Licensed & insured</span>
          <span>✓ Same-day available</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
          <a href="/get-a-quote" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
        </div>
      </section>
    </>
  );
}
