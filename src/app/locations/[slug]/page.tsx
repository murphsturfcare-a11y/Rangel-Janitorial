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
  PawPrint,
  Leaf,
  ThumbsUp,
  Droplets,
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
}

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    image: '/images/gallery/service-turf-cleaning.png',
    shortDescription:
      'Commercial-grade extraction of pet hair, leaves, dirt, and embedded debris from turf fibers and infill.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    image: '/images/gallery/service-turf-blooming-v2.png',
    shortDescription:
      'Restore flattened fibers and break up compacted infill for better drainage and appearance.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    image: '/images/gallery/service-turf-disinfecting-v2.jpeg',
    shortDescription:
      'Professional-grade disinfecting that eliminates bacteria, pet odors, mold, and mildew at their source.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    image: '/images/gallery/service-turf-deodorizing.png',
    shortDescription:
      'Scheduled weekly or bi-weekly pet waste removal to keep your turf clean and hygienic.',
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
    description: 'Enjoy your fresh, clean turf',
  },
];

const galleryImages = [
  { src: '/images/gallery/gallery-01.png', alt: "Murphy's Turf cleaning project — before and after" },
  { src: '/images/gallery/gallery-02.png', alt: "Murphy's Turf cleaning project — turf disinfecting" },
  { src: '/images/gallery/gallery-12.jpeg', alt: "Murphy's Turf — backyard turf with curved patio edge" },
  { src: '/images/gallery/gallery-13.jpeg', alt: "Murphy's Turf — side yard turf with rock border" },
  { src: '/images/gallery/gallery-14.jpeg', alt: "Murphy's Turf — poolside turf with stepping stones" },
  { src: '/images/gallery/gallery-15.jpeg', alt: "Murphy's Turf — backyard putting green by pool" },
  { src: '/images/gallery/gallery-16.jpeg', alt: "Murphy's Turf — front yard turf with dog" },
  { src: '/images/gallery/gallery-05.png', alt: "Murphy's Turf cleaning project — turf restoration" },
];

