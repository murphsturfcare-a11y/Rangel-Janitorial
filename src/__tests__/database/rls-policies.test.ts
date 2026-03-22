import { readFileSync } from 'fs';
import path from 'path';

const rlsSQL = readFileSync(
  path.resolve(__dirname, '../../../supabase/migrations/002_rls_policies.sql'),
  'utf-8'
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check that a CREATE POLICY block exists with the given attributes. */
function policyExists(name: string): boolean {
  return rlsSQL.includes(`CREATE POLICY "${name}"`);
}

/**
 * Extract the full CREATE POLICY block for a given policy name.
 * Captures everything from CREATE POLICY "name" up to the next semicolon.
 */
function getPolicyBlock(name: string): string {
  const regex = new RegExp(
    `CREATE POLICY "${name}"[\\s\\S]*?;`,
    'm'
  );
  const match = rlsSQL.match(regex);
  return match ? match[0] : '';
}

// ---------------------------------------------------------------------------
// 1. RLS enabled on all tables
// ---------------------------------------------------------------------------

describe('enables RLS on all tables', () => {
  const tables = [
    'leads',
    'contacts',
    'newsletter_subscribers',
    'testimonials',
    'locations',
    'services',
    'faqs',
  ];

  it.each(tables)('enables RLS on %s', (table) => {
    const pattern = new RegExp(
      `ALTER\\s+TABLE\\s+${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`,
      'i'
    );
    expect(rlsSQL).toMatch(pattern);
  });
});

// ---------------------------------------------------------------------------
// 2. Per-table policy tests
// ---------------------------------------------------------------------------

// --- Leads ----------------------------------------------------------------

describe('leads policies', () => {
  const policies = [
    'leads_anon_insert',
    'leads_auth_select',
    'leads_auth_update',
    'leads_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon INSERT', () => {
    const block = getPolicyBlock('leads_anon_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('leads_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('leads_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('leads_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});

// --- Contacts -------------------------------------------------------------

describe('contacts policies', () => {
  const policies = [
    'contacts_anon_insert',
    'contacts_auth_select',
    'contacts_auth_update',
    'contacts_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon INSERT', () => {
    const block = getPolicyBlock('contacts_anon_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('contacts_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('contacts_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('contacts_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});

// --- Newsletter Subscribers -----------------------------------------------

describe('newsletter_subscribers policies', () => {
  const policies = [
    'newsletter_anon_insert',
    'newsletter_auth_select',
    'newsletter_auth_update',
    'newsletter_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon INSERT', () => {
    const block = getPolicyBlock('newsletter_anon_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('newsletter_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('newsletter_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('newsletter_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});

// --- Testimonials ---------------------------------------------------------

describe('testimonials policies', () => {
  const policies = [
    'testimonials_anon_select',
    'testimonials_auth_select',
    'testimonials_auth_insert',
    'testimonials_auth_update',
    'testimonials_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon SELECT', () => {
    const block = getPolicyBlock('testimonials_anon_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('anon SELECT requires is_published = true', () => {
    const block = getPolicyBlock('testimonials_anon_select');
    expect(block).toMatch(/is_published\s*=\s*true/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('testimonials_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated INSERT', () => {
    const block = getPolicyBlock('testimonials_auth_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('testimonials_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('testimonials_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});

// --- Locations ------------------------------------------------------------

describe('locations policies', () => {
  const policies = [
    'locations_anon_select',
    'locations_auth_select',
    'locations_auth_insert',
    'locations_auth_update',
    'locations_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon SELECT', () => {
    const block = getPolicyBlock('locations_anon_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('anon SELECT requires is_active = true', () => {
    const block = getPolicyBlock('locations_anon_select');
    expect(block).toMatch(/is_active\s*=\s*true/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('locations_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated INSERT', () => {
    const block = getPolicyBlock('locations_auth_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('locations_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('locations_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});

// --- Services -------------------------------------------------------------

describe('services policies', () => {
  const policies = [
    'services_anon_select',
    'services_auth_select',
    'services_auth_insert',
    'services_auth_update',
    'services_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon SELECT', () => {
    const block = getPolicyBlock('services_anon_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('anon SELECT requires is_active = true', () => {
    const block = getPolicyBlock('services_anon_select');
    expect(block).toMatch(/is_active\s*=\s*true/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('services_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated INSERT', () => {
    const block = getPolicyBlock('services_auth_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('services_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('services_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});

// --- FAQs -----------------------------------------------------------------

describe('faqs policies', () => {
  const policies = [
    'faqs_anon_select',
    'faqs_auth_select',
    'faqs_auth_insert',
    'faqs_auth_update',
    'faqs_auth_delete',
  ];

  it.each(policies)('defines policy %s', (name) => {
    expect(policyExists(name)).toBe(true);
  });

  it('grants anon SELECT', () => {
    const block = getPolicyBlock('faqs_anon_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+anon/i);
  });

  it('anon SELECT requires is_published = true', () => {
    const block = getPolicyBlock('faqs_anon_select');
    expect(block).toMatch(/is_published\s*=\s*true/i);
  });

  it('grants authenticated SELECT', () => {
    const block = getPolicyBlock('faqs_auth_select');
    expect(block).toMatch(/FOR\s+SELECT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated INSERT', () => {
    const block = getPolicyBlock('faqs_auth_insert');
    expect(block).toMatch(/FOR\s+INSERT/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated UPDATE', () => {
    const block = getPolicyBlock('faqs_auth_update');
    expect(block).toMatch(/FOR\s+UPDATE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });

  it('grants authenticated DELETE', () => {
    const block = getPolicyBlock('faqs_auth_delete');
    expect(block).toMatch(/FOR\s+DELETE/i);
    expect(block).toMatch(/TO\s+authenticated/i);
  });
});
