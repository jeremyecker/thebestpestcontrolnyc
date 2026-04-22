import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";

export const metadata: Metadata = {
  title: { absolute: "NYC Exterminator Services — 32 Pests We Eliminate" },
  description: "Complete list of 32 NYC exterminator services — cockroaches, bed bugs, rats, termites, wildlife, and more. Licensed NYS DEC exterminators. Free inspection. No money upfront.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/pests" },
};

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const CATEGORY_DESCS: Record<string, string> = {
  "Common Pests": "The pests NYC residents deal with most. All require professional treatment to eliminate completely in multi-unit buildings.",
  "Rodents": "NYC's rat and mouse population is legendary. Professional control combines trapping, baiting, and exclusion to seal every entry point.",
  "Wood-Destroying Insects": "Termites and carpenter ants cause billions in damage annually — often invisibly. Early treatment saves tens of thousands in repairs.",
  "Stinging Insects": "Wasp, hornet, and yellow jacket nests are safety hazards that must be handled by professionals.",
  "Wildlife Control": "All NYC wildlife removal requires a NYS DEC Nuisance Wildlife Control license — which our specialists hold.",
  "Specialty Pests": "Less common but equally disruptive. Professional identification and targeted treatment delivers faster results.",
  "Commercial & General": "NYC DOH-compliant programs for restaurants, offices, and commercial properties.",
};

export default function ServicesPage() {
  const grouped = SERVICE_CATEGORIES.map((cat) => ({
    category: cat,
    services: SERVICES.filter((s) => s.category === cat),
  }));

  return (
    <>
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>32 Services. Zero Pests.</h1>
          <p className="text-green-100 text-xl max-w-2xl mx-auto">Every pest that thrives in NYC — we eliminate it. Click any service to see treatment details, pricing, and coverage.</p>
        </div>
      </section>

      <section className="bg-green-50 border-b border-green-100 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-semibold text-green-800">
          <span>✓ NYS DEC Licensed</span><span>✓ Free Inspection</span><span>✓ No Money Upfront</span><span>✓ Guaranteed Results</span>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {grouped.map(({ category, services }) => (
          <section key={category}>
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{category}</h2>
            {CATEGORY_DESCS[category] && <p className="text-gray-600 mb-6">{CATEGORY_DESCS[category]}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service) => (
                <Link key={service.slug} href={`/pests/${service.slug}`} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-md transition group">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-green-800 mb-1">{service.name}</h3>
                  <p className="text-green-700 font-semibold text-sm mb-1">{service.priceRange}</p>
                  {service.seasonal ? (
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Seasonal Treatment</span>
                  ) : (
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{service.guaranteeDays}-Day Guarantee</span>
                  )}
                  {service.emergencyAvailable && (
                    <span className="inline-block ml-2 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">⚡ Emergency</span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Not Sure Which Service You Need?</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto">Call us and we'll identify the pest and recommend the right treatment — free, no obligation.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
        </div>
      </section>
    </>
  );
}
