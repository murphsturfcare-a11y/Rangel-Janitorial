-- =============================================================================
-- Murphy's Turf - Seed Data
-- Professional Lawn Care Services Across Colorado
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

-- Lawn Cleaning
(
  'lawn-cleaning',
  'Lawn Cleaning',
  'Complete debris removal and lawn grooming to restore your yard''s curb appeal.',
  'Our lawn cleaning service tackles the buildup of leaves, branches, thatch, and other debris that suffocate your grass and invite pests. We use commercial-grade equipment to clear every corner of your property, leaving behind a pristine, healthy lawn. Perfect as a standalone service or as prep work before aeration, seeding, or fertilization.',
  'leaf',
  75.00,
  ARRAY[
    'Removes suffocating debris so grass can breathe and absorb sunlight',
    'Eliminates hiding spots for grubs, mites, and other lawn pests',
    'Instantly boosts curb appeal and property value',
    'Prevents thatch buildup that leads to fungal disease'
  ],
  ARRAY[
    'Full leaf and debris removal from all turf areas',
    'Thatch raking and removal up to 1/2 inch depth',
    'Edging along sidewalks, driveways, and garden beds',
    'Blowing and cleanup of all hard surfaces',
    'Post-service walkthrough and recommendations'
  ],
  1, true,
  'Professional Lawn Cleaning Services | Murphy''s Turf Colorado',
  'Expert lawn cleaning and debris removal across Colorado. We clear leaves, thatch, and buildup so your grass can thrive. Starting at $75. Free estimates.'
),

-- Aeration
(
  'aeration',
  'Aeration',
  'Core aeration breaks up compacted Colorado clay soil so water, air, and nutrients reach grassroots.',
  'Colorado''s heavy clay soil compacts easily under foot traffic, mowing, and our intense freeze-thaw cycles. Our core aeration service pulls thousands of small soil plugs per pass, creating channels that let water, oxygen, and fertilizer penetrate deep into the root zone. Most Colorado lawns benefit from aeration at least once per year, ideally in early fall or late spring.',
  'wind',
  125.00,
  ARRAY[
    'Breaks through compacted clay soil common across the Front Range',
    'Improves water infiltration and reduces runoff on slopes',
    'Strengthens root systems for better drought tolerance',
    'Enhances fertilizer effectiveness by up to 50%',
    'Reduces thatch accumulation over time'
  ],
  ARRAY[
    'Double-pass core aeration with commercial-grade aerator',
    'Pre-service irrigation check and flagging of sprinkler heads',
    'Core plugs left on lawn to decompose naturally',
    'Post-aeration watering recommendations tailored to your soil type',
    'Optional overseeding coordination at discounted bundle rate'
  ],
  2, true,
  'Core Aeration Services for Colorado Clay Soil | Murphy''s Turf',
  'Professional core aeration designed for Colorado''s compacted clay. Improve water penetration, root growth, and lawn health. Starting at $125.'
),

-- Seeding
(
  'seeding',
  'Seeding',
  'Overseed with Colorado-adapted grass varieties to fill bare spots and thicken your turf.',
  'Thin, patchy lawns are no match for our professional overseeding service. We use a curated blend of Kentucky Bluegrass, Perennial Ryegrass, and Tall Fescue specifically selected for Colorado''s altitude, UV intensity, and variable moisture. Seed is applied with calibrated slit-seeders that place seed directly into the soil for maximum germination rates.',
  'sprout',
  150.00,
  ARRAY[
    'Fills in bare and thin spots for a thick, uniform lawn',
    'Uses high-altitude grass blends rated for 5,000–7,500 ft elevation',
    'Improves weed resistance by outcompeting unwanted species',
    'Builds genetic diversity for better disease and drought tolerance'
  ],
  ARRAY[
    'Soil assessment and seed variety recommendation',
    'Slit-seeding with calibrated commercial equipment',
    'Premium Colorado-adapted grass seed blend (included in price)',
    'Starter fertilizer application to boost germination',
    'Post-seeding watering schedule and care instructions'
  ],
  3, true,
  'Professional Lawn Seeding & Overseeding | Murphy''s Turf Colorado',
  'Thicken your Colorado lawn with altitude-adapted grass seed blends. Slit-seeding for maximum germination. Starting at $150. Free estimates.'
),

