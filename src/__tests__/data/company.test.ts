import { describe, it, expect } from 'vitest';
import { company } from '@/data/company';
import business from '@/data/business.json';

describe('company facts', () => {
  it('uses the approved shared identity, headquarters and public phone', () => {
    expect(company.name).toBe(business.name);
    expect(company.email).toBe(business.email);
    expect(company.phone.replace(/\D/g, '')).toBe(business.phone.replace(/\D/g, ''));
    expect(company.address).toEqual({ street: business.headquarters.streetAddress, city: business.headquarters.addressLocality, state: business.headquarters.addressRegion, zip: business.headquarters.postalCode });
    expect(company.socialMedia).toEqual(business.socialLinks);
  });

  it('keeps unconfirmed hours out of the published contact copy', () => {
    expect(business.officeHours).toBeNull();
    for (const value of Object.values(company.businessHours)) {
      expect(value).toMatch(/Contact your regional team/);
      expect(value).not.toMatch(/\d{1,2}:\d{2}|\d\s*(am|pm)/i);
    }
  });

  it('provides readable company content and nonempty value descriptions', () => {
    for (const value of [company.tagline, company.description, company.mission]) expect(value.trim()).not.toBe('');
    expect(company.values.length).toBeGreaterThan(0);
    for (const value of company.values) {
      expect(value.title.trim()).not.toBe('');
      expect(value.description.trim()).not.toBe('');
    }
    for (const url of Object.values(company.socialMedia)) expect(new URL(url).protocol).toBe('https:');
  });
});
