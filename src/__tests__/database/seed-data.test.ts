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
  it('seeds 6 services', () => {
    const expectedSlugs = [
      'lawn-cleaning',
      'aeration',
      'seeding',
      'fertilization',
      'pest-control',
      'seasonal-maintenance',
    ];

    for (const slug of expectedSlugs) {
      expect(seedSQL).toContain(`'${slug}'`);
    }
  });

  // -------------------------------------------------------------------------
  // 3. Colorado locations
  // -------------------------------------------------------------------------
  it('seeds 6 Colorado locations', () => {
    const expectedSlugs = [
      'denver',
      'colorado-springs',
      'aurora',
      'lakewood',
      'boulder',
      'fort-collins',
    ];

    for (const slug of expectedSlugs) {
      expect(seedSQL).toContain(`'${slug}'`);
    }
  });

  // -------------------------------------------------------------------------
  // 4. Testimonials count
  // -------------------------------------------------------------------------
  it('seeds testimonials', () => {
    // Extract the testimonials INSERT block (from "INSERT INTO testimonials" to the next section separator or end)
    const testimonialsMatch = seedSQL.match(
      /INSERT INTO testimonials[\s\S]*?;(?=\s*--\s*={5,}|\s*$)/
    );
    expect(testimonialsMatch).not.toBeNull();

    const testimonialsBlock = testimonialsMatch![0];

    // Count customer names — each testimonial row starts with a customer_name value
    const customerNames = [
      'Karen Lindstrom',
      'David and Maria Espinoza',
      'Tom Nguyen',
      'Rachel Whitfield',
      'Mike Hannigan',
      'Jennifer Castillo',
      'Brian Kowalski',
      'Amanda Reyes',
      'Greg Johannsen',
      'Priya Sharma',
      'Steve Caldwell',
      'Lisa Tran',
    ];

    let count = 0;
    for (const name of customerNames) {
      if (testimonialsBlock.includes(name)) {
        count++;
      }
    }

    // At least 10 testimonial entries
    expect(count).toBeGreaterThanOrEqual(10);
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
  it('DISCREPANCY: seed data uses Colorado locations but frontend uses California locations', () => {
    // The frontend in src/data/locations.ts uses California locations
    // (huntington-beach, temecula, san-diego, etc.) while the database
    // seed file uses Colorado locations. This means the seeded DB data
    // and the frontend static data are for entirely different geographies.

    // Seed SQL contains Colorado locations
    expect(seedSQL).toContain('denver');
    expect(seedSQL).toContain('colorado-springs');
    expect(seedSQL).toContain('boulder');

    // Seed SQL does NOT contain California locations used by the frontend
    expect(seedSQL).not.toContain('huntington-beach');
    expect(seedSQL).not.toContain('temecula');
    expect(seedSQL).not.toContain('san-diego');
  });

  // -------------------------------------------------------------------------
  // 8. DISCREPANCY: seed services vs frontend services
  // -------------------------------------------------------------------------
  it('DISCREPANCY: seed services differ from frontend services', () => {
    // The frontend uses artificial turf cleaning services
    // (pet-hair-debris, blooming-decompacting, oxyturf, etc.) while
    // the database seed uses traditional lawn care services
    // (lawn-cleaning, aeration, fertilization, etc.).

    // Seed SQL contains traditional lawn care services
    expect(seedSQL).toContain('lawn-cleaning');
    expect(seedSQL).toContain('aeration');
    expect(seedSQL).toContain('fertilization');

    // Seed SQL does NOT contain artificial turf services used by the frontend
    expect(seedSQL).not.toContain('pet-hair-debris');
    expect(seedSQL).not.toContain('blooming-decompacting');
    expect(seedSQL).not.toContain('oxyturf');
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
  it('uses proper SQL apostrophe escaping', () => {
    // Common words with apostrophes should be escaped as '' in SQL strings
    expect(seedSQL).toContain("Murphy''s");
    expect(seedSQL).toContain("don''t");

    // Verify no unescaped apostrophes break string literals by checking
    // that known possessives/contractions use the '' escape pattern
    expect(seedSQL).toContain("yard''s");
    expect(seedSQL).toContain("lawn''s");
    expect(seedSQL).toContain("O''Brien");
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
