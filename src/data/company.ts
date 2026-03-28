import type { Company } from '../types';

export const company: Company = {
  name: "Rangel Janitorial",
  tagline: "Creating Excellent First Impressions",
  phone: "951-894-4222",
  email: "info@rangeljanitorial.com",
  address: {
    street: "26323 Jefferson Ave Suite C",
    city: "Murrieta",
    state: "CA",
    zip: "92562",
  },
  businessHours: {
    weekdays: "9:00 AM - 5:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },
  founded: 2021,
  description: `Rangel Janitorial is a professional commercial cleaning company headquartered in Murrieta, California. We provide janitorial cleaning, day porter services, electrostatic disinfection, floor care, and carpet cleaning for businesses across Southern and Northern California — from the Inland Empire to Walnut Creek and Sacramento. Our trained crews deliver consistent, reliable results for Class A office buildings, corporate campuses, medical and dental facilities, light industrial parks, multi-unit properties, municipalities, and fitness centers.`,
  mission: "To create excellent first impressions through professional, reliable commercial cleaning services that keep your facilities spotless and your people healthy.",
  values: [
    {
      title: "Reliable & Consistent",
      description: "Our trained crews show up on time, every time. We deliver the same high standard of clean night after night — because your facility's reputation depends on it.",
    },
    {
      title: "Professional Teams",
      description: "Every team member is carefully selected, background-checked, and trained to handle commercial environments with care. We invest in our people so they take pride in the service they provide.",
    },
    {
      title: "Satisfaction Guaranteed",
      description: "We stand behind every service we provide. If you're not completely satisfied with the results, we'll make it right. Your facility deserves nothing less than excellent.",
    },
  ],
  stats: {
    yearsInBusiness: 4,
    customersServed: "500+",
    satisfactionRate: "99%",
    projectsCompleted: "5,000+",
  },
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=100090088264095",
    instagram: "https://www.instagram.com/rangeljanitorial/",
    youtube: "https://www.youtube.com/@rangeljanitorial/featured",
  },
  certifications: [
    "Licensed & Insured",
    "EPA List N Approved Disinfectants",
    "Background-Checked Crews",
  ],
};
