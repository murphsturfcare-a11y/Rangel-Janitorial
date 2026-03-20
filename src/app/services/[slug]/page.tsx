import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Check,
  ArrowRight,
  Phone,
  ChevronRight,
  ShieldCheck,
  Clock,
  ThumbsUp,
  TrendingUp,
  Zap,
  Leaf,
  Recycle,
  Heart,
  Award,
  Sparkles,
  Bug,
  Droplets,
  PawPrint,
  Baby,
  Timer,
  TreePine,
  type LucideIcon,
} from 'lucide-react';

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
  'pet-hair-debris': {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    image: '/images/services/debris-removal.png',
    tagline: 'The essential first step to a clean, safe artificial turf',
    metaDescription:
      "Professional pet hair and debris removal for artificial turf in Murrieta, CA. Murphy's Turf removes pet hair, waste, leaves, metal objects, and weeds from your synthetic lawn. Get a free quote.",
    descriptionParagraphs: [
      "All of our turf services begin with removing pet hair and waste along with any other debris such as leaves and branches. We will also run a magnet over the turf to remove any metal objects. After having removed the debris, we will use a de-weeding tool to get rid of any weeds from the edges and seams of your turf.",
      "Pet hair and debris removal is the foundational step in every Murphy's Turf cleaning service, and for good reason. Over time, your artificial turf accumulates far more than meets the eye. Pet hair weaves itself into the turf fibers, fallen leaves decompose and create a layer of organic matter that promotes weed growth, and small metal objects like bottle caps, nails, or staples can become hidden hazards for bare feet and paws alike. In Murrieta and across the Inland Empire, the warm Southern California climate means your outdoor turf sees year-round use, which accelerates the buildup of hair, waste, and organic debris between the synthetic blades.",
      "Our trained technicians use specialized tools designed specifically for synthetic turf surfaces. The process starts with a thorough visual inspection to identify problem areas, followed by systematic removal of all pet hair and solid waste from the entire turf surface. We then clear leaves, twigs, and any other organic debris that has settled into the fibers. A powerful magnet sweep follows to extract any metallic objects hidden within the infill — a step that is especially important for families with children who play on the turf. Finally, we use precision de-weeding tools to pull any weeds that have taken root along the edges and seams of your artificial lawn, where organic matter tends to collect and create ideal conditions for weed germination.",
      "Regular debris removal prevents the cascade of problems that neglected turf faces: compacted infill, weed infestations, drainage issues, and unsanitary conditions for pets and children. By starting every service with this critical step, we ensure that any subsequent treatments — whether blooming, disinfecting, or deodorizing — can penetrate the turf properly and deliver maximum effectiveness. For homeowners in Murrieta, Temecula, Menifee, and surrounding communities, this service is the foundation of a healthy, beautiful artificial lawn that performs the way it was designed to.",
    ],
    included: [
      'Pet hair removal',
      'Pet waste cleanup',
      'Leaf & branch clearing',
      'Magnet sweep for metal objects',
      'De-weeding edges and seams',
      'Surface inspection',
    ],
    benefits: [
      {
        icon: Sparkles,
        title: 'Cleaner Surface for Pets & Kids',
        description:
          'A thoroughly cleaned turf surface means a safer, more hygienic play area for your family and furry friends.',
      },
      {
        icon: Leaf,
        title: 'Prevents Weed Growth',
        description:
          'Removing organic debris and weeding seams stops weeds before they can establish and spread across your turf.',
      },
      {
        icon: ShieldCheck,
        title: 'Removes Hidden Hazards',
        description:
          'Our magnet sweep catches metal objects you cannot see, protecting bare feet and paws from injury.',
      },
      {
        icon: Zap,
        title: 'Prepares Turf for Deeper Treatments',
        description:
          'Clean turf allows disinfectants and deodorizers to penetrate the infill layer for maximum effectiveness.',
      },
    ],
    beforeAfter: [
      {
        label: 'Pet Hair & Debris Cleanup',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Matted pet hair and leaf debris in turf fibers',
        afterCaption: 'Clean, debris-free turf surface',
      },
      {
        label: 'Edge De-Weeding',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/40',
        beforeCaption: 'Weeds growing along turf seams and edges',
        afterCaption: 'Clean edges after professional de-weeding',
      },
    ],
    faqs: [
      {
        question: 'How often should I have debris removed from my artificial turf?',
        answer:
          'For homes with pets, we recommend debris removal at least once a month. High-traffic areas or yards with multiple pets may benefit from bi-weekly service. Properties without pets that are surrounded by trees should schedule service every four to six weeks, especially during fall when leaf drop is heaviest.',
      },
      {
        question: 'Why do you use a magnet on the turf?',
        answer:
          'Over time, small metal objects like nails, screws, bottle caps, and wire fragments can end up in your turf without you knowing. These items settle into the infill and become invisible but can cause cuts and injuries to bare feet, children, and pets. Our magnet sweep is a quick safety measure that catches these hidden hazards every time we service your turf.',
      },
      {
        question: 'Can pet hair really damage artificial turf?',
        answer:
          'While pet hair will not damage the turf fibers themselves, accumulated hair traps moisture and organic matter that promotes bacterial growth and unpleasant odors. It can also contribute to infill compaction, which affects drainage. Regular removal keeps your turf hygienic and functioning properly.',
      },
      {
        question: 'Is debris removal included with other services?',
        answer:
          'Yes. Pet hair and debris removal is the first step in every Murphy\'s Turf service. Whether you book blooming, disinfecting, or any other treatment, we always begin with a thorough debris removal to ensure the best possible results from the subsequent service.',
      },
    ],
    relatedServices: [
      { name: 'Blooming & De-Compacting', slug: 'blooming-decompacting' },
      { name: 'Disinfect & Deodorize', slug: 'disinfect-deodorize' },
      { name: 'Poop Scooping & Removal', slug: 'poop-scooping' },
    ],
  },

  'blooming-decompacting': {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    image: '/images/services/blooming.png',
    tagline: 'Bring your worn-out turf back to life',
    metaDescription:
      "Professional turf blooming and de-compacting services in Murrieta, CA. Murphy's Turf restores matted, worn artificial grass to like-new condition with commercial-grade power brushing. Get a free quote.",
    descriptionParagraphs: [
      "The purpose of re-blooming turf is to help bring back the life in your turf after having been worn out. Over time when your turf is being frequently walked on, it can cause the blades to become matted down. During this process we utilize our machines to clean-up and remove any caked debris from the fibers of the turf while also using them to fluff the turf blades and bring them back to life standing upright like natural grass would.",
      "Artificial turf is engineered for durability, but it is not immune to the effects of daily use. In Murrieta and throughout the Inland Empire, where outdoor living spaces are used nearly year-round thanks to Southern California's mild climate, synthetic turf takes a beating. High-traffic pathways, play areas where kids run and tumble, and spots where pets repeatedly lounge all develop visible wear patterns over time. The turf blades flatten, the infill compacts, and what once looked like a lush green lawn starts to resemble a worn carpet. This is where Murphy's Turf blooming and de-compacting service makes a dramatic difference.",
      "Our blooming process uses commercial-grade power brushing equipment specifically designed for synthetic turf. These machines work at the fiber level, lifting each blade back to its original upright position while simultaneously loosening and redistributing the infill material that has compacted beneath the surface. Compacted infill is one of the most common and overlooked problems with artificial turf — when the infill packs down, it reduces the turf's ability to drain properly, makes the surface feel harder underfoot, and accelerates blade matting. Our de-compacting process breaks up these compressed layers, restoring proper drainage and the soft, cushioned feel your turf had when it was first installed.",
      "During the blooming service, we also extract caked-on debris that has worked its way deep into the turf fibers — material that standard raking or leaf blowing simply cannot reach. This deep cleaning component is what separates professional blooming from DIY brushing. After the service, we perform a full post-service inspection to ensure even infill distribution and consistent blade height across your entire turf area. Homeowners are consistently amazed at the transformation — turf that looked years past its prime suddenly looks freshly installed. For properties in Murrieta, Temecula, Wildomar, Lake Elsinore, and the surrounding communities, regular blooming extends the life of your artificial turf investment by years and keeps it looking its best through every season.",
    ],
    included: [
      'Turf fiber assessment',
      'Commercial-grade power brushing',
      'Debris extraction from fibers',
      'Blade fluffing and restoration',
      'Infill redistribution',
      'Post-service inspection',
    ],
    benefits: [
      {
        icon: Sparkles,
        title: 'Turf Looks Like New',
        description:
          'Matted, worn blades are lifted back to their original upright position for a freshly installed appearance.',
      },
      {
        icon: Droplets,
        title: 'Improved Drainage',
        description:
          'De-compacting the infill restores proper water flow, preventing puddles and standing water after rain or irrigation.',
      },
      {
        icon: ThumbsUp,
        title: 'More Comfortable Underfoot',
        description:
          'Loosened infill and upright blades restore the soft, cushioned feel your turf had on day one.',
      },
      {
        icon: TrendingUp,
        title: 'Extends Turf Lifespan',
        description:
          'Regular blooming prevents permanent fiber damage from prolonged matting, adding years to your turf investment.',
      },
    ],
    beforeAfter: [
      {
        label: 'High-Traffic Area Restoration',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Matted, flattened turf blades from daily foot traffic',
        afterCaption: 'Upright, fluffy blades after professional blooming',
      },
      {
        label: 'Pet Lounge Spot Revival',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Compressed turf where pets rest daily',
        afterCaption: 'Fully restored turf with even infill distribution',
      },
    ],
    faqs: [
      {
        question: 'How often does my artificial turf need blooming?',
        answer:
          'For most residential properties, we recommend blooming every three to six months depending on foot traffic levels. Yards with heavy pet or child use may benefit from quarterly blooming, while lightly used decorative turf areas may only need it once or twice a year. During your service, our technicians will assess your turf and recommend the ideal schedule.',
      },
      {
        question: 'Will the power brushing damage my turf?',
        answer:
          'No. Our commercial-grade equipment is specifically designed for synthetic turf and operates at carefully calibrated settings that lift and restore fibers without causing damage. In fact, regular blooming actually protects your turf by preventing the kind of prolonged matting that can lead to permanent fiber memory — where blades lose the ability to stand upright at all.',
      },
      {
        question: 'What is the difference between blooming and just raking my turf?',
        answer:
          'Manual raking only addresses the surface level and can actually push debris deeper into the infill. Our commercial power brushing works at the fiber level, extracting embedded debris, loosening compacted infill, and lifting individual blades from the base. The results are dramatically more thorough and longer-lasting than anything achievable with a rake or push broom.',
      },
      {
        question: 'Can blooming fix turf that has been neglected for years?',
        answer:
          'In most cases, yes. We have restored turf that has gone years without maintenance back to near-original condition. However, turf that has been severely neglected may have some permanent fiber memory in the most heavily worn areas. The sooner you start regular blooming, the better the long-term results. Contact us for a free assessment and we will give you an honest evaluation of what to expect.',
      },
    ],
    relatedServices: [
      { name: 'Pet Hair & Debris Removal', slug: 'pet-hair-debris' },
      { name: 'Disinfect & Deodorize', slug: 'disinfect-deodorize' },
      { name: 'Powered By OxyTurf', slug: 'oxyturf' },
    ],
  },

  'disinfect-deodorize': {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    image: '/images/services/oxyturf-spray.jpg',
    tagline: 'Kill 99.9% of bacteria and eliminate odors at the source',
    metaDescription:
      "Professional artificial turf disinfecting and deodorizing in Murrieta, CA. Murphy's Turf uses OxyTurf to kill 99.9% of bacteria and eliminate pet odors without harsh chemicals. Get a free quote.",
    descriptionParagraphs: [
      "Our disinfecting and deodorizing turf services consist of power-spraying OxyTurf. OxyTurf is designed to perform as a cleaner, disinfectant, & deodorizer. It cuts past the top synthetic turf layer, into the infill where bacteria & viruses live, and attacks the contaminants at their source. OxyTurf will penetrate the synthetic turf, clean & kill 99.9% of germs & bacteria in just minutes, all without any hazardous chemicals.",
      "If you have pets — or even if you do not — your artificial turf is harboring more bacteria than you might realize. Every time a dog urinates on synthetic turf, the liquid passes through the blades and settles into the infill layer below. In Murrieta's warm Southern California climate, heat accelerates bacterial growth and amplifies odors, turning a minor issue into a persistent problem that surface-level rinsing cannot solve. Bacteria, viruses, and the ammonia compounds from pet urine thrive in the warm, moist environment beneath your turf's surface, and no amount of hosing down the top layer will reach them. That is exactly why Murphy's Turf relies on OxyTurf — a professional-grade solution specifically formulated to penetrate past the surface and attack contaminants where they actually live.",
      "The OxyTurf power-spray process is thorough and systematic. Our technicians apply OxyTurf across the entire turf surface using commercial spraying equipment that ensures complete, even coverage. The solution is designed to cut through the synthetic turf layer and soak into the infill, where it goes to work immediately — killing 99.9% of germs and bacteria in just minutes. Unlike household cleaners or DIY solutions, OxyTurf does not simply mask odors. It neutralizes the bacterial source of the smell, replacing it with a clean, fresh grass scent. The result is turf that does not just smell better for a day or two — it stays fresh because the underlying cause of the odor has been eliminated.",
      "What makes OxyTurf stand out from other turf cleaners is what it does not contain. OxyTurf uses stabilized accelerated hydrogen peroxide as its active ingredient, which means no bleach, no ammonia, and no harsh chemical residues. Many competing turf cleaners rely on bleach or ammonia-based formulas that can irritate skin, weaken turf fibers over time, and leave behind chemical odors that are unpleasant for both people and pets. With OxyTurf, your turf is safe for pets and children to use as soon as it dries — typically within 30 to 60 minutes depending on weather conditions. For families in Murrieta, Temecula, and throughout the Inland Empire who want a genuinely clean and safe outdoor surface, our disinfect and deodorize service delivers peace of mind along with a dramatically fresher yard.",
    ],
    included: [
      'Full-surface OxyTurf power spray',
      'Infill-level sanitization',
      'Odor neutralization',
      'Bacteria elimination (99.9%)',
      'Safe for immediate pet/child use after drying',
    ],
    benefits: [
      {
        icon: Bug,
        title: 'Eliminates Pet Urine Smell',
        description:
          'OxyTurf neutralizes the bacterial source of odor deep in the infill, not just the surface symptoms.',
      },
      {
        icon: ShieldCheck,
        title: 'Kills Bacteria at the Source',
        description:
          'Penetrates past the turf surface to the infill layer where 99.9% of germs and bacteria are eliminated in minutes.',
      },
      {
        icon: Heart,
        title: 'No Harsh Chemical Residue',
        description:
          'Stabilized hydrogen peroxide means no bleach, no ammonia, and no skin-irritating residues left behind.',
      },
      {
        icon: TreePine,
        title: 'Fresh Grass Scent',
        description:
          'After treatment, your artificial turf smells like fresh-cut natural grass instead of chemicals or pet waste.',
      },
    ],
    beforeAfter: [
      {
        label: 'Pet Odor Elimination',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Turf with persistent pet urine odor',
        afterCaption: 'Fresh, odor-free surface after OxyTurf treatment',
      },
      {
        label: 'Full-Surface Sanitization',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Bacteria-laden infill from pet use',
        afterCaption: '99.9% bacteria eliminated, safe for family use',
      },
    ],
    faqs: [
      {
        question: 'How soon can my pets and kids use the turf after treatment?',
        answer:
          'Your turf is safe for pets and children as soon as it dries, which typically takes 30 to 60 minutes depending on temperature, humidity, and sun exposure. OxyTurf contains no bleach or ammonia, so there are no harmful residues to worry about once the surface is dry.',
      },
      {
        question: 'How often should I have my turf disinfected and deodorized?',
        answer:
          'For homes with pets, we recommend treatment every four to six weeks to stay ahead of bacterial buildup and odor. Properties without pets that use their turf primarily for entertaining or play areas can typically go eight to twelve weeks between treatments. Our team will recommend a schedule based on your specific usage patterns.',
      },
      {
        question: 'Will OxyTurf damage or discolor my artificial turf?',
        answer:
          'No. OxyTurf is specifically formulated for synthetic turf and will not damage, discolor, or weaken your turf fibers. Unlike bleach-based cleaners that can fade turf color and break down fibers over time, OxyTurf uses stabilized accelerated hydrogen peroxide that is tough on bacteria but gentle on your turf investment.',
      },
      {
        question: 'Can I just hose down my turf to remove pet odors?',
        answer:
          'Water alone cannot eliminate pet urine odor because the bacteria that cause the smell live deep in the infill layer, not on the surface. Hosing may temporarily dilute surface-level odor, but it does not kill the bacteria at the source. OxyTurf penetrates into the infill to eliminate contaminants where they actually live, providing lasting results rather than a temporary rinse.',
      },
    ],
    relatedServices: [
      { name: 'Poop Scooping & Removal', slug: 'poop-scooping' },
      { name: 'Pet Hair & Debris Removal', slug: 'pet-hair-debris' },
      { name: 'Powered By OxyTurf', slug: 'oxyturf' },
    ],
  },

  'poop-scooping': {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    image: '/images/services/poop-scooping.jpg',
    tagline: 'Keep your yard clean so you can enjoy time with your pets',
    metaDescription:
      "Professional poop scooping and pet waste removal for artificial turf in Murrieta, CA. Murphy's Turf offers flexible weekly and daily plans to keep your yard clean and safe. Get a free quote.",
    descriptionParagraphs: [
      "It's important that we clean-up after our pets as their waste is not only an unruly sight but also harmful to the environment and people around you. Surprisingly, according to the EPA, pet waste is very toxic and is even a polluter within the same category as oil. Pet waste when not properly disposed can contain a vast array of different bacteria and parasites that can not only make people sick but even your own pet as well. In terms of how often you should pick up poop is based on how many dogs you have. With one it could be doable to do it once a week but if you have multiple it may be necessary to do it once a day. We understand that some people are too busy to deal with the poo and much rather spend their time playing with them than picking up after them. That's why we decided to provide several service plans dedicated to waste removal so you can keep your yard looking fresh while saving more time to spend with your fluffy friends.",
      "Pet waste on artificial turf presents a unique set of challenges that natural grass does not face. On a natural lawn, rain and soil microbes eventually break down waste over time — though the health risks remain. On synthetic turf, pet waste sits on or within the infill layer with nowhere to go. In Murrieta's warm climate, the heat accelerates decomposition and bacterial growth, intensifying odors and creating an increasingly unsanitary environment with each passing day. The bacteria and parasites found in pet waste — including E. coli, salmonella, giardia, roundworms, and hookworms — can survive in your turf for weeks or even months, posing a genuine health risk to your family, your pets, and even your neighbors.",
      "Murphy's Turf poop scooping and removal service takes this chore completely off your plate. Our technicians arrive on your scheduled day, systematically walk your entire turf area, and remove all pet waste from the surface. After removal, we sanitize the areas where waste was found to reduce bacterial contamination and keep your turf hygienic between full disinfecting treatments. All waste is bagged and disposed of properly — you never have to deal with it. We offer flexible scheduling that adapts to your household's needs, whether that means weekly visits for a single-dog home or daily service for multi-pet families.",
      "Beyond the obvious convenience factor, regular professional waste removal protects your turf investment. Pet waste that sits on artificial turf can stain the fibers, accelerate infill breakdown, and create persistent odor problems that become increasingly difficult to resolve the longer they are left untreated. Our scheduled removal service prevents these issues from developing in the first place, keeping your turf in top condition between deeper cleaning treatments. For busy pet owners in Murrieta, Temecula, Menifee, Winchester, and the surrounding Inland Empire communities, our poop scooping service means you get to spend your time enjoying your pets instead of cleaning up after them.",
    ],
    included: [
      'Scheduled pet waste removal',
      'Surface sanitizing after removal',
      'Flexible weekly/daily plans',
      'Disposal handled for you',
    ],
    benefits: [
      {
        icon: Clock,
        title: 'Save Time',
        description:
          'Spend your free time playing with your pets instead of scooping after them. We handle the dirty work on your schedule.',
      },
      {
        icon: PawPrint,
        title: 'Healthier Yard',
        description:
          'Regular waste removal keeps your turf hygienic and reduces the bacterial load between deeper cleaning treatments.',
      },
      {
        icon: Bug,
        title: 'Reduces Bacteria & Parasites',
        description:
          'Prompt waste removal minimizes exposure to E. coli, salmonella, giardia, roundworms, and other harmful organisms.',
      },
      {
        icon: Recycle,
        title: 'Prevents Environmental Contamination',
        description:
          'Proper disposal keeps pet waste — classified by the EPA alongside oil as a toxic pollutant — out of the environment.',
      },
    ],
    beforeAfter: [
      {
        label: 'Weekly Waste Removal Service',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Accumulated pet waste across turf surface',
        afterCaption: 'Clean, sanitized turf after professional removal',
      },
      {
        label: 'Multi-Pet Household Cleanup',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/40',
        beforeCaption: 'Heavy waste accumulation from multiple dogs',
        afterCaption: 'Thoroughly cleaned and disposal handled',
      },
    ],
    faqs: [
      {
        question: 'How often should I schedule poop scooping service?',
        answer:
          'It depends on the number of pets in your household. For one dog, weekly service is usually sufficient. For two or more dogs, twice-weekly or even daily service may be necessary to keep your turf clean and odor-free. During your first visit, we will assess your situation and recommend the ideal schedule.',
      },
      {
        question: 'Do you sanitize the turf after removing waste?',
        answer:
          'Yes. After removing all pet waste, we sanitize the affected areas to reduce bacterial contamination. This surface sanitizing is included with every poop scooping visit and helps maintain turf hygiene between your scheduled full disinfecting treatments.',
      },
      {
        question: 'What happens to the waste you collect?',
        answer:
          'All pet waste is double-bagged and disposed of properly by our team. You do not need to provide bags, bins, or handle any part of the disposal process. We take care of everything from start to finish.',
      },
      {
        question: 'Can I combine poop scooping with other turf services?',
        answer:
          'Absolutely. Many of our clients pair scheduled poop scooping with monthly or bi-monthly disinfecting and deodorizing treatments for complete turf maintenance. We can build a custom service plan that covers all your needs at a frequency that works for your household and budget. Contact us for a free quote.',
      },
    ],
    relatedServices: [
      { name: 'Disinfect & Deodorize', slug: 'disinfect-deodorize' },
      { name: 'Pet Hair & Debris Removal', slug: 'pet-hair-debris' },
      { name: 'Powered By OxyTurf', slug: 'oxyturf' },
    ],
  },

  oxyturf: {
    name: 'Powered By OxyTurf',
    slug: 'oxyturf',
    image: '/images/services/oxyturf-palms.jpg',
    tagline: 'The safe, effective cleaning solution behind every Murphy\'s Turf service',
    metaDescription:
      "Murphy's Turf cleaning services are powered by OxyTurf — a proven synthetic turf cleaner, disinfectant, and deodorizer. No bleach, no ammonia, safe for pets and kids. Serving Murrieta, CA.",
    descriptionParagraphs: [
      "Murphy's Turf's cleaning products are powered by OxyTurf. Specifically formulated for use on turf in mind, OxyTurf is a proven synthetic turf cleaner-deodorizer that eliminates germs and bacteria while replacing them with the smell of fresh real grass. Formulated containing stabilized accelerated hydrogen peroxide as compared to other turf cleaners, OxyTurf doesn't use any bleach or ammonia in their products as those chemicals can leave residues on turf that can irritate skin, weaken turf, and leave a mystery odor on your artificial grass, turning it from a safe-zone to a hazard-zone for your pets and kids.",
      "When we founded Murphy's Turf, we knew that the cleaning products we chose would define the quality and safety of every service we deliver. After extensive research and testing, we selected OxyTurf as the backbone of our cleaning process because it meets every standard we demand: proven effectiveness against bacteria and viruses, complete safety for families and pets, compatibility with all synthetic turf types, and zero harmful residues. OxyTurf is not a general-purpose cleaner repurposed for turf — it was engineered from the ground up specifically for synthetic turf applications, and that purpose-built design makes all the difference in real-world performance.",
      "The science behind OxyTurf centers on stabilized accelerated hydrogen peroxide, or SAHP. This active ingredient delivers powerful antimicrobial action — killing 99.9% of germs and bacteria on contact — while breaking down into water and oxygen after it has done its job. There are no chemical residues left behind, no lingering fumes, and no compounds that could irritate sensitive skin or harm pets who roll on the turf. Compare this to bleach-based turf cleaners, which can fade the color of your synthetic grass, degrade the fiber structure with repeated use, and leave behind chlorine residues that are irritating to both people and animals. Or ammonia-based products, which produce harsh fumes and can actually worsen urine odors by chemically reacting with the ammonia compounds already present in pet waste. OxyTurf avoids all of these problems entirely.",
      "Beyond its cleaning and disinfecting power, OxyTurf leaves behind a fresh, natural grass scent that homeowners consistently love. Instead of a chemical smell that announces 'this turf was just cleaned,' your yard simply smells like fresh-cut grass — the way an outdoor space should smell. This deodorizing effect lasts well beyond the initial treatment because OxyTurf eliminates the bacteria that cause odor at the source rather than masking the smell with fragrances. For Murphy's Turf clients across Murrieta, Temecula, and the greater Inland Empire, OxyTurf is not just a product — it is our commitment to delivering artificial turf cleaning that is effective, safe, and genuinely enjoyable. Every service we perform, from routine maintenance to deep sanitization, is powered by this trusted formula.",
    ],
    included: [
      'OxyTurf cleaning treatment',
      'Full-surface application',
      'Infill penetration',
      'Deodorizing',
      'Bacterial elimination',
    ],
    benefits: [
      {
        icon: ShieldCheck,
        title: 'No Bleach or Ammonia',
        description:
          'Stabilized accelerated hydrogen peroxide delivers powerful cleaning without the harsh chemicals found in competing products.',
      },
      {
        icon: Baby,
        title: 'Pet & Kid Safe',
        description:
          'No harmful residues left behind. Your turf is safe for the whole family as soon as the surface dries.',
      },
      {
        icon: TreePine,
        title: 'Fresh Grass Scent',
        description:
          'OxyTurf replaces bacterial odors with the smell of fresh-cut natural grass, not chemicals.',
      },
      {
        icon: Award,
        title: 'Won\'t Weaken Turf Fibers',
        description:
          'Unlike bleach-based cleaners, OxyTurf is safe for repeated use without degrading your turf\'s color or structural integrity.',
      },
    ],
    beforeAfter: [
      {
        label: 'OxyTurf Deep Clean',
        beforeColor: 'bg-brown/40',
        afterColor: 'bg-sage/50',
        beforeCaption: 'Turf with odor and bacterial buildup in infill',
        afterCaption: 'Fresh, sanitized turf after OxyTurf treatment',
      },
      {
        label: 'Odor Elimination',
        beforeColor: 'bg-brown/30',
        afterColor: 'bg-sage/60',
        beforeCaption: 'Persistent pet urine smell despite hosing',
        afterCaption: 'Fresh grass scent, bacteria eliminated at the source',
      },
    ],
    faqs: [
      {
        question: 'What makes OxyTurf different from store-bought turf cleaners?',
        answer:
          'Most store-bought turf cleaners use bleach or ammonia as their active ingredient. These chemicals can fade turf color, weaken fibers with repeated use, and leave irritating residues. OxyTurf uses stabilized accelerated hydrogen peroxide, which is equally effective at killing bacteria but breaks down into water and oxygen — leaving no harmful residue behind.',
      },
      {
        question: 'Is OxyTurf safe for all types of artificial turf?',
        answer:
          'Yes. OxyTurf was specifically formulated for synthetic turf and is safe for all turf types, including nylon, polyethylene, and polypropylene fibers. It will not damage, discolor, or degrade any component of your artificial turf system, including the infill and backing materials.',
      },
      {
        question: 'How long does the fresh grass scent last?',
        answer:
          'The fresh grass scent typically lasts one to three weeks depending on weather conditions, pet activity, and overall turf usage. Because OxyTurf eliminates the bacteria that cause odor rather than just masking the smell, the deodorizing effect lasts significantly longer than spray-on fragrance products.',
      },
      {
        question: 'Can I buy OxyTurf and apply it myself?',
        answer:
          'OxyTurf is a professional-grade product that delivers the best results when applied with commercial spraying equipment at the correct concentration and coverage rate. Our trained technicians ensure complete, even application that reaches deep into the infill layer. Contact us for a free quote and let our team handle the application for optimal results.',
      },
    ],
    relatedServices: [
      { name: 'Disinfect & Deodorize', slug: 'disinfect-deodorize' },
      { name: 'Blooming & De-Compacting', slug: 'blooming-decompacting' },
      { name: 'Pet Hair & Debris Removal', slug: 'pet-hair-debris' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Static Params & Metadata
// ---------------------------------------------------------------------------

const validSlugs = [
  'pet-hair-debris',
  'blooming-decompacting',
  'disinfect-deodorize',
  'poop-scooping',
  'oxyturf',
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
    title: `${service.name} | Murphy's Turf`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.name} | Murphy's Turf — Artificial Turf Cleaning`,
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

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Hero background image */}
        <Image
          src={service.image}
          alt={service.name}
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

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-3 tracking-tight">
              {service.name}
            </h1>
            <p className="text-lg sm:text-xl text-white/85 font-body max-w-2xl">
              {service.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Full Description */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What's Included */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Benefits */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <div
                  key={index}
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
              );
            })}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Quote CTA (No Prices) */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-cream to-cream-dark rounded-3xl p-10 sm:p-14 border border-sage/20">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-3">
              Interested in {service.name}?
            </h2>
            <p className="text-charcoal-light font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every property is different. Contact us for a free, no-obligation
              quote tailored to your turf size and condition. With 30+ years of
              experience, Murphy&apos;s Turf delivers results you can see and
              smell.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center gap-2 text-forest font-semibold font-body hover:text-forest-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                (951) 331-3300
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* FAQ */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Services */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-10 text-center">
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {service.relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group flex flex-col items-center p-6 bg-cream rounded-2xl border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all text-center"
              >
                <span className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors">
                  {related.name}
                </span>
                <span className="text-xs text-sage font-body mt-2 inline-flex items-center gap-1">
                  View Details
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Bottom CTA */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready to Restore Your Turf?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Request a free, no-obligation quote for {service.name.toLowerCase()} and
            discover why homeowners across Murrieta trust Murphy&apos;s Turf
            with their artificial turf maintenance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Contact Us for Pricing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19513313300"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              (951) 331-3300
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
