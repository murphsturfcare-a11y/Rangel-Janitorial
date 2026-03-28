-- =============================================================================
-- Rangel Janitorial - Seed Data
-- Commercial Janitorial Services Across California
-- =============================================================================

-- Clean slate: delete existing seed data in dependency order
DELETE FROM faqs;
DELETE FROM testimonials;
DELETE FROM leads;
DELETE FROM services;
DELETE FROM locations;

-- =============================================================================
-- 1. SERVICES
-- =============================================================================

INSERT INTO services (
  slug, name, short_description, full_description, icon_name,
  starting_price, benefits, what_includes,
  sort_order, is_active,
  meta_title, meta_description
) VALUES

-- Janitorial Cleaning
(
  'janitorial-cleaning',
  'Janitorial Cleaning',
  'Nightly and recurring cleaning for offices, lobbies, restrooms, and commercial buildings.',
  'Our core janitorial cleaning service keeps your facility spotless around the clock. We provide nightly, weekly, or custom-frequency cleaning programs tailored to the size and needs of your building. From front lobbies and executive suites to break rooms and restrooms, our trained crews follow detailed checklists to ensure nothing gets missed. Every visit ends with a quality inspection so you walk into a clean building every single morning.',
  'sparkles',
  500.00,
  ARRAY[
    'Walk into a clean, professional environment every morning',
    'Reduces sick days by maintaining sanitary common areas and restrooms',
    'Customized cleaning checklists built around your facility''s specific needs',
    'Consistent results from trained, supervised cleaning crews'
  ],
  ARRAY[
    'Lobby, reception, and common area cleaning',
    'Full restroom sanitation including fixtures, mirrors, and restocking supplies',
    'Break room and kitchen cleaning and disinfection',
    'Trash and recycling removal from all areas',
    'Vacuuming, mopping, and dusting throughout the facility',
    'Nightly quality inspection and supervisor sign-off'
  ],
  1, true,
  'Commercial Janitorial Cleaning Services | Rangel Janitorial',
  'Professional nightly and recurring janitorial cleaning for offices, lobbies, and commercial buildings in California. Creating excellent first impressions. Free estimates.'
),

-- Day Porter
(
  'day-porter',
  'Day Porter',
  'On-site daytime cleaning staff for real-time facility upkeep and tenant satisfaction.',
  'High-traffic commercial buildings need more than nightly cleaning. Our day porter service places a dedicated, uniformed cleaning professional on-site during business hours to handle real-time messes, restock restrooms, maintain lobbies, and respond to tenant requests. Day porters keep your facility looking its best during the hours that matter most — when tenants, visitors, and customers are walking through your doors.',
  'user-check',
  1200.00,
  ARRAY[
    'Real-time response to spills, messes, and tenant requests throughout the day',
    'Keeps restrooms stocked and clean during peak business hours',
    'Professional, uniformed staff represents your building well',
    'Reduces complaints and improves tenant retention'
  ],
  ARRAY[
    'Dedicated on-site cleaning professional during business hours',
    'Continuous lobby and common area upkeep',
    'Restroom monitoring, cleaning, and supply restocking throughout the day',
    'Spill and mess response within minutes',
    'Conference room reset and preparation between meetings',
    'Coordination with property management for special requests'
  ],
  2, true,
  'Day Porter Services for Commercial Buildings | Rangel Janitorial',
  'On-site daytime cleaning staff for real-time facility upkeep. Keep lobbies, restrooms, and common areas pristine during business hours. Serving California.'
),

