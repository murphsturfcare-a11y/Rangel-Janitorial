import type { Company } from '../types';

export const company: Company = {
  name: "Murphy's Turf",
  tagline: "Transform Your Lawn Into a Masterpiece",
  phone: "(720) 555-0147",
  email: "info@murphysturf.com",
  address: {
    street: "1847 Green Valley Rd",
    city: "Denver",
    state: "CO",
    zip: "80203",
  },
  businessHours: {
    weekdays: "7:00 AM - 6:00 PM",
    saturday: "8:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  founded: 2018,
  description: `Murphy's Turf was founded in 2018 by Patrick Murphy, a lifelong Colorado resident with a deep passion for lawn care and the great outdoors. What started as a one-truck operation serving a handful of neighbors in Denver has grown into one of the Front Range's most trusted turf cleaning and lawn care companies, with a dedicated team of over 25 professionals serving thousands of homeowners across six Colorado communities.

As a family-owned business, we take pride in treating every customer's lawn as if it were our own. Patrick's hands-on approach and commitment to quality have shaped every aspect of our operations — from the Colorado-adapted techniques we use to the eco-friendly products we choose. We understand the unique challenges that come with maintaining a beautiful lawn at altitude, and we bring that local expertise to every job. Whether you're dealing with stubborn clay soil, harsh winter damage, or the relentless Colorado sun, Murphy's Turf has the knowledge, equipment, and passion to transform your yard into the neighborhood standout.`,
  mission: "To deliver exceptional lawn care that homeowners can be proud of, using sustainable practices that protect Colorado's natural beauty.",
  values: [
    {
      title: "Quality First",
      description: "We never cut corners. Every lawn receives our full attention, premium products, and proven techniques that deliver visible, lasting results.",
    },
    {
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We listen to your concerns, customize our approach to your lawn's unique needs, and stand behind our work with a satisfaction guarantee.",
    },
    {
      title: "Eco-Friendly",
      description: "We're committed to sustainable practices that keep your lawn healthy without harming Colorado's environment. Our products are safe for families, pets, and local waterways.",
    },
    {
      title: "Community Driven",
      description: "As a Colorado family business, we're invested in the communities we serve. We sponsor local youth sports, participate in neighborhood cleanups, and believe in giving back to the places that have supported our growth.",
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
    "Colorado Green Industries Certified",
    "Better Business Bureau A+ Rated",
  ],
};
