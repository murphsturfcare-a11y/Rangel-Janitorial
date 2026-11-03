/** Shared browser/server pricing model, preserving the supplied calculator's formula. */
export const CLEANING_INDUSTRIES = [
  { id: 'Office', label: 'Office', multiplier: 0 },
  { id: 'Dealership', label: 'Dealership', multiplier: 0.17 },
  { id: 'Industrial', label: 'Industrial', multiplier: 0.04 },
  { id: 'Restaurant', label: 'Restaurant', multiplier: 0.09 },
  { id: 'Large Office [10-15]', label: 'Large Office [10-15]', multiplier: 0.12 },
  { id: 'Large Office [15-20]', label: 'Large Office [15-20]', multiplier: 0.12 },
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
  { id: 'standard', label: 'Standard Clean', hourlyPremium: 0 },
  { id: 'detailed', label: 'Detailed Clean', hourlyPremium: 5 },
  { id: 'platinum', label: 'Platinum Clean', hourlyPremium: 10 },
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
  hourlyRate: number;
  costPerVisit: number;
  monthlyCost: number;
}

export interface CleaningEstimate {
  baseHourlyRate: number;
  industryHourlyRate: number;
  hoursPerVisit: number;
  visitsPerMonth: number;
  packages: Record<CleaningPackage, CleaningPackageEstimate>;
}

export const MIN_CLEANING_SQUARE_FOOTAGE = 1;
export const MAX_CLEANING_SQUARE_FOOTAGE = 1_000_000;

const BASE_HOURLY_RATE = 45;
const HOURS_PER_ADDITIONAL_TASK = 0.167;
const SQUARE_FEET_PER_HOUR: Record<CleaningDaysPerWeek, number> = {
  1: 1250, 2: 2000, 3: 2000, 4: 2000, 5: 2500, 6: 2500, 7: 2500,
};
const VISITS_PER_MONTH: Record<CleaningDaysPerWeek, number> = {
  1: 4.3, 2: 9, 3: 13, 4: 17, 5: 22, 6: 26, 7: 30.5,
};

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

/** Round only for display; the original monthly formula uses the unrounded visit cost. */
export function calculateCleaningEstimate(input: CleaningEstimateInput): CleaningEstimate {
  const industry = CLEANING_INDUSTRIES.find(choice => choice.id === input.industry)!;
  const industryHourlyRate = BASE_HOURLY_RATE * (1 + industry.multiplier);
  const hoursPerVisit = input.squareFootage / SQUARE_FEET_PER_HOUR[input.daysPerWeek]
    + input.tasks.length * HOURS_PER_ADDITIONAL_TASK;
  const visitsPerMonth = VISITS_PER_MONTH[input.daysPerWeek];
  const estimateForPackage = (hourlyPremium: number): CleaningPackageEstimate => {
    const hourlyRate = industryHourlyRate + hourlyPremium;
    const costPerVisit = hourlyRate * hoursPerVisit;
    return { hourlyRate, costPerVisit, monthlyCost: costPerVisit * visitsPerMonth };
  };

  return {
    baseHourlyRate: BASE_HOURLY_RATE,
    industryHourlyRate,
    hoursPerVisit,
    visitsPerMonth,
    packages: {
      standard: estimateForPackage(0),
      detailed: estimateForPackage(5),
      platinum: estimateForPackage(10),
    },
  };
}