-- Electrostatic Disinfection
(
  'electrostatic-disinfection',
  'Electrostatic Disinfection',
  '360-degree EPA List N approved disinfection for comprehensive germ and pathogen elimination.',
  'Our electrostatic disinfection service uses charged particle technology to deliver EPA List N approved disinfectant to every surface in your facility — including hard-to-reach areas that traditional wiping misses. The positively charged mist wraps around surfaces for true 360-degree coverage, killing 99.9% of bacteria, viruses, and fungi on contact. Ideal for offices, medical facilities, schools, and any environment where health and safety are top priorities.',
  'zap',
  350.00,
  ARRAY[
    'True 360-degree coverage reaches surfaces that manual wiping cannot',
    'EPA List N approved chemicals effective against a broad spectrum of pathogens',
    'Fast application with minimal disruption to your operations',
    'Provides documented proof of disinfection for compliance and tenant confidence'
  ],
  ARRAY[
    'Full-facility electrostatic spray application',
    'EPA List N approved hospital-grade disinfectant',
    'Coverage of all surfaces including undersides, backs, and crevices',
    'High-touch point focus: door handles, light switches, elevator buttons, handrails',
    'Post-service disinfection report for your records',
    'Flexible scheduling — after hours, weekends, or on-demand'
  ],
  3, true,
  'Electrostatic Disinfection Services | Rangel Janitorial',
  'EPA List N approved electrostatic disinfection with 360-degree surface coverage. Hospital-grade pathogen elimination for commercial facilities. Free estimates.'
),

-- Floor Care
(
  'floor-care',
  'Floor Care',
  'Professional strip, wax, buff, and polish services for VCT, tile, concrete, and stone floors.',
  'Floors take the hardest beating of any surface in your building, and nothing ages a facility faster than dull, scuffed, or yellowed floors. Our floor care program restores and protects your investment with professional stripping, waxing, buffing, and polishing services for all hard floor types. We work with VCT, ceramic and porcelain tile, polished concrete, terrazzo, and natural stone. Regular floor maintenance extends the life of your flooring and keeps your facility looking brand new.',
  'layers',
  400.00,
  ARRAY[
    'Restores floors to a high-gloss, like-new appearance',
    'Extends the life of your flooring and delays costly replacement',
    'Eliminates buildup, scuff marks, and yellowing from old wax layers',
    'Slip-resistant finishes improve safety for employees and visitors'
  ],
  ARRAY[
    'Complete chemical stripping of old wax and finish buildup',
    'Deep cleaning and preparation of bare floor surface',
    'Application of multiple coats of commercial-grade floor finish',
    'High-speed buffing and burnishing for maximum shine',
    'Edge and corner detailing by hand',
    'Ongoing maintenance programs available for sustained results'
  ],
  4, true,
  'Commercial Floor Care — Strip, Wax & Polish | Rangel Janitorial',
  'Professional floor stripping, waxing, buffing, and polishing for VCT, tile, concrete, and stone. Restore your commercial floors to like-new condition.'
),

-- Carpet Cleaning
(
  'carpet-cleaning',
  'Carpet Cleaning',
  'Hot water extraction and encapsulation cleaning to restore and maintain commercial carpets.',
  'Commercial carpets trap dirt, allergens, and bacteria deep in their fibers — regular vacuuming only addresses the surface. Our carpet cleaning service uses both hot water extraction (steam cleaning) and low-moisture encapsulation methods to deep clean your carpets, remove stains, and eliminate odors. We recommend hot water extraction for periodic deep cleaning and encapsulation for more frequent interim maintenance, giving you the best of both methods for long carpet life and a consistently clean appearance.',
  'wind',
  300.00,
  ARRAY[
    'Removes deep-embedded dirt, allergens, and bacteria that vacuuming misses',
    'Eliminates stains and odors for a fresher, more professional environment',
    'Extends carpet life by preventing fiber degradation from trapped grit',
    'Low-moisture options allow faster dry times and minimal business disruption'
  ],
  ARRAY[
    'Pre-treatment of high-traffic areas and visible stains',
    'Hot water extraction (steam cleaning) for deep periodic cleaning',
    'Encapsulation cleaning for low-moisture interim maintenance',
    'Spot treatment for stubborn stains including coffee, ink, and grease',
    'Fast-dry methods to minimize downtime — most areas walkable in 2-4 hours',
    'Post-cleaning inspection and stain protection recommendations'
  ],
  5, true,
  'Commercial Carpet Cleaning Services | Rangel Janitorial',
  'Professional carpet cleaning using hot water extraction and encapsulation methods. Deep clean commercial carpets, remove stains, eliminate odors. Free estimates.'
);


