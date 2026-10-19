'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import regions from '@/data/regions.json';
import { getWebsiteCallPhone, subscribeWebsiteCallPhone } from '@/lib/analytics/website-calls';

interface WebsiteCallLinkProps {
  regionSlug: string;
  className?: string;
  numberClassName?: string;
  label?: string;
  labelClassName?: string;
  children?: ReactNode;
}

/** Static HTML always contains the business number; React owns both displayed and dialed values. */
export default function WebsiteCallLink({ regionSlug, className, numberClassName, label, labelClassName, children }: WebsiteCallLinkProps) {
  const forwarding = useSyncExternalStore(subscribeWebsiteCallPhone, () => getWebsiteCallPhone(regionSlug), () => null);
  const region = regions.find(entry => entry.slug === regionSlug);
  if (!region) return null;
  const phone = forwarding || region;
  return (
    <a href={phone.phoneHref} data-phone-region={region.slug} className={className}>
      {children}
      <span>
        {label && <span className={labelClassName}>{label}</span>}
        <span className={numberClassName}>{phone.phone}</span>
      </span>
    </a>
  );
}
