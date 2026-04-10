"use client";

/**
 * components/CTABanner.tsx
 * ========================
 * Reusable CTA banner — 3 variants, used throughout every page.
 *
 * Variants:
 *   "full"    — Large section with headline, trust badges, 3 buttons (default)
 *   "compact" — Smaller inline CTA with buttons only
 *   "form"    — Splits layout: left copy + right embedded contact form
 *
 * Usage:
 *   <CTABanner />
 *   <CTABanner variant="compact" headline="Need Cockroach Treatment in Williamsburg?" />
 *   <CTABanner variant="form" source="service-cockroach-extermination" />
 */

import { useState } from "react";
import ContactForm from "./ContactForm";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "YOUR-PHONE-NUMBER";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(212) 000-0000";

interface CTABannerProps {
  variant?: "full" | "compact" | "form";
  headline?: string;
  subhead?: string;
  preselectedPest?: string;
  source?: string;
  dark?: boolean; // dark=true uses green-800 bg, dark=false uses white/gray
}

export default function CTABanner({
  variant = "full",
  headline = "Your Pest Problem Ends Here.",
  subhead = "Licensed exterminators. Free inspection. No money upfront. Same-day available.",
  preselectedPest = "",
  source = "cta-banner",
  dark = true,
}: CTABannerProps) {

  // ── COMPACT VARIANT ──────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <section className={`rounded-2xl p-6 md:p-8 ${dark ? "bg-green-800 text-white" : "bg-green-50 border border-green-200"}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className={`text-xl font-bold mb-1 ${dark ? "text-white" : "text-green-900"}`}>
              {headline}
            </h2>
            <p className={`text-sm ${dark ? "text-green-100" : "text-green-700"}`}>
              {subhead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className={`font-bold px-5 py-3 rounded-xl text-sm transition ${dark ? "bg-white text-green-800 hover:bg-green-50" : "bg-green-700 text-white hover:bg-green-600"}`}
            >
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={`sms:${PHONE_NUMBER}`}
              className={`font-bold px-5 py-3 rounded-xl text-sm transition border ${dark ? "border-green-400 bg-green-600 text-white hover:bg-green-500" : "border-green-700 text-green-700 hover:bg-green-50"}`}
            >
              💬 Text Us
            </a>
            <a
              href="/contact"
              className="bg-yellow-400 text-gray-900 font-bold px-5 py-3 rounded-xl text-sm hover:bg-yellow-300 transition"
            >
              📅 Book Online
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ── FORM VARIANT ─────────────────────────────────────────────────────
  if (variant === "form") {
    return (
      <section className={`rounded-2xl overflow-hidden ${dark ? "bg-green-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — copy */}
          <div className={`p-8 md:p-12 flex flex-col justify-center ${dark ? "text-white" : "text-gray-900"}`}>
            <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
              FREE INSPECTION
            </div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {headline}
            </h2>
            <p className={`text-lg mb-6 ${dark ? "text-green-100" : "text-gray-600"}`}>
              {subhead}
            </p>
            <ul className="space-y-2">
              {[
                "No money upfront — pay when done",
                "Response within minutes",
                "Same-day service available",
                "Licensed & insured exterminators",
                "30–365 day guarantee",
              ].map((item) => (
                <li key={item} className={`flex items-center gap-2 text-sm ${dark ? "text-green-100" : "text-gray-600"}`}>
                  <span className="text-green-400 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className={`mt-8 pt-6 border-t ${dark ? "border-green-600" : "border-gray-200"}`}>
              <p className={`text-sm mb-2 ${dark ? "text-green-200" : "text-gray-500"}`}>
                Prefer to call or text?
              </p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className={`text-xl font-bold hover:underline ${dark ? "text-white" : "text-green-700"}`}
              >
                📞 {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8 md:p-10 bg-white">
            <ContactForm
              compact
              preselectedPest={preselectedPest}
              source={source}
            />
          </div>
        </div>
      </section>
    );
  }

  // ── FULL VARIANT (default) ────────────────────────────────────────────
  return (
    <section className={`py-16 px-4 text-center ${dark ? "bg-green-800 text-white" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${dark ? "text-white" : "text-gray-900"}`}>
          {headline}
        </h2>
        <p className={`text-lg mb-6 ${dark ? "text-green-100" : "text-gray-600"}`}>
          {subhead}
        </p>

        {/* Trust badges */}
        <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm font-semibold ${dark ? "text-green-200" : "text-green-700"}`}>
          <span>✓ No money upfront</span>
          <span>✓ 5,000+ five-star reviews</span>
          <span>✓ 100% satisfaction guarantee</span>
          <span>✓ Licensed & insured</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className={`font-bold px-8 py-4 rounded-xl text-lg transition ${dark ? "bg-white text-green-800 hover:bg-green-50" : "bg-green-700 text-white hover:bg-green-600"}`}
          >
            📞 Call {PHONE_DISPLAY}
          </a>
          <a
            href={`sms:${PHONE_NUMBER}`}
            className={`font-bold px-8 py-4 rounded-xl text-lg transition border ${dark ? "border-green-400 bg-green-600 text-white hover:bg-green-500" : "border-green-700 text-green-700 hover:bg-green-50"}`}
          >
            💬 Text Us Now
          </a>
          <a
            href="/contact"
            className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition"
          >
            📅 Book Online
          </a>
        </div>
      </div>
    </section>
  );
}
