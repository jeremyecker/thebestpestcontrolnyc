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
  introParagraphs: string[];
  signsSection: string;
  treatmentSection: string;
  whyProfessional: string;
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
// LOADERS
// ─────────────────────────────────────────

/**
 * Load content for a service × area combo page.
 * Returns null if content file doesn't exist yet.
 *
 * Usage in app/[area]/[service]/page.tsx:
 *   const content = getComboContent(areaSlug, serviceSlug);
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
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as ComboContent;
}

/**
 * Load content for a service page.
 * Returns null if content file doesn't exist yet.
 *
 * Usage in app/services/[slug]/page.tsx:
 *   const content = getServiceContent(slug);
 */
export function getServiceContent(serviceSlug: string): ServiceContent | null {
  const filePath = path.join(CONTENT_DIR, "services", `${serviceSlug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as ServiceContent;
}

/**
 * Load content for an area page.
 * Returns null if content file doesn't exist yet.
 *
 * Usage in app/areas/[slug]/page.tsx:
 *   const content = getAreaContent(slug);
 */
export function getAreaContent(areaSlug: string): AreaContent | null {
  const filePath = path.join(CONTENT_DIR, "areas", `${areaSlug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as AreaContent;
}

/**
 * Get all available combo slugs — used by generateStaticParams()
 * to tell Next.js which pages to build.
 *
 * Usage in app/[area]/[service]/page.tsx:
 *   export async function generateStaticParams() {
 *     return getAllComboSlugs();
 *   }
 */
export function getAllComboSlugs(): { area: string; service: string }[] {
  const combosDir = path.join(CONTENT_DIR, "combos");
  if (!fs.existsSync(combosDir)) return [];

  return fs
    .readdirSync(combosDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const [area, service] = f.replace(".json", "").split("--");
      return { area, service };
    });
}

/**
 * Get all available service slugs.
 *
 * Usage in app/services/[slug]/page.tsx:
 *   export async function generateStaticParams() {
 *     return getAllServiceSlugs().map(slug => ({ slug }));
 *   }
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
 *
 * Usage in app/areas/[slug]/page.tsx:
 *   export async function generateStaticParams() {
 *     return getAllAreaSlugs().map(slug => ({ slug }));
 *   }
 */
export function getAllAreaSlugs(): string[] {
  const areasDir = path.join(CONTENT_DIR, "areas");
  if (!fs.existsSync(areasDir)) return [];

  return fs
    .readdirSync(areasDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

/**
 * Get all combo slugs from the content directory.
 * Used by generateStaticParams in combo page.
 */
export function getAllComboSlugsFromFiles(): { area: string; service: string }[] {
  const combosDir = path.join(CONTENT_DIR, "combos");
  if (!fs.existsSync(combosDir)) return [];
  try {
    const files = fs.readdirSync(combosDir);
    return files
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
  } catch {
    return [];
  }
}

/**
 * Get all service content slugs.
 */
export function getAllServiceContentSlugs(): string[] {
  const servicesDir = path.join(CONTENT_DIR, "services");
  if (!fs.existsSync(servicesDir)) return [];
  try {
    return fs
      .readdirSync(servicesDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}

/**
 * Get all area content slugs.
 */
export function getAllAreaContentSlugs(): string[] {
  const areasDir = path.join(CONTENT_DIR, "areas");
  if (!fs.existsSync(areasDir)) return [];
  try {
    return fs
      .readdirSync(areasDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}
