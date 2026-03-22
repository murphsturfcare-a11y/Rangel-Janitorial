import { readFileSync } from 'fs';
import path from 'path';

describe('001_initial_schema migration', () => {
  const schemaSQL = readFileSync(
    path.resolve(__dirname, '../../../supabase/migrations/001_initial_schema.sql'),
    'utf-8'
  );

  // ---------------------------------------------------------------------------
  // 1. All expected tables
  // ---------------------------------------------------------------------------
  describe('defines all expected tables', () => {
    const expectedTables = [
      'leads',
      'contacts',
      'newsletter_subscribers',
      'testimonials',
      'locations',
      'services',
      'faqs',
    ];

    it.each(expectedTables)('creates the "%s" table', (table) => {
      const pattern = new RegExp(`CREATE TABLE\\s+(IF NOT EXISTS\\s+)?${table}\\s*\\(`, 'i');
      expect(schemaSQL).toMatch(pattern);
    });
  });

  // ---------------------------------------------------------------------------
  // Helper: extract the CREATE TABLE block for a given table name
  // ---------------------------------------------------------------------------
  function extractTableBlock(tableName: string): string {
    const pattern = new RegExp(
      `CREATE TABLE\\s+(?:IF NOT EXISTS\\s+)?${tableName}\\s*\\(([\\s\\S]*?)\\);`,
      'i'
    );
    const match = schemaSQL.match(pattern);
    expect(match).not.toBeNull();
    return match![1];
  }

  // ---------------------------------------------------------------------------
  // 2. leads table columns
  // ---------------------------------------------------------------------------
  describe('leads table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'name',
      'email',
      'phone',
      'service_type',
      'property_address',
      'message',
      'source_url',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'status',
      'notes',
      'created_at',
      'updated_at',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('leads');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. contacts table columns
  // ---------------------------------------------------------------------------
  describe('contacts table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'name',
      'email',
      'phone',
      'subject',
      'message',
      'status',
      'created_at',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('contacts');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. newsletter_subscribers table columns
  // ---------------------------------------------------------------------------
  describe('newsletter_subscribers table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'email',
      'subscribed_at',
      'unsubscribed_at',
      'is_active',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('newsletter_subscribers');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. testimonials table columns
  // ---------------------------------------------------------------------------
  describe('testimonials table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'customer_name',
      'customer_location',
      'rating',
      'review_text',
      'service_type',
      'image_url',
      'is_featured',
      'is_published',
      'created_at',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('testimonials');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. locations table columns
  // ---------------------------------------------------------------------------
  describe('locations table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'name',
      'slug',
      'description',
      'address',
      'phone',
      'service_area_description',
      'neighborhoods',
      'meta_title',
      'meta_description',
      'is_active',
      'created_at',
      'updated_at',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('locations');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 7. services table columns
  // ---------------------------------------------------------------------------
  describe('services table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'name',
      'slug',
      'short_description',
      'full_description',
      'benefits',
      'what_includes',
      'starting_price',
      'icon_name',
      'meta_title',
      'meta_description',
      'is_active',
      'sort_order',
      'created_at',
      'updated_at',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('services');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 8. faqs table columns
  // ---------------------------------------------------------------------------
  describe('faqs table has all expected columns', () => {
    const expectedColumns = [
      'id',
      'question',
      'answer',
      'category',
      'service_slug',
      'location_slug',
      'sort_order',
      'is_published',
      'created_at',
    ];

    it.each(expectedColumns)('includes column "%s"', (column) => {
      const block = extractTableBlock('faqs');
      expect(block).toContain(column);
    });
  });

  // ---------------------------------------------------------------------------
  // 9. leads.status CHECK constraint
  // ---------------------------------------------------------------------------
  it('leads.status has CHECK constraint with correct values', () => {
    const block = extractTableBlock('leads');
    expect(block).toMatch(/CHECK\s*\(\s*status\s+IN\s*\(/i);
    expect(block).toContain("'new'");
    expect(block).toContain("'contacted'");
    expect(block).toContain("'qualified'");
    expect(block).toContain("'converted'");
    expect(block).toContain("'lost'");
  });

  // ---------------------------------------------------------------------------
  // 10. contacts.status CHECK constraint
  // ---------------------------------------------------------------------------
  it('contacts.status has CHECK constraint with correct values', () => {
    const block = extractTableBlock('contacts');
    expect(block).toMatch(/CHECK\s*\(\s*status\s+IN\s*\(/i);
    expect(block).toContain("'unread'");
    expect(block).toContain("'read'");
    expect(block).toContain("'replied'");
  });

  // ---------------------------------------------------------------------------
  // 11. testimonials.rating CHECK constraint
  // ---------------------------------------------------------------------------
  it('testimonials.rating has CHECK constraint for range 1-5', () => {
    const block = extractTableBlock('testimonials');
    expect(block).toMatch(/rating\s+.+CHECK\s*\(/i);
    expect(block).toMatch(/rating\s*>=\s*1/i);
    expect(block).toMatch(/rating\s*<=\s*5/i);
  });

  // ---------------------------------------------------------------------------
  // 12. All expected indexes
  // ---------------------------------------------------------------------------
  describe('defines all expected indexes', () => {
    const expectedIndexes = [
      'idx_leads_status',
      'idx_leads_created_at',
      'idx_contacts_status',
      'idx_testimonials_pub',
      'idx_locations_slug',
      'idx_services_slug',
      'idx_faqs_category',
      'idx_faqs_service_slug',
      'idx_faqs_location_slug',
    ];

    it.each(expectedIndexes)('defines index "%s"', (index) => {
      const pattern = new RegExp(`CREATE\\s+INDEX\\s+(IF NOT EXISTS\\s+)?${index}\\b`, 'i');
      expect(schemaSQL).toMatch(pattern);
    });
  });

  // ---------------------------------------------------------------------------
  // 13. Trigger function
  // ---------------------------------------------------------------------------
  it('defines update_updated_at_column trigger function', () => {
    expect(schemaSQL).toMatch(
      /CREATE\s+OR\s+REPLACE\s+FUNCTION\s+update_updated_at_column\s*\(\)/i
    );
  });

  // ---------------------------------------------------------------------------
  // 14. set_updated_at triggers on leads, locations, and services
  // ---------------------------------------------------------------------------
  describe('applies set_updated_at trigger to leads, locations, and services', () => {
    const tables = ['leads', 'locations', 'services'];

    it.each(tables)('creates set_updated_at trigger on "%s"', (table) => {
      const pattern = new RegExp(
        `CREATE\\s+TRIGGER\\s+set_updated_at\\s+.*?ON\\s+${table}\\b`,
        'is'
      );
      expect(schemaSQL).toMatch(pattern);
    });
  });
});
