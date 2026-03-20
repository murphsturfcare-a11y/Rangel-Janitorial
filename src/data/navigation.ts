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
      { label: "Denver", href: "/locations/denver" },
      { label: "Colorado Springs", href: "/locations/colorado-springs" },
      { label: "Aurora", href: "/locations/aurora" },
      { label: "Lakewood", href: "/locations/lakewood" },
      { label: "Boulder", href: "/locations/boulder" },
      { label: "Fort Collins", href: "/locations/fort-collins" },
    ],
  },
  { label: "About", href: "/about" },
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
      { label: "Denver", href: "/locations/denver" },
      { label: "Colorado Springs", href: "/locations/colorado-springs" },
      { label: "Aurora", href: "/locations/aurora" },
      { label: "Lakewood", href: "/locations/lakewood" },
      { label: "Boulder", href: "/locations/boulder" },
      { label: "Fort Collins", href: "/locations/fort-collins" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const ctaText = "Get Free Quote";
export const ctaHref = "/contact";
