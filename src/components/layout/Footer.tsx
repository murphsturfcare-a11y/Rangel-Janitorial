'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import NewsletterForm from '@/components/forms/NewsletterForm';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const servicesLinks = [
  { label: 'Pet Hair & Debris Removal', href: '/services/pet-hair-debris' },
  { label: 'Blooming & De-Compacting', href: '/services/blooming-decompacting' },
  { label: 'Disinfect & Deodorize', href: '/services/disinfect-deodorize' },
  { label: 'Poop Scooping & Removal', href: '/services/poop-scooping' },
  { label: 'Powered By OxyTurf', href: '/services/oxyturf' },
];

const locationsLinks = [
  { label: 'Huntington Beach / LA Area', href: '/locations/huntington-beach' },
  { label: 'Murrieta / Inland Empire', href: '/locations/murrieta' },
  { label: 'Martinez / Bay Area', href: '/locations/martinez' },
  { label: 'Greater Sacramento', href: '/locations/sacramento' },
];

const contactInfo = [
  { icon: Mail, text: 'info@murphysturf.com' },
  { icon: MapPin, text: 'Murrieta, CA' },
  { icon: Clock, text: 'Mon-Fri: 7AM-6PM | Sat: 8AM-4PM' },
];

const phoneByLocation = [
  { name: 'Huntington Beach / LA', phone: '951-331-3300', href: '/locations/huntington-beach' },
  { name: 'Murrieta / Inland Empire', phone: '951-331-3300', href: '/locations/murrieta' },
  { name: 'Martinez / Bay Area', phone: '925-338-0048', href: '/locations/martinez' },
  { name: 'Sacramento', phone: '916-432-5033', href: '/locations/sacramento' },
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
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Company info */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white"
              aria-label="Murphy's Turf — Home"
            >
              <Image
                src="/images/logo.png"
                alt="Murphy's Turf"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-heading text-xl font-bold">
                Murphy&apos;s Turf
              </span>
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
            <h5 className="mt-5 font-heading text-sm font-semibold text-white flex items-center gap-2">
              <Phone className="h-4 w-4 text-sage" />
              Call Your Local Office
            </h5>
            <ul className="mt-2 space-y-1.5">
              {phoneByLocation.map((loc) => (
                <li key={loc.href}>
                  <Link
                    href={loc.href}
                    className="font-body text-sm text-gray-300 hover:text-sage transition-colors"
                  >
                    {loc.name}: <span className="font-semibold">{loc.phone}</span>
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
