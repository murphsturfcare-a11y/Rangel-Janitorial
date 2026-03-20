// ============================================================
// Murphy's Turf — TypeScript Type Definitions
// Professional turf cleaning and lawn care, Colorado Front Range
// ============================================================

// ── Shared primitives ────────────────────────────────────────

export type ISODateString = string; // e.g. "2026-03-20T14:00:00Z"

// ── Lead ─────────────────────────────────────────────────────

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "booked"
  | "completed"
  | "lost";

export type LeadSource =
  | "website_form"
  | "google"
  | "yelp"
  | "referral"
  | "nextdoor"
  | "facebook"
  | "instagram"
  | "other";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_interested_in: string; // matches Service.slug
  message: string;
  source: LeadSource;
  status: LeadStatus;
  zip_code?: string;
  preferred_contact_method?: "email" | "phone" | "text";
  preferred_contact_time?: "morning" | "afternoon" | "evening" | "anytime";
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ── Contact ───────────────────────────────────────────────────

export interface ContactAddress {
  street?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  address: ContactAddress;
}

// ── Service ───────────────────────────────────────────────────

export type ServiceCategory =
  | "turf_cleaning"
  | "lawn_care"
  | "fertilization"
  | "weed_control"
  | "aeration"
  | "overseeding"
  | "seasonal"
  | "commercial"
  | "residential";

export type PriceUnit = "per_visit" | "per_sqft" | "per_month" | "custom";

export interface PriceRange {
  min: number;
  max: number;
  unit: PriceUnit;
  display_label?: string; // e.g. "Starting at $49"
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price_range: PriceRange;
  image_url: string;
  thumbnail_url?: string;
  features: string[];
  category: ServiceCategory;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: ISODateString;
  updated_at: ISODateString;
}

// ── Location ──────────────────────────────────────────────────

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  coordinates: Coordinates;
  zip_codes: string[];
  county?: string;
  state: string;
  image_url?: string;
  is_active: boolean;
  sort_order?: number;
}

// ── Testimonial ───────────────────────────────────────────────

export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export interface Testimonial {
  id: string;
  author_name: string;
  author_location: string; // e.g. "Fort Collins, CO"
  rating: TestimonialRating;
  content: string;
  service_type?: string; // matches Service.slug
  source?: "google" | "yelp" | "facebook" | "nextdoor" | "direct";
  is_featured: boolean;
  is_verified: boolean;
  created_at: ISODateString;
}

// ── FAQ ───────────────────────────────────────────────────────

export type FAQCategory =
  | "general"
  | "pricing"
  | "services"
  | "scheduling"
  | "turf_care"
  | "lawn_care"
  | "commercial"
  | "seasonal";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  sort_order: number;
  is_active: boolean;
  related_service_slug?: string;
}

// ── NewsletterSubscriber ──────────────────────────────────────

export interface NewsletterSubscriber {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  subscribed_at: ISODateString;
  is_active: boolean;
  source?: LeadSource;
  tags?: string[];
}

// ── Company ───────────────────────────────────────────────────

export interface BusinessHoursDay {
  open: string;  // 24-hr "08:00"
  close: string; // 24-hr "17:00"
  closed: boolean;
}

export interface BusinessHours {
  monday: BusinessHoursDay;
  tuesday: BusinessHoursDay;
  wednesday: BusinessHoursDay;
  thursday: BusinessHoursDay;
  friday: BusinessHoursDay;
  saturday: BusinessHoursDay;
  sunday: BusinessHoursDay;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  nextdoor?: string;
  google_business?: string;
  yelp?: string;
  linkedin?: string;
}

export interface Company {
  name: string;
  legal_name?: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: ContactAddress;
  service_area: string; // human-readable, e.g. "Colorado Front Range"
  hours: BusinessHours;
  social_links: SocialLinks;
  logo_url: string;
  favicon_url?: string;
  license_number?: string;
  insurance_info?: string;
  founding_year?: number;
}

// ── SEOMetadata ───────────────────────────────────────────────

export interface OpenGraphData {
  title: string;
  description: string;
  image_url: string;
  image_alt?: string;
  type?: "website" | "article" | "profile";
  url?: string;
}

export interface TwitterCardData {
  card: "summary" | "summary_large_image" | "app" | "player";
  title: string;
  description: string;
  image_url?: string;
  image_alt?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  robots?: string; // e.g. "index, follow"
  og?: OpenGraphData;
  twitter?: TwitterCardData;
  schema_markup?: Record<string, unknown>; // JSON-LD structured data
  alternate_langs?: Record<string, string>; // locale -> URL
}

// ── NavItem ───────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  description?: string; // used in mega-menu / dropdown subtext
  icon?: string;        // icon name or URL
  is_external?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}
