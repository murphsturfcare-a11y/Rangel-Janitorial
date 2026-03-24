'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ChevronDown,
  MapPin,
  ArrowRight,
  CheckCircle2,
  PawPrint,
  Leaf,
  ThumbsUp,
} from 'lucide-react';

/* ========================== DATA ========================== */

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    description:
      'We remove pet hair, waste, leaves, branches, and run a magnet for metal objects while de-weeding edges and seams to leave your turf spotless.',
    image: '/images/gallery/service-turf-cleaning.png',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    description:
      'We bring matted, flattened turf back to life by fluffing blades upright so your artificial grass looks and feels like natural grass again.',
    image: '/images/gallery/service-turf-blooming-v2.png',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    description:
      'Our professional-grade cleaning kills 99.9% of germs and bacteria on your turf without hazardous chemicals, leaving your yard fresh and safe.',
    image: '/images/gallery/service-turf-disinfecting-v2.jpeg',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    description:
      'Convenient pet waste removal plans designed to keep your yard fresh, clean, and ready for your family to enjoy every day.',
    image: '/images/gallery/service-turf-deodorizing.png',
  },
];

const testimonials = [
  {
    quote:
      "Our dogs destroyed our artificial turf smell-wise. Murphy's came out, did the deep cleaning treatment, and it smells like the day it was installed. The kids can play on it again worry-free.",
    name: 'Jessica M.',
    location: 'Murrieta',
  },
  {
    quote:
      "We tried everything to get the pet odor out of our turf. One visit from Murphy's and the difference was unbelievable. Monthly service now and our backyard is always fresh.",
    name: 'David R.',
    location: 'Huntington Beach',
  },
  {
    quote:
      "Professional, thorough, and our turf looks brand new. The blooming service brought our matted turf back to life. Highly recommend Murphy's Turf!",
    name: 'Karen L.',
    location: 'Martinez',
  },
];

const locationButtons = [
  { name: 'Huntington Beach / LA Area', slug: 'huntington-beach' },
  { name: 'Murrieta / Inland Empire', slug: 'murrieta' },
  { name: 'Martinez / Bay Area', slug: 'martinez' },
  { name: 'Greater Sacramento', slug: 'sacramento' },
];

const locations = [
  {
    name: 'Huntington Beach / LA Area',
    slug: 'huntington-beach',
    tagline: 'Premium artificial turf cleaning for coastal Southern California.',
  },
  {
    name: 'Murrieta / Inland Empire',
    slug: 'murrieta',
    tagline: 'Our headquarters and home base. Proudly serving the IE community.',
    isHQ: true,
  },
  {
    name: 'Martinez / Bay Area',
    slug: 'martinez',
    tagline: 'Trusted turf cleaning and maintenance for Bay Area families.',
  },
  {
    name: 'Sacramento',
    slug: 'sacramento',
    tagline: 'Professional turf care across Sacramento and surrounding areas.',
  },
];

const faqs = [
  {
    question: 'How often should artificial turf be cleaned?',
    answer:
      'We recommend professional cleaning every 4-6 weeks for homes with pets. For turf without pets, a quarterly deep clean is usually sufficient. Regular maintenance keeps odors away and extends the life of your turf investment.',
  },
  {
    question: 'Are your cleaning products safe for my pets and kids?',
    answer:
      'Absolutely. Our professional-grade cleaning solution is hydrogen peroxide-based and contains no bleach, ammonia, or hazardous chemicals. It is specifically formulated to be safe for pets, children, and the environment while still killing 99.9% of germs and bacteria.',
  },
  {
    question: 'What does your turf cleaning process include?',
    answer:
      'Our comprehensive process includes pet hair and debris removal, de-weeding edges and seams, running a magnet for metal objects, blooming and de-compacting matted fibers, and a full disinfect and deodorize treatment with our professional-grade cleaning solution. Every visit leaves your turf looking and smelling like new.',
  },
  {
    question: 'Do you offer poop scooping services separately?',
    answer:
      'Yes! We offer standalone poop scooping and pet waste removal plans on weekly, bi-weekly, or custom schedules. It\u2019s a great way to keep your yard clean between full turf cleaning visits.',
  },
  {
    question: 'How long does a cleaning take?',
    answer:
      'Most residential turf cleanings take between 45 minutes and 1.5 hours, depending on the size of your lawn and the services included. We work efficiently without cutting corners so you can get back to enjoying your yard.',
  },
  {
    question: 'Do I need to be home during service?',
    answer:
      'No, you do not need to be home. As long as we have access to your yard and a water source, our team can complete the service while you\u2019re away. We\u2019ll send you a notification when the job is done.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We proudly serve communities across California including Huntington Beach and the LA area, Murrieta and the Inland Empire, Martinez and the Bay Area, and Sacramento. Contact us to check if we service your specific location.',
  },
  {
    question: 'Can you fix matted or flattened turf?',
    answer:
      'Yes! Our blooming and de-compacting service is specifically designed to bring matted turf back to life. We fluff the blades upright so your artificial grass looks and feels like natural grass again. Results are immediate and dramatic.',
  },
];

const processSteps = [
  {
    image: '/images/gallery/process-contact-us.png',
    title: 'Contact Us',
    description: 'Get a free quote for your turf cleaning needs',
  },
  {
    image: '/images/gallery/process-schedule-estimate.png',
    title: 'Schedule Your Estimate',
    description: 'We visit your property and assess your turf',
  },
  {
    image: '/images/gallery/process-get-job-done.png',
    title: 'Get The Job Done',
    description: 'Sit back and enjoy your fresh, clean turf',
  },
];

