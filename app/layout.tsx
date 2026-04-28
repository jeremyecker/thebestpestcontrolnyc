import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thebestpestcontrolnyc.com"),
  title: {
    default: "NYC Exterminator | Licensed Pest Control — The Best Pest Control NYC",
    template: "%s | The Best Pest Control NYC",
  },
  description:
    "NYC exterminator serving 318+ neighborhoods across NYC, NJ, Long Island & Westchester. NYS DEC licensed. 32 pest types eliminated. Free inspection. No money upfront. Guaranteed.",
  keywords: [
    "pest control NYC",
    "exterminator NYC",
    "cockroach extermination NYC",
    "bed bug treatment NYC",
    "rat extermination NYC",
    "pest control New York",
  ],
  verification: {
    other: {
      "msvalidate.01": "7269DBA7AB2884805155E8C4E40544B8",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thebestpestcontrolnyc.com",
    siteName: "The Best Pest Control NYC",
    title: "The Best Pest Control NYC | Licensed Exterminators",
    description:
      "NYS DEC licensed exterminators serving 318+ NYC neighborhoods. 32 pest types eliminated. Free inspection. No money upfront.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The Best Pest Control NYC | Licensed Exterminators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Pest Control NYC",
    description: "NYS DEC licensed exterminators. 318+ neighborhoods. Free inspection.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: 'https://thebestpestcontrolnyc.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Ahrefs Web Analytics */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="QpYgL+Wg2xyFi8YhrpnFkw" async />
          <meta property="og:image" content="/images/og-default.jpg" />
  </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Google Analytics 4 — add NEXT_PUBLIC_GA_ID env var in Vercel to activate */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
