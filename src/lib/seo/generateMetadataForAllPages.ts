import {
  generatePageMetadata,
  generateServiceMetadata,
  generateLocationMetadata,
  generateBlogMetadata,
  generateBlogIndexMetadata,
} from "./metadata";

export const homeMetadata = generatePageMetadata(
  "Professional Artificial Turf Cleaning in California",
  "Murphy's Turf Care provides expert artificial turf cleaning, sanitization, pet odor removal, and synthetic turf maintenance across California. Free estimates — call (951) 331-3300 today!",
  "/"
);

export const aboutMetadata = generatePageMetadata(
  "About Us",
  "Learn about Murphy's Turf Care — California's trusted artificial turf cleaning professionals. Locally operated and committed to keeping your synthetic turf fresh, clean, and odor-free.",
  "/about"
);

export const contactMetadata = generatePageMetadata(
  "Contact Us",
  "Get in touch with Murphy's Turf Care for a free artificial turf cleaning quote. Serving Los Angeles, Murrieta, Martinez, Sacramento, and more. Call (951) 331-3300 or fill out our form.",
  "/contact"
);

export const servicesMetadata = generatePageMetadata(
  "Our Artificial Turf Cleaning Services",
  "Explore Murphy's Turf Care professional services: artificial turf cleaning, pet odor treatment, turf deodorizing, turf repair, commercial turf cleaning, and turf sanitization throughout California.",
  "/services"
);

export const locationsMetadata = generatePageMetadata(
  "Artificial Turf Cleaning Locations in California",
  "Murphy's Turf Care serves Los Angeles, Murrieta, Martinez, Sacramento, and surrounding areas. Find professional artificial turf cleaning services near you.",
  "/locations"
);

const services = [
  {
    name: "Artificial Turf Cleaning",
    slug: "turf-cleaning" as const,
    shortDescription:
      "Deep cleaning for artificial turf to remove dirt, debris, bacteria, and buildup — restoring your synthetic lawn to like-new condition.",
  },
  {
    name: "Pet Odor Treatment",
    slug: "pet-odor-treatment" as const,
    shortDescription:
      "Specialized pet urine and odor treatment for artificial turf. Eliminates bacteria and neutralizes odors from pet waste on synthetic grass.",
  },
  {
    name: "Turf Deodorizing",
    slug: "turf-deodorizing" as const,
    shortDescription:
      "Professional turf deodorizing to eliminate persistent odors from artificial grass using enzyme-based treatments and eco-friendly solutions.",
  },
  {
    name: "Turf Repair",
    slug: "turf-repair" as const,
    shortDescription:
      "Expert artificial turf repair services including seam fixes, infill replenishment, and damaged section replacement to extend your turf's lifespan.",
  },
  {
    name: "Commercial Turf Cleaning",
    slug: "commercial-turf-cleaning" as const,
    shortDescription:
      "Professional artificial turf cleaning for commercial properties, sports facilities, playgrounds, and HOA common areas across California.",
  },
  {
    name: "Turf Sanitization",
    slug: "turf-sanitization" as const,
    shortDescription:
      "Hospital-grade sanitization for artificial turf surfaces. Kills 99.9% of bacteria, mold, and allergens for a safe, hygienic synthetic lawn.",
  },
];

export const serviceMetadata: Record<string, ReturnType<typeof generateServiceMetadata>> = {};
for (const service of services) {
  serviceMetadata[service.slug] = generateServiceMetadata(service);
}

const locations = [
  {
    name: "Los Angeles",
    slug: "los-angeles" as const,
    description:
      "Serving the Los Angeles metro area with expert artificial turf cleaning, sanitization, and pet odor removal services.",
  },
  {
    name: "Murrieta",
    slug: "murrieta" as const,
    description:
      "Professional artificial turf cleaning for Murrieta homeowners and businesses in the Inland Empire.",
  },
  {
    name: "Martinez",
    slug: "martinez" as const,
    description:
      "Reliable artificial turf cleaning services in Martinez and the Bay Area — from deep cleaning to pet odor treatment.",
  },
  {
    name: "Sacramento",
    slug: "sacramento" as const,
    description:
      "Full-service artificial turf cleaning in Sacramento — keeping Central Valley synthetic lawns fresh and sanitized year-round.",
  },
];

