import { readFileSync } from 'node:fs';
const read = (name) => JSON.parse(readFileSync(new URL(`../../src/${name}`, import.meta.url), 'utf8'));
export const regions = read('data/regions.json');
export const business = read('data/business.json');
export const services = read('data/service-index.json');
export const posts = read('content/blog-index.json');
export function htmlPaths() {
  return ['/', '/services', '/locations', '/blog', '/privacy-policy', '/terms-of-service',
    ...services.map((service) => `/services/${service.slug}`),
    ...regions.flatMap((region) => [`/locations/${region.slug}`, ...region.cities.map((city) => `/locations/${region.slug}/${city.slug}`)]),
    ...posts.map((post) => `/blog/${post.slug}`),
    ...Array.from({length: Math.ceil(posts.length / 6) - 1}, (_, i) => `/blog/page/${i + 2}`),
  ];
}
