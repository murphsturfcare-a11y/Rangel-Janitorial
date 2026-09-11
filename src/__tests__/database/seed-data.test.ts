import regions from '@/data/regions.json';
import { SERVICE_SLUGS } from '@/lib/seo/constants';
import { readFileSync } from 'fs';
import path from 'path';

const seedSQL = readFileSync(
  path.resolve(__dirname, '../../../supabase/seed.sql'),
  'utf-8'
);

describe('seed.sql', () => {
  // -------------------------------------------------------------------------
  // 1. Table coverage
  // -------------------------------------------------------------------------
  it('inserts data into all expected tables', () => {
    expect(seedSQL).toContain('INSERT INTO services');
    expect(seedSQL).toContain('INSERT INTO locations');
    expect(seedSQL).toContain('INSERT INTO testimonials');
    expect(seedSQL).toContain('INSERT INTO faqs');
    expect(seedSQL).toContain('INSERT INTO leads');
  });

  // -------------------------------------------------------------------------
  // 2. Services
  // -------------------------------------------------------------------------
  it('contains the current dormant janitorial service seed records', () => {
    const serviceBlock = seedSQL.match(/INSERT INTO services[\s\S]*?;(?=\s*--\s*={5,}|\s*$)/)?.[0];
    expect(serviceBlock).toBeDefined();
    for (const slug of ['janitorial-cleaning', 'day-porter', 'electrostatic-disinfection', 'floor-care', 'carpet-cleaning']) expect(serviceBlock).toContain(`'${slug}'`);
  });

  it('seeds the three California regions', () => {
    const locationBlock = seedSQL.match(/INSERT INTO locations[\s\S]*?;(?=\s*--\s*={5,}|\s*$)/)?.[0];
    expect(locationBlock).toBeDefined();
    for (const slug of ['sacramento', 'murrieta-inland-empire', 'walnut-creek-east-bay']) expect(locationBlock).toContain(`'${slug}'`);
    expect(locationBlock).not.toMatch(/'denver'|'colorado-springs'|'boulder'/);
  });

  it('contains the complete dormant testimonial fixture set', () => {
    const block = seedSQL.match(/INSERT INTO testimonials[\s\S]*?;(?=\s*--\s*={5,}|\s*$)/)?.[0];
    expect(block).toBeDefined();
    for (const name of ['Diana Robles', 'Mark Ellison', 'Sandra Villanueva', 'Kevin Fong', 'Patricia Harmon', 'Richard Contreras']) expect(block).toContain(`'${name}'`);
  });

  // -------------------------------------------------------------------------
  // 5. FAQ categories
  // -------------------------------------------------------------------------
  it('seeds FAQ entries across all categories', () => {
    const expectedCategories = ['general', 'pricing', 'services', 'scheduling'];

    for (const category of expectedCategories) {
      expect(seedSQL).toContain(`'${category}'`);
    }
  });

  // -------------------------------------------------------------------------
  // 6. Lead statuses
  // -------------------------------------------------------------------------
  it('seeds leads with all status values', () => {
    // Extract the leads INSERT block
    const leadsMatch = seedSQL.match(
      /INSERT INTO leads[\s\S]*?;(?=\s*--\s*={5,}|\s*$)/
    );
    expect(leadsMatch).not.toBeNull();

    const leadsBlock = leadsMatch![0];

    const expectedStatuses = [
      'new',
      'contacted',
      'qualified',
      'converted',
      'lost',
    ];

    for (const status of expectedStatuses) {
      expect(leadsBlock).toContain(`'${status}'`);
    }
  });

  // -------------------------------------------------------------------------
  // 7. DISCREPANCY: Colorado vs California locations
  // -------------------------------------------------------------------------
  it('records the two old regional aliases in the unused seed', () => {
    expect(seedSQL).toContain("'murrieta-inland-empire'");
    expect(seedSQL).toContain("'walnut-creek-east-bay'");
    expect(regions.map((region) => region.slug)).toEqual(['sacramento', 'murrieta', 'walnut-creek']);
  });

  it('records the remaining dormant service mismatch without treating the seed as runtime data', () => {
    const serviceBlock = seedSQL.match(/INSERT INTO services[\s\S]*?;(?=\s*--\s*={5,}|\s*$)/)?.[0];
    expect(serviceBlock).toContain("'carpet-cleaning'");
    expect(serviceBlock).not.toContain("'office-cleaning'");
    expect(SERVICE_SLUGS).toContain('office-cleaning');
    expect(SERVICE_SLUGS).not.toContain('carpet-cleaning');
  });

  // -------------------------------------------------------------------------
  // 9. DISCREPANCY: testimonials column names vs schema
  // -------------------------------------------------------------------------
  it('DISCREPANCY: testimonials INSERT uses wrong column names vs schema', () => {
    // The schema defines columns "customer_location" and "is_published",
    // but the seed file's INSERT INTO testimonials uses "location" and
    // "is_approved" instead. This will cause the INSERT to fail against
    // the actual schema.

    const testimonialsMatch = seedSQL.match(
      /INSERT INTO testimonials\s*\(([^)]+)\)/
    );
    expect(testimonialsMatch).not.toBeNull();

    const columnList = testimonialsMatch![1];

    // Seed uses "location" instead of the schema's "customer_location"
    expect(columnList).toContain('location');
    expect(columnList).not.toContain('customer_location');

    // Seed uses "is_approved" instead of the schema's "is_published"
    expect(columnList).toContain('is_approved');
    expect(columnList).not.toContain('is_published');
  });

  // -------------------------------------------------------------------------
  // 10. DISCREPANCY: leads column structure vs schema
  // -------------------------------------------------------------------------
  it('DISCREPANCY: leads INSERT uses different column structure than schema', () => {
    // The schema defines "name" and "property_address" columns, but the
    // seed file uses first_name, last_name, address, city, state, and
    // zip_code instead. This means the INSERT won't match the schema.

    const leadsMatch = seedSQL.match(
      /INSERT INTO leads\s*\(([^)]+)\)/
    );
    expect(leadsMatch).not.toBeNull();

    const columnList = leadsMatch![1];

    // Seed uses first_name/last_name instead of the schema's "name"
    expect(columnList).toContain('first_name');
    expect(columnList).toContain('last_name');

    // Seed uses address/city/state/zip_code instead of the schema's "property_address"
    expect(columnList).toContain('address');
    expect(columnList).toContain('city');
    expect(columnList).toContain('state');
    expect(columnList).toContain('zip_code');
  });

  // -------------------------------------------------------------------------
  // 11. SQL apostrophe escaping
  // -------------------------------------------------------------------------
  it('escapes the apostrophes present in the SQL fixture text', () => {
    expect(seedSQL).toContain("Rangel''s");
    expect(seedSQL).toContain("facility''s");
    expect(seedSQL).toContain("They''ve");
    expect(seedSQL).toContain("hasn''t");
  });

  // -------------------------------------------------------------------------
  // 12. Clean-before-seed
  // -------------------------------------------------------------------------
  it('cleans existing data before seeding', () => {
    const expectedDeletes = [
      'DELETE FROM faqs',
      'DELETE FROM testimonials',
      'DELETE FROM leads',
      'DELETE FROM services',
      'DELETE FROM locations',
    ];

    for (const stmt of expectedDeletes) {
      expect(seedSQL).toContain(stmt);
    }

    // Verify DELETEs come before INSERTs
    const firstDelete = seedSQL.indexOf('DELETE FROM');
    const firstInsert = seedSQL.indexOf('INSERT INTO');
    expect(firstDelete).toBeLessThan(firstInsert);
  });
});