export const locationMetadata: Record<string, ReturnType<typeof generateLocationMetadata>> = {};
for (const location of locations) {
  locationMetadata[location.slug] = generateLocationMetadata(location);
}

export const blogIndexMetadata = generateBlogIndexMetadata();

const blogPosts = [
  {
    title: "The Ultimate Guide to Artificial Turf Cleaning",
    slug: "ultimate-guide-artificial-turf-cleaning",
    description:
      "Everything you need to know about cleaning artificial turf — methods, frequency, DIY vs. professional cleaning, and how to keep synthetic grass looking pristine.",
  },
  {
    title: "Pet Turf Odor Removal: Tips That Actually Work",
    slug: "pet-turf-odor-removal-tips",
    description:
      "How to eliminate pet urine odor from artificial turf. Proven methods for neutralizing bacteria and keeping your synthetic lawn fresh for pets and family.",
  },
  {
    title: "How Often Should You Clean Artificial Turf?",
    slug: "how-often-clean-artificial-turf",
    description:
      "Learn the recommended cleaning frequency for residential and commercial artificial turf. Seasonal schedules, maintenance tips, and signs it's time for a deep clean.",
  },
  {
    title: "Artificial Turf vs. Natural Grass: Maintenance Compared",
    slug: "artificial-turf-vs-natural-grass-maintenance",
    description:
      "A detailed comparison of artificial turf and natural grass maintenance costs, time, water usage, and long-term care requirements for California homeowners.",
  },
  {
    title: "Why Commercial Properties Need Professional Turf Cleaning",
    slug: "commercial-turf-cleaning-benefits",
    description:
      "The business case for professional artificial turf cleaning at commercial facilities, sports venues, and HOA common areas. ROI, hygiene, and liability benefits.",
  },
  {
    title: "The Synthetic Turf Sanitization Process Explained",
    slug: "synthetic-turf-sanitization-process",
    description:
      "A step-by-step look at professional synthetic turf sanitization — from initial assessment to enzyme treatment, UV sanitization, and infill grooming.",
  },
  {
    title: "Keeping Artificial Turf Cool in California Heat",
    slug: "keeping-artificial-turf-cool-california-heat",
    description:
      "Practical solutions for reducing artificial turf heat in California summers. Cooling infills, shade strategies, and maintenance tips for comfortable synthetic grass.",
  },
  {
    title: "Artificial Turf Cleaning Mistakes to Avoid",
    slug: "artificial-turf-cleaning-mistakes-to-avoid",
    description:
      "Common mistakes homeowners make when cleaning artificial turf — harsh chemicals, pressure washing errors, and neglecting infill — and how to avoid them.",
  },
  {
    title: "Why Professional Turf Cleaning Matters",
    slug: "why-professional-turf-cleaning-matters",
    description:
      "The difference between DIY and professional artificial turf cleaning. Why expert equipment, enzyme treatments, and proper techniques deliver superior results.",
  },
  {
    title: "How to Extend the Lifespan of Your Artificial Turf",
    slug: "extending-lifespan-artificial-turf",
    description:
      "Maximize your artificial turf investment with proper maintenance. Tips for extending synthetic grass lifespan from 15 to 25+ years with regular professional care.",
  },
  {
    title: "The Complete Artificial Turf Guide for Pet Owners",
    slug: "artificial-turf-pet-owners-guide",
    description:
      "Everything pet owners need to know about artificial turf — choosing pet-friendly turf, cleaning routines, odor prevention, and keeping it safe for dogs and cats.",
  },
  {
    title: "Seasonal Artificial Turf Maintenance in California",
    slug: "seasonal-artificial-turf-maintenance-california",
    description:
      "A season-by-season guide to artificial turf maintenance in California. Spring refresh, summer heat management, fall cleanup, and winter care for synthetic lawns.",
  },
];

export const blogMetadata: Record<string, ReturnType<typeof generateBlogMetadata>> = {};
for (const post of blogPosts) {
  blogMetadata[post.slug] = generateBlogMetadata(post);
}
