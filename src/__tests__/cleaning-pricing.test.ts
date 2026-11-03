import { describe, expect, it } from 'vitest';
import { CLEANING_TASKS, type CleaningEstimateInput } from '@/lib/cleaning-estimate';
import { calculateCleaningEstimate, calculateMonthlyCleaningCost, getCleaningPricingVersion, PricingConfigurationError, readCleaningPricingPolicy } from '../../netlify/lib/cleaning-pricing';

const expenseEnv: Record<string, string> = {
  CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '0',
  CALCULATOR_OVERHEAD_PERCENT: '0',
  CALCULATOR_PROFIT_MARKUP_PERCENT: '0',
  CALCULATOR_MISC_MONTHLY_COST: '0',
};
const policyFor = (values: Record<string, string> = {}) => readCleaningPricingPolicy(name => ({ ...expenseEnv, CLEANING_BASE_HOURLY_RATE: '45', CLEANING_OFFICE_MARKUP_PERCENT: '0', ...values })[name]);
const defaultInput: CleaningEstimateInput = {
  industry: 'Office', daysPerWeek: 5, squareFootage: 10000, tasks: [], package: 'standard',
};

describe('server-only cleaning pricing', () => {
  it('preserves the original baseline with explicitly configured zero expenses', () => {
    expect(calculateCleaningEstimate(defaultInput, policyFor())).toEqual({
      hoursPerVisit: 4,
      visitsPerMonth: 22,
      packages: {
        standard: { costPerVisit: 180, monthlyCost: 3960 },
        detailed: { costPerVisit: 200, monthlyCost: 4400 },
        platinum: { costPerVisit: 220, monthlyCost: 4840 },
      },
    });
  });

  it.each([
    [1, 8, 4.3, 1548], [2, 5, 9, 2025], [3, 5, 13, 2925],
    [4, 5, 17, 3825], [5, 4, 22, 3960], [6, 4, 26, 4680], [7, 4, 30.5, 5490],
  ] as const)('preserves frequency %i productivity and monthly visits', (daysPerWeek, hours, visits, monthly) => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, daysPerWeek }, policyFor());
    expect(estimate.hoursPerVisit).toBe(hours);
    expect(estimate.visitsPerMonth).toBe(visits);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(monthly, 8);
  });

  it.each([
    ['Office', 45], ['Dealership', 52.65], ['Industrial', 46.8],
    ['Restaurant', 49.05], ['Large Office [10-15]', 50.4], ['Large Office [15-20]', 50.4],
  ] as const)('preserves %s markup and flat customer package premiums', (industry, hourlyRate) => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, industry }, policyFor());
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(4 * hourlyRate, 8);
    expect(estimate.packages.detailed.costPerVisit).toBeCloseTo(4 * (hourlyRate + 5), 8);
    expect(estimate.packages.platinum.costPerVisit).toBeCloseTo(4 * (hourlyRate + 10), 8);
  });

  it('reproduces the supplied expense example without changing the existing visit lookup', () => {
    const policy = policyFor({
      CLEANING_BASE_HOURLY_RATE: '20',
      CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '25',
      CALCULATOR_OVERHEAD_PERCENT: '26',
      CALCULATOR_PROFIT_MARKUP_PERCENT: '30',
    });
    // The reference screenshot supplies 2 days * 2 hours * 52 / 12.
    expect(calculateMonthlyCleaningCost(2 * 2 * 52 / 12, policy)).toBeCloseTo(676, 8);
    // The website deliberately retains its existing 9-visits/month lookup for 2 days/week.
    expect(calculateCleaningEstimate({ ...defaultInput, daysPerWeek: 2, squareFootage: 4000 }, policy).packages.standard.monthlyCost).toBeCloseTo(702, 8);
  });

  it('prices the confirmed $72 base and 10% regular Office policy without adding expense multipliers', () => {
    const policy = readCleaningPricingPolicy(name => expenseEnv[name]);
    const estimate = calculateCleaningEstimate(defaultInput, policy);
    expect(estimate.hoursPerVisit).toBe(4);
    expect(estimate.visitsPerMonth).toBe(22);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(316.8, 8);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(6969.6, 8);
    expect(estimate.packages.detailed.costPerVisit).toBeCloseTo(336.8, 8);
    expect(estimate.packages.detailed.monthlyCost).toBeCloseTo(7409.6, 8);
    expect(estimate.packages.platinum.costPerVisit).toBeCloseTo(356.8, 8);
    expect(estimate.packages.platinum.monthlyCost).toBeCloseTo(7849.6, 8);
  });

  it.each([
    [1, 1.6, 4.3, 126.72, 544.896],
    [2, 1, 9, 79.2, 712.8],
    [3, 1, 13, 79.2, 1029.6],
    [4, 1, 17, 79.2, 1346.4],
    [5, 0.8, 22, 63.36, 1393.92],
    [6, 0.8, 26, 63.36, 1647.36],
    [7, 0.8, 30.5, 63.36, 1932.48],
  ] as const)('prices a 2,000-sq-ft regular Office at %i days/week using the confirmed policy', (daysPerWeek, hours, visits, costPerVisit, monthlyCost) => {
    const policy = readCleaningPricingPolicy(name => expenseEnv[name]);
    const estimate = calculateCleaningEstimate({ ...defaultInput, squareFootage: 2000, daysPerWeek }, policy);
    expect(estimate.hoursPerVisit).toBeCloseTo(hours, 8);
    expect(estimate.visitsPerMonth).toBe(visits);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(costPerVisit, 8);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(monthlyCost, 8);
  });

  it.each(['Large Office [10-15]', 'Large Office [15-20]'] as const)('retains 12% markup for %s with the confirmed $72 base', industry => {
    const policy = readCleaningPricingPolicy(name => expenseEnv[name]);
    const estimate = calculateCleaningEstimate({ ...defaultInput, industry }, policy);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(322.56, 8);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(7096.32, 8);
  });

  it('adds customer package premiums after expense and industry adjustments', () => {
    const policy = policyFor({
      CLEANING_BASE_HOURLY_RATE: '60', CLEANING_OFFICE_MARKUP_PERCENT: '10',
      CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: '25', CALCULATOR_OVERHEAD_PERCENT: '26',
      CALCULATOR_PROFIT_MARKUP_PERCENT: '30',
    });
    const estimate = calculateCleaningEstimate({ ...defaultInput, daysPerWeek: 2, squareFootage: 2000 }, policy);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(128.7, 8);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(1158.3, 8);
    expect(estimate.packages.detailed.costPerVisit).toBeCloseTo(133.7, 8);
    expect(estimate.packages.platinum.costPerVisit).toBeCloseTo(138.7, 8);
  });

  it('distributes a monthly miscellaneous expense once across visits', () => {
    const policy = policyFor({ CALCULATOR_MISC_MONTHLY_COST: '100' });
    expect(calculateCleaningEstimate(defaultInput, policy).packages.standard.monthlyCost).toBeCloseTo(4060, 8);
    const twiceWeekly = calculateCleaningEstimate({ ...defaultInput, daysPerWeek: 2 }, policy);
    expect(twiceWeekly.packages.standard.monthlyCost).toBeCloseTo(2125, 8);
    expect(twiceWeekly.packages.standard.costPerVisit).toBeCloseTo(2125 / 9, 8);
  });

  it('uses the same package configuration for all premiums, without duplicate hardcoded calculation values', () => {
    const policy = policyFor({ CLEANING_DETAILED_HOURLY_PREMIUM: '8', CLEANING_PLATINUM_HOURLY_PREMIUM: '12' });
    const estimate = calculateCleaningEstimate(defaultInput, policy);
    expect(estimate.packages.detailed.costPerVisit).toBe(212);
    expect(estimate.packages.platinum.costPerVisit).toBe(228);
  });

  it('adds the source task duration to every package and retains unrounded visit precision', () => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, tasks: ['entrance-door'] }, policyFor());
    expect(estimate.hoursPerVisit).toBeCloseTo(4.167, 8);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(187.515, 8);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(4125.33, 8);
    expect(estimate.packages.standard.monthlyCost).not.toBe(187.52 * 22);
    const allTasks = calculateCleaningEstimate({ ...defaultInput, tasks: CLEANING_TASKS.map(task => task.id) }, policyFor());
    expect(allTasks.hoursPerVisit).toBeCloseTo(6.338, 8);
  });
});

