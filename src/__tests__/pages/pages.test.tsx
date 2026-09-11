import { render, screen, cleanup, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ReactElement } from 'react';

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  })));
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

function expectPage(element: ReactElement) {
  render(element);
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0].textContent?.trim()).toBeTruthy();
  cleanup();
}

describe('retained page families', () => {
  it('renders the current home, services, regional selector, blog and legal pages', async () => {
    for (const pageModule of [await import('@/app/page'), await import('@/app/services/page'), await import('@/app/locations/page'), await import('@/app/blog/page'), await import('@/app/privacy-policy/page'), await import('@/app/terms-of-service/page')]) {
      const Page = pageModule.default;
      expectPage(<Page />);
    }
  });

  it('renders each asynchronous detail-page family with valid parameters', async () => {
    const service = (await import('@/app/services/[slug]/page')).default;
    const region = (await import('@/app/locations/[slug]/page')).default;
    const city = (await import('@/app/locations/[slug]/[subcity]/page')).default;
    const article = (await import('@/app/blog/[slug]/page')).default;
    const archive = (await import('@/app/blog/page/[page]/page')).default;
    expectPage(await service({ params: Promise.resolve({ slug: 'floor-care' }) }));
    expectPage(await region({ params: Promise.resolve({ slug: 'murrieta' }) }));
    expectPage(await city({ params: Promise.resolve({ slug: 'murrieta', subcity: 'temecula' }) }));
    expectPage(await article({ params: Promise.resolve({ slug: 'office-cleaning-best-practices' }) }));
    expectPage(await archive({ params: Promise.resolve({ page: '2' }) }));
  });

  it.each([
    { slug: 'sacramento', city: 'Sacramento', reviewers: ['Greg Thomsen', 'Priya Venkatesh', 'Danielle Foster'] },
    { slug: 'murrieta', city: 'Murrieta', reviewers: ['Brian Callahan', 'Maria Sandoval', 'Tyler Richardson'] },
    { slug: 'walnut-creek', city: 'Walnut Creek', reviewers: ['Richard Yamamoto', "Colleen O'Malley", 'Arjun Mehta'] },
  ])('renders one complete gallery and one review section in $city', async ({ slug, city, reviewers }) => {
    const Page = (await import('@/app/locations/[slug]/page')).default;
    render(await Page({ params: Promise.resolve({ slug }) }));

    const galleryHeadings = screen.getAllByRole('heading', { level: 2, name: 'Our Work' });
    expect(galleryHeadings).toHaveLength(1);
    const gallery = galleryHeadings[0].closest('section')!;
    const photos = within(gallery).getAllByRole('img');
    expect(photos).toHaveLength(12);
    expect(new Set(photos.map((photo) => photo.getAttribute('src'))).size).toBe(12);
    expect(within(gallery).getByRole('img', { name: 'Rangel crew member mopping commercial floors' })).toBeInTheDocument();
    expect(within(gallery).getByRole('img', { name: 'Rangel crew member dusting ceiling fixtures' })).toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 2, name: /Trusted by .* Businesses|What .* Customers Say/ })).toHaveLength(1);
    const reviews = screen.getByRole('region', { name: `What ${city} Customers Say` });
    expect(reviews.querySelectorAll('blockquote')).toHaveLength(reviewers.length);
    for (const reviewer of reviewers) {
      expect(screen.getAllByText(reviewer)).toHaveLength(1);
      expect(within(reviews).getByText(reviewer)).toBeInTheDocument();
    }
    for (const badge of ['Insured & Bonded', 'Eco Friendly', 'Satisfaction Guaranteed']) {
      expect(within(reviews).getByText(badge)).toBeInTheDocument();
    }
  });

  it('rejects unknown service, region, city and article records', async () => {
    const service = (await import('@/app/services/[slug]/page')).default;
    const region = (await import('@/app/locations/[slug]/page')).default;
    const city = (await import('@/app/locations/[slug]/[subcity]/page')).default;
    const article = (await import('@/app/blog/[slug]/page')).default;
    await expect(service({ params: Promise.resolve({ slug: 'missing-service' }) })).rejects.toThrow('NEXT_NOT_FOUND');
    await expect(region({ params: Promise.resolve({ slug: 'missing-region' }) })).rejects.toThrow('NEXT_NOT_FOUND');
    await expect(city({ params: Promise.resolve({ slug: 'murrieta', subcity: 'missing-city' }) })).rejects.toThrow('NEXT_NOT_FOUND');
    await expect(article({ params: Promise.resolve({ slug: 'missing-article' }) })).rejects.toThrow('NEXT_NOT_FOUND');
  });

  it('renders the real not-found page with a recovery link', async () => {
    const Page = (await import('@/app/not-found')).default;
    render(<Page />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });
});
