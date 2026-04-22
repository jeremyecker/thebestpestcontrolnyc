"use client";

import { useState } from "react";
import type { FC } from "react";

const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "8559305016";
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "(855) 930-5016";

type FAQItem = { q: string; a: string };

const FAQ_CATEGORIES: { id: string; label: string; icon: string; count: number; items: FAQItem[] }[] = [
  {
    id: "general",
    label: "General",
    icon: "❓",
    count: 10,
    items: [
      { q: "How much does pest control cost in NYC?", a: "Costs vary by pest type, infestation severity, and property size. General pest control starts at $300–$450. Bed bug treatment runs $1,200–$4,500. Rodent control is $300–$450. Termite treatment ranges from $800–$2,500. We always provide a free inspection and written upfront quote — no surprises, no hidden fees." },
      { q: "Do you offer same-day pest control service?", a: "Yes. We offer same-day and emergency service throughout NYC, NJ, Long Island, and Westchester for urgent situations. Active wasp nests, rat infestations in restaurants, bed bug discoveries before guests arrive — call and we'll dispatch as fast as possible." },
      { q: "Are your treatments safe for kids and pets?", a: "All our treatments use EPA-approved products with targeted application methods designed to minimize exposure. Gel baits are placed inside cracks, crevices, and wall voids — out of everyday contact. We always provide specific safety instructions for your household before and after treatment." },
      { q: "Are your exterminators licensed and insured?", a: "Every technician holds an active NYS DEC Commercial Pesticide Applicator license and we carry full general liability insurance on every job. Wildlife specialists hold additional NYS DEC Nuisance Wildlife Control certification. We provide documentation upon request." },
      { q: "Do you charge for the initial inspection?", a: "No. Our pest inspections are completely free. A licensed exterminator inspects your property, identifies the pest and source, and gives you a written quote — no charge, no obligation." },
      { q: "Do you guarantee your pest control work?", a: "Yes. If pests return during the guarantee period, we come back and retreat at no charge. General pest control: 30-day guarantee. Bed bug treatment: 90-day guarantee. Rodent proofing: 1-year structural guarantee. Seasonal treatments (mosquito, tick) do not carry a guarantee." },
      { q: "What areas do you serve?", a: "We serve 318+ neighborhoods across Manhattan, Brooklyn, Queens, the Bronx, Staten Island, northern New Jersey, Long Island, and Westchester County. If you're anywhere in the NYC metro area, we have a technician near you." },
      { q: "What should I do to prepare for a pest control visit?", a: "Preparation varies by treatment. For general pest control, clear under sinks, clean kitchen surfaces, and remove pet food and water dishes. For bed bug treatment, launder bedding on high heat and declutter around bed frames. For rodent control, secure all food sources. We'll send specific prep instructions when you book." },
      { q: "Do you offer maintenance plans?", a: "Yes. Quarterly (most popular), bi-monthly, and monthly maintenance plans for residential and commercial properties. Plans include scheduled inspections, preventive treatments, and unlimited callbacks between visits." },
      { q: "How do I pay? Is there money upfront?", a: "No money upfront — you pay when the job is done and you're satisfied. We accept all major credit cards, debit cards, and checks." },
    ],
  },
  {
    id: "cockroaches",
    label: "Cockroaches",
    icon: "🪳",
    count: 6,
    items: [
      { q: "How long does cockroach treatment take to work?", a: "Gel bait treatments typically take 1–2 weeks to fully eliminate a cockroach population. You may see more cockroaches in the first few days as they come out to eat the bait — this is normal. By week 2, populations drop dramatically. A follow-up treatment at 2–3 weeks ensures complete elimination." },
      { q: "Do I need to leave my apartment during treatment?", a: "For standard gel bait treatments, no evacuation is required. You can remain home during and after treatment. For more intensive treatments in severe infestations, we may recommend vacating for a few hours. We'll give you specific instructions when we arrive for the inspection." },
      { q: "Why do I keep seeing cockroaches after treatment?", a: "Seeing cockroaches in the first 1–2 weeks after treatment is expected — they're coming out to find food (including the bait) and dying. If you're still seeing significant activity after 3 weeks, contact us for the free retreat included in your guarantee." },
      { q: "My neighbor has cockroaches — will I get them?", a: "In NYC apartment buildings, cockroaches travel through shared wall voids, plumbing lines, and electrical conduits. If a neighbor has a serious infestation and it's untreated, migration is possible. We offer whole-building treatment programs for property managers and landlords to address this at the source." },
      { q: "Why don't store-bought sprays work?", a: "Store-bought sprays are repellents — they push cockroaches away from treated surfaces into wall voids and neighboring units, making the problem worse in multi-unit buildings. Professional gel baits and non-repellent treatments are carried back to the colony, eliminating the entire population from the inside out." },
      { q: "How much does cockroach extermination cost?", a: "Cockroach extermination in NYC typically runs $300–$450 for a standard apartment treatment. Larger properties, severe infestations, or multi-unit building treatments cost more. We always provide a free inspection and exact written quote before work begins." },
    ],
  },
  {
    id: "bed-bugs",
    label: "Bed Bugs",
    icon: "🐜",
    count: 6,
    items: [
      { q: "How do I know if I have bed bugs?", a: "Signs include small rust-colored blood stains on sheets, dark fecal spots on your mattress or headboard, shed exoskeletons near the bed, and clusters of small itchy bites on your skin — often in a line or cluster. Bed bugs themselves are small (apple seed size), flat, and reddish-brown. If you see any of these signs, call us for a free inspection and identification." },
      { q: "Do I have to throw away my mattress?", a: "Usually not. Bed bugs live in mattress seams but also in headboards, bed frames, baseboards, and wall voids — throwing away your mattress without treating the room doesn't solve the problem. Our heat treatment eliminates bed bugs in mattresses and throughout the entire room. Mattress encasements can protect treated mattresses going forward." },
      { q: "How long does heat treatment take?", a: "Whole-room heat treatment typically takes 6–8 hours. We bring in industrial heating equipment and raise the room temperature above 120°F for several hours — a lethal temperature for all bed bug life stages including eggs. You can return home the same evening." },
      { q: "Can bed bugs come back after heat treatment?", a: "Re-infestation from external sources (travel, used furniture, guests) is always possible, but heat treatment eliminates all bed bugs and eggs present in the treated space. Our 90-day guarantee covers re-infestation discovered within 90 days — we'll retreat at no charge." },
      { q: "Is heat or chemical treatment better?", a: "Heat treatment is generally more effective for established infestations — it penetrates furniture, wall voids, and mattresses without leaving residue and eliminates all life stages in a single treatment. Chemical treatment can be effective for light infestations or as a follow-up. We'll recommend the right approach based on your inspection." },
      { q: "What does bed bug treatment cost?", a: "Bed bug treatment in NYC typically runs $1,200–$4,500 depending on room count, infestation severity, and treatment method. We provide a free inspection and written quote before any work begins. No money upfront." },
    ],
  },
  {
    id: "rodents",
    label: "Rodents",
    icon: "🐀",
    count: 5,
    items: [
      { q: "How do rats and mice get into NYC buildings?", a: "Rats enter through foundation cracks, gaps around utility pipes, deteriorated building foundations, and subway infrastructure. Mice can squeeze through any gap larger than a dime — gaps around pipes, worn weatherstripping, and cracks in exterior walls are common entry points. Professional exclusion physically seals these points with steel wool, copper mesh, and caulk." },
      { q: "Can I get rid of rats or mice myself?", a: "Retail snap traps can reduce mouse populations in light infestations, but they don't address the source — entry points that allow new rodents to replace eliminated ones. Established rat infestations almost always require professional treatment with tamper-resistant bait stations, strategic snap traps, and exclusion work." },
      { q: "What is rodent proofing?", a: "Rodent proofing (exclusion) is the physical sealing of every entry point mice and rats use to access your building. Our team inspects the exterior, identifies all entry points, and seals them with materials rodents can't chew through — steel wool, copper mesh, caulk, and door sweeps. This prevents re-infestation after elimination." },
      { q: "How long does rat extermination take?", a: "Active rat populations are typically controlled within 2–4 weeks using professional bait stations and snap traps. A follow-up visit confirms elimination. Exclusion work (sealing entry points) can be done concurrently or after elimination — we recommend doing both together for the most lasting result." },
      { q: "How much does rodent control cost?", a: "Rat or mouse extermination in NYC typically runs $300–$450 for standard treatment. Rodent proofing costs $500–$3,000 depending on property size and number of entry points. We always provide a free inspection and written quote before work begins." },
    ],
  },
  {
    id: "wildlife",
    label: "Wildlife",
    icon: "🦝",
    count: 4,
    items: [
      { q: "Do I need a special license for wildlife removal?", a: "Yes. Wildlife removal in New York State requires a NYS DEC Nuisance Wildlife Control Operator license — separate from the commercial pesticide applicator license. All of our wildlife specialists hold current DEC licenses and follow state guidelines for humane capture, exclusion, and relocation." },
      { q: "Can I remove raccoons or squirrels myself?", a: "In New York, removing certain wildlife without a DEC license is illegal. Even if you trap an animal, you may not be permitted to relocate it without proper licensing. Beyond legality, wildlife removal without experience risks injury, disease exposure (raccoons can carry rabies), and incomplete removal that leaves young animals behind." },
      { q: "What do I do if there's a bat in my house?", a: "Do not handle the bat with bare hands — bats can carry rabies. If you've had direct contact or potential exposure (sleeping in the same room), contact health authorities immediately about potential rabies exposure. To remove the bat, open a window and wait — they often find their way out. Call us for professional exclusion to prevent future entry." },
      { q: "How much does wildlife removal cost?", a: "Wildlife removal costs vary significantly by animal and scope: Raccoon removal typically runs $900–$4,000. Squirrel removal $900–$2,500. Bat exclusion $900–$2,500. Pigeon control $550–$5,000 depending on building size and deterrent type. Free inspection and written quote before work begins." },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: "🏢",
    count: 5,
    items: [
      { q: "Do you provide DOH-compliant pest control for restaurants?", a: "Yes. Our restaurant pest control program is designed for NYC DOH compliance. We provide all documentation required for DOH inspections, including treatment logs, product information sheets, Material Safety Data Sheets, and inspection reports. We schedule treatments during off-hours to minimize business disruption." },
      { q: "How often should a restaurant get pest control?", a: "The NYC DOH recommends monthly pest control for all food service establishments. High-volume restaurants and those with previous violations should consider bi-monthly service. Monthly service also provides DOH compliance documentation showing ongoing preventive treatment." },
      { q: "What documentation do you provide commercial clients?", a: "We provide complete service documentation including: service reports for each visit, product information and EPA registration numbers, Material Safety Data Sheets, treatment logs with dates and areas treated, and compliance letters for DOH purposes. All documentation is available electronically." },
      { q: "Can you service during off-hours?", a: "Yes. We offer flexible scheduling including early morning (before service hours), late evening, and overnight treatments for commercial clients. Restaurant pest control is typically performed between midnight and 5 AM to avoid interference with food prep and service." },
      { q: "How much does commercial pest control cost?", a: "Commercial pest control in NYC typically runs $175–$1,500/month depending on facility size, pest pressure, and service frequency. Restaurant programs start at $175/month. Large multi-unit commercial properties are priced individually after a free inspection. We provide a written service agreement with exact pricing before work begins." },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <>
      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Got Questions? We've Got Answers.</h1>
          <p className="text-green-100 text-xl mb-8 max-w-2xl mx-auto">
            Everything you need to know about NYC pest control, our services, pricing, and guarantees.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-green-700 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold text-white">
          <span>✓ NYS DEC Licensed</span>
          <span>✓ Fully Insured</span>
          <span>✓ Free Inspection</span>
          <span>✓ No Money Upfront</span>
          <span>✓ Guaranteed Results</span>
        </div>
      </section>

      {/* Main FAQ area */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Browse by Topic</p>
            <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenQuestion(null); }}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition w-full text-left ${
                    activeCategory === cat.id
                      ? "bg-green-700 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  <span>{cat.icon} {cat.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeCategory === cat.id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>{cat.count}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* FAQ Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{currentCategory.icon} {currentCategory.label} Questions</h2>
            </div>

            <div className="space-y-3">
              {currentCategory.items.map((faq, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  <button
                    onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <span className={`text-green-700 shrink-0 transition-transform ${openQuestion === i ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {openQuestion === i && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still have questions? */}
            <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-green-900 text-lg mb-2">Still Have a Question?</h3>
              <p className="text-green-800 text-sm mb-4">Our team responds within minutes during business hours. Call us for the fastest response.</p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${PHONE}`} className="bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-green-600 transition text-sm">📞 Call {PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Ready to Get Started?</h2>
        <p className="text-green-100 text-xl mb-8 max-w-xl mx-auto">Free inspection. No money upfront. Guaranteed results for most services.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${PHONE}`} className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-50 transition">📞 Call {PHONE_DISPLAY}</a>
          <a href="/get-a-quote" className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-yellow-300 transition">📅 Book Online</a>
        </div>
      </section>
    </>
  );
}
