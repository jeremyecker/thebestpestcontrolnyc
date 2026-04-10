import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thebestpestcontrolnyc.com"),
  title: {
    default: "The Best Pest Control NYC | Licensed Exterminators — 310+ Neighborhoods",
    template: "%s | The Best Pest Control NYC",
  },
  description:
    "NYS DEC licensed exterminators serving 310+ neighborhoods across NYC, NJ, Long Island & Westchester. 32 pest types eliminated. Free inspection. No money upfront. Guaranteed results.",
  keywords: [
    "pest control NYC",
    "exterminator NYC",
    "cockroach extermination NYC",
    "bed bug treatment NYC",
    "rat extermination NYC",
    "pest control New York",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.thebestpestcontrolnyc.com",
    siteName: "The Best Pest Control NYC",
    title: "The Best Pest Control NYC | Licensed Exterminators",
    description:
      "NYS DEC licensed exterminators serving 310+ NYC neighborhoods. 32 pest types eliminated. Free inspection. No money upfront.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Pest Control NYC",
    description: "NYS DEC licensed exterminators. 310+ neighborhoods. Free inspection.",
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
    canonical: "https://www.thebestpestcontrolnyc.com",
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
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
