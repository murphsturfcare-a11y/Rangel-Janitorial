import { describe, it, expect } from 'vitest';
import { generateOrganizationSchema, generateLocalBusinessSchema, generateServiceSchema, generateLocationSchema, generateAggregateRatingSchema, generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema, generateBlogPostSchema, generateBlogListSchema } from '@/lib/seo/schema';
import business from '@/data/business.json';
import regions from '@/data/regions.json';
import { BLOG_SUMMARIES } from '@/content/blog-index';

const site = business.url;
const organizationId = `${site}/#organization`;

describe('business entity graph', () => {
  it('uses a stable organization identity and a contact point for every real regional phone', () => {
    const schema = generateOrganizationSchema();
    expect(schema).toMatchObject({ '@context': 'https://schema.org', '@type': 'Organization', '@id': organizationId, name: business.name, url: site, email: business.email, location: { '@id': `${site}/#headquarters` } });
    expect(schema.sameAs).toEqual(Object.values(business.socialLinks));
    expect(schema.contactPoint).toHaveLength(regions.length);
    for (const region of regions) {
      expect(schema.contactPoint).toContainEqual({ '@type': 'ContactPoint', '@id': `${site}/#contact-${region.slug}`, telephone: region.phoneHref.replace('tel:', ''), contactType: 'customer service', areaServed: region.cities.map((city) => city.name), url: `${site}/locations/${region.slug}` });
    }
  });

  it('models only the confirmed headquarters address and omits unknown hours and coordinates', () => {
    const schema = generateLocalBusinessSchema();
    expect(schema).toMatchObject({ '@type': 'LocalBusiness', '@id': `${site}/#headquarters`, name: business.name, address: { '@type': 'PostalAddress', ...business.headquarters }, parentOrganization: { '@id': organizationId }, telephone: '+19518944222' });
    expect(schema.url).toBe(`${site}/locations/murrieta`);
    expect(schema).not.toHaveProperty('openingHoursSpecification');
    expect(schema).not.toHaveProperty('geo');
    expect(schema).not.toHaveProperty('aggregateRating');
  });

  it('references the organization from services and identifies every supported city', () => {
    const service = { name: 'Floor Care', slug: 'floor-care', description: 'Commercial floor care.' };
    const schema = generateServiceSchema(service);
    expect(schema).toMatchObject({ '@context': 'https://schema.org', '@type': 'Service', '@id': `${site}/services/floor-care#service`, name: service.name, serviceType: service.name, description: service.description, url: `${site}/services/floor-care`, provider: { '@id': organizationId } });
    expect(schema.areaServed.map((area) => area.name)).toEqual(regions.flatMap((region) => region.cities.map((city) => city.name)));
    expect(schema).not.toHaveProperty('offers');
  });

  it('represents service areas without inventing a physical branch at each city', () => {
    const schema = generateLocationSchema({ name: 'Sacramento', slug: 'sacramento', description: 'Commercial cleaning in Sacramento.', phone: '(916) 426-2311' });
    expect(schema).toMatchObject({ '@type': 'Service', '@id': `${site}/locations/sacramento#service`, provider: { '@id': organizationId }, url: `${site}/locations/sacramento`, areaServed: { '@type': 'City', name: 'Sacramento', containedInPlace: { '@type': 'State', name: 'California' } } });
    expect(schema).not.toHaveProperty('address');
    expect(schema).not.toHaveProperty('telephone');
    expect(schema).not.toHaveProperty('openingHoursSpecification');
  });
});

describe('page and content schemas', () => {
  it('maps the visible FAQ wording exactly and handles an empty set', () => {
    const faqs = [{ question: 'Do you provide day porter service?', answer: 'Yes, contact your regional team to discuss the building and schedule.' }];
    expect(generateFAQSchema(faqs)).toEqual({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: faqs[0].question, acceptedAnswer: { '@type': 'Answer', text: faqs[0].answer } }] });
    expect(generateFAQSchema([]).mainEntity).toEqual([]);
  });

  it('preserves breadcrumb URL order and labels with one-based positions', () => {
    const items = [{ name: 'Home', url: site }, { name: 'Services', url: `${site}/services` }, { name: 'Floor Care', url: `${site}/services/floor-care` }];
    const schema = generateBreadcrumbSchema(items);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toEqual(items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })));
    expect(generateBreadcrumbSchema([]).itemListElement).toEqual([]);
  });

  it('connects a webpage to the production website', () => {
    expect(generateWebPageSchema('Services', 'Commercial cleaning services.', `${site}/services`)).toMatchObject({ '@type': 'WebPage', name: 'Services', description: 'Commercial cleaning services.', url: `${site}/services`, isPartOf: { '@type': 'WebSite', name: business.name, url: site } });
  });

  it('preserves supplied article dates and omits an unknown modification date', () => {
    const post = { title: 'Cleaning Guide', slug: 'cleaning-guide', description: 'Cleaning advice.', datePublished: '2026-03-15' };
    const schema = generateBlogPostSchema(post);
    expect(schema).toMatchObject({ '@type': 'BlogPosting', headline: post.title, description: post.description, url: `${site}/blog/cleaning-guide`, datePublished: post.datePublished, author: { '@id': organizationId }, publisher: { '@id': organizationId }, mainEntityOfPage: { '@type': 'WebPage', '@id': `${site}/blog/cleaning-guide` } });
    expect(schema).not.toHaveProperty('dateModified');
    expect(generateBlogPostSchema({ ...post, dateModified: '2026-04-01' }).dateModified).toBe('2026-04-01');
  });

  it.each([undefined, '/images/custom.jpg', 'https://cdn.example.com/guide.jpg'])('uses a valid absolute article image URL for %s', (image) => {
    const schema = generateBlogPostSchema({ title: 'Cleaning Guide', slug: 'cleaning-guide', description: 'Cleaning advice.', datePublished: '2026-03-15', image });
    expect(schema.image).toBe(image?.startsWith('https:') ? image : `${site}${image || '/images/og-image.png'}`);
  });

  it('links all supplied articles without synthesizing article metadata', () => {
    const schema = generateBlogListSchema(BLOG_SUMMARIES);
    expect(schema).toMatchObject({ '@type': 'Blog', name: `${business.name} Blog`, url: `${site}/blog`, publisher: { '@id': organizationId } });
    expect(schema.blogPost).toEqual(BLOG_SUMMARIES.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: `${site}/blog/${post.slug}` })));
    expect(generateBlogListSchema([]).blogPost).toEqual([]);
  });

  it('preserves explicit rating inputs without deriving them from site testimonials', () => {
    expect(generateAggregateRatingSchema(4.8, 150)).toEqual({ '@context': 'https://schema.org', '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 150, bestRating: 5, worstRating: 1 });
  });
});