-- =============================================================================
-- 2. LOCATIONS
-- =============================================================================

INSERT INTO locations (
  slug, name, description, address, phone,
  neighborhoods, service_area_description,
  is_active,
  meta_title, meta_description
) VALUES

-- Sacramento
(
  'sacramento',
  'Sacramento',
  'Rangel Janitorial''s Sacramento office serves commercial properties throughout the greater Sacramento region. From Class A office buildings in downtown Sacramento to medical facilities in Roseville and retail centers in Elk Grove, our crews deliver the same high standard of janitorial service that has made us a trusted name in California commercial cleaning. We understand the expectations of property managers in the capital region and staff our teams accordingly.',
  '26323 Jefferson Ave Suite C, Murrieta, CA 92562',
  '(916) 426-2311',
  ARRAY['Elk Grove', 'Roseville', 'Folsom', 'Rancho Cordova', 'Citrus Heights', 'Natomas', 'West Sacramento'],
  'Our Sacramento service area covers the entire greater Sacramento region, from West Sacramento and Natomas in the west to Folsom and Rancho Cordova in the east, and from Roseville and Citrus Heights in the north to Elk Grove in the south. We serve office buildings, medical facilities, retail centers, and commercial properties of all sizes.',
  true,
  'Commercial Janitorial Services in Sacramento, CA | Rangel Janitorial',
  'Professional commercial cleaning in Sacramento. Janitorial, day porter, disinfection, and floor care for offices and commercial buildings. Serving Elk Grove, Roseville, Folsom & beyond.'
),

-- Murrieta / Inland Empire
(
  'murrieta-inland-empire',
  'Murrieta / Inland Empire',
  'Our Murrieta headquarters is the heart of Rangel Janitorial. Since 2021, we have built our reputation in the Inland Empire by delivering reliable, detail-oriented janitorial services to commercial properties throughout Southwest Riverside County. From professional office parks in Temecula to medical buildings in Menifee and industrial facilities in Perris, our local crews know this community and take pride in keeping it clean.',
  '26323 Jefferson Ave Suite C, Murrieta, CA 92562',
  '(951) 331-3300',
  ARRAY['Temecula', 'French Valley', 'Menifee', 'Lake Elsinore', 'Hemet', 'Perris', 'Wildomar'],
  'Our Inland Empire service area covers all of Southwest Riverside County, from Temecula and French Valley in the south to Lake Elsinore and Perris in the north, including Murrieta, Menifee, Hemet, and Wildomar. We serve commercial offices, retail, medical, industrial, and institutional facilities throughout the region.',
  true,
  'Commercial Janitorial Services in Murrieta & Inland Empire, CA | Rangel Janitorial',
  'Murrieta-based commercial cleaning company serving the Inland Empire. Janitorial, day porter, floor care, and disinfection. Serving Temecula, Menifee, Lake Elsinore & more.'
),

