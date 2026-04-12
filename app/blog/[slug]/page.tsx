import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/blog";
import { SERVICES } from "@/data/services";
import { AREAS } from "@/data/areas";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: "The Best Pest Control NYC" };
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: {
      canonical: `https://www.thebestpestcontrolnyc.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.thebestpestcontrolnyc.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const relatedServices = post.relatedServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter(Boolean) as (typeof SERVICES)[number][];

  const relatedAreas = post.relatedAreas
    .map((slug) => AREAS.find((a) => a.slug === slug))
    .filter(Boolean) as (typeof AREAS)[number][];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.metaDescription,
        author: {
          "@type": "Organization",
          name: "The Best Pest Control NYC",
          url: "https://www.thebestpestcontrolnyc.com",
        },
        publisher: {
          "@type": "Organization",
          name: "The Best Pest Control NYC",
          url: "https://www.thebestpestcontrolnyc.com",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.thebestpestcontrolnyc.com/blog/${post.slug}`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.thebestpestcontrolnyc.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.thebestpestcontrolnyc.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://www.thebestpestcontrolnyc.com/blog/${post.slug}`,
          },
        ],
      },
      ...(post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-100 px-4 py-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>
        {" › "}
        <Link href="/blog" className="hover:text-green-700">
          Blog
        </Link>
        {" › "}
        <span className="text-gray-900 font-medium">{post.title}</span>
      </nav>

      {/* Hero */}
      <section className="bg-green-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-green-200 text-sm mb-4">
            <span>{post.readTime} min read</span>
            <span>·</span>
            <Link href="/blog" className="hover:text-white underline">
              Back to Blog
            </Link>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Article content */}
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Mid-article CTA */}
        <div className="my-12 bg-green-800 text-white rounded-2xl p-8 text-center">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
          >
            Dealing With a Pest Problem?
          </h2>
          <p className="text-green-100 mb-6">
            Licensed NYC exterminators. Free inspection. No money upfront. Same-day available.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-white text-green-800 font-bold px-6 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href="/contact"
              className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
            >
              Book Online
            </a>
          </div>
        </div>

        {/* FAQs */}
        {post.faqs.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-3xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-green-700 ml-4 group-open:rotate-180 transition-transform shrink-0">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
            >
              Related Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-4 text-sm text-gray-700 hover:text-green-800 transition"
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-green-600 text-xs mt-1">{s.priceRange}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related areas */}
        {relatedAreas.length > 0 && (
          <section className="mb-12">
            <h2
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
            >
              Serving These NYC Neighborhoods
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="block bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-lg p-3 text-sm font-medium text-gray-700 hover:text-green-800 transition"
                >
                  {a.name} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="bg-green-800 text-white rounded-2xl p-10 text-center">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "\'Barlow Condensed\', sans-serif" }}
          >
            Ready to Get Rid of Pests for Good?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            NYS DEC licensed exterminators. Free inspection. No money upfront. 318+ neighborhoods
            served.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              className="bg-white text-green-800 font-bold px-8 py-4 rounded-lg text-lg hover:bg-green-50 transition"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href="/contact"
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition"
            >
              Book Online
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
