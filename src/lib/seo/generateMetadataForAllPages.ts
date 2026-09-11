import { generatePageMetadata, generateServiceMetadata, generateLocationMetadata, generateBlogMetadata, generateBlogIndexMetadata } from './metadata';
import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { BLOG_SUMMARIES } from '@/content/blog-index';

export const homeMetadata = generatePageMetadata(
  'Professional Janitorial & Commercial Cleaning in California',
  'Rangel Janitorial provides professional janitorial and commercial cleaning for California businesses. Serving Sacramento, Murrieta and Walnut Creek.',
  '/',
);
export const servicesMetadata = generatePageMetadata(
  'Our Janitorial & Commercial Cleaning Services',
  'Explore janitorial cleaning, day porter services, electrostatic disinfection, floor care, and office cleaning for California businesses.',
  '/services',
);
export const locationsMetadata = generatePageMetadata(
  'Janitorial & Commercial Cleaning Locations in California',
  'Find your Rangel Janitorial regional team in Sacramento, Murrieta and the Inland Empire, or Walnut Creek and the East Bay.',
  '/locations',
);
export const serviceMetadata = Object.fromEntries(services.map((service) => [service.slug, generateServiceMetadata(service)]));
export const locationMetadata = Object.fromEntries(locations.map((location) => [location.slug, generateLocationMetadata(location)]));
export const blogIndexMetadata = generateBlogIndexMetadata();
export const blogMetadata = Object.fromEntries(BLOG_SUMMARIES.map((post) => [post.slug, generateBlogMetadata({ title: post.title, slug: post.slug, description: post.excerpt })]));
