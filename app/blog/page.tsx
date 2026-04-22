import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, stripHtml } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: "NYC Pest Control Blog | Expert Exterminator Tips" },
  description:
    "Expert pest control advice for NYC apartments, restaurants, and buildings. Cockroaches, bed bugs, rats, mice, and more from licensed NYC exterminators.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/blog" },
};

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const TOPIC_TAGS: Record<string, string> = {
  "how-to-identify-cockroaches-nyc-apartment": "Cockroaches",
  "what-attracts-cockroaches-nyc-apartments": "Cockroaches",
  "cockroach-vs-waterbug-difference": "Cockroaches",
  "why-bug-bombs-dont-work-nyc-apartments": "Cockroaches",
  "bed-bug-signs-how-to-check-nyc-apartment": "Bed Bugs",
  "how-bed-bugs-spread-nyc-buildings": "Bed Bugs",
  "check-bed-bugs-hotels-airbnbs": "Bed Bugs",
  "how-to-mouse-proof-nyc-apartment": "Rodents",
  "get-rid-of-mice-without-poison-pet-safe": "Rodents",
  "how-to-deal-with-rats-nyc-building": "Rodents",
  "nyc-tenant-rights-pest-control": "NYC Living",
  "how-to-prepare-for-exterminator-visit-nyc": "NYC Living",
  "nyc-seasonal-pest-calendar": "NYC Living",
  "pest-control-before-moving-nyc-apartment-checklist": "NYC Living",
  "nyc-coop-condo-pest-control-responsibility": "NYC Living",
  "how-to-get-rid-of-drain-flies-nyc": "Other Pests",
  "signs-of-termites-nyc": "Other Pests",
  "natural-pest-control-methods-nyc": "Tips & Guides",
  "pet-safe-pest-control-nyc-apartments": "Tips & Guides",
  "nyc-restaurant-pest-control-doh-compliance": "Commercial",
};

const TAG_COLORS: Record<string, string> = {
  Cockroaches: "bg-orange-100 text-orange-800",
  "Bed Bugs": "bg-red-100 text-red-800",
  Rodents: "bg-yellow-100 text-yellow-800",
  "NYC Living": "bg-blue-100 text-blue-800",
  "Other Pests": "bg-purple-100 text-purple-800",
  "Tips & Guides": "bg-green-100 text-green-800",
  Commercial: "bg-gray-100 text-gray-800",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
          >
            NYC Pest Control Blog
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Expert advice from licensed NYC exterminators. Cockroaches, bed bugs, rodents, and
            more — practical guides for apartments, co-ops, condos, and restaurants.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>
        {" › "}
        <span className="text-gray-900 font-medium">Blog</span>
      </nav>

      {/* Article grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const tag = TOPIC_TAGS[post.slug] || "Tips & Guides";
            const tagColor = TAG_COLORS[tag] || "bg-gray-100 text-gray-800";
            const excerpt = stripHtml(post.content);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-green-300 transition group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColor}`}>
                    {tag}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime} min read</span>
                </div>
                <h2
                  className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-green-800 transition"
                  style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">{excerpt}</p>
                <div className="mt-4 text-green-700 text-sm font-semibold">Read article →</div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-green-800 text-white rounded-2xl p-10 text-center">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
          >
            Dealing With a Pest Problem Right Now?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            NYS DEC licensed exterminators. Free inspection. No money upfront. Same-day available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href="/get-a-quote"
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
