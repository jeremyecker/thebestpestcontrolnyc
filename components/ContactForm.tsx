"use client";

/**
 * components/ContactForm.tsx
 * ==========================
 * Reusable contact form — submits to CRM via webhook.
 * Used on: Contact page, embedded in service pages, area pages, combo pages.
 *
 * Props:
 *   - compact?: boolean  — smaller version for embedding mid-page
 *   - preselectedPest?   — pre-fill pest type (used on service pages)
 *   - source?            — tags the submission with page origin for CRM tracking
 */

import { useState } from "react";

// ─── REPLACE BEFORE LAUNCH ───────────────────────────────────────────
const WEBHOOK_URL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL || "YOUR_WEBHOOK_URL_HERE";
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";
// ─────────────────────────────────────────────────────────────────────

const PEST_TYPES = [
  "Cockroaches",
  "Bed Bugs",
  "Rats",
  "Mice",
  "Termites",
  "Ants",
  "Wasps",
  "Bees",
  "Hornets",
  "Yellow Jackets",
  "Mosquitoes",
  "Fleas",
  "Ticks",
  "Flies",
  "Spiders",
  "Raccoons",
  "Squirrels",
  "Pigeons",
  "Bats",
  "Moths",
  "Silverfish",
  "Centipedes",
  "Crickets",
  "Stink Bugs",
  "Drain Flies",
  "Pantry Pests",
  "Carpenter Ants",
  "Rodent Proofing",
  "General Pest Control",
  "Emergency Pest Control",
  "Commercial Pest Control",
  "Restaurant Pest Control",
  "Not Sure / Multiple Pests",
];

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  compact?: boolean;
  preselectedPest?: string;
  source?: string;
}

export default function ContactForm({
  compact = false,
  preselectedPest = "",
  source = "website",
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    propertyType: "" as "residential" | "commercial" | "",
    pestType: preselectedPest,
    description: "",
    smsConsent: false,
  });

  // ── Validation ──────────────────────────────────────────────────────
  function validate() {
    const errs: Record<string, string> = {};
    if (!fields.name.trim()) errs.name = "Your name is required.";
    if (!fields.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^[\d\s\-\(\)\+]{7,}$/.test(fields.phone)) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!fields.propertyType) errs.propertyType = "Please select residential or commercial.";
    if (!fields.pestType) errs.pestType = "Please select a pest type.";
    if (!fields.smsConsent) errs.smsConsent = "Please check the consent box to continue.";
    return errs;
  }

  // ── Submit ───────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");

    try {
      const payload = {
        // Core fields
        name: fields.name.trim(),
        phone: fields.phone.trim(),
        email: fields.email.trim() || null,
        property_type: fields.propertyType,
        pest_type: fields.pestType,
        description: fields.description.trim() || null,
        // CRM metadata
        sms_consent: fields.smsConsent,
        source: source,
        submitted_at: new Date().toISOString(),
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Webhook returned ${res.status}`);
      setFormState("success");
    } catch (err) {
      console.error("Form submission error:", err);
      setFormState("error");
    }
  }

  function update(field: keyof typeof fields, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  // ── Success State ────────────────────────────────────────────────────
  if (formState === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          We Got Your Request!
        </h3>
        <p className="text-green-700 mb-6">
          A licensed exterminator will reach out within minutes during business hours.
          For urgent situations, call us directly.
        </p>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-block bg-green-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition"
        >
          📞 Call {PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────
  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-gray-900 text-base transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-300 bg-white hover:border-green-400"
    }`;

  return (
    <div className={compact ? "" : "bg-white rounded-2xl shadow-lg p-8"}>
      {!compact && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Get a Free Pest Inspection
          </h2>
          <p className="text-gray-500 text-sm">
            We respond within minutes during business hours. No money upfront.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass("name")}
            autoComplete="name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="(212) 555-0000"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass("phone")}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass("email")}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Residential / Commercial */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["residential", "commercial"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update("propertyType", type)}
                className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm capitalize transition ${
                  fields.propertyType === type
                    ? "border-green-600 bg-green-50 text-green-800"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                }`}
              >
                {type === "residential" ? "🏠 Residential" : "🏢 Commercial"}
              </button>
            ))}
          </div>
          {errors.propertyType && (
            <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
          )}
        </div>

        {/* Pest Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Pest Type <span className="text-red-500">*</span>
          </label>
          <select
            value={fields.pestType}
            onChange={(e) => update("pestType", e.target.value)}
            className={inputClass("pestType")}
          >
            <option value="">— Select a pest type —</option>
            {PEST_TYPES.map((pest) => (
              <option key={pest} value={pest}>
                {pest}
              </option>
            ))}
          </select>
          {errors.pestType && (
            <p className="text-red-500 text-sm mt-1">{errors.pestType}</p>
          )}
        </div>

        {/* Description (optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Describe what you&#39;re seeing — where, how many, how long, and what the pest looks like."
            value={fields.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-base transition focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 resize-none"
          />
        </div>

        {/* SMS / Contact Consent */}
        <div className="flex items-start gap-3">
          <input
            id="smsConsent"
            type="checkbox"
            checked={fields.smsConsent}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, smsConsent: e.target.checked }));
              if (errors.smsConsent) setErrors((prev) => ({ ...prev, smsConsent: "" }));
            }}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
          />
          <label htmlFor="smsConsent" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
            I agree to be contacted by The Best Pest Control NYC via phone or text message regarding my request. Message &amp; data rates may apply. You can reply STOP at any time to opt out.{" "}
            <a href="/privacy" className="text-green-700 hover:underline">Privacy Policy</a>{" "}
            &amp;{" "}
            <a href="/terms" className="text-green-700 hover:underline">Terms of Service</a>.
          </label>
        </div>
        {errors.smsConsent && (
          <p className="text-red-500 text-sm -mt-2">{errors.smsConsent}</p>
        )}

        {/* Error state */}
        {formState === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            Something went wrong submitting your request. Please call us
            directly at{" "}
            <a href={`tel:${PHONE_NUMBER}`} className="font-bold underline">
              {PHONE_DISPLAY}
            </a>{" "}
            and we&#39;ll get you scheduled immediately.
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-xl text-lg transition flex items-center justify-center gap-2"
        >
          {formState === "submitting" ? (
            <>
              <span className="animate-spin">⏳</span>
              Sending Your Request...
            </>
          ) : (
            "Get My Free Inspection →"
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          No money upfront. We respond within minutes during business hours.
          <br />
          Prefer to call?{" "}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-green-700 font-semibold hover:underline"
          >
            {PHONE_DISPLAY}
          </a>
        </p>
      </form>
    </div>
  );
}
