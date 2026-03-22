import type { Company } from '../types';

export const company: Company = {
  name: "Murphy's Turf",
  tagline: "When you care about clean turf, call Murphy's Turf",
  phone: "",
  email: "info@murphysturf.com",
  address: {
    street: "",
    city: "Murrieta",
    state: "CA",
    zip: "92562",
  },
  businessHours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "8:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  founded: 1994,
  description: `With over 30 years in the cleaning & disinfecting business, we've decided to take our experience and bring it to your lawn with turf maintenance and pet waste removal services. Murphy's technicians are carefully selected and trained to provide you the satisfaction of clean and maintained artificial grass with the best of our ability. With this process we ensure consistency as well as invest in our technicians so each and every team member is proud of the service they provide our clients.

Murphy's Turf is a family-owned artificial turf cleaning company headquartered in Murrieta, California. We serve homeowners and businesses across Southern California and the Bay Area — from Huntington Beach and the LA coast to the Inland Empire, Martinez and Contra Costa County, and the Greater Sacramento region. Our cleaning products are powered by OxyTurf, a stabilized accelerated hydrogen peroxide formula that contains no bleach or ammonia, making it completely safe for your pets, kids, and the environment while killing 99.9% of germs and bacteria.`,
  mission: "To provide every customer with clean, sanitized, and beautifully maintained artificial turf using safe, eco-friendly products that protect families, pets, and the environment.",
  values: [
    {
      title: "100% Pet Friendly",
      description: "Every product we use is completely safe for your pets. Our OxyTurf cleaning solution contains no bleach or ammonia — just stabilized accelerated hydrogen peroxide that eliminates bacteria without leaving harmful residues.",
    },
    {
      title: "Eco Friendly",
      description: "We're committed to environmentally responsible cleaning. OxyTurf is biodegradable and free from harsh chemicals, protecting California's ecosystems while delivering a superior clean.",
    },
    {
      title: "Satisfaction Guaranteed",
      description: "We stand behind every service we provide. If you're not completely satisfied with the results, we'll make it right. Our 30+ years of cleaning experience means we know how to deliver results that exceed expectations.",
    },
  ],
  stats: {
    yearsInBusiness: 30,
    customersServed: "5,000+",
    satisfactionRate: "99%",
    projectsCompleted: "15,000+",
  },
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=100090088264095",
    instagram: "https://www.instagram.com/murphysturfcare/",
    youtube: "https://www.youtube.com/@murphysturfcare/featured",
  },
  certifications: [
    "Licensed & Insured",
    "30+ Years Cleaning & Disinfecting Experience",
    "OxyTurf Certified Applicator",
  ],
};
