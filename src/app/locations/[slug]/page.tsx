import regions from '@/data/regions.json';
import business from '@/data/business.json';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { ORGANIZATION_ID } from '@/lib/seo/schema';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  ArrowRight,
  Star,
  ChevronRight,
  CheckCircle,
  ShieldCheck,
  Leaf,
  ThumbsUp,
  Droplets,
  MapPin,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import OurWorkGallery from '@/components/sections/OurWorkGallery';
import FAQ from '@/components/sections/FAQ';
import LeadForm from '@/components/forms/LeadForm';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\/]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  name: string;
  neighborhood: string;
  rating: number;
  text: string;
}

interface LocationData {
  city: string;
  slug: string;
  state: string;
  phone: string;
  email: string;
  neighborhoods: string[];
  testimonials: Testimonial[];
  metaTitle: string;
  metaDescription: string;
  serviceAreaDescription: string;
  climateNote: string;
  mapQuery: string;
  mapEmbedUrl?: string;
  gmb?: string;
  googleReviewUrl?: string;
}

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const services = [
  {
    name: 'Janitorial Cleaning',
    slug: 'janitorial-cleaning',
    image: '/images/stock/janitorial-cleaning.png',
    shortDescription:
      'Comprehensive daily and nightly janitorial services for offices, medical facilities, and commercial buildings.',
  },
  {
    name: 'Day Porter',
    slug: 'day-porter',
    image: '/images/stock/day-porter.png',
    shortDescription:
      'On-site daytime cleaning and maintenance to keep your facility looking its best throughout the business day.',
  },
  {
    name: 'Electrostatic Disinfection',
    slug: 'electrostatic-disinfection',
    image: '/images/stock/electrostatic-disinfection.png',
    shortDescription:
      'Advanced electrostatic spraying technology for thorough disinfection of high-touch surfaces and hard-to-reach areas.',
  },
  {
    name: 'Floor Care',
    slug: 'floor-care',
    image: '/images/stock/floor-care.png',
    shortDescription:
      'Professional floor care including VCT strip and wax, polishing, and maintenance to keep your floors pristine.',
  },
  {
    name: 'Office Cleaning',
    slug: 'office-cleaning',
    image: '/images/stock/office-lobby.jpg',
    shortDescription:
      'Dedicated office cleaning for professional work environments — workstations, conference rooms, and common areas.',
  },
];

const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Schedule Your Estimate',
    description: 'We visit your property',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Enjoy your clean, spotless facility',
  },
];

const locationFaqs = [
  {
    question: 'What types of facilities do you clean?',
    answer:
      'We clean Class A office buildings, corporate campuses, light industrial parks, multi-unit complexes, medical and dental facilities, municipalities, and fitness centers.',
  },
  {
    question: 'Do you offer daily and nightly cleaning services?',
    answer:
      'Yes. We offer both daily and nightly janitorial services, as well as day porter services for facilities that need on-site cleaning throughout the business day.',
  },
  {
    question: 'What does your janitorial service include?',
    answer:
      'Our services include lobby and common area cleaning, restroom sanitation and restocking, break room cleaning, trash and recycling removal, floor care, and more. We customize each plan to your facility.',
  },
  {
    question: 'Are your employees trained and insured?',
    answer:
      'Absolutely. All Rangel Janitorial employees are professionally trained on cleaning protocols and safety procedures. We carry comprehensive general liability and workers compensation insurance for your protection and peace of mind.',
  },
  {
    question: 'How do you ensure consistent quality?',
    answer:
      'We use detailed cleaning checklists customized to your facility, conduct regular quality inspections, and assign dedicated account managers as your single point of contact.',
  },
  {
    question: 'Do you offer flexible maintenance plans?',
    answer:
      'Yes, we offer daily, nightly, weekly, and custom maintenance plans. We work with you to create a schedule that fits your facility needs and budget.',
  },
];

