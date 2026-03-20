import {
  generatePageMetadata,
  generateServiceMetadata,
  generateLocationMetadata,
  generateBlogMetadata,
  generateBlogIndexMetadata,
} from "./metadata";

export const homeMetadata = generatePageMetadata(
  "Professional Artificial Turf Cleaning in California",
  "Murphy's Turf — 30+ years of professional artificial turf cleaning, sanitization, and deodorizing across California. Our OxyTurf solution keeps your synthetic turf fresh and clean. Serving Huntington Beach, Murrieta, Martinez & Sacramento. Call 951-331-3300!",
  "/"
);

export const aboutMetadata = generatePageMetadata(
  "About Us — 30+ Years of Turf Cleaning Experience",
  "Murphy's Turf brings 30+ years of experience to artificial turf cleaning. Based in Murrieta, CA, we serve communities across California with our proprietary OxyTurf cleaning solution. When you care about clean turf, call Murphy's Turf.",
  "/about"
);

export const contactMetadata = generatePageMetadata(
  "Contact Us",
  "Get a free artificial turf cleaning quote from Murphy's Turf. Serving Huntington Beach, Murrieta, Martinez, and Sacramento. Call 951-331-3300 or fill out our form.",
  "/contact"
);

export const servicesMetadata = generatePageMetadata(
  "Our Artificial Turf Cleaning Services",
  "Murphy's Turf offers complete artificial turf cleaning: pet hair & debris removal, blooming & decompacting, disinfecting & deodorizing, poop scooping, and our signature OxyTurf treatment. 30+ years experience.",
  "/services"
);

export const locationsMetadata = generatePageMetadata(
  "Artificial Turf Cleaning Locations in California",
  "Murphy's Turf serves Huntington Beach, Murrieta, Martinez, Sacramento, and surrounding areas. Find professional artificial turf cleaning and sanitization near you.",
  "/locations"
);

const services = [
  {
    name: "Pet Hair & Debris Removal",
    slug: "pet-hair-debris" as const,
    shortDescription:
      "Thorough removal of pet hair, leaves, dirt, and embedded debris from your artificial turf using professional-grade equipment.",
  },
  {
    name: "Blooming & Decompacting",
    slug: "blooming-decompacting" as const,
    shortDescription:
      "Restore your turf's natural look with professional blooming and decompacting — lifts matted fibers and loosens compacted infill for a fresh, upright appearance.",
  },
  {
    name: "Disinfect & Deodorize",
    slug: "disinfect-deodorize" as const,
    shortDescription:
      "Kill 99.9% of bacteria and eliminate odors from your artificial turf with our professional disinfecting and deodorizing treatment. Safe for pets and kids.",
  },
  {
    name: "Poop Scooping",
    slug: "poop-scooping" as const,
    shortDescription:
      "Regular poop scooping service for artificial turf — we remove pet waste and sanitize the affected area to prevent odor buildup and bacteria growth.",
  },
  {
    name: "OxyTurf Treatment",
    slug: "oxyturf" as const,
    shortDescription:
      "Our signature OxyTurf cleaning solution — a proprietary, eco-friendly formula that deep cleans, deodorizes, and revitalizes artificial turf without harsh chemicals.",
  },
];

export const serviceMetadata: Record<string, ReturnType<typeof generateServiceMetadata>> = {};
for (const service of services) {
  serviceMetadata[service.slug] = generateServiceMetadata(service);
}

const locations = [
  {
    name: "Huntington Beach",
    slug: "huntington-beach" as const,
    description:
      "Serving Huntington Beach and Orange County with expert artificial turf cleaning, pet odor removal, and OxyTurf sanitization.",
  },
  {
    name: "Murrieta",
    slug: "murrieta" as const,
    description:
      "Murphy's Turf headquarters in Murrieta. Professional artificial turf cleaning for the Inland Empire including Temecula, Menifee, and Lake Elsinore.",
  },
  {
    name: "Martinez",
    slug: "martinez" as const,
    description:
      "Professional artificial turf cleaning in Martinez and the East Bay. Serving Contra Costa County, Walnut Creek, Concord, and the greater Bay Area.",
  },
  {
    name: "Sacramento",
    slug: "sacramento" as const,
    description:
      "Artificial turf cleaning in Sacramento and surrounding areas including Elk Grove, Roseville, Folsom, and the Central Valley.",
  },
];

