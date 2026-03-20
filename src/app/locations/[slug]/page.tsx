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
      'Thorough removal of pet hair, leaves, dirt, and embedded debris from artificial turf fibers and infill using commercial-grade extraction equipment.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    icon: 'sprout',
    shortDescription:
      'Restore flattened turf fibers to their original upright position and break up compacted infill for improved drainage and appearance.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    icon: 'shieldcheck',
    shortDescription:
      'Professional-grade disinfecting and deodorizing powered by OxyTurf. Eliminate bacteria, pet odors, mold, and mildew at their source.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    icon: 'droplets',
    shortDescription:
      'Regular, reliable pet waste removal from artificial turf. Scheduled weekly or bi-weekly service to keep your yard clean and hygienic.',
  },
  {
    name: 'Powered By OxyTurf',
    slug: 'oxyturf',
    icon: 'leaf',
    shortDescription:
      'Our proprietary OxyTurf cleaning and disinfecting formula delivers deep sanitization, odor elimination, and fiber rejuvenation in every treatment.',
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
      "Professional artificial turf cleaning for Huntington Beach and the LA coastal corridor. From Newport Beach and Costa Mesa to Long Beach and Seal Beach, Murphy's Turf delivers OxyTurf-powered cleaning tailored to Southern California's beachside communities.",
    description: [
      "Huntington Beach and the surrounding LA coastal communities present a unique environment for artificial turf owners. The combination of ocean salt air, coastal humidity, marine layer moisture, and intense Southern California sunshine creates conditions that accelerate contamination in synthetic turf systems. Sand blown inland from the beaches works its way deep into turf fibers and infill, mixing with pet waste residue, pollen, and organic debris to form a compacted layer that blocks drainage and harbors bacteria. The marine layer that rolls through Huntington Beach, Newport Beach, and Seal Beach most mornings creates damp conditions in the turf that promote mold and mildew growth — problems that intensify in shaded areas under patios, pergolas, and near fences. Meanwhile, afternoon sun bakes everything that has accumulated in the turf, crystallizing pet urine into persistent uric acid deposits and amplifying odors that make outdoor spaces unpleasant. Homeowners in Costa Mesa, Long Beach, and throughout the coastal corridor invest heavily in their outdoor living areas, and dirty, smelly artificial turf undermines that investment entirely.",

      "Murphy's Turf brings over 30 years of cleaning and disinfecting experience to the Huntington Beach and LA coastal area. Our proprietary OxyTurf product is specifically formulated to address the dual challenges of coastal moisture and Southern California heat — dissolving uric acid crystals from pet urine, eliminating mold and mildew colonies that thrive in marine layer conditions, and neutralizing the embedded organic compounds that produce persistent odors. Our technicians understand that a turf installation two blocks from the Huntington Beach pier faces different conditions than one in a Costa Mesa backyard shielded from ocean breezes, and we calibrate our treatment approach accordingly. From the prestigious neighborhoods along Pacific Coast Highway in Newport Beach to the family communities of Seal Beach and the bustling commercial districts of Long Beach, Murphy's Turf delivers consistent, professional results that restore artificial turf to like-new condition. Our full range of services — pet hair and debris removal, blooming and de-compacting, disinfecting and deodorizing, poop scooping, and comprehensive OxyTurf treatments — ensures that every aspect of your turf's condition is addressed.",

      "The coastal lifestyle in Huntington Beach means outdoor spaces are used year-round — backyard entertaining, pet play areas, rooftop patios, and poolside lounging are everyday activities, not seasonal luxuries. That year-round use means year-round accumulation of contaminants in your artificial turf. Murphy's Turf offers flexible maintenance plans that keep your turf consistently clean, hygienic, and visually impressive regardless of the season. Whether you need weekly poop scooping for your Newport Beach pet area, monthly OxyTurf disinfecting for your Seal Beach backyard, or quarterly full-service cleaning for your Costa Mesa commercial property, we build a program around your specific needs and budget. When you care about clean turf, call Murphy's Turf — the trusted choice for artificial turf cleaning across the Huntington Beach and LA coastal area.",
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
      "Professional artificial turf cleaning in Huntington Beach, Newport Beach, Costa Mesa, Long Beach & Seal Beach. OxyTurf-powered disinfecting. Call (951) 331-3300.",
    climateNote:
      'The Huntington Beach and LA coastal corridor features a mild Mediterranean climate moderated by ocean breezes and marine layer. Morning coastal fog and humidity promote mold and mildew in turf systems, while afternoon sun intensifies pet odors and bakes contaminants into infill. Windblown sand from nearby beaches embeds in turf fibers and requires specialized extraction.',
    serviceAreaDescription:
      'Our Huntington Beach service area covers the LA coastal corridor from Long Beach in the north through Seal Beach and Huntington Beach, south to Newport Beach and Costa Mesa. We serve residential, commercial, and HOA properties throughout Orange County and southern LA County coastal communities.',
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
      "Our Headquarters — Serving the Inland Empire & Temecula Valley. Murphy's Turf was founded right here in Murrieta, and our deepest roots are in the communities of Southwest Riverside County and the greater Inland Empire.",
    description: [
      "Murrieta is home to Murphy's Turf, and no other artificial turf cleaning company knows this region as intimately as we do. Located in the heart of Southwest Riverside County, Murrieta and the surrounding Inland Empire present a distinctive set of challenges for homeowners who want clean, hygienic artificial turf. Summer temperatures regularly exceed 100 degrees Fahrenheit, the Santa Ana winds sweep through the Temecula Gap with punishing force, and the region's heavy clay soil creates drainage problems that affect turf performance. Our team lives and works in these neighborhoods — from the master-planned communities of Temecula to the growing developments of French Valley and Menifee — and we have spent decades perfecting treatment protocols that deliver clean, odor-free turf despite these demanding conditions. With 30+ years of cleaning and disinfecting experience, Murphy's Turf understands Inland Empire artificial turf at a level no competitor can match.",

      "The extreme heat of the Inland Empire is the defining challenge for artificial turf cleanliness in this region. When surface temperatures on synthetic turf exceed 150 degrees on a typical July afternoon, pet urine crystallizes rapidly into uric acid deposits that bind to infill material and resist every DIY cleaning attempt. Dog waste decomposes and bakes into the turf system within hours, creating bacterial hotspots that produce the overwhelming ammonia smell Inland Empire turf owners know all too well. Murphy's Turf OxyTurf product was developed in this exact environment — our proprietary formula is specifically engineered to dissolve heat-hardened uric acid crystals, eliminate the bacteria that thrive in Murrieta's extreme temperatures, and neutralize the odor compounds that make summer evenings on the patio unbearable. Our blooming and de-compacting service addresses the fiber matting and infill compaction that intense heat accelerates, restoring turf that looks years older than it is back to its original lush condition.",

      "Beyond Murrieta proper, our Inland Empire service area extends throughout the communities that make up this rapidly growing region. In Temecula, wine country homeowners maintain premium outdoor spaces that demand immaculate turf. In Lake Elsinore and Canyon Lake, lakeside properties deal with unique humidity and insect challenges. Hemet and Perris face some of the highest summer temperatures in the region. Wildomar and Temescal Valley homeowners contend with the same clay soil and Santa Ana wind conditions as Murrieta. Winchester's newer developments often have builder-grade turf installations that need professional attention within the first year. Across all of these communities, Murphy's Turf delivers the same OxyTurf-powered cleaning excellence that has made us the Inland Empire's most trusted artificial turf cleaning company. As our headquarters city, Murrieta and Inland Empire customers benefit from the fastest response times and most flexible scheduling in our entire service network. When you care about clean turf, call Murphy's Turf.",
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
      "Murphy's Turf headquarters in Murrieta. Professional artificial turf cleaning, pet odor removal & OxyTurf disinfecting for the Inland Empire & Temecula Valley. Call (951) 331-3300.",
    climateNote:
      'Murrieta and the Inland Empire feature a hot semi-arid climate with summer temperatures regularly exceeding 100 degrees Fahrenheit, mild winters, and minimal rainfall. Heavy clay soil, Santa Ana winds through the Temecula Gap, and intense UV exposure are primary factors in artificial turf contamination and odor development.',
    serviceAreaDescription:
      'Our Murrieta service area covers the entire Inland Empire from Temecula and French Valley through Menifee and Lake Elsinore, out to Hemet and Perris, and including Wildomar, Canyon Lake, Temescal Valley, and Winchester. As our headquarters city, Murrieta customers enjoy the fastest response times in our network.',
    formId: 'xBvd9OY1s3jhTIKq93sM',
    mapQuery: '26323+Jefferson+Avenue+Murrieta+CA+92562',
  },

  martinez: {
    city: 'Martinez',
    slug: 'martinez',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    heroSubtitle:
      "Serving Martinez & the Greater East Bay. Our Contra Costa County team delivers expert artificial turf cleaning calibrated for the fog, marine layer, and unique microclimates of the East Bay — from Concord and Pleasant Hill to Walnut Creek, Antioch, and Brentwood.",
    description: [
      "Martinez sits at the edge of the Carquinez Strait where the Sacramento River Delta meets San Francisco Bay, and this geography creates one of the most fascinating microclimate environments in all of California for artificial turf maintenance. Morning fog and marine layer regularly roll through the strait, keeping Martinez and nearby communities cooler and more humid than areas just a few ridgelines inland. The delta breezes that flow through Martinez and into the East Bay valleys moderate afternoon temperatures but also create uneven drying patterns across turf surfaces. Murphy's Turf has built our Bay Area operation around these nuances. Our team understands that a turf installation in the Alhambra Valley corridor faces different moisture conditions than a property in downtown Martinez, and that a yard in Walnut Creek has different needs than one in Brentwood where temperatures run significantly hotter. With 30+ years of cleaning and disinfecting experience, we assess every property's specific exposure to fog, wind, sun, and drainage before designing a treatment protocol.",

      "The East Bay's moisture-driven challenges make mold, mildew, and algae growth a primary concern for artificial turf owners — problems that are far less common in drier inland regions like the Inland Empire or Sacramento. In Martinez, Concord, Pleasant Hill, and Walnut Creek, coastal moisture settles into turf infill and creates the damp conditions that fungal organisms need to colonize. Shaded areas under trees, along fences, and beneath patio covers are especially vulnerable. Left untreated, mold and mildew produce musty odors, cause discoloration, and create an unhealthy surface for families and pets. Murphy's Turf OxyTurf treatment is specifically effective against these moisture-driven contaminants — our proprietary formula eliminates mold and mildew colonies at their source within the infill layer, not just on the visible surface. For communities further east like Antioch and Brentwood, where summer temperatures climb significantly higher than the coast, pet odor and bacterial contamination become the dominant concerns, and our OxyTurf disinfecting protocol addresses those heat-amplified problems with equal effectiveness.",

      "Water conservation awareness throughout the East Bay has driven tremendous growth in artificial turf installations across Contra Costa County, and that growth has created an urgent need for professional turf hygiene services. Murphy's Turf serves the entire East Bay with our full range of services — pet hair and debris removal, blooming and de-compacting, disinfecting and deodorizing, poop scooping, and comprehensive OxyTurf treatments. Whether you are maintaining a family backyard in Pleasant Hill, a commercial property in Concord, an HOA common area in Walnut Creek, or a pet-friendly yard in Antioch, our technicians deliver the same professional results that have made us California's trusted artificial turf cleaning company. We build maintenance plans around your specific location's microclimate and usage patterns, ensuring your turf stays clean, hygienic, and visually impressive year-round. When you care about clean turf, call Murphy's Turf.",
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
      "East Bay artificial turf cleaning experts. Murphy's Turf serves Martinez, Walnut Creek, Pleasant Hill, Concord, Antioch & Brentwood with OxyTurf-powered disinfecting. Call (951) 331-3300.",
    climateNote:
      'Martinez and the East Bay feature a Mediterranean climate strongly influenced by fog, marine layer, and delta breezes from the Carquinez Strait. Temperatures are mild year-round near the water but significantly hotter inland toward Antioch and Brentwood. Coastal moisture promotes mold and mildew in turf systems, while inland heat amplifies pet odor and bacterial concerns.',
    serviceAreaDescription:
      'Our Martinez service area covers the East Bay from Martinez through Concord, Pleasant Hill, and Walnut Creek in the central corridor, east to Antioch and Brentwood. We serve residential, commercial, and HOA properties throughout Contra Costa County.',
    formId: 'mSr8BxMIMWFW5iSStd5F',
    mapQuery: "Murphy's+Turf+Martinez+CA",
  },

  sacramento: {
    city: 'Sacramento',
    slug: 'sacramento',
    state: 'CA',
    phone: '(951) 331-3300',
    email: 'info@murphysturf.com',
    heroSubtitle:
      "Professional Artificial Turf Cleaning for Sacramento & the Capital Region. Murphy's Turf Sacramento team specializes in heat-resilient turf cleaning for the Central Valley, serving Elk Grove, Roseville, Folsom, and Rancho Cordova.",
    description: [
      "Sacramento's Central Valley location creates a climate that is as rewarding as it is demanding for artificial turf maintenance. The capital region enjoys abundant sunshine and warm temperatures that make outdoor living a year-round reality, but the flip side is summer heat that routinely pushes past 105 degrees Fahrenheit, sometimes for weeks at a stretch. These extreme temperatures stress artificial turf systems in ways that many homeowners do not realize until the problems become severe. Pet urine crystallizes into uric acid deposits within hours on a 110-degree summer day, embedding deep in the infill where no amount of hosing can reach them. Bacteria reproduce at accelerated rates in the warmth, colonizing the protected environment within infill material. Organic debris — leaves from Sacramento's famous tree canopy, pollen, grass clippings from neighboring natural lawns — decomposes rapidly in the heat, producing foul odors and providing food for bacterial colonies. By the time many Sacramento homeowners realize their turf needs professional attention, months or years of contamination have accumulated beneath the surface.",

      "Murphy's Turf brings 30+ years of cleaning and disinfecting experience to the Sacramento metropolitan area, with a team that understands the specific demands of Central Valley heat. Our proprietary OxyTurf product was developed to perform in exactly these conditions — dissolving heat-hardened uric acid crystals that bind to infill material, eliminating the bacterial biofilms that colonize warm turf systems, and neutralizing the odor compounds that make Sacramento backyards unusable during summer evenings. Our blooming and de-compacting service addresses the severe fiber matting and infill compaction that Sacramento's extreme heat accelerates, restoring turf that has been baked flat by years of triple-digit temperatures back to its original lush, upright appearance. The transformation is dramatic — clients regularly describe their post-treatment turf as looking like a brand new installation.",

      "Our Sacramento service area covers the communities where artificial turf has become most popular across the capital region. In Elk Grove, the combination of suburban family living and extreme summer heat has made synthetic turf the default choice for backyards, and our pet hair removal and OxyTurf disinfecting services keep those family spaces safe and clean. Roseville's master-planned communities feature beautiful outdoor spaces where maintaining pristine turf appearance is a priority — our blooming service and comprehensive cleaning programs deliver the visual results Roseville homeowners expect. Folsom's active families and pet owners rely on our poop scooping and regular maintenance plans to keep their turf hygienic between full cleaning appointments. Rancho Cordova's newer developments benefit from our preventive maintenance programs that protect turf investments from the start. Across all four communities and the greater Sacramento metro, Murphy's Turf delivers the same OxyTurf-powered excellence that has made us California's trusted artificial turf cleaning company. When you care about clean turf, call Murphy's Turf.",
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
      "Sacramento's professional artificial turf cleaning. Murphy's Turf serves Elk Grove, Roseville, Folsom & Rancho Cordova with OxyTurf-powered disinfecting. Call (951) 331-3300.",
    climateNote:
      'Sacramento features a hot-summer Mediterranean climate with extreme heat often exceeding 105 degrees Fahrenheit in summer and mild winters. The Central Valley receives minimal summer rainfall, and intense heat accelerates pet odor development, bacterial growth, and infill compaction in artificial turf systems. Sacramento\'s famous tree canopy contributes significant leaf and pollen debris to turf surfaces.',
    serviceAreaDescription:
      'Our Sacramento service area covers the greater capital region including Elk Grove to the south, Roseville to the north, Folsom to the east along the American River corridor, and Rancho Cordova in the central metro. We serve residential, commercial, and HOA properties throughout the Sacramento metropolitan area.',
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

          <div className="max-w-4xl">
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
          </div>
        </div>
      </section>

      {/* City Description */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
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
            </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-cream hover:bg-white rounded-2xl p-6 border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all duration-300"
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
            ))}
          </div>
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
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {location.testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Embed */}
      <section id="quote-form" className="py-16 sm:py-24 bg-cream scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
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
              <div className="grid grid-cols-2 gap-3">
                {location.neighborhoods.map((neighborhood) => (
                  <div
                    key={neighborhood}
                    className="flex items-center gap-2 bg-cream rounded-lg px-4 py-3"
                  >
                    <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                    <span className="text-charcoal font-body text-sm font-medium">
                      {neighborhood}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full">
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
            </div>
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
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-between px-4 py-3">
          <a
            href="#quote-form"
            className="flex-1 mr-2 bg-sage hover:bg-sage-dark text-white font-bold text-sm py-2.5 px-4 rounded-lg text-center font-body transition-colors"
          >
            Get Free Quote
          </a>
          <a
            href="tel:9513313300"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-2.5 px-4 rounded-lg font-body transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