describe('private pricing configuration boundary', () => {
  it('defaults to the confirmed inclusive policy when all private settings are absent', () => {
    const policy = readCleaningPricingPolicy(() => undefined);
    expect(policy.baseHourlyRate).toBe(72);
    expect(policy.industryMarkups.Office).toBe(0.1);
    expect(policy.industryMarkups['Large Office [10-15]']).toBe(0.12);
    expect(policy.industryMarkups['Large Office [15-20]']).toBe(0.12);
    expect(policy.expenses).toEqual({ payrollTaxInsuranceRate: 0, overheadRate: 0, profitMarkupRate: 0, miscMonthlyCost: 0 });
    expect(calculateCleaningEstimate({ ...defaultInput, squareFootage: 2000, daysPerWeek: 2 }, policy).packages.standard.monthlyCost).toBeCloseTo(712.8, 8);
    expect(getCleaningPricingVersion(policy)).toBe(getCleaningPricingVersion(readCleaningPricingPolicy(name => expenseEnv[name])));
  });

  it.each(Object.keys(expenseEnv))('treats absent optional expense setting %s as included in the selling rate', missing => {
    const policy = readCleaningPricingPolicy(name => name === missing ? undefined : expenseEnv[name]);
    expect(policy.expenses).toEqual({ payrollTaxInsuranceRate: 0, overheadRate: 0, profitMarkupRate: 0, miscMonthlyCost: 0 });
  });

  it.each(['', '-1', 'NaN', 'Infinity', '25%', '1e2', '0x10', '1001', '<script>'])('rejects invalid percentages %j', value => {
    expect(() => policyFor({ CALCULATOR_PAYROLL_TAX_INSURANCE_PERCENT: value })).toThrow(PricingConfigurationError);
  });

  it.each([
    ['CLEANING_BASE_HOURLY_RATE', '0'], ['CLEANING_BASE_HOURLY_RATE', '10001'],
    ['CLEANING_OFFICE_MARKUP_PERCENT', '-10'], ['CALCULATOR_MISC_MONTHLY_COST', '-1'],
    ['CALCULATOR_MISC_MONTHLY_COST', '10000001'], ['CLEANING_DETAILED_HOURLY_PREMIUM', 'NaN'],
  ])('rejects invalid %s=%s', (name, value) => {
    expect(() => policyFor({ [name]: value })).toThrow(PricingConfigurationError);
  });

  it('returns an opaque stable version that changes with every effective policy field', () => {
    const policy = policyFor();
    const version = getCleaningPricingVersion(policy);
    expect(version).toMatch(/^calc-v2-[a-f0-9]{24}$/);
    expect(getCleaningPricingVersion(policyFor())).toBe(version);
    for (const field of [
      'CLEANING_BASE_HOURLY_RATE', 'CLEANING_OFFICE_MARKUP_PERCENT', 'CLEANING_LARGE_OFFICE_10_15_MARKUP_PERCENT',
      'CLEANING_DETAILED_HOURLY_PREMIUM', ...Object.keys(expenseEnv),
    ]) expect(getCleaningPricingVersion(policyFor({ [field]: '77' }))).not.toBe(version);
    const changedVisits = structuredClone(policy);
    changedVisits.visitsPerMonth[2] = 8.6666666667;
    expect(getCleaningPricingVersion(changedVisits)).not.toBe(version);
  });
});
