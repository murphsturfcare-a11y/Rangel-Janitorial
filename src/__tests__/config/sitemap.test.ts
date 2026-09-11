import { describe, it, expect, vi } from 'vitest';
import sitemap from '@/app/sitemap';
import { SITE_URL, SERVICE_SLUGS } from '@/lib/seo/constants';
import regions from '@/data/regions.json';
import { BLOG_SLUGS, BLOG_PAGE_COUNT, getBlogPagePath } from '@/content/blog-index';

describe('canonical sitemap', () => {
  it('includes every retained route exactly once, including city and blog archive pages', () => {
    const expected = [SITE_URL, ...['services', 'locations', 'blog', 'privacy-policy', 'terms-of-service'].map((path) => `${SITE_URL}/${path}`), ...SERVICE_SLUGS.map((slug) => `${SITE_URL}/services/${slug}`), ...regions.flatMap((region) => [`${SITE_URL}/locations/${region.slug}`, ...region.cities.map((city) => `${SITE_URL}/locations/${region.slug}/${city.slug}`)]), ...BLOG_SLUGS.map((slug) => `${SITE_URL}/blog/${slug}`), ...Array.from({ length: BLOG_PAGE_COUNT - 1 }, (_, i) => `${SITE_URL}${getBlogPagePath(i + 2)}`)];
    const actual = sitemap().map((entry) => entry.url);
    expect(actual.sort()).toEqual(expected.sort());
    expect(new Set(actual).size).toBe(actual.length);
  });

  it('excludes alternate text copies, redirected endpoints and nonexistent pages', () => {
    for (const entry of sitemap()) {
      expect(new URL(entry.url).origin).toBe(SITE_URL);
      expect(entry.url).not.toMatch(/\.md$|llms|\.html$|\?|\/contact$|\/about$|\/blog\/page\/1$/);
    }
  });

  it('does not manufacture lastmod from the build clock', () => {
    const original = sitemap();
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2030-01-01T00:00:00Z'));
      expect(sitemap()).toEqual(original);
      for (const entry of original) expect(entry.lastModified).toBeUndefined();
    } finally { vi.useRealTimers(); }
  });
});
