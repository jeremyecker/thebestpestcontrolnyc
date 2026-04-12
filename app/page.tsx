import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";
import { AREAS, BOROUGH_GROUPS } from "@/data/areas";

export const metadata: Metadata = {
  title: { absolute: "The Best Pest Control NYC | Licensed Exterminators — 318+ Neighborhoods" },
  description:
    "NYS DEC licensed exterminators serving 318+ neighborhoods across NYC, NJ, Long Island & Westchester. 32 pest types eliminated. Free inspection. No money upfront. Guaranteed.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com" },
};

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.thebestpestcontrolnyc.com",
      name: "The Best Pest Control NYC",
      url: "https://www.thebestpestcontrolnyc.com",
      telephone: PHONE,
      description: "NYS DEC licensed exterminators serving 318+ NYC neighborhoods. 32 pest types eliminated. Free inspection.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
      areaServed: { "@type": "City", name: "New York" },
      priceRange: "$$",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "07:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "18:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "09:00", closes: "17:00" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "5000",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How much does pest control cost in NYC?", acceptedAnswer: { "@type": "Answer", text: "General pest control starts at $175–$300. Bed bug treatment $1,200–$3,500. Rodent control $350–$600. Termite treatment $800–$4,000. Free inspection and written quote before any work begins." } },
        { "@type": "Question", name: "Do you offer same-day exterminator service?", acceptedAnswer: { "@type": "Answer", text: "Yes. Same-day and emergency service throughout NYC, NJ, Long Island, and Westchester for urgent situations. Call us and we'll dispatch as fast as possible." } },
        { "@type": "Question", name: "Are your exterminators licensed and insured?", acceptedAnswer: { "@type": "Answer", text: "Every technician holds a NYS DEC Commercial Pesticide Applicator license and we carry full liability insurance on every job." } },
      ],
    },
  ],
};

const HOMEFAQS = [
  {
    q: "How much does pest control cost in NYC?",
    a: "Costs vary by pest type, infestation severity, and property size. General pest control starts at $175–$300. Bed bug treatment runs $1,200–$3,500. Rodent control is $350–$600. Termite treatment ranges from $800–$4,000. We always provide a free inspection and written upfront quote — no surprises, no hidden fees.",
  },
  {
    q: "Do you offer same-day exterminator service?",
    a: "Yes. We offer same-day and emergency service throughout NYC, NJ, Long Island, and Westchester for urgent situations. Wasp nests, rat infestations in commercial spaces, bed bug discoveries — call and we'll dispatch as fast as possible.",
  },
  {
    q: "Are your pest control treatments safe for kids and pets?",
    a: "All our treatments use EPA-approved products with targeted application methods designed to minimize exposure. Gel baits are placed inside cracks, crevices, and wall voids — out of everyday contact. We always provide specific safety instructions for your household before and after treatment.",
  },
  {
    q: "Do you service apartments, houses, and commercial properties?",
    a: "All of the above. Studio apartments, co-ops, condos, brownstones, townhouses, single-family homes, restaurants, offices, retail stores, warehouses, and multi-unit residential buildings — we handle every property type across all our service areas.",
  },
  {
    q: "Are your exterminators licensed and insured?",
    a: "Every technician holds a NYS DEC Commercial Pesticide Applicator license and we carry full liability insurance on every job. Wildlife operators hold additional NYS DEC Nuisance Wildlife Control certification. We're happy to provide proof of insurance and licensing upon request.",
  },
  {
    q: "What areas does The Best Pest Control NYC serve?",
    a: "We serve 318+ neighborhoods across Manhattan, Brooklyn, Queens, the Bronx, Staten Island, northern New Jersey, Long Island, and Westchester County. If you're anywhere in the NYC metro area, we have a technician near you.",
  },
  {
    q: "Do you offer pest control maintenance plans?",
    a: "Yes. Monthly, bi-monthly, and quarterly maintenance plans for residential and commercial properties. Plans include scheduled inspections, preventive treatments, and unlimited callbacks between visits. Quarterly is our most popular plan.",
  },
  {
    q: "Do you guarantee your work?",
    a: "Yes. If pests return during the guarantee period, we come back and retreat at no charge. General pest control carries a 30-day guarantee. Bed bug treatment includes a 90-day guarantee. Rodent proofing is backed by a full-year structural guarantee. Seasonal treatments like mosquito and tick control do not carry a guarantee.",
  },
  {
    q: "What should I do to prepare for a pest control visit?",
    a: "Preparation varies by treatment. For general pest control, clear under sinks, clean kitchen surfaces, and remove pet food and water dishes. For bed bug treatment, launder bedding on high heat and declutter around bed frames. For rodent control, secure all food sources. We'll send specific prep instructions when you book.",
  },
  {
    q: "How do I pay? Is there money upfront?",
    a: "No money upfront — you pay when the job is done and you're satisfied. We accept all major credit cards, debit cards, and checks.",
  },
];

