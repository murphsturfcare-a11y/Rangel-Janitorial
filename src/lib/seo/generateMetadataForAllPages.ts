import {
  generatePageMetadata,
  generateServiceMetadata,
  generateLocationMetadata,
  generateBlogMetadata,
  generateBlogIndexMetadata,
} from "./metadata";

export const homeMetadata = generatePageMetadata(
  "Professional Lawn Care & Turf Cleaning in California",
  "Murphy's Turf Care provides expert lawn care, turf cleaning, aeration, seeding, and fertilization services across California. Free estimates — call (951) 331-3300 today!",
  "/"
);

export const aboutMetadata = generatePageMetadata(
  "About Us",
  "Learn about Murphy's Turf Care — California's trusted lawn care professionals. Family-owned, locally operated, and committed to keeping your turf healthy and beautiful.",
  "/about"
);

export const contactMetadata = generatePageMetadata(
  "Contact Us",
  "Get in touch with Murphy's Turf Care for a free lawn care quote. Serving Los Angeles, Murrieta, Martinez, Sacramento, and more. Call (951) 331-3300 or fill out our form.",
  "/contact"
);

export const servicesMetadata = generatePageMetadata(
  "Our Lawn Care Services",
  "Explore Murphy's Turf Care professional lawn care services: cleaning, aeration, seeding, fertilization, pest control, and seasonal maintenance throughout California.",
  "/services"
);

export const locationsMetadata = generatePageMetadata(
  "Service Locations in California",
  "Murphy's Turf Care serves Los Angeles, Murrieta, Martinez, Sacramento, and surrounding areas. Find lawn care services near you.",
  "/locations"
);

const services = [
  {
    name: "Lawn Cleaning",
    slug: "lawn-cleaning" as const,
    shortDescription:
      "Comprehensive lawn cleaning to remove debris, thatch, and buildup for a pristine yard.",
  },
  {
    name: "Aeration",
    slug: "aeration" as const,
    shortDescription:
      "Core aeration to reduce soil compaction, improve drainage, and promote deep root growth.",
  },
  {
    name: "Seeding",
    slug: "seeding" as const,
    shortDescription:
      "Overseeding and reseeding with premium grass varieties suited to California's climate.",
  },
  {
    name: "Fertilization",
    slug: "fertilization" as const,
    shortDescription:
      "Custom fertilization programs to nourish your lawn through every season in California.",
  },
  {
    name: "Pest Control",
    slug: "pest-control" as const,
    shortDescription:
      "Targeted pest control to protect your turf from grubs, insects, and lawn-damaging pests.",
  },
  {
    name: "Seasonal Maintenance",
    slug: "seasonal-maintenance" as const,
    shortDescription:
      "Year-round seasonal lawn maintenance including spring cleanup, summer care, and fall preparation.",
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
      "Serving the Los Angeles metro area with expert lawn care and turf maintenance services.",
  },
  {
    name: "Murrieta",
    slug: "murrieta" as const,
    description:
      "Professional turf cleaning and lawn care for Murrieta homeowners and businesses in the Inland Empire.",
  },
  {
    name: "Martinez",
    slug: "martinez" as const,
    description:
      "Reliable lawn care services in Martinez and the Bay Area — from aeration to seasonal maintenance.",
  },
  {
    name: "Sacramento",
    slug: "sacramento" as const,
    description:
      "Full-service lawn care in Sacramento — keeping Central Valley lawns healthy year-round.",
  },
];

export const locationMetadata: Record<string, ReturnType<typeof generateLocationMetadata>> = {};
for (const location of locations) {
  locationMetadata[location.slug] = generateLocationMetadata(location);
}

export const blogIndexMetadata = generateBlogIndexMetadata();

const blogPosts = [
  {
    title: "The Ultimate Guide to Lawn Care in Los Angeles",
    slug: "ultimate-guide-lawn-care-los-angeles",
    description:
      "Everything LA homeowners need to know about maintaining a lush, green lawn in Southern California's unique climate. Watering tips, seasonal schedules, and more.",
  },
  {
    title: "Turf Maintenance in Murrieta: Beating the Hot Summers",
    slug: "turf-maintenance-murrieta-hot-summers",
    description:
      "How to keep your Murrieta lawn thriving through Inland Empire heat. Heat-tolerant grass types, smart irrigation, and professional care tips.",
  },
  {
    title: "Bay Area Lawn Care: A Guide for Martinez Homeowners",
    slug: "bay-area-lawn-care-martinez-homeowners",
    description:
      "Lawn care strategies for Martinez and Bay Area homeowners. Dealing with fog, microclimates, and coastal conditions for a beautiful yard.",
  },
  {
    title: "Sacramento Valley Lawn Care: Thriving in Central Valley Heat",
    slug: "sacramento-valley-lawn-care-central-valley-heat",
    description:
      "Expert tips for Sacramento homeowners to maintain healthy lawns despite Central Valley summers. Water-wise strategies and seasonal care guides.",
  },
  {
    title: "Water-Smart Lawn Care During California Drought",
    slug: "water-smart-lawn-care-california-drought",
    description:
      "Practical strategies for maintaining a beautiful lawn while conserving water during California drought conditions. Drought-tolerant grasses and smart irrigation.",
  },
  {
    title: "When to Aerate Your Lawn in Southern California",
    slug: "when-to-aerate-lawn-southern-california",
    description:
      "Learn the best times and methods for aerating your Southern California lawn. Improve drainage, reduce compaction, and promote healthier turf growth.",
  },
  {
    title: "The Benefits of Professional Turf Cleaning",
    slug: "benefits-professional-turf-cleaning",
    description:
      "Discover why professional turf cleaning is essential for a healthy lawn. Remove thatch, debris, and buildup to restore your yard's natural beauty.",
  },
  {
    title: "Spring Lawn Care Checklist for California",
    slug: "spring-lawn-care-checklist-california",
    description:
      "Your complete spring lawn care checklist for California homeowners. From fertilization to weed control, prepare your lawn for the growing season.",
  },
  {
    title: "Choosing the Right Grass Type for California",
    slug: "choosing-right-grass-type-california",
    description:
      "Compare warm-season and cool-season grasses for California lawns. Find the best grass type for your region, climate, and lifestyle.",
  },
  {
    title: "Eco-Friendly Lawn Care for a Greener California",
    slug: "eco-friendly-lawn-care-greener-california",
    description:
      "Sustainable lawn care practices for environmentally conscious California homeowners. Organic fertilizers, native plants, and reduced water usage.",
  },
  {
    title: "Common Lawn Pests in California and How to Stop Them",
    slug: "common-lawn-pests-california",
    description:
      "Identify and eliminate common California lawn pests including grubs, chinch bugs, and armyworms. Prevention tips and treatment options.",
  },
  {
    title: "Fall Lawn Preparation: Getting Your California Lawn Ready",
    slug: "fall-lawn-preparation-california",
    description:
      "Prepare your California lawn for the cooler months ahead. Overseeding, fertilization, and maintenance tips for a strong fall and winter lawn.",
  },
];

export const blogMetadata: Record<string, ReturnType<typeof generateBlogMetadata>> = {};
for (const post of blogPosts) {
  blogMetadata[post.slug] = generateBlogMetadata(post);
}
