import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | The Best Pest Control NYC" },
  description: "Terms of Service for The Best Pest Control NYC. Read the terms governing use of our website and pest control services.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Terms of Service
          </h1>
          <p className="text-green-200 text-sm">Last updated: April 2025</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-gray-600 leading-relaxed mb-8">
            Welcome to The Best Pest Control NYC. By accessing or using our website at{" "}
            <a href="https://www.thebestpestcontrolnyc.com" className="text-green-700 hover:underline">www.thebestpestcontrolnyc.com</a>{" "}
            (the &quot;Site&quot;) or engaging our pest control services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). Please read them carefully.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By using our Site or services, you confirm that you are at least 18 years old, have the legal capacity to enter into agreements, and agree to these Terms and our{" "}
            <Link href="/privacy" className="text-green-700 hover:underline">Privacy Policy</Link>.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">2. Services</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Best Pest Control NYC provides residential and commercial pest control, extermination, rodent control, wildlife removal, and related services in the New York City metro area. All services are subject to a separate written service agreement provided at the time of booking.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Service availability, pricing, and treatment methods are subject to change without notice. Prices quoted on our Site are estimates only. Final pricing is provided after an on-site inspection.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">3. Phone &amp; SMS Communications Consent</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By submitting your phone number through any form on our Site, or by calling us directly, you expressly consent to being contacted by The Best Pest Control NYC at the number you provided, including by telephone calls, for purposes related to your pest control inquiry, service scheduling, and follow-up.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>SMS / Text Messaging Consent:</strong> By providing your phone number and opting in to text communications (whether by checking an opt-in box, texting our number first, or otherwise indicating consent), you agree to receive recurring automated text messages from The Best Pest Control NYC related to your service inquiry, appointment reminders, and service updates.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Consent to receive text messages is not a condition of purchase.</li>
            <li>Message frequency varies based on your inquiry and service schedule.</li>
            <li>Standard message and data rates may apply.</li>
            <li>To opt out at any time, reply <strong>STOP</strong> to any text message. You will receive a one-time confirmation and no further messages.</li>
            <li>For assistance, reply <strong>HELP</strong> or contact us via{" "}
              <Link href="/get-a-quote" className="text-green-700 hover:underline">our contact page</Link>.
            </li>
            <li>We do not sell, share, or transfer your phone number or SMS opt-in data to third parties for marketing purposes.</li>
          </ul>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">4. Website Use</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree to use the Site only for lawful purposes. You may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Use the Site to transmit spam, malware, or harmful content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Scrape or automatically harvest data from the Site without our written consent</li>
            <li>Use the Site in a way that could damage, disable, or impair our services</li>
          </ul>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on the Site &mdash; including text, images, logos, and design &mdash; is owned by or licensed to The Best Pest Control NYC and protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Site and its content are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the Site will be error-free, uninterrupted, or free of viruses or other harmful components.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Information on the Site (including pricing estimates, service descriptions, and pest-related content) is provided for general informational purposes only and does not constitute professional pest management advice for any specific situation.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To the maximum extent permitted by law, The Best Pest Control NYC shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Site or our services. Our total liability for any claim arising under these Terms shall not exceed the amount paid by you for the specific service giving rise to the claim.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">8. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms are governed by the laws of the State of New York, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in New York County, New York.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">9. Changes to These Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after changes constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Questions about these Terms? Visit our{" "}
            <Link href="/get-a-quote" className="text-green-700 hover:underline">contact page</Link> or call{" "}
            <a href="tel:8559305016" className="text-green-700 hover:underline">(855) 930-5016</a>.
          </p>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm">&copy; {year} The Best Pest Control NYC. All rights reserved.</p>
          </div>
        </div>
      </section>
    </>
  );
}
