import type { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  // General (8)
  {
    question: "What areas does Rangel Janitorial serve?",
    answer: "Rangel Janitorial serves communities across California including Greater Sacramento, Murrieta and the Inland Empire (Temecula, Menifee, and surrounding cities), and Walnut Creek and the East Bay / Contra Costa County. Our headquarters is at 26323 Jefferson Ave Suite C, Murrieta, CA 92562.",
    category: "general",
  },
  {
    question: "Is Rangel Janitorial licensed and insured?",
    answer: "Yes, Rangel Janitorial is fully licensed and insured. With over 30 years of experience in the commercial cleaning and disinfecting industry, we bring professional-grade expertise to every janitorial job. All of our team members are trained to meet the highest industry standards.",
    category: "general",
  },
  {
    question: "What types of facilities does Rangel Janitorial service?",
    answer: "We service Class A office buildings, corporate buildings, light industrial parks, multi-unit properties, medical and dental facilities, municipalities, and fitness centers. Whether you need nightly janitorial cleaning or specialized floor care, we tailor our services to your facility type.",
    category: "general",
  },
  {
    question: "How long has Rangel Janitorial been in business?",
    answer: "Rangel Janitorial brings over 30 years of experience in the commercial cleaning and disinfecting industry. We're a family-owned company headquartered in Murrieta, California, serving facilities across the state.",
    category: "general",
  },
  {
    question: "Do you offer free estimates?",
    answer: "Yes, we offer free facility walkthroughs and estimates with no obligation. Contact us at 951-894-4222, visit our locations page, or fill out the form on our website to schedule a consultation and receive a customized cleaning proposal for your facility.",
    category: "general",
  },
  {
    question: "What cleaning products and equipment do you use?",
    answer: "We use commercial-grade, EPA-registered cleaning products and professional equipment including electrostatic sprayers, auto-scrubbers, burnishers, and truck-mounted carpet extractors. All products are selected to meet the specific needs of each facility type, including medical-grade disinfectants for healthcare environments.",
    category: "general",
  },
  {
    question: "How often should my facility be professionally cleaned?",
    answer: "Cleaning frequency depends on your facility type, foot traffic, and industry requirements. Most commercial offices are cleaned nightly (5 to 7 days per week). Medical facilities, fitness centers, and high-traffic buildings often require daily cleaning plus periodic deep cleaning. We'll recommend the right schedule during your free walkthrough.",
    category: "general",
  },
  {
    question: "How are your crews trained?",
    answer: "Every Rangel Janitorial team member goes through comprehensive training on cleaning protocols, chemical handling, and facility-specific procedures. We also carry full liability insurance and workers' compensation coverage.",
    category: "general",
  },

  // Pricing (4)
  {
    question: "How much does commercial janitorial cleaning cost?",
    answer: "Pricing is based on your facility's square footage, cleaning frequency, scope of services, and any specialized requirements. We provide free, customized proposals after a facility walkthrough. Contact us at 951-894-4222 or fill out our website form to schedule your consultation.",
    category: "pricing",
  },
  {
    question: "Do you offer ongoing maintenance contracts?",
    answer: "Yes, we offer flexible service contracts — nightly, weekly, bi-weekly, and monthly options. Most commercial clients prefer ongoing contracts for consistent cleaning quality and predictable budgeting. All contracts include quality inspections and a dedicated account manager.",
    category: "pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, checks, ACH transfers, and online payments. For ongoing contracts, we offer monthly invoicing with net-30 terms for qualified accounts.",
    category: "pricing",
  },
  {
    question: "Do you offer discounts for multi-location or bundled services?",
    answer: "Yes, clients with multiple facilities or bundled service packages (for example, nightly janitorial plus monthly floor care and quarterly carpet cleaning) receive preferred pricing. Contact us at 951-894-4222 to discuss a custom package for your facilities.",
    category: "pricing",
  },

  // Services (7)
  {
    question: "What does your janitorial cleaning service include?",
    answer: "Our standard janitorial cleaning includes restroom sanitation, trash and recycling removal, vacuuming and mopping, surface wiping and disinfection, break room cleaning, glass and mirror cleaning, and dusting. We customize the scope to match your facility's needs and can add specialized services as required.",
    category: "services",
    serviceSlug: "janitorial-cleaning",
  },
  {
    question: "What is day porter service?",
    answer: "Day porter service provides a dedicated cleaning professional on-site during business hours to maintain your facility in real time. Porters handle restroom restocking, lobby upkeep, spill response, conference room resets, break room maintenance, and other tasks that keep your building looking its best throughout the workday.",
    category: "services",
    serviceSlug: "day-porter",
  },
  {
    question: "What is electrostatic disinfection?",
    answer: "Electrostatic disinfection uses specialized sprayers that charge disinfectant particles so they wrap around and evenly coat all surfaces — including hard-to-reach areas that traditional wiping misses. It provides 360-degree coverage and is ideal for medical facilities, fitness centers, and any environment where thorough pathogen elimination is critical.",
    category: "services",
    serviceSlug: "electrostatic-disinfection",
  },
  {
    question: "What floor care services do you offer?",
    answer: "Our floor care program includes stripping and waxing VCT and vinyl floors, concrete polishing, tile and grout cleaning, auto-scrubbing, and burnishing. Regular floor care extends the life of your flooring, improves appearance, and reduces slip hazards. We recommend a floor care schedule based on your traffic levels and flooring type.",
    category: "services",
    serviceSlug: "floor-care",
  },
  {
    question: "How does your carpet cleaning service work?",
    answer: "We use truck-mounted hot water extraction (steam cleaning) and low-moisture encapsulation methods depending on your carpet type and facility needs. Our process removes deep-set dirt, stains, and allergens while minimizing dry time. We also offer carpet spot treatment and interim maintenance programs to extend the life of your carpet.",
    category: "services",
    serviceSlug: "carpet-cleaning",
  },
  {
    question: "Can you handle medical and dental facility cleaning?",
    answer: "Yes, we have extensive experience cleaning medical and dental facilities. Our teams are trained in infection control protocols, proper PPE usage, and OSHA-compliant cleaning procedures. We use EPA-registered, hospital-grade disinfectants and follow strict protocols for exam rooms, waiting areas, and common spaces.",
    category: "services",
    serviceSlug: "janitorial-cleaning",
  },
  {
    question: "Do you clean fitness centers and gyms?",
    answer: "Yes, we provide comprehensive cleaning for fitness centers including equipment wipe-downs, locker room sanitation, shower and restroom deep cleaning, floor care for rubber and hardwood gym floors, and electrostatic disinfection. We understand the unique hygiene demands of high-traffic fitness environments.",
    category: "services",
    serviceSlug: "electrostatic-disinfection",
  },

  // Scheduling (4)
  {
    question: "How far in advance should I book?",
    answer: "For new contracts, we recommend reaching out 2 to 4 weeks before your desired start date so we can conduct a facility walkthrough, prepare your proposal, and onboard your account. For one-time deep cleaning or floor care projects, 1 to 2 weeks' notice is typically sufficient.",
    category: "scheduling",
  },
  {
    question: "What hours do your cleaning crews work?",
    answer: "Most of our janitorial crews work after business hours — typically between 6 PM and 2 AM — to minimize disruption. Day porter service is available during standard business hours. We're flexible and will work around your facility's operating schedule to find the best fit.",
    category: "scheduling",
  },
  {
    question: "Can you adjust the cleaning schedule for holidays or special events?",
    answer: "Absolutely. We work with every client to accommodate holiday schedules, special events, tenant move-ins and move-outs, and any other changes. Just let your account manager know in advance and we'll adjust the schedule accordingly.",
    category: "scheduling",
  },
  {
    question: "How do you handle quality control?",
    answer: "We conduct regular quality inspections using detailed checklists tailored to your facility. Your dedicated account manager performs scheduled and unscheduled walkthroughs, and we provide inspection reports so you always know the status of your cleaning program. We also welcome client feedback and address any concerns within 24 hours.",
    category: "scheduling",
  },

  // Locations (3)
  {
    question: "Do you serve the Sacramento area?",
    answer: "Yes, Rangel Janitorial serves the Greater Sacramento region including Elk Grove, Roseville, Folsom, Rancho Cordova, Natomas, and surrounding communities. We provide full-service commercial janitorial cleaning, floor care, carpet cleaning, and electrostatic disinfection throughout the Sacramento metro area.",
    category: "locations",
    locationSlug: "sacramento",
  },
  {
    question: "Where is Rangel Janitorial headquartered?",
    answer: "Rangel Janitorial is headquartered at 26323 Jefferson Ave Suite C, Murrieta, CA 92562, in the heart of the Inland Empire. We serve the entire region including Temecula, Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, French Valley, and Temescal Valley. Call us at 951-894-4222.",
    category: "locations",
    locationSlug: "murrieta",
  },
  {
    question: "Do you serve the East Bay and Walnut Creek area?",
    answer: "Yes, we serve Walnut Creek and the greater Contra Costa County / East Bay area including Concord, Pleasant Hill, Martinez, Antioch, Brentwood, and surrounding communities. Our East Bay team provides the same full range of janitorial and specialty cleaning services available at all our locations.",
    category: "locations",
    locationSlug: "walnut-creek",
  },
];
