import { Scissors, Wind, Sprout, Droplets, Bug, Calendar } from 'lucide-react';
import ServiceCard from '@/components/cards/ServiceCard';
import type { LucideIcon } from 'lucide-react';

interface ServiceData {
  icon: LucideIcon;
  name: string;
  slug: string;
  description: string;
}

const services: ServiceData[] = [
  {
    icon: Scissors,
    name: 'Lawn Cleaning',
    slug: 'lawn-cleaning',
    description:
      'Complete lawn cleaning and debris removal to keep your yard pristine and healthy.',
  },
  {
    icon: Wind,
    name: 'Aeration',
    slug: 'aeration',
    description:
      'Core aeration to improve soil drainage, reduce compaction, and promote root growth.',
  },
  {
    icon: Sprout,
    name: 'Seeding',
    slug: 'seeding',
    description:
      'Expert overseeding and new lawn establishment for a thick, lush lawn.',
  },
  {
    icon: Droplets,
    name: 'Fertilization',
    slug: 'fertilization',
    description:
      'Custom fertilization programs to nourish your lawn throughout the seasons.',
  },
  {
    icon: Bug,
    name: 'Pest Control',
    slug: 'pest-control',
    description:
      'Targeted pest and weed control to protect your lawn from damage.',
  },
  {
    icon: Calendar,
    name: 'Seasonal Maintenance',
    slug: 'seasonal-maintenance',
    description:
      'Year-round maintenance programs to keep your property looking its best.',
  },
];

export default function ServiceOverview() {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-charcoal">
          Our Professional Services
        </h2>
        <p className="text-center text-charcoal-light mt-4 font-body">
          Comprehensive lawn care solutions tailored to your property&apos;s
          needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              icon={service.icon}
              name={service.name}
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
