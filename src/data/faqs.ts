import type { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  // ─── General ───────────────────────────────────────────────────────────────
  {
    question: "What areas does Murphy's Turf serve?",
    answer:
      "Murphy's Turf proudly serves the entire Colorado Front Range, including Denver, Aurora, Lakewood, Boulder, Fort Collins, and Colorado Springs. Whether you're in the heart of Denver or the foothills near Boulder, our crews are ready to keep your lawn looking its best year-round.",
    category: "general",
  },
  {
    question: "Is Murphy's Turf licensed and insured?",
    answer:
      "Yes, Murphy's Turf is fully licensed and insured for lawn care and turf management services in the state of Colorado. We are EPA certified for all chemical applications, and we maintain a BBB A+ rating. You can trust that your property is in safe, professional hands.",
    category: "general",
  },
  {
    question: "Are your products safe for pets and children?",
    answer:
      "Absolutely. We use eco-friendly, pet-safe products across all of our services. After each application we provide clear re-entry guidelines, and we're always happy to discuss the specific products and active ingredients we use so you can make informed decisions for your family.",
    category: "general",
  },
  {
    question: "How long has Murphy's Turf been in business?",
    answer:
      "Murphy's Turf was founded in 2018 by Patrick Murphy and has been family-owned and operated ever since. What started as a small neighborhood lawn care operation has grown into one of the most trusted turf management companies along the Colorado Front Range.",
    category: "general",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes, we offer completely free estimates with no obligation. You can schedule a convenient on-site assessment, or if you prefer, we can provide an initial estimate over the phone or through our online request form. Our team will work with you to find the right plan for your lawn and budget.",
    category: "general",
  },
  {
    question:
      "What makes Murphy's Turf different from other lawn care companies?",
    answer:
      "As a family-owned business, we bring a personal touch that larger franchises simply can't match. We specialize in Colorado-specific turf challenges like alkaline soils, drought stress, and high-altitude sun exposure. Every customer receives a custom lawn care program backed by our satisfaction guarantee.",
    category: "general",
  },
  {
    question: "Do you offer organic lawn care options?",
    answer:
      "Yes, we offer fully organic and eco-friendly lawn care programs for customers who prefer a chemical-free approach. Our organic program uses natural fertilizers, compost topdressing, and biological weed control methods that are gentle on the environment while still delivering a healthy, vibrant lawn.",
    category: "general",
  },
  {
    question: "What is your satisfaction guarantee?",
    answer:
      "We stand behind every service we provide. If you're not completely satisfied with the results, we'll re-treat your lawn at no additional cost. If we still can't meet your expectations, we'll issue a full refund for that service. We're proud to maintain a 98% customer satisfaction rate.",
    category: "general",
  },

  // ─── Pricing ───────────────────────────────────────────────────────────────
  {
    question: "How much does lawn care cost?",
    answer:
      "Pricing varies depending on the service, lawn size, and current condition of your turf. Basic mowing starts around $35 per visit, fertilization programs begin at $55 per application, and core aeration starts at $85. Contact us for a free estimate tailored to your specific property.",
    category: "pricing",
  },
  {
    question: "Do you offer package discounts?",
    answer:
      "Yes, we offer seasonal packages and annual lawn care programs that can save you 15–20% compared to booking individual services. Our annual programs bundle fertilization, weed control, aeration, and overseeding into one convenient plan with predictable monthly pricing.",
    category: "pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, personal checks, and online payments through our customer portal. For larger projects such as full lawn renovations or irrigation installations, we also offer flexible financing options to help spread the cost over time.",
    category: "pricing",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "Never. We believe in transparent, upfront pricing. The quote you receive includes all labor, materials, and cleanup—there are no surprise charges after the work is done. If anything changes during the job, we'll discuss it with you and get approval before proceeding.",
    category: "pricing",
  },
  {
    question: "Do you offer monthly payment plans?",
    answer:
      "Yes, our annual lawn care programs can be structured with convenient monthly payments so you can spread the cost evenly across the year. This makes budgeting easy and ensures your lawn receives consistent care from spring through fall without a large upfront expense.",
    category: "pricing",
  },

  // ─── Services ──────────────────────────────────────────────────────────────
  {
    question: "When is the best time to aerate in Colorado?",
    answer:
      "The ideal times for core aeration along the Front Range are spring (April through May) and fall (September through October). Fall aeration is especially effective because it relieves summer compaction and allows your lawn to absorb nutrients before winter dormancy, setting the stage for a strong spring green-up.",
    category: "services",
    serviceSlug: "aeration",
  },
  {
    question: "What type of grass seed do you use?",
    answer:
      "We use Colorado-adapted grass varieties chosen for our climate and soil conditions. Kentucky bluegrass is our top pick for lush, self-repairing lawns; tall fescue offers excellent drought tolerance and shade performance; and buffalo grass is ideal for low-water landscapes. We'll recommend the best blend for your property's sun exposure and water availability.",
    category: "services",
    serviceSlug: "overseeding",
  },
  {
    question: "How often should I fertilize my lawn in Colorado?",
    answer:
      "We recommend four to five fertilizer applications per year for Front Range lawns. A typical schedule includes an early spring feeding in March, a late spring application in May, a summer boost in July, a fall strengthener in September, and a winterizer in late October or November. This schedule keeps your turf healthy through Colorado's dramatic temperature swings.",
    category: "services",
    serviceSlug: "fertilization",
  },
  {
    question: "What's included in your seasonal maintenance package?",
    answer:
      "Our spring package includes core aeration, overseeding, a pre-emergent weed treatment, and a balanced fertilizer application to jumpstart growth. The fall package covers aeration, overseeding, a winterizer fertilizer, and leaf removal. Both packages are designed to address the specific needs of Colorado lawns during their most critical growth periods.",
    category: "services",
    serviceSlug: "seasonal-maintenance",
  },
  {
    question: "How do you handle weed control?",
    answer:
      "We take an integrated approach to weed management. Pre-emergent herbicides are applied in early spring to prevent crabgrass and other annual weeds, followed by targeted post-emergent treatments for broadleaf weeds like dandelions and clover. We also focus on building thick, healthy turf through proper fertilization and mowing practices, which is the best long-term defense against weeds.",
    category: "services",
    serviceSlug: "weed-control",
  },
  {
    question: "Do you provide irrigation system maintenance?",
    answer:
      "Yes, we offer sprinkler system start-ups in the spring, mid-season inspections and adjustments, and winterization blow-outs in the fall. Proper irrigation is critical for Colorado lawns, and we'll ensure your system is running efficiently so your turf gets the right amount of water without waste.",
    category: "services",
    serviceSlug: "irrigation",
  },

  // ─── Scheduling ────────────────────────────────────────────────────────────
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking one to two weeks in advance to secure your preferred date. Spring is our busiest season, so early booking is especially important for aeration, overseeding, and spring cleanup services. Recurring maintenance customers receive priority scheduling year-round.",
    category: "scheduling",
  },
  {
    question: "What if it rains on my service day?",
    answer:
      "If rain or severe weather prevents us from completing your service, we'll reschedule at no additional charge as quickly as possible. In some cases, light rain can actually benefit certain treatments like fertilization and overseeding, so we may proceed if conditions are favorable and communicate that with you.",
    category: "scheduling",
  },
  {
    question: "Do I need to be home during service?",
    answer:
      "No, you do not need to be home. We simply ask that you ensure gate access to the lawn areas being serviced and that pets are kept indoors or in a separate area. We'll leave a detailed service summary at your door or send one via email so you know exactly what was completed.",
    category: "scheduling",
  },
  {
    question: "How do I cancel or reschedule a service?",
    answer:
      "We ask for at least 24 hours' notice for cancellations or reschedules. You can call our office, send us an email, or use the online customer portal to manage your appointments. There is no fee for rescheduling as long as we receive timely notice.",
    category: "scheduling",
  },

  // ─── Locations ─────────────────────────────────────────────────────────────
  {
    question: "Do you serve the entire Denver metro area?",
    answer:
      "Yes, we provide full-service lawn care throughout the Denver metro area, including Denver, Aurora, Lakewood, Littleton, Centennial, and Englewood. Our crews are based locally and know the unique soil and climate conditions of each neighborhood, from the clay-heavy soils of south Denver to the sandy loams near the Platte River.",
    category: "locations",
  },
  {
    question: "How far north do you service?",
    answer:
      "Our service area extends north through Broomfield, Longmont, Loveland, and all the way up to Fort Collins and the surrounding communities near the Wyoming border. Northern Colorado's cooler temperatures and unique turf challenges are something our team handles daily.",
    category: "locations",
  },
  {
    question: "Do you service Colorado Springs?",
    answer:
      "Yes, we serve all of Colorado Springs and the surrounding communities including Manitou Springs, Monument, Fountain, and Security-Widefield. Our Colorado Springs crews understand the area's higher elevation, variable soils, and water restrictions, and tailor every treatment accordingly.",
    category: "locations",
  },
];
