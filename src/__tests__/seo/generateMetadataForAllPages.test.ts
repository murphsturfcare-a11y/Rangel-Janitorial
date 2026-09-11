import { describe, it, expect } from 'vitest';
import { homeMetadata, servicesMetadata, locationsMetadata, serviceMetadata, locationMetadata, blogIndexMetadata, blogMetadata } from '@/lib/seo/generateMetadataForAllPages';
import { SITE_URL, SERVICE_SLUGS, LOCATION_SLUGS, BLOG_SLUGS } from '@/lib/seo/constants';

describe('shared metadata inventory', () => {
  it('covers the retained static entry points', () => {
    for (const [path, metadata] of [['/', homeMetadata], ['/services', servicesMetadata], ['/locations', locationsMetadata], ['/blog', blogIndexMetadata]] as const) {
      expect(metadata.alternates?.canonical).toBe(`${SITE_URL}${path}`);
      expect(metadata.title).toHaveProperty('absolute');
      expect(metadata.description).toBeTruthy();
      expect(metadata.openGraph?.images).toBeDefined();
    }
  });

  it('covers every service, regional hub, and retained article exactly once', () => {
    for (const [prefix, slugs, inventory] of [['services', SERVICE_SLUGS, serviceMetadata], ['locations', LOCATION_SLUGS, locationMetadata], ['blog', BLOG_SLUGS, blogMetadata]] as const) {
      expect(Object.keys(inventory).sort()).toEqual([...slugs].sort());
      for (const slug of slugs) {
        const metadata = inventory[slug];
        expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/${prefix}/${slug}`);
        expect(metadata.title).toHaveProperty('absolute');
        expect(metadata.description).toBeTruthy();
        expect(metadata.openGraph?.images).toBeDefined();
        expect(metadata.twitter).toHaveProperty('images');
      }
    }
  });
});
