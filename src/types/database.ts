// =============================================================================
// Murphy's Turf - Supabase Database Types
// =============================================================================

// -----------------------------------------------------------------------------
// Enum Types
// -----------------------------------------------------------------------------

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export type ContactStatus = 'unread' | 'read' | 'replied';

// -----------------------------------------------------------------------------
// Row Types (matching database tables)
// -----------------------------------------------------------------------------

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_type: string | null;
  property_address: string | null;
  message: string | null;
  source_url: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactStatus;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
  is_active: boolean;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  customer_location: string | null;
  rating: number;
  review_text: string;
  service_type: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
};

export type Location = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  service_area_description: string | null;
  neighborhoods: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  benefits: string[] | null;
  what_includes: string[] | null;
  starting_price: number | null;
  icon_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  service_slug: string | null;
  location_slug: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

// -----------------------------------------------------------------------------
// Input Types (Create)
// -----------------------------------------------------------------------------

export type CreateLeadInput = {
  name: string;
  email: string;
  phone?: string | null;
  service_type?: string | null;
  property_address?: string | null;
  message?: string | null;
  source_url?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
};

export type CreateContactInput = {
  name: string;
  email: string;
  message: string;
  phone?: string | null;
  subject?: string | null;
};

export type CreateTestimonialInput = {
  customer_name: string;
  rating: number;
  review_text: string;
  customer_location?: string | null;
  service_type?: string | null;
  image_url?: string | null;
  is_featured?: boolean;
  is_published?: boolean;
};

export type CreateLocationInput = {
  name: string;
  slug: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  service_area_description?: string | null;
  neighborhoods?: string[] | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_active?: boolean;
};

export type CreateServiceInput = {
  name: string;
  slug: string;
  short_description?: string | null;
  full_description?: string | null;
  benefits?: string[] | null;
  what_includes?: string[] | null;
  starting_price?: number | null;
  icon_name?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  is_active?: boolean;
  sort_order?: number;
};

export type CreateFAQInput = {
  question: string;
  answer: string;
  category?: string | null;
  service_slug?: string | null;
  location_slug?: string | null;
  sort_order?: number;
  is_published?: boolean;
};

// -----------------------------------------------------------------------------
// Input Types (Update)
// -----------------------------------------------------------------------------

export type UpdateLeadInput = Partial<CreateLeadInput>;

export type UpdateContactInput = Partial<CreateContactInput>;

export type UpdateTestimonialInput = Partial<CreateTestimonialInput>;

export type UpdateLocationInput = Partial<CreateLocationInput>;

export type UpdateServiceInput = Partial<CreateServiceInput>;

export type UpdateFAQInput = Partial<CreateFAQInput>;

// -----------------------------------------------------------------------------
// Filter Types
// -----------------------------------------------------------------------------

export type LeadFilters = {
  status?: LeadStatus;
  search?: string;
  page?: number;
  pageSize?: number;
};

export type ContactFilters = {
  status?: ContactStatus;
  page?: number;
  pageSize?: number;
};

// -----------------------------------------------------------------------------
// Supabase Database Type (for client generics)
// -----------------------------------------------------------------------------

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: CreateLeadInput & {
          id?: string;
          status?: LeadStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Lead>;
        Relationships: [];
      };
      contacts: {
        Row: Contact;
        Insert: CreateContactInput & {
          id?: string;
          status?: ContactStatus;
          created_at?: string;
        };
        Update: Partial<Contact>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: {
          email: string;
          id?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          is_active?: boolean;
        };
        Update: Partial<NewsletterSubscriber>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: CreateTestimonialInput & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Testimonial>;
        Relationships: [];
      };
      locations: {
        Row: Location;
        Insert: CreateLocationInput & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Location>;
        Relationships: [];
      };
      services: {
        Row: Service;
        Insert: CreateServiceInput & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Service>;
        Relationships: [];
      };
      faqs: {
        Row: FAQ;
        Insert: CreateFAQInput & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<FAQ>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
