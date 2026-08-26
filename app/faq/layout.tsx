import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "NYC Pest Control FAQ | The Best Pest Control NYC" },
  description:
    "Answers to common pest control questions in NYC — pricing, treatments, bed bugs, rodents, cockroaches, and more. Free phone quote. Licensed and insured exterminators across NY, NJ, and PA.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/faq" },
  openGraph: {
    title: "NYC Pest Control FAQ | The Best Pest Control NYC",
    description: "Answers to common pest control questions in NYC — pricing, treatments, bed bugs, rodents, cockroaches, and more. Free phone quote. Licensed and insured exterminators across NY, NJ, and PA.",
    url: "https://www.thebestpestcontrolnyc.com/faq",
    siteName: "The Best Pest Control NYC",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.thebestpestcontrolnyc.com/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NYC Pest Control FAQ | The Best Pest Control NYC",
    description: "Answers to common pest control questions in NYC — pricing, treatments, bed bugs, rodents, cockroaches, and more. Free phone quote. Licensed and insured exterminators across NY, NJ, and PA.",
  },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
