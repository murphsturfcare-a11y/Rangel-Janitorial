import type { MetadataRoute } from 'next';
import { SITE_URL, SERVICE_SLUGS } from '@/lib/seo/constants';
import regions from '@/data/regions.json';
import { BLOG_SUMMARIES, BLOG_PAGE_COUNT, getBlogPagePath } from '@/content/blog-index';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/services', '/locations', '/blog', '/privacy-policy', '/terms-of-service',
    ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
    ...regions.flatMap((region) => [`/locations/${region.slug}`, ...region.cities.map((city) => `/locations/${region.slug}/${city.slug}`)]),
    ...Array.from({length: BLOG_PAGE_COUNT - 1}, (_, index) => getBlogPagePath(index + 2)),
  ];
  return [
    ...paths.map((path) => ({url: `${SITE_URL}${path === '/' ? '' : path}`})),
    ...BLOG_SUMMARIES.map((post) => ({url: `${SITE_URL}/blog/${post.slug}`})),
  ];
}
