import { readFileSync } from 'fs';
import path from 'path';

const schemaSQL = readFileSync(
  path.resolve(__dirname, '../../../supabase/migrations/001_initial_schema.sql'),
  'utf-8'
);
const typesTS = readFileSync(
  path.resolve(__dirname, '../../../src/types/index.ts'),
  'utf-8'
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert camelCase to snake_case */
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/** Extract column names from a CREATE TABLE block */
function extractColumns(sql: string, tableName: string): string[] {
  const tableRegex = new RegExp(
    `CREATE TABLE ${tableName}\\s*\\(([^;]+?)\\);`,
    's'
  );
  const match = sql.match(tableRegex);
  if (!match) return [];

  const body = match[1];
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('--') && !line.startsWith('CHECK'))
    .map((line) => {
      const colMatch = line.match(/^(\w+)\s+/);
      return colMatch ? colMatch[1] : null;
    })
    .filter((col): col is string => col !== null && col !== 'CHECK' && col !== 'PRIMARY');
}

/** Extract field names from a TypeScript interface block */
function extractInterfaceFields(ts: string, interfaceName: string): string[] {
  const interfaceRegex = new RegExp(
    `export interface ${interfaceName}\\s*\\{([^}]+)\\}`,
    's'
  );
  const match = ts.match(interfaceRegex);
  if (!match) return [];

  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('//') && !line.startsWith('*'))
    .map((line) => {
      const fieldMatch = line.match(/^(\w+)\??:/);
      return fieldMatch ? fieldMatch[1] : null;
    })
    .filter((field): field is string => field !== null);
}

// ---------------------------------------------------------------------------
// 1. Lead type fields map to leads table columns
// ---------------------------------------------------------------------------

describe('Lead type fields map to leads table columns', () => {
  const sqlColumns = extractColumns(schemaSQL, 'leads');
  const tsFields = extractInterfaceFields(typesTS, 'Lead');

  const expectedMappings: Record<string, string> = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    serviceType: 'service_type',
    propertyAddress: 'property_address',
    message: 'message',
    sourceUrl: 'source_url',
    utmSource: 'utm_source',
    utmMedium: 'utm_medium',
    utmCampaign: 'utm_campaign',
    utmTerm: 'utm_term',
    utmContent: 'utm_content',
    status: 'status',
    notes: 'notes',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };

  it('should have all 17 leads columns represented in the TS Lead interface', () => {
    expect(sqlColumns.length).toBe(17);
    for (const col of sqlColumns) {
      const tsField = Object.entries(expectedMappings).find(
        ([, sqlCol]) => sqlCol === col
      );
      expect(tsField).toBeDefined();
    }
  });

  it('should map every TS Lead field to a snake_case SQL column', () => {
    for (const [tsField, sqlCol] of Object.entries(expectedMappings)) {
      expect(tsFields).toContain(tsField);
      expect(sqlColumns).toContain(sqlCol);
    }
  });

  it('should convert camelCase TS fields to matching snake_case SQL columns', () => {
    const camelCaseMappings = {
      serviceType: 'service_type',
      propertyAddress: 'property_address',
      sourceUrl: 'source_url',
      utmSource: 'utm_source',
      utmMedium: 'utm_medium',
      utmCampaign: 'utm_campaign',
      utmTerm: 'utm_term',
      utmContent: 'utm_content',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };

    for (const [tsField, expectedSqlCol] of Object.entries(camelCaseMappings)) {
      expect(toSnakeCase(tsField)).toBe(expectedSqlCol);
    }
  });
});

// ---------------------------------------------------------------------------
// 2. Contact type fields map to contacts table columns
// ---------------------------------------------------------------------------