-- Fertilization
(
  'fertilization',
  'Fertilization',
  'Targeted nutrient programs designed for Colorado soil chemistry and growing seasons.',
  'Colorado soils are typically alkaline and iron-deficient, which means a generic fertilizer program won''t cut it. Our fertilization service starts with a soil test so we know exactly what your lawn needs. We then apply the right blend of nitrogen, phosphorus, potassium, and micronutrients at the right time — synced to Colorado''s short but intense growing season from April through October.',
  'flask',
  85.00,
  ARRAY[
    'Custom blends based on actual soil test results, not guesswork',
    'Corrects iron chlorosis that causes yellow, pale grass at altitude',
    'Slow-release formulas reduce burn risk in Colorado''s dry climate',
    'Seasonal timing aligned with Front Range growing patterns',
    'Promotes deep green color and vigorous growth'
  ],
  ARRAY[
    'Soil pH and nutrient analysis (first visit)',
    'Customized fertilizer blend mixed for your lawn''s specific needs',
    'Professional broadcast application with calibrated spreader',
    'Iron supplement treatment for chlorosis-prone areas',
    'Written fertilization schedule for the remainder of the season'
  ],
  4, true,
  'Lawn Fertilization Programs for Colorado Soil | Murphy''s Turf',
  'Soil-tested fertilization programs built for alkaline Colorado soil. Correct iron deficiency, feed your lawn right. Starting at $85.'
),

-- Pest Control
(
  'pest-control',
  'Pest Control',
  'Integrated pest management to protect your lawn from grubs, mites, and other Colorado turf threats.',
  'From white grubs that destroy root systems to clover mites that invade homes every spring, Colorado lawns face a unique set of pest pressures. Our integrated pest management approach identifies the specific pests in your yard, applies targeted treatments, and establishes preventive barriers — all while minimizing chemical use around kids, pets, and pollinators.',
  'shield',
  95.00,
  ARRAY[
    'Targets Colorado-specific pests: grubs, billbugs, clover mites, sod webworms',
    'Pet-safe and pollinator-conscious treatment options available',
    'Preventive applications stop infestations before visible damage',
    'Reduces need for repeated treatments with long-lasting barriers'
  ],
  ARRAY[
    'Full lawn inspection and pest identification',
    'Targeted granular or liquid treatment based on pest type',
    'Perimeter barrier application around foundation (spring/fall)',
    'Grub preventive treatment (applied late spring)',
    'Follow-up inspection within 14 days at no extra charge'
  ],
  5, true,
  'Lawn Pest Control — Grubs, Mites & More | Murphy''s Turf Colorado',
  'Integrated pest management for Colorado lawns. We target grubs, clover mites, sod webworms, and more. Pet-safe options. Starting at $95.'
),

