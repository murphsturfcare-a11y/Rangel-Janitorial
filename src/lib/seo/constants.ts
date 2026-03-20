export const SITE_URL = "https://murphysturf.com";
export const COMPANY_NAME = "Murphy's Turf Care";
export const COMPANY_DESCRIPTION =
  "Professional artificial turf cleaning, sanitization, and maintenance services across California. Murphy's Turf Care specializes in pet turf cleaning, odor removal, turf deodorizing, and synthetic turf repair to keep your artificial lawn fresh, clean, and looking like new.";
export const COMPANY_PHONE = "(951) 331-3300";
export const COMPANY_EMAIL = "info@murphysturf.com";

export const COMPANY_ADDRESS = {
  street: "26323 Jefferson Avenue",
  city: "Murrieta",
  state: "CA",
  zip: "92562",
  full: "26323 Jefferson Avenue, Murrieta, CA 92562",
};

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/murphysturfcare",
  instagram: "https://instagram.com/murphysturfcare",
  google: "https://g.page/murphysturfcare",
  yelp: "https://yelp.com/biz/murphys-turf-care-murrieta",
};

export const SERVICE_SLUGS = [
  "turf-cleaning",
  "pet-odor-treatment",
  "turf-deodorizing",
  "turf-repair",
  "commercial-turf-cleaning",
  "turf-sanitization",
] as const;

export const LOCATION_SLUGS = [
  "los-angeles",
  "murrieta",
  "martinez",
  "sacramento",
] as const;

export const BLOG_SLUGS = [
  "ultimate-guide-artificial-turf-cleaning",
  "pet-turf-odor-removal-tips",
  "how-often-clean-artificial-turf",
  "artificial-turf-vs-natural-grass-maintenance",
  "commercial-turf-cleaning-benefits",
  "synthetic-turf-sanitization-process",
  "keeping-artificial-turf-cool-california-heat",
  "artificial-turf-cleaning-mistakes-to-avoid",
  "why-professional-turf-cleaning-matters",
  "extending-lifespan-artificial-turf",
  "artificial-turf-pet-owners-guide",
  "seasonal-artificial-turf-maintenance-california",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
