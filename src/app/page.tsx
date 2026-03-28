'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Star,
  ArrowRight,
  ShieldCheck,
  Users,
  ThumbsUp,
  Phone,
  Sparkles,
  Building2,
  UserCheck,
  Zap,
  Layers,
  Building,
  Stethoscope,
  Warehouse,
  Home as HomeIcon,
  Landmark,
  Dumbbell,
  ClipboardList,
  CalendarCheck,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

/* ========================== DATA ========================== */

const services = [
  { name: 'Janitorial Cleaning', slug: 'janitorial-cleaning', icon: Building2, description: 'Nightly & scheduled office, lobby, and restroom cleaning.' },
  { name: 'Day Porter', slug: 'day-porter', icon: UserCheck, description: 'On-site daytime staff for real-time facility upkeep.' },
  { name: 'Electrostatic Disinfection', slug: 'electrostatic-disinfection', icon: Zap, description: '360-degree disinfectant coverage on all surfaces.' },
  { name: 'Floor Care', slug: 'floor-care', icon: Layers, description: 'Strip, wax, buff, and polish for all floor types.' },
  { name: 'Carpet Cleaning', slug: 'carpet-cleaning', icon: Sparkles, description: 'Deep extraction cleaning to extend carpet life.' },
];

const testimonials = [
  {
    quote: "Rangel Janitorial has been cleaning our corporate offices for over two years. Their crews are reliable, thorough, and always professional.",
    name: 'Michael T.',
    location: 'Sacramento',
  },
  {
    quote: "We switched to Rangel for our medical facility and the difference was immediate. The electrostatic disinfection gives us peace of mind.",
    name: 'Dr. Patricia S.',
    location: 'Murrieta',
  },
  {
    quote: "Managing multiple properties means I need a cleaning company I can count on. Rangel delivers consistent quality across all our buildings.",
    name: 'Robert K.',
    location: 'Walnut Creek',
  },
];

const stats = [
  { label: 'Customers Served', value: 500, suffix: '+' },
  { label: 'Projects Completed', value: 5000, suffix: '+' },
  { label: 'Satisfaction Rate', value: 99, suffix: '%' },
  { label: 'Years of Experience', value: 30, suffix: '+' },
];

const industries = [
  { name: 'Corporate Offices & Class A Buildings', icon: Building },
  { name: 'Medical & Dental Facilities', icon: Stethoscope },
  { name: 'Industrial Parks & Warehouses', icon: Warehouse },
  { name: 'Multi-Unit Properties', icon: HomeIcon },
  { name: 'Municipalities & Government Buildings', icon: Landmark },
  { name: 'Fitness Centers & Gyms', icon: Dumbbell },
];

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    description: 'Get a free, no-obligation quote tailored to your facility.',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Schedule Your Estimate',
    description: 'We visit your location and assess your cleaning needs in person.',
    icon: CalendarCheck,
  },
  {
    number: '03',
    title: 'Enjoy Your Clean Facility',
    description: 'Reliable, consistent cleaning from a team you can trust.',
    icon: CheckCircle2,
  },
];

const serviceAreas = [
  { name: 'Sacramento', slug: 'sacramento', description: 'Serving the Greater Sacramento area' },
  { name: 'Murrieta / Inland Empire', slug: 'murrieta', description: 'Our home base in Southern California' },
  { name: 'Walnut Creek / East Bay', slug: 'walnut-creek', description: 'Serving the East Bay and beyond' },
];

/* ========================== ANIMATED COUNTER ========================== */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading font-extrabold text-4xl sm:text-5xl text-forest">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

/* ==================== MAIN PAGE ==================== */

export default function Home() {
  return (
    <>
      {/* AggregateRating JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Rangel Janitorial",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "3",
              "bestRating": "5"
            }
          })
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/gallery/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-forest-dark/95 via-forest/85 to-forest-dark/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-sage-light font-body font-semibold text-sm px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4" />
              Trusted by 500+ California Businesses
            </p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
              Commercial Cleaning{' '}
              <span className="text-sage-light">You Can Count On</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-2xl">
              30+ years of experience. Spotless facilities — guaranteed. Trusted by 500+ California businesses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/locations"
                className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:9518944222"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                951-894-4222
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-forest py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { icon: Users, label: 'Trained Professional Crews' },
              { icon: ShieldCheck, label: 'Fully Bonded & Insured' },
              { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 text-white/90">
                  <Icon className="w-5 h-5 text-sage-light" />
                  <span className="font-body font-medium text-sm">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 font-body font-medium text-charcoal-light text-sm sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body font-semibold text-sage text-sm uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal">
              Our Services
            </h2>
            <p className="mt-4 font-body text-charcoal-light leading-relaxed">
              Comprehensive commercial cleaning solutions tailored to your facility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white hover:bg-white rounded-xl p-6 border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all duration-200 text-center"
                >
                  <div className="w-12 h-12 bg-forest/10 group-hover:bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-forest group-hover:text-sage transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-charcoal group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-charcoal-light text-xs leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-body font-semibold text-sage hover:text-forest transition-colors"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body font-semibold text-sage text-sm uppercase tracking-wider mb-3">Who We Serve</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal">
              Industries We Serve
            </h2>
            <p className="mt-4 font-body text-charcoal-light leading-relaxed">
              From Class A office buildings to medical facilities, we have the expertise to keep any commercial space spotless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="flex items-center gap-4 bg-cream rounded-xl p-6 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-forest" />
                  </div>
                  <h3 className="font-heading font-bold text-charcoal text-sm sm:text-base">
                    {industry.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body font-semibold text-sage text-sm uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal">
              How It Works
            </h2>
            <p className="mt-4 font-body text-charcoal-light leading-relaxed">
              Getting started is easy. Three simple steps to a cleaner facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-sage text-white font-heading font-bold text-xs rounded-full flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-charcoal-light text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body font-semibold text-sage text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-cream rounded-2xl p-7 border border-gray-100 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="font-body text-charcoal-light leading-relaxed text-sm flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 bg-forest/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-forest text-xs">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-charcoal text-sm">{t.name}</p>
                    <p className="font-body text-charcoal-light text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-body font-semibold text-sage text-sm uppercase tracking-wider mb-3">Coverage</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal">
              Service Areas
            </h2>
            <p className="mt-4 font-body text-charcoal-light leading-relaxed">
              Proudly serving businesses across three major California regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 bg-forest/10 group-hover:bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                  <MapPin className="w-6 h-6 text-forest group-hover:text-sage transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-charcoal group-hover:text-forest text-lg transition-colors">
                  {area.name}
                </h3>
                <p className="mt-2 font-body text-charcoal-light text-sm">
                  {area.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body font-semibold text-sage text-sm group-hover:text-forest transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-forest-dark via-forest to-forest-light py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Ready for a Spotless Facility?
          </h2>
          <p className="mt-4 font-body text-lg text-gray-200">
            Join 500+ California businesses that trust Rangel Janitorial. Get a free, no-obligation quote today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold px-8 py-4 rounded-xl transition-all shadow-md"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:9518944222"
              className="inline-flex items-center gap-2 text-sage-light hover:text-white font-body font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              951-894-4222
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
