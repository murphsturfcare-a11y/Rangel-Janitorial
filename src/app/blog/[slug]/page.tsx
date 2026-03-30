import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  List,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Author {
  name: string;
  role: string;
  bio: string;
}

interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  author: Author;
  publishDate: string;
  readingTime: string;
  featuredGradient: string;
  headings: string[];
  content: string;
  relatedSlugs: string[];
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

const authors: Record<string, Author> = {
  "Rangel Janitorial Team": {
    name: "Rangel Janitorial Team",
    role: 'Commercial Cleaning Specialists',
    bio: "The Rangel Janitorial team brings 30+ years of commercial cleaning and facility maintenance expertise to businesses across California.",
  },
};

// ---------------------------------------------------------------------------
// Blog Post Data
// ---------------------------------------------------------------------------

const blogPosts: Record<string, BlogPost> = {
  'office-cleaning-best-practices': {
    slug: 'office-cleaning-best-practices',
    title: 'Office Cleaning Best Practices for a Healthier Workplace',
    metaDescription:
      'Essential office cleaning practices that promote employee health, productivity, and professional impressions. Learn what top janitorial companies focus on.',
    category: 'Janitorial Tips',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'March 15, 2026',
    readingTime: '8 min read',
    featuredGradient: 'from-sage via-forest to-forest-dark',
    headings: [
      'Why Office Cleanliness Matters',
      'Key Areas to Focus On',
      'Restrooms and High-Touch Surfaces',
      'Break Rooms and Common Areas',
      'Creating a Cleaning Schedule',
      'When to Call a Professional',
    ],
    content: `
      <h2 id="why-office-cleanliness-matters" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Office Cleanliness Matters</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">A clean office is more than just aesthetically pleasing — it directly impacts employee health, productivity, and the impression your business makes on clients and visitors. Studies consistently show that clean workplaces reduce sick days, improve morale, and create positive first impressions.</p>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">High-touch surfaces like doorknobs, elevator buttons, light switches, and shared equipment can harbor bacteria and viruses that spread illness throughout your team. Regular, thorough cleaning of these surfaces is essential for maintaining a healthy work environment.</p>

      <h2 id="key-areas-to-focus-on" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Key Areas to Focus On</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Not all areas of your office require the same level of attention. Understanding which zones need the most frequent cleaning helps you allocate resources effectively and maintain consistent cleanliness throughout your facility.</p>

      <h2 id="restrooms-and-high-touch-surfaces" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Restrooms and High-Touch Surfaces</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Restrooms are the number one area visitors and employees judge your facility by. Regular sanitation, restocking of supplies, and attention to detail make all the difference. A poorly maintained restroom can undermine an otherwise professional facility.</p>

      <h2 id="break-rooms-and-common-areas" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Break Rooms and Common Areas</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Shared kitchen and break room areas accumulate bacteria quickly from food preparation, spills, and frequent use. Daily cleaning of counters, sinks, appliance handles, and tables is essential to prevent bacterial buildup and maintain a pleasant environment for employees.</p>

      <h2 id="creating-a-cleaning-schedule" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Creating a Cleaning Schedule</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">The most effective cleaning programs combine daily maintenance with periodic deep cleaning. Daily tasks should include trash removal, restroom sanitation, and surface wiping. Weekly tasks might include <a href="/services/floor-care" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">floor care</a> and detailed dusting. Monthly or quarterly tasks should include <a href="/services/carpet-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">carpet cleaning</a>, floor stripping and waxing, and window cleaning.</p>

      <h2 id="when-to-call-a-professional" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">When to Call a Professional</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">While basic tidying can be handled in-house, professional <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial cleaning services</a> deliver a level of thoroughness and consistency that most internal teams cannot match. Professional crews have the training, equipment, and products to maintain your facility at the highest standard.</p>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Contact your local Rangel Janitorial office to schedule a free consultation — visit <a href="/locations" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">rangeljanitorial.com/locations</a> to find the team nearest you.</p>
    `,
    relatedSlugs: ['janitorial-services-sacramento', 'day-porter-benefits', 'choosing-commercial-cleaning-company'],
  },

  'janitorial-services-sacramento': {
    slug: 'janitorial-services-sacramento',
    title: 'Janitorial Services in Sacramento: What to Look For',
    metaDescription:
      'A guide for Sacramento businesses seeking reliable janitorial services. What to expect, key questions to ask, and how to evaluate commercial cleaning companies.',
    category: 'Local Guides',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'March 8, 2026',
    readingTime: '7 min read',
    featuredGradient: 'from-amber-500 via-orange-400 to-yellow-400',
    headings: [
      'Finding the Right Janitorial Service',
      'Experience and References',
      'Insurance and Bonding',
      'Customized Cleaning Plans',
      'Sacramento-Specific Considerations',
    ],
    content: `
      <h2 id="finding-the-right-janitorial-service" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Finding the Right Janitorial Service</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Finding the right <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial service</a> for your <a href="/locations/sacramento" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Sacramento</a> business can be challenging. With many options available, knowing what to look for helps you make the right choice for your facility and budget.</p>

      <h2 id="experience-and-references" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Experience and References</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Look for a company with a proven track record. Ask for references from facilities similar to yours and follow up with them. A company with decades of experience has seen every cleaning challenge and knows how to handle them efficiently.</p>

      <h2 id="insurance-and-bonding" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Insurance and Bonding</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Ensure your janitorial provider carries comprehensive general liability insurance and workers compensation coverage. This protects you in case of accidents or damage during cleaning.</p>

      <h2 id="customized-cleaning-plans" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Customized Cleaning Plans</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Every facility is different. A good janitorial company will assess your specific needs and create a customized cleaning plan rather than offering a one-size-fits-all approach. Services like <a href="/services/day-porter" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">day porter</a> and <a href="/services/floor-care" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">floor care</a> can be tailored to your facility's unique requirements.</p>

      <h2 id="sacramento-specific-considerations" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Sacramento-Specific Considerations</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Sacramento's Central Valley climate means dust is a constant challenge, especially during dry summer months. Your janitorial provider should understand these regional factors and adjust their approach accordingly.</p>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Contact Rangel Janitorial Sacramento at (916) 426-2311 for a free consultation.</p>
    `,
    relatedSlugs: ['office-cleaning-best-practices', 'commercial-cleaning-murrieta', 'janitorial-services-walnut-creek'],
  },

  'commercial-cleaning-murrieta': {
    slug: 'commercial-cleaning-murrieta',
    title: 'Commercial Cleaning in Murrieta & the Inland Empire',
    metaDescription:
      'Why Inland Empire businesses trust Rangel Janitorial for their commercial cleaning needs. Services, reliability, and what sets us apart in Murrieta and Temecula.',
    category: 'Local Guides',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'February 25, 2026',
    readingTime: '6 min read',
    featuredGradient: 'from-sky-500 via-blue-400 to-cyan-400',
    headings: [
      'Our Inland Empire Services',
      'Why Local Businesses Choose Rangel Janitorial',
      'Facility Types We Serve',
      'Getting Started',
    ],
    content: `
      <h2 id="our-inland-empire-services" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Our Inland Empire Services</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">We provide comprehensive commercial cleaning for offices, medical facilities, fitness centers, and multi-unit complexes throughout <a href="/locations/murrieta" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Murrieta</a>, Temecula, Menifee, Lake Elsinore, and surrounding communities.</p>

      <h2 id="why-local-businesses-choose-rangel-janitorial" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Local Businesses Choose Rangel Janitorial</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">With our headquarters in Murrieta, we understand the local market and the unique needs of Inland Empire businesses. Our 30+ years of experience, combined with our commitment to quality and reliability, make us the trusted choice for commercial cleaning in the region.</p>

      <h2 id="facility-types-we-serve" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Facility Types We Serve</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">We serve Class A office buildings, corporate campuses, light industrial parks, medical and dental facilities, municipalities, fitness centers, and multi-unit complexes. Our services include <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial cleaning</a>, <a href="/services/day-porter" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">day porter</a>, and <a href="/services/electrostatic-disinfection" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">electrostatic disinfection</a>.</p>

      <h2 id="getting-started" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Getting Started</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Contact Rangel Janitorial Murrieta at (951) 331-3300 for a free, no-obligation quote tailored to your facility.</p>
    `,
    relatedSlugs: ['janitorial-services-sacramento', 'day-porter-benefits', 'janitorial-services-walnut-creek'],
  },

  'day-porter-benefits': {
    slug: 'day-porter-benefits',
    title: 'The Benefits of Day Porter Services for Your Facility',
    metaDescription:
      'How day porter services keep your facility looking its best throughout the business day. Real-time cleaning, restroom maintenance, and common area upkeep.',
    category: 'Janitorial Tips',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'February 18, 2026',
    readingTime: '6 min read',
    featuredGradient: 'from-rose-500 via-pink-400 to-fuchsia-400',
    headings: [
      'What Day Porters Do',
      'Who Benefits Most',
      'Day Porter vs Nightly Cleaning',
      'The ROI of Day Porter Services',
    ],
    content: `
      <h2 id="what-day-porters-do" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">What Day Porters Do</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4"><a href="/services/day-porter" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Day porters</a> handle real-time cleaning needs during business hours including lobby maintenance, restroom monitoring and restocking, break room cleaning, conference room turnover, spill cleanup, and trash management.</p>

      <h2 id="who-benefits-most" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Who Benefits Most</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Facilities with heavy foot traffic benefit the most from day porter services. This includes corporate lobbies, medical offices, fitness centers, retail spaces, and multi-tenant buildings where a single nightly cleaning is not enough.</p>

      <h2 id="day-porter-vs-nightly-cleaning" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Day Porter vs Nightly Cleaning</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Nightly <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial cleaning</a> provides a thorough deep clean after business hours. Day porter service supplements this by maintaining cleanliness during operating hours. The most effective facility maintenance programs use both services together.</p>

      <h2 id="the-roi-of-day-porter-services" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">The ROI of Day Porter Services</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">A consistently clean facility improves tenant retention, reduces complaints, and creates a professional environment that supports your business goals. Contact Rangel Janitorial to learn more about our day porter services.</p>
    `,
    relatedSlugs: ['office-cleaning-best-practices', 'commercial-cleaning-murrieta', 'electrostatic-disinfection-explained'],
  },

  'electrostatic-disinfection-explained': {
    slug: 'electrostatic-disinfection-explained',
    title: 'Electrostatic Disinfection Explained: How It Works',
    metaDescription:
      'Understanding electrostatic disinfection technology — how it works, why it provides superior coverage, and when your facility needs it.',
    category: 'Janitorial Tips',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'February 10, 2026',
    readingTime: '5 min read',
    featuredGradient: 'from-teal-500 via-emerald-400 to-green-400',
    headings: [
      'The Science Behind Electrostatic Spraying',
      'When Your Facility Needs It',
      'How We Use This Technology',
      'Combining with Regular Janitorial Services',
    ],
    content: `
      <h2 id="the-science-behind-electrostatic-spraying" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">The Science Behind Electrostatic Spraying</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Electrostatic sprayers apply a positive electrical charge to disinfectant droplets as they leave the nozzle. These charged particles are attracted to surfaces, wrapping around objects and coating them evenly on all sides — including hard-to-reach areas that manual wiping often misses.</p>

      <h2 id="when-your-facility-needs-it" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">When Your Facility Needs It</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4"><a href="/services/electrostatic-disinfection" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Electrostatic disinfection</a> is particularly valuable for medical facilities, fitness centers, schools, and any building where infection control is a priority. The technology provides a level of coverage that traditional cleaning methods simply cannot match.</p>

      <h2 id="how-we-use-this-technology" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">How We Use This Technology</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Rangel Janitorial uses hospital-grade disinfectants applied through professional electrostatic spraying equipment. A single technician can treat an entire office floor in minutes, making it practical for regular application as part of your ongoing maintenance program.</p>

      <h2 id="combining-with-regular-janitorial-services" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Combining with Regular Janitorial Services</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">We recommend electrostatic disinfection as a complement to regular <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial cleaning</a>, not a replacement. While daily cleaning removes visible dirt and debris, electrostatic disinfection targets invisible pathogens that standard cleaning may not eliminate. Contact us to learn more about adding this service to your cleaning program.</p>
    `,
    relatedSlugs: ['office-cleaning-best-practices', 'medical-facility-cleaning-standards', 'day-porter-benefits'],
  },

  'floor-care-vct-strip-wax': {
    slug: 'floor-care-vct-strip-wax',
    title: 'Floor Care 101: VCT Strip and Wax Guide',
    metaDescription:
      'Everything you need to know about VCT floor care — strip and wax schedules, maintenance tips, and why professional floor care extends the life of your flooring.',
    category: 'Janitorial Tips',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'February 1, 2026',
    readingTime: '7 min read',
    featuredGradient: 'from-lime-500 via-green-400 to-emerald-400',
    headings: [
      'What is VCT Flooring',
      'Why Strip and Wax Matters',
      'The Professional Process',
      'Maintenance Between Services',
    ],
    content: `
      <h2 id="what-is-vct-flooring" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">What is VCT Flooring</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">VCT (vinyl composition tile) is one of the most common commercial flooring materials, found in offices, schools, medical facilities, and retail spaces. It is durable and cost-effective but requires regular maintenance to look its best.</p>

      <h2 id="why-strip-and-wax-matters" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Strip and Wax Matters</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Over time, foot traffic wears down the protective finish on VCT floors, leaving them looking dull, scratched, and unprofessional. Regular <a href="/services/floor-care" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">strip and wax service</a> removes old finish and applies fresh coats that restore shine and protect the underlying tile.</p>

      <h2 id="the-professional-process" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">The Professional Process</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Professional strip and wax involves removing all old finish down to the bare tile, thoroughly cleaning the surface, and then applying multiple coats of high-quality floor finish. Each coat is allowed to dry before the next is applied, building up a durable, high-gloss protective barrier.</p>

      <h2 id="maintenance-between-services" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Maintenance Between Services</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Between full strip and wax services, regular buffing and spot maintenance keeps floors looking great and extends the life of the finish. Rangel Janitorial also offers <a href="/services/carpet-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">carpet cleaning</a> and ongoing floor maintenance programs tailored to your facility's needs.</p>
    `,
    relatedSlugs: ['office-cleaning-best-practices', 'carpet-cleaning-commercial-buildings', 'choosing-commercial-cleaning-company'],
  },

  'medical-facility-cleaning-standards': {
    slug: 'medical-facility-cleaning-standards',
    title: 'Medical Facility Cleaning Standards You Should Know',
    metaDescription:
      'Cleaning standards and best practices for medical and dental facilities. Infection control, compliance requirements, and what to expect from your janitorial provider.',
    category: 'Industry Insights',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'January 22, 2026',
    readingTime: '8 min read',
    featuredGradient: 'from-violet-500 via-purple-400 to-indigo-400',
    headings: [
      'Why Medical Facility Cleaning is Different',
      'Key Standards and Regulations',
      'Infection Control Protocols',
      'Choosing the Right Janitorial Partner',
    ],
    content: `
      <h2 id="why-medical-facility-cleaning-is-different" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Medical Facility Cleaning is Different</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Medical and dental facilities require a higher standard of cleaning than typical offices. Patient safety, infection control, and regulatory compliance all depend on thorough, consistent cleaning protocols performed by trained professionals.</p>

      <h2 id="key-standards-and-regulations" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Key Standards and Regulations</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Healthcare facilities must comply with cleaning standards set by OSHA, the CDC, and state health departments. Your janitorial provider should be familiar with these requirements and have documented procedures for meeting them.</p>

      <h2 id="infection-control-protocols" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Infection Control Protocols</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Proper infection control in a medical setting requires specific disinfectants, contact times, and cleaning sequences. <a href="/services/electrostatic-disinfection" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Electrostatic disinfection</a> provides superior coverage for exam rooms, waiting areas, and restrooms, each of which has its own protocols that must be followed consistently.</p>

      <h2 id="choosing-the-right-janitorial-partner" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Choosing the Right Janitorial Partner</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">When selecting a <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial company</a> for your medical facility, look for experience in healthcare cleaning, proper training programs, and the ability to document compliance. Rangel Janitorial has extensive experience cleaning medical and dental facilities across California.</p>
    `,
    relatedSlugs: ['electrostatic-disinfection-explained', 'office-cleaning-best-practices', 'choosing-commercial-cleaning-company'],
  },

  'fitness-center-cleaning-guide': {
    slug: 'fitness-center-cleaning-guide',
    title: 'Fitness Center Cleaning: A Complete Guide',
    metaDescription:
      'How to maintain a clean, hygienic fitness center. Equipment sanitization, locker room care, and the cleaning schedule your gym needs.',
    category: 'Industry Insights',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'January 14, 2026',
    readingTime: '6 min read',
    featuredGradient: 'from-green-500 via-lime-400 to-yellow-400',
    headings: [
      'Why Gym Cleanliness Matters',
      'Equipment Sanitization',
      'Locker Rooms and Restrooms',
      'Creating a Cleaning Schedule',
    ],
    content: `
      <h2 id="why-gym-cleanliness-matters" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Gym Cleanliness Matters</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Fitness centers present unique cleaning challenges due to high moisture levels, heavy equipment use, and the potential for bacterial and fungal growth. A clean gym is essential for member retention and health.</p>

      <h2 id="equipment-sanitization" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Equipment Sanitization</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Exercise equipment should be sanitized multiple times daily, especially during peak hours. Professional janitorial services can supplement member wipe-down stations with thorough daily sanitization of all equipment surfaces.</p>

      <h2 id="locker-rooms-and-restrooms" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Locker Rooms and Restrooms</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Locker rooms are high-moisture environments where bacteria and fungi thrive. Daily deep cleaning with appropriate disinfectants, regular grout maintenance, and consistent restocking of supplies are essential.</p>

      <h2 id="creating-a-cleaning-schedule" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Creating a Cleaning Schedule</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Fitness centers benefit from a combination of <a href="/services/day-porter" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">day porter services</a> for real-time maintenance and nightly deep cleaning. <a href="/services/electrostatic-disinfection" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Electrostatic disinfection</a> is also highly effective for gym environments. Rangel Janitorial creates customized cleaning programs for fitness facilities across California.</p>
    `,
    relatedSlugs: ['day-porter-benefits', 'electrostatic-disinfection-explained', 'office-cleaning-best-practices'],
  },

  'choosing-commercial-cleaning-company': {
    slug: 'choosing-commercial-cleaning-company',
    title: 'How to Choose the Right Commercial Cleaning Company',
    metaDescription:
      'Key factors to consider when selecting a commercial cleaning company. Insurance, references, scope of services, and red flags to watch for.',
    category: 'Janitorial Tips',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'January 6, 2026',
    readingTime: '7 min read',
    featuredGradient: 'from-forest via-sage to-sage-light',
    headings: [
      'Key Factors to Consider',
      'Insurance and Liability',
      'Scope of Services',
      'Red Flags to Watch For',
    ],
    content: `
      <h2 id="key-factors-to-consider" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Key Factors to Consider</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Selecting a commercial cleaning company is an important decision that affects your facility's appearance, employee health, and your bottom line. Take time to evaluate your options thoroughly.</p>

      <h2 id="insurance-and-liability" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Insurance and Liability</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Always verify that your cleaning company carries comprehensive general liability insurance, workers compensation, and bonding. Request certificates of insurance and verify them with the insurance provider.</p>

      <h2 id="scope-of-services" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Scope of Services</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Look for a company that offers a full range of services including <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial cleaning</a>, <a href="/services/day-porter" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">day porter</a>, <a href="/services/floor-care" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">floor care</a>, and <a href="/services/carpet-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">carpet cleaning</a>. A single provider for all your cleaning needs simplifies management and ensures consistent quality.</p>

      <h2 id="red-flags-to-watch-for" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Red Flags to Watch For</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Be cautious of companies that offer significantly below-market pricing, cannot provide references, or are vague about their insurance coverage. These can be signs of corners being cut that will ultimately affect the quality of service you receive.</p>
    `,
    relatedSlugs: ['office-cleaning-best-practices', 'janitorial-services-sacramento', 'commercial-cleaning-murrieta'],
  },

  'carpet-cleaning-commercial-buildings': {
    slug: 'carpet-cleaning-commercial-buildings',
    title: 'Carpet Cleaning for Commercial Buildings: What You Need to Know',
    metaDescription:
      'Professional carpet cleaning extends carpet life and improves indoor air quality. Learn about methods, frequency, and what commercial carpet cleaning includes.',
    category: 'Janitorial Tips',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'December 28, 2025',
    readingTime: '6 min read',
    featuredGradient: 'from-emerald-500 via-teal-400 to-cyan-400',
    headings: [
      'Why Commercial Carpet Cleaning Matters',
      'Hot Water Extraction Method',
      'How Often to Clean',
      'Choosing a Carpet Cleaning Provider',
    ],
    content: `
      <h2 id="why-commercial-carpet-cleaning-matters" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Commercial Carpet Cleaning Matters</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Commercial carpets trap dirt, allergens, bacteria, and other contaminants that daily vacuuming cannot remove. Professional <a href="/services/carpet-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">deep carpet cleaning</a> is essential for maintaining appearance, extending carpet life, and improving indoor air quality.</p>

      <h2 id="hot-water-extraction-method" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Hot Water Extraction Method</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Hot water extraction — the method recommended by major carpet manufacturers — uses hot water and cleaning solution injected deep into carpet fibers, then extracted along with embedded dirt and contaminants. This provides the most thorough clean possible.</p>

      <h2 id="how-often-to-clean" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">How Often to Clean</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">High-traffic areas should be professionally cleaned quarterly, while general office areas can typically go six to twelve months between deep cleanings. Regular professional cleaning can double or triple the useful life of commercial carpet.</p>

      <h2 id="choosing-a-carpet-cleaning-provider" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Choosing a Carpet Cleaning Provider</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Look for a provider with commercial-grade equipment, experience with your type of carpet, and the ability to work after hours to minimize disruption. Rangel Janitorial provides professional carpet cleaning combined with <a href="/services/floor-care" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">floor care</a> for commercial buildings across California.</p>
    `,
    relatedSlugs: ['floor-care-vct-strip-wax', 'office-cleaning-best-practices', 'choosing-commercial-cleaning-company'],
  },

  'green-cleaning-commercial-facilities': {
    slug: 'green-cleaning-commercial-facilities',
    title: 'Green Cleaning for Commercial Facilities',
    metaDescription:
      'How environmentally responsible cleaning practices benefit your facility, employees, and the planet. Green products, sustainable methods, and certifications to look for.',
    category: 'Industry Insights',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'December 18, 2025',
    readingTime: '6 min read',
    featuredGradient: 'from-red-500 via-orange-400 to-amber-400',
    headings: [
      'What is Green Cleaning',
      'Benefits for Your Facility',
      'Green Products and Methods',
      'Certifications to Look For',
    ],
    content: `
      <h2 id="what-is-green-cleaning" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">What is Green Cleaning</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Green cleaning uses environmentally responsible products and methods that reduce the impact on human health and the environment while still delivering effective cleaning results. It encompasses everything from the products used to the equipment and procedures employed.</p>

      <h2 id="benefits-for-your-facility" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Benefits for Your Facility</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Green cleaning improves indoor air quality, reduces chemical exposure for employees and cleaning staff, and demonstrates your commitment to environmental responsibility. Services like <a href="/services/electrostatic-disinfection" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">electrostatic disinfection</a> can also use eco-friendly solutions. Many tenants and employees increasingly prefer facilities that prioritize sustainability.</p>

      <h2 id="green-products-and-methods" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Green Products and Methods</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Green cleaning products are formulated to minimize environmental impact while maintaining cleaning effectiveness. This includes biodegradable formulas, reduced VOC emissions, and concentrated products that minimize packaging waste.</p>

      <h2 id="certifications-to-look-for" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Certifications to Look For</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Look for products certified by Green Seal, EPA Safer Choice, or LEED-compliant programs. Ask your <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial provider</a> about their green cleaning options and how they can be incorporated into your facility's cleaning program.</p>
    `,
    relatedSlugs: ['office-cleaning-best-practices', 'medical-facility-cleaning-standards', 'choosing-commercial-cleaning-company'],
  },

  'janitorial-services-walnut-creek': {
    slug: 'janitorial-services-walnut-creek',
    title: 'Janitorial Services in Walnut Creek & the East Bay',
    metaDescription:
      'Professional janitorial services for Walnut Creek, Concord, Pleasant Hill, and the greater East Bay. What Bay Area businesses should expect from their cleaning provider.',
    category: 'Local Guides',
    author: authors["Rangel Janitorial Team"],
    publishDate: 'December 8, 2025',
    readingTime: '6 min read',
    featuredGradient: 'from-orange-500 via-amber-400 to-yellow-400',
    headings: [
      'East Bay Commercial Cleaning',
      'Why Choose a Local Provider',
      'Our Walnut Creek Services',
      'Getting Started',
    ],
    content: `
      <h2 id="east-bay-commercial-cleaning" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">East Bay Commercial Cleaning</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">The East Bay is home to a diverse mix of businesses, from corporate offices in <a href="/locations/walnut-creek" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">Walnut Creek</a> to industrial facilities in Concord and Pleasant Hill. Each facility type has unique cleaning requirements, and finding a janitorial provider who understands the local market is essential.</p>

      <h2 id="why-choose-a-local-provider" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Why Choose a Local Provider</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">A local janitorial provider offers faster response times, better understanding of regional conditions, and stronger accountability to the community they serve. Rangel Janitorial's Walnut Creek office serves the entire East Bay with dedicated local crews.</p>

      <h2 id="our-walnut-creek-services" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Our Walnut Creek Services</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">We offer the full range of commercial cleaning services in the East Bay including <a href="/services/janitorial-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">janitorial cleaning</a>, <a href="/services/day-porter" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">day porter services</a>, <a href="/services/electrostatic-disinfection" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">electrostatic disinfection</a>, and <a href="/services/carpet-cleaning" class="text-forest hover:text-sage underline underline-offset-2 transition-colors">carpet cleaning</a> for all facility types.</p>

      <h2 id="getting-started" class="text-2xl font-bold font-heading text-charcoal mt-8 mb-4">Getting Started</h2>
      <p class="text-charcoal-light font-body leading-relaxed mb-4">Contact Rangel Janitorial Walnut Creek at (925) 655-9008 for a free consultation and quote tailored to your facility's needs.</p>
    `,
    relatedSlugs: ['janitorial-services-sacramento', 'commercial-cleaning-murrieta', 'office-cleaning-best-practices'],
  },
};

