import { Dog, Flower2, SprayCan, Trash2 } from 'lucide-react';
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
    icon: Dog,
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    description:
      'Thorough removal of pet hair, fur, and debris from your artificial turf to keep it clean and safe for your family and pets.',
  },
  {
    icon: Flower2,
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    description:
      'Restore your turf\'s natural look and feel with our professional blooming and de-compacting service that revives flattened fibers.',
  },
  {
    icon: SprayCan,
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    description:
      'Eliminate bacteria, odors, and harmful pathogens with our eco-friendly disinfecting and deodorizing treatment.',
  },
  {
    icon: Trash2,
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    description:
      'Regular pet waste cleanup and removal to maintain a hygienic outdoor space for your family.',
  },
];

export default function ServiceOverview() {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-charcoal">
          Our Turf Cleaning Services
        </h2>
        <p className="text-center text-charcoal-light mt-4 font-body">
          Comprehensive artificial turf care solutions to keep your outdoor
          space clean, fresh, and beautiful
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
