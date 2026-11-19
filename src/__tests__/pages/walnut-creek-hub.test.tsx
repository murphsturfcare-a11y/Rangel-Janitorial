import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BLOG_POSTS } from '@/content/blog-registry';
import serviceIndex from '@/data/service-index.json';

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/locations/walnut-creek',
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  })));
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

async function renderHub(slug: string) {
  const Page = (await import('@/app/locations/[slug]/page')).default;
  const { container } = render(await Page({ params: Promise.resolve({ slug }) }));
  const schemas = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    .map((node) => JSON.parse(node.textContent!));
  return { container, schemas };
}

describe('Walnut Creek location hub', () => {
  it('uses Walnut Creek search metadata with a self canonical', async () => {
    const { generateMetadata } = await import('@/app/locations/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'walnut-creek' }) });
    expect(metadata.title).toEqual({ absolute: 'Walnut Creek Commercial and Office Cleaning | Rangel Janitorial' });
    expect(metadata.description).toMatch(/^Office and commercial cleaning for Walnut Creek/);
    expect((metadata.description as string).length).toBeLessThanOrEqual(160);
    expect(metadata.alternates?.canonical).toBe('https://rangeljanitorial.com/locations/walnut-creek');
  });

  it('shows one H1, the Walnut Creek phone and no Sacramento hours', async () => {
    const { container } = await renderHub('walnut-creek');
    const h1 = screen.getAllByRole('heading', { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toContain('Walnut Creek, CA');
    expect(container.querySelector('a[href="tel:9256559008"]')).not.toBeNull();
    expect(container.textContent).not.toMatch(/\d{1,2}\s?(AM|PM)\b|24 hours|hours a day|Monday|916|426-2311/i);
  });

  it('renders eight answers that match the FAQPage schema exactly', async () => {
    const { schemas } = await renderHub('walnut-creek');
    const faqSchema = schemas.find((schema) => schema['@type'] === 'FAQPage');
    expect(faqSchema.mainEntity).toHaveLength(8);
    for (const entry of faqSchema.mainEntity) {
      expect(screen.getByText(entry.name)).toBeInTheDocument();
      expect(screen.getByText(entry.acceptedAnswer.text)).toBeInTheDocument();
      expect(`${entry.name} ${entry.acceptedAnswer.text}`).not.toMatch(/[—–]|\$\d|guarantee|throughout/i);
    }
    const service = schemas.find((schema) => schema['@type'] === 'Service');
    expect(service.description).toMatch(/Walnut Creek and nearby East Bay communities/);
    expect(service.areaServed[0]).toEqual({ '@type': 'City', name: 'Walnut Creek' });
  });

  it('links to services, the regional calculator and existing Walnut Creek guides', async () => {
    await renderHub('walnut-creek');
    const intro = screen.getByRole('region', { name: 'Office cleaning for Walnut Creek and East Bay businesses' });
    expect(intro.textContent).not.toMatch(/[—–]|\$\d|guarantee|throughout/i);
    const hrefs = within(intro).getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      '/services/office-cleaning', '/services/janitorial-cleaning', '/services/day-porter', '/services/floor-care',
      '/quote/walnut-creek#cleaning-calculator',
      '/blog/janitorial-services-walnut-creek', '/blog/walnut-creek-financial-district-after-hours',
    ]);
    for (const slug of ['janitorial-services-walnut-creek', 'walnut-creek-financial-district-after-hours']) {
      expect(BLOG_POSTS[slug]).toBeDefined();
    }
  });

  it('keeps the shared copy for Murrieta and the Sacramento hub unchanged', async () => {
    const murrieta = await renderHub('murrieta');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Professional Janitorial Services');
    expect(murrieta.container.querySelector('section[aria-labelledby]:not([aria-labelledby="customer-reviews-heading"])')).toBeNull();
    expect(murrieta.schemas.find((schema) => schema['@type'] === 'Service').description).toBeUndefined();
    murrieta.container.remove();

    const { generateMetadata } = await import('@/app/locations/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'sacramento' }) });
    expect(metadata.title).toEqual({ absolute: 'Sacramento Commercial Cleaning for Small Businesses | Rangel Janitorial' });
    const sacramento = await renderHub('sacramento');
    expect(sacramento.container.textContent).toContain('9 AM to 9 PM every day, Pacific Time.');
    expect(sacramento.schemas.find((schema) => schema['@type'] === 'FAQPage').mainEntity).toHaveLength(8);
    const intro = screen.getByRole('region', { name: 'Janitorial cleaning for small offices and local shops' });
    expect(intro.querySelector('h2')!.id).toBe('sacramento-small-business-heading');
    expect(within(intro).getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)).toEqual([
      'Your space and priorities', 'A schedule around your business', 'A quote based on the work',
    ]);
    expect(within(intro).getAllByRole('link').map((link) => [link.getAttribute('href'), link.textContent])).toEqual([
      ['/services/office-cleaning', 'Office cleaning'], ['/services/janitorial-cleaning', 'Janitorial cleaning'],
      ['/services/floor-care', 'Floor care'], ['/quote/sacramento#cleaning-calculator', 'Estimate your cleaning budget'],
      ['/blog/janitorial-services-sacramento', 'Sacramento guide to choosing a janitorial company'],
      ['/blog/sacramento-after-hours-janitorial-service', 'guide to after-hours cleaning'],
    ]);
    expect(intro.textContent).toContain('Planning your service? Read our Sacramento guide to choosing a janitorial company and guide to after-hours cleaning.');
  });
});

describe('rewritten Walnut Creek guides', () => {
  it.each(['janitorial-services-walnut-creek', 'walnut-creek-financial-district-after-hours'])('%s avoids unverified claims and links the hub', (slug) => {
    const post = BLOG_POSTS[slug];
    expect(post.content).toContain('href="/locations/walnut-creek"');
    expect(post.content).toContain('href="tel:+19256559008"');
    expect(`${post.title} ${post.metaDescription} ${post.content}`).not.toMatch(/[—–]|\$\d|guarantee|throughout/i);
  });

  it('removes unverified local job claims from every Walnut Creek guide', () => {
    for (const post of Object.values(BLOG_POSTS).filter((entry) => entry.slug.includes('walnut-creek'))) {
      expect(post.content).not.toMatch(/Rangel Janitorial (cleans|offers|responds|serves|has cleaned|works with)|Rangel Janitorial[^.]*throughout/);
    }
  });

  it.each(['janitorial-services-walnut-creek', 'walnut-creek-financial-district-after-hours'])('%s links only to existing routes', (slug) => {
    const services = new Set(serviceIndex.map((service) => service.slug));
    for (const [, href] of BLOG_POSTS[slug].content.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('/blog/')) expect(BLOG_POSTS[href.slice(6)], href).toBeDefined();
      else if (href.startsWith('/services/')) expect(services.has(href.slice(10)), href).toBe(true);
      else expect(href).toMatch(/^(\/locations\/walnut-creek|\/quote\/walnut-creek#cleaning-calculator|tel:\+19256559008)$/);
    }
  });
});
