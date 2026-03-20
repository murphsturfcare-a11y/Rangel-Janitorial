import type { NavItem, NavGroup } from '../types';

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Deep Cleaning & Sanitization", href: "/services/turf-cleaning" },
      { label: "Pet Odor & Stain Removal", href: "/services/pet-odor-treatment" },
      { label: "Turf Deodorizing", href: "/services/turf-deodorizing" },
      { label: "Turf Repair & Maintenance", href: "/services/turf-repair" },
      { label: "Commercial Turf Cleaning", href: "/services/commercial-turf-cleaning" },
      { label: "Anti-Bacterial Treatment", href: "/services/turf-sanitization" },
    ],
  },
  {
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Los Angeles", href: "/locations/los-angeles" },
      { label: "Murrieta", href: "/locations/murrieta" },
      { label: "Martinez / Bay Area", href: "/locations/martinez" },
      { label: "Sacramento", href: "/locations/sacramento" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavGroup[] = [
  {
    title: "Services",
    links: [
      { label: "Deep Cleaning & Sanitization", href: "/services/turf-cleaning" },
      { label: "Pet Odor & Stain Removal", href: "/services/pet-odor-treatment" },
      { label: "Turf Deodorizing", href: "/services/turf-deodorizing" },
      { label: "Turf Repair & Maintenance", href: "/services/turf-repair" },
      { label: "Commercial Turf Cleaning", href: "/services/commercial-turf-cleaning" },
      { label: "Anti-Bacterial Treatment", href: "/services/turf-sanitization" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Los Angeles", href: "/locations/los-angeles" },
      { label: "Murrieta", href: "/locations/murrieta" },
      { label: "Martinez / Bay Area", href: "/locations/martinez" },
      { label: "Sacramento", href: "/locations/sacramento" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const ctaText = "Get Free Quote";
export const ctaHref = "/contact";
