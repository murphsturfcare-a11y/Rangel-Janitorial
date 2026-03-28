import { locations } from '@/data/locations';
import { LOCATION_SLUGS } from '@/lib/seo/constants';

const REQUIRED_FIELDS = [
  'slug',
  'name',
  'state',
  'description',
  'serviceAreaDescription',
  'neighborhoods',
  'phone',
  'address',
  'metaTitle',
  'metaDescription',
] as const;

const EXPECTED_PHONES: Record<string, string> = {
  sacramento: '916-426-2311',
  murrieta: '951-331-3300',
  'walnut-creek': '925-655-9008',
};

describe('locations data', () => {
  it('contains exactly 3 locations', () => {
    expect(locations).toHaveLength(3);
  });

  describe('slug integrity', () => {
    it('all slugs are unique', () => {
      const slugs = locations.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('every location slug exists in LOCATION_SLUGS', () => {
      const constantSlugs = [...LOCATION_SLUGS];
      for (const location of locations) {
        expect(constantSlugs).toContain(location.slug);
      }
    });

    it('every LOCATION_SLUGS entry has a matching location', () => {
      const locationSlugs = locations.map((l) => l.slug);
      for (const slug of LOCATION_SLUGS) {
        expect(locationSlugs).toContain(slug);
      }
    });
  });

  describe('required fields', () => {
    it.each(locations.map((l) => [l.slug, l]))(
      '%s has all required fields with non-empty values',
      (_slug, location) => {
        for (const field of REQUIRED_FIELDS) {
          expect(location).toHaveProperty(field);
          const value = location[field as keyof typeof location];
          if (typeof value === 'string') {
            expect(value.trim().length).toBeGreaterThan(0);
          }
        }
      },
    );
  });

  describe('state', () => {
    it.each(locations.map((l) => [l.slug, l]))(
      '%s has state "CA"',
      (_slug, location) => {
        expect(location.state).toBe('CA');
      },
    );
  });

  describe('neighborhoods', () => {
    it.each(locations.map((l) => [l.slug, l]))(
      '%s has a non-empty array of strings for neighborhoods',
      (_slug, location) => {
        expect(Array.isArray(location.neighborhoods)).toBe(true);
        expect(location.neighborhoods.length).toBeGreaterThan(0);
        for (const neighborhood of location.neighborhoods) {
          expect(typeof neighborhood).toBe('string');
          expect(neighborhood.trim().length).toBeGreaterThan(0);
        }
      },
    );
  });

  describe('phone numbers', () => {
    it.each(Object.entries(EXPECTED_PHONES))(
      '%s has the correct phone number %s',
      (slug, expectedPhone) => {
        const location = locations.find((l) => l.slug === slug);
        expect(location).toBeDefined();
        expect(location!.phone).toBe(expectedPhone);
      },
    );

    it.each(locations.map((l) => [l.slug, l]))(
      '%s phone matches XXX-XXX-XXXX pattern',
      (_slug, location) => {
        expect(location.phone).toMatch(/^\d{3}-\d{3}-\d{4}$/);
      },
    );
  });

  describe('metaTitle', () => {
    it.each(locations.map((l) => [l.slug, l]))(
      '%s metaTitle contains "Rangel\'s Turf"',
      (_slug, location) => {
        expect(location.metaTitle).toContain("Rangel Janitorial");
      },
    );
  });

  describe('no empty strings', () => {
    it.each(locations.map((l) => [l.slug, l]))(
      '%s has no empty string values in any field',
      (_slug, location) => {
        for (const field of REQUIRED_FIELDS) {
          const value = location[field as keyof typeof location];
          if (typeof value === 'string') {
            expect(value.trim()).not.toBe('');
          }
          if (Array.isArray(value)) {
            for (const item of value) {
              if (typeof item === 'string') {
                expect(item.trim()).not.toBe('');
              }
            }
          }
        }
      },
    );
  });
});
