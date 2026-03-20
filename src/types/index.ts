export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  propertyAddress?: string;
  message?: string;
  sourceUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type ServiceType =
  | 'lawn-mowing'
  | 'fertilization'
  | 'weed-control'
  | 'aeration'
  | 'overseeding'
  | 'leaf-removal'
  | 'spring-cleanup'
  | 'fall-cleanup'
  | 'lawn-installation'
  | 'other';

export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ValidationErrors {
  valid: boolean;
  errors: Record<string, string>;
}

export interface RateLimitInfo {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  location?: string;
}

// ---------------------------------------------------------------------------
// Seed Data Types (used by src/data/ files)
// ---------------------------------------------------------------------------

export interface ServiceFAQ {
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
  faqs: ServiceFAQ[];
}

export interface Location {
  slug: string;
  name: string;
  state: string;
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