-- Walnut Creek / East Bay
(
  'walnut-creek-east-bay',
  'Walnut Creek / East Bay',
  'Rangel Janitorial''s East Bay operation serves the thriving commercial corridors of Contra Costa County and the Tri-Valley. From high-rise office buildings in downtown Walnut Creek to corporate campuses in San Ramon and Dublin, we bring our proven systems and trained crews to the Bay Area''s East Bay market. Our teams understand the elevated expectations of Bay Area property managers and deliver accordingly — every night, without exception.',
  '26323 Jefferson Ave Suite C, Murrieta, CA 92562',
  '(925) 655-9008',
  ARRAY['Concord', 'Pleasant Hill', 'Lafayette', 'Danville', 'Martinez', 'San Ramon', 'Dublin'],
  'Our East Bay service area covers Walnut Creek and surrounding Contra Costa County communities including Concord, Pleasant Hill, Lafayette, Danville, and Martinez, as well as the Tri-Valley cities of San Ramon and Dublin. We serve office buildings, medical facilities, retail centers, and commercial properties throughout the region.',
  true,
  'Commercial Janitorial Services in Walnut Creek & East Bay, CA | Rangel Janitorial',
  'Professional commercial cleaning in Walnut Creek and the East Bay. Janitorial, day porter, disinfection, and floor care. Serving Concord, Lafayette, San Ramon, Dublin & beyond.'
);


-- =============================================================================
-- 3. TESTIMONIALS
-- =============================================================================

INSERT INTO testimonials (
  customer_name, location, rating, review_text, service_type,
  is_featured, is_approved
) VALUES

-- Featured testimonials
(
  'Diana Robles',
  'Roseville, Sacramento',
  5,
  'I manage a 120,000 sq ft Class A office building in Roseville and we switched to Rangel Janitorial about a year ago after our previous vendor kept missing details. The difference was immediate. Restrooms are consistently spotless, lobbies look sharp every morning, and tenant complaints about cleaning have dropped to zero. Their night supervisor actually walks the building after every shift to make sure nothing was missed. That level of accountability is rare in this industry.',
  'janitorial-cleaning',
  true, true
),
(
  'Mark Ellison',
  'Walnut Creek, East Bay',
  5,
  'We brought Rangel Janitorial in for day porter service at our multi-tenant office complex in downtown Walnut Creek. Our previous company would disappear for hours at a time — tenants were constantly calling to report dirty restrooms and overflowing trash. Rangel''s porter is on top of everything. Restrooms stay stocked and clean all day, spills get handled within minutes, and our tenants have actually started complimenting the cleanliness. That never happened before.',
  'day-porter',
  true, true
),
(
  'Sandra Villanueva',
  'Temecula, Inland Empire',
  5,
  'After our medical office had a flu outbreak that affected half the staff, we hired Rangel Janitorial for electrostatic disinfection. They came in on a Saturday, treated the entire facility in under three hours, and provided a detailed disinfection report for our records. We were so impressed that we signed up for their recurring janitorial service too. It''s been eight months now and the office has never been cleaner. They understand healthcare facility standards.',
  'electrostatic-disinfection',
  true, true
),

-- Standard testimonials
(
  'Kevin Fong',
  'Elk Grove, Sacramento',
  5,
  'Rangel Janitorial stripped and waxed the VCT floors in our 15,000 sq ft retail space and the results were incredible — they look better than when the building was new. The old wax had turned yellow and had layers of buildup from years of poor maintenance by the previous cleaning company. Rangel''s crew took everything down to bare tile and built it back up right. We''re now on their quarterly maintenance program to keep it that way.',
  'floor-care',
  false, true
),
(
  'Patricia Harmon',
  'San Ramon, East Bay',
  5,
  'We have a 40,000 sq ft corporate office in San Ramon with wall-to-wall carpet that was starting to look grey and worn, especially in the hallways and conference rooms. Rangel Janitorial did a full hot water extraction cleaning and the carpet looks years younger. They also set us up on a quarterly encapsulation schedule between deep cleans. The combination has kept our carpets looking fresh for six months straight now. Very happy with the results.',
  'carpet-cleaning',
  false, true
),
(
  'Richard Contreras',
  'Menifee, Inland Empire',
  4,
  'We hired Rangel Janitorial for nightly cleaning of our two-story office building in Menifee. They''ve been reliable and thorough — the building looks great every morning when our staff arrives. The only reason I''m not giving five stars is because there was a minor miscommunication during the first week about which conference rooms to reset. But once we flagged it, they updated their checklist immediately and it hasn''t happened since. Good people, responsive management.',
  'janitorial-cleaning',
  false, true
);


