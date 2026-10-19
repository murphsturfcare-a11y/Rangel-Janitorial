import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import QuotePage, { generateMetadata, generateStaticParams } from '@/app/quote/[region]/page';
import sitemap from '@/app/sitemap';
import regions from '@/data/regions.json';
import business from '@/data/business.json';

vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
}));

afterEach(cleanup);

describe('regional paid quote pages', () => {
  it('exports every established region without adding paid pages to the sitemap', () => {
    expect(generateStaticParams()).toEqual(regions.map((region) => ({ region: region.slug })));
    expect(sitemap().some((entry) => new URL(entry.url).pathname.startsWith('/quote'))).toBe(false);
  });

  it.each(regions)('serves one closed quote wizard and only the $city phone', async (region) => {
    const { container } = render(await QuotePage({ params: Promise.resolve({ region: region.slug }) }));

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('You don’t have a cleaning problem. You have a reliability problem.');
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(container.querySelectorAll('dialog form')).toHaveLength(1);
    expect(container.querySelector('dialog')).not.toHaveAttribute('open');
    expect(screen.getByLabelText(/First Name/)).toBeRequired();
    expect(screen.getByLabelText(/Last Name/)).toBeRequired();
    expect(screen.getByLabelText(/Phone/)).toBeRequired();
    expect(screen.getByLabelText(/Email/)).toBeRequired();
    expect(screen.queryByLabelText(/How Did You Hear About Us/)).not.toBeInTheDocument();
    expect(container.querySelectorAll('a[href^="tel:"]').length).toBeGreaterThan(0);
    for (const link of container.querySelectorAll('a[href^="tel:"]')) {
      expect(link).toHaveAttribute('href', region.phoneHref);
    }
    expect(container.textContent).toContain(region.phone);
    for (const other of regions.filter((entry) => entry.slug !== region.slug)) {
      expect(container.textContent).not.toContain(other.phone);
    }
    expect(screen.getByRole('img', { name: 'Rangel crew members cleaning a break-room table and countertop' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Legal' })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Main navigation' })).not.toBeInTheDocument();
    const launchers = screen.getAllByRole('button', { name: 'Request my free walkthrough' });
    expect(launchers).toHaveLength(2);
    for (const launcher of launchers) expect(launcher).toHaveAttribute('aria-haspopup', 'dialog');
    expect(screen.getByText(`Serving ${region.city} & surrounding communities`)).toBeInTheDocument();
    expect(container.querySelector('#quote-form')).toBeInTheDocument();
  });

  it.each(regions)('keeps $city noindex with its own canonical', async (region) => {
    const metadata = await generateMetadata({ params: Promise.resolve({ region: region.slug }) });
    expect(metadata.alternates?.canonical).toBe(`${business.url}/quote/${region.slug}`);
    expect(metadata.robots).toEqual({ index: false, follow: true, googleBot: { index: false, follow: true } });
    expect(metadata.title).toEqual({ absolute: `Commercial Cleaning in ${region.city} | Free Walkthrough | ${business.name}` });
    expect(metadata.description).toContain(region.phone);
  });

  it('rejects unknown regions instead of guessing a phone or region', async () => {
    const props = { params: Promise.resolve({ region: 'unserved-city' }) };
    await expect(QuotePage(props)).rejects.toThrow('NEXT_NOT_FOUND');
    await expect(generateMetadata(props)).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