// ---------------------------------------------------------------------------
// Static Params & Metadata
// ---------------------------------------------------------------------------

const validSlugs = [
  'office-cleaning-best-practices',
  'janitorial-services-sacramento',
  'commercial-cleaning-murrieta',
  'day-porter-benefits',
  'electrostatic-disinfection-explained',
  'floor-care-vct-strip-wax',
  'medical-facility-cleaning-standards',
  'fitness-center-cleaning-guide',
  'choosing-commercial-cleaning-company',
  'carpet-cleaning-commercial-buildings',
  'green-cleaning-commercial-facilities',
  'janitorial-services-walnut-creek',
];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: `${post.title} | Rangel Janitorial Blog`,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author.name],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  // Build related posts
  const relatedPosts = post.relatedSlugs
    .map((s) => blogPosts[s])
    .filter(Boolean);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    'Janitorial Tips': 'bg-sage/15 text-sage-dark',
    'Industry Insights': 'bg-amber-100 text-amber-700',
    'Local Guides': 'bg-blue-100 text-blue-700',
  };

  const categoryColor =
    categoryColors[post.category] || 'bg-sage/15 text-sage-dark';

  // Build JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Rangel Janitorial',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rangel Janitorial',
      url: 'https://rangeljanitorial.com',
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rangeljanitorial.com/blog/${post.slug}`,
    },
    articleSection: post.category,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rangeljanitorial.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://rangeljanitorial.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Breadcrumb */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1 text-sm text-charcoal-light font-body">
            <Link
              href="/"
              className="hover:text-forest transition-colors py-1 px-1"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <Link
              href="/blog"
              className="hover:text-forest transition-colors py-1 px-1"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-charcoal font-medium truncate max-w-[200px] sm:max-w-none py-1 px-1">
              {post.title}
            </span>
          </nav>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Article Header */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white border-b border-gray-100">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-body ${categoryColor}`}
            >
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-charcoal leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-charcoal-light font-body">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sage" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sage" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sage" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Featured Image Placeholder */}
      {/* ----------------------------------------------------------------- */}
      <div
        className={`w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-r ${post.featuredGradient} relative`}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/30 font-heading font-bold text-lg sm:text-xl tracking-wider uppercase">
            Featured Image
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Two-Column Layout: Article + Sidebar */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14">
            {/* LEFT: Article Content */}
            <article
              className="min-w-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* RIGHT: Sidebar (Desktop Only) */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 space-y-8">
                {/* Table of Contents */}
                <div className="bg-cream rounded-2xl p-6 border border-gray-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold font-heading text-charcoal uppercase tracking-wider mb-4">
                    <List className="w-4 h-4 text-sage" />
                    Table of Contents
                  </h3>
                  <nav>
                    <ul className="space-y-2">
                      {post.headings.map((heading, idx) => {
                        const headingId = heading
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        return (
                          <li key={idx}>
                            <a
                              href={`#${headingId}`}
                              className="text-sm text-charcoal-light font-body hover:text-forest transition-colors leading-snug block py-1"
                            >
                              {heading}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold font-heading mb-2">
                    Need Professional Cleaning?
                  </h3>
                  <p className="text-white/80 text-sm font-body leading-relaxed mb-5">
                    Rangel Janitorial serves businesses across
                    California. Get a free, no-obligation quote today.
                  </p>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors font-body text-sm w-full justify-center"
                  >
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/locations"
                    className="flex items-center justify-center gap-2 text-white/80 hover:text-white font-body text-sm mt-3 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Find Your Local Office
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Share Buttons */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold font-heading text-charcoal">
              Share this article:
            </span>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Share on Facebook"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Share on Twitter"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Share on LinkedIn"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Author Bio Card */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-body text-charcoal-light uppercase tracking-wider mb-1">
                  Written by
                </p>
                <h3 className="text-xl font-bold font-heading text-charcoal mb-1">
                  {post.author.name}
                </h3>
                <p className="text-sm font-body text-sage font-semibold mb-3">
                  {post.author.role}
                </p>
                <p className="text-sm text-charcoal-light font-body leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Posts */}
      {/* ----------------------------------------------------------------- */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-8 text-center">
              Related Articles
            </h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => {
                const relatedCategoryColor =
                  categoryColors[related.category] ||
                  'bg-sage/15 text-sage-dark';
                return (
                  <StaggerItem key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all card-hover block"
                    >
                      <div
                        className={`h-36 bg-gradient-to-r ${related.featuredGradient} relative`}
                      >
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                      </div>
                      <div className="p-5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold font-body mb-3 ${relatedCategoryColor}`}
                        >
                          {related.category}
                        </span>
                        <h3 className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors mb-2 leading-snug">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-charcoal-light font-body">
                          <span>{related.author.name}</span>
                          <span className="text-gray-300">|</span>
                          <span>{related.readingTime}</span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* CTA Banner */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready for a Cleaner Facility?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Rangel Janitorial provides professional janitorial and commercial
            cleaning services across California. From Sacramento to Murrieta
            to Walnut Creek, our experienced crews keep your facility clean,
            healthy, and professional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
            >
              <MapPin className="w-5 h-5" />
              Find Your Local Office
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
