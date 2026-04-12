import Link from "next/link";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

const SERVICES_LINKS = [
  { label: "Cockroach Extermination", href: "/services/cockroach-extermination" },
  { label: "Bed Bug Treatment", href: "/services/bed-bug-treatment" },
  { label: "Rat Extermination", href: "/services/rat-extermination" },
  { label: "Mouse Extermination", href: "/services/mouse-extermination" },
  { label: "Termite Treatment", href: "/services/termite-treatment" },
  { label: "Ant Control", href: "/services/ant-control" },
  { label: "Wasp Removal", href: "/services/wasp-removal" },
  { label: "Mosquito Control", href: "/services/mosquito-control" },
  { label: "Wildlife Removal", href: "/services/raccoon-removal" },
  { label: "All 32 Services →", href: "/services" },
];

const AREA_LINKS = [
  { label: "Manhattan", href: "/areas/manhattan" },
  { label: "Brooklyn", href: "/areas/brooklyn" },
  { label: "Queens", href: "/areas/queens" },
  { label: "The Bronx", href: "/areas/the-bronx" },
  { label: "Staten Island", href: "/areas/staten-island" },
  { label: "New Jersey", href: "/areas/hoboken" },
  { label: "Long Island", href: "/areas/garden-city" },
  { label: "Westchester", href: "/areas/white-plains" },
  { label: "All 318+ Areas →", href: "/areas" },
];

const QUICK_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Book Online", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top CTA bar */}
      <div className="bg-green-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-lg">Pest emergency? We&apos;re available 24/7.</p>
            <p className="text-green-200 text-sm">Same-day service across all NYC boroughs, NJ, Long Island &amp; Westchester.</p>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="bg-white text-green-800 font-bold px-5 py-2.5 rounded-lg hover:bg-green-50 transition text-sm"
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🐛</span>
            <div>
              <span className="font-bold text-white text-base leading-tight block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                THE BEST PEST CONTROL
              </span>
              <span className="text-xs text-green-400 font-semibold tracking-widest block -mt-0.5">
                NEW YORK CITY
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            NYS DEC licensed exterminators serving 318+ neighborhoods across NYC, NJ, Long Island, and Westchester. 32 pest types eliminated. Guaranteed.
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-green-400 font-semibold">✓ NYS DEC Licensed</p>
            <p className="text-green-400 font-semibold">✓ Fully Insured</p>
            <p className="text-green-400 font-semibold">✓ 4.9★ Rated</p>
            <p className="text-green-400 font-semibold">✓ No Money Upfront</p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h3>
          <ul className="space-y-2">
            {SERVICES_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 text-sm transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Service Areas</h3>
          <ul className="space-y-2">
            {AREA_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 text-sm transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links + Hours */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 mb-6">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-green-400 text-sm transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Hours</h3>
          <div className="space-y-1 text-sm text-gray-400">
            <div className="flex justify-between gap-4">
              <span>Mon – Fri</span>
              <span className="text-gray-300">7am – 8pm</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Saturday</span>
              <span className="text-gray-300">8am – 6pm</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Sunday</span>
              <span className="text-gray-300">9am – 5pm</span>
            </div>
            <p className="text-green-400 text-xs pt-1">⚡ Emergency service 24/7</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>&copy; {year} The Best Pest Control NYC. All rights reserved. NYS DEC Licensed &amp; Insured.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
