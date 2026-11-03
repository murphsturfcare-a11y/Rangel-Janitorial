/** Server-only pricing policy. Do not import this module from src/ application code. */
import { createHash } from 'node:crypto';
import type { CleaningDaysPerWeek, CleaningEstimate, CleaningEstimateInput, CleaningIndustry, CleaningPackage } from '../../src/lib/cleaning-estimate';

export type PricingEnvironment = (name: string) => string | undefined;

export interface CleaningPricingPolicy {
  baseHourlyRate: number;
  industryMarkups: Record<CleaningIndustry, number>;
  packageHourlyPremiums: Record<CleaningPackage, number>;
  hoursPerAdditionalTask: number;
  squareFeetPerHour: Record<CleaningDaysPerWeek, number>;
  visitsPerMonth: Record<CleaningDaysPerWeek, number>;
  expenses: {
    payrollTaxInsuranceRate: number;
    overheadRate: number;
    profitMarkupRate: number;
    miscMonthlyCost: number;
  };
}

export class PricingConfigurationError extends Error {
  constructor() { super('Cleaning estimates are temporarily unavailable.'); }
}

function setting(env: PricingEnvironment, name: string, maximum: number, fallback?: number, minimum = 0): number {
  const raw = env(name);
  if (raw === undefined && fallback !== undefined) return fallback;
  if (typeof raw !== 'string' || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw.trim())) throw new PricingConfigurationError();
  const value = Number(raw.trim());
  if (!Number.isFinite(value) || value < minimum || value > maximum) throw new PricingConfigurationError();
  return value;
}

/** The selected selling rate includes expenses. Optional private overrides add costs;
 * absent overrides add nothing, while explicitly invalid overrides still fail closed. */
export function readCleaningPricingPolicy(env: PricingEnvironment): CleaningPricingPolicy {
  const percent = (name: string, fallback?: number) => setting(env, name, 1000, fallback) / 100;
  return {
    baseHourlyRate: setting(env, 'CLEANING_BASE_HOURLY_RATE', 10_000, 72, 0.01),
    industryMarkups: {
      Office: percent('CLEANING_OFFICE_MARKUP_PERCENT', 10),
      Dealership: percent('CLEANING_DEALERSHIP_MARKUP_PERCENT', 17),
      Industrial: percent('CLEANING_INDUSTRIAL_MARKUP_PERCENT', 4),
      Restaurant: percent('CLEANING_RESTAURANT_MARKUP_PERCENT', 9),
      'Large Office [10-15]': percent('CLEANING_LARGE_OFFICE_10_15_MARKUP_PERCENT', 12),
      'Large Office [15-20]': percent('CLEANING_LARGE_OFFICE_15_20_MARKUP_PERCENT', 12),
    },
    packageHourlyPremiums: {
      standard: 0,
      detailed: setting(env, 'CLEANING_DETAILED_HOURLY_PREMIUM', 10_000, 5),
      platinum: setting(env, 'CLEANING_PLATINUM_HOURLY_PREMIUM', 10_000, 10),
    },
    hoursPerAdditionalTask: 0.167,
    squareFeetPerHour: { 1: 1250, 2: 2000, 3: 2000, 4: 2000, 5: 2500, 6: 2500, 7: 2500 },
    visitsPerMonth: { 1: 4.3, 2: 9, 3: 13, 4: 17, 5: 22, 6: 26, 7: 30.5 },
    expenses: {
      payrollTaxInsuranceRate: percent('CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT', 0),
      overheadRate: percent('CALCULATOR_OVERHEAD_PERCENT', 0),
      profitMarkupRate: percent('CALCULATOR_PROFIT_MARKUP_PERCENT', 0),
      miscMonthlyCost: setting(env, 'CALCULATOR_MISC_MONTHLY_COST', 10_000_000, 0),
    },
  };
}

/** Internal cost math is kept separate from the customer-facing estimate result. */
export function calculateMonthlyCleaningCost(monthlyHours: number, policy: CleaningPricingPolicy): number {
  const loadedLabor = monthlyHours * policy.baseHourlyRate * (1 + policy.expenses.payrollTaxInsuranceRate);
  const costBasis = loadedLabor + policy.expenses.miscMonthlyCost;
  return costBasis * (1 + policy.expenses.overheadRate + policy.expenses.profitMarkupRate);
}

/** Recompute every package from validated inputs; round only when displaying the result. */
export function calculateCleaningEstimate(input: CleaningEstimateInput, policy: CleaningPricingPolicy): CleaningEstimate {
  const hoursPerVisit = input.squareFootage / policy.squareFeetPerHour[input.daysPerWeek]
    + input.tasks.length * policy.hoursPerAdditionalTask;
  const visitsPerMonth = policy.visitsPerMonth[input.daysPerWeek];
  const monthlyHours = hoursPerVisit * visitsPerMonth;
  const monthlyBase = calculateMonthlyCleaningCost(monthlyHours, policy) * (1 + policy.industryMarkups[input.industry]);
  const estimateForPackage = (cleaningPackage: CleaningPackage) => {
    const monthlyCost = monthlyBase + monthlyHours * policy.packageHourlyPremiums[cleaningPackage];
    return { costPerVisit: monthlyCost / visitsPerMonth, monthlyCost };
  };
  return {
    hoursPerVisit,
    visitsPerMonth,
    packages: {
      standard: estimateForPackage('standard'),
      detailed: estimateForPackage('detailed'),
      platinum: estimateForPackage('platinum'),
    },
  };
}

/** An opaque policy revision binds a preview to the same pricing used at submission. */
export function getCleaningPricingVersion(policy: CleaningPricingPolicy): string {
  return 'calc-v2-' + createHash('sha256').update(JSON.stringify({ algorithm: 2, policy })).digest('hex').slice(0, 24);
}
