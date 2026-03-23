import type { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  // General (8)
  {
    question: "What areas does Murphy's Turf serve?",
    answer: "Murphy's Turf serves communities across California including Huntington Beach and the greater LA coastal area, Murrieta and the Inland Empire, Martinez and the East Bay/Contra Costa County, and Greater Sacramento. Our headquarters is in Murrieta, CA.",
    category: "general",
  },
  {
    question: "Is Murphy's Turf licensed and insured?",
    answer: "Yes, Murphy's Turf is fully licensed and insured. With over 30 years of experience in the cleaning and disinfecting industry, we bring professional-grade expertise to every artificial turf cleaning job.",
    category: "general",
  },
  {
    question: "Are your cleaning products safe for pets and children?",
    answer: "Absolutely. We exclusively use professional-grade cleaning products featuring a stabilized accelerated hydrogen peroxide formula that contains no bleach or ammonia. It breaks down into water and oxygen after use, making it completely safe for pets, children, and the environment.",
    category: "general",
  },
  {
    question: "How long has Murphy's Turf been in business?",
    answer: "Murphy's Turf brings over 30 years of experience in the cleaning and disinfecting industry to artificial turf maintenance. We're a family-owned company headquartered in Murrieta, California.",
    category: "general",
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes, we offer free estimates with no obligation. Visit our locations page to contact your local Murphy's Turf office, email us, or fill out the form on our website to schedule a consultation and receive a customized quote for your turf cleaning needs.",
    category: "general",
  },
  {
    question: "What cleaning products do you use?",
    answer: "We use a professional-grade stabilized accelerated hydrogen peroxide cleaner-deodorizer specifically formulated for synthetic turf. Unlike bleach or ammonia-based cleaners, our deep cleaning process kills 99.9% of germs and bacteria without leaving harmful residues, and it leaves your turf smelling like fresh real grass.",
    category: "general",
    serviceSlug: "disinfect-deodorize",
  },
  {
    question: "How often should I have my artificial turf professionally cleaned?",
    answer: "We recommend professional cleaning every 3 to 6 months for general maintenance. If you have pets, monthly or quarterly cleaning is ideal to prevent odor and bacteria buildup — especially in California's heat which accelerates bacterial growth.",
    category: "general",
  },
  {
    question: "Why can't I just hose down my artificial turf myself?",
    answer: "Water alone only rinses the surface. Bacteria, urine crystals, and contaminants live deep in the infill layer where a garden hose can't reach. Our professional-grade power-spray treatment penetrates into the infill to kill 99.9% of germs at their source — something water simply cannot do.",
    category: "general",
  },

  // Pricing (4)
  {
    question: "How much does artificial turf cleaning cost?",
    answer: "Pricing varies based on the size of your turf area, condition, and services needed. We provide free, customized quotes for every job. Contact your local Murphy's Turf office or fill out our website form to get your estimate.",
    category: "pricing",
  },
  {
    question: "Do you offer maintenance plans?",
    answer: "Yes, we offer flexible maintenance plans — weekly, bi-weekly, monthly, and quarterly options. Regular maintenance plans help keep costs predictable and ensure your turf stays clean, sanitized, and odor-free year-round.",
    category: "pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, checks, and online payments. For recurring maintenance plans, we can set up automatic billing for convenience.",
    category: "pricing",
  },
  {
    question: "Do you offer discounts for recurring service?",
    answer: "Yes, customers on recurring maintenance plans receive preferred pricing compared to one-time service calls. Contact us for details on our maintenance plan options and savings.",
    category: "pricing",
  },

  // Services (7)
  {
    question: "What does a full turf cleaning service include?",
    answer: "Our complete service includes pet hair and debris removal, a magnet sweep for hidden metal objects, de-weeding along edges and seams, power brushing and blooming to restore fiber pile, and a full professional disinfecting and deodorizing treatment. We clean your turf from top to bottom.",
    category: "services",
    serviceSlug: "disinfect-deodorize",
  },
  {
    question: "What is blooming and why does my turf need it?",
    answer: "Blooming is the process of using professional equipment to lift and restore turf fibers that have been matted down by foot traffic, pets, and furniture. Over time, turf blades lay flat and the infill compacts. Blooming brings the blades back to standing upright like natural grass, dramatically improving both appearance and feel.",
    category: "services",
    serviceSlug: "blooming-decompacting",
  },
  {
    question: "How do you remove pet odors from artificial turf?",
    answer: "We use our professional-grade cleaning products, which penetrate past the surface layer into the infill where urine crystals and bacteria actually live. Unlike bleach or ammonia products that just mask odors, our deep cleaning process breaks down the organic compounds causing the smell and replaces them with a fresh grass scent.",
    category: "services",
    serviceSlug: "disinfect-deodorize",
  },
  {
    question: "Do you remove weeds from artificial turf?",
    answer: "Yes, de-weeding is included in our debris removal service. While weeds can't grow through the turf backing, they commonly sprout along edges, seams, and where turf meets hardscape. We use specialized de-weeding tools to remove them at the root.",
    category: "services",
    serviceSlug: "pet-hair-debris",
  },
  {
    question: "Why are your cleaning products better than bleach for cleaning turf?",
    answer: "Bleach and ammonia-based cleaners can leave residues that irritate skin, weaken turf fibers, and create mystery odors. Our professional-grade cleaning products use stabilized accelerated hydrogen peroxide that kills 99.9% of bacteria, then breaks down into water and oxygen — no residues, no damage, no harsh chemical smells.",
    category: "services",
    serviceSlug: "disinfect-deodorize",
  },
  {
    question: "How does the poop scooping service work?",
    answer: "We offer flexible scheduled waste removal — weekly, bi-weekly, or custom frequencies based on how many dogs you have. Our team thoroughly scoops all waste, disposes of it properly, and does a quick visual inspection of your turf condition. No long-term contracts required.",
    category: "services",
    serviceSlug: "poop-scooping",
  },
  {
    question: "Can you clean commercial artificial turf?",
    answer: "Yes, we clean artificial turf for commercial properties including HOA common areas, dog parks, pet facilities, daycare centers, apartment complexes, and more. We offer scheduled maintenance contracts to keep high-traffic commercial turf clean and compliant.",
    category: "services",
  },

  // Scheduling (4)
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking 1 to 2 weeks in advance, especially during spring and summer when demand is highest. Recurring maintenance customers receive priority scheduling.",
    category: "scheduling",
  },
  {
    question: "How long does a typical turf cleaning take?",
    answer: "A full cleaning for a standard residential yard (500 to 1,000 square feet) typically takes 1 to 2 hours. Larger areas or heavily soiled turf may take longer. Your turf is safe to use as soon as it dries, usually within 1 to 2 hours after treatment.",
    category: "scheduling",
  },
  {
    question: "Do I need to be home during service?",
    answer: "No, you don't need to be home. We just need access to the turf area and ask that pets be kept inside during service. We'll leave a service summary so you know exactly what was done.",
    category: "scheduling",
  },
  {
    question: "How soon can we use the turf after cleaning?",
    answer: "Your turf is safe to use as soon as it dries — typically 1 to 2 hours in California's warm climate. Our cleaning solution breaks down into water and oxygen, so there are no harmful residues to worry about.",
    category: "scheduling",
  },

  // Locations (3)
  {
    question: "Do you serve the Huntington Beach and LA area?",
    answer: "Yes, Murphy's Turf serves Huntington Beach, Newport Beach, Costa Mesa, Long Beach, Seal Beach, and surrounding coastal Southern California communities.",
    category: "locations",
    locationSlug: "huntington-beach",
  },
  {
    question: "Where is Murphy's Turf headquartered?",
    answer: "Murphy's Turf is headquartered in Murrieta, California in the heart of the Inland Empire. We serve the entire region including Temecula, French Valley, Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, and Temescal Valley.",
    category: "locations",
    locationSlug: "murrieta",
  },
  {
    question: "Do you serve the Bay Area and Sacramento?",
    answer: "Yes, we serve Martinez and the greater Contra Costa County / East Bay area including Concord, Pleasant Hill, Walnut Creek, Antioch, and Brentwood. We also serve the Greater Sacramento region including Elk Grove, Roseville, Folsom, and Rancho Cordova.",
    category: "locations",
  },
];
