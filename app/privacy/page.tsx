import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | The Best Pest Control NYC" },
  description: "Privacy Policy for The Best Pest Control NYC. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.thebestpestcontrolnyc.com/privacy" },
  robots: { index: false },
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Privacy Policy
          </h1>
          <p className="text-green-200 text-sm">Last updated: April 2025</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">

          <p className="text-gray-600 leading-relaxed mb-8">
            The Best Pest Control NYC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{" "}
            <a href="https://www.thebestpestcontrolnyc.com" className="text-green-700 hover:underline">www.thebestpestcontrolnyc.com</a> (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our Site or contact us for pest control services.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li><strong>Contact information:</strong> name, phone number, address, and any details you share when submitting a contact form or booking a service.</li>
            <li><strong>Communications:</strong> records of phone calls, form submissions, and any other correspondence with us.</li>
            <li><strong>Device and usage data:</strong> IP address, browser type, pages visited, time spent on site, and referring URLs &mdash; collected automatically via cookies and similar technologies.</li>
          </ul>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Schedule and provide pest control services</li>
            <li>Contact you by phone in response to your inquiry</li>
            <li>Send appointment confirmations and follow-up communications</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">3. Phone &amp; SMS Communications</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By submitting your phone number through our contact form or calling us directly, you consent to being contacted by The Best Pest Control NYC by telephone regarding your pest control inquiry. We may call you to schedule an inspection, provide a quote, or follow up on your service.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>SMS / Text Messaging:</strong> If you opt in to receive SMS messages from us (for example, by providing your phone number and checking an opt-in box, or by texting us first), you agree to receive text messages related to your service inquiry, appointment reminders, and follow-up communications.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li><strong>Message frequency:</strong> Message frequency varies based on your inquiry and service schedule.</li>
            <li><strong>Message &amp; data rates:</strong> Standard message and data rates may apply depending on your carrier plan.</li>
            <li><strong>Opt-out:</strong> You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any text message you receive from us. After opting out, you will receive a single confirmation message and no further SMS messages.</li>
            <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance, or contact us at{" "}
              <Link href="/contact" className="text-green-700 hover:underline">our contact page</Link>.
            </li>
            <li><strong>No sharing:</strong> We do not sell, rent, or share your mobile phone number or SMS opt-in data with third parties for their marketing purposes.</li>
          </ul>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">4. Cookies &amp; Analytics</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use Google Analytics (GA4) to understand how visitors interact with our Site. GA4 uses cookies &mdash; small text files stored on your device &mdash; to collect anonymized usage data such as pages visited, session duration, and referral source. This data helps us improve our website.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can opt out of Google Analytics tracking by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">5. Call Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use call tracking technology to measure the effectiveness of our advertising and understand how customers find us. Phone calls to our tracking numbers may be recorded for quality assurance and training purposes. By calling us, you consent to the possibility of call recording.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">6. Sharing of Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We do not sell your personal information. We may share information with:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li><strong>Service providers:</strong> Third-party vendors (such as scheduling software, analytics, and call tracking platforms) who assist us in operating our business, bound by confidentiality agreements.</li>
            <li><strong>Legal compliance:</strong> When required by law or to protect our rights.</li>
          </ul>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">7. Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">8. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You may request access to, correction of, or deletion of your personal information by contacting us at{" "}
            <Link href="/contact" className="text-green-700 hover:underline">our contact page</Link>. We will respond to verifiable requests within a reasonable timeframe.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">9. Children&apos;s Privacy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Site and services are not directed at children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">10. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Site after changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-2xl text-gray-900 font-bold mt-8 mb-4">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            If you have questions about this Privacy Policy or how we handle your information, please visit our{" "}
            <Link href="/contact" className="text-green-700 hover:underline">contact page</Link> or call us at{" "}
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
