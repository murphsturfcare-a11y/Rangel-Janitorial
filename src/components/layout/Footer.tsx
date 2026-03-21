'use client';

import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, Clock } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const servicesLinks = [
  { label: 'Lawn Cleaning', href: '/services/lawn-cleaning' },
  { label: 'Aeration', href: '/services/aeration' },
  { label: 'Seeding', href: '/services/seeding' },
  { label: 'Fertilization', href: '/services/fertilization' },
  { label: 'Pest Control', href: '/services/pest-control' },
  { label: 'Seasonal Maintenance', href: '/services/seasonal-maintenance' },
];

const locationsLinks = [
  { label: 'Los Angeles', href: '/locations/los-angeles' },
  { label: 'Murrieta', href: '/locations/murrieta' },
  { label: 'Martinez', href: '/locations/martinez' },
  { label: 'Sacramento', href: '/locations/sacramento' },
];

const contactInfo = [
  { icon: Phone, text: '(951) 331-3300' },
  { icon: Mail, text: 'info@murphysturfcare.com' },
  { icon: MapPin, text: 'Murrieta, CA' },
  { icon: Clock, text: 'Mon-Fri: 7AM-6PM | Sat: 8AM-4PM' },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white" role="contentinfo">
      {/* ---- Newsletter row ---- */}
      <div className="border-b border-charcoal-light">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="font-heading text-xl font-bold text-white">
                Stay Updated with Lawn Care Tips
              </h3>
              <p className="mt-1 font-body text-sm text-gray-400">
                Get seasonal advice and exclusive offers delivered to your
                inbox.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* ---- Main grid ---- */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Company info */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white"
              aria-label="Murphy's Turf Care — Home"
            >
              <Leaf className="h-7 w-7 text-sage" />
              <span className="font-heading text-xl font-bold">
                Murphy&apos;s Turf Care
              </span>
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-gray-400">
              Professional turf cleaning and lawn care services serving the
              California communities since 2018.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white">
              Our Services
            </h4>
            <ul className="mt-4 space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-300 transition-colors hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Locations */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-2">
              {locationsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-300 transition-colors hover:text-sage"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold text-white">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
                    <span className="font-body text-sm text-gray-300">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-charcoal-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <p className="font-body text-sm text-gray-400">
            &copy; 2024 Murphy&apos;s Turf Care. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-body text-sm text-gray-400 transition-colors hover:text-sage"
            >
              Privacy Policy
            </Link>
            <span className="text-charcoal-light" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms"
              className="font-body text-sm text-gray-400 transition-colors hover:text-sage"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