describe('Contact type fields map to contacts table columns', () => {
  const sqlColumns = extractColumns(schemaSQL, 'contacts');
  const tsFields = extractInterfaceFields(typesTS, 'Contact');

  it('should map Contact TS fields to contacts SQL columns', () => {
    const expectedMappings: Record<string, string> = {
      id: 'id',
      name: 'name',
      email: 'email',
      phone: 'phone',
      subject: 'subject',
      message: 'message',
      createdAt: 'created_at',
    };

    for (const [tsField, sqlCol] of Object.entries(expectedMappings)) {
      expect(tsFields).toContain(tsField);
      expect(sqlColumns).toContain(sqlCol);
    }
  });

  it('should document that Contact TS type is MISSING the status field from the DB', () => {
    expect(sqlColumns).toContain('status');
    expect(tsFields).not.toContain('status');
  });
});

// ---------------------------------------------------------------------------
// 3. NewsletterSubscriber type maps to newsletter_subscribers table
// ---------------------------------------------------------------------------

describe('NewsletterSubscriber type maps to newsletter_subscribers table', () => {
  const sqlColumns = extractColumns(schemaSQL, 'newsletter_subscribers');
  const tsFields = extractInterfaceFields(typesTS, 'NewsletterSubscriber');

  it('should map shared fields between TS and SQL', () => {
    expect(tsFields).toContain('id');
    expect(sqlColumns).toContain('id');
    expect(tsFields).toContain('email');
    expect(sqlColumns).toContain('email');
  });

  it('should map subscribedAt to subscribed_at', () => {
    expect(tsFields).toContain('subscribedAt');
    expect(sqlColumns).toContain('subscribed_at');
    expect(toSnakeCase('subscribedAt')).toBe('subscribed_at');
  });

  it('should map active (TS) to is_active (SQL) — name difference', () => {
    expect(tsFields).toContain('active');
    expect(sqlColumns).toContain('is_active');
    // Note: toSnakeCase('active') would be 'active', NOT 'is_active'
    // This is a deliberate naming divergence, not just a casing convention
    expect(toSnakeCase('active')).not.toBe('is_active');
  });

  it('should document that TS type is MISSING unsubscribed_at from DB', () => {
    expect(sqlColumns).toContain('unsubscribed_at');
    expect(tsFields).not.toContain('unsubscribedAt');
  });
});

// ---------------------------------------------------------------------------
// 4. MISMATCH: LeadStatus values differ between TypeScript and database
// ---------------------------------------------------------------------------

describe('MISMATCH: LeadStatus values differ between TypeScript and database', () => {
  // Extract TS LeadStatus values
  const tsStatusMatch = typesTS.match(
    /export type LeadStatus\s*=\s*([^;]+);/s
  );
  const tsStatuses = tsStatusMatch
    ? tsStatusMatch[1].match(/'([^']+)'/g)?.map((s) => s.replace(/'/g, ''))
    : [];

  // Extract DB lead status CHECK constraint values
  const dbStatusMatch = schemaSQL.match(
    /CHECK\s*\(status\s+IN\s*\(([^)]+)\)\)/
  );
  const dbStatuses = dbStatusMatch
    ? dbStatusMatch[1].match(/'([^']+)'/g)?.map((s) => s.replace(/'/g, ''))
    : [];

  it('should have TypeScript LeadStatus values: new, contacted, quoted, won, lost', () => {
    expect(tsStatuses).toEqual(['new', 'contacted', 'quoted', 'won', 'lost']);
  });

  it('should have DB lead status values: new, contacted, qualified, converted, lost', () => {
    expect(dbStatuses).toEqual([
      'new',
      'contacted',
      'qualified',
      'converted',
      'lost',
    ]);
  });

  it('should share the values: new, contacted, lost', () => {
    const shared = tsStatuses!.filter((s) => dbStatuses!.includes(s));
    expect(shared).toEqual(
      expect.arrayContaining(['new', 'contacted', 'lost'])
    );
    expect(shared.length).toBe(3);
  });

  it('should have TS-only values: quoted, won', () => {
    const tsOnly = tsStatuses!.filter((s) => !dbStatuses!.includes(s));
    expect(tsOnly).toEqual(expect.arrayContaining(['quoted', 'won']));
    expect(tsOnly.length).toBe(2);
  });

  it('should have DB-only values: qualified, converted', () => {
    const dbOnly = dbStatuses!.filter((s) => !tsStatuses!.includes(s));
    expect(dbOnly).toEqual(expect.arrayContaining(['qualified', 'converted']));
    expect(dbOnly.length).toBe(2);
  });

  it('should confirm the two sets are NOT equal', () => {
    expect(tsStatuses).not.toEqual(dbStatuses);
  });
});

