import serviceIndex from '@/data/service-index.json';
export { BLOG_SLUGS } from '@/content/blog-index';
import { BLOG_SLUGS } from '@/content/blog-index';
import business from '@/data/business.json';
import regions from '@/data/regions.json';
export const SITE_URL = business.url;
export const COMPANY_NAME = business.name;
export const COMPANY_TAGLINE = "Creating Excellent First Impressions";
export const COMPANY_DESCRIPTION =
  "Professional janitorial and commercial cleaning services across California. Rangel Janitorial delivers reliable, thorough cleaning for offices, medical facilities, industrial parks, and more. Serving Sacramento, Murrieta, and Walnut Creek.";
export const COMPANY_PHONE = regions.find((region) => region.slug === 'murrieta')!.phone.replace(/[()]/g, '').replace(/ /g, '-');
export const COMPANY_EMAIL = business.email;

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

export const SERVICE_SLUGS = serviceIndex.map((service) => service.slug);

export const LOCATION_SLUGS = regions.map((region) => region.slug);


export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type LocationSlug = (typeof LOCATION_SLUGS)[number];
export type BlogSlug = (typeof BLOG_SLUGS)[number];
