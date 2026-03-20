export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  whatIncludes: string[];
  startingPrice: number;
  iconName: string;
  metaTitle: string;
  metaDescription: string;
  faqs: FAQ[];
}

export interface Neighborhood {
  name: string;
}

export interface Location {
  slug: string;
  name: string;
  state: "CO";
  description: string;
  serviceAreaDescription: string;
  neighborhoods: string[];
  phone: string;
  address: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Testimonial {
  customerName: string;
  customerLocation: string;
  rating: number;
  reviewText: string;
  serviceType: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "pricing" | "services" | "scheduling" | "locations";
  serviceSlug?: string;
}

export interface CompanyAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessHours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

export interface CompanyValue {
  title: string;
  description: string;
}

export interface CompanyStats {
  yearsInBusiness: number;
  customersServed: string;
  satisfactionRate: string;
  projectsCompleted: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  google: string;
  yelp: string;
}

export interface Company {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: CompanyAddress;
  businessHours: BusinessHours;
  founded: number;
  description: string;
  mission: string;
  values: CompanyValue[];
  stats: CompanyStats;
  socialMedia: SocialMedia;
  certifications: string[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  links: NavItem[];
}
