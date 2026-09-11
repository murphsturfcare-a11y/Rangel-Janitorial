import { getCityGuides, type CityContent, type LocalDetail } from '@/content/city-content';
import regions from '@/data/regions.json';
import business from '@/data/business.json';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { ORGANIZATION_ID } from '@/lib/seo/schema';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, ChevronRight, Building2, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import OurWorkGallery from '@/components/sections/OurWorkGallery';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RegionData {
  regionName: string;
  slug: string;
  phone: string;
  email: string;
  subcities: { name: string; subcitySlug: string; localDetails?: LocalDetail[] }[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Services and facility types
// ---------------------------------------------------------------------------

const services = [
  {
    name: 'Janitorial Cleaning', slug: 'janitorial-cleaning',
    description:
      'Comprehensive nightly and daily janitorial cleaning for offices, lobbies, restrooms, and common areas.',
  },
  {
    name: 'Day Porter Services', slug: 'day-porter',
    description:
      'On-site daytime cleaning staff to maintain cleanliness during business hours and handle immediate needs.',
  },
  {
    name: 'Electrostatic Disinfection', slug: 'electrostatic-disinfection',
    description:
      'Targeted disinfectant application as part of a cleaning plan, following product instructions and required surface contact times.',
  },
  {
    name: 'Floor Care', slug: 'floor-care',
    description:
      'Professional floor stripping, waxing, buffing, and refinishing for hard surfaces including VCT, tile, and concrete.',
  },
  {
    name: 'Office Cleaning', slug: 'office-cleaning',
    description:
      'Comprehensive office cleaning services to keep workspaces, desks, and common areas spotless and professionally maintained.',
  },
];

const facilityTypes = [
  'Class A Office Buildings',
  'Corporate Buildings',
  'Light Industrial Parks',
  'Multi Units',
  'Medical & Dental Facilities',
  'Municipalities',
  'Fitness Centers',
  'Homeowners Associations',
  'Shopping Centers',
  'Schools & Educational Facilities',
];

// ---------------------------------------------------------------------------
// Region data with all subcities
// ---------------------------------------------------------------------------

const regionData: Record<string, RegionData> = Object.fromEntries(regions.map((region) => [region.slug, {
  regionName: region.city,
  slug: region.slug,
  phone: region.phone,
  email: business.email,
  subcities: region.cities.map((city) => ({name: city.name, subcitySlug: city.slug, localDetails: (city as CityContent).localDetails})),
}]));

// ---------------------------------------------------------------------------
// Static params — generates all region + subcity combinations
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const params: { slug: string; subcity: string }[] = [];

  for (const region of Object.values(regionData)) {
    for (const city of region.subcities) {
      params.push({ slug: region.slug, subcity: city.subcitySlug });
    }
  }

  return params;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subcity: string }>;
}): Promise<Metadata> {
  const { slug, subcity } = await params;
  const region = regionData[slug];
  if (!region) return { title: 'Location Not Found' };

  const city = region.subcities.find((c) => c.subcitySlug === subcity);
  if (!city) return { title: 'Location Not Found' };

  const title = `Professional Janitorial Services in ${city.name}, CA | Rangel Janitorial`;
  const description = `Rangel Janitorial provides professional commercial cleaning and janitorial services in ${city.name}, California. Serving offices, medical facilities, industrial parks & more. Call ${region.phone} for a free quote.`;

  return generatePageMetadata(title, description, `/locations/${slug}/${city.subcitySlug}`);
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SubcityPage({
  params,
}: {
  params: Promise<{ slug: string; subcity: string }>;
}) {
  const { slug, subcity } = await params;
  const region = regionData[slug];

  if (!region) {
    notFound();
  }

  const city = region.subcities.find((c) => c.subcitySlug === subcity);

  if (!city) {
    notFound();
  }

  const guides = getCityGuides(slug, city.name);
  const phoneDigits = region.phone.replace(/[^\d+]/g, '');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rangeljanitorial.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://rangeljanitorial.com/locations' },
      { '@type': 'ListItem', position: 3, name: region.regionName, item: `https://rangeljanitorial.com/locations/${region.slug}` },
      { '@type': 'ListItem', position: 4, name: `${city.name}, CA` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${business.url}/locations/${slug}/${subcity}#service`,
    url: `${business.url}/locations/${slug}/${subcity}`,
    name: `Commercial cleaning in ${city.name}`,
    description: `Professional janitorial and commercial cleaning services in ${city.name}, CA`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'California',
      },
    },
    provider: { '@id': ORGANIZATION_ID },
  };

  return (
    <div className="scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />

      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-white/60 text-sm font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors py-1 px-1">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href="/locations" className="hover:text-white transition-colors py-1 px-1">
              Locations
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link
              href={`/locations/${region.slug}`}
              className="hover:text-white transition-colors py-1 px-1"
            >
              {region.regionName}
            </Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-white py-1 px-1">{city.name}, CA</span>
          </nav>

          <AnimateOnScroll direction="up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-heading mb-6 leading-tight max-w-4xl">
              Professional Janitorial Services
              <br />
              <span className="text-cream">in {city.name}, CA</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 font-body mb-10 max-w-2xl">
              Reliable commercial cleaning for {city.name} businesses.
              Licensed, insured, and trusted by facilities across the{' '}
              {region.regionName} region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center justify-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {region.phone}
              </a>
              <Link
                href={`/locations/${region.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors font-body border border-white/20"
              >
                View {region.regionName} Location
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ================================================================
          ABOUT OUR SERVICES IN [CITY]
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up" className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-6">
              Commercial Cleaning in {city.name}
            </h2>
            <p className="text-charcoal-light font-body text-lg leading-relaxed">
              Rangel Janitorial delivers dependable, high-quality janitorial
              services to businesses throughout {city.name} and the greater{' '}
              {region.regionName} area. With over 30 years of industry
              experience, our trained crews handle everything from nightly
              office cleaning to specialized floor care and electrostatic
              disinfection — so your facility always makes the right
              impression.
            </p>
          </AnimateOnScroll>

          {/* Services grid */}
          <AnimateOnScroll direction="up" className="mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading text-center mb-10">
              Services We Offer in {city.name}
            </h3>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.name}>
                <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-gray-100 h-full">
                  <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-sage" />
                  </div>
                  <h4 className="text-lg font-bold text-charcoal font-heading mb-2">
                    <Link href={`/services/${service.slug}`} className="hover:underline">{service.name}</Link>
                  </h4>
                  <p className="text-charcoal-light font-body text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {city.localDetails?.map((detail) => (
        <section key={detail.heading} className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-heading font-bold text-forest mb-5">{detail.heading}</h2>
            {detail.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-charcoal-light leading-relaxed">{paragraph}</p>)}
          </div>
        </section>
      ))}

      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-heading font-bold text-charcoal mb-5">Plan cleaning for your {city.name} facility</h2>
            <p className="text-charcoal-light leading-relaxed mb-5">Start with the building, not a generic package. Share your approximate square footage, floor surfaces, restroom count, and the areas that need attention. Tell the {region.regionName} team when staff or visitors use the space and how cleaners would access it.</p>
            <p className="text-charcoal-light leading-relaxed">Ask for a written scope that separates recurring tasks, daytime support, and periodic floor care. Confirm the proposed schedule, supplies, exclusions, and point of contact before work begins. Availability and pricing are confirmed for your facility during the quote process.</p>
            <Link href={`/locations/${slug}#quote-form`} className="inline-flex mt-6 text-forest font-semibold underline">Discuss your {city.name} cleaning scope</Link>
          </div>
          <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">Cleaning guides from the {region.regionName} resource library</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide) => <article key={guide.slug} className="rounded-xl bg-cream p-6">
              <h4 className="font-heading font-semibold text-forest mb-3"><Link href={`/blog/${guide.slug}`} className="hover:underline">{guide.title}</Link></h4>
              <p className="text-sm text-charcoal-light leading-relaxed">{guide.excerpt}</p>
            </article>)}
          </div>
        </div>
      </section>

      {/* ================================================================
          FACILITY TYPES
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-6">
                Facility Types We Serve in {city.name}
              </h2>
              <p className="text-charcoal-light font-body text-lg leading-relaxed mb-8">
                No matter your industry, Rangel Janitorial has the experience
                and equipment to keep your {city.name} facility spotless. We
                customize every cleaning plan to match your building&apos;s
                specific requirements.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll direction="up">
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facilityTypes.map((facility) => (
                  <StaggerItem key={facility} direction="scale">
                    <div className="flex items-center gap-3 bg-white rounded-lg px-5 py-4 shadow-sm border border-gray-100">
                      <Building2 className="w-5 h-5 text-sage flex-shrink-0" />
                      <span className="text-charcoal font-body text-sm font-medium">
                        {facility}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section className="py-14 sm:py-20 bg-forest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll direction="up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-6">
              Get a Free Quote for Your {city.name} Facility
            </h2>
            <p className="text-white/80 font-body text-lg mb-10 max-w-2xl mx-auto">
              Call us today to discuss your cleaning needs. We&apos;ll provide a
              customized plan and transparent pricing for your {city.name}{' '}
              business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${phoneDigits}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-10 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call {region.phone}
              </a>
              <a
                href={`mailto:${region.email}`}
                className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-colors font-body border border-white/20"
              >
                Email Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Our Work Gallery */}
      <OurWorkGallery />

      {/* ================================================================
          BACK TO PARENT LOCATION
          ================================================================ */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href={`/locations/${region.slug}`}
            className="inline-flex items-center gap-2 text-sage hover:text-forest font-semibold font-body transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to {region.regionName} Location Page
          </Link>
        </div>
      </section>
    </div>
  );
}
