'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Phone, MapPin } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const servicesLinks = [
  { label: 'Janitorial Cleaning', href: '/services/janitorial-cleaning' },
  { label: 'Day Porter', href: '/services/day-porter' },
  { label: 'Electrostatic Disinfection', href: '/services/electrostatic-disinfection' },
  { label: 'Floor Care', href: '/services/floor-care' },
  { label: 'Carpet Cleaning', href: '/services/carpet-cleaning' },
];

const locationsLinks = [
  { label: 'Sacramento', href: '/locations/sacramento' },
  { label: 'Murrieta / Inland Empire', href: '/locations/murrieta' },
  { label: 'Walnut Creek / East Bay', href: '/locations/walnut-creek' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/rangeljanitorial/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100090088264095', icon: Facebook },
  { name: 'YouTube', href: 'https://www.youtube.com/@rangeljanitorial/featured', icon: Youtube },
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
                Stay Updated with Facility Cleaning Tips
              </h3>
              <p className="mt-1 font-body text-sm text-gray-400">
                Get industry insights and exclusive offers delivered to your
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
              aria-label="Rangel Janitorial — Home"
            >
              <Image
                src="/images/logo.png"
                alt="Rangel Janitorial"
                width={140}
                height={69}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-gray-400">
              California&apos;s trusted commercial cleaning experts. Specializing in janitorial
              services, floor care, electrostatic disinfection, and facility maintenance. Serving California.
            </p>
            <div className="mt-4 flex items-center gap-2 text-gray-400 font-body text-sm">
              <MapPin className="w-4 h-4 text-sage flex-shrink-0" />
              <span>26323 Jefferson Ave Suite C, Murrieta, CA 92562</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-gray-400 font-body text-sm">
              <Phone className="w-4 h-4 text-sage flex-shrink-0" />
              <a href="tel:9518944222" className="hover:text-sage transition-colors">951-894-4222</a>
            </div>
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
            &copy; {new Date().getFullYear()} Rangel Janitorial. All rights reserved.
          </p>
          <p className="font-body text-sm text-gray-400">
            Professional Crews | Fully Insured | Satisfaction Guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}
