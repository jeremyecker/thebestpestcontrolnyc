import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "NYC Pest Control FAQ | The Best Pest Control NYC" },
  description:
    "Answers to common pest control questions in NYC — pricing, treatments, bed bugs, rodents, cockroaches, and more. Free inspection. No money upfront. Licensed NYS DEC exterminators.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/faq" },
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
