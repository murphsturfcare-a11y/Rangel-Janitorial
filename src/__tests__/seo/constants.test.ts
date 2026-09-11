import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE_URL, COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_DESCRIPTION, DEFAULT_OG_IMAGE, SOCIAL_LINKS, SERVICE_SLUGS, LOCATION_SLUGS, BLOG_SLUGS } from '@/lib/seo/constants';
import business from '@/data/business.json';
import regions from '@/data/regions.json';
import { services } from '@/data/services';
import { BLOG_SUMMARIES } from '@/content/blog-index';

describe('shared SEO constants', () => {
  it('uses the production business identity and contact details', () => {
    expect(SITE_URL).toBe('https://rangeljanitorial.com');
    expect(COMPANY_NAME).toBe(business.name);
    expect(COMPANY_EMAIL).toBe(business.email);
    expect(COMPANY_PHONE.replace(/\D/g, '')).toBe(business.phone.replace(/\D/g, ''));
    expect(COMPANY_ADDRESS).toMatchObject({ city: business.headquarters.addressLocality, state: business.headquarters.addressRegion });
    expect(SOCIAL_LINKS).toEqual(business.socialLinks);
    expect(COMPANY_DESCRIPTION).toMatch(/janitorial and commercial cleaning/);
  });

  it('keeps the default preview image present on disk', () => {
    expect(DEFAULT_OG_IMAGE.startsWith('/')).toBe(true);
    expect(existsSync(resolve(__dirname, '../../../public', DEFAULT_OG_IMAGE.slice(1)))).toBe(true);
  });

  it('derives complete, unique route sets from current content', () => {
    expect([...SERVICE_SLUGS].sort()).toEqual(services.map((service) => service.slug).sort());
    expect(LOCATION_SLUGS).toEqual(regions.map((region) => region.slug));
    expect(BLOG_SLUGS).toEqual(BLOG_SUMMARIES.map((post) => post.slug));
    for (const slugs of [SERVICE_SLUGS, LOCATION_SLUGS, BLOG_SLUGS]) expect(new Set(slugs).size).toBe(slugs.length);
  });
});