-- =============================================================================
-- 4. FAQs
-- =============================================================================

INSERT INTO faqs (
  question, answer, category, sort_order, is_active,
  service_slug, location_slug
) VALUES

-- FAQ 1
(
  'What''s included in your janitorial cleaning service?',
  'Our standard janitorial cleaning covers everything your facility needs to look and feel professional every day. This includes vacuuming and mopping all floors, full restroom sanitation and supply restocking, trash and recycling removal, break room and kitchen cleaning, dusting of surfaces and fixtures, and lobby and reception area detailing. We build a customized checklist for each client based on your facility''s layout, traffic patterns, and priorities. Cleaning frequency can be nightly, multiple times per week, or on a custom schedule that fits your operations.',
  'general', 1, true,
  'janitorial-cleaning', NULL
),

-- FAQ 2
(
  'How much does commercial cleaning cost?',
  'Commercial cleaning pricing depends on several factors: your facility''s square footage, the scope of services needed, cleaning frequency, and any specialty services like floor care or disinfection. Most of our recurring janitorial contracts for standard office buildings fall between $500 and $3,000 per month. We provide free, no-obligation walk-throughs and written proposals so you know exactly what you''re getting and what it costs — no hidden fees or surprises. Contact us to schedule a walk-through of your facility.',
  'pricing', 2, true,
  NULL, NULL
),

-- FAQ 3
(
  'Are your employees background-checked?',
  'Yes, every Rangel Janitorial employee undergoes a thorough background check before they ever set foot in your building. This includes criminal history, identity verification, and reference checks. All of our cleaning staff are also fully insured and bonded. We understand that you''re trusting us with access to your facility after hours, and we take that responsibility seriously. Our supervisors conduct regular quality inspections and we maintain detailed access logs.',
  'general', 3, true,
  NULL, NULL
),

-- FAQ 4
(
  'Do you use eco-friendly cleaning products?',
  'Yes, we prioritize Green Seal and EPA Safer Choice certified cleaning products across all of our services. Our standard cleaning program uses low-VOC, biodegradable products that are safer for your employees, our cleaning staff, and the environment — without sacrificing cleaning effectiveness. For electrostatic disinfection, we use EPA List N approved hospital-grade disinfectants that meet the highest pathogen elimination standards. If your facility has specific green building or LEED requirements, we can tailor our product selection to meet those certifications.',
  'general', 4, true,
  NULL, NULL
),

-- FAQ 5
(
  'How often should we schedule commercial cleaning?',
  'The right cleaning frequency depends on your facility type, foot traffic, and the impression you want to make. Most office buildings with 20 or more employees benefit from nightly cleaning five days per week. Smaller offices may do well with three nights per week. High-traffic environments like medical offices, retail spaces, and multi-tenant buildings often need nightly service plus daytime porter coverage. We''ll assess your facility during a free walk-through and recommend a frequency that keeps your space consistently clean without overspending.',
  'scheduling', 5, true,
  NULL, NULL
),

-- FAQ 6
(
  'What industries do you serve?',
  'Rangel Janitorial serves a wide range of commercial and institutional clients. Our core industries include Class A and B office buildings, medical and dental offices, retail and shopping centers, industrial and warehouse facilities, churches and houses of worship, schools and educational institutions, government and municipal buildings, and fitness centers. Each industry has unique cleaning requirements and compliance standards, and we train our crews accordingly. Whether you need OSHA-compliant cleaning for a medical office or after-hours service for a retail store, we have the experience and systems to deliver.',
  'general', 6, true,
  NULL, NULL
),

-- FAQ 7
(
  'Do you offer emergency or one-time cleaning?',
  'Yes, we handle both emergency and one-time cleaning requests. If you have a flood, construction dust, move-in or move-out cleaning, or a special event that requires fast turnaround, we can mobilize a crew — often within 24 to 48 hours. One-time deep cleans are also a great way to try our services before committing to a recurring contract. Many of our long-term clients started with a single project and were impressed enough to sign on for ongoing service.',
  'services', 7, true,
  NULL, NULL
),

