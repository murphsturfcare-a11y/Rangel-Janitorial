import { describe, it, expect } from 'vitest';
import { locations } from '@/data/locations';
import regions from '@/data/regions.json';
import { LOCATION_SLUGS } from '@/lib/seo/constants';

describe('regional business data', () => {
  it('contains exactly the regional registry with unique slugs', () => {
    expect(locations.map((location) => location.slug)).toEqual(regions.map((region) => region.slug));
    expect(LOCATION_SLUGS).toEqual(regions.map((region) => region.slug));
    expect(new Set(LOCATION_SLUGS).size).toBe(LOCATION_SLUGS.length);
  });

  it.each(locations)('$slug uses the regional phone and the full served-city list', (location) => {
    const region = regions.find((region) => region.slug === location.slug)!;
    expect(location.phone.replace(/\D/g, '')).toBe(region.phone.replace(/\D/g, ''));
    expect(location.neighborhoods).toEqual(region.cities.map((city) => city.name));
    expect(location.state).toBe(region.state);
  });

  it('preserves the three intentionally different phone numbers', () => {
    const phones = Object.fromEntries(locations.map((location) => [location.slug, location.phone.replace(/\D/g, '')]));
    expect(phones).toEqual({ sacramento: '9164262311', murrieta: '9518944222', 'walnut-creek': '9256559008' });
  });

  it.each(locations)('$slug provides complete descriptions and metadata', (location) => {
    for (const field of ['name', 'description', 'serviceAreaDescription', 'address', 'metaTitle', 'metaDescription'] as const) expect(location[field].trim()).not.toBe('');
    expect(location.metaTitle).toContain('Rangel Janitorial');
    expect(location.metaDescription.replace(/\D/g, '')).toContain(location.phone.replace(/\D/g, ''));
  });
});
