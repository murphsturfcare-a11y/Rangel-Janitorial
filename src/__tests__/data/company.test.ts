import { company } from '@/data/company';

describe('company data', () => {
  describe('identity fields', () => {
    it('company.name is "Rangel\'s Turf"', () => {
      expect(company.name).toBe("Rangel Janitorial");
    });

    it('company.email is "ralph@rangeljanitorial.com"', () => {
      expect(company.email).toBe('ralph@rangeljanitorial.com');
    });

    it('company.founded is 1994', () => {
      expect(company.founded).toBe(1994);
    });
  });

  describe('address', () => {
    it('company.address.state is "CA"', () => {
      expect(company.address.state).toBe('CA');
    });
  });

  describe('values', () => {
    it('has exactly 3 values', () => {
      expect(company.values).toHaveLength(3);
    });

    it('each value has a non-empty title and description', () => {
      for (const value of company.values) {
        expect(typeof value.title).toBe('string');
        expect(value.title).not.toBe('');
        expect(typeof value.description).toBe('string');
        expect(value.description).not.toBe('');
      }
    });
  });

  describe('socialMedia', () => {
    it('has facebook, instagram, and youtube properties', () => {
      expect(company.socialMedia).toHaveProperty('facebook');
      expect(company.socialMedia).toHaveProperty('instagram');
      expect(company.socialMedia).toHaveProperty('youtube');
    });

    it('all social media URLs are non-empty and start with https://', () => {
      const { facebook, instagram, youtube } = company.socialMedia;
      for (const url of [facebook, instagram, youtube]) {
        expect(url).not.toBe('');
        expect(url).toMatch(/^https:\/\//);
      }
    });
  });

  describe('certifications', () => {
    it('has at least 3 certifications', () => {
      expect(company.certifications.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('stats', () => {
    it('has yearsInBusiness, customersServed, satisfactionRate, and projectsCompleted', () => {
      expect(company.stats).toHaveProperty('yearsInBusiness');
      expect(company.stats).toHaveProperty('customersServed');
      expect(company.stats).toHaveProperty('satisfactionRate');
      expect(company.stats).toHaveProperty('projectsCompleted');
    });
  });

  describe('other required fields', () => {
    it('has a tagline', () => {
      expect(typeof company.tagline).toBe('string');
      expect(company.tagline).not.toBe('');
    });

    it('has a phone field', () => {
      expect(company).toHaveProperty('phone');
    });

    it('has a description', () => {
      expect(typeof company.description).toBe('string');
      expect(company.description).not.toBe('');
    });

    it('has a mission', () => {
      expect(typeof company.mission).toBe('string');
      expect(company.mission).not.toBe('');
    });

    it('has businessHours', () => {
      expect(company).toHaveProperty('businessHours');
    });
  });
});
