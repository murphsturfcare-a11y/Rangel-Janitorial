import { describe, expect, it } from 'vitest';
import {
  normalizeCleaningEstimateInput,
  type CleaningEstimateInput,
} from '@/lib/cleaning-estimate';

const defaultInput: CleaningEstimateInput = {
  industry: 'Office', daysPerWeek: 5, squareFootage: 10000, tasks: [], package: 'standard',
};

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