const locationFaqs = [
  {
    question: 'How often should artificial turf be cleaned?',
    answer:
      'We recommend professional cleaning every 4-6 weeks for homes with pets. For turf without pets, a quarterly deep clean is usually sufficient.',
  },
  {
    question: 'Are your cleaning products safe for pets and kids?',
    answer:
      'Absolutely. Our cleaning solution is hydrogen peroxide-based with no bleach or ammonia. It breaks down into water and oxygen, making it safe for pets, children, and the environment.',
  },
  {
    question: 'What does your turf cleaning process include?',
    answer:
      'Our process includes pet hair and debris removal, de-weeding, magnet sweep for metal objects, blooming and de-compacting, and a full disinfect and deodorize treatment.',
  },
  {
    question: 'How long does a cleaning take?',
    answer:
      'Most residential cleanings take 45 minutes to 1.5 hours depending on size and services included. Your turf is safe to use as soon as it dries, usually 1-2 hours.',
  },
  {
    question: 'Do I need to be home during service?',
    answer:
      "No, you don't need to be home. We just need access to the turf area and a water source. We'll send a notification when the job is done.",
  },
  {
    question: 'Do you offer maintenance plans?',
    answer:
      'Yes, we offer weekly, bi-weekly, monthly, and quarterly maintenance plans. Regular plans keep costs predictable and your turf clean year-round.',
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
        text: "Our Newport Beach backyard turf was developing a musty smell from the marine layer moisture and our two labs weren't helping. Murphy's Turf came out with their deep cleaning treatment and the difference was unbelievable. No more mold smell, no pet odor, and the fibers look like new. They understand coastal turf challenges better than anyone we've worked with.",
      },
      {
        name: 'Derek Lawson',
        neighborhood: 'Huntington Beach',
        rating: 5,
        text: "Living near the beach, our turf collects sand constantly and the salt air creates issues other companies don't know how to handle. Murphy's Turf deep extraction removed sand we didn't even know was in there, and the deep cleaning treatment left everything disinfected and fresh. Highly recommend for any coastal homeowner.",
      },
      {
        name: 'Nina Patel',
        neighborhood: 'Costa Mesa',
        rating: 5,
        text: "We have a large pet area in our Costa Mesa backyard that three dogs use daily. The smell was terrible by summer. Murphy's Turf poop scooping service combined with their monthly deep cleaning treatment completely solved the problem. Our yard is actually pleasant to be in again. Outstanding service from start to finish.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Huntington Beach & LA Area | Murphy's Turf",
    metaDescription:
      "Professional artificial turf cleaning in Huntington Beach, Newport Beach, Costa Mesa, Long Beach & Seal Beach. Professional-grade disinfecting. Get a free quote today.",
    serviceAreaDescription:
      'Serving the LA coastal corridor from Long Beach through Huntington Beach, Seal Beach, Newport Beach, and Costa Mesa.',
    climateNote:
      'Coastal fog and marine layer promote mold, while afternoon sun bakes pet contaminants into infill.',
    formId: 'HYkmRFcmdQ1GD7aEpXzq',
    mapQuery: "Murphy's+Turf+Huntington+Beach+CA",
    mapEmbedUrl: "https://www.google.com/maps?q=Murphy's+Turf&cid=17738077160014500110&output=embed",
  },

  murrieta: {
    city: 'Murrieta',
    slug: 'murrieta',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
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
        text: "We moved to Temecula from the coast and had no idea how different turf maintenance would be in the Inland Empire heat. The pet smell was unbearable by mid-July. Murphy's Turf deep cleaning treatment completely eliminated the odor and their blooming service made our matted turf look brand new. These guys are the real deal — 30 years of experience shows.",
      },
      {
        name: 'Maria Sandoval',
        neighborhood: 'Menifee',
        rating: 5,
        text: "After trying two other companies that gave us generic treatments, we switched to Murphy's Turf. The difference was immediate — their professional-grade cleaning actually works where other products failed. Our Menifee backyard turf is the best it's ever looked and smelled. When you care about clean turf, these are the people to call.",
      },
      {
        name: 'Tyler Richardson',
        neighborhood: 'French Valley',
        rating: 5,
        text: "Our new turf in French Valley was already starting to smell after just one summer with our dogs. Murphy's Turf came out, did the full deep cleaning treatment plus de-compacting, and within a few hours our backyard went from embarrassing to the best on the block. Being headquartered locally really makes a difference in response time too.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Murrieta & Inland Empire | Murphy's Turf HQ",
    metaDescription:
      "Murphy's Turf headquarters in Murrieta. Professional artificial turf cleaning, pet odor removal & professional-grade disinfecting for the Inland Empire & Temecula Valley. Get a free quote today.",
    serviceAreaDescription:
      'Serving the entire Inland Empire from Temecula and French Valley through Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, and Winchester.',
    climateNote:
      'Summer temps exceed 100°F regularly, baking pet waste into infill and accelerating bacterial growth.',
    formId: 'xBvd9OY1s3jhTIKq93sM',
    mapQuery: '26323+Jefferson+Avenue+Murrieta+CA+92562',
    mapEmbedUrl: "https://www.google.com/maps?q=Murphy's+Turf&cid=4930650047464481625&output=embed",
  },

  martinez: {
    city: 'Martinez',
    slug: 'martinez',
    state: 'CA',
    phone: '(925) 338-0048',
    email: 'info@murphysturf.com',
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
        text: "Our Walnut Creek property had mold growing in the shaded areas of our turf from the Bay Area moisture. Murphy's Turf deep cleaning treatment eliminated every trace of it and their disinfecting protocol killed the bacteria our dogs had been tracking around. They understand East Bay microclimates better than any company we've worked with.",
      },
      {
        name: "Colleen O'Malley",
        neighborhood: 'Concord',
        rating: 5,
        text: "We had tried cleaning our Concord turf ourselves for years with store-bought products that never worked. Murphy's Turf came out, explained exactly what was living in our infill, and did their full deep cleaning treatment. The difference was dramatic — genuinely clean and fresh smelling turf for the first time since installation. Their 30 years of experience really shows.",
      },
      {
        name: 'Arjun Mehta',
        neighborhood: 'Pleasant Hill',
        rating: 5,
        text: "After years of trying to manage our Pleasant Hill lawn ourselves, we finally called Murphy's Turf. Best decision we made. They identified that our turf had compacted infill and embedded debris causing drainage issues, then did their blooming and deep cleaning treatment. The turnaround has been remarkable — our turf looks and drains like new. Worth every penny.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Martinez & East Bay | Murphy's Turf",
    metaDescription:
      "East Bay artificial turf cleaning experts. Murphy's Turf serves Martinez, Walnut Creek, Pleasant Hill, Concord, Antioch & Brentwood with professional-grade disinfecting. Get a free quote today.",
    serviceAreaDescription:
      'Serving Contra Costa County from Martinez through Concord, Pleasant Hill, Walnut Creek, Antioch, and Brentwood.',
    climateNote:
      'Bay Area microclimates range from damp coastal fog near the strait to hot, dry conditions inland.',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    mapQuery: "Murphy's+Turf+Martinez+CA",
  },

  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(916) 432-5033',
    email: 'info@murphysturf.com',
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
        text: "The pet smell on our Elk Grove turf was so bad we stopped using the backyard entirely. Two dogs and Sacramento summers are a brutal combination. Murphy's Turf deep cleaning treatment completely eliminated the odor — not masked it, eliminated it. We can actually enjoy our outdoor space again. They genuinely know Sacramento turf challenges.",
      },
      {
        name: 'Priya Venkatesh',
        neighborhood: 'Roseville',
        rating: 5,
        text: "Our Roseville turf looked terrible after three years of Central Valley heat — fibers matted flat, infill compacted hard. Murphy's Turf blooming and de-compacting service was transformative. The turf looks like it was installed last week. Combined with professional-grade disinfecting, our backyard is clean, fresh, and beautiful again. Phenomenal service.",
      },
      {
        name: 'Danielle Foster',
        neighborhood: 'Folsom',
        rating: 5,
        text: "We signed up for Murphy's Turf monthly maintenance plan for our Folsom property — poop scooping plus quarterly deep cleaning treatment. The consistency has been outstanding. Our turf always looks and smells clean, our kids play on it without concern, and we never have to think about it. Their 30+ years of experience means they know exactly what they're doing.",
      },
    ],
    metaTitle: "Artificial Turf Cleaning in Sacramento, CA | Murphy's Turf",
    metaDescription:
      "Sacramento's professional artificial turf cleaning. Murphy's Turf serves Elk Grove, Roseville, Folsom & Rancho Cordova with professional-grade disinfecting. Get a free quote today.",
    serviceAreaDescription:
      'Serving the greater Sacramento metro including Elk Grove, Roseville, Folsom, and Rancho Cordova.',
    climateNote:
      'Central Valley heat regularly exceeds 105°F, rapidly crystallizing pet urine and multiplying bacteria.',
    formId: 'E4GmpR4mgHj6kL4dFr2w',
    mapQuery: "Murphy's+Turf+Sacramento+CA",
  },
};

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
    <div className="scroll-smooth pb-20 lg:pb-0">

      {/* ================================================================
          1. HERO WITH EMBEDDED LEAD FORM
          ================================================================ */}
      <section id="quote-form" className="relative overflow-hidden scroll-mt-20">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/about-turf-cleaning.png"
            alt=""
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
                Turf Cleaning &amp; Maintenance
                <br />
                <span className="text-cream">
                  in {location.city}, CA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 font-body mb-8">
                30+ Years of Trusted Cleaning for Your Turf &amp; Pets
              </p>
              <a
                href={`tel:${location.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-3 bg-white text-forest font-bold text-lg px-8 py-4 rounded-xl hover:bg-cream transition-colors font-body shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {location.phone}
              </a>
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
              Professional turf care tailored to {location.city}&apos;s specific climate and conditions.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                src="/images/gallery/about-turf-cleaning.png"
                alt="Murphy's Turf professional turf cleaning"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </AnimateOnScroll>

            <AnimateOnScroll direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal font-heading mb-6">
                Reliable Turf Cleaning &amp; Maintenance
              </h2>
              <p className="text-charcoal-light font-body leading-relaxed text-base mb-8">
                30+ years in cleaning &amp; disinfecting, now applied to your lawn. Our trained
                technicians deliver consistent, satisfaction-guaranteed turf care across{' '}
                {location.city} and surrounding communities.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: PawPrint, label: 'Pet Friendly' },
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
                title={`Murphy's Turf - ${location.city}`}
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
                Ready for Fresh, Clean Turf in {location.city}?
              </h2>
              <p className="text-white/80 font-body text-lg mb-8">
                Get your free quote today. Our team is ready to make your turf look and
                smell like new.
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
