import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Check,
  ArrowRight,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Clock,
  ThumbsUp,
  TrendingUp,
  Zap,
  Sparkles,
  Droplets,
  Building2,
  UserCheck,
  CalendarCheck,
  Layers,
  Gauge,
  type LucideIcon,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQ {
  question: string;
  answer: string;
}

interface BenefitCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BeforeAfterPair {
  label: string;
  beforeColor: string;
  afterColor: string;
  beforeCaption: string;
  afterCaption: string;
}

interface RelatedService {
  name: string;
  slug: string;
}

interface ServiceData {
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  tagline: string;
  metaDescription: string;
  descriptionParagraphs: string[];
  included: string[];
  benefits: BenefitCard[];
  beforeAfter: BeforeAfterPair[];
  faqs: FAQ[];
  relatedServices: RelatedService[];
}

// ---------------------------------------------------------------------------
// Service Data
// ---------------------------------------------------------------------------

const servicesData: Record<string, ServiceData> = {
  'janitorial-cleaning': {
    name: 'Janitorial Cleaning',
    slug: 'janitorial-cleaning',
    image: '/images/services/janitorial-cleaning.png',
    imageAlt: 'Professional janitorial crew cleaning a corporate office building',
    tagline: 'Reliable, thorough cleaning that creates excellent first impressions',
    metaDescription:
      'Professional janitorial cleaning services in California. Rangel Janitorial provides daily and nightly cleaning for offices, medical facilities, and commercial buildings. 30+ years experience. Get a free quote.',
    descriptionParagraphs: [
      'Rangel Janitorial provides comprehensive janitorial cleaning services for commercial facilities throughout California. With over 30 years of experience, our trained crews deliver consistent, thorough cleaning that keeps your building looking its best every single day. We understand that a clean facility creates excellent first impressions for your tenants, visitors, and employees.',
      'Our janitorial services cover every aspect of daily and nightly facility maintenance. From lobbies and common areas to restrooms, break rooms, and individual office suites, we follow detailed cleaning checklists customized to your building\'s specific needs. Our crews are trained in proper cleaning techniques, chemical handling, and safety protocols to ensure the highest quality results with every visit.',
      'We serve a wide range of facility types including Class A office buildings, corporate campuses, light industrial parks, multi-unit complexes, medical and dental facilities, municipalities, and fitness centers. Each facility type has unique cleaning requirements, and our team has the expertise to meet them all. Whether you need nightly cleaning for a corporate office or specialized cleaning for a medical facility, Rangel Janitorial delivers reliable, professional results.',
      'Our commitment to quality goes beyond just cleaning. We provide dedicated account managers, regular quality inspections, and open communication channels to ensure your complete satisfaction. We carry full insurance and all employees are thoroughly trained for your peace of mind. When you partner with Rangel Janitorial, you get a cleaning team that treats your facility as if it were their own.',
    ],
    included: [
      'Lobby and common area cleaning',
      'Restroom sanitation and restocking',
      'Break room and kitchen cleaning',
      'Trash and recycling removal',
      'Dusting and surface wiping',
      'Floor sweeping, mopping, and vacuuming',
    ],
    benefits: [
      {
        icon: Building2,
        title: 'Professional First Impressions',
        description:
          'A consistently clean facility makes a strong impression on tenants, visitors, and employees from the moment they walk through the door.',
      },
      {
        icon: ShieldCheck,
        title: 'Healthier Work Environment',
        description:
          'Regular sanitization of high-touch surfaces and restrooms reduces the spread of illness and creates a healthier workplace.',
      },
      {
        icon: CalendarCheck,
        title: 'Consistent & Reliable',
        description:
          'Our trained crews follow detailed checklists and regular quality inspections ensure the same high standard every visit.',
      },
      {
        icon: ThumbsUp,
        title: '30+ Years of Experience',
        description:
          'Decades of commercial cleaning expertise mean we know how to handle any facility type and any cleaning challenge.',
      },
    ],
    beforeAfter: [
      {
        label: 'Office Common Area',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Dusty, cluttered common area before cleaning',
        afterCaption: 'Spotless, organized space after professional janitorial service',
      },
      {
        label: 'Restroom Sanitation',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/40',
        beforeCaption: 'Restroom needing attention',
        afterCaption: 'Fully sanitized and restocked restroom',
      },
    ],
    faqs: [
      {
        question: 'What types of facilities do you clean?',
        answer:
          'We clean Class A office buildings, corporate campuses, light industrial parks, multi-unit complexes, medical and dental facilities, municipalities, and fitness centers. Each facility type has unique requirements and our team is trained to meet them all.',
      },
      {
        question: 'Do you offer daily or nightly cleaning?',
        answer:
          'Yes, we offer both daily and nightly janitorial services. Most office buildings prefer nightly cleaning so work is completed before employees arrive each morning. We work with you to determine the best schedule for your facility.',
      },
      {
        question: 'Are your employees trained and insured?',
        answer:
          'Absolutely. All Rangel Janitorial employees are professionally trained on cleaning protocols and safety procedures. We carry comprehensive general liability and workers compensation insurance for your protection and peace of mind.',
      },
      {
        question: 'How do you ensure consistent quality?',
        answer:
          'We use detailed cleaning checklists customized to your facility, conduct regular quality inspections, and assign dedicated account managers who serve as your single point of contact. If an issue ever arises, we address it immediately.',
      },
    ],
    relatedServices: [
      { name: 'Day Porter', slug: 'day-porter' },
      { name: 'Electrostatic Disinfection', slug: 'electrostatic-disinfection' },
      { name: 'Floor Care', slug: 'floor-care' },
    ],
  },

  'day-porter': {
    name: 'Day Porter',
    slug: 'day-porter',
    image: '/images/services/day-porter.png',
    imageAlt: 'Day porter maintaining a commercial building lobby during business hours',
    tagline: 'On-site daytime cleaning that keeps your facility pristine throughout the day',
    metaDescription:
      'Professional day porter services in California. Rangel Janitorial provides on-site daytime cleaning and maintenance for offices, lobbies, and commercial facilities. Get a free quote.',
    descriptionParagraphs: [
      'Day porter services provide on-site cleaning and maintenance throughout the business day, ensuring your facility looks its best during operating hours when it matters most. Unlike nightly janitorial cleaning that happens after hours, day porters are present during the workday to handle real-time cleaning needs, maintain restrooms, and keep common areas spotless.',
      'Rangel Janitorial day porters are trained professionals who understand the importance of working discreetly and efficiently in occupied spaces. They handle a wide range of tasks including lobby maintenance, restroom checks and restocking, break room cleaning, conference room turnover, spill cleanup, and trash management. Their presence ensures that high-traffic areas never deteriorate throughout the day.',
      'Day porter services are especially valuable for facilities with heavy foot traffic, such as corporate lobbies, medical offices, fitness centers, and multi-tenant buildings. In these environments, a single nightly cleaning is often not enough to maintain the level of cleanliness that tenants and visitors expect. A day porter bridges that gap, addressing messes as they happen and maintaining a consistently professional appearance.',
      'Our day porter program is flexible and scalable. Whether you need a porter for a few hours each morning or full-day coverage across multiple buildings, we customize the service to match your facility\'s needs and budget. Each porter follows a detailed task list that we develop in consultation with you, ensuring that the most important areas of your building receive the attention they deserve throughout the day.',
    ],
    included: [
      'Lobby and entrance maintenance',
      'Restroom checks and restocking',
      'Break room and kitchen upkeep',
      'Conference room turnover',
      'Spill and mess cleanup',
      'Trash monitoring and removal',
    ],
    benefits: [
      {
        icon: Clock,
        title: 'Real-Time Cleaning',
        description:
          'Issues are addressed as they happen rather than waiting until after hours, keeping your facility consistently clean.',
      },
      {
        icon: UserCheck,
        title: 'Professional On-Site Presence',
        description:
          'A trained professional dedicated to your facility who understands your specific needs and building layout.',
      },
      {
        icon: Sparkles,
        title: 'Always Presentation-Ready',
        description:
          'Common areas, restrooms, and lobbies stay pristine throughout the day, impressing tenants and visitors.',
      },
      {
        icon: Gauge,
        title: 'Flexible Scheduling',
        description:
          'Choose the hours and days that match your facility\'s peak traffic times for maximum impact.',
      },
    ],
    beforeAfter: [
      {
        label: 'Lobby Maintenance',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Lobby after morning rush',
        afterCaption: 'Lobby maintained throughout the day by day porter',
      },
      {
        label: 'Break Room Upkeep',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Break room after lunch hour',
        afterCaption: 'Cleaned and restocked by mid-afternoon',
      },
    ],
    faqs: [
      {
        question: 'What does a day porter do?',
        answer:
          'A day porter provides on-site cleaning and maintenance during business hours. Tasks typically include lobby upkeep, restroom monitoring and restocking, break room cleaning, conference room turnover, spill cleanup, trash management, and any other cleaning needs that arise during the workday.',
      },
      {
        question: 'How is day porter service different from nightly janitorial?',
        answer:
          'Nightly janitorial cleaning provides a thorough deep clean after business hours. Day porter service supplements this by maintaining cleanliness throughout the day during operating hours. Many facilities benefit from both services working together for the best results.',
      },
      {
        question: 'Can I customize the day porter schedule?',
        answer:
          'Absolutely. We offer flexible scheduling from a few hours per day to full-day coverage. We work with you to identify peak traffic times and critical areas, then build a custom task list and schedule that maximizes the impact of the service.',
      },
      {
        question: 'Is day porter service available for multi-building campuses?',
        answer:
          'Yes. We can assign porters to multiple buildings on a campus and create rotation schedules that ensure every building receives attention throughout the day. Our porters are trained to work independently and manage their time efficiently across multiple locations.',
      },
    ],
    relatedServices: [
      { name: 'Janitorial Cleaning', slug: 'janitorial-cleaning' },
      { name: 'Electrostatic Disinfection', slug: 'electrostatic-disinfection' },
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning' },
    ],
  },

  'electrostatic-disinfection': {
    name: 'Electrostatic Disinfection',
    slug: 'electrostatic-disinfection',
    image: '/images/services/electrostatic-disinfection.png',
    imageAlt: 'Technician performing electrostatic disinfection in a commercial office',
    tagline: 'Advanced disinfection technology for complete surface coverage',
    metaDescription:
      'Professional electrostatic disinfection services in California. Rangel Janitorial uses advanced electrostatic spraying technology for thorough disinfection of commercial facilities. Get a free quote.',
    descriptionParagraphs: [
      'Electrostatic disinfection is an advanced cleaning technology that provides superior surface coverage compared to traditional wiping or spraying methods. The electrostatic sprayer applies a positive electrical charge to disinfectant particles as they leave the nozzle. These charged droplets are attracted to surfaces and wrap around objects, coating them evenly on all sides including hard-to-reach areas that manual cleaning often misses.',
      'Rangel Janitorial utilizes hospital-grade disinfectants applied through professional electrostatic spraying equipment. This method is particularly effective for facilities that require high levels of sanitation, including medical and dental offices, fitness centers, schools, and any building where infection control is a priority. The even coverage ensures that every surface receives the proper concentration of disinfectant for effective pathogen elimination.',
      'The electrostatic disinfection process is fast and efficient, allowing us to treat large areas in a fraction of the time required by traditional methods. A single technician with an electrostatic sprayer can disinfect an entire office floor in minutes, making it practical for regular application as part of your ongoing maintenance program. The disinfectant dries quickly and leaves no residue, so your facility can be occupied shortly after treatment.',
      'We recommend electrostatic disinfection as a complement to regular janitorial cleaning, not a replacement. While daily cleaning removes visible dirt and debris, electrostatic disinfection targets the invisible pathogens on surfaces that standard cleaning may not eliminate. For facilities in Sacramento, Murrieta, Walnut Creek, and throughout California, this service provides an extra layer of protection for the health and safety of your building occupants.',
    ],
    included: [
      'Hospital-grade disinfectant application',
      'Full-room electrostatic spraying',
      'High-touch surface focus',
      'Restroom disinfection',
      'Common area treatment',
      'Post-treatment safety verification',
    ],
    benefits: [
      {
        icon: Zap,
        title: 'Superior Coverage',
        description:
          'Charged droplets wrap around surfaces and reach areas that manual wiping cannot, ensuring complete disinfection.',
      },
      {
        icon: ShieldCheck,
        title: 'Hospital-Grade Protection',
        description:
          'We use EPA-registered, hospital-grade disinfectants that eliminate a broad spectrum of pathogens including bacteria and viruses.',
      },
      {
        icon: Clock,
        title: 'Fast & Efficient',
        description:
          'Large areas can be treated in minutes, minimizing disruption to your facility operations.',
      },
      {
        icon: ThumbsUp,
        title: 'Safe for Occupants',
        description:
          'The disinfectant dries quickly with no residue, allowing your facility to be used shortly after treatment.',
      },
    ],
    beforeAfter: [
      {
        label: 'Office Workspace Disinfection',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Standard cleaning leaves invisible pathogens',
        afterCaption: 'Electrostatic treatment provides complete surface coverage',
      },
      {
        label: 'Medical Facility Treatment',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'High-touch surfaces harbor bacteria',
        afterCaption: 'Hospital-grade disinfection of all surfaces',
      },
    ],
    faqs: [
      {
        question: 'How does electrostatic disinfection work?',
        answer:
          'The sprayer applies a positive electrical charge to disinfectant droplets as they exit the nozzle. These charged particles are attracted to surfaces like a magnet, wrapping around objects and coating them evenly on all sides. This ensures complete coverage including the backs and undersides of surfaces that manual wiping typically misses.',
      },
      {
        question: 'Is electrostatic disinfection safe for electronics?',
        answer:
          'Yes. The ultra-fine mist produced by electrostatic sprayers uses minimal liquid, so it will not damage electronics, paper, or other sensitive materials. The disinfectant dries quickly and leaves no residue.',
      },
      {
        question: 'How often should electrostatic disinfection be performed?',
        answer:
          'Frequency depends on your facility type and occupancy. Medical facilities and fitness centers may benefit from daily or several-times-per-week treatments. Office buildings typically schedule weekly or bi-weekly treatments. We will recommend a frequency based on your specific needs.',
      },
      {
        question: 'Can this replace regular janitorial cleaning?',
        answer:
          'No. Electrostatic disinfection targets invisible pathogens on surfaces but does not remove visible dirt, dust, or debris. It works best as a complement to regular janitorial cleaning, adding an extra layer of sanitation to your maintenance program.',
      },
    ],
    relatedServices: [
      { name: 'Janitorial Cleaning', slug: 'janitorial-cleaning' },
      { name: 'Day Porter', slug: 'day-porter' },
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning' },
    ],
  },

  'floor-care': {
    name: 'Floor Care',
    slug: 'floor-care',
    image: '/images/services/floor-care.png',
    imageAlt: 'Commercial floor care specialist stripping and waxing VCT floors',
    tagline: 'Professional floor maintenance that protects your investment and looks stunning',
    metaDescription:
      'Professional floor care services in California including VCT strip and wax, polishing, and maintenance. Rangel Janitorial keeps your commercial floors pristine. 30+ years experience. Get a free quote.',
    descriptionParagraphs: [
      'Your facility\'s floors are one of the first things visitors notice and one of the most heavily used surfaces in any building. Professional floor care is essential for maintaining both the appearance and longevity of your flooring investment. Rangel Janitorial provides comprehensive floor care services including VCT strip and wax, floor polishing, buffing, and ongoing maintenance programs tailored to your specific flooring type.',
      'VCT (vinyl composition tile) is one of the most common commercial flooring materials, found in offices, schools, medical facilities, and retail spaces across California. Over time, foot traffic wears down the protective finish, leaving floors looking dull, scratched, and unprofessional. Our strip and wax service removes all old finish down to the bare tile, then applies multiple coats of high-quality floor finish that restores a brilliant shine and provides a durable protective barrier against daily wear.',
      'Beyond VCT, we provide specialized care for a variety of commercial flooring types including concrete, terrazzo, ceramic tile, and natural stone. Each material has unique maintenance requirements, and our technicians are trained in the proper techniques and products for each type. Whether your floors need a routine buff and polish or a complete restoration, we have the equipment and expertise to deliver outstanding results.',
      'We offer both one-time floor restoration services and ongoing maintenance programs. Regular maintenance — including periodic buffing, spot cleaning, and scheduled re-coating — dramatically extends the life of your floor finish and keeps your facility looking its best year-round. Our team will assess your floors and recommend a maintenance schedule that balances appearance, protection, and budget for your specific situation.',
    ],
    included: [
      'VCT strip and wax',
      'Floor polishing and buffing',
      'Multi-coat finish application',
      'Specialized stone and tile care',
      'Ongoing maintenance programs',
      'Floor assessment and recommendations',
    ],
    benefits: [
      {
        icon: Sparkles,
        title: 'Restored Appearance',
        description:
          'Strip and wax services bring dull, worn floors back to a brilliant, professional shine.',
      },
      {
        icon: Layers,
        title: 'Protective Barrier',
        description:
          'Multiple coats of quality finish protect your flooring from scratches, scuffs, and daily wear.',
      },
      {
        icon: TrendingUp,
        title: 'Extended Floor Life',
        description:
          'Regular maintenance dramatically extends the life of your flooring investment, saving money over time.',
      },
      {
        icon: Gauge,
        title: 'Custom Maintenance Plans',
        description:
          'We create a maintenance schedule tailored to your floor type, traffic level, and budget.',
      },
    ],
    beforeAfter: [
      {
        label: 'VCT Strip and Wax',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Worn, dull VCT flooring with visible scuffs',
        afterCaption: 'Brilliant shine after professional strip and wax',
      },
      {
        label: 'Lobby Floor Restoration',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Heavily trafficked lobby floor',
        afterCaption: 'Restored floor with fresh finish and shine',
      },
    ],
    faqs: [
      {
        question: 'How often should VCT floors be stripped and waxed?',
        answer:
          'Most commercial VCT floors benefit from a full strip and wax every 12 to 18 months, with periodic buffing and spot maintenance in between. High-traffic areas like lobbies and hallways may need more frequent attention. We will assess your floors and recommend the ideal schedule.',
      },
      {
        question: 'How long does the strip and wax process take?',
        answer:
          'Timing depends on the square footage and condition of the floors. A typical office floor takes one to two evenings to complete, including stripping, cleaning, and applying multiple coats of finish with drying time between each coat. We schedule this work during off-hours to minimize disruption.',
      },
      {
        question: 'Can you work on floors other than VCT?',
        answer:
          'Yes. We provide specialized care for concrete, terrazzo, ceramic tile, natural stone, and other commercial flooring types. Each material requires specific techniques and products, and our technicians are trained to handle them all.',
      },
      {
        question: 'Do you offer ongoing floor maintenance programs?',
        answer:
          'Absolutely. We offer scheduled maintenance programs that include periodic buffing, spot cleaning, and re-coating to keep your floors looking great between full strip and wax services. Regular maintenance extends floor life and reduces overall costs.',
      },
    ],
    relatedServices: [
      { name: 'Janitorial Cleaning', slug: 'janitorial-cleaning' },
      { name: 'Carpet Cleaning', slug: 'carpet-cleaning' },
      { name: 'Day Porter', slug: 'day-porter' },
    ],
  },

  'carpet-cleaning': {
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    image: '/images/services/carpet-cleaning.png',
    imageAlt: 'Professional carpet cleaning with hot water extraction in a commercial building',
    tagline: 'Extend carpet life and improve indoor air quality with professional cleaning',
    metaDescription:
      'Professional commercial carpet cleaning services in California. Rangel Janitorial uses professional-grade equipment for deep carpet cleaning in offices and commercial facilities. Get a free quote.',
    descriptionParagraphs: [
      'Commercial carpets take a beating from daily foot traffic, spills, and the accumulation of dirt and allergens that regular vacuuming alone cannot remove. Professional carpet cleaning is essential for maintaining the appearance of your facility, extending the life of your carpet investment, and improving indoor air quality for building occupants.',
      'Rangel Janitorial uses professional-grade hot water extraction equipment — the method recommended by major carpet manufacturers — to deliver a deep clean that reaches the base of carpet fibers where dirt, bacteria, and allergens accumulate. Our process removes embedded soil, stains, and contaminants that daily vacuuming leaves behind, restoring your carpet\'s appearance and freshness.',
      'Regular professional carpet cleaning is not just about appearance. Carpets trap airborne particles including dust, pollen, mold spores, and bacteria. Over time, these trapped contaminants can affect indoor air quality and aggravate allergies and respiratory conditions for building occupants. Our deep extraction process removes these particles from the carpet, contributing to a healthier indoor environment.',
      'We work with you to develop a carpet cleaning schedule that makes sense for your facility. High-traffic areas like lobbies, hallways, and conference rooms may need quarterly cleaning, while private offices can typically go six to twelve months between deep cleanings. We also offer spot cleaning and stain treatment services for spills and messes that need immediate attention between scheduled cleanings.',
    ],
    included: [
      'Hot water extraction deep cleaning',
      'Pre-treatment of stains and high-traffic areas',
      'Spot and stain removal',
      'Deodorizing treatment',
      'Fast-dry technology',
      'Furniture moving as needed',
    ],
    benefits: [
      {
        icon: Sparkles,
        title: 'Revived Appearance',
        description:
          'Deep cleaning removes embedded dirt and stains, restoring your carpet\'s original color and texture.',
      },
      {
        icon: Droplets,
        title: 'Improved Air Quality',
        description:
          'Extraction removes trapped allergens, dust, and bacteria from carpet fibers for a healthier indoor environment.',
      },
      {
        icon: TrendingUp,
        title: 'Extended Carpet Life',
        description:
          'Regular professional cleaning prevents fiber breakdown from embedded grit, adding years to your carpet investment.',
      },
      {
        icon: Clock,
        title: 'Minimal Downtime',
        description:
          'Our fast-dry technology means carpets are ready for use much sooner than traditional methods.',
      },
    ],
    beforeAfter: [
      {
        label: 'High-Traffic Hallway',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Dingy, worn carpet from heavy foot traffic',
        afterCaption: 'Clean, refreshed carpet after professional extraction',
      },
      {
        label: 'Conference Room Cleaning',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/40',
        beforeCaption: 'Stained and soiled conference room carpet',
        afterCaption: 'Stain-free, deodorized carpet ready for use',
      },
    ],
    faqs: [
      {
        question: 'How often should commercial carpets be professionally cleaned?',
        answer:
          'Frequency depends on foot traffic and use. High-traffic areas like lobbies and hallways benefit from quarterly cleaning. General office areas typically need cleaning every six to twelve months. We will assess your facility and recommend a schedule that keeps your carpets in optimal condition.',
      },
      {
        question: 'How long does it take for carpets to dry?',
        answer:
          'With our professional-grade equipment and fast-dry technology, most carpets are ready for light foot traffic within two to four hours. Complete drying typically occurs within six to eight hours depending on humidity and air circulation.',
      },
      {
        question: 'Can you remove tough stains?',
        answer:
          'We treat a wide variety of stains including coffee, food, ink, and dirt. We pre-treat stains with specialized solutions before extraction for the best results. While most stains can be removed or significantly reduced, some older or set-in stains may not be completely removable. We will always give you an honest assessment.',
      },
      {
        question: 'Do you clean carpets after hours?',
        answer:
          'Yes. We schedule carpet cleaning during evenings and weekends to minimize disruption to your business operations. This ensures maximum drying time before employees return and avoids any impact on your daily workflow.',
      },
    ],
    relatedServices: [
      { name: 'Janitorial Cleaning', slug: 'janitorial-cleaning' },
      { name: 'Floor Care', slug: 'floor-care' },
      { name: 'Electrostatic Disinfection', slug: 'electrostatic-disinfection' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Static Params & Metadata
// ---------------------------------------------------------------------------

const validSlugs = [
  'janitorial-cleaning',
  'day-porter',
  'electrostatic-disinfection',
  'floor-care',
  'carpet-cleaning',
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
  const service = servicesData[slug];

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.name} | Rangel Janitorial`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.name} | Rangel Janitorial — Commercial Cleaning`,
      description: service.metaDescription,
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  // Build JSON-LD structured data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Rangel Janitorial',
      url: 'https://rangeljanitorial.com',
      telephone: '+19518944222',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '26323 Jefferson Ave Suite C',
        addressLocality: 'Murrieta',
        addressRegion: 'CA',
        postalCode: '92562',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Sacramento' },
      { '@type': 'City', name: 'Murrieta' },
      { '@type': 'City', name: 'Walnut Creek' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: service.included.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rangeljanitorial.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://rangeljanitorial.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, faqSchema, breadcrumbSchema]),
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Hero background image */}
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest-light/85 to-sage/80" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 font-body mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{service.name}</span>
          </nav>

          <AnimateOnScroll direction="fade">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-3 tracking-tight">
              {service.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 font-body max-w-2xl">
              {service.tagline}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Full Description */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-8">
            About {service.name}
          </h2>
          <div className="space-y-6">
            {service.descriptionParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-charcoal-light font-body text-base sm:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What's Included */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            What&apos;s Included
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.included.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="w-6 h-6 bg-sage/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-forest" />
                </div>
                <span className="text-charcoal font-body text-sm sm:text-base font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Benefits */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Key Benefits
          </h2>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <StaggerItem key={index}>
                  <div
                    className="text-center p-6 rounded-2xl bg-cream border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BenefitIcon className="w-6 h-6 text-forest" />
                    </div>
                    <h3 className="font-bold font-heading text-charcoal mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-charcoal-light font-body leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Before / After Gallery */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Before &amp; After
          </h2>
          <AnimateOnScroll direction="fade" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.beforeAfter.map((pair, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold font-heading text-charcoal text-center">
                  {pair.label}
                </h3>
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src="/images/before-after.png"
                    alt={`${pair.label} - Before and after`}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <p className="text-xs text-charcoal-light font-body text-center">
                      {pair.beforeCaption}
                    </p>
                    <p className="text-xs text-charcoal-light font-body text-center">
                      {pair.afterCaption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </AnimateOnScroll>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Quote CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <AnimateOnScroll direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-10 sm:p-14 border border-sage/20">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-3">
              Interested in {service.name}?
            </h2>
            <p className="text-charcoal-light font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every facility is different. Contact us for a free, no-obligation
              quote tailored to your building&apos;s size and needs. With 30+ years of
              experience, Rangel Janitorial delivers results you can count on.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-forest font-semibold font-body hover:text-forest-light transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Find Your Local Office
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* FAQ */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold font-heading text-charcoal hover:text-forest transition-colors list-none">
                  <span className="pr-4">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-sage flex-shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                  <p className="text-charcoal-light font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Services */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Related Services
          </h2>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {service.relatedServices.map((related) => (
              <StaggerItem key={related.slug}>
                <Link
                  href={`/services/${related.slug}`}
                  className="card-hover group flex flex-col items-center p-6 bg-cream rounded-2xl border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all text-center"
                >
                  <span className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors">
                    {related.name}
                  </span>
                  <span className="text-xs text-sage font-body mt-2 inline-flex items-center gap-1">
                    View Details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready for a Cleaner Facility?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Request a free, no-obligation quote for {service.name.toLowerCase()} and
            discover why businesses across California trust Rangel Janitorial
            with their facility maintenance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="btn-hover inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Contact Us for Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/locations"
              className="btn-hover inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
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
