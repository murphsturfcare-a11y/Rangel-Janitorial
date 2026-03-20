export const SITE_URL = "https://murphysturf.com";
export const COMPANY_NAME = "Murphy's Turf Care";
export const COMPANY_DESCRIPTION =
  "Professional turf cleaning and lawn care services across California. From aeration and seeding to fertilization and pest control, Murphy's Turf Care keeps your lawn healthy and beautiful year-round.";
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
  "lawn-cleaning",
  "aeration",
  "seeding",
  "fertilization",
  "pest-control",
  "seasonal-maintenance",
] as const;

export const LOCATION_SLUGS = [
  "los-angeles",
  "murrieta",
  "martinez",
  "sacramento",
] as const;

export const BLOG_SLUGS = [
  "ultimate-guide-lawn-care-los-angeles",
  "turf-maintenance-murrieta-hot-summers",
  "bay-area-lawn-care-martinez-homeowners",
  "sacramento-valley-lawn-care-central-valley-heat",
  "water-smart-lawn-care-california-drought",
  "when-to-aerate-lawn-southern-california",
  "benefits-professional-turf-cleaning",
  "spring-lawn-care-checklist-california",
  "choosing-right-grass-type-california",
  "eco-friendly-lawn-care-greener-california",
  "common-lawn-pests-california",
  "fall-lawn-preparation-california",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