const sacramentoFaqs = [
  {
    question: 'Do you clean small offices and shops in Sacramento?',
    answer:
      'Yes. Rangel Janitorial provides commercial cleaning for small offices, retail spaces and other local businesses in Sacramento. Tell us about your space and the areas you want cleaned so we can recommend a suitable plan.',
  },
  {
    question: 'What can a small business cleaning plan include?',
    answer:
      'Your plan can include office and customer areas, restroom cleaning, break rooms, trash removal and floor care. The walkthrough establishes which rooms, surfaces and tasks are included in your quote.',
  },
  {
    question: 'How much does commercial cleaning cost in Sacramento?',
    answer:
      'Your quote depends on the size of the space, the cleaning tasks, floor surfaces and how often service is needed. Request a free quote or use our cleaning calculator for a planning estimate. Final pricing and scope are confirmed after a walkthrough.',
  },
  {
    question: 'Can I request weekly cleaning instead of nightly service?',
    answer:
      'Yes. Weekly, nightly and custom cleaning schedules are available. Share your opening hours, foot traffic and priorities so we can discuss a schedule that fits your business.',
  },
  {
    question: 'Can cleaning take place outside business hours?',
    answer:
      'Cleaning can be planned around your business hours. Include your preferred time and access arrangements in your request; our team will confirm the schedule with you.',
  },
  {
    question: 'What are your Sacramento office and cleaning hours?',
    answer:
      'Contact hours for our Sacramento team are 9 AM to 9 PM every day, Pacific Time (America/Los_Angeles). Cleaning is available 24 hours a day. Tell us your preferred cleaning time so our team can confirm the schedule.',
  },
  {
    question: 'Which Sacramento communities do you serve?',
    answer:
      'We serve Sacramento, including Downtown, Midtown and Natomas, as well as West Sacramento, Rancho Cordova, Citrus Heights, Roseville, Folsom and surrounding communities. Include your business address so our team can confirm service for your location.',
  },
  {
    question: 'How do I request a Sacramento cleaning quote?',
    answer:
      'Use the quote form on this page or call our Sacramento team at (916) 426-2311. Share your business location, approximate square footage, the areas to clean and preferred frequency. We will discuss your needs and arrange the next step with you.',
  },
];

const walnutCreekFaqs = [
  {
    question: 'Do you provide commercial cleaning in Walnut Creek?',
    answer:
      'Yes. Rangel Janitorial provides commercial and office cleaning for businesses in Walnut Creek and nearby East Bay communities. Tell us about your space and the areas you want cleaned so we can recommend a suitable plan.',
  },
  {
    question: 'What can an office cleaning plan include?',
    answer:
      'A plan can include workstations and private offices, conference rooms, break rooms, restrooms, entry areas, trash and recycling removal and floor care. The walkthrough establishes which rooms, surfaces and tasks are included in your quote.',
  },
  {
    question: 'What affects the price of office cleaning in Walnut Creek?',
    answer:
      'Price depends on square footage, which rooms and tasks are included, the floor surfaces and how many visits you need. For a planning number, try our cleaning calculator. Your free quote is confirmed after we walk through the space.',
  },
  {
    question: 'How often can you clean my office?',
    answer:
      'Nightly, weekly and custom cleaning schedules are available. Share your business hours, how many people use the space and your priorities so we can discuss a schedule that fits.',
  },
  {
    question: 'Can cleaning take place after business hours?',
    answer:
      'Cleaning can be planned around your business hours. Include your preferred cleaning time and building access arrangements in your request; our team will confirm the schedule with you.',
  },
  {
    question: 'Do you offer day porter service in the East Bay?',
    answer:
      'Yes. Day porter service is cleaning help while your business is open, such as restroom checks, restocking, trash removal and tidying shared areas. Tell us which areas need attention during the day and when.',
  },
  {
    question: 'Which East Bay communities do you serve?',
    answer:
      'We serve Walnut Creek, Concord, Pleasant Hill, Lafayette, Danville, Martinez, San Ramon, Dublin, Pleasanton, Livermore, Orinda, Moraga, Alamo, Clayton and the other East Bay communities listed on this page. Include your business address so our team can confirm service for your location.',
  },
  {
    question: 'How do I request a Walnut Creek cleaning quote?',
    answer:
      'Call our Walnut Creek team at (925) 655-9008 or send the quote form on this page. Include your address, approximate square footage, the areas you want cleaned and how often. We will talk through your needs and the next step with you.',
  },
];

