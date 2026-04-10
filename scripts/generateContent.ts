/**
 * generateContent.ts
 * ==================
 * Content generation pipeline for thebestpestcontrolnyc.com
 * Generates unique AI content for all ~9,800 service × area combo pages.
 *
 * Usage:
 *   npx ts-node scripts/generateContent.ts
 *
 * Options:
 *   --service cockroach-extermination   (generate only one service)
 *   --area williamsburg                 (generate only one area)
 *   --limit 100                         (generate first N combos only)
 *   --overwrite                         (regenerate even if file exists)
 *
 * Output:
 *   /content/combos/[area-slug]--[service-slug].json
 *   /content/services/[service-slug].json
 *   /content/areas/[area-slug].json
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

// ─────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────

const SITE_NAME = "The Best Pest Control NYC";
const SITE_PHONE = "YOUR-PHONE-NUMBER"; // ← Replace before running
const MODEL = "claude-opus-4-5-20251101";
const MAX_TOKENS = 1200;
const DELAY_MS = 300; // Polite delay between API calls (ms)
const OUTPUT_DIR = path.join(process.cwd(), "content");

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface Service {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  priceRange: string;
  emergencyAvailable: boolean;
  guaranteeDays: number;
  pestType: string; // e.g. "cockroaches", "bed bugs", "rats"
}

interface Area {
  slug: string;
  name: string;
  borough: string;
  region: string;
  propertyType: string; // e.g. "apartments", "brownstones", "houses"
  nearbyAreas: string[];
  characteristics: string; // e.g. "dense residential, lots of restaurants"
}

interface ComboContent {
  metaTitle: string;
  metaDescription: string;
  heroParagraph: string;
  whyThisAreaSection: string;
  ourProcessSection: string;
  faqs: { q: string; a: string }[];
  generatedAt: string;
}

interface ServiceContent {
  metaTitle: string;
  metaDescription: string;
  introParagraphs: string[];
  signsSection: string;
  treatmentSection: string;
  whyProfessional: string;
  faqs: { q: string; a: string }[];
  generatedAt: string;
}

interface AreaContent {
  metaTitle: string;
  metaDescription: string;
  introParagraph: string;
  commonPestsSection: string;
  faqs: { q: string; a: string }[];
  generatedAt: string;
}

// ─────────────────────────────────────────
// DATA — 32 SERVICES
// ─────────────────────────────────────────

const SERVICES: Service[] = [
  { slug: "cockroach-extermination", name: "Cockroach Extermination", shortName: "Cockroaches", category: "Common Pests", priceRange: "$150–$400", emergencyAvailable: true, guaranteeDays: 30, pestType: "cockroaches" },
  { slug: "bed-bug-treatment", name: "Bed Bug Treatment", shortName: "Bed Bugs", category: "Common Pests", priceRange: "$300–$1,500", emergencyAvailable: true, guaranteeDays: 90, pestType: "bed bugs" },
  { slug: "ant-control", name: "Ant Control", shortName: "Ants", category: "Common Pests", priceRange: "$150–$350", emergencyAvailable: false, guaranteeDays: 30, pestType: "ants" },
  { slug: "spider-control", name: "Spider Control", shortName: "Spiders", category: "Common Pests", priceRange: "$125–$300", emergencyAvailable: false, guaranteeDays: 30, pestType: "spiders" },
  { slug: "mosquito-control", name: "Mosquito Control", shortName: "Mosquitoes", category: "Common Pests", priceRange: "$75–$200", emergencyAvailable: false, guaranteeDays: 30, pestType: "mosquitoes" },
  { slug: "flea-treatment", name: "Flea Treatment", shortName: "Fleas", category: "Common Pests", priceRange: "$200–$400", emergencyAvailable: true, guaranteeDays: 30, pestType: "fleas" },
  { slug: "tick-control", name: "Tick Control", shortName: "Ticks", category: "Common Pests", priceRange: "$100–$250", emergencyAvailable: false, guaranteeDays: 30, pestType: "ticks" },
  { slug: "fly-control", name: "Fly Control", shortName: "Flies", category: "Common Pests", priceRange: "$125–$400", emergencyAvailable: false, guaranteeDays: 30, pestType: "flies" },
  { slug: "rat-extermination", name: "Rat Extermination", shortName: "Rats", category: "Rodents", priceRange: "$200–$600", emergencyAvailable: true, guaranteeDays: 30, pestType: "rats" },
  { slug: "mouse-extermination", name: "Mouse Extermination", shortName: "Mice", category: "Rodents", priceRange: "$150–$400", emergencyAvailable: true, guaranteeDays: 30, pestType: "mice" },
  { slug: "rodent-proofing", name: "Rodent Proofing", shortName: "Rodent Proofing", category: "Rodents", priceRange: "$500–$3,000", emergencyAvailable: false, guaranteeDays: 365, pestType: "rodents" },
  { slug: "termite-treatment", name: "Termite Treatment", shortName: "Termites", category: "Wood-Destroying", priceRange: "$800–$3,000", emergencyAvailable: true, guaranteeDays: 365, pestType: "termites" },
  { slug: "carpenter-ant-control", name: "Carpenter Ant Control", shortName: "Carpenter Ants", category: "Wood-Destroying", priceRange: "$300–$800", emergencyAvailable: true, guaranteeDays: 30, pestType: "carpenter ants" },
  { slug: "wasp-removal", name: "Wasp Removal", shortName: "Wasps", category: "Stinging Insects", priceRange: "$100–$350", emergencyAvailable: true, guaranteeDays: 30, pestType: "wasps" },
  { slug: "bee-removal", name: "Bee Removal", shortName: "Bees", category: "Stinging Insects", priceRange: "$150–$500", emergencyAvailable: true, guaranteeDays: 30, pestType: "bees" },
  { slug: "hornet-removal", name: "Hornet Removal", shortName: "Hornets", category: "Stinging Insects", priceRange: "$150–$400", emergencyAvailable: true, guaranteeDays: 30, pestType: "hornets" },
  { slug: "yellow-jacket-removal", name: "Yellow Jacket Removal", shortName: "Yellow Jackets", category: "Stinging Insects", priceRange: "$125–$350", emergencyAvailable: true, guaranteeDays: 30, pestType: "yellow jackets" },
  { slug: "raccoon-removal", name: "Raccoon Removal", shortName: "Raccoons", category: "Wildlife", priceRange: "$300–$800", emergencyAvailable: true, guaranteeDays: 30, pestType: "raccoons" },
  { slug: "squirrel-removal", name: "Squirrel Removal", shortName: "Squirrels", category: "Wildlife", priceRange: "$250–$600", emergencyAvailable: true, guaranteeDays: 30, pestType: "squirrels" },
  { slug: "pigeon-control", name: "Pigeon Control", shortName: "Pigeons", category: "Wildlife", priceRange: "$500–$5,000", emergencyAvailable: false, guaranteeDays: 365, pestType: "pigeons" },
  { slug: "bat-removal", name: "Bat Removal", shortName: "Bats", category: "Wildlife", priceRange: "$500–$2,500", emergencyAvailable: true, guaranteeDays: 30, pestType: "bats" },
  { slug: "moth-control", name: "Moth Control", shortName: "Moths", category: "Specialty", priceRange: "$150–$350", emergencyAvailable: false, guaranteeDays: 30, pestType: "moths" },
  { slug: "silverfish-control", name: "Silverfish Control", shortName: "Silverfish", category: "Specialty", priceRange: "$125–$300", emergencyAvailable: false, guaranteeDays: 30, pestType: "silverfish" },
  { slug: "centipede-control", name: "Centipede Control", shortName: "Centipedes", category: "Specialty", priceRange: "$125–$275", emergencyAvailable: false, guaranteeDays: 30, pestType: "centipedes" },
  { slug: "cricket-control", name: "Cricket Control", shortName: "Crickets", category: "Specialty", priceRange: "$125–$250", emergencyAvailable: false, guaranteeDays: 30, pestType: "crickets" },
  { slug: "stink-bug-control", name: "Stink Bug Control", shortName: "Stink Bugs", category: "Specialty", priceRange: "$125–$300", emergencyAvailable: false, guaranteeDays: 30, pestType: "stink bugs" },
  { slug: "drain-fly-treatment", name: "Drain Fly Treatment", shortName: "Drain Flies", category: "Specialty", priceRange: "$150–$300", emergencyAvailable: false, guaranteeDays: 30, pestType: "drain flies" },
  { slug: "pantry-pest-control", name: "Pantry Pest Control", shortName: "Pantry Pests", category: "Specialty", priceRange: "$150–$300", emergencyAvailable: false, guaranteeDays: 30, pestType: "pantry pests" },
  { slug: "commercial-pest-control", name: "Commercial Pest Control", shortName: "Commercial", category: "Commercial", priceRange: "$150–$1,500/mo", emergencyAvailable: true, guaranteeDays: 30, pestType: "pests" },
  { slug: "restaurant-pest-control", name: "Restaurant Pest Control", shortName: "Restaurant", category: "Commercial", priceRange: "$200–$600/mo", emergencyAvailable: true, guaranteeDays: 30, pestType: "pests" },
  { slug: "general-pest-control", name: "General Pest Control", shortName: "General", category: "General", priceRange: "$125–$300", emergencyAvailable: true, guaranteeDays: 30, pestType: "pests" },
  { slug: "emergency-pest-control", name: "Emergency Pest Control", shortName: "Emergency", category: "General", priceRange: "$200–$500", emergencyAvailable: true, guaranteeDays: 30, pestType: "pests" },
];

// ─────────────────────────────────────────
// DATA — 318 AREAS (sample — expand to full list)
// ─────────────────────────────────────────

const AREAS: Area[] = [
  // MANHATTAN (36)
  { slug: "upper-east-side", name: "Upper East Side", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "luxury apartments and co-ops", nearbyAreas: ["upper-west-side", "midtown-east", "harlem", "yorkville", "lenox-hill"], characteristics: "high-density luxury residential, doorman buildings, aging prewar infrastructure" },
  { slug: "upper-west-side", name: "Upper West Side", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "prewar apartments and brownstones", nearbyAreas: ["upper-east-side", "harlem", "midtown", "morningside-heights", "lincoln-square"], characteristics: "classic prewar buildings, family-friendly, proximity to Central Park" },
  { slug: "midtown", name: "Midtown Manhattan", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "commercial buildings and hotels", nearbyAreas: ["upper-east-side", "upper-west-side", "chelsea", "murray-hill", "hell-s-kitchen"], characteristics: "extremely high restaurant density, hotels, office towers, high foot traffic" },
  { slug: "midtown-east", name: "Midtown East", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "office buildings and luxury residences", nearbyAreas: ["midtown", "upper-east-side", "murray-hill", "turtle-bay", "kips-bay"], characteristics: "corporate offices, UN area, mixed residential and commercial" },
  { slug: "chelsea", name: "Chelsea", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "loft apartments and mixed-use buildings", nearbyAreas: ["midtown", "hell-s-kitchen", "west-village", "flatiron", "gramercy"], characteristics: "art galleries, mixed residential, older building stock, proximity to High Line" },
  { slug: "harlem", name: "Harlem", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "brownstones and apartment buildings", nearbyAreas: ["upper-east-side", "upper-west-side", "east-harlem", "washington-heights", "morningside-heights"], characteristics: "dense residential, historic brownstones, active restaurant scene" },
  { slug: "lower-east-side", name: "Lower East Side", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "tenement-style apartments and mixed-use", nearbyAreas: ["east-village", "chinatown", "soho", "two-bridges", "nolita"], characteristics: "historic tenement buildings, vibrant nightlife, dense food establishments" },
  { slug: "east-village", name: "East Village", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "walkup apartments and mixed-use", nearbyAreas: ["lower-east-side", "west-village", "gramercy", "soho", "nolita"], characteristics: "aging walkup buildings, dense restaurant corridor, lively street scene" },
  { slug: "west-village", name: "West Village", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "historic townhouses and boutique apartments", nearbyAreas: ["chelsea", "greenwich-village", "east-village", "soho", "tribeca"], characteristics: "cobblestone streets, historic townhouses, high-end boutiques and restaurants" },
  { slug: "soho", name: "SoHo", borough: "Manhattan", region: "Manhattan, NYC", propertyType: "cast-iron loft buildings", nearbyAreas: ["tribeca", "west-village", "lower-east-side", "nolita", "little-italy"], characteristics: "landmark loft buildings, heavy retail and restaurant traffic, tourist density" },

  // BROOKLYN (45)
  { slug: "williamsburg", name: "Williamsburg", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "converted warehouses and older apartments", nearbyAreas: ["bushwick", "greenpoint", "bedford-stuyvesant", "east-williamsburg", "ridgewood"], characteristics: "dense mixed-use, heavy bar and restaurant scene, older building stock with shared walls" },
  { slug: "bushwick", name: "Bushwick", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "rowhouses and walkup apartments", nearbyAreas: ["williamsburg", "bedford-stuyvesant", "ridgewood", "east-new-york", "cypress-hills"], characteristics: "older residential stock, warehouses converting to residential, dense population" },
  { slug: "park-slope", name: "Park Slope", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "brownstones and Victorian rowhouses", nearbyAreas: ["prospect-heights", "gowanus", "windsor-terrace", "boerum-hill", "sunset-park"], characteristics: "historic brownstones, family neighborhoods, proximity to Prospect Park" },
  { slug: "greenpoint", name: "Greenpoint", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "rowhouses and mid-size apartment buildings", nearbyAreas: ["williamsburg", "long-island-city", "astoria", "ridgewood", "east-williamsburg"], characteristics: "waterfront neighborhood, Polish community, older building stock" },
  { slug: "bedford-stuyvesant", name: "Bedford-Stuyvesant", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "brownstones and rowhouses", nearbyAreas: ["williamsburg", "bushwick", "crown-heights", "clinton-hill", "prospect-heights"], characteristics: "largest collection of brownstones in NYC, dense residential, aging infrastructure" },
  { slug: "crown-heights", name: "Crown Heights", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "rowhouses and apartment buildings", nearbyAreas: ["bedford-stuyvesant", "prospect-heights", "east-flatbush", "flatbush", "lefferts-gardens"], characteristics: "dense residential, diverse community, older multi-family homes" },
  { slug: "flatbush", name: "Flatbush", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "single-family homes and apartment buildings", nearbyAreas: ["crown-heights", "east-flatbush", "midwood", "ditmas-park", "prospect-park-south"], characteristics: "residential neighborhood, Caribbean community, older housing stock" },
  { slug: "sunset-park", name: "Sunset Park", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "rowhouses and mixed-use buildings", nearbyAreas: ["park-slope", "bay-ridge", "borough-park", "red-hook", "gowanus"], characteristics: "industrial waterfront, large immigrant community, older multi-family homes" },
  { slug: "bay-ridge", name: "Bay Ridge", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "single and two-family homes", nearbyAreas: ["sunset-park", "dyker-heights", "bensonhurst", "fort-hamilton", "bath-beach"], characteristics: "waterfront residential, single-family homes, suburban feel within Brooklyn" },
  { slug: "borough-park", name: "Borough Park", borough: "Brooklyn", region: "Brooklyn, NYC", propertyType: "rowhouses and apartment buildings", nearbyAreas: ["flatbush", "bensonhurst", "sunset-park", "kensington", "midwood"], characteristics: "dense Orthodox Jewish community, older rowhouses, busy commercial strips" },

  // QUEENS (45)
  { slug: "astoria", name: "Astoria", borough: "Queens", region: "Queens, NYC", propertyType: "attached homes and mid-rise apartments", nearbyAreas: ["long-island-city", "jackson-heights", "woodside", "sunnyside", "greenpoint"], characteristics: "diverse immigrant community, older attached homes, dense restaurant corridors" },
  { slug: "jackson-heights", name: "Jackson Heights", borough: "Queens", region: "Queens, NYC", propertyType: "prewar apartment buildings and rowhouses", nearbyAreas: ["astoria", "woodside", "elmhurst", "corona", "sunnyside"], characteristics: "incredibly diverse, dense prewar apartments, vibrant street food scene" },
  { slug: "flushing", name: "Flushing", borough: "Queens", region: "Queens, NYC", propertyType: "apartments and mixed commercial buildings", nearbyAreas: ["college-point", "corona", "fresh-meadows", "bayside", "whitestone"], characteristics: "NYC's second Chinatown, extremely dense commercial and residential, underground malls" },
  { slug: "long-island-city", name: "Long Island City", borough: "Queens", region: "Queens, NYC", propertyType: "luxury high-rises and converted industrial buildings", nearbyAreas: ["astoria", "sunnyside", "greenpoint", "williamsburg", "hunters-point"], characteristics: "rapid new development, converted warehouses, proximity to Manhattan via subway" },
  { slug: "sunnyside", name: "Sunnyside", borough: "Queens", region: "Queens, NYC", propertyType: "attached rowhouses and walkup apartments", neartyAreas: ["woodside", "astoria", "long-island-city", "maspeth", "ridgewood"], characteristics: "working-class residential, historic garden apartments, older building stock" },
  { slug: "woodside", name: "Woodside", borough: "Queens", region: "Queens, NYC", propertyType: "attached homes and apartment buildings", nearbyAreas: ["sunnyside", "jackson-heights", "maspeth", "elmhurst", "corona"], characteristics: "Filipino and Irish community, older attached homes, Queens Blvd commercial corridor" },
  { slug: "corona", name: "Corona", borough: "Queens", region: "Queens, NYC", propertyType: "rowhouses and small apartment buildings", nearbyAreas: ["jackson-heights", "elmhurst", "flushing", "rego-park", "woodside"], characteristics: "dense Latin community, older residential stock, proximity to Citi Field" },
  { slug: "elmhurst", name: "Elmhurst", borough: "Queens", region: "Queens, NYC", propertyType: "attached homes and apartment buildings", nearbyAreas: ["jackson-heights", "corona", "woodside", "maspeth", "rego-park"], characteristics: "one of NYC's most diverse neighborhoods, dense residential, busy commercial" },
  { slug: "jamaica", name: "Jamaica", borough: "Queens", region: "Queens, NYC", propertyType: "single-family and attached homes", nearbyAreas: ["st-albans", "hollis", "richmond-hill", "south-jamaica", "springfield-gardens"], characteristics: "transit hub, mix of residential and commercial, older housing stock" },
  { slug: "bayside", name: "Bayside", borough: "Queens", region: "Queens, NYC", propertyType: "single-family suburban homes", nearbyAreas: ["flushing", "fresh-meadows", "little-neck", "whitestone", "college-point"], characteristics: "suburban Queens, single-family homes with yards, proximity to Little Neck Bay" },

  // BRONX (36)
  { slug: "south-bronx", name: "South Bronx", borough: "Bronx", region: "The Bronx, NYC", propertyType: "apartment buildings and NYCHA housing", nearbyAreas: ["mott-haven", "hunts-point", "melrose", "port-morris", "longwood"], characteristics: "dense public housing, older apartment buildings, high commercial traffic near Hunts Point market" },
  { slug: "mott-haven", name: "Mott Haven", borough: "Bronx", region: "The Bronx, NYC", propertyType: "rowhouses and apartment buildings", nearbyAreas: ["south-bronx", "melrose", "port-morris", "longwood", "harlem"], characteristics: "rapidly gentrifying, older rowhouses, proximity to Manhattan via subway" },
  { slug: "fordham", name: "Fordham", borough: "Bronx", region: "The Bronx, NYC", propertyType: "apartment buildings and attached homes", nearbyAreas: ["bedford-park", "belmont", "university-heights", "norwood", "tremont"], characteristics: "university area, dense commercial on Fordham Road, older apartment stock" },
  { slug: "riverdale", name: "Riverdale", borough: "Bronx", region: "The Bronx, NYC", propertyType: "single-family homes and luxury apartments", nearbyAreas: ["spuyten-duyvil", "kingsbridge", "marble-hill", "yonkers", "fieldston"], characteristics: "affluent suburban area, wooded lots, proximity to Hudson River" },
  { slug: "pelham-bay", name: "Pelham Bay", borough: "Bronx", region: "The Bronx, NYC", propertyType: "single-family and semi-detached homes", nearbyAreas: ["co-op-city", "city-island", "throgs-neck", "country-club", "westchester"], characteristics: "suburban feel, proximity to Pelham Bay Park, single-family homes with yards" },

  // STATEN ISLAND (23)
  { slug: "st-george", name: "St. George", borough: "Staten Island", region: "Staten Island, NYC", propertyType: "Victorian homes and apartment buildings", nearbyAreas: ["stapleton", "tompkinsville", "new-brighton", "clifton", "port-richmond"], characteristics: "ferry terminal hub, historic Victorian architecture, hillside residential" },
  { slug: "stapleton", name: "Stapleton", borough: "Staten Island", region: "Staten Island, NYC", propertyType: "older homes and rowhouses", nearbyAreas: ["st-george", "tompkinsville", "clifton", "rosebank", "grasmere"], characteristics: "waterfront neighborhood, older housing stock, active revitalization" },

  // NEW JERSEY (48)
  { slug: "jersey-city", name: "Jersey City", borough: "New Jersey", region: "Jersey City, NJ", propertyType: "brownstones, new high-rises, and older apartments", nearbyAreas: ["hoboken", "bayonne", "union-city-nj", "weehawken", "kearny"], characteristics: "rapidly developing waterfront, mix of old brownstones and new towers, proximity to Manhattan" },
  { slug: "hoboken", name: "Hoboken", borough: "New Jersey", region: "Hoboken, NJ", propertyType: "brownstones and mid-rise apartment buildings", nearbyAreas: ["jersey-city", "weehawken", "union-city-nj", "edgewater", "north-bergen"], characteristics: "dense walkable city, older brownstones, very active bar and restaurant scene" },
  { slug: "newark", name: "Newark", borough: "New Jersey", region: "Newark, NJ", propertyType: "apartments and older residential buildings", nearbyAreas: ["east-orange", "irvington", "kearny", "harrison", "belleville"], characteristics: "major urban center, older housing stock, large commercial and industrial zones" },
  { slug: "montclair", name: "Montclair", borough: "New Jersey", region: "Montclair, NJ", propertyType: "Victorian single-family homes", nearbyAreas: ["bloomfield", "glen-ridge", "upper-montclair", "west-orange", "east-orange"], characteristics: "affluent suburban, large historic homes with mature landscaping, wooded lots" },

  // LONG ISLAND (55)
  { slug: "garden-city", name: "Garden City", borough: "Long Island", region: "Nassau County, Long Island", propertyType: "single-family suburban homes", nearbyAreas: ["hempstead", "mineola", "westbury", "new-hyde-park", "floral-park"], characteristics: "affluent planned suburb, large single-family homes, manicured lawns, older trees" },
  { slug: "hempstead", name: "Hempstead", borough: "Long Island", region: "Nassau County, Long Island", propertyType: "single and two-family homes", nearbyAreas: ["garden-city", "west-hempstead", "uniondale", "elmont", "valley-stream"], characteristics: "diverse suburban community, older housing stock, commercial center of Nassau County" },
  { slug: "great-neck", name: "Great Neck", borough: "Long Island", region: "Nassau County, Long Island", propertyType: "single-family homes and luxury estates", nearbyAreas: ["manhasset", "port-washington", "roslyn", "lake-success", "new-hyde-park"], characteristics: "affluent waterfront community, large estates, proximity to Long Island Sound" },
  { slug: "freeport", name: "Freeport", borough: "Long Island", region: "Nassau County, Long Island", propertyType: "single-family homes", nearbyAreas: ["rockville-centre", "valley-stream", "baldwin", "merrick", "oceanside"], characteristics: "waterfront village, diverse community, boating community near Atlantic Ocean" },

  // WESTCHESTER (30)
  { slug: "yonkers", name: "Yonkers", borough: "Westchester", region: "Westchester County, NY", propertyType: "apartments, rowhouses, and single-family homes", nearbyAreas: ["mount-vernon", "new-rochelle", "bronxville", "hastings-on-hudson", "riverdale"], characteristics: "NYC's fourth-largest city, mix of urban and suburban, waterfront development on Hudson" },
  { slug: "white-plains", name: "White Plains", borough: "Westchester", region: "Westchester County, NY", propertyType: "apartments and single-family homes", nearbyAreas: ["scarsdale", "hartsdale", "greenburgh", "port-chester", "rye"], characteristics: "Westchester's commercial hub, dense downtown, mix of urban apartments and suburban homes" },
  { slug: "scarsdale", name: "Scarsdale", borough: "Westchester", region: "Westchester County, NY", propertyType: "large single-family homes on wooded lots", nearbyAreas: ["white-plains", "new-rochelle", "eastchester", "tuckahoe", "hartsdale"], characteristics: "one of NYC metro's most affluent suburbs, large wooded properties, mature landscaping" },
  { slug: "new-rochelle", name: "New Rochelle", borough: "Westchester", region: "Westchester County, NY", propertyType: "single-family homes and apartment buildings", nearbyAreas: ["yonkers", "mount-vernon", "scarsdale", "pelham", "larchmont"], characteristics: "diverse waterfront city, mix of urban and suburban, Long Island Sound access" },
];

// ─────────────────────────────────────────
// ANTHROPIC CLIENT
// ─────────────────────────────────────────

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─────────────────────────────────────────
// CONTENT GENERATORS
// ─────────────────────────────────────────

async function generateComboContent(
  service: Service,
  area: Area
): Promise<ComboContent> {
  const prompt = `You are an expert pest control copywriter for a licensed NYC exterminator company called "${SITE_NAME}". Write original, helpful, location-specific content.

Generate page content for this specific combination:
- Service: ${service.name} (${service.priceRange})
- Area: ${area.name}, ${area.borough}
- Property type in this area: ${area.propertyType}
- Area characteristics: ${area.characteristics}
- Nearby areas: ${area.nearbyAreas.join(", ")}
- Guarantee: ${service.guaranteeDays} days
- Emergency available: ${service.emergencyAvailable}

CRITICAL RULES:
1. Every piece of content must be UNIQUE to this specific service + area combination
2. Reference the area's property type and characteristics naturally
3. Write like a knowledgeable local who knows this neighborhood
4. Never copy generic content — mention specific things about ${area.name}
5. Use "we" and "our team" — write from the company's perspective
6. Be helpful and informative, not salesy

Return ONLY valid JSON (no markdown, no backticks) with exactly these fields:
{
  "metaTitle": "string — under 60 chars, include service + area + brand",
  "metaDescription": "string — 145-160 chars, include service, area, and call to action",
  "heroParagraph": "string — 120-150 words, unique angle for ${area.name} specifically, mention property type",
  "whyThisAreaSection": "string — 100-130 words, explain WHY ${area.name} has ${service.pestType} problems specifically",
  "ourProcessSection": "string — 100-130 words, describe treatment process for ${service.name} in ${area.name} context",
  "faqs": [
    {"q": "question specific to ${area.name} and ${service.name}", "a": "detailed answer 40-60 words"},
    {"q": "question about cost or timing in ${area.name}", "a": "detailed answer 40-60 words"},
    {"q": "question about the ${service.pestType} problem in this area", "a": "detailed answer 40-60 words"},
    {"q": "question about prevention in ${area.propertyType}", "a": "detailed answer 40-60 words"}
  ]
}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  const parsed = JSON.parse(cleaned) as ComboContent;
  parsed.generatedAt = new Date().toISOString();
  return parsed;
}

async function generateServiceContent(
  service: Service
): Promise<ServiceContent> {
  const prompt = `You are an expert pest control copywriter for "${SITE_NAME}", a licensed NYC exterminator. Write original, authoritative content about ${service.name}.

Context:
- Service: ${service.name}
- Price range: ${service.priceRange}
- Category: ${service.category}
- Pest type: ${service.pestType}
- Guarantee: ${service.guaranteeDays} days
- NYC-specific focus

Return ONLY valid JSON (no markdown, no backticks):
{
  "metaTitle": "string — under 60 chars",
  "metaDescription": "string — 145-160 chars",
  "introParagraphs": ["string — paragraph 1 (100-120 words)", "string — paragraph 2 (80-100 words)", "string — paragraph 3 (80-100 words)"],
  "signsSection": "string — 150-200 words, signs of ${service.pestType} infestation in NYC homes",
  "treatmentSection": "string — 150-200 words, how we treat ${service.pestType} specifically",
  "whyProfessional": "string — 120-150 words, why DIY fails for ${service.pestType} in NYC",
  "faqs": [
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"},
    {"q": "question", "a": "answer 50-70 words"}
  ]
}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  const parsed = JSON.parse(cleaned) as ServiceContent;
  parsed.generatedAt = new Date().toISOString();
  return parsed;
}

async function generateAreaContent(area: Area): Promise<AreaContent> {
  const prompt = `You are an expert pest control copywriter for "${SITE_NAME}", a licensed NYC exterminator. Write original, local content about pest control in ${area.name}.

Context:
- Area: ${area.name}, ${area.borough}
- Property type: ${area.propertyType}
- Area characteristics: ${area.characteristics}
- Nearby areas: ${area.nearbyAreas.join(", ")}

Return ONLY valid JSON (no markdown, no backticks):
{
  "metaTitle": "string — under 60 chars, include area + pest control + brand",
  "metaDescription": "string — 145-160 chars",
  "introParagraph": "string — 130-160 words, introduce pest control needs specific to ${area.name}",
  "commonPestsSection": "string — 150-180 words, which pests are most common in ${area.name} and why, based on the property types and characteristics",
  "faqs": [
    {"q": "question about pest control in ${area.name} specifically", "a": "answer 40-60 words"},
    {"q": "question about costs or response time in ${area.name}", "a": "answer 40-60 words"},
    {"q": "question about common pests in ${area.propertyType}", "a": "answer 40-60 words"},
    {"q": "question about licensing or regulations relevant to ${area.borough}", "a": "answer 40-60 words"},
    {"q": "question about prevention in ${area.name}", "a": "answer 40-60 words"}
  ]
}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
  const parsed = JSON.parse(cleaned) as AreaContent;
  parsed.generatedAt = new Date().toISOString();
  return parsed;
}

// ─────────────────────────────────────────
// FILE HELPERS
// ─────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function comboPath(area: Area, service: Service): string {
  return path.join(OUTPUT_DIR, "combos", `${area.slug}--${service.slug}.json`);
}

function servicePath(service: Service): string {
  return path.join(OUTPUT_DIR, "services", `${service.slug}.json`);
}

function areaPath(area: Area): string {
  return path.join(OUTPUT_DIR, "areas", `${area.slug}.json`);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────
// PROGRESS TRACKER
// ─────────────────────────────────────────

function progress(current: number, total: number, label: string) {
  const pct = Math.round((current / total) * 100);
  const bar = "█".repeat(Math.floor(pct / 5)) + "░".repeat(20 - Math.floor(pct / 5));
  process.stdout.write(`\r[${bar}] ${pct}% (${current}/${total}) — ${label}    `);
}

// ─────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────

async function main() {
  // Parse CLI args
  const args = process.argv.slice(2);
  const getArg = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };
  const overwrite = args.includes("--overwrite");
  const serviceFilter = getArg("--service");
  const areaFilter = getArg("--area");
  const limitArg = getArg("--limit");
  const limit = limitArg ? parseInt(limitArg) : Infinity;

  // Filter services and areas
  const services = serviceFilter
    ? SERVICES.filter((s) => s.slug === serviceFilter)
    : SERVICES;
  const areas = areaFilter
    ? AREAS.filter((a) => a.slug === areaFilter)
    : AREAS;

  // Create output directories
  ensureDir(path.join(OUTPUT_DIR, "combos"));
  ensureDir(path.join(OUTPUT_DIR, "services"));
  ensureDir(path.join(OUTPUT_DIR, "areas"));

  console.log("\n🐛 The Best Pest Control NYC — Content Generation Pipeline");
  console.log("═══════════════════════════════════════════════════════════\n");

  let errors: string[] = [];
  let generated = 0;
  let skipped = 0;

  // ── 1. GENERATE SERVICE PAGES ──
  console.log(`📄 Generating ${services.length} service pages...`);
  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    const filePath = servicePath(service);
    if (fs.existsSync(filePath) && !overwrite) {
      skipped++;
      progress(i + 1, services.length, `${service.name} (skipped)`);
      continue;
    }
    try {
      progress(i + 1, services.length, service.name);
      const content = await generateServiceContent(service);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      generated++;
      await sleep(DELAY_MS);
    } catch (e) {
      errors.push(`SERVICE: ${service.slug} — ${e}`);
    }
  }
  console.log(`\n✅ Service pages done. Generated: ${generated}, Skipped: ${skipped}\n`);

  // ── 2. GENERATE AREA PAGES ──
  generated = 0; skipped = 0;
  console.log(`🗺️  Generating ${areas.length} area pages...`);
  for (let i = 0; i < areas.length; i++) {
    const area = areas[i];
    const filePath = areaPath(area);
    if (fs.existsSync(filePath) && !overwrite) {
      skipped++;
      progress(i + 1, areas.length, `${area.name} (skipped)`);
      continue;
    }
    try {
      progress(i + 1, areas.length, area.name);
      const content = await generateAreaContent(area);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      generated++;
      await sleep(DELAY_MS);
    } catch (e) {
      errors.push(`AREA: ${area.slug} — ${e}`);
    }
  }
  console.log(`\n✅ Area pages done. Generated: ${generated}, Skipped: ${skipped}\n`);

  // ── 3. GENERATE COMBO PAGES ──
  generated = 0; skipped = 0;
  const combos: [Area, Service][] = [];
  for (const area of areas) {
    for (const service of services) {
      combos.push([area, service]);
    }
  }
  const totalCombos = Math.min(combos.length, limit);

  console.log(`🔄 Generating ${totalCombos.toLocaleString()} service × area combo pages...`);
  console.log(`   (${areas.length} areas × ${services.length} services)\n`);

  for (let i = 0; i < totalCombos; i++) {
    const [area, service] = combos[i];
    const filePath = comboPath(area, service);

    if (fs.existsSync(filePath) && !overwrite) {
      skipped++;
      progress(i + 1, totalCombos, `${area.slug}--${service.slug} (skipped)`);
      continue;
    }

    try {
      progress(i + 1, totalCombos, `${area.name} × ${service.shortName}`);
      const content = await generateComboContent(service, area);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      generated++;
      await sleep(DELAY_MS);
    } catch (e) {
      errors.push(`COMBO: ${area.slug}--${service.slug} — ${e}`);
      // Continue on error — don't stop entire run
    }

    // Log progress every 100 combos
    if ((i + 1) % 100 === 0) {
      console.log(`\n   💾 Checkpoint: ${i + 1} combos processed, ${errors.length} errors so far`);
    }
  }

  console.log(`\n\n✅ Combo pages done. Generated: ${generated}, Skipped: ${skipped}`);

  // ── SUMMARY ──
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("📊 GENERATION COMPLETE");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`✅ Total generated: ${generated}`);
  console.log(`⏭️  Total skipped:  ${skipped}`);
  console.log(`❌ Total errors:    ${errors.length}`);

  if (errors.length > 0) {
    const errorLog = path.join(OUTPUT_DIR, "errors.log");
    fs.writeFileSync(errorLog, errors.join("\n"));
    console.log(`\n⚠️  Error log saved to: ${errorLog}`);
    console.log("   Re-run with --overwrite to retry failed pages only");
  }

  console.log(`\n📁 Content saved to: ${OUTPUT_DIR}/`);
  console.log("🚀 Ready to run: next build\n");
}

main().catch(console.error);
