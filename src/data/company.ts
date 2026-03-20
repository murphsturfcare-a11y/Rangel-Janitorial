import type { Company } from '../types';

export const company: Company = {
  name: "Murphy's Turf Care",
  tagline: "Professional Artificial Turf Cleaning & Sanitization",
  phone: "(951) 331-3300",
  email: "info@murphysturf.com",
  address: {
    street: "26323 Jefferson Avenue",
    city: "Murrieta",
    state: "CA",
    zip: "92562",
  },
  businessHours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "8:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  founded: 2018,
  description: `Murphy's Turf Care was founded in 2018 by Patrick Murphy in Murrieta, California with a simple mission: to keep California's artificial turf clean, safe, and looking like new. As synthetic turf installations boomed across Southern California — driven by drought conditions, water restrictions, and the desire for low-maintenance outdoor spaces — Patrick recognized that homeowners and businesses needed a professional cleaning solution. Garden hoses and DIY efforts simply couldn't address the bacteria, pet odors, and embedded debris that accumulate in synthetic turf, especially under California's intense sun.

What started as a one-truck operation serving neighbors in the Inland Empire has grown into one of California's most trusted artificial turf cleaning companies, with a dedicated team of over 25 professionals serving thousands of residential and commercial clients across Los Angeles, Murrieta, the Bay Area's Contra Costa County, and Sacramento. We specialize in deep cleaning, sanitization, pet odor elimination, deodorizing, turf repair, and commercial maintenance — everything needed to keep synthetic turf performing and looking its best for years to come.`,
  mission: "To deliver exceptional artificial turf cleaning and sanitization that keeps synthetic grass safe, clean, and beautiful — using eco-friendly products that protect California families, pets, and the environment.",
  values: [
    {
      title: "Quality First",
      description: "We never cut corners. Every turf surface receives our full attention, professional-grade equipment, and proven cleaning techniques that deliver visible, lasting results.",
    },
    {
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We customize our cleaning approach to your turf's specific needs and stand behind our work with a satisfaction guarantee.",
    },
    {
      title: "Eco-Friendly",
      description: "We use plant-based, biodegradable cleaning products that are safe for children, pets, and the environment. Our methods conserve water while delivering a superior clean.",
    },
    {
      title: "Community Driven",
      description: "As a California family business, we're invested in the communities we serve. We sponsor local youth sports, partner with animal shelters, and believe in giving back to the places that have supported our growth.",
    },
  ],
  stats: {
    yearsInBusiness: 8,
    customersServed: "2,500+",
    satisfactionRate: "98%",
    projectsCompleted: "10,000+",
  },
  socialMedia: {
    facebook: "#",
    instagram: "#",
    google: "#",
    yelp: "#",
  },
  certifications: [
    "Licensed & Insured",
    "EPA Certified",
    "California Landscape Contractors Association (CLCA)",
    "Better Business Bureau A+ Rated",
  ],
};
