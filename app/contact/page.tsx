/**
 * app/contact/page.tsx
 * ====================
 * Full Contact Us page.
 * Uses the ContactForm component for the submission form.
 */

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

export const metadata: Metadata = {
  title: { absolute: "Contact Us | The Best Pest Control NYC" },
  description:
    "Contact The Best Pest Control NYC for a free pest inspection. Call or fill out the form. We respond within minutes. Licensed NYS DEC exterminators serving all of NYC.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/contact" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Best Pest Control NYC",
  telephone: PHONE_NUMBER,
  url: "https://www.thebestpestcontrolnyc.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "07:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "09:00", closes: "17:00" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch — We Respond Fast
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Call us or fill out the form below. Licensed exterminators ready to
            inspect, quote, and treat — often the same day. No money upfront.
          </p>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-green-50 border-b border-green-100 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 text-center">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex flex-col items-center gap-1 p-4 bg-white rounded-xl border border-green-200 hover:border-green-500 hover:shadow-md transition"
          >
            <span className="text-3xl">📞</span>
            <span className="font-bold text-green-800">Call Us</span>
            <span className="text-green-700 font-semibold">{PHONE_DISPLAY}</span>
            <span className="text-xs text-gray-500">24/7 for emergencies</span>
          </a>

        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form — takes up 3 cols */}
          <div className="lg:col-span-3">
            <ContactForm source="contact-page" />
          </div>

          {/* Info sidebar — takes up 2 cols */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hours */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                Hours of Operation
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  ["Monday – Friday", "7:00 AM – 8:00 PM"],
                  ["Saturday", "8:00 AM – 6:00 PM"],
                  ["Sunday", "9:00 AM – 5:00 PM"],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-600">{day}</span>
                    <span className="font-semibold text-gray-900">{hours}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <p className="text-green-700 font-semibold text-xs">
                    ⚡ Emergency service available 24/7 outside business hours
                  </p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-green-800 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Why Choose Us</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "✓ NYS DEC Licensed Exterminators",
                  "✓ Fully Insured — Every Job",
                  "✓ Free Pest Inspection",
                  "✓ No Money Upfront",
                  "✓ 30–365 Day Guarantee",
                  "✓ Same-Day Available",
                  "✓ 5,000+ Five-Star Reviews",
                  "✓ 318+ Neighborhoods Served",
                ].map((item) => (
                  <li key={item} className="text-green-100">{item}</li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">⚡ Our Response Time</h3>
              <p className="text-sm text-gray-700">
                We respond within minutes during business hours.
                Phone calls are answered live. Form submissions receive a callback within 1 hour during business hours. Emergencies are
                dispatched immediately.
              </p>
            </div>

            {/* Service area */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                We Serve All of NYC Metro
              </h3>
              <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                {[
                  "Manhattan", "Brooklyn", "Queens",
                  "The Bronx", "Staten Island", "New Jersey",
                  "Long Island", "Westchester",
                ].map((area) => (
                  <span key={area} className="flex items-center gap-1">
                    <span className="text-green-600">✓</span> {area}
                  </span>
                ))}
              </div>
              <a
                href="/areas"
                className="inline-block mt-3 text-green-700 text-sm font-semibold hover:underline"
              >
                View all 318 neighborhoods →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">
          Pest Emergency? Don't Wait.
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
          Same-day emergency service available across all NYC boroughs, NJ,
          Long Island, and Westchester.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition"
          >
            📞 Call {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  );
}