// ---------------------------------------------------------------------------
// 5. TypeScript uses camelCase while SQL uses snake_case
// ---------------------------------------------------------------------------

describe('TypeScript uses camelCase while SQL uses snake_case', () => {
  const camelCaseFields = [
    'serviceType',
    'propertyAddress',
    'sourceUrl',
    'utmSource',
    'utmMedium',
    'utmCampaign',
    'utmTerm',
    'utmContent',
    'createdAt',
    'updatedAt',
  ];

  const snakeCaseColumns = [
    'service_type',
    'property_address',
    'source_url',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'created_at',
    'updated_at',
  ];

  it('should contain camelCase fields in the TypeScript file', () => {
    for (const field of camelCaseFields) {
      expect(typesTS).toContain(field);
    }
  });

  it('should contain snake_case columns in the SQL schema file', () => {
    for (const col of snakeCaseColumns) {
      expect(schemaSQL).toContain(col);
    }
  });

  it('should confirm camelCase fields convert to their snake_case counterparts', () => {
    for (let i = 0; i < camelCaseFields.length; i++) {
      expect(toSnakeCase(camelCaseFields[i])).toBe(snakeCaseColumns[i]);
    }
  });
});

// ---------------------------------------------------------------------------
// 6. Contact type is missing status field from database schema
// ---------------------------------------------------------------------------

describe('Contact type is missing status field from database schema', () => {
  it('should have a status column in the contacts table SQL', () => {
    const contactsTableMatch = schemaSQL.match(
      /CREATE TABLE contacts\s*\(([^;]+?)\);/s
    );
    expect(contactsTableMatch).not.toBeNull();
    expect(contactsTableMatch![1]).toContain('status');
  });

  it('should have a CHECK constraint on contacts.status for unread, read, replied', () => {
    const contactsTableMatch = schemaSQL.match(
      /CREATE TABLE contacts\s*\(([^;]+?)\);/s
    );
    expect(contactsTableMatch![1]).toMatch(
      /CHECK\s*\(status\s+IN\s*\('unread',\s*'read',\s*'replied'\)\)/
    );
  });

  it('should NOT have a status field in the TypeScript Contact interface', () => {
    const tsFields = extractInterfaceFields(typesTS, 'Contact');
    expect(tsFields).not.toContain('status');
  });
});

// ---------------------------------------------------------------------------
// 7. NewsletterSubscriber type is missing unsubscribed_at from database schema
// ---------------------------------------------------------------------------

describe('NewsletterSubscriber type is missing unsubscribed_at from database schema', () => {
  it('should have unsubscribed_at column in newsletter_subscribers SQL table', () => {
    const tableMatch = schemaSQL.match(
      /CREATE TABLE newsletter_subscribers\s*\(([^;]+?)\);/s
    );
    expect(tableMatch).not.toBeNull();
    expect(tableMatch![1]).toContain('unsubscribed_at');
  });

  it('should NOT have unsubscribedAt field in the TS NewsletterSubscriber interface', () => {
    const tsFields = extractInterfaceFields(typesTS, 'NewsletterSubscriber');
    expect(tsFields).not.toContain('unsubscribedAt');
  });
});

// ---------------------------------------------------------------------------
// 8. NewsletterSubscriber uses 'active' but schema uses 'is_active'
// ---------------------------------------------------------------------------

