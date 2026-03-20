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
