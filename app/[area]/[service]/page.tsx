/**
 * app/[area]/[service]/page.tsx
 * ==============================
 * The combo page template — renders ~9,800 pages like:
 *   /williamsburg/cockroach-extermination
 *   /astoria/bed-bug-treatment
 *   /white-plains/rat-extermination
 *
 * Data flow:
 *   1. generateStaticParams() reads /content/combos/ to get all slugs
 *   2. generateMetadata() reads the JSON file for SEO meta tags
 *   3. The page component reads the JSON file for page content
 *   4. Next.js builds all ~9,800 pages as static HTML at build time
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";
import { SERVICE_PROCESSES } from "@/data/service-processes";
import {
  getAllComboSlugs,
  getComboContent,
  type ComboContent,
} from "@/lib/content";


const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

// ─────────────────────────────────────────
// STATIC PARAMS — tells Next.js which pages to build
// ─────────────────────────────────────────

export async function generateStaticParams() {
  // Returns all combos that have generated content files
  return getAllComboSlugs();
}

// ─────────────────────────────────────────
// METADATA — SEO title + description per page
// ─────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { area: string; service: string };
}): Promise<Metadata> {
  const content = getComboContent(params.area, params.service);
  const area = AREAS.find((a) => a.slug === params.area);
  const service = SERVICES.find((s) => s.slug === params.service);

  if (!content || !area || !service) {
    return { title: "The Best Pest Control NYC" };
  }

  return {
    // Use absolute to prevent layout template from appending brand name again
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: {
      canonical: `https://www.thebestpestcontrolnyc.com/${params.area}/${params.service}`,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://www.thebestpestcontrolnyc.com/${params.area}/${params.service}`,
      siteName: "The Best Pest Control NYC",
      locale: "en_US",
      type: "website",
    },
  };
}

// ─────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────

export default function ComboPage({
  params,
}: {
  params: { area: string; service: string };
}) {
  // Load data
  const content = getComboContent(params.area, params.service);
  const area = AREAS.find((a) => a.slug === params.area);
  const service = SERVICES.find((s) => s.slug === params.service);

  // 404 if content or data not found
  if (!content || !area || !service) notFound();

  // Get nearby combo links (same service, nearby areas)
  const nearbyLinks = area.nearbyAreas
    .map((slug) => AREAS.find((a) => a.slug === slug))
    .filter(Boolean)
    .slice(0, 5);

  // Get other services in this area
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 8);

  // Service-specific process copy — falls back to JSON content if slug not found
  const processText =
    SERVICE_PROCESSES[service.slug] || content.ourProcessSection;

  // Schema markup
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${service.name} in ${area.name}`,
        description: content.metaDescription,
        provider: {
          "@type": "LocalBusiness",
          name: "The Best Pest Control NYC",
          telephone: PHONE,
          url: "https://www.thebestpestcontrolnyc.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: area.name,
            addressRegion: area.borough === "New Jersey" ? "NJ" : "NY",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: area.lat,
            longitude: area.lng,
          },
          priceRange: service.priceRange,
        },
        areaServed: {
          "@type": "Place",
          name: area.name,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thebestpestcontrolnyc.com" },
          { "@type": "ListItem", position: 2, name: area.name, item: `https://www.thebestpestcontrolnyc.com/areas/${area.slug}` },
          { "@type": "ListItem", position: 3, name: service.name, item: `https://www.thebestpestcontrolnyc.com/${area.slug}/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <a href="/" className="hover:text-green-700">Home</a>
        {" › "}
        <a href={`/areas/${area.slug}`} className="hover:text-green-700">{area.name}</a>
        {" › "}
        <span className="text-gray-900 font-medium">{service.name}</span>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3 mb-4 flex-wrap">
            <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {service.priceRange}
            </span>
            {service.emergencyAvailable && (
              <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                ⚡ Emergency Available
              </span>
            )}
            <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {service.guaranteeDays}-Day Guarantee
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {service.name} in {area.name}, {area.borough}
          </h1>

          <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-3xl">
            {content.heroParagraph}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition"
            >
              📞 Call {PHONE_DISPLAY}
            </a>
            <a
              href={`tel:${PHONE}`}
              className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-500 transition border border-green-400"
            >
              📞 Call Us Now
            </a>
            <a
              href="/contact"
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition"
            >
              📅 Book Online
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-green-50 border-b border-green-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold text-green-800">
          <span>✓ NYS DEC Licensed</span>
          <span>✓ Fully Insured</span>
          <span>✓ Free Inspection</span>
          <span>✓ No Money Upfront</span>
          <span>✓ {service.guaranteeDays}-Day Guarantee</span>
          <span>✓ 4.9★ Rated</span>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Why This Area Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why {area.name} Has a {service.shortName} Problem
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {content.whyThisAreaSection}
          </p>
        </section>

        {/* Why Choose Us Section — service-specific process copy */}
        <section className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Us for {service.name} in {area.name}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {processText}
          </p>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Need {service.name} in {area.name}?
          </h2>
          <p className="text-green-100 mb-6">
            Licensed exterminators. Free inspection. No money upfront. Same-day available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg hover:bg-green-50">
              📞 Call {PHONE_DISPLAY}
            </a>
            <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-500 border border-green-400">
              📞 Call Us Now
            </a>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {service.name} Cost in {area.name}
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Starting price range</p>
                <p className="text-4xl font-bold text-green-700">{service.priceRange}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Final price depends on property size and severity of infestation.
                  We provide a free inspection and written quote before any work begins.
                </p>
              </div>
              <a href="/pricing" className="text-green-700 font-semibold hover:underline">
                View full pricing →
              </a>
            </div>
          </div>
        </section>

        {/* Parent Service Page Link */}
        <section className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
            <span className="text-gray-700 text-sm">
              Want info on <strong>{service.name}</strong> across all 318+ NYC neighborhoods?
            </span>
            <Link
              href={`/services/${service.slug}`}
              className="text-green-700 font-semibold hover:underline text-sm shrink-0"
            >
              View full {service.shortName} service page →
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {service.name} in {area.name} — FAQs
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-green-700 ml-4 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Nearby Areas — Same Service */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {service.name} Near {area.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {nearbyLinks.map((nearbyArea) => nearbyArea && (
              <a
                key={nearbyArea.slug}
                href={`/${nearbyArea.slug}/${service.slug}`}
                className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-4 text-sm font-medium text-gray-700 hover:text-green-800 transition"
              >
                {service.shortName} in {nearbyArea.name} →
              </a>
            ))}
          </div>
        </section>

        {/* Other Services in This Area */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Other Pest Control Services in {area.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {otherServices.map((s) => (
              <a
                key={s.slug}
                href={`/${area.slug}/${s.slug}`}
                className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-3 text-sm font-medium text-gray-700 hover:text-green-800 transition"
              >
                {s.shortName} →
              </a>
            ))}
          </div>
          <a href={`/areas/${area.slug}`} className="inline-block mt-4 text-green-700 font-semibold hover:underline">
            View all services in {area.name} →
          </a>
        </section>

        {/* Bottom CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">
            Ready to Get Rid of {service.shortName} in {area.name}?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Licensed NYS DEC exterminators. Free inspection. No money upfront.
            {service.guaranteeDays}-day guarantee. Same-day available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition">
              📞 Call {PHONE_DISPLAY}
            </a>
            <a href={`tel:${PHONE}`} className="bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-500 transition border border-green-400">
              📞 Call Us Now
            </a>
            <a href="/contact" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition">
              📅 Book Online
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
