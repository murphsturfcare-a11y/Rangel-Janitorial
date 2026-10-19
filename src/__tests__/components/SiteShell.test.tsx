import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SiteShell from '@/components/layout/SiteShell';
import regions from '@/data/regions.json';

const route = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/navigation', () => ({ usePathname: () => route.pathname }));

afterEach(cleanup);

function shell() {
  return (
    <SiteShell header={<header>Site header</header>} footer={<footer>Site footer</footer>} marketingControls={<aside>Marketing controls</aside>}>
      <article>Page content</article>
    </SiteShell>
  );
}

describe('site shell selection', () => {
  it.each(regions)('omits the broad shell on the $city paid page', (region) => {
    route.pathname = `/quote/${region.slug}`;
    render(shell());
    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(screen.queryByText('Site header')).not.toBeInTheDocument();
    expect(screen.queryByText('Site footer')).not.toBeInTheDocument();
    expect(screen.queryByText('Marketing controls')).not.toBeInTheDocument();
    // The paid route owns its own main landmark; the shell must not nest another.
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
  });

  it.each(['/', '/locations/murrieta', '/services/office-cleaning', '/blog', '/privacy-policy', '/quote/missing', '/quote/murrieta/extra'])('preserves the existing shell on %s', (path) => {
    route.pathname = path;
    render(shell());
    expect(screen.getByText('Site header')).toBeInTheDocument();
    expect(screen.getByText('Site footer')).toBeInTheDocument();
    expect(screen.getByText('Marketing controls')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Page content');
    expect(screen.getByRole('main')).toHaveClass('pt-24', 'pb-16');
  });

  it('restores the regular shell when navigating from a quote page to legal content', () => {
    route.pathname = '/quote/murrieta';
    const { rerender } = render(shell());
    route.pathname = '/privacy-policy';
    rerender(shell());
    expect(screen.getByRole('main')).toHaveTextContent('Page content');
    expect(screen.getByText('Site header')).toBeInTheDocument();
    expect(screen.getByText('Site footer')).toBeInTheDocument();
  });
});
