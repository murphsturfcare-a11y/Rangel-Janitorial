import { seoMetadata } from '@/data/seo';
import { SERVICE_SLUGS, LOCATION_SLUGS } from '@/lib/seo/constants';

describe('seo metadata', () => {
  const staticPages = ['home', 'contact', 'services', 'locations', 'blog', 'privacy', 'terms'];

  describe('page coverage', () => {
    it('has entries for all static pages', () => {
      for (const page of staticPages) {
        expect(seoMetadata).toHaveProperty(page);
      }
    });

    it('has entries for all service pages', () => {
      for (const slug of SERVICE_SLUGS) {
        const key = `services/${slug}`;
        expect(seoMetadata, `missing seoMetadata["${key}"]`).toHaveProperty(key);
      }
    });

    it('has entries for all location pages', () => {
      for (const slug of LOCATION_SLUGS) {
        const key = `locations/${slug}`;
        expect(seoMetadata, `missing seoMetadata["${key}"]`).toHaveProperty(key);
      }
    });
  });

  describe('field integrity', () => {
    const allKeys = [
      ...staticPages,
      ...SERVICE_SLUGS.map((s) => `services/${s}`),
      ...LOCATION_SLUGS.map((l) => `locations/${l}`),
    ];

    it('every entry has a non-empty title', () => {
      for (const key of allKeys) {
        const entry = seoMetadata[key];
        expect(typeof entry.title).toBe('string');
        expect(entry.title, `${key}.title must not be empty`).not.toBe('');
      }
    });

    it('every entry has a non-empty description', () => {
      for (const key of allKeys) {
        const entry = seoMetadata[key];
        expect(typeof entry.description).toBe('string');
        expect(entry.description, `${key}.description must not be empty`).not.toBe('');
      }
    });

    it('every entry has a non-empty keywords array', () => {
      for (const key of allKeys) {
        const entry = seoMetadata[key];
        expect(Array.isArray(entry.keywords)).toBe(true);
        expect(entry.keywords.length, `${key}.keywords must not be empty`).toBeGreaterThan(0);
      }
    });
  });
});
