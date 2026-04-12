import type { Metadata } from "next";
import Link from "next/link";
import { AREAS, BOROUGH_GROUPS } from "@/data/areas";

export const metadata: Metadata = {
  title: { absolute: "Pest Control Service Areas NYC | 318+ Neighborhoods | The Best Pest Control NYC" },
  description: "We serve 318+ neighborhoods across all NYC boroughs, New Jersey, Long Island, and Westchester. Find your neighborhood and book a free inspection.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/areas" },
};

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const BOROUGH_ICONS: Record<string, string> = {
  Manhattan: "🗽", Brooklyn: "🌉", Queens: "🏙️", "The Bronx": "🏟️",
  "Staten Island": "⛴️", "New Jersey": "🏢", "Long Island": "🏖️", "Westchester": "🌳",
};

export default function AreasPage() {
  return (
    <>
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>318+ Neighborhoods Served</h1>
          <p className="text-green-100 text-xl max-w-2xl mx-auto">From Harlem to the Hamptons, Hoboken to Hudson Valley — the most complete pest control coverage in the NYC metro area.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {BOROUGH_GROUPS.map(({ name: borough }) => {
          const boroughAreas = AREAS.filter((a) => {
            const key = a.borough === "Bronx" ? "The Bronx" : a.borough;
            return key === borough;
          });
          return (
            <section key={borough}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{BOROUGH_ICONS[borough] || "📍"}</span>
                <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{borough}</h2>
                <span className="text-gray-500 text-sm">({boroughAreas.length} areas)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {boroughAreas.map((area) => (
                  <Link key={area.slug} href={`/areas/${area.slug}`} className="block bg-white border border-gray-200 hover:border-green-400 hover:shadow-sm rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:text-green-800 transition">
                    {area.name}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Don&apos;t See Your Neighborhood?</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto">We likely cover it. Call us or fill out our contact form — we service all of the NYC metro area.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
        </div>
      </section>
    </>
  );
}
