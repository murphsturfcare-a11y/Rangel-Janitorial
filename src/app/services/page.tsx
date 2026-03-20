import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artificial Turf Cleaning Services | Murphy\'s Turf',
  description:
    "Professional artificial turf cleaning and maintenance services in Murrieta, CA. Pet hair removal, blooming, disinfecting, poop scooping, and OxyTurf treatments. Get a free quote today.",
};

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    image: '/images/services/debris-removal.png',
    description:
      'All of our turf services begin with removing pet hair and waste along with any other debris such as leaves and branches. We also run a magnet over the turf to remove any metal objects and use a de-weeding tool to clear weeds from edges and seams.',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    image: '/images/services/blooming.png',
    description:
      'Over time, frequent foot traffic causes turf blades to become matted down. Our blooming process uses commercial-grade machines to remove caked debris from the fibers and fluff the blades back to life, standing upright like natural grass.',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    image: '/images/services/oxyturf-spray.jpg',
    description:
      'Our disinfecting and deodorizing service uses OxyTurf to power-spray your turf, cutting past the top layer into the infill where bacteria and viruses live. OxyTurf kills 99.9% of germs and bacteria in minutes without hazardous chemicals.',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    image: '/images/services/poop-scooping.jpg',
    description:
      'Pet waste is not only an unruly sight but also harmful to the environment and people around you. According to the EPA, pet waste is very toxic. We provide flexible service plans dedicated to waste removal so you can enjoy your yard worry-free.',
  },
  {
    name: 'Powered By OxyTurf',
    slug: 'oxyturf',
    image: '/images/services/oxyturf-palms.jpg',
    description:
      'Murphy\'s Turf cleaning products are powered by OxyTurf, a proven synthetic turf cleaner-deodorizer that eliminates germs and bacteria while replacing them with the smell of fresh real grass. No bleach or ammonia — safe for pets and kids.',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Professional artificial turf cleaning and maintenance backed by 30+
            years of experience. Serving Murrieta, CA and surrounding areas with
            pet-safe, eco-friendly solutions powered by OxyTurf.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.slug}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sage/30 flex flex-col"
              >
                {/* Service image */}
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
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
                      href="/contact"
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-10 sm:p-14 shadow-xl">
            <HelpCircle className="w-12 h-12 text-sage mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Not Sure What Your Turf Needs?
            </h2>
            <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
              Every yard is different. Let our team with 30+ years of experience
              assess your artificial turf and recommend the perfect combination
              of services for your property. Free consultations available for all
              Murrieta-area homeowners.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                (951) 331-3300
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
