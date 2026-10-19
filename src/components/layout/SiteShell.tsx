'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import regions from '@/data/regions.json';

const quotePaths = new Set(regions.map((region) => `/quote/${region.slug}`));

interface SiteShellProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  marketingControls: ReactNode;
}

/** Keep page content server-rendered while selecting the appropriate site chrome. */
export default function SiteShell({ children, header, footer, marketingControls }: SiteShellProps) {
  const pathname = usePathname();

  // Quote pages supply their own focused header, main and legal footer.
  if (quotePaths.has(pathname?.replace(/\/$/, '') || '')) return <>{children}</>;

  return (
    <>
      {header}
      <main className="flex-1 pt-24 lg:pt-28 pb-16 lg:pb-0">{children}</main>
      {footer}
      {marketingControls}
    </>
  );
}
