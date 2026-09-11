import { describe, it, expect } from 'vitest';
import { generatePageMetadata, generateServiceMetadata, generateLocationMetadata, generateBlogMetadata, generateBlogIndexMetadata, DEFAULT_METADATA } from '@/lib/seo/metadata';
import { SITE_URL, COMPANY_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo/constants';

describe('metadata generation', () => {
  it('uses an absolute title with the brand exactly once, even for a prebranded title', () => {
    for (const title of ['Floor Care', 'Floor Care | Rangel Janitorial', 'Floor Care | Rangel Janitorial Blog']) {
      const meta = generatePageMetadata(title, 'Commercial floor care', '/services/floor-care');
      expect(meta.title).toEqual({ absolute: 'Floor Care | Rangel Janitorial' });
      expect(meta.alternates?.canonical).toBe(`${SITE_URL}/services/floor-care`);
      expect(meta.openGraph).toMatchObject({ title: 'Floor Care | Rangel Janitorial', url: `${SITE_URL}/services/floor-care`, description: 'Commercial floor care', siteName: COMPANY_NAME, type: 'website', locale: 'en_US' });
    }
  });

  it.each([undefined, '/images/custom.jpg', 'https://cdn.example.com/custom.jpg'])('provides matching OG and Twitter previews for %s', (image) => {
    const expected = image?.startsWith('https:') ? image : `${SITE_URL}${image || DEFAULT_OG_IMAGE}`;
    const meta = generatePageMetadata('Cleaning', 'Description', '/services', image);
    expect(meta.openGraph?.images).toEqual([{ url: expected, width: 1200, height: 630, alt: 'Cleaning' }]);
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image', images: [expected], title: 'Cleaning | Rangel Janitorial', description: 'Description' });
  });

  it('describes the correct service and region with self-canonical URLs', () => {
    const service = generateServiceMetadata({ name: 'Floor Care', slug: 'floor-care', shortDescription: 'Care for commercial floors.' });
    expect(service.title).toEqual({ absolute: 'Floor Care | Commercial Cleaning California | Rangel Janitorial' });
    expect(service.description).toContain('Care for commercial floors.');
    expect(service.alternates?.canonical).toBe(`${SITE_URL}/services/floor-care`);
    const region = generateLocationMetadata({ name: 'Sacramento', slug: 'sacramento', description: 'Serving Sacramento businesses.' });
    expect(region.title).toEqual({ absolute: 'Janitorial & Commercial Cleaning in Sacramento, CA | Rangel Janitorial' });
    expect(region.alternates?.canonical).toBe(`${SITE_URL}/locations/sacramento`);
    expect(region.description).toContain('Serving Sacramento businesses.');
  });

  it('generates article previews while keeping dates absent unless known by the article renderer', () => {
    const post = { title: 'Office Cleaning Guide', slug: 'office-cleaning-guide', description: 'Useful office cleaning guidance.' };
    for (const image of [undefined, '/images/guide.jpg', 'https://cdn.example.com/guide.jpg']) {
      const metadata = generateBlogMetadata({ ...post, image });
      const imageUrl = image?.startsWith('https:') ? image : `${SITE_URL}${image || DEFAULT_OG_IMAGE}`;
      expect(metadata.title).toEqual({ absolute: 'Office Cleaning Guide | Rangel Janitorial' });
      expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/blog/${post.slug}`);
      expect(metadata.openGraph).toMatchObject({ type: 'article', title: post.title, description: post.description, images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] });
      expect(metadata.openGraph).not.toHaveProperty('modifiedTime');
      expect(metadata.twitter).toMatchObject({ card: 'summary_large_image', images: [imageUrl] });
    }
  });

  it('provides blog index metadata for commercial cleaning', () => {
    const meta = generateBlogIndexMetadata();
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/blog`);
    expect(meta.title).toEqual({ absolute: 'Commercial Cleaning Blog — Tips & Guides | Rangel Janitorial' });
    expect(meta.description).toContain('commercial cleaning tips');
  });

  it('keeps global defaults complete without leaking the home canonical into child pages', () => {
    expect(DEFAULT_METADATA.title).toEqual({ default: COMPANY_NAME, template: `%s | ${COMPANY_NAME}` });
    expect(DEFAULT_METADATA.alternates?.canonical).toBeUndefined();
    expect(DEFAULT_METADATA.metadataBase?.toString()).toBe(`${SITE_URL}/`);
    expect(DEFAULT_METADATA.keywords).toEqual(expect.arrayContaining(['janitorial services', 'commercial cleaning', 'office cleaning']));
    expect(DEFAULT_METADATA.openGraph).toMatchObject({ siteName: COMPANY_NAME, images: [{ url: `${SITE_URL}${DEFAULT_OG_IMAGE}`, width: 1200, height: 630, alt: COMPANY_NAME }] });
    expect(DEFAULT_METADATA.twitter).toMatchObject({ card: 'summary_large_image', images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`] });
    expect(DEFAULT_METADATA.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } });
  });
});
