import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { AREAS, BOROUGH_GROUPS } from "@/data/areas";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return { title: "The Best Pest Control NYC" };
  return {
    title: `${service.name} NYC | The Best Pest Control NYC`,
    description: `Professional ${service.name.toLowerCase()} in NYC. ${service.priceRange}. NYS DEC licensed exterminators. Free inspection. No money upfront. ${service.seasonal ? "Seasonal treatment." : `${service.guaranteeDays}-day guarantee.`}`,
    alternates: { canonical: `https://www.thebestpestcontrolnyc.com/services/${service.slug}` },
  };
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const BOROUGH_LIST = ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island", "New Jersey", "Long Island", "Westchester County"];

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 4);
  const featuredAreas = AREAS.slice(0, 24);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${service.name} in New York City`,
        description: `Professional ${service.name.toLowerCase()} serving 310+ NYC neighborhoods.`,
        provider: {
          "@type": "LocalBusiness",
          name: "The Best Pest Control NYC",
          telephone: PHONE,
          url: "https://www.thebestpestcontrolnyc.com",
        },
        areaServed: { "@type": "City", name: "New York" },
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: service.priceRange,
            priceCurrency: "USD",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thebestpestcontrolnyc.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.thebestpestcontrolnyc.com/services" },
          { "@type": "ListItem", position: 3, name: service.name, item: `https://www.thebestpestcontrolnyc.com/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">Home</Link>{" › "}
        <Link href="/services" className="hover:text-green-700">Services</Link>{" › "}
        <span className="text-gray-900 font-medium">{service.name}</span>
      </nav>

      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3 mb-4 flex-wrap">
            <span className="text-4xl">{service.icon}</span>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">{service.priceRange}</span>
              {service.emergencyAvailable && <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">⚡ Emergency Available</span>}
              {service.seasonal ? (
                <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">Seasonal Treatment</span>
              ) : (
                <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">{service.guaranteeDays}-Day Guarantee</span>
              )}
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {service.name} NYC
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl">
            Professional {service.name.toLowerCase()} serving all five boroughs, northern NJ, Long Island, and Westchester County. NYS DEC licensed. Free inspection. No money upfront.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
            <a href={`sms:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-500 transition border border-green-400">💬 Text Us</a>
            <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
          </div>
        </div>
      </section>

      <section className="bg-green-50 border-b border-green-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold text-green-800">
          <span>✓ NYS DEC Licensed</span><span>✓ Free Inspection</span><span>✓ No Money Upfront</span>
          {!service.seasonal && <span>✓ {service.guaranteeDays}-Day Guarantee</span>}
          <span>✓ 310+ Neighborhoods</span>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{service.name} Cost in NYC</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Starting price range</p>
                <p className="text-5xl font-bold text-green-700">{service.priceRange}</p>
                <p className="text-gray-500 text-sm mt-2">Final price depends on property size and severity of infestation. Free inspection + written quote before any work begins.</p>
              </div>
              <Link href="/pricing" className="text-green-700 font-semibold hover:underline">View full pricing →</Link>
            </div>
            {service.seasonal && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
                <strong>Seasonal Treatment Note:</strong> Mosquito and Tick Control are seasonal treatments. Results depend on outdoor conditions and property. No guarantee applies — we'll set clear expectations during your free inspection.
              </div>
            )}
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Need {service.name} in NYC?</h2>
          <p className="text-green-100 mb-6">Licensed exterminators. Free inspection. No money upfront. Same-day available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg hover:bg-green-50">📞 Call {PHONE_DISPLAY}</a>
            <a href={`sms:${PHONE}`} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-500 border border-green-400">💬 Text Us</a>
          </div>
        </section>

        {/* Service by Borough */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{service.name} by Borough</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOROUGH_LIST.map((borough) => (
              <div key={borough} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 text-center">
                ✓ {borough}
              </div>
            ))}
          </div>
        </section>

        {/* Top areas for this service */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{service.name} in Top NYC Neighborhoods</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredAreas.map((area) => (
              <Link key={area.slug} href={`/${area.slug}/${service.slug}`} className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-3 text-sm font-medium text-gray-700 hover:text-green-800 transition">
                {service.shortName} in {area.name} →
              </Link>
            ))}
          </div>
          <Link href="/areas" className="inline-block mt-4 text-green-700 font-semibold hover:underline">View all 310+ neighborhoods →</Link>
        </section>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Related Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-4 text-sm text-gray-700 hover:text-green-800 transition">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-green-600 text-xs mt-1">{s.priceRange}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to Eliminate {service.shortName} for Good?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">NYS DEC licensed. Free inspection. No money upfront. {service.seasonal ? "Seasonal treatment." : `${service.guaranteeDays}-day guarantee.`} Same-day available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
            <a href={`sms:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-500 transition border border-green-400">💬 Text Us</a>
            <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
          </div>
        </section>
      </div>
    </>
  );
}
