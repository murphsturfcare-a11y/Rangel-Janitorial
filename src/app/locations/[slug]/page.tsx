import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Sparkles,
  Droplets,
  Sprout,
  ShieldCheck,
  Leaf,
  ChevronRight,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  name: string;
  neighborhood: string;
  rating: number;
  text: string;
}

interface ServiceItem {
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
}

interface LocationData {
  city: string;
  slug: string;
  state: string;
  phone: string;
  email: string;
  heroSubtitle: string;
  description: string[];
  neighborhoods: string[];
  testimonials: Testimonial[];
  metaTitle: string;
  metaDescription: string;
  climateNote: string;
  serviceAreaDescription: string;
  formId: string;
  mapQuery: string;
}

// ---------------------------------------------------------------------------
// Shared services (same across all locations)
// ---------------------------------------------------------------------------

const services: ServiceItem[] = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    icon: 'sparkles',
    shortDescription:
      'Commercial-grade extraction of pet hair, leaves, dirt, and embedded debris from turf fibers and infill.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    icon: 'sprout',
    shortDescription:
      'Restore flattened fibers and break up compacted infill for better drainage and appearance.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    icon: 'shieldcheck',
    shortDescription:
      'OxyTurf-powered disinfecting that eliminates bacteria, pet odors, mold, and mildew at their source.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    icon: 'droplets',
    shortDescription:
      'Scheduled weekly or bi-weekly pet waste removal to keep your turf clean and hygienic.',
  },
  {
    name: 'Powered By OxyTurf',
    slug: 'oxyturf',
    icon: 'leaf',
    shortDescription:
      'Our proprietary formula delivers deep sanitization, odor elimination, and fiber rejuvenation.',
  },
];

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const locationData: Record<string, LocationData> = {
  'huntington-beach': {
    city: 'Huntington Beach',
    slug: 'huntington-beach',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    heroSubtitle:
      "Expert artificial turf cleaning for Huntington Beach and the LA coastal corridor — from Newport Beach to Long Beach.",
    description: [
      "Salt air, coastal humidity, and marine layer moisture make the LA coast uniquely tough on artificial turf. Sand blows inland and embeds deep in fibers, morning fog promotes mold and mildew, and afternoon sun bakes pet waste into stubborn uric acid deposits. From Huntington Beach to Costa Mesa and Seal Beach, these conditions demand more than a garden hose.",

      "Murphy's Turf uses our proprietary OxyTurf formula to dissolve uric acid, kill mold and bacteria, and neutralize odors at the source — calibrated for each property's specific coastal exposure. Year-round outdoor living means year-round turf contamination, so we offer flexible maintenance plans to keep your turf clean and hygienic every season. When you care about clean turf, call Murphy's Turf.",
    ],
    neighborhoods: [
      'Huntington Beach',
      'Newport Beach',
      'Costa Mesa',
      'Long Beach',
      'Seal Beach',
    ],
    testimonials: [
      {
        name: 'Jessica Moreno',
        neighborhood: 'Newport Beach',
        rating: 5,
        text: "Our Newport Beach backyard turf was developing a musty smell from the marine layer moisture and our two labs weren't helping. Murphy's Turf came out with OxyTurf and the difference was unbelievable. No more mold smell, no pet odor, and the fibers look like new. They understand coastal turf challenges better than anyone we've worked with.",
      },
      {
        name: 'Derek Lawson',
        neighborhood: 'Huntington Beach',
        rating: 5,
        text: "Living near the beach, our turf collects sand constantly and the salt air creates issues other companies don't know how to handle. Murphy's Turf deep extraction removed sand we didn't even know was in there, and the OxyTurf treatment left everything disinfected and fresh. Highly recommend for any coastal homeowner.",
      },
      {
        name: 'Nina Patel',
        neighborhood: 'Costa Mesa',
        rating: 5,
        text: "We have a large pet area in our Costa Mesa backyard that three dogs use daily. The smell was terrible by summer. Murphy's Turf poop scooping service combined with their monthly OxyTurf treatment completely solved the problem. Our yard is actually pleasant to be in again. Outstanding service from start to finish.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Huntington Beach & LA Area | Murphy's Turf",
    metaDescription:
      "Professional artificial turf cleaning in Huntington Beach, Newport Beach, Costa Mesa, Long Beach & Seal Beach. OxyTurf-powered disinfecting. Get a free quote today.",
    climateNote:
      'Mild Mediterranean climate with coastal fog and marine layer that promote mold, plus afternoon sun that bakes pet contaminants into infill.',
    serviceAreaDescription:
      'Serving the LA coastal corridor from Long Beach through Huntington Beach, Seal Beach, Newport Beach, and Costa Mesa.',
    formId: 'HYkmRFcmdQ1GD7aEpXzq',
    mapQuery: "Murphy's+Turf+Huntington+Beach+CA",
  },

  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    heroSubtitle:
      "Our Headquarters — serving the Inland Empire and Temecula Valley from right here in Murrieta.",
    description: [
      "Murrieta and the Inland Empire hit 100+ degrees regularly, and that heat is brutal on artificial turf. Pet urine crystallizes into stubborn uric acid deposits within hours, bacteria multiply fast in warm infill, and Santa Ana winds pack debris deep into fibers. Heavy clay soil compounds drainage issues across the region from Temecula to Menifee and Lake Elsinore.",

      "OxyTurf was developed in this exact environment — our formula dissolves heat-hardened uric acid, eliminates bacteria, and neutralizes the ammonia smell Inland Empire turf owners know too well. Our blooming service restores fibers flattened by years of triple-digit heat. As our headquarters city, Murrieta customers get the fastest response times in our network. When you care about clean turf, call Murphy's Turf.",
    ],
    neighborhoods: [
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
        text: "We moved to Temecula from the coast and had no idea how different turf maintenance would be in the Inland Empire heat. The pet smell was unbearable by mid-July. Murphy's Turf OxyTurf treatment completely eliminated the odor and their blooming service made our matted turf look brand new. These guys are the real deal — 30 years of experience shows.",
      },
      {
        name: 'Maria Sandoval',
        neighborhood: 'Menifee',
        rating: 5,
        text: "After trying two other companies that gave us generic treatments, we switched to Murphy's Turf. The difference was immediate — OxyTurf actually works where other products failed. Our Menifee backyard turf is the best it's ever looked and smelled. When you care about clean turf, these are the people to call.",
      },
      {
        name: 'Tyler Richardson',
        neighborhood: 'French Valley',
        rating: 5,
        text: "Our new turf in French Valley was already starting to smell after just one summer with our dogs. Murphy's Turf came out, did the full OxyTurf treatment plus de-compacting, and within a few hours our backyard went from embarrassing to the best on the block. Being headquartered locally really makes a difference in response time too.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Murrieta & Inland Empire | Murphy's Turf HQ",
    metaDescription:
      "Murphy's Turf headquarters in Murrieta. Professional artificial turf cleaning, pet odor removal & OxyTurf disinfecting for the Inland Empire & Temecula Valley. Get a free quote today.",
    climateNote:
      'Hot semi-arid climate with summers regularly exceeding 100°F, Santa Ana winds, and heavy clay soil — all of which accelerate turf contamination and odor.',
    serviceAreaDescription:
      'Serving the entire Inland Empire from Temecula and French Valley through Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, and Winchester.',
    formId: 'xBvd9OY1s3jhTIKq93sM',
    mapQuery: '26323+Jefferson+Avenue+Murrieta+CA+92562',
  },

  martinez: {
    city: 'Martinez',
    slug: 'martinez',
    state: 'CA',
    phone: '(925) 338-0048',
    email: 'info@murphysturf.com',
    heroSubtitle:
      "Expert turf cleaning for Martinez and the East Bay — calibrated for fog, delta breezes, and Bay Area microclimates.",
    description: [
      "The East Bay's unique geography — where the Sacramento Delta meets the San Francisco Bay — creates moisture conditions that are tough on turf. Morning fog and marine layer settle into infill, promoting mold and mildew growth, especially in shaded areas. Further east in Antioch and Brentwood, higher summer temps shift the problem to pet odor and bacterial buildup.",

      "OxyTurf eliminates mold and mildew at the source within the infill layer, not just on the surface. For hotter inland properties, the same formula tackles heat-amplified pet odors and bacteria. We tailor every treatment to your property's specific microclimate and build maintenance plans that keep your turf clean year-round. When you care about clean turf, call Murphy's Turf.",
    ],
    neighborhoods: [
      'Concord',
      'Pleasant Hill',
      'Walnut Creek',
      'Antioch',
      'Brentwood',
    ],
    testimonials: [
      {
        name: 'Richard Yamamoto',
        neighborhood: 'Walnut Creek',
        rating: 5,
        text: "Our Walnut Creek property had mold growing in the shaded areas of our turf from the Bay Area moisture. Murphy's Turf OxyTurf treatment eliminated every trace of it and their disinfecting protocol killed the bacteria our dogs had been tracking around. They understand East Bay microclimates better than any company we've worked with.",
      },
      {
        name: "Colleen O'Malley",
        neighborhood: 'Concord',
        rating: 5,
        text: "We had tried cleaning our Concord turf ourselves for years with store-bought products that never worked. Murphy's Turf came out, explained exactly what was living in our infill, and did their full OxyTurf treatment. The difference was dramatic — genuinely clean and fresh smelling turf for the first time since installation. Their 30 years of experience really shows.",
      },
      {
        name: 'Arjun Mehta',
        neighborhood: 'Pleasant Hill',
        rating: 5,
        text: "After years of trying to manage our Pleasant Hill lawn ourselves, we finally called Murphy's Turf. Best decision we made. They identified that our turf had compacted infill and embedded debris causing drainage issues, then did their blooming and OxyTurf treatment. The turnaround has been remarkable — our turf looks and drains like new. Worth every penny.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Martinez & East Bay | Murphy's Turf",
    metaDescription:
      "East Bay artificial turf cleaning experts. Murphy's Turf serves Martinez, Walnut Creek, Pleasant Hill, Concord, Antioch & Brentwood with OxyTurf-powered disinfecting. Get a free quote today.",
    climateNote:
      'Mediterranean climate shaped by fog, marine layer, and delta breezes — mild and damp near the strait, significantly hotter inland toward Antioch and Brentwood.',
    serviceAreaDescription:
      'Serving Contra Costa County from Martinez through Concord, Pleasant Hill, Walnut Creek, Antioch, and Brentwood.',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    mapQuery: "Murphy's+Turf+Martinez+CA",
  },

  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(916) 432-5033',
    email: 'info@murphysturf.com',
    heroSubtitle:
      "Heat-resilient turf cleaning for Sacramento and the Capital Region — serving Elk Grove, Roseville, Folsom, and Rancho Cordova.",
    description: [
      "Sacramento summers regularly push past 105°F, and that extreme heat is the number one enemy of artificial turf. Pet urine crystallizes into deep uric acid deposits within hours, bacteria multiply fast in warm infill, and debris from Sacramento's famous tree canopy decomposes rapidly — producing odors and feeding bacterial colonies beneath the surface.",

      "OxyTurf dissolves heat-hardened uric acid, eliminates bacterial biofilms, and neutralizes odors that make backyards unusable on summer evenings. Our blooming service restores fibers baked flat by years of triple-digit heat — clients say their turf looks like a new installation. When you care about clean turf, call Murphy's Turf.",
    ],
    neighborhoods: [
      'Elk Grove',
      'Roseville',
      'Folsom',
      'Rancho Cordova',
    ],
    testimonials: [
      {
        name: 'Greg Thomsen',
        neighborhood: 'Elk Grove',
        rating: 5,
        text: "The pet smell on our Elk Grove turf was so bad we stopped using the backyard entirely. Two dogs and Sacramento summers are a brutal combination. Murphy's Turf OxyTurf treatment completely eliminated the odor — not masked it, eliminated it. We can actually enjoy our outdoor space again. They genuinely know Sacramento turf challenges.",
      },
      {
        name: 'Priya Venkatesh',
        neighborhood: 'Roseville',
        rating: 5,
        text: "Our Roseville turf looked terrible after three years of Central Valley heat — fibers matted flat, infill compacted hard. Murphy's Turf blooming and de-compacting service was transformative. The turf looks like it was installed last week. Combined with OxyTurf disinfecting, our backyard is clean, fresh, and beautiful again. Phenomenal service.",
      },
      {
        name: 'Danielle Foster',
        neighborhood: 'Folsom',
        rating: 5,
        text: "We signed up for Murphy's Turf monthly maintenance plan for our Folsom property — poop scooping plus quarterly OxyTurf treatment. The consistency has been outstanding. Our turf always looks and smells clean, our kids play on it without concern, and we never have to think about it. Their 30+ years of experience means they know exactly what they're doing.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Sacramento, CA | Murphy's Turf",
    metaDescription:
      "Sacramento's professional artificial turf cleaning. Murphy's Turf serves Elk Grove, Roseville, Folsom & Rancho Cordova with OxyTurf-powered disinfecting. Get a free quote today.",
    climateNote:
      'Hot-summer Mediterranean climate with temps often exceeding 105°F. Intense heat accelerates pet odor, bacterial growth, and infill compaction.',
    serviceAreaDescription:
      'Serving the greater Sacramento metro including Elk Grove, Roseville, Folsom, and Rancho Cordova.',
    formId: 'E4GmpR4mgHj6kL4dFr2w',
    mapQuery: "Murphy's+Turf+Sacramento+CA",
  },
};

// ---------------------------------------------------------------------------
// Icon helper
// ---------------------------------------------------------------------------

function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  const props = { className: className || 'w-6 h-6' };
  switch (icon) {
    case 'sparkles':
      return <Sparkles {...props} />;
    case 'sprout':
      return <Sprout {...props} />;
    case 'shieldcheck':
      return <ShieldCheck {...props} />;
    case 'droplets':
      return <Droplets {...props} />;
    case 'leaf':
      return <Leaf {...props} />;
    default:
      return <Sparkles {...props} />;
  }
}

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return [
    { slug: 'huntington-beach' },
    { slug: 'murrieta' },
    { slug: 'martinez' },
    { slug: 'sacramento' },
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

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-dark/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <AnimateOnScroll direction="up" className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-body px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              {location.city}, California
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-6 leading-tight">
              Artificial Turf Cleaning
              <br />
              <span className="text-cream">
                in {location.city}, CA
              </span>
            </h1>
            <p className="text-lg text-white/80 font-body leading-relaxed max-w-3xl">
              {location.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-forest font-semibold px-8 py-3.5 rounded-lg hover:bg-cream transition-colors font-body shadow-md"
              >
                <Phone className="w-4 h-4" />
                {location.phone}
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* City Description */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <AnimateOnScroll direction="up" className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-8">
                Professional Artificial Turf Cleaning in {location.city}
              </h2>
              <div className="space-y-6">
                {location.description.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-charcoal-light font-body leading-relaxed text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimateOnScroll>
            <div className="space-y-6">
              {/* Climate Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-charcoal font-heading mb-3 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sage" />
                  Local Climate Notes
                </h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">
                  {location.climateNote}
                </p>
              </div>
              {/* Quick Contact Card */}
              <div className="bg-forest rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold font-heading mb-4">
                  {location.city} Office
                </h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                    className="flex items-center gap-3 text-white/90 hover:text-sage-light transition-colors font-body text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {location.phone}
                  </a>
                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 text-white/90 hover:text-sage-light transition-colors font-body text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {location.email}
                  </a>
                  <div className="flex items-center gap-3 text-white/90 font-body text-sm">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    Mon-Fri 7am-6pm, Sat 8am-4pm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Services Available in {location.city}
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Every service is powered by OxyTurf and tailored to {location.city}&apos;s specific
              climate and conditions.
            </p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group bg-cream hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all duration-300 card-hover block"
                >
                  <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sage/20 transition-colors">
                    <ServiceIcon icon={service.icon} className="w-6 h-6 text-sage" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal font-heading mb-2 group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-charcoal-light font-body text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sage font-semibold font-body text-sm group-hover:text-forest transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              What {location.city} Customers Say
            </h2>
            <p className="text-lg text-charcoal-light font-body">
              Real reviews from real neighbors in {location.city}.
            </p>
          </div>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {location.testimonials.map((testimonial, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 card-hover">
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
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-charcoal font-heading text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-charcoal-light font-body text-xs">
                      {testimonial.neighborhood}, {location.city}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Lead Form Embed */}
      <section id="quote-form" className="py-16 sm:py-24 bg-cream scroll-mt-20">
        <AnimateOnScroll direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Get Your Free Quote in {location.city}
            </h2>
            <p className="text-lg text-charcoal-light font-body">
              Fill out the form below and we&apos;ll get back to you within 24 hours
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-4 border border-gray-100">
            <iframe
              src={`https://api.leadconnectorhq.com/widget/form/${location.formId}`}
              style={{ width: '100%', height: '848px', border: 'none', borderRadius: '3px' }}
              title={`Get a Free Quote - ${location.city}`}
              loading="lazy"
            />
          </div>
        </AnimateOnScroll>
      </section>

      {/* Service Area Details & Neighborhoods */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-charcoal font-heading mb-6">
                Neighborhoods We Serve in {location.city}
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed mb-8">
                {location.serviceAreaDescription}
              </p>
              <StaggerContainer staggerDelay={0.05} className="grid grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => (
                  <StaggerItem key={neighborhood} direction="scale">
                    <div className="flex items-center gap-2 bg-cream rounded-lg px-4 py-3">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                      <span className="text-charcoal font-body text-sm font-medium">
                        {neighborhood}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Google Map */}
            <AnimateOnScroll direction="fade" className="w-full">
              <iframe
                src={`https://www.google.com/maps?q=${location.mapQuery}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Murphy's Turf - ${location.city}`}
                className="rounded-xl"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Other Locations CTA */}
      <section className="py-12 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white font-heading mb-1">
                We Also Serve Other California Communities
              </h3>
              <p className="text-white/70 font-body text-sm">
                See all locations or contact us if you don&apos;t see your area listed.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-white text-forest font-semibold px-6 py-3 rounded-lg hover:bg-cream transition-colors font-body shadow-sm flex-shrink-0"
            >
              View All Locations
              <ArrowRight className="w-4 h-4" />
            </Link>
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