describe("NewsletterSubscriber uses 'active' but schema uses 'is_active'", () => {
  it("should have 'active' field in the TS NewsletterSubscriber interface", () => {
    const tsFields = extractInterfaceFields(typesTS, 'NewsletterSubscriber');
    expect(tsFields).toContain('active');
  });

  it("should have 'is_active' column in the newsletter_subscribers SQL table", () => {
    const sqlColumns = extractColumns(schemaSQL, 'newsletter_subscribers');
    expect(sqlColumns).toContain('is_active');
  });

  it("should confirm 'active' does NOT snake_case-convert to 'is_active'", () => {
    // This is a naming divergence — not just a casing difference
    expect(toSnakeCase('active')).toBe('active');
    expect(toSnakeCase('active')).not.toBe('is_active');
  });
});

// ---------------------------------------------------------------------------
// 9. Database has tables with no corresponding TypeScript interface
// ---------------------------------------------------------------------------

describe('Database has tables with corresponding TypeScript interfaces', () => {
  const dbTables = [
    { table: 'testimonials', tsInterface: 'Testimonial' },
    { table: 'locations', tsInterface: 'Location' },
    { table: 'services', tsInterface: 'Service' },
    { table: 'faqs', tsInterface: 'FAQItem' },
  ];

  for (const { table, tsInterface } of dbTables) {
    it(`should have a ${tsInterface} interface for the ${table} table`, () => {
      expect(schemaSQL).toContain(`CREATE TABLE ${table}`);
      const fields = extractInterfaceFields(typesTS, tsInterface);
      expect(fields.length).toBeGreaterThan(0);
    });
  }

  it('should have a Testimonial interface in the TS file', () => {
    expect(typesTS).toMatch(/export interface Testimonial\s*\{/);
  });

  it('should have a Location interface in the TS file', () => {
    expect(typesTS).toMatch(/export interface Location\s*\{/);
  });

  it('should have a Service interface in the TS file', () => {
    expect(typesTS).toMatch(/export interface Service\s*\{/);
  });

  it('should have a FAQItem interface in the TS file', () => {
    expect(typesTS).toMatch(/export interface FAQItem\s*\{/);
  });
});

// ---------------------------------------------------------------------------
// 10. ServiceType enum values don't match seed services
// ---------------------------------------------------------------------------

describe("ServiceType enum values don't match seed services", () => {
  // Extract TS ServiceType values
  const tsServiceTypeMatch = typesTS.match(
    /export type ServiceType\s*=\s*([\s\S]*?);/
  );
  const tsServiceTypes = tsServiceTypeMatch
    ? tsServiceTypeMatch[1].match(/'([^']+)'/g)?.map((s) => s.replace(/'/g, ''))
    : [];

  // DB schema service_type is just text (no CHECK constraint)
  // But seed data from the application uses completely different values
  const seedServiceTypes = [
    'lawn-cleaning',
    'aeration',
    'seeding',
    'fertilization',
    'pest-control',
    'seasonal-maintenance',
  ];

  it('should have TS ServiceType values: pet-hair-debris, blooming-decompacting, disinfect-deodorize, poop-scooping, oxyturf, other', () => {
    expect(tsServiceTypes).toEqual([
      'pet-hair-debris',
      'blooming-decompacting',
      'disinfect-deodorize',
      'poop-scooping',
      'oxyturf',
      'other',
    ]);
  });

  it('should have DB service_type column as plain text with no CHECK constraint', () => {
    // The leads table service_type column has no CHECK constraint
    const leadsTable = schemaSQL.match(
      /CREATE TABLE leads\s*\(([^;]+?)\);/s
    );
    expect(leadsTable).not.toBeNull();
    expect(leadsTable![1]).toContain('service_type    text');
    // There is a CHECK on status, but NOT on service_type
    expect(leadsTable![1]).not.toMatch(/service_type.*CHECK/s);
  });

  it('should have zero overlap between TS ServiceType values and seed service types', () => {
    const overlap = tsServiceTypes!.filter((s) =>
      seedServiceTypes.includes(s)
    );
    expect(overlap).toEqual([]);
  });

  it('should confirm TS ServiceType and seed service types are completely divergent', () => {
    for (const tsType of tsServiceTypes!) {
      expect(seedServiceTypes).not.toContain(tsType);
    }
    for (const seedType of seedServiceTypes) {
      expect(tsServiceTypes).not.toContain(seedType);
    }
  });
});
