import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Map, Phone, Sparkles } from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Service Locations | Artificial Turf Cleaning Across California',
  description:
    "Murphy's Turf provides professional artificial turf cleaning and disinfecting services across California. Serving Huntington Beach, Murrieta, Martinez, and Sacramento.",
};

const locations = [
  {
    city: 'Huntington Beach / LA Area',
    slug: 'huntington-beach',
    description:
      'Professional-grade turf cleaning for coastal LA — from Huntington Beach to Seal Beach.',
    highlight: 'LA Area',
  },
  {
    city: 'Murrieta / Inland Empire',
    slug: 'murrieta',
    description:
      'Our headquarters. Serving the entire Inland Empire from Murrieta to Temecula and beyond.',
    highlight: 'Headquarters',
  },
  {
    city: 'Martinez / Bay Area',
    slug: 'martinez',
    description:
      'Expert turf cleaning across Contra Costa County and the East Bay.',
    highlight: 'Bay Area',
  },
  {
    city: 'Greater Sacramento',
    slug: 'sacramento',
    description:
      'Professional turf cleaning built for Central Valley heat. Serving Sacramento to Folsom.',
    highlight: 'Central Valley',
  },
];

export default function LocationsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-forest-dark/30 rounded-full blur-3xl" />
        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-body px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4" />
            Proudly Serving 4 California Regions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading mb-6 leading-tight">
            Serving California
            <br />
            <span className="text-cream">Communities</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-body max-w-3xl mx-auto leading-relaxed">
            From Huntington Beach to Sacramento, Murphy&apos;s Turf delivers professional
            artificial turf cleaning and disinfecting services to communities across California.
            With 30+ years of experience and our professional-grade cleaning products, we keep your
            synthetic turf clean, safe, and looking like new.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Location Cards Grid */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Our Service Areas
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              Select your area to learn about the artificial turf cleaning services we offer in your
              neighborhood and get a free quote.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {locations.map((location) => (
              <StaggerItem key={location.slug}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-sage/30 hover:-translate-y-1 card-hover block"
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
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 sm:py-24 bg-white">
        <AnimateOnScroll direction="fade" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Our Coverage Area
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              We service communities across California, from the Huntington Beach coastline
              in the south to Sacramento in the north, with our headquarters in Murrieta.
            </p>
          </div>
          <div className="relative w-full h-[400px] sm:h-[500px] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50" />
            <div className="relative flex flex-col items-center gap-4 text-center px-4">
              <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Map className="w-10 h-10 text-sage" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal font-heading">
                Interactive Service Area Map
              </h3>
              <p className="text-charcoal-light font-body max-w-md">
                Explore our full coverage area across California. From the coast to the
                Central Valley, Murphy&apos;s Turf has your artificial turf covered.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {locations.map((loc) => (
                  <span
                    key={loc.slug}
                    className="bg-white shadow-sm text-charcoal text-sm font-body px-3 py-1.5 rounded-full border border-gray-200"
                  >
                    <MapPin className="w-3 h-3 inline mr-1 text-sage" />
                    {loc.city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { stat: '4', label: 'Regions Served' },
              { stat: '30+', label: 'Years Experience' },
              { stat: '5,000+', label: 'Happy Customers' },
              { stat: '15,000+', label: 'Turfs Cleaned' },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-4xl sm:text-5xl font-bold text-sage font-heading mb-2">
                  {item.stat}
                </div>
                <div className="text-white/80 font-body text-sm sm:text-base">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-sage" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal font-heading mb-4">
              Don&apos;t See Your Area?
            </h2>
            <p className="text-lg text-charcoal-light font-body mb-8 max-w-2xl mx-auto">
              We&apos;re constantly expanding our service area across California. If you
              don&apos;t see your community listed, reach out anyway! When you care about
              clean turf, call Murphy&apos;s Turf.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:9513313300"
                className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-sm hover:shadow-md"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <Link
                href="/locations/murrieta#quote-form"
                className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-sm hover:shadow-md"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
