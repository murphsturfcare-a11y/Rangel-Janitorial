export const SITE_URL = "https://murphysturf.com";
export const COMPANY_NAME = "Murphy's Turf";
export const COMPANY_TAGLINE = "When you care about clean turf, call Murphy's Turf";
export const COMPANY_DESCRIPTION =
  "Professional artificial turf cleaning and sanitization services across California. With 30+ years of experience, Murphy's Turf uses professional-grade cleaning solutions to deep clean, deodorize, and sanitize your synthetic turf. Serving Huntington Beach, Murrieta, Martinez, and Sacramento.";
export const COMPANY_PHONE = "";
export const COMPANY_EMAIL = "info@murphysturf.com";

export const COMPANY_ADDRESS = {
  city: "Murrieta",
  state: "CA",
  full: "Murrieta, CA",
};

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100090088264095",
  instagram: "https://www.instagram.com/murphysturfcare/",
  youtube: "https://www.youtube.com/@murphysturfcare/featured",
};

export const SERVICE_SLUGS = [
  "pet-hair-debris",
  "blooming-decompacting",
  "disinfect-deodorize",
  "poop-scooping",
  "oxyturf",
] as const;

export const LOCATION_SLUGS = [
  "huntington-beach",
  "murrieta",
  "martinez",
  "sacramento",
] as const;

export const BLOG_SLUGS = [
  "how-to-clean-artificial-turf",
  "professional-turf-cleaning-huntington-beach",
  "removing-pet-odors-murrieta",
  "artificial-turf-maintenance-bay-area",
  "sacramento-turf-cleaning-tips",
  "health-benefits-turf-sanitization",
  "how-often-clean-artificial-turf",
  "what-is-oxyturf-safe-turf-cleaning",
  "diy-vs-professional-turf-cleaning",
  "artificial-turf-pets-clean-safe",
  "why-artificial-turf-smells-fix",
  "signs-turf-needs-professional-cleaning",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
