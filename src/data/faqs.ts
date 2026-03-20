import type { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  // ─── General ───────────────────────────────────────────────────────────────
  {
    question: "What areas does Murphy's Turf Care serve?",
    answer: "Murphy's Turf Care proudly serves communities across California, including Los Angeles, Murrieta and the Inland Empire, Martinez and the greater Contra Costa County/Bay Area, and Sacramento. Whether you're in Hollywood or Elk Grove, our crews deliver expert lawn care tailored to your local climate and conditions.",
    category: "general",
  },
  {
    question: "Is Murphy's Turf Care licensed and insured?",
    answer: "Yes, Murphy's Turf Care is fully licensed and insured for lawn care and turf management services in the state of California. We are EPA certified, a member of the California Landscape Contractors Association (CLCA), and we maintain a BBB A+ rating. Your property is in safe, professional hands.",
    category: "general",
  },
  {
    question: "Are your products safe for pets and children?",
    answer: "Absolutely. We use eco-friendly, pet-safe products across all of our services. After each application we provide clear re-entry guidelines, and we're always happy to discuss the specific products and active ingredients we use so you can make informed decisions for your family.",
    category: "general",
  },
  {
    question: "How long has Murphy's Turf Care been in business?",
    answer: "Murphy's Turf Care was founded in 2018 by Patrick Murphy in Murrieta, California and has been family-owned and operated ever since. What started as a small neighborhood lawn care operation in the Inland Empire has grown into one of California's most trusted turf management companies.",
    category: "general",
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes, we offer completely free estimates with no obligation. You can schedule a convenient on-site assessment, or if you prefer, we can provide an initial estimate over the phone or through our online request form. Our team will work with you to find the right plan for your lawn and budget.",
    category: "general",
  },
  {
    question: "What makes Murphy's Turf Care different from other lawn care companies?",
    answer: "As a family-owned business, we bring a personal touch that larger franchises simply can't match. We specialize in California-specific turf challenges like drought stress, water restrictions, warm-season grass management, and year-round growing conditions. Every customer receives a custom lawn care program backed by our satisfaction guarantee.",
    category: "general",
  },
  {
    question: "Do you offer organic lawn care options?",
    answer: "Yes, we offer fully organic and eco-friendly lawn care programs for customers who prefer a chemical-free approach. Our organic program uses natural fertilizers, compost topdressing, and biological weed control methods that are gentle on the environment while still delivering a healthy, vibrant lawn.",
    category: "general",
  },
  {
    question: "What is your satisfaction guarantee?",
    answer: "We stand behind every service we provide. If you're not completely satisfied with the results, we'll re-treat your lawn at no additional cost. If we still can't meet your expectations, we'll issue a full refund for that service. We're proud to maintain a 98% customer satisfaction rate.",
    category: "general",
  },

  // ─── Pricing ───────────────────────────────────────────────────────────────
  {
    question: "How much does lawn care cost?",
    answer: "Pricing varies depending on the service, lawn size, and current condition of your turf. Our lawn cleaning starts at $149, aeration at $99, seeding at $129, fertilization at $79, pest control at $89, and seasonal maintenance at $199. Contact us for a free estimate tailored to your specific property.",
    category: "pricing",
  },
  {
    question: "Do you offer package discounts?",
    answer: "Yes, we offer seasonal packages and annual lawn care programs that can save you 15–20% compared to booking individual services. Our annual programs bundle fertilization, weed control, aeration, and overseeding into one convenient plan with predictable monthly pricing.",
    category: "pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, personal checks, and online payments through our customer portal. For larger projects such as full lawn renovations or irrigation installations, we also offer flexible financing options to help spread the cost over time.",
    category: "pricing",
  },
  {
    question: "Are there any hidden fees?",
    answer: "Never. We believe in transparent, upfront pricing. The quote you receive includes all labor, materials, and cleanup — there are no surprise charges after the work is done. If anything changes during the job, we'll discuss it with you and get approval before proceeding.",
    category: "pricing",
  },
  {
    question: "Do you offer monthly payment plans?",
    answer: "Yes, our annual lawn care programs can be structured with convenient monthly payments so you can spread the cost evenly across the year. This makes budgeting easy and ensures your lawn receives consistent care year-round without a large upfront expense.",
    category: "pricing",
  },

  // ─── Services ──────────────────────────────────────────────────────────────
  {
    question: "When is the best time to aerate in California?",
    answer: "For warm-season grasses like Bermuda and St. Augustine — common throughout Southern California and the Central Valley — the best time to aerate is late spring through early summer (May through June) when the grass is actively growing. For cool-season grasses in the Bay Area, fall aeration (September through October) is ideal. Our team will recommend the right timing based on your grass type and location.",
    category: "services",
    serviceSlug: "aeration",
  },
  {
    question: "What type of grass seed do you use?",
    answer: "We use California-adapted grass varieties chosen for our climate. Bermuda grass is our top choice for hot, sunny areas like the Inland Empire and Sacramento. St. Augustine performs well in coastal and partially shaded areas. Tall fescue is excellent for transitional zones like the Bay Area. Buffalo grass is ideal for ultra-low-water landscapes. We recommend the best variety based on your property's sun exposure, water availability, and location.",
    category: "services",
    serviceSlug: "overseeding",
  },
  {
    question: "How often should I fertilize my lawn in California?",
    answer: "California's year-round growing season means lawns benefit from four to six fertilizer applications per year. Warm-season grasses need heavier feeding from April through September during peak growth. Cool-season grasses in the Bay Area need more feeding in spring and fall. We design a custom schedule based on your grass type, location, and soil conditions.",
    category: "services",
    serviceSlug: "fertilization",
  },
  {
    question: "What's included in your seasonal maintenance package?",
    answer: "Our seasonal packages are tailored to California's climate. The spring package includes aeration, overseeding, pre-emergent weed treatment, and a balanced fertilizer application. The fall package covers aeration, overseeding, winterizer fertilizer where applicable, and thorough cleanup. Both packages address the specific needs of your grass type and local growing conditions.",
    category: "services",
    serviceSlug: "seasonal-maintenance",
  },
  {
    question: "How do you handle weed control?",
    answer: "We take an integrated approach to weed management. Pre-emergent herbicides prevent crabgrass and other annual weeds, followed by targeted post-emergent treatments for broadleaf weeds like dandelions and clover. We also focus on building thick, healthy turf through proper fertilization, mowing practices, and water management — the best long-term defense against California weeds.",
    category: "services",
    serviceSlug: "weed-control",
  },
  {
    question: "Do you provide irrigation system maintenance?",
    answer: "Yes, we offer sprinkler system inspections, adjustments, and optimization. Proper irrigation is critical in California where water conservation is essential. We'll ensure your system is running efficiently, check for leaks and overspray, and help you comply with local water restrictions while keeping your turf healthy.",
    category: "services",
    serviceSlug: "irrigation",
  },

  // ─── Scheduling ────────────────────────────────────────────────────────────
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking one to two weeks in advance to secure your preferred date. Spring is our busiest season as homeowners prepare for summer, so early booking is especially important for aeration, overseeding, and cleanup services. Recurring maintenance customers receive priority scheduling year-round.",
    category: "scheduling",
  },
  {
    question: "What if it rains on my service day?",
    answer: "If rain prevents us from completing your service, we'll reschedule at no additional charge as quickly as possible. In some cases, light rain can actually benefit certain treatments like fertilization and overseeding, so we may proceed if conditions are favorable and communicate that with you.",
    category: "scheduling",
  },
  {
    question: "Do I need to be home during service?",
    answer: "No, you do not need to be home. We simply ask that you ensure gate access to the lawn areas being serviced and that pets are kept indoors or in a separate area. We'll leave a detailed service summary at your door or send one via email so you know exactly what was completed.",
    category: "scheduling",
  },
  {
    question: "How do I cancel or reschedule a service?",
    answer: "We ask for at least 24 hours' notice for cancellations or reschedules. You can call our office at (951) 331-3300, send us an email, or use the online customer portal to manage your appointments. There is no fee for rescheduling as long as we receive timely notice.",
    category: "scheduling",
  },

  // ─── Locations ─────────────────────────────────────────────────────────────
  {
    question: "Do you serve the Los Angeles area?",
    answer: "Yes, we provide full-service lawn care throughout the Los Angeles metro area, including Hollywood, Santa Monica, Beverly Hills, West Hollywood, Silver Lake, Echo Park, Venice, Pasadena, Brentwood, and Culver City. Our crews understand LA's unique microclimates and water-smart lawn care needs.",
    category: "locations",
  },
  {
    question: "Do you service the Bay Area?",
    answer: "Yes, we serve Martinez and the greater Contra Costa County area, including Concord, Pleasant Hill, Walnut Creek, Benicia, Antioch, Pittsburg, and Brentwood. Our Bay Area team understands the region's moderate Mediterranean climate and varied lawn care requirements across the East Bay.",
    category: "locations",
  },
  {
    question: "Do you serve Sacramento and the surrounding area?",
    answer: "Yes, we serve the entire Sacramento metropolitan area including Elk Grove, Folsom, Roseville, Natomas, Land Park, East Sacramento, Midtown, Arden-Arcade, Citrus Heights, and Rancho Cordova. Our Sacramento crews are experienced with the Central Valley's extreme summer heat and tailor every treatment accordingly.",
    category: "locations",
  },
];