-- Seasonal Maintenance
(
  'seasonal-maintenance',
  'Seasonal Maintenance',
  'Year-round lawn care packages that handle spring startup, summer upkeep, fall prep, and winter protection.',
  'Colorado''s extreme seasonal swings — from 90-degree summer days to sub-zero winter nights — demand a proactive maintenance strategy. Our seasonal packages bundle the right services at the right time: spring cleanup and pre-emergent, summer mowing and irrigation management, fall aeration and overseeding, and winter dormancy prep. One plan, no guesswork, a great-looking lawn year-round.',
  'calendar',
  199.00,
  ARRAY[
    'Eliminates the hassle of scheduling individual services throughout the year',
    'Bundled pricing saves 15–20% compared to booking services separately',
    'Proactive care prevents problems before they become expensive repairs',
    'Customized to your lawn''s specific grass type, soil, and sun exposure',
    'Priority scheduling during peak spring and fall seasons'
  ],
  ARRAY[
    'Spring cleanup, pre-emergent weed control, and first fertilization',
    'Summer mowing schedule coordination and irrigation audit',
    'Fall core aeration, overseeding, and winterizer fertilizer',
    'End-of-season leaf removal and dormancy preparation',
    'Year-round monitoring with seasonal adjustment recommendations'
  ],
  6, true,
  'Seasonal Lawn Maintenance Plans | Murphy''s Turf Colorado',
  'All-inclusive seasonal lawn care for Colorado homes. Spring through winter coverage with bundled savings. Starting at $199/visit. Free consultation.'
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

-- Denver
(
  'denver',
  'Denver',
  'Murphy''s Turf has been serving Denver homeowners since day one. From the historic bungalow lawns of Park Hill to the modern landscapes of Stapleton, we understand the unique challenges of maintaining turf in the Mile High City — intense UV, clay soil, water restrictions, and unpredictable late-spring snow. Our Denver crews live and work in the neighborhoods they serve.',
  '2901 Blake St, Suite 100, Denver, CO 80205',
  '(720) 555-0147',
  ARRAY['Capitol Hill', 'Cherry Creek', 'Highlands', 'Park Hill', 'Washington Park', 'Stapleton'],
  'We serve all Denver neighborhoods inside the city limits, from Globeville and RiNo in the north to Hampden and Southmoor in the south, and everything between Lakewood border and Aurora border.',
  true,
  'Lawn Care Services in Denver, CO | Murphy''s Turf',
  'Professional lawn care in Denver. Aeration, seeding, fertilization, and more for Mile High City yards. Serving Capitol Hill, Cherry Creek, Highlands & beyond.'
),

-- Colorado Springs
(
  'colorado-springs',
  'Colorado Springs',
  'Our Colorado Springs operation covers the Pikes Peak region from Monument to Fountain. The Springs sits at 6,035 feet with unique microclimates — from the dry west side near Garden of the Gods to the windswept plains east of Powers Blvd. We tailor every treatment plan to your specific elevation, exposure, and soil conditions.',
  '102 S Tejon St, Suite 200, Colorado Springs, CO 80903',
  '(719) 555-0293',
  ARRAY['Briargate', 'Old Colorado City', 'Broadmoor', 'Manitou Springs', 'Rockrimmon'],
  'Our Colorado Springs service area spans from Monument and Black Forest in the north to Fountain and Security-Widefield in the south, including Manitou Springs, Woodland Park approaches, and the entire Powers corridor.',
  true,
  'Lawn Care Services in Colorado Springs, CO | Murphy''s Turf',
  'Expert lawn care in Colorado Springs. We handle Pikes Peak region soil, altitude, and climate challenges. Serving Briargate, Broadmoor, Old Colorado City & more.'
),

-- Aurora
(
  'aurora',
  'Aurora',
  'Aurora stretches across three counties and features some of the most diverse landscapes on the Front Range — from established neighborhoods with mature trees near Colfax to brand-new developments in Southlands and Tallyn''s Reach where builders often leave lawns with compacted subsoil and minimal topsoil. We know how to work with what you''ve got.',
  '14200 E Alameda Ave, Suite 110, Aurora, CO 80012',
  '(720) 555-0381',
  ARRAY['Southlands', 'Saddle Rock', 'Tallyn''s Reach', 'Heather Ridge', 'Mission Viejo'],
  'We cover all of Aurora from the Colfax corridor south to E-470, and from the Denver border east to Watkins and Bennett. This includes Centennial-adjacent areas, Smoky Hill, and the Quincy reservoir neighborhood.',
  true,
  'Lawn Care Services in Aurora, CO | Murphy''s Turf',
  'Professional lawn care across Aurora, CO. From new-build yards to established neighborhoods, we deliver results. Serving Southlands, Saddle Rock & more.'
),

-- Lakewood
(
  'lakewood',
  'Lakewood',
  'Lakewood''s proximity to the foothills means more variable terrain, more shade from mature pines, and slightly different soil profiles than Denver proper. Our Lakewood team specializes in the sloped lots, shady yards, and rocky soil that define the Green Mountain and Bear Creek areas. We also serve the flatter, sunnier eastern neighborhoods near Belmar and Applewood.',
  '355 S Teller St, Suite 150, Lakewood, CO 80226',
  '(303) 555-0462',
  ARRAY['Green Mountain', 'Bear Creek', 'Belmar', 'Applewood', 'Lakewood Gulch'],
  'Our Lakewood coverage includes everything from the Sixth Avenue corridor to Hampden, and from Sheridan Blvd west to the C-470 foothills communities including parts of Morrison and Indian Hills approaches.',
  true,
  'Lawn Care Services in Lakewood, CO | Murphy''s Turf',
  'Lakewood lawn care specialists. We handle foothills terrain, shady yards, and rocky soil. Serving Green Mountain, Bear Creek, Belmar, Applewood & beyond.'
),

-- Boulder
(
  'boulder',
  'Boulder',
  'Boulder''s environmental ethos runs deep, and so does ours. Our Boulder operation prioritizes organic-forward fertilization, water-wise practices, and pollinator-friendly pest management. We serve everything from the compact yards of University Hill to the sprawling lots of Gunbarrel, adapting to Boulder''s unique microclimate where Chinook winds can swing temperatures 40 degrees in a single afternoon.',
  '1942 Broadway, Suite 300, Boulder, CO 80302',
  '(303) 555-0518',
  ARRAY['University Hill', 'North Boulder', 'South Boulder', 'Table Mesa', 'Gunbarrel'],
  'We serve the City of Boulder, unincorporated Boulder County including Gunbarrel and Niwot, plus Louisville, Superior, and Lafayette. Our crews are familiar with Boulder''s water-use regulations and xeriscaping ordinances.',
  true,
  'Lawn Care Services in Boulder, CO | Murphy''s Turf',
  'Eco-conscious lawn care in Boulder. Organic-forward fertilization, water-wise practices, pollinator-safe pest control. Serving University Hill to Gunbarrel.'
),

-- Fort Collins
(
  'fort-collins',
  'Fort Collins',
  'Fort Collins and the northern Front Range get slightly more precipitation than Denver, but the trade-off is colder winters and a shorter growing season. Our Fort Collins crews time every service — from first fertilizer to final winterizer — to the specific climate window of Larimer County. We also serve the fast-growing communities of Timnath and Windsor.',
  '215 W Oak St, Suite 100, Fort Collins, CO 80521',
  '(970) 555-0634',
  ARRAY['Old Town', 'Midtown', 'Fossil Creek', 'Timnath', 'Windsor'],
  'Our northern Colorado coverage extends from Fort Collins proper through Timnath, Windsor, and Loveland. We also serve Wellington to the north and Berthoud to the south along the I-25 corridor.',
  true,
  'Lawn Care Services in Fort Collins, CO | Murphy''s Turf',
  'Professional lawn care in Fort Collins and northern Colorado. Tuned to Larimer County''s climate. Serving Old Town, Timnath, Windsor, Fossil Creek & more.'
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
  'Karen Lindstrom',
  'Washington Park, Denver',
  5,
  'We bought our Wash Park bungalow three years ago and the lawn was mostly crabgrass and bare dirt. Murphy''s Turf came out, did a soil test, aerated, overseeded with a bluegrass blend, and put us on a fertilization schedule. By the second summer our neighbors were asking what our secret was. Honestly the best investment we''ve made in this house besides the kitchen remodel.',
  'seasonal-maintenance',
  true, true
),
(
  'David and Maria Espinoza',
  'Briargate, Colorado Springs',
  5,
  'After our builder left us with six inches of clay and a prayer, Murphy''s Turf transformed our yard from a mud pit into an actual lawn. They aerated twice in the first year, brought in compost topdressing, and seeded with a fescue-bluegrass mix that handles our wind and sun exposure. Two years in and the grass is thick, green, and our kids practically live on it all summer. Worth every penny.',
  'aeration',
  true, true
),
(
  'Tom Nguyen',
  'Old Town, Fort Collins',
  5,
  'I''m a bit of a lawn nerd and I was skeptical about handing things over to a service. But Murphy''s team actually knew more about northern Colorado soil chemistry than I did. They identified an iron deficiency I''d been misdiagnosing as nitrogen shortage for two years. Three treatments later my lawn went from yellow-green to the darkest green on the block. These guys know their stuff.',
  'fertilization',
  true, true
),

-- Standard testimonials
(
  'Rachel Whitfield',
  'Cherry Creek, Denver',
  5,
  'Murphy''s Turf cleaned up our yard after a massive cottonwood drop in June. They were out within two days of my call, removed everything including the stuff tangled in the flower beds, and the lawn looked better than it had all spring. Very professional crew — they even moved our patio furniture back exactly where it was.',
  'lawn-cleaning',
  false, true
),
(
  'Mike Hannigan',
  'Saddle Rock, Aurora',
  4,
  'Good service overall. The aeration made a visible difference in how fast water soaks in — we used to get puddles by the back fence and now the water actually goes into the ground. Only reason for four stars instead of five is scheduling took a bit longer than expected during their fall rush, but the work itself was solid.',
  'aeration',
  false, true
),
(
  'Jennifer Castillo',
  'Table Mesa, Boulder',
  5,
  'I specifically chose Murphy''s Turf because they offered organic fertilizer options. Living in Boulder, I didn''t want harsh chemicals around my garden or the bees. Their organic program took a little longer to show results compared to synthetic, but by midsummer the lawn was gorgeous and I felt good about what was going into the soil. They also gave me great watering tips that cut my bill down.',
  'fertilization',
  false, true
),
(
  'Brian Kowalski',
  'Green Mountain, Lakewood',
  4,
  'Our lot has a steep slope in the backyard that other companies didn''t want to deal with. Murphy''s Turf came out, assessed the grade, and did a combination of aeration and overseeding with a deep-root fescue that''s actually holding the soil better now. Still working on full coverage on the steepest section, but huge improvement from where we started.',
  'seeding',
  false, true
),
(
  'Amanda Reyes',
  'Highlands, Denver',
  5,
  'Clover mites were invading our house every spring — hundreds of tiny red dots on the windowsills. Murphy''s Turf did a perimeter treatment and lawn application that knocked them out completely. For the first time in three years we had a mite-free April. They also explained why our south-facing foundation wall was the entry point, which no one else had bothered to do.',
  'pest-control',
  false, true
),
(
  'Greg Johannsen',
  'Fossil Creek, Fort Collins',
  5,
  'Signed up for the seasonal maintenance plan last March and it''s been the best lawn care decision I''ve made. I don''t have to think about what needs doing or when — they just show up, do great work, and leave a door tag telling me what was done. My lawn survived last summer''s heat wave better than anyone else''s on the street.',
  'seasonal-maintenance',
  false, true
),
(
  'Priya Sharma',
  'Stapleton, Denver',
  4,
  'We''re in a newer Stapleton development where the soil is basically construction fill with an inch of sod on top. Murphy''s Turf was honest about the challenges and set realistic expectations. After a full season of aeration, topdressing, and targeted fertilization, the lawn is finally starting to fill in and actually feel like real grass. Appreciate their honesty and patience.',
  'seeding',
  false, true
),
(
  'Steve Caldwell',
  'Applewood, Lakewood',
  5,
  'Had a grub problem that was destroying patches of our front lawn — you could literally peel the sod back like a carpet. Murphy''s Turf identified the species, treated with a targeted grub control, and reseeded the damaged areas. Within six weeks the dead patches were filling in. They came back for a free follow-up inspection too. Stand-up company.',
  'pest-control',
  false, true
),
(
  'Lisa Tran',
  'North Boulder, Boulder',
  5,
  'Murphy''s Turf did a full spring cleanup for us after a brutal winter with multiple heavy snows. Broken branches everywhere, leaves that never got picked up in November, matted grass underneath it all. They cleared everything, dethatched the worst areas, and got us set up for the season. Our yard went from depressing to inviting in a single visit. Highly recommend.',
  'lawn-cleaning',
  false, true
);


-- =============================================================================
-- 4. FAQs
-- =============================================================================

INSERT INTO faqs (
  question, answer, category, sort_order, is_active,
  service_slug, location_slug
) VALUES

-- GENERAL (5)
(
  'What areas of Colorado does Murphy''s Turf serve?',
  'We currently serve six major metro areas along the Front Range: Denver, Colorado Springs, Aurora, Lakewood, Boulder, and Fort Collins. Within each city we cover the surrounding suburbs and unincorporated areas as well. Check our Locations page for a full list of neighborhoods, or give us a call — if you''re within about 15 miles of one of our offices, we can probably get to you.',
  'general', 1, true,
  NULL, NULL
),
(
  'Are your lawn care products safe for kids and pets?',
  'Yes. All of our standard products are EPA-registered and applied according to label directions, which means they are safe for children and pets once dry — typically within 1-2 hours. For customers who prefer an extra layer of caution, we offer organic and reduced-risk product options in our fertilization and pest control programs. Just let us know your preferences when you schedule.',
  'general', 2, true,
  NULL, NULL
),
(
  'Do I need to be home when Murphy''s Turf comes for service?',
  'No, you don''t need to be home. We just need access to your yard. If your property has a locked gate, you can provide a gate code or leave it unlocked on your service day. We''ll leave a detailed door hanger after each visit summarizing the work completed and any recommendations. You''ll also get an email confirmation with notes from the technician.',
  'general', 3, true,
  NULL, NULL
),
(
  'How does Colorado''s altitude and climate affect my lawn?',
  'Colorado''s combination of high altitude (5,000-7,500 ft along the Front Range), intense UV radiation, low humidity, alkaline clay soils, and extreme temperature swings creates a uniquely challenging environment for turf grass. Cool-season grasses like Kentucky Bluegrass and Tall Fescue do best here, but they need proper soil preparation, appropriate watering, and season-specific nutrient programs. That''s exactly what we specialize in.',
  'general', 4, true,
  NULL, NULL
),
(
  'What is your satisfaction guarantee?',
  'If you''re not happy with any service, contact us within 48 hours and we''ll come back to make it right at no additional charge. We stand behind every treatment and application. For our seasonal maintenance customers, if your lawn doesn''t show measurable improvement within the first full season, we''ll credit your next quarter of service.',
  'general', 5, true,
  NULL, NULL
),

-- PRICING (5)
(
  'How much does lawn aeration cost in Colorado?',
  'Our core aeration service starts at $125 for a standard residential lawn up to 5,000 sq ft. Larger properties are priced based on total turf area — most homes in the Denver metro fall between $125 and $250. We offer a 15% discount when you bundle aeration with overseeding, which is our most popular fall combination. Request a free estimate for exact pricing.',
  'pricing', 1, true,
  'aeration', 'denver'
),
(
  'Do you offer free estimates?',
  'Absolutely. Every new customer gets a free on-site estimate where we assess your lawn''s size, condition, soil type, and specific needs. There''s no obligation and no pressure. We''ll provide a written quote within 24 hours of the visit. You can request an estimate through our website, by phone, or by text.',
  'pricing', 2, true,
  NULL, NULL
),
(
  'Are seasonal maintenance plans cheaper than individual services?',
  'Yes, our seasonal maintenance plans save you 15-20% compared to booking each service individually. The exact savings depend on your lawn''s size and the services included, but most homeowners save $200-400 over the course of a full year. Plus, you get priority scheduling during our busiest months (April-May and September-October) when individual bookings can have 2-3 week wait times.',
  'pricing', 3, true,
  'seasonal-maintenance', NULL
),
(
  'Do you charge extra for hard-to-access or sloped yards?',
  'In most cases, no. Standard slopes, fenced yards, and narrow access points are all part of normal service. We may add a small surcharge (typically $25-50) for extreme slopes that require specialized equipment, properties where we cannot fit standard equipment through gates, or yards that require significant manual labor beyond the norm. We''ll always discuss this upfront during your estimate.',
  'pricing', 4, true,
  NULL, 'lakewood'
),
(
  'What payment methods do you accept?',
  'We accept all major credit cards (Visa, Mastercard, Amex, Discover), ACH bank transfers, checks, and digital wallets (Apple Pay, Google Pay) through our online portal. Seasonal maintenance customers can set up autopay for a hassle-free experience. We send invoices via email after each service, with net-15 terms for residential and net-30 for commercial accounts.',
  'pricing', 5, true,
  NULL, NULL
),

-- SERVICES (5)
(
  'When is the best time to aerate my lawn in Colorado?',
  'The ideal window for core aeration along the Front Range is early September through mid-October, when cool-season grasses are entering their strongest growth phase and the soil is still warm enough for root recovery. A secondary window exists in late April through May. Fall aeration pairs perfectly with overseeding because the open cores give seeds direct soil contact. We recommend avoiding summer aeration, as heat stress makes recovery difficult.',
  'services', 1, true,
  'aeration', NULL
),
(
  'What grass seed types work best at Colorado''s altitude?',
  'For most Front Range lawns between 5,000 and 7,500 feet, we recommend a blend of Kentucky Bluegrass (for density and self-repair), Tall Fescue (for drought tolerance and deep roots), and Perennial Ryegrass (for fast germination and fill). The exact ratio depends on your sun exposure, soil, and water availability. Shady areas may benefit from Fine Fescue additions. We never use warm-season grasses like Bermuda, which can''t survive Colorado winters.',
  'services', 2, true,
  'seeding', NULL
),
(
  'How often should I fertilize my Colorado lawn?',
  'Most Colorado lawns do best with 4-5 fertilizer applications per year: a light feeding in late April, a balanced application in late May, a summer maintenance dose in July (if irrigated), a fall growth application in September, and a winterizer in late October or early November. Over-fertilizing is a common mistake — it promotes shallow roots and increases water demand, which is the opposite of what you want in our semi-arid climate.',
  'services', 3, true,
  'fertilization', NULL
),
(
  'What pests should I watch for in my Colorado lawn?',
  'The most common lawn pests along the Front Range are white grubs (Japanese beetle and masked chafer larvae), billbugs, sod webworms, and clover mites. Grubs cause the most damage — they eat grass roots underground, creating dead patches you can pull up like loose carpet. Clover mites are more of a nuisance pest that invades homes in spring and fall. We recommend a preventive grub treatment in late May and targeted treatment for other pests as identified.',
  'services', 4, true,
  'pest-control', NULL
),
(
  'What does your seasonal maintenance plan include in winter?',
  'While your lawn is dormant from November through March, our seasonal plan includes a late-fall winterizer fertilizer application, final leaf cleanup, irrigation system blowout coordination (we''ll schedule with your irrigation company or do it ourselves if you prefer), and a winter dormancy assessment. In early spring, we''re the first ones out with pre-emergent weed control so crabgrass and spurge don''t get a foothold before your grass wakes up.',
  'services', 5, true,
  'seasonal-maintenance', NULL
),

-- SCHEDULING (5)
(
  'How far in advance should I book aeration in the fall?',
  'We strongly recommend booking fall aeration by mid-August. September and October are our busiest months, and slots fill up fast — especially on weekends. Seasonal maintenance customers get priority scheduling, so they''re locked in before we open the calendar to individual bookings. If you''re calling in late September, we can usually still fit you in, but you may have less flexibility on specific dates.',
  'scheduling', 1, true,
  'aeration', NULL
),
(
  'Can I schedule service for a specific day and time?',
  'We schedule by day rather than specific time windows. On your service day, our crews typically work between 8:00 AM and 5:00 PM. We can accommodate morning-only or afternoon-only requests when possible, but we can''t guarantee exact arrival times due to the nature of route-based scheduling. You''ll receive a text notification when our crew is en route to your property.',
  'scheduling', 2, true,
  NULL, NULL
),
(
  'What happens if it rains on my scheduled service day?',
  'Light rain generally doesn''t affect our services — in fact, aeration and seeding actually benefit from moist soil. However, we''ll reschedule if there''s heavy rain, lightning, or standing water that would cause equipment to damage your lawn. If we need to reschedule, we''ll notify you by text and get you on the next available day, usually within 2-3 business days.',
  'scheduling', 3, true,
  NULL, NULL
),
(
  'How do I reschedule or cancel a service visit?',
  'You can reschedule or cancel through our online customer portal, by calling our office, or by replying to your appointment confirmation text. We ask for at least 24 hours'' notice for rescheduling. Cancellations within 24 hours of service may incur a $35 trip fee if our crew has already been dispatched. Seasonal maintenance customers can pause service for up to 30 days without affecting their plan.',
  'scheduling', 4, true,
  NULL, NULL
),
(
  'Do you offer service on weekends in the Denver area?',
  'Yes, we offer Saturday service in Denver and most of our metro locations. Saturday slots are limited and tend to book up 2-3 weeks in advance, so plan ahead if weekends are your only option. We do not currently offer Sunday service. For our Fort Collins and Colorado Springs locations, Saturday availability is seasonal — available April through October.',
  'scheduling', 5, true,
  NULL, 'denver'
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
  'James', 'Moreno',
  'james.moreno@gmail.com', '(720) 555-8812',
  '4521 Vine St', 'Denver', 'CO', '80216',
  'aeration',
  'Just moved into a Park Hill home with a yard that hasn''t been maintained in at least a year. The soil is rock hard and the grass is mostly dead. Looking for aeration and seeding — wondering if you can come take a look this week and give me a quote. Yard is about 4,000 sq ft front and back combined.',
  'new',
  'google', 'cpc', 'denver-aeration-spring'
),

-- Contacted lead
(
  'Samantha', 'O''Brien',
  'sobrien.designs@outlook.com', '(719) 555-4467',
  '1809 N Cascade Ave', 'Colorado Springs', 'CO', '80907',
  'seasonal-maintenance',
  'Interested in your seasonal maintenance plan. We have a large corner lot in Old Colorado City with established bluegrass that needs consistent care. I work from home so scheduling is flexible. Would love to understand what a full-year plan would look like and cost for about 7,500 sq ft of turf.',
  'contacted',
  'facebook', 'social', 'spring-seasonal-promo'
),

-- Qualified lead
(
  'Robert', 'Kim',
  'rkim.boulder@protonmail.com', '(303) 555-2290',
  '3200 Moorhead Ave', 'Boulder', 'CO', '80305',
  'fertilization',
  'We''re in South Boulder and have been doing our own fertilization but the lawn still looks pale and thin, especially in the front yard which gets full afternoon sun. A neighbor recommended you. I''d like to get a soil test done and switch to a professional program. We also have two dogs and a vegetable garden, so organic options are important to us.',
  'qualified',
  NULL, NULL, NULL
),

-- Converted lead
(
  'Michelle', 'Trujillo',
  'mtrujillo77@yahoo.com', '(303) 555-6138',
  '690 Parfet St', 'Lakewood', 'CO', '80215',
  'pest-control',
  'Grubs destroyed about a third of our front lawn last August. We treated ourselves with a big-box store product but they''re back this year. Need professional treatment ASAP before they do more damage. Also need to reseed the dead patches once the grubs are handled. House backs up to Bear Creek greenbelt if that matters for treatment type.',
  'converted',
  'google', 'organic', NULL
),

-- Lost lead
(
  'Tyler', 'Brandt',
  'tyler.brandt@colostate.edu', '(970) 555-9903',
  '2112 Stover St', 'Fort Collins', 'CO', '80525',
  'lawn-cleaning',
  'Renting a house near CSU campus and the landlord wants us to handle spring cleanup. Looking for a one-time leaf and debris removal — the yard is small, maybe 2,000 sq ft. Honestly just need the cheapest option to satisfy the lease requirement. Can you send a quote?',
  'lost',
  'google', 'cpc', 'fort-collins-cleanup'
);