-- FAQ 8
(
  'What makes Rangel Janitorial different from other janitorial companies?',
  'Three things set us apart. First, accountability — every facility gets a dedicated supervisor who conducts quality inspections after each cleaning shift, not just spot checks once a month. Second, communication — you get a direct line to our operations team, not a call center. When you call Rangel Janitorial, a real person who knows your building answers. Third, consistency — our crews follow detailed, facility-specific checklists that we build during onboarding and refine over time based on your feedback. We founded this company in 2021 on the belief that commercial cleaning should be reliable, transparent, and done right every single night. That is what creating excellent first impressions means to us.',
  'general', 8, true,
  NULL, NULL
);


-- =============================================================================
-- 5. SAMPLE LEADS
-- =============================================================================

INSERT INTO leads (
  first_name, last_name, email, phone,
  address, city, state, zip_code,
  service_type, message, status,
  utm_source, utm_medium, utm_campaign
) VALUES

-- New lead
(
  'Angela', 'Torres',
  'angela.torres@cbrealty.com', '(916) 555-4821',
  '1500 Eureka Rd', 'Roseville', 'CA', '95661',
  'janitorial-cleaning',
  'We manage a 3-story office building in Roseville with about 45,000 sq ft of leasable space. Our current cleaning company has been inconsistent and we are getting complaints from tenants. Looking for a reliable nightly janitorial service — can you come do a walk-through this week?',
  'new',
  'google', 'cpc', 'sacramento-janitorial'
),

-- Contacted lead
(
  'Brian', 'Nakamura',
  'bnakamura@walnutcreekmedical.com', '(925) 555-7733',
  '1855 San Miguel Dr', 'Walnut Creek', 'CA', '94596',
  'electrostatic-disinfection',
  'We are a multi-specialty medical office in Walnut Creek and need electrostatic disinfection added to our current cleaning protocol. We need documentation of disinfection for our infection control compliance. Please call me to discuss pricing for weekly disinfection service.',
  'contacted',
  'google', 'organic', NULL
),

-- Qualified lead
(
  'Maria', 'Gutierrez',
  'mgutierrez@temeculamall.com', '(951) 555-2209',
  '40820 Winchester Rd', 'Temecula', 'CA', '92591',
  'day-porter',
  'Managing a retail center in Temecula with heavy foot traffic. We need a day porter on-site Monday through Saturday from 8 AM to 5 PM to keep restrooms, food court area, and common areas clean during business hours. Currently spending a fortune on complaint resolution — hoping a dedicated porter solves it.',
  'qualified',
  'facebook', 'social', 'inland-empire-dayporter'
),

-- Converted lead
(
  'David', 'Patel',
  'dpatel@concordofficepark.com', '(925) 555-8814',
  '2300 Clayton Rd', 'Concord', 'CA', '94520',
  'floor-care',
  'We have about 8,000 sq ft of VCT flooring in our office building lobby and hallways that hasn''t been stripped and waxed in over two years. It looks terrible. Need a full strip and wax and then want to set up quarterly maintenance. Also interested in getting a quote for nightly janitorial while you are here.',
  'converted',
  'google', 'cpc', 'east-bay-floorcare'
),

-- Lost lead
(
  'Jennifer', 'Walsh',
  'jwalsh@sacramentofitness.com', '(916) 555-3347',
  '7700 Sunrise Blvd', 'Citrus Heights', 'CA', '95610',
  'carpet-cleaning',
  'Need a one-time carpet cleaning for our gym facility — about 3,000 sq ft of carpet in the lobby and office areas. We had a pipe leak and there is some water staining. Looking for the most affordable option. When is your earliest availability?',
  'lost',
  'yelp', 'referral', NULL
);
