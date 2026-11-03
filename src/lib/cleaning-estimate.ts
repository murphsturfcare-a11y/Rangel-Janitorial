/** Client-safe choices, validation and public results. Pricing policy stays in Netlify functions. */
export const CLEANING_INDUSTRIES = [
  { id: 'Office', label: 'Office' },
  { id: 'Dealership', label: 'Dealership' },
  { id: 'Industrial', label: 'Industrial' },
  { id: 'Restaurant', label: 'Restaurant' },
  { id: 'Large Office [10-15]', label: 'Large Office [10-15]' },
  { id: 'Large Office [15-20]', label: 'Large Office [15-20]' },
] as const;

export const CLEANING_TASKS = [
  { id: 'entrance-door', label: 'Main Entrance Door' },
  { id: 'door-handles', label: 'All Door Handles' },
  { id: 'spot-wash-walls', label: 'Spot Wash Walls' },
  { id: 'spot-wash-glass', label: 'Spot Wash Glass (Mirror, Window)' },
  { id: 'stairs-rail', label: 'Clean Stairs & Rail' },
  { id: 'sanitize-desks', label: "Sanitize Desks (Don't Move Items)" },
  { id: 'sanitize-fixtures-appliances', label: 'Sanitize Fixtures & Appliances' },
  { id: 'sanitize-phones-keyboards-monitors', label: 'Sanitize Phones Keyboards Monitors' },
  { id: 'vacuum-walk-off-mats', label: 'Vacuum Walk-Off Mats (If Dry)' },
  { id: 'high-dusting', label: 'High Dusting (10 FT)' },
  { id: 'chairs-legs', label: 'Wipe Chairs & Legs' },
  { id: 'cabinets', label: 'Wipe Cabinets (Office/Kitchen)' },
  { id: 'baseboards', label: 'Wipe Baseboards' },
  { id: 'low-dusting', label: 'Low Dusting Areas' },
] as const;

export const CLEANING_PACKAGES = [
  { id: 'standard', label: 'Standard Clean' },
  { id: 'detailed', label: 'Detailed Clean' },
  { id: 'platinum', label: 'Platinum Clean' },
] as const;

export const cleaningIndustries = CLEANING_INDUSTRIES;
export const cleaningTasks = CLEANING_TASKS;
export const cleaningPackages = CLEANING_PACKAGES;

export type CleaningIndustry = (typeof CLEANING_INDUSTRIES)[number]['id'];
export type CleaningTaskId = (typeof CLEANING_TASKS)[number]['id'];
export type CleaningPackage = (typeof CLEANING_PACKAGES)[number]['id'];
export type CleaningDaysPerWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface CleaningEstimateInput {
  industry: CleaningIndustry;
  daysPerWeek: CleaningDaysPerWeek;
  squareFootage: number;
  tasks: CleaningTaskId[];
  package: CleaningPackage;
}

export interface CleaningPackageEstimate {
  costPerVisit: number;
  monthlyCost: number;
}

export interface CleaningEstimate {
  hoursPerVisit: number;
  visitsPerMonth: number;
  packages: Record<CleaningPackage, CleaningPackageEstimate>;
}

export const MIN_CLEANING_SQUARE_FOOTAGE = 1;
export const MAX_CLEANING_SQUARE_FOOTAGE = 1_000_000;

/** The endpoint returns customer-facing totals only, never the internal pricing policy. */
export type CleaningEstimateResponse =
  | { success: true; estimate: CleaningEstimate; pricingVersion: string }
  | { success: false; message: string };

export type CleaningEstimateInputResult =
  | { success: true; data: CleaningEstimateInput }
  | { success: false; error: string };

/** Validate untrusted inputs and retain only fields used to recompute the estimate. */
export function normalizeCleaningEstimateInput(value: unknown): CleaningEstimateInputResult {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { success: false, error: 'Please provide your cleaning estimate details.' };
  }
  const record = value as Record<string, unknown>;
  const industry = CLEANING_INDUSTRIES.find(choice => choice.id === record.industry);
  if (!industry) return { success: false, error: 'Please select a supported industry.' };

  const daysPerWeek = record.daysPerWeek;
  if (typeof daysPerWeek !== 'number' || !Number.isInteger(daysPerWeek) || daysPerWeek < 1 || daysPerWeek > 7) {
    return { success: false, error: 'Please choose between 1 and 7 cleaning days per week.' };
  }

  const squareFootage = record.squareFootage;
  if (typeof squareFootage !== 'number' || !Number.isFinite(squareFootage)
    || squareFootage < MIN_CLEANING_SQUARE_FOOTAGE || squareFootage > MAX_CLEANING_SQUARE_FOOTAGE) {
    return { success: false, error: 'Please enter square footage between 1 and 1,000,000.' };
  }

  const tasks = record.tasks;
  if (!Array.isArray(tasks) || tasks.length > CLEANING_TASKS.length
    || tasks.some(task => typeof task !== 'string' || !CLEANING_TASKS.some(choice => choice.id === task))
    || new Set(tasks).size !== tasks.length) {
    return { success: false, error: 'Please select each supported cleaning task at most once.' };
  }

  const cleaningPackage = CLEANING_PACKAGES.find(choice => choice.id === record.package);
  if (!cleaningPackage) return { success: false, error: 'Please select a supported cleaning package.' };

  return {
    success: true,
    data: {
      industry: industry.id,
      daysPerWeek: daysPerWeek as CleaningDaysPerWeek,
      squareFootage,
      tasks: CLEANING_TASKS.filter(choice => tasks.includes(choice.id)).map(choice => choice.id),
      package: cleaningPackage.id,
    },
  };
}
