export const SITE_URL = "https://rangeljanitorial.com";
export const COMPANY_NAME = "Rangel Janitorial";
export const COMPANY_TAGLINE = "Creating Excellent First Impressions";
export const COMPANY_DESCRIPTION =
  "Professional janitorial and commercial cleaning services across California. Rangel Janitorial delivers reliable, thorough cleaning for offices, medical facilities, industrial parks, and more. Serving Sacramento, Murrieta, and Walnut Creek.";
export const COMPANY_PHONE = "951-894-4222";
export const COMPANY_EMAIL = "ralph@rangeljanitorial.com";

export const COMPANY_ADDRESS = {
  city: "Murrieta",
  state: "CA",
  full: "Murrieta, CA 92562",
};

export const DEFAULT_OG_IMAGE = "/images/og-image.png";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100090088264095",
  instagram: "https://www.instagram.com/rangeljanitorial/",
  youtube: "https://www.youtube.com/@rangeljanitorial/featured",
};

export const SERVICE_SLUGS = [
  "janitorial-cleaning",
  "day-porter",
  "electrostatic-disinfection",
  "floor-care",
  "carpet-cleaning",
] as const;

export const LOCATION_SLUGS = [
  "sacramento",
  "murrieta",
  "walnut-creek",
] as const;

export const BLOG_SLUGS = [
  "office-cleaning-best-practices",
  "janitorial-services-sacramento",
  "commercial-cleaning-murrieta",
  "day-porter-benefits",
  "electrostatic-disinfection-explained",
  "floor-care-vct-strip-wax",
  "medical-facility-cleaning-standards",
  "fitness-center-cleaning-guide",
  "choosing-commercial-cleaning-company",
  "carpet-cleaning-commercial-buildings",
  "green-cleaning-commercial-facilities",
  "janitorial-services-walnut-creek",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
