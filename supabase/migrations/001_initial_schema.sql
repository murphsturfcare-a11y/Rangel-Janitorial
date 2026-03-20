-- ============================================================================
-- Murphy's Turf - Initial Database Schema
-- Colorado Lawn Care Company
-- ============================================================================

-- =========================
-- 1. Leads
-- =========================
CREATE TABLE leads (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text        NOT NULL,
    email           text        NOT NULL,
    phone           text,
    service_type    text,
    property_address text,
    message         text,
    source_url      text,
    utm_source      text,
    utm_medium      text,
    utm_campaign    text,
    utm_term        text,
    utm_content     text,
    status          text        NOT NULL DEFAULT 'new'
                                CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    notes           text,
    created_at      timestamptz DEFAULT now(),
    updated_at      timestamptz DEFAULT now()
);

-- =========================
-- 2. Contacts
-- =========================
CREATE TABLE contacts (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text        NOT NULL,
    email       text        NOT NULL,
    phone       text,
    subject     text,
    message     text        NOT NULL,
    status      text        NOT NULL DEFAULT 'unread'
                            CHECK (status IN ('unread', 'read', 'replied')),
    created_at  timestamptz DEFAULT now()
);

-- =========================
-- 3. Newsletter Subscribers
-- =========================
CREATE TABLE newsletter_subscribers (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    email           text        UNIQUE NOT NULL,
    subscribed_at   timestamptz DEFAULT now(),
    unsubscribed_at timestamptz,
    is_active       boolean     DEFAULT true
);

-- =========================
-- 4. Testimonials
-- =========================
CREATE TABLE testimonials (
    id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name     text        NOT NULL,
    customer_location text,
    rating            integer     NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text       text        NOT NULL,
    service_type      text,
    image_url         text,
    is_featured       boolean     DEFAULT false,
    is_published      boolean     DEFAULT true,
    created_at        timestamptz DEFAULT now()
);

-- =========================
-- 5. Locations
-- =========================
CREATE TABLE locations (
    id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name                    text        NOT NULL,
    slug                    text        UNIQUE NOT NULL,
    description             text,
    address                 text,
    phone                   text,
    service_area_description text,
    neighborhoods           text[],
    meta_title              text,
    meta_description        text,
    is_active               boolean     DEFAULT true,
    created_at              timestamptz DEFAULT now(),
    updated_at              timestamptz DEFAULT now()
);

-- =========================
-- 6. Services
-- =========================
CREATE TABLE services (
    id                uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
    name              text           NOT NULL,
    slug              text           UNIQUE NOT NULL,
    short_description text,
    full_description  text,
    benefits          text[],
    what_includes     text[],
    starting_price    decimal(10,2),
    icon_name         text,
    meta_title        text,
    meta_description  text,
    is_active         boolean        DEFAULT true,
    sort_order        integer        DEFAULT 0,
    created_at        timestamptz    DEFAULT now(),
    updated_at        timestamptz    DEFAULT now()
);

-- =========================
-- 7. FAQs
-- =========================
CREATE TABLE faqs (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    question      text        NOT NULL,
    answer        text        NOT NULL,
    category      text,
    service_slug  text,
    location_slug text,
    sort_order    integer     DEFAULT 0,
    is_published  boolean     DEFAULT true,
    created_at    timestamptz DEFAULT now()
);

-- ============================================================================
-- Indexes
-- ============================================================================

CREATE INDEX idx_leads_status        ON leads (status);
CREATE INDEX idx_leads_created_at    ON leads (created_at DESC);
CREATE INDEX idx_contacts_status     ON contacts (status);
CREATE INDEX idx_testimonials_pub    ON testimonials (is_published, is_featured);
CREATE INDEX idx_locations_slug      ON locations (slug);
CREATE INDEX idx_services_slug       ON services (slug);
CREATE INDEX idx_faqs_category       ON faqs (category);
CREATE INDEX idx_faqs_service_slug   ON faqs (service_slug);
CREATE INDEX idx_faqs_location_slug  ON faqs (location_slug);

-- ============================================================================
-- updated_at trigger function
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to tables with an updated_at column

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
