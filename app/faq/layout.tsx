import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pest Control FAQ NYC | The Best Pest Control NYC",
  description:
    "Answers to the most common pest control questions in NYC — pricing, safety, guarantees, licensing, and more. Free inspection, no money upfront.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/faq" },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
