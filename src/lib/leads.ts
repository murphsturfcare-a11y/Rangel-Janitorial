/** Shared form choices and limits; routing and credentials stay on the server. */
export const facilityOptions = [
  'Office Building', 'Medical / Dental', 'Industrial / Warehouse',
  'Multi-Unit Property', 'Fitness Center', 'Government / Municipality',
  'Homeowners Association', 'Shopping Center', 'School / Educational', 'Other',
] as const;

export const frequencyOptions = [
  'Daily (5x/week)', '3x per week', 'Weekly', 'Bi-Weekly', 'Monthly',
  'One-Time Deep Clean', 'Not Sure',
] as const;

export const referralOptions = [
  'Google Search', 'Referral', 'Social Media', 'Yelp', 'Drove By', 'Other',
] as const;

export const leadLimits = { name: 100, phone: 40, email: 254, message: 2000 } as const;
export const submissionIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export type FormPlacement = 'hero' | 'bottom';

export interface LeadResult {
  success: boolean;
  outcome: 'accepted' | 'rejected' | 'unknown';
  code: string;
  message: string;
  submissionId: string;
  retryAllowed: boolean;
}