const BOROUGHS_DISPLAY = [
  { name: "Manhattan", icon: "🗽", slug: "manhattan" },
  { name: "Brooklyn", icon: "🌉", slug: "brooklyn" },
  { name: "Queens", icon: "🏙️", slug: "queens" },
  { name: "The Bronx", icon: "🏟️", slug: "the-bronx" },
  { name: "Staten Island", icon: "⛴️", slug: "staten-island" },
  { name: "New Jersey", icon: "🏢", slug: "hoboken" },
  { name: "Long Island", icon: "🏖️", slug: "garden-city" },
  { name: "Westchester", icon: "🌳", slug: "white-plains" },
];

export default function HomePage() {
  const featuredServices = SERVICES.slice(0, 16);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section className="bg-green-800 text-white pt-16 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider">
            NYS DEC LICENSED • FULLY INSURED • FREE INSPECTION
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            NYC's Best Pest Control<br className="hidden md:block" /> — Guaranteed.
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Licensed exterminators serving 318+ neighborhoods across NYC, NJ, Long Island & Westchester. Cockroaches, bed bugs, rats, mice, termites, wildlife, and 32 pest types — eliminated for good. Starting at $125. No money upfront.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition shadow-lg">
              📞 Call {PHONE_DISPLAY}
            </a>
            <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition shadow-lg">
              📅 Book Online
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-green-200">
            <span>✓ No money upfront — pay when done</span>
            <span>✓ 5,000+ five-star reviews across NYC</span>
            <span>✓ 100% satisfaction guarantee</span>
            <span>✓ NYS DEC Licensed & fully insured</span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-green-900 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "24/7", label: "We Never Sleep", sub: "Nights, weekends, holidays" },
            { stat: "60 sec", label: "Book in 60 Seconds", sub: "Fastest scheduling in NYC" },
            { stat: "4.9★", label: "NYC Trusts Us", sub: "5,000+ verified reviews" },
            { stat: "30,000+", label: "Pests Gone for Good", sub: "Homes & businesses cleared" },
          ].map((item) => (
            <div key={item.stat} className="text-white">
              <div className="text-3xl font-black text-yellow-400" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.stat}</div>
              <div className="font-bold text-sm mt-1">{item.label}</div>
              <div className="text-green-300 text-xs mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST TICKER */}
      <div className="bg-green-700 py-3 overflow-hidden">
        <div className="flex ticker-track whitespace-nowrap">
          {[1, 2].map((n) => (
            <span key={n} className="text-white font-semibold text-sm mx-8">
              NYS DEC Licensed Exterminators &bull; Fully Insured Pest Control &bull; Free Pest Inspections &bull; Same-Day Service Available &bull; Guaranteed Results &bull; No Hidden Fees &bull; No Money Upfront &bull; 4.9★ Rated &bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* PRO TIP 1 */}
      <section className="bg-amber-50 border-y border-amber-200 py-8 px-4">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-3xl shrink-0">💡</span>
          <div>
            <span className="font-bold text-amber-800 text-sm uppercase tracking-wider">Pro Tip</span>
            <p className="text-amber-900 mt-1 leading-relaxed">
              Spotted one cockroach? There are probably 200 more hiding inside your walls. German cockroaches are nocturnal — if you see them during the day, the infestation is already serious. Don't waste money on store-bought sprays. They scatter roaches into new rooms and make the problem harder to treat. Call us and we'll tell you exactly what you're dealing with — free, no obligation.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>NYC's Premier Pest Control Company</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The Best Pest Control NYC is a full-service exterminator company built specifically for the challenges of New York City living. Whether you're in a Harlem walkup, a Williamsburg loft, a Midtown hotel, a Queens restaurant, or a Westchester colonial — our team of NYS DEC-licensed exterminators has seen your pest problem before, and we know exactly how to fix it.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We cover 32 pest types across 318+ neighborhoods in all five boroughs, northern New Jersey, Long Island, and Westchester County. From cockroach gel bait treatments and whole-room bed bug heat treatment to rodent exclusion, termite barrier systems, and wildlife removal — every service starts with a free inspection and ends with a written guarantee.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                What separates us from every other pest control company in NYC is simple: we treat root causes, not just symptoms. Any exterminator can spray. We find where pests are entering, why they're thriving, and what needs to change permanently. That's why our customers don't call us twice for the same problem.
              </p>
              <a href="/contact" className="inline-block bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition">Get Your Free Inspection →</a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🏛️", title: "Licensed & Insured — Every Single Technician", desc: "Every member of our pest control team holds an active NYS DEC Commercial Pesticide Applicator license. Full general liability insurance on every job — residential and commercial." },
                { icon: "⚡", title: "Same-Day Service — When You Need It Now", desc: "Pest emergencies don't work on a 9-to-5 schedule. We dispatch same-day for urgent situations across all our service areas. Call anytime. We pick up nights, weekends, and holidays." },
                { icon: "🔍", title: "Free Pest Inspections — Before Any Work Begins", desc: "We don't guess. Every job starts with a thorough inspection by a licensed exterminator. You'll see exactly what we find before we recommend a single treatment. No upsells. No pressure. No charge." },
                { icon: "✅", title: "Guaranteed Results — We Come Back at No Cost", desc: "If pests return within our guarantee period, our team returns and retreats at zero additional charge. General pest control: 30-day. Bed bugs: 90-day. Rodent proofing: full-year structural guarantee." },
                { icon: "🗺️", title: "318+ Neighborhoods — The Most Coverage in NYC", desc: "All five boroughs, 48 New Jersey communities, 55 Long Island neighborhoods, and 30 Westchester locations — 318+ neighborhoods in total. One call reaches our whole network." },
                { icon: "💰", title: "Transparent Pricing — No Hidden Fees, Ever", desc: "You'll see a detailed written estimate before any work begins — what we'll do, which products we'll use, and the exact total cost. No surprise charges. No money upfront. You pay when done." },
              ].map((item) => (
                <div key={item.title} className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-bold text-gray-900 text-sm mb-1">{item.title}</div>
                  <div className="text-gray-600 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>32 Services. Zero Pests.</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every pest that thrives in NYC — we eliminate it. Click any service to see treatment details, pricing, and coverage across all 318 neighborhoods.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition group"
              >
                <div className="text-2xl mb-2">{service.icon}</div>
                <div className="font-semibold text-gray-900 text-sm group-hover:text-green-800">{service.name}</div>
                <div className="text-green-700 text-xs font-medium mt-1">{service.priceRange}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="inline-block border-2 border-green-700 text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-700 hover:text-white transition">
              View All 32 Services →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Contact Us", desc: "Call us or book online. We respond in minutes. A quick two-question conversation gets you on the schedule." },
              { num: "2", title: "We Show Up & Investigate", desc: "A licensed exterminator arrives on time. We inspect kitchens, bathrooms, basements, walls, attics, and every entry point. We find the source." },
              { num: "3", title: "You See the Price First", desc: "After inspection, we show you exactly what we found, what we recommend, and the total cost. You approve before we touch anything." },
              { num: "4", title: "Pests Gone. Guaranteed.", desc: "We execute the treatment using EPA-approved products. If anything comes back during the guarantee period, we return at no charge." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-green-700 text-white font-black text-xl rounded-full flex items-center justify-center mx-auto mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{step.num}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={`tel:${PHONE}`} className="inline-block bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-600 transition">
              📞 Start With a Free Inspection
            </a>
          </div>
        </div>
      </section>

      {/* PRO TIP 2 */}
      <section className="bg-amber-50 border-y border-amber-200 py-8 px-4">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-3xl shrink-0">💡</span>
          <div>
            <span className="font-bold text-amber-800 text-sm uppercase tracking-wider">Pro Tip</span>
            <p className="text-amber-900 mt-1 leading-relaxed">
              Moving into a new NYC apartment? Schedule a pest inspection before your furniture arrives. An empty unit takes 30 minutes to inspect and treat. A furnished one takes three times as long and costs twice as much. Our pre-move-in inspections are completely free — and they've saved thousands of New Yorkers from discovering an infestation behind their couch on move-in day.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>318+ Neighborhoods Served</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">From Harlem to the Hamptons, Hoboken to Hudson Valley — the most complete pest control coverage in the NYC metro area.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {BOROUGHS_DISPLAY.map((borough) => (
              <Link key={borough.slug} href={`/areas/${borough.slug}`} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-400 hover:shadow-md transition text-center group">
                <div className="text-3xl mb-2">{borough.icon}</div>
                <div className="font-bold text-gray-900 text-sm group-hover:text-green-800">{borough.name}</div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/areas" className="inline-block border-2 border-green-700 text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-700 hover:text-white transition">
              View All 318+ Neighborhoods →
            </Link>
          </div>
        </div>
      </section>

      {/* NYC INSIDER TIP */}
      <section className="bg-green-800 py-10 px-4">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-3xl shrink-0">🗽</span>
          <div>
            <span className="font-bold text-yellow-400 text-sm uppercase tracking-wider">NYC Insider Tip</span>
            <p className="text-green-100 mt-1 leading-relaxed">
              NYC landlords are legally required to provide pest control. Under the NYC Housing Maintenance Code, your landlord must keep your apartment pest-free. If they're dragging their feet, you have rights — and we document everything. We work directly with building management to get the job done and provide written records for your files.
            </p>
          </div>
        </div>
      </section>

      {/* SEASONAL GUIDE */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>NYC Seasonal Pest Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { season: "🌸 Spring", text: "Termite swarming season. Ant colonies activate. Carpenter ants attack moist wood. Wasp queens start building nests. Most critical window for termite inspections." },
              { season: "☀️ Summer", text: "Peak season. Cockroach populations explode. Mosquito breeding accelerates. Wasp/hornet nests reach full size. Bed bug activity spikes with travel." },
              { season: "🍂 Fall", text: "Rodents invade. Mice and rats move indoors. Raccoons and squirrels seek attic shelter. Stink bugs aggregate. Most important window for rodent exclusion." },
              { season: "❄️ Winter", text: "Interior pests dominate. Rodent infestations peak. German cockroaches thrive in heated buildings. Bed bugs remain active year-round." },
            ].map((item) => (
              <div key={item.season} className="bg-green-50 rounded-xl p-6 border border-green-100">
                <div className="font-bold text-green-800 text-lg mb-3">{item.season}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DID YOU KNOW */}
      <section className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-3xl shrink-0">💡</span>
          <div>
            <span className="font-bold text-yellow-400 text-sm uppercase tracking-wider">Did You Know?</span>
            <p className="text-gray-300 mt-1 leading-relaxed">
              A single house mouse can squeeze through a gap the size of a dime. That hairline crack where your baseboard meets the wall? That's a superhighway for mice. Our rodent-proofing team seals every entry point with steel wool, copper mesh, and caulk — materials mice literally cannot chew through. We don't just eliminate the mice you have. We make sure no new ones can take their place.
            </p>
          </div>
        </div>
      </section>

      {/* HOMEPAGE FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-10" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {HOMEFAQS.map((faq, i) => (
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

      {/* BOTTOM CTA */}
      <section className="bg-green-800 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Your Pest Problem Ends Here.
          </h2>
          <p className="text-green-100 text-xl mb-4">Licensed exterminators. Free inspection. No money upfront. Same-day available.</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm font-semibold text-green-200">
            <span>✓ No money upfront</span>
            <span>✓ 5,000+ five-star reviews</span>
            <span>✓ 100% satisfaction guarantee</span>
            <span>✓ Licensed & insured</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
            <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
          </div>
        </div>
      </section>
    </>
  );
}
