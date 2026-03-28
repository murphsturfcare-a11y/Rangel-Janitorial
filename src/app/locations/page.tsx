import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Service Locations | Professional Janitorial Services Across California',
  description:
    "Rangel Janitorial provides professional janitorial and commercial cleaning services across California. Serving Sacramento, Murrieta, and Walnut Creek.",
};

const locations = [
  {
    city: 'Greater Sacramento',
    slug: 'sacramento',
    description:
      'Professional janitorial services for offices, medical facilities, and commercial spaces across the Sacramento metro.',
    highlight: 'Sacramento',
  },
  {
    city: 'Murrieta / Inland Empire',
    slug: 'murrieta',
    description:
      'Reliable commercial cleaning for the entire Inland Empire — from Murrieta and Temecula to Menifee and beyond.',
    highlight: 'Inland Empire',
  },
  {
    city: 'Walnut Creek / East Bay',
    slug: 'walnut-creek',
    description:
      'Expert janitorial services across Walnut Creek, Concord, Pleasant Hill, and the greater East Bay.',
    highlight: 'East Bay',
  },
];

export default function LocationsPage() {
  return (
    <>
      {/* Hero Section with Location Cards */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-dark/30 rounded-full blur-3xl" />
        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-body px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4" />
            Proudly Serving 3 California Regions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading mb-12 leading-tight">
            Serving California
            <br />
            <span className="text-cream">Communities</span>
          </h1>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto text-left">
            {locations.map((location) => (
              <StaggerItem key={location.slug}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1 block"
                >
                  <div className="h-2 bg-gradient-to-r from-forest to-sage group-hover:from-sage group-hover:to-forest transition-all duration-500" />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-block bg-cream text-forest text-xs font-semibold font-body px-3 py-1 rounded-full mb-3">
                          {location.highlight}
                        </div>
                        <h3 className="text-2xl font-bold text-charcoal font-heading group-hover:text-forest transition-colors">
                          {location.city}
                        </h3>
                      </div>
                      <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center group-hover:bg-sage/10 transition-colors flex-shrink-0">
                        <MapPin className="w-5 h-5 text-sage" />
                      </div>
                    </div>
                    <p className="text-charcoal-light font-body text-sm leading-relaxed mb-6">
                      {location.description}
                    </p>
                    <div className="flex items-center gap-2 text-sage font-semibold font-body text-sm group-hover:text-forest transition-colors">
                      View Services & Get Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-sage" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Don&apos;t See Your Area?
            </h2>
            <p className="text-lg text-charcoal-light font-body mb-8 max-w-2xl mx-auto">
              We&apos;re constantly expanding our service area across California. If you
              don&apos;t see your community listed, reach out anyway — we&apos;d love to
              help keep your facility clean.
            </p>
            <a
              href="tel:9256559008"
              className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white font-bold px-10 py-4 rounded-lg transition-colors font-body shadow-md hover:shadow-lg text-lg"
            >
              <Phone className="w-5 h-5" />
              Call Us: (925) 655-9008
            </a>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
