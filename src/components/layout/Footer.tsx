'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const servicesLinks = [
  { label: 'Pet Hair & Debris Removal', href: '/services/pet-hair-debris' },
  { label: 'Blooming & De-Compacting', href: '/services/blooming-decompacting' },
  { label: 'Disinfect & Deodorize', href: '/services/disinfect-deodorize' },
  { label: 'Poop Scooping & Removal', href: '/services/poop-scooping' },
];

const locationsLinks = [
  { label: 'Huntington Beach / LA Area', href: '/locations/huntington-beach' },
  { label: 'Murrieta / Inland Empire', href: '/locations/murrieta' },
  { label: 'Martinez / Bay Area', href: '/locations/martinez' },
  { label: 'Greater Sacramento', href: '/locations/sacramento' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/murphysturfcare/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100090088264095', icon: Facebook },
  { name: 'YouTube', href: 'https://www.youtube.com/@murphysturfcare/featured', icon: Youtube },
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
                Stay Updated with Turf Care Tips
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
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 — Company info */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white"
              aria-label="Murphy's Turf — Home"
            >
              <Image
                src="/images/logo.avif"
                alt="Murphy's Turf"
                width={56}
                height={56}
                className="w-14 h-14 object-contain"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-gray-400">
              California&apos;s trusted artificial turf cleaning experts. Specializing in pet hair
              removal, turf deodorizing, and maintenance. Serving California since 1994.
            </p>
            {/* Social Media Links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-gray-400 transition-colors hover:text-sage"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
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

        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-charcoal-light">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <p className="font-body text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Murphy&apos;s Turf. All rights reserved.
          </p>
          <p className="font-body text-sm text-gray-400">
            100% Pet Friendly | Eco Friendly | Satisfaction Guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}
