import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AREAS } from "@/data/areas";
import { SERVICES } from "@/data/services";

export async function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const area = AREAS.find((a) => a.slug === params.slug);
  if (!area) return { title: "The Best Pest Control NYC" };
  return {
    title: `Pest Control in ${area.name} | The Best Pest Control NYC`,
    description: `Licensed pest control in ${area.name}, ${area.borough}. Cockroaches, bed bugs, rats, termites, wildlife & 32 pest types. Free inspection. No money upfront.`,
    alternates: { canonical: `https://www.thebestpestcontrolnyc.com/areas/${area.slug}` },
  };
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = AREAS.find((a) => a.slug === params.slug);
  if (!area) notFound();

  const nearbyAreas = area.nearbyAreas.map((slug) => AREAS.find((a) => a.slug === slug)).filter(Boolean) as typeof AREAS;
  const featuredServices = SERVICES.slice(0, 16);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: "The Best Pest Control NYC",
        telephone: PHONE,
        url: "https://www.thebestpestcontrolnyc.com",
        areaServed: { "@type": "Place", name: area.name, geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lng } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thebestpestcontrolnyc.com" },
          { "@type": "ListItem", position: 2, name: "Areas", item: "https://www.thebestpestcontrolnyc.com/areas" },
          { "@type": "ListItem", position: 3, name: area.name, item: `https://www.thebestpestcontrolnyc.com/areas/${area.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">Home</Link>{" › "}
        <Link href="/areas" className="hover:text-green-700">Areas</Link>{" › "}
        <span className="text-gray-900 font-medium">{area.name}</span>
      </nav>

      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Pest Control in {area.name}, {area.borough}
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl">
            Licensed exterminators serving {area.name} and surrounding neighborhoods. 32 pest types eliminated. Free inspection. No money upfront. Same-day available.
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
          <span>✓ NYS DEC Licensed</span><span>✓ Free Inspection</span><span>✓ No Money Upfront</span><span>✓ Guaranteed Results</span>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Services grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Pest Control Services in {area.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/${area.slug}/${service.slug}`} className="block bg-white border border-gray-200 hover:border-green-400 hover:shadow-md rounded-xl p-4 transition group">
                <div className="text-2xl mb-2">{service.icon}</div>
                <div className="font-semibold text-sm text-gray-900 group-hover:text-green-800">{service.name}</div>
                <div className="text-green-700 text-xs mt-1">{service.priceRange}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Need Pest Control in {area.name}?</h2>
          <p className="text-green-100 mb-6">Licensed exterminators. Free inspection. No money upfront. Same-day available.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg hover:bg-green-50">📞 Call {PHONE_DISPLAY}</a>
            <a href={`sms:${PHONE}`} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-500 border border-green-400">💬 Text Us</a>
          </div>
        </section>

        {/* Nearby areas */}
        {nearbyAreas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nearby Service Areas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nearbyAreas.map((nearby) => (
                <Link key={nearby.slug} href={`/areas/${nearby.slug}`} className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-3 text-sm font-medium text-gray-700 hover:text-green-800 transition">
                  {nearby.name} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to Get Started in {area.name}?</h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">NYS DEC licensed. Free inspection. No money upfront. Guaranteed results. Same-day available.</p>
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