export const locationMetadata: Record<string, ReturnType<typeof generateLocationMetadata>> = {};
for (const location of locations) {
  locationMetadata[location.slug] = generateLocationMetadata(location);
}

export const blogIndexMetadata = generateBlogIndexMetadata();

const blogPosts = [
  {
    title: "How to Clean Artificial Turf: The Complete Guide",
    slug: "how-to-clean-artificial-turf",
    description:
      "Everything you need to know about cleaning artificial turf — from basic maintenance to deep cleaning. Learn the methods professionals use to keep synthetic grass pristine.",
  },
  {
    title: "Professional Turf Cleaning in Huntington Beach: What to Expect",
    slug: "professional-turf-cleaning-huntington-beach",
    description:
      "What Huntington Beach and Orange County homeowners should know about professional artificial turf cleaning. Services, pricing, and why coastal turf needs special attention.",
  },
  {
    title: "Removing Pet Odors from Artificial Turf in Murrieta's Heat",
    slug: "removing-pet-odors-murrieta",
    description:
      "How Inland Empire heat intensifies pet odors on artificial turf, and the proven methods Murphy's Turf uses to eliminate them. Tips specific to Murrieta and Temecula homeowners.",
  },
  {
    title: "Artificial Turf Maintenance in the Bay Area",
    slug: "artificial-turf-maintenance-bay-area",
    description:
      "Bay Area-specific artificial turf maintenance tips for Martinez, Walnut Creek, and Contra Costa County. How fog, moisture, and coastal conditions affect synthetic turf care.",
  },
  {
    title: "Sacramento Turf Cleaning Tips: Beating Central Valley Heat",
    slug: "sacramento-turf-cleaning-tips",
    description:
      "Artificial turf cleaning strategies for Sacramento homeowners dealing with extreme Central Valley heat. Maintenance schedules, cooling tips, and when to call the professionals.",
  },
  {
    title: "The Health Benefits of Regular Turf Sanitization",
    slug: "health-benefits-turf-sanitization",
    description:
      "Why regular artificial turf sanitization matters for your family's health. Bacteria, allergens, and pathogens that accumulate on synthetic grass — and how to eliminate them.",
  },
  {
    title: "How Often Should You Clean Artificial Turf?",
    slug: "how-often-clean-artificial-turf",
    description:
      "The recommended cleaning frequency for residential and commercial artificial turf. Factors that affect your schedule: pets, foot traffic, trees, and California climate.",
  },
  {
    title: "What Is OxyTurf? The Safe Way to Clean Synthetic Turf",
    slug: "what-is-oxyturf-safe-turf-cleaning",
    description:
      "Learn about OxyTurf — Murphy's Turf proprietary cleaning solution. How it works, why it's safe for pets and children, and what makes it different from generic turf cleaners.",
  },
  {
    title: "DIY vs. Professional Turf Cleaning: Is It Worth It?",
    slug: "diy-vs-professional-turf-cleaning",
    description:
      "Comparing DIY artificial turf cleaning to professional services. When a garden hose isn't enough, and why professional-grade equipment and solutions deliver better results.",
  },
  {
    title: "Artificial Turf and Pets: Keeping It Clean and Safe",
    slug: "artificial-turf-pets-clean-safe",
    description:
      "The complete guide to maintaining artificial turf with pets. Odor prevention, cleaning routines, safe sanitization methods, and tips from 30+ years of experience.",
  },
  {
    title: "Why Does My Artificial Turf Smell? Causes and Fixes",
    slug: "why-artificial-turf-smells-fix",
    description:
      "Common causes of artificial turf odor — pet urine, bacteria, trapped moisture, and organic buildup. Professional solutions that actually eliminate the smell, not just mask it.",
  },
  {
    title: "5 Signs Your Turf Needs Professional Cleaning",
    slug: "signs-turf-needs-professional-cleaning",
    description:
      "How to tell when your artificial turf needs professional attention. Visible warning signs, smell indicators, and drainage issues that signal it's time to call Murphy's Turf.",
  },
];

export const blogMetadata: Record<string, ReturnType<typeof generateBlogMetadata>> = {};
for (const post of blogPosts) {
  blogMetadata[post.slug] = generateBlogMetadata(post);
}
