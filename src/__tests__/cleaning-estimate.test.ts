import { describe, expect, it } from 'vitest';
import {
  CLEANING_TASKS,
  calculateCleaningEstimate,
  normalizeCleaningEstimateInput,
  type CleaningEstimateInput,
} from '@/lib/cleaning-estimate';

const defaultInput: CleaningEstimateInput = {
  industry: 'Office', daysPerWeek: 5, squareFootage: 10000, tasks: [], package: 'standard',
};

describe('cleaning calculator pricing', () => {
  it('reproduces the supplied default office example for all packages', () => {
    expect(calculateCleaningEstimate(defaultInput)).toEqual({
      baseHourlyRate: 45,
      industryHourlyRate: 45,
      hoursPerVisit: 4,
      visitsPerMonth: 22,
      packages: {
        standard: { hourlyRate: 45, costPerVisit: 180, monthlyCost: 3960 },
        detailed: { hourlyRate: 50, costPerVisit: 200, monthlyCost: 4400 },
        platinum: { hourlyRate: 55, costPerVisit: 220, monthlyCost: 4840 },
      },
    });
  });

  it.each([
    [1, 8, 4.3, 1548],
    [2, 5, 9, 2025],
    [3, 5, 13, 2925],
    [4, 5, 17, 3825],
    [5, 4, 22, 3960],
    [6, 4, 26, 4680],
    [7, 4, 30.5, 5490],
  ] as const)('preserves frequency %i productivity and monthly visits', (daysPerWeek, hours, visits, monthly) => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, daysPerWeek });
    expect(estimate.hoursPerVisit).toBe(hours);
    expect(estimate.visitsPerMonth).toBe(visits);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(monthly, 8);
  });

  it.each([
    ['Office', 45], ['Dealership', 52.65], ['Industrial', 46.8],
    ['Restaurant', 49.05], ['Large Office [10-15]', 50.4], ['Large Office [15-20]', 50.4],
  ] as const)('applies the %s industry rate before the flat package premium', (industry, rate) => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, industry });
    expect(estimate.packages.standard.hourlyRate).toBeCloseTo(rate, 8);
    expect(estimate.packages.detailed.hourlyRate).toBeCloseTo(rate + 5, 8);
    expect(estimate.packages.platinum.hourlyRate).toBeCloseTo(rate + 10, 8);
  });

  it('adds the original 0.167 hours per checked task to every tier', () => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, tasks: ['entrance-door', 'baseboards'] });
    expect(estimate.hoursPerVisit).toBeCloseTo(4.334, 8);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(195.03, 8);
    expect(estimate.packages.detailed.costPerVisit).toBeCloseTo(216.7, 8);
    expect(estimate.packages.platinum.costPerVisit).toBeCloseTo(238.37, 8);
  });

  it('keeps visit precision when computing the monthly cost', () => {
    const estimate = calculateCleaningEstimate({ ...defaultInput, tasks: ['entrance-door'] });
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(187.515, 8);
    expect(estimate.packages.standard.monthlyCost).toBeCloseTo(4125.33, 8);
    expect(estimate.packages.standard.monthlyCost).not.toBe(187.52 * 22);
  });

  it('includes all fourteen source tasks without adding package-specific work', () => {
    expect(CLEANING_TASKS).toHaveLength(14);
    const tasks = CLEANING_TASKS.map(task => task.id);
    const estimate = calculateCleaningEstimate({ ...defaultInput, tasks, package: 'platinum' });
    expect(estimate.hoursPerVisit).toBeCloseTo(6.338, 8);
    expect(estimate.packages.standard.costPerVisit).toBeCloseTo(285.21, 8);
  });
});

describe('untrusted cleaning estimate inputs', () => {
  it('retains only validated inputs and ignores client-supplied prices', () => {
    const result = normalizeCleaningEstimateInput({
      ...defaultInput, tasks: ['baseboards', 'entrance-door'],
      hourlyRate: 0.01, costPerVisit: 1, monthlyCost: 1,
      packages: { standard: { monthlyCost: 1 } },
    });
    expect(result).toEqual({
      success: true,
      data: { ...defaultInput, tasks: ['entrance-door', 'baseboards'] },
    });
    if (result.success) {
      expect(calculateCleaningEstimate(result.data).packages.standard.monthlyCost).toBeCloseTo(4290.66, 8);
    }
  });

  it.each([null, undefined, [], 'Office', 4, true])('rejects a non-object submission: %j', value => {
    expect(normalizeCleaningEstimateInput(value).success).toBe(false);
  });

  it.each([
    { industry: 'Hospital' }, { industry: null }, { industry: '<script>alert(1)</script>' },
    { daysPerWeek: 0 }, { daysPerWeek: 8 }, { daysPerWeek: 2.5 }, { daysPerWeek: '5' }, { daysPerWeek: NaN },
    { squareFootage: 0 }, { squareFootage: -1 }, { squareFootage: 1_000_001 },
    { squareFootage: Infinity }, { squareFootage: -Infinity }, { squareFootage: NaN },
    { squareFootage: '10000' }, { squareFootage: null },
    { tasks: ['entrance-door', 'entrance-door'] }, { tasks: ['unknown'] },
    { tasks: [1] }, { tasks: null }, { tasks: 'entrance-door' },
    { package: 'enterprise' }, { package: null },
  ])('rejects unsupported or malformed selections: %j', override => {
    expect(normalizeCleaningEstimateInput({ ...defaultInput, ...override }).success).toBe(false);
  });

  it.each([1, 1_000_000, 1000.5])('accepts finite footage within the bound: %s', squareFootage => {
    expect(normalizeCleaningEstimateInput({ ...defaultInput, squareFootage })).toEqual({
      success: true, data: { ...defaultInput, squareFootage },
    });
  });

  it('rejects missing selections instead of silently pricing a different service', () => {
    for (const field of ['industry', 'daysPerWeek', 'squareFootage', 'tasks', 'package'] as const) {
      const incomplete: Partial<CleaningEstimateInput> = { ...defaultInput };
      delete incomplete[field];
      expect(normalizeCleaningEstimateInput(incomplete).success).toBe(false);
    }
  });
});
