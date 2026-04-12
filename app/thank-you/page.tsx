/**
 * app/thank-you/page.tsx
 * ======================
 * Shown after successful contact form submission.
 * Also useful for Google Ads conversion tracking.
 */

import type { Metadata } from "next";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

export const metadata: Metadata = {
  title: "Request Received | The Best Pest Control NYC",
  description: "We received your pest control request and will be in touch shortly.",
  robots: { index: false }, // don't index thank-you page
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center">

        <div className="text-7xl mb-6">✅</div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          We Got Your Request!
        </h1>

        <p className="text-xl text-gray-600 mb-4">
          A licensed exterminator will reach out within minutes during business
          hours to confirm your free inspection.
        </p>

        <p className="text-gray-500 mb-10">
          For urgent pest situations — active wasp nests, restaurant
          inspections, bed bug crises — call us directly for the fastest
          response.
        </p>

        {/* Direct contact */}
        <div className="flex justify-center mb-12">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-600 transition"
          >
            📞 Call {PHONE_DISPLAY}
          </a>
        </div>

        {/* What happens next */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-left">
          <h2 className="font-bold text-green-900 text-lg mb-4">
            What Happens Next
          </h2>
          <ol className="space-y-3 text-sm text-green-800">
            {[
              "We'll call you within minutes to confirm details about your pest situation.",
              "We'll schedule a free inspection at a time that works for you — same-day available.",
              "A licensed exterminator arrives, inspects your property, and gives you a written quote.",
              "You approve the plan. We treat. Pests gone. Guaranteed.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 font-bold text-xs">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <a href="/" className="inline-block mt-8 text-green-700 font-semibold hover:underline">
          ← Back to Homepage
        </a>
      </div>
    </section>
  );
}
