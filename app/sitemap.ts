import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://www.thebestpestcontrolnyc.com";

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

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/pests`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/areas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/get-a-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const boroughHubPages: MetadataRoute.Sitemap = BOROUGH_HUBS.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${BASE_URL}/pests/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = AREAS.map((area) => ({
    url: `${BASE_URL}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comboPages: MetadataRoute.Sitemap = AREAS.flatMap((area) =>
    SERVICES.map((service) => ({
      url: `${BASE_URL}/${area.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...boroughHubPages, ...servicePages, ...areaPages, ...blogPages, ...comboPages];
}
