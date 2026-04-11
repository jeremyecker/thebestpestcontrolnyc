import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";

const BASE_URL = "https://www.thebestpestcontrolnyc.com";

// Borough hub slugs (static pages under /areas/)
const BOROUGH_HUBS = [
  "manhattan",
  "brooklyn",
  "queens",
  "the-bronx",
  "staten-island",
  "new-jersey",
  "long-island",
  "westchester",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/areas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  // Borough hub pages
  const boroughHubPages: MetadataRoute.Sitemap = BOROUGH_HUBS.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Area pages
  const areaPages: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${BASE_URL}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Combo pages — area × service (10,176+ pages)
  // Included so Googlebot can discover all geo-targeted service pages.
  const comboPages: MetadataRoute.Sitemap = AREAS.flatMap((area) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/${area.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...boroughHubPages, ...servicePages, ...areaPages, ...comboPages];
}