const galleryImages = [
  { src: '/images/gallery/gallery-01.png', alt: "Murphy's Turf cleaning project — before and after" },
  { src: '/images/gallery/gallery-02.png', alt: "Murphy's Turf cleaning project — turf disinfecting" },
  { src: '/images/gallery/gallery-12.jpeg', alt: "Murphy's Turf — backyard turf with curved patio edge" },
  { src: '/images/gallery/gallery-13.jpeg', alt: "Murphy's Turf — side yard turf with rock border" },
  { src: '/images/gallery/gallery-14.jpeg', alt: "Murphy's Turf — poolside turf with stepping stones" },
  { src: '/images/gallery/gallery-15.jpeg', alt: "Murphy's Turf — backyard putting green by pool" },
  { src: '/images/gallery/gallery-16.jpeg', alt: "Murphy's Turf — front yard turf with dog" },
  { src: '/images/gallery/gallery-05.png', alt: "Murphy's Turf cleaning project — turf restoration" },
];

/* ===================== FAQ ACCORDION ITEM ===================== */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-heading font-semibold text-charcoal hover:text-forest transition-colors"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg">{question}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-sage transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="accordion-content"
        style={{ maxHeight: open ? '500px' : '0px', opacity: open ? 1 : 0 }}
      >
        <p className="px-6 pb-5 text-charcoal-light font-body leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* =================== LOCATION SELECTOR =================== */

function LocationSelector({ dark }: { dark?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {locationButtons.map((loc) => (
        <Link
          key={loc.slug}
          href={`/locations/${loc.slug}`}
          className={`group flex items-center gap-3 px-5 py-4 rounded-xl font-heading font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
            dark
              ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              : 'bg-white border border-gray-200 text-charcoal hover:border-sage/40 hover:shadow-lg'
          }`}
        >
          <MapPin className={`w-5 h-5 flex-shrink-0 ${dark ? 'text-sage-light' : 'text-sage'}`} />
          <span className="text-sm sm:text-base">{loc.name}</span>
          <ArrowRight className={`w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 ${dark ? 'text-sage-light' : 'text-sage'}`} />
        </Link>
      ))}
    </div>
  );
}

/* ==================== MAIN PAGE ==================== */

export default function Home() {
  return (
    <>
      {/* ────────────────── 1. HERO SECTION ────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/gallery/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-forest-dark/95 via-forest/85 to-forest-dark/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: headline */}
            <div>
              <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
                Professional Artificial Turf Cleaning
              </span>
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
                Your Turf,{' '}
                <span className="text-sage-light">Like New.</span>
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-xl">
                Pet-safe. Professional-grade cleaning. Looks brand new.
              </p>
            </div>

            {/* Right: location selector CTA */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-5">
                Select Your Area to Get a Free Quote
              </h2>
              <LocationSelector dark />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 2. SERVICES SECTION ────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              What We Offer
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-[5/4] relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg text-charcoal group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-charcoal-light leading-relaxed text-sm flex-1">
                    {service.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 3. ABOUT US SECTION ────────────────── */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/gallery/about-turf-cleaning.png"
                alt="Murphy's Turf professional cleaning team"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
                About Us
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
                Reliable Turf Cleaning &amp; Maintenance
              </h2>
              <p className="mt-5 font-body text-charcoal-light text-lg leading-relaxed">
                30+ years in cleaning &amp; disinfecting, now applied to your lawn. Our trained technicians deliver consistent, satisfaction-guaranteed turf care across California.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: PawPrint, label: 'Pet Friendly' },
                  { icon: Leaf, label: 'Eco Friendly' },
                  { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sage/15 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-forest" />
                      </div>
                      <span className="font-heading font-semibold text-charcoal">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 4. THREE-STEP PROCESS ────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              How It Works
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Simple 3 Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-5">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage text-white rounded-full flex items-center justify-center font-heading font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-charcoal">{step.title}</h3>
                <p className="mt-2 font-body text-charcoal-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── 5. PHOTO GALLERY ────────────────── */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Real Results
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Work
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[5/4] rounded-xl overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 6. TESTIMONIALS ────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Customer Reviews
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-cream/60 rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="font-body text-charcoal-light leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center">
                    <span className="font-heading font-bold text-forest text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-charcoal text-sm">
                      {t.name}
                    </p>
                    <p className="font-body text-charcoal-light text-xs">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 7. FAQ ACCORDION ────────────────── */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Got Questions?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Can&apos;t find your answer?{' '}
              <Link
                href="/locations"
                className="text-sage hover:text-sage-dark font-semibold underline underline-offset-2"
              >
                Contact us directly
              </Link>.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 8. LOCATIONS SECTION ────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Where We Work
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Serving California Communities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-cream/60 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-14 h-14 bg-forest/10 group-hover:bg-sage/20 rounded-full flex items-center justify-center mx-auto transition-colors duration-300">
                  <MapPin className="w-7 h-7 text-forest group-hover:text-sage transition-colors duration-300" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-lg text-charcoal group-hover:text-forest transition-colors">
                  {loc.name}
                </h3>
                {loc.isHQ && (
                  <span className="inline-block mt-1 bg-sage/15 text-sage font-body font-semibold text-xs px-3 py-0.5 rounded-full uppercase tracking-wide">
                    HQ
                  </span>
                )}
                <p className="mt-2 font-body text-charcoal-light text-sm leading-relaxed">
                  {loc.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                  View Area
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 9. BOTTOM CTA SECTION ────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark via-forest to-forest-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready for Fresh, Clean Turf?
          </h2>
          <p className="mt-4 font-body text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Select your area below for a free, no-obligation quote.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <LocationSelector dark />
          </div>
        </div>
      </section>
    </>
  );
}
