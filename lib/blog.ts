import p01 from "@/data/blog/bed-bug-signs-how-to-check-nyc-apartment.json";
import p02 from "@/data/blog/check-bed-bugs-hotels-airbnbs.json";
import p03 from "@/data/blog/cockroach-vs-waterbug-difference.json";
import p04 from "@/data/blog/get-rid-of-mice-without-poison-pet-safe.json";
import p05 from "@/data/blog/how-bed-bugs-spread-nyc-buildings.json";
import p06 from "@/data/blog/how-to-deal-with-rats-nyc-building.json";
import p07 from "@/data/blog/how-to-get-rid-of-drain-flies-nyc.json";
import p08 from "@/data/blog/how-to-identify-cockroaches-nyc-apartment.json";
import p09 from "@/data/blog/how-to-mouse-proof-nyc-apartment.json";
import p10 from "@/data/blog/how-to-prepare-for-exterminator-visit-nyc.json";
import p11 from "@/data/blog/natural-pest-control-methods-nyc.json";
import p12 from "@/data/blog/nyc-coop-condo-pest-control-responsibility.json";
import p13 from "@/data/blog/nyc-restaurant-pest-control-doh-compliance.json";
import p14 from "@/data/blog/nyc-seasonal-pest-calendar.json";
import p15 from "@/data/blog/nyc-tenant-rights-pest-control.json";
import p16 from "@/data/blog/pest-control-before-moving-nyc-apartment-checklist.json";
import p17 from "@/data/blog/pet-safe-pest-control-nyc-apartments.json";
import p18 from "@/data/blog/signs-of-termites-nyc.json";
import p19 from "@/data/blog/what-attracts-cockroaches-nyc-apartments.json";
import p20 from "@/data/blog/why-bug-bombs-dont-work-nyc-apartments.json";
import p21 from "@/data/blog/how-to-check-for-bed-bugs-nyc-apartment.json";

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedServices: string[];
  relatedAreas: string[];
  readTime: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RAW_POSTS: any[] = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21,
];

export const ALL_POSTS: BlogPost[] = RAW_POSTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  metaTitle: p.metaTitle || p.title,
  metaDescription: p.metaDescription || "",
  content: p.content || "",
  faqs: p.faqs || [],
  relatedServices: p.relatedServices || [],
  relatedAreas: p.relatedAreas || [],
  readTime: Math.max(1, Math.round((p.content?.split(" ")?.length ?? 0) / 200)),
}));

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPost(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function stripHtml(html: string, maxLen = 180): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen).replace(/\s+\S*$/, "") + "..." : text;
}
