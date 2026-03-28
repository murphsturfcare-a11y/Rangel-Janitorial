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
import FAQ from '@/components/sections/FAQ';

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
  formId: string;
  mapQuery: string;
  mapEmbedUrl?: string;
  gmb?: string;
}

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const services = [
  {
    name: 'Janitorial Cleaning',
    slug: 'janitorial-cleaning',
    image: '/images/stock/janitorial-cleaning.jpg',
    shortDescription:
      'Comprehensive daily and nightly janitorial services for offices, medical facilities, and commercial buildings.',
  },
  {
    name: 'Day Porter',
    slug: 'day-porter',
    image: '/images/stock/day-porter.jpg',
    shortDescription:
      'On-site daytime cleaning and maintenance to keep your facility looking its best throughout the business day.',
  },
  {
    name: 'Electrostatic Disinfection',
    slug: 'electrostatic-disinfection',
    image: '/images/stock/electrostatic-disinfection.jpg',
    shortDescription:
      'Advanced electrostatic spraying technology for thorough disinfection of high-touch surfaces and hard-to-reach areas.',
  },
  {
    name: 'Floor Care',
    slug: 'floor-care',
    image: '/images/stock/floor-care.jpg',
    shortDescription:
      'Professional floor care including VCT strip and wax, polishing, and maintenance to keep your floors pristine.',
  },
  {
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    image: '/images/stock/carpet-cleaning.jpg',
    shortDescription:
      'Commercial carpet cleaning using professional-grade equipment to extend carpet life and maintain appearance.',
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

const galleryImages = [
  { src: '/images/stock/gallery-office-lobby.jpg', alt: "Clean office lobby maintained by Rangel Janitorial commercial cleaning" },
  { src: '/images/stock/gallery-office-hallway.jpg', alt: "Spotless office hallway after professional janitorial service" },
  { src: '/images/stock/gallery-conference-room.jpg', alt: "Conference room cleaned and sanitized by professional janitorial crew" },
  { src: '/images/stock/gallery-medical-office.jpg', alt: "Medical office waiting room cleaned to healthcare standards" },
  { src: '/images/stock/gallery-gym-fitness.jpg', alt: "Fitness center floor and equipment cleaned by Rangel Janitorial" },
  { src: '/images/stock/gallery-floor-shine.jpg', alt: "Polished commercial VCT floor after professional strip and wax service" },
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
    question: 'Are your employees background checked and insured?',
    answer:
      'Absolutely. All Rangel Janitorial employees undergo thorough background checks, and we carry comprehensive general liability and workers compensation insurance.',
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

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const locationData: Record<string, LocationData> = {
  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(916) 432-5033',
    email: 'info@rangeljanitorial.com',
    neighborhoods: [
      'Sacramento',
      'Elk Grove',
      'Roseville',
      'Folsom',
      'Rancho Cordova',
      'Citrus Heights',
      'Natomas',
      'West Sacramento',
    ],
    testimonials: [
      {
        name: 'Greg Thomsen',
        neighborhood: 'Elk Grove',
        rating: 5,
        text: "We manage a medical office complex in Elk Grove and switched to Rangel Janitorial six months ago. The difference is night and day — our waiting rooms and exam rooms are spotless every morning. Their crew is thorough, professional, and consistent. Best janitorial service we've worked with in Sacramento.",
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
      "Sacramento's trusted janitorial and commercial cleaning service. Rangel Janitorial serves Elk Grove, Roseville, Folsom & Rancho Cordova. Licensed & insured. Get a free quote today.",
    serviceAreaDescription:
      'Serving the greater Sacramento metro including Elk Grove, Roseville, Folsom, Rancho Cordova, Citrus Heights, and West Sacramento.',
    climateNote:
      'Central Valley heat and dust demand frequent deep cleaning to maintain healthy, professional environments.',
    formId: 'E4GmpR4mgHj6kL4dFr2w',
    mapQuery: 'Rangel+Janitorial+Sacramento+CA',
  },

  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@rangeljanitorial.com',
    neighborhoods: [
      'Murrieta',
      'Temecula',
      'French Valley',
      'Menifee',
      'Lake Elsinore',
      'Hemet',
      'Perris',
      'Wildomar',
      'Canyon Lake',
      'Temescal Valley',
      'Winchester',
    ],
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
    formId: 'xBvd9OY1s3jhTIKq93sM',
    mapQuery: 'Rangel+Janitorial+Murrieta+CA',
    gmb: 'https://www.google.com/maps/place/Rangel+Commercial+Cleaners+of+Murrieta/data=!4m2!3m1!1s0x0:0x846bff7e768aac1a',
  },

  'walnut-creek': {
    city: 'Walnut Creek',
    slug: 'walnut-creek',
    state: 'CA',
    phone: '(925) 338-0048',
    email: 'info@rangeljanitorial.com',
    neighborhoods: [
      'Walnut Creek',
      'Concord',
      'Pleasant Hill',
      'Lafayette',
      'Danville',
      'Martinez',
      'San Ramon',
      'Dublin',
    ],
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
      "East Bay janitorial and commercial cleaning experts. Rangel Janitorial serves Walnut Creek, Concord, Pleasant Hill, Lafayette & Danville. Licensed & insured. Get a free quote today.",
    serviceAreaDescription:
      'Serving Contra Costa County from Walnut Creek through Concord, Pleasant Hill, Lafayette, Danville, Martinez, San Ramon, and Dublin.',
    climateNote:
      'Bay Area microclimates range from damp conditions near the coast to warm, dry conditions inland — requiring adaptable cleaning approaches.',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    mapQuery: 'Rangel+Janitorial+Walnut+Creek+CA',
  },
};

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [
    { slug: 'sacramento' },
    { slug: 'murrieta' },
    { slug: 'walnut-creek' },
  ];
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
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      type: 'website',
    },
  };
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

  // Calculate average rating from testimonials
  const avgRating =
    location.testimonials.reduce((sum, t) => sum + t.rating, 0) /
    location.testimonials.length;
  const avgRatingStr = avgRating.toFixed(1);

  // JSON-LD: FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: locationFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // JSON-LD: LocalBusiness with AggregateRating + Reviews
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rangel Janitorial',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: 'US',
    },
    telephone: location.phone,
    email: location.email,
    url: `https://rangeljanitorial.com/locations/${location.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRatingStr,
      reviewCount: String(location.testimonials.length),
      bestRating: '5',
    },
    review: location.testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
      },
      reviewBody: t.text,
    })),
  };

  // JSON-LD: Service with areaServed
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Janitorial Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Rangel Janitorial',
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ================================================================
          1. HERO WITH EMBEDDED LEAD FORM
          ================================================================ */}
      <section id="quote-form" className="relative overflow-hidden scroll-mt-20">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/stock/commercial-cleaning-hero.jpg"
            alt={`Professional commercial cleaning services in ${location.city}, California by Rangel Janitorial`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-forest/85" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-sm font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/locations" className="hover:text-white transition-colors">
              Locations
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{location.city}, {location.state}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: headline + phone */}
            <AnimateOnScroll direction="up">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">
                Professional Janitorial Services
                <br />
                <span className="text-cream">
                  in {location.city}, CA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                Reliable Commercial Cleaning You Can Count On
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
                    View on Google Maps
                  </a>
                )}
              </div>
            </AnimateOnScroll>

            {/* Right: Lead form iframe */}
            <AnimateOnScroll direction="up" className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-3">
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${location.formId}`}
                  style={{ width: '100%', height: '500px', border: 'none', borderRadius: '12px' }}
                  title={`Get a Free Quote - ${location.city}`}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

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
          3. ABOUT US
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimateOnScroll direction="fade">
              <Image
                src="/images/stock/commercial-cleaning-hero.jpg"
                alt="Rangel Janitorial professional commercial cleaning"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </AnimateOnScroll>

            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-6">
                Reliable Janitorial &amp; Commercial Cleaning
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed text-base mb-8">
                30+ years of commercial cleaning expertise. Our trained
                crews deliver consistent, satisfaction-guaranteed facility maintenance across{' '}
                {location.city} and surrounding communities.
              </p>
              <div className="flex flex-wrap gap-4">
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
          </div>
        </div>
      </section>

      {/* ================================================================
          4. THREE-STEP PROCESS
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
          5. PHOTO GALLERY
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading">
              Our Work
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, idx) => (
              <StaggerItem key={idx}>
                <div className="relative aspect-[5/4] rounded-xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ================================================================
          6. TESTIMONIALS
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-4">
              What {location.city} Customers Say
            </h2>
            <p className="text-lg text-charcoal-light font-body">
              Real reviews from real neighbors.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {location.testimonials.map((testimonial, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-cream rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-sage fill-sage"
                      />
                    ))}
                  </div>
                  <p className="text-charcoal-light font-body text-sm leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
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
        </div>
      </section>

      {/* ================================================================
          7. FAQ
          ================================================================ */}
      <FAQ items={locationFaqs} />

      {/* ================================================================
          8. NEIGHBORHOODS WE SERVE
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading mb-6">
                Neighborhoods We Serve in {location.city}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                {location.serviceAreaDescription}
              </p>
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => (
                  <StaggerItem key={neighborhood} direction="scale">
                    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                      <span className="text-charcoal font-body text-sm font-medium">
                        {neighborhood}
                      </span>
                    </div>
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
                title={`Rangel Janitorial - ${location.city}`}
                className="rounded-xl shadow-lg"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          9. BOTTOM CTA + LEAD FORM
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
                    View on Google Maps
                  </a>
                )}
              </div>
            </AnimateOnScroll>

            {/* Right: Lead form iframe */}
            <AnimateOnScroll direction="up" className="w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-4">
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${location.formId}`}
                  style={{ width: '100%', height: '500px', border: 'none', borderRadius: '12px' }}
                  title={`Get a Free Quote - ${location.city}`}
                  loading="lazy"
                />
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
