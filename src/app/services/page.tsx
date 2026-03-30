import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import OurWorkGallery from '@/components/sections/OurWorkGallery';

export const metadata: Metadata = {
  title: 'Commercial Cleaning Services | Rangel Janitorial',
  description:
    "Professional janitorial cleaning, day porter, electrostatic disinfection, floor care, and carpet cleaning services. Serving Sacramento, Murrieta, and Walnut Creek. Get a free quote today.",
};

const services = [
  {
    name: 'Janitorial Cleaning',
    slug: 'janitorial-cleaning',
    image: '/images/stock/janitorial-cleaning.png',
    alt: 'Professional janitorial crew cleaning a corporate office building',
    description:
      'Comprehensive nightly and recurring cleaning for corporate buildings, warehouses, residential buildings, and offices — customized to your facility and schedule.',
  },
  {
    name: 'Day Porter',
    slug: 'day-porter',
    image: '/images/stock/day-porter.png',
    alt: 'Day porter maintaining a commercial building lobby during business hours',
    description:
      'Customer-facing team members who provide cleaning and maintenance tasks during normal working hours, keeping your facility looking its best all day long.',
  },
  {
    name: 'Electrostatic Disinfection',
    slug: 'electrostatic-disinfection',
    image: '/images/stock/electrostatic-disinfection.png',
    alt: 'Technician performing electrostatic disinfection in an office',
    description:
      'Advanced electrostatic spraying technology to apply EPA List N approved disinfectants on all high-touch surfaces for comprehensive germ elimination.',
  },
  {
    name: 'Floor Care',
    slug: 'floor-care',
    image: '/images/stock/floor-care.png',
    alt: 'Commercial floor care specialist stripping and waxing VCT floors',
    description:
      'Specialized floor maintenance including VCT strip and wax, tile and grout cleaning, LVT care, concrete polishing, and stone floor restoration.',
  },
  {
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    image: '/images/stock/carpet-cleaning.png',
    alt: 'Professional carpet cleaning with hot water extraction in a commercial building',
    description:
      'Professional commercial carpet cleaning using hot water extraction, encapsulation, and spot treatment to extend carpet life and maintain a clean appearance.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-12 sm:py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Professional janitorial and commercial cleaning services for
            offices, medical facilities, industrial parks, and more. Serving
            Sacramento, Murrieta, and Walnut Creek.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <div
                  className="card-hover group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sage/30 flex flex-col h-full"
                >
                  {/* Service image */}
                  <div className="img-zoom aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    {/* Service Name */}
                    <h2 className="text-xl font-bold font-heading text-charcoal mb-3">
                      {service.name}
                    </h2>

                    {/* Description */}
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        href="/locations"
                        className="text-sm font-semibold font-body text-forest hover:text-forest-dark transition-colors"
                      >
                        Get a Quote
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-sage font-semibold font-body text-sm hover:text-forest transition-colors group/link"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Our Work Gallery */}
      <OurWorkGallery />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-white">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-10 sm:p-14 shadow-xl">
            <HelpCircle className="w-12 h-12 text-sage mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Not Sure What Your Facility Needs?
            </h2>
            <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every facility is different. Let our team assess your space and
              recommend the perfect combination of services for your building.
              Free walkthroughs available across all service areas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/locations"
                className="btn-hover inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/locations"
                className="btn-hover inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
              >
                <MapPin className="w-5 h-5" />
                Find Your Local Office
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
