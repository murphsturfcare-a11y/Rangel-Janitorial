import type { NavItem, NavGroup } from '../types';

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Lawn Cleaning", href: "/services/lawn-cleaning" },
      { label: "Aeration", href: "/services/aeration" },
      { label: "Seeding", href: "/services/seeding" },
      { label: "Fertilization", href: "/services/fertilization" },
      { label: "Pest Control", href: "/services/pest-control" },
      { label: "Seasonal Maintenance", href: "/services/seasonal-maintenance" },
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
      { label: "Lawn Cleaning", href: "/services/lawn-cleaning" },
      { label: "Aeration", href: "/services/aeration" },
      { label: "Seeding", href: "/services/seeding" },
      { label: "Fertilization", href: "/services/fertilization" },
      { label: "Pest Control", href: "/services/pest-control" },
      { label: "Seasonal Maintenance", href: "/services/seasonal-maintenance" },
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
