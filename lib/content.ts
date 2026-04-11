/**
 * lib/content.ts
 * ==============
 * Helper functions for reading pre-generated content JSON files
 * into Next.js pages at build time. These are called inside
 * generateStaticParams() and page components.
 *
 * All functions are synchronous — content is read from the
 * local filesystem at build time, not fetched at runtime.
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─────────────────────────────────────────
// TYPES (match generateContent.ts exactly)
// ─────────────────────────────────────────

export interface ComboContent {
  metaTitle: string;
  metaDescription: string;
  heroParagraph: string;
  whyThisAreaSection: string;
  ourProcessSection: string;
  faqs: { q: string; a: string }[];
  generatedAt: string;
}

export interface ServiceContent {
  metaTitle: string;
  metaDescription: string;
  // Approved copy fields (new)
  h1?: string;
  heroParagraph?: string;
  bodyParagraphs?: string[];
  signs?: string[];
  treatmentApproach?: string;
  // Legacy generated fields (may exist in older files)
  introParagraphs?: string[];
  signsSection?: string;
  treatmentSection?: string;
  whyProfessional?: string;
  faqs: { q: string; a: string }[];
  generatedAt: string;
}

export interface AreaContent {
  metaTitle: string;
  metaDescription: string;
  introParagraph: string;
  commonPestsSection: string;
  faqs: { q: string; a: string }[];
  generatedAt: string;
}

// ─────────────────────────────────────────
// FIELD MAPPERS
// ─────────────────────────────────────────

/**
 * Normalize FAQ items — generated JSONs use { question, answer },
 * template expects { q, a }.
 */
function normalizeFaqs(faqs: unknown[]): { q: string; a: string }[] {
  if (!Array.isArray(faqs)) return [];
  return faqs.map((faq: any) => ({
    q: faq.q || faq.question || "",
    a: faq.a || faq.answer || "",
  }));
}

// ─────────────────────────────────────────
// LOADERS
// ─────────────────────────────────────────

/**
 * Load content for a service × area combo page.
 * Returns null if content file doesn't exist yet.
 *
 * Maps generated JSON fields to template-expected fields:
 *   title        → metaTitle
 *   intro        → heroParagraph
 *   localContext → whyThisAreaSection
 *   whyUs        → ourProcessSection
 *   faqs[].question/answer → faqs[].q/a
 */
export function getComboContent(
  areaSlug: string,
  serviceSlug: string
): ComboContent | null {
  const filePath = path.join(
    CONTENT_DIR,
    "combos",
    `${areaSlug}--${serviceSlug}.json`
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    metaTitle: raw.metaTitle || raw.title || "",
    metaDescription: raw.metaDescription || "",
    heroParagraph: raw.heroParagraph || raw.intro || "",
    whyThisAreaSection: raw.whyThisAreaSection || raw.localContext || "",
    ourProcessSection: raw.ourProcessSection || raw.whyUs || "",
    faqs: normalizeFaqs(raw.faqs || []),
    generatedAt: raw.generatedAt || "",
  };
}

/**
 * Load content for a service page.
 * Returns null if content file doesn't exist yet.
 */
export function getServiceContent(serviceSlug: string): ServiceContent | null {
  const filePath = path.join(CONTENT_DIR, "services", `${serviceSlug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    ...raw,
    metaTitle: raw.metaTitle || raw.title || "",
    faqs: normalizeFaqs(raw.faqs || []),
  };
}

/**
 * Load content for an area page.
 * Returns null if content file doesn't exist yet.
 *
 * Maps generated JSON fields to template-expected fields:
 *   title       → metaTitle
 *   intro       → introParagraph
 *   commonPests → commonPestsSection
 *   faqs[].question/answer → faqs[].q/a
 */
export function getAreaContent(areaSlug: string): AreaContent | null {
  const filePath = path.join(CONTENT_DIR, "areas", `${areaSlug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return {
    metaTitle: raw.metaTitle || raw.title || "",
    metaDescription: raw.metaDescription || "",
    introParagraph: raw.introParagraph || raw.intro || "",
    commonPestsSection: raw.commonPestsSection || raw.commonPests || raw.localContext || "",
    faqs: normalizeFaqs(raw.faqs || []),
    generatedAt: raw.generatedAt || "",
  };
}

/**
 * Get all available combo slugs — used by generateStaticParams()
 * to tell Next.js which pages to build.
 */
export function getAllComboSlugs(): { area: string; service: string }[] {
  const combosDir = path.join(CONTENT_DIR, "combos");
  if (!fs.existsSync(combosDir)) return [];

  return fs
    .readdirSync(combosDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const base = f.replace(".json", "");
      const separatorIndex = base.indexOf("--");
      if (separatorIndex === -1) return null;
      const area = base.substring(0, separatorIndex);
      const service = base.substring(separatorIndex + 2);
      return { area, service };
    })
    .filter((item): item is { area: string; service: string } => item !== null);
}

/**
 * Get all available service slugs.
 */
export function getAllServiceSlugs(): string[] {
  const servicesDir = path.join(CONTENT_DIR, "services");
  if (!fs.existsSync(servicesDir)) return [];

  return fs
    .readdirSync(servicesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

/**
 * Get all available area slugs.
 */
export function getAllAreaSlugs(): string[] {
  const areasDir = path.join(CONTENT_DIR, "areas");
  if (!fs.existsSync(areasDir)) return [];

  return fs
    .readdirSync(areasDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

// Aliases for backward compatibility
export const getAllComboSlugsFromFiles = getAllComboSlugs;
export const getAllServiceContentSlugs = getAllServiceSlugs;
export const getAllAreaContentSlugs = getAllAreaSlugs;
