-- ============================================================================
-- Murphy's Turf - Row Level Security Policies
-- ============================================================================

-- =========================
-- Enable RLS on all tables
-- =========================

ALTER TABLE leads                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials          ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations             ENABLE ROW LEVEL SECURITY;
ALTER TABLE services              ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                  ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Leads
-- anon: INSERT | authenticated: SELECT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "leads_anon_insert"
    ON leads FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "leads_auth_select"
    ON leads FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "leads_auth_update"
    ON leads FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "leads_auth_delete"
    ON leads FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- Contacts
-- anon: INSERT | authenticated: SELECT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "contacts_anon_insert"
    ON contacts FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "contacts_auth_select"
    ON contacts FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "contacts_auth_update"
    ON contacts FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "contacts_auth_delete"
    ON contacts FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- Newsletter Subscribers
-- anon: INSERT | authenticated: SELECT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "newsletter_anon_insert"
    ON newsletter_subscribers FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "newsletter_auth_select"
    ON newsletter_subscribers FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "newsletter_auth_update"
    ON newsletter_subscribers FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "newsletter_auth_delete"
    ON newsletter_subscribers FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- Testimonials
-- anon: SELECT (published only) | authenticated: SELECT, INSERT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "testimonials_anon_select"
    ON testimonials FOR SELECT
    TO anon
    USING (is_published = true);

CREATE POLICY "testimonials_auth_select"
    ON testimonials FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "testimonials_auth_insert"
    ON testimonials FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "testimonials_auth_update"
    ON testimonials FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "testimonials_auth_delete"
    ON testimonials FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- Locations
-- anon: SELECT (active only) | authenticated: SELECT, INSERT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "locations_anon_select"
    ON locations FOR SELECT
    TO anon
    USING (is_active = true);

CREATE POLICY "locations_auth_select"
    ON locations FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "locations_auth_insert"
    ON locations FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "locations_auth_update"
    ON locations FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "locations_auth_delete"
    ON locations FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- Services
-- anon: SELECT (active only) | authenticated: SELECT, INSERT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "services_anon_select"
    ON services FOR SELECT
    TO anon
    USING (is_active = true);

CREATE POLICY "services_auth_select"
    ON services FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "services_auth_insert"
    ON services FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "services_auth_update"
    ON services FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "services_auth_delete"
    ON services FOR DELETE
    TO authenticated
    USING (true);

-- ============================================================================
-- FAQs
-- anon: SELECT (published only) | authenticated: SELECT, INSERT, UPDATE, DELETE
-- ============================================================================

CREATE POLICY "faqs_anon_select"
    ON faqs FOR SELECT
    TO anon
    USING (is_published = true);

CREATE POLICY "faqs_auth_select"
    ON faqs FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "faqs_auth_insert"
    ON faqs FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "faqs_auth_update"
    ON faqs FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "faqs_auth_delete"
    ON faqs FOR DELETE
    TO authenticated
    USING (true);