interface LocalFocus {
  title: string;
  heading: string;
  subheading: string;
  serviceDescription: string;
  faqs: { question: string; answer: string }[];
  introId: string;
  introHeading: string;
  introText: string;
  cards: { title: string; detail: string }[];
  links: { href: string; label: string }[];
  guides: [{ href: string; label: string }, { href: string; label: string }];
}

// Region-specific search copy. Regions without an entry keep the shared copy and FAQs.
const localFocus: Record<string, LocalFocus> = {
  sacramento: {
    title: 'Sacramento Commercial Cleaning for Small Businesses',
    heading: 'Commercial Cleaning',
    subheading:
      'For small offices, retail shops and the local businesses that keep Sacramento moving. Get a cleaning plan built around your space and schedule.',
    serviceDescription:
      'Commercial cleaning for small offices, retail spaces and local businesses in Sacramento, with scope and schedules tailored to the space.',
    faqs: sacramentoFaqs,
    introId: 'sacramento-small-business-heading',
    introHeading: 'Janitorial cleaning for small offices and local shops',
    introText:
      'Rangel Janitorial helps Sacramento businesses keep workspaces, customer areas, restrooms and floors clean. Tell us what needs attention, how often you need help and when your doors are open. We will discuss a plan for your space.',
    cards: [
      { title: 'Your space and priorities', detail: 'Choose the areas that need regular attention, such as office desks, customer areas, break rooms, restrooms and floors. Your quote will define the included tasks.' },
      { title: 'A schedule around your business', detail: 'Discuss weekly, nightly or custom cleaning and your preferred service time. We will confirm the schedule and access arrangements before service.' },
      { title: 'A quote based on the work', detail: 'Size, cleaning scope, floor surfaces and visit frequency shape the price. Start with a free quote and confirm the details during a walkthrough.' },
    ],
    links: [
      { href: '/services/office-cleaning', label: 'Office cleaning' },
      { href: '/services/janitorial-cleaning', label: 'Janitorial cleaning' },
      { href: '/services/floor-care', label: 'Floor care' },
      { href: '/quote/sacramento#cleaning-calculator', label: 'Estimate your cleaning budget' },
    ],
    guides: [
      { href: '/blog/janitorial-services-sacramento', label: 'Sacramento guide to choosing a janitorial company' },
      { href: '/blog/sacramento-after-hours-janitorial-service', label: 'guide to after-hours cleaning' },
    ],
  },
  'walnut-creek': {
    title: 'Walnut Creek Commercial and Office Cleaning',
    heading: 'Commercial Cleaning',
    subheading:
      'For offices, employee areas and local businesses in Walnut Creek and the East Bay. Tell us what needs cleaning and when, and we will plan around it.',
    serviceDescription:
      'Commercial and office cleaning for businesses in Walnut Creek and nearby East Bay communities, with scope and schedules tailored to the space.',
    faqs: walnutCreekFaqs,
    introId: 'walnut-creek-office-cleaning-heading',
    introHeading: 'Office cleaning for Walnut Creek and East Bay businesses',
    introText:
      'Rangel Janitorial helps Walnut Creek businesses keep offices, break rooms, restrooms and floors clean. Tell us what needs attention, how often you need help and your business hours, and we will discuss a plan that fits.',
    cards: [
      { title: 'Offices and employee areas', detail: 'Workstations, conference rooms, break rooms, restrooms and entry areas. The walkthrough sets which rooms and tasks are included.' },
      { title: 'A schedule around your hours', detail: 'Discuss nightly, weekly or custom cleaning and your preferred service time. We will confirm the schedule and building access before service.' },
      { title: 'Pricing tied to your scope', detail: 'Square footage, tasks, floors and visit frequency set the price. Your free quote is confirmed once we have walked the space.' },
    ],
    links: [
      { href: '/services/office-cleaning', label: 'Office cleaning' },
      { href: '/services/janitorial-cleaning', label: 'Janitorial cleaning' },
      { href: '/services/day-porter', label: 'Day porter service' },
      { href: '/services/floor-care', label: 'Floor care' },
      { href: '/quote/walnut-creek#cleaning-calculator', label: 'Estimate your cleaning budget' },
    ],
    guides: [
      { href: '/blog/janitorial-services-walnut-creek', label: 'Walnut Creek guide to choosing a janitorial company' },
      { href: '/blog/walnut-creek-financial-district-after-hours', label: 'guide to after-hours office cleaning' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const locationData: Record<string, LocationData> = {
  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: regions.find((region) => region.slug === 'sacramento')!.phone,
    email: business.email,
    neighborhoods: regions.find((region) => region.slug === 'sacramento')!.cities.map((city) => city.name),
    testimonials: [
      {
        name: 'Greg Thomsen',
        neighborhood: 'Downtown Sacramento',
        rating: 5,
        text: "We manage a medical office complex in Downtown Sacramento and switched to Rangel Janitorial six months ago. The difference is night and day — our waiting rooms and exam rooms are spotless every morning. Their crew is thorough, professional, and consistent. Best janitorial service we've worked with in Sacramento.",
      },
      {
        name: 'Priya Venkatesh',
        neighborhood: 'Roseville',
        rating: 5,
        text: "Our Roseville office building needed a reliable cleaning crew after our previous service became inconsistent. Rangel Janitorial stepped in and immediately raised the standard. Floors gleam, restrooms are always stocked and sanitized, and the break room is actually clean when we arrive each morning. Phenomenal service.",
      },
      {
        name: 'Danielle Foster',
        neighborhood: 'Folsom',
        rating: 5,
        text: "We signed up for Rangel Janitorial's nightly cleaning plan for our Folsom retail space. The consistency has been outstanding — our store always looks and smells clean when we open, customers notice the difference, and we never have to think about it. Their experience means they know exactly what they're doing.",
      },
    ],
    metaTitle: "Professional Janitorial Services in Sacramento, CA | Rangel Janitorial",
    metaDescription:
      'Commercial cleaning for Sacramento offices, retail shops and local businesses. Discuss your space, scope and schedule with Rangel Janitorial. Get a free quote.',
    serviceAreaDescription:
      'Serving the greater Sacramento metro including Downtown Sacramento, Midtown Sacramento, Roseville, Folsom, Rancho Cordova, Citrus Heights, and West Sacramento.',
    climateNote:
      'Central Valley heat and dust demand frequent deep cleaning to maintain healthy, professional environments.',
    mapQuery: 'Sacramento+CA',
    mapEmbedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s11803991425863125906',
    gmb: 'https://share.google/JohiHvlHV2U1wvqn3',
    googleReviewUrl: 'https://g.page/r/CZILVF6pM9CjEBM/review',
  },

  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: regions.find((region) => region.slug === 'murrieta')!.phone,
    email: business.email,
    neighborhoods: regions.find((region) => region.slug === 'murrieta')!.cities.map((city) => city.name),
    testimonials: [
      {
        name: 'Brian Callahan',
        neighborhood: 'Temecula',
        rating: 5,
        text: "We run a busy dental practice in Temecula and cleanliness is non-negotiable for us. Rangel Janitorial handles our nightly cleaning and their attention to detail is incredible — every surface, every exam room, every restroom. Patients consistently comment on how clean our office is. These guys are the real deal.",
      },
      {
        name: 'Maria Sandoval',
        neighborhood: 'Menifee',
        rating: 5,
        text: "After trying two other janitorial companies that cut corners, we switched to Rangel Janitorial. The difference was immediate — our Menifee office space has never looked better. They actually clean behind desks and under furniture, not just the visible areas. When you care about clean facilities, these are the people to call.",
      },
      {
        name: 'Tyler Richardson',
        neighborhood: 'French Valley',
        rating: 5,
        text: "Our warehouse and office combo in French Valley needed a crew that could handle both environments. Rangel Janitorial came out, assessed the space, and put together a custom plan. The office is spotless and the warehouse common areas are maintained perfectly. Being local really makes a difference in response time too.",
      },
    ],
    metaTitle: "Professional Janitorial Services in Murrieta & Inland Empire | Rangel Janitorial",
    metaDescription:
      "Rangel Janitorial serves the Inland Empire with professional janitorial and commercial cleaning. Murrieta, Temecula, Menifee & beyond. Licensed & insured. Get a free quote today.",
    serviceAreaDescription:
      'Serving the entire Inland Empire from Temecula and French Valley through Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, and Winchester.',
    climateNote:
      'Inland Empire dust and summer heat require consistent cleaning to keep commercial spaces healthy and presentable.',
    mapQuery: 'Rangel+Janitorial+Murrieta+CA',
    gmb: 'https://www.google.com/maps/place/Rangel+Commercial+Cleaners+of+Murrieta/data=!4m2!3m1!1s0x0:0x846bff7e768aac1a',
  },

  'walnut-creek': {
    city: 'Walnut Creek',
    slug: 'walnut-creek',
    state: 'CA',
    phone: regions.find((region) => region.slug === 'walnut-creek')!.phone,
    email: business.email,
    neighborhoods: regions.find((region) => region.slug === 'walnut-creek')!.cities.map((city) => city.name),
    testimonials: [
      {
        name: 'Richard Yamamoto',
        neighborhood: 'Walnut Creek',
        rating: 5,
        text: "Our Walnut Creek office suite needed a janitorial service that understood professional environments. Rangel Janitorial delivers every single night — clean floors, sanitized restrooms, spotless kitchens. They understand East Bay business standards better than any company we've worked with.",
      },
      {
        name: "Colleen O'Malley",
        neighborhood: 'Concord',
        rating: 5,
        text: "We manage a multi-tenant office building in Concord and had been through three janitorial services in two years. Rangel Janitorial has been with us for over a year now and the quality has never dipped. Tenants are happy, common areas are immaculate, and their communication is excellent. Highly recommend.",
      },
      {
        name: 'Arjun Mehta',
        neighborhood: 'Pleasant Hill',
        rating: 5,
        text: "After years of mediocre cleaning at our Pleasant Hill gym, we finally called Rangel Janitorial. Best decision we made. They handle the locker rooms, equipment floor, lobby, and restrooms — everything is sanitized and presentable when members walk in each morning. Worth every penny.",
      },
    ],
    metaTitle: "Professional Janitorial Services in Walnut Creek & East Bay | Rangel Janitorial",
    metaDescription:
      'Office and commercial cleaning for Walnut Creek and East Bay businesses. Plan offices, restrooms, break rooms and floors around your schedule. Get a free quote.',
    serviceAreaDescription:
      'Serving Walnut Creek and nearby East Bay communities, including Concord, Pleasant Hill, Lafayette, Danville, Martinez, San Ramon, Dublin and Pleasanton.',
    climateNote:
      'Bay Area microclimates range from damp conditions near the coast to warm, dry conditions inland — requiring adaptable cleaning approaches.',
    mapQuery: 'Rangel+Janitorial+Walnut+Creek+CA',
    gmb: 'https://www.google.com/maps/place/Rangel+Janitorial/data=!4m2!3m1!1s0x0:0xc3ee3d9f0986ca02',
  },
};

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return regions.map((region) => ({slug: region.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locationData[slug];
  if (!location) {
    return { title: 'Location Not Found' };
  }
  const title = localFocus[slug]?.title
    ?? `${regions.find((region) => region.slug === slug)!.name} Commercial Cleaning`;
  return generatePageMetadata(title, location.metaDescription, `/locations/${slug}`);
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locationData[slug];

  if (!location) {
    notFound();
  }

  const isSacramento = slug === 'sacramento';
  const focus = localFocus[slug];
  const faqs = focus ? focus.faqs : locationFaqs;

  // JSON-LD: FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // JSON-LD: Service with areaServed
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Janitorial Services',
    '@id': `${business.url}/locations/${slug}#service`,
    name: `Commercial cleaning in ${location.city}`,
    ...(focus ? { description: focus.serviceDescription } : {}),
    url: `${business.url}/locations/${slug}`,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: location.neighborhoods.map((n) => ({
      '@type': 'City',
      name: n,
    })),
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rangeljanitorial.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: 'https://rangeljanitorial.com/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${location.city}, ${location.state}`,
        item: `https://rangeljanitorial.com/locations/${location.slug}`,
      },
    ],
  };

  return (
    <div className="scroll-smooth pb-20 lg:pb-0">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />

      {/* ================================================================
          1. HERO WITH EMBEDDED LEAD FORM
          ================================================================ */}
      <section id="quote-form" className="relative overflow-hidden scroll-mt-20">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/our-work/rangel-10-6941b0a17109a8dad2658d64.png"
            alt={`Professional commercial cleaning services in ${location.city}, California by Rangel Janitorial`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-white/60 text-sm font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors py-1 px-1">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href="/locations" className="hover:text-white transition-colors py-1 px-1">
              Locations
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-white py-1 px-1">{location.city}, {location.state}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: headline + phone */}
            <AnimateOnScroll direction="up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                {focus ? focus.heading : 'Professional Janitorial Services'}
                <br />
                <span className="text-cream">
                  in {location.city}, CA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                {focus ? focus.subheading : 'Reliable Commercial Cleaning You Can Count On'}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  {location.phone}
                </a>
                {location.gmb && (
                  <a
                    href={location.gmb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold text-base px-6 py-4 rounded-xl hover:bg-white/20 transition-colors font-body border border-white/20"
                  >
                    <MapPin className="w-5 h-5" />
                    {isSacramento ? 'View our Google profile' : 'View on Google Maps'}
                  </a>
                )}
              </div>
              {isSacramento && (
                <dl className="mt-6 space-y-2 text-white/80 font-body text-sm leading-relaxed" aria-label="Sacramento contact and cleaning hours">
                  <div>
                    <dt className="inline font-semibold text-white">Office &amp; contact:</dt>{' '}
                    <dd className="inline">9 AM to 9 PM every day, Pacific Time.</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-white">Cleaning availability:</dt>{' '}
                    <dd className="inline">24 hours. Confirm your service time with our team.</dd>
                  </div>
                </dl>
              )}
            </AnimateOnScroll>

            {/* Right: Lead form */}
            <AnimateOnScroll direction="up" className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl">
                <LeadForm regionSlug={location.slug} formPlacement="hero" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {focus && (
        <section aria-labelledby={focus.introId} className="py-14 sm:py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <h2 id={focus.introId} className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-5">
                {focus.introHeading}
              </h2>
              <p className="text-lg text-charcoal-light font-body leading-relaxed">
                {focus.introText}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {focus.cards.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-xl font-bold text-charcoal font-heading mb-3">{item.title}</h3>
                  <p className="text-charcoal-light font-body leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 font-body font-semibold text-forest">
              {focus.links.map((link) => (
                <Link key={link.href} href={link.href} className="underline underline-offset-4">{link.label}</Link>
              ))}
            </div>
            <p className="mt-8 text-charcoal-light font-body leading-relaxed">
              Planning your service? Read our{' '}
              <Link href={focus.guides[0].href} className="text-forest font-semibold underline underline-offset-4">{focus.guides[0].label}</Link>
              {' '}and{' '}
              <Link href={focus.guides[1].href} className="text-forest font-semibold underline underline-offset-4">{focus.guides[1].label}</Link>.
            </p>
          </div>
        </section>
      )}

      {/* ================================================================
          2. SERVICES
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              Our Services in {location.city}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Professional commercial cleaning services tailored to {location.city}&apos;s businesses.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group bg-cream hover:bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 hover:shadow-xl transition-all duration-300 block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-charcoal font-heading mb-2 group-hover:text-forest transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-3">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sage font-semibold font-body text-sm group-hover:text-forest transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ================================================================
          3. THREE-STEP PROCESS
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              Our Simple 3 Step Process
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, idx) => (
              <StaggerItem key={step.title}>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={256}
                      height={256}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white font-bold font-heading text-sm shadow-md">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-light font-body">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-12">
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. OUR WORK GALLERY
          ================================================================ */}
      <OurWorkGallery />

      {/* ================================================================
          5. TESTIMONIALS
          ================================================================ */}
      <section aria-labelledby="customer-reviews-heading" className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 id="customer-reviews-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              What {location.city} Customers Say
            </h2>
            <p className="text-lg text-charcoal-light font-body mb-4">
              Real reviews from real neighbors.
            </p>
            <p className="text-charcoal-light font-body leading-relaxed text-base max-w-2xl mx-auto mb-8">
              30+ years of commercial cleaning expertise. Our trained
              crews deliver consistent, satisfaction-guaranteed facility maintenance across{' '}
              {location.city} and surrounding communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: ShieldCheck, label: 'Insured & Bonded' },
                { icon: Leaf, label: 'Eco Friendly' },
                { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100"
                >
                  <badge.icon className="w-5 h-5 text-sage" />
                  <span className="text-charcoal font-body text-sm font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {location.testimonials.map((testimonial, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-sage fill-sage"
                      />
                    ))}
                  </div>
                  <blockquote className="text-charcoal-light font-body text-sm leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-charcoal font-heading text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-charcoal-light font-body text-xs">
                      {testimonial.neighborhood}, {location.state}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          {location.googleReviewUrl && (
            <div className="mt-10 text-center">
              <p className="text-charcoal-light font-body mb-4">
                Share your experience with Rangel Janitorial on Google.
              </p>
              <a
                href={location.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors font-body"
              >
                Leave a Google review
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          6. FAQ
          ================================================================ */}
      <FAQ items={faqs} />

      {/* ================================================================
          7. NEIGHBORHOODS WE SERVE
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
                {slug === 'walnut-creek' ? 'Communities We Serve in the East Bay' : `Neighborhoods We Serve in ${location.city}`}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                {location.serviceAreaDescription}
              </p>
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => (
                  <StaggerItem key={neighborhood} direction="scale">
                    <Link
                      href={`/locations/${location.slug}/${toSlug(neighborhood)}`}
                      className="group flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm hover:shadow-md hover:border-sage/30 border border-transparent transition-all"
                    >
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                      <span className="text-charcoal font-body text-sm font-medium group-hover:text-forest transition-colors">
                        {neighborhood}
                      </span>
                      <ArrowRight className="w-3 h-3 text-sage ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Climate Note */}
              <div className="bg-sage/10 rounded-xl p-4 border border-sage/20 mt-6">
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-charcoal font-heading mb-1">Local Climate</h4>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed">{location.climateNote}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <AnimateOnScroll direction="fade" className="w-full">
              <iframe
                src={location.mapEmbedUrl || `https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={isSacramento ? 'Rangel Janitorial Sacramento Google Maps listing' : `Rangel Janitorial - ${location.city}`}
                className="rounded-xl shadow-lg"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          8. BOTTOM CTA + LEAD FORM
          ================================================================ */}
      <section id="bottom-form" className="py-14 sm:py-20 bg-forest scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: CTA text + contact info */}
            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-6">
                Ready for a Spotless Facility in {location.city}?
              </h2>
              <p className="text-white/80 font-body text-lg mb-8">
                Get your free quote today. Our team is ready to keep your facility
                clean, healthy, and professional.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-sage-light transition-colors font-body text-lg"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  {location.phone}
                </a>
                {isSacramento && (
                  <p className="text-white/80 font-body text-sm leading-relaxed">
                    Office &amp; contact: 9 AM to 9 PM every day, Pacific Time.
                    <br />
                    Cleaning availability: 24 hours, with your service time confirmed by our team.
                  </p>
                )}
                <a
                  href={`mailto:${location.email}`}
                  className="flex items-center gap-3 text-white hover:text-sage-light transition-colors font-body text-lg"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  {location.email}
                </a>
                {location.gmb && (
                  <a
                    href={location.gmb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-sage-light transition-colors font-body text-lg"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    {isSacramento ? 'View our Google profile' : 'View on Google Maps'}
                  </a>
                )}
              </div>
            </AnimateOnScroll>

            {/* Right: Lead form */}
            <AnimateOnScroll direction="up" className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl">
                <LeadForm regionSlug={location.slug} formPlacement="bottom" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between px-4 pt-3">
          <a
            href="#quote-form"
            className="flex-1 mr-2 bg-sage hover:bg-sage-dark text-white font-bold text-sm min-h-[44px] flex items-center justify-center px-4 rounded-lg text-center font-body transition-colors"
          >
            Get Free Quote
          </a>
          <a
            href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm min-h-[44px] px-4 rounded-lg font-body transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
