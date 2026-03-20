'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ThumbsUp,
  Leaf,
  ChevronDown,
  Phone,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2,
  PawPrint,
  Shield,
  Sparkles,
  Send,
} from 'lucide-react';

/* ========================== DATA ========================== */

const services = [
  {
    name: 'Pet Hair & Debris Removal',
    slug: 'pet-hair-debris',
    image: '/images/services/debris-removal.png',
    description:
      'We remove pet hair, waste, leaves, branches, and run a magnet for metal objects while de-weeding edges and seams to leave your turf spotless.',
    gradient: 'from-forest/60 via-sage/40 to-sage-light/30',
  },
  {
    name: 'Blooming & De-Compacting',
    slug: 'blooming-decompacting',
    image: '/images/services/blooming.png',
    description:
      'We bring matted, flattened turf back to life by fluffing blades upright so your artificial grass looks and feels like natural grass again.',
    gradient: 'from-sage/50 via-forest/40 to-forest-light/30',
  },
  {
    name: 'Disinfect & Deodorize',
    slug: 'disinfect-deodorize',
    image: '/images/services/oxyturf-spray.jpg',
    description:
      'Power-spraying OxyTurf kills 99.9% of germs and bacteria on your turf without hazardous chemicals, leaving your yard fresh and safe.',
    gradient: 'from-forest-dark/50 via-forest/40 to-sage/30',
  },
  {
    name: 'Poop Scooping & Removal',
    slug: 'poop-scooping',
    image: '/images/services/poop-scooping.jpg',
    description:
      'Convenient pet waste removal plans designed to keep your yard fresh, clean, and ready for your family to enjoy every day.',
    gradient: 'from-brown/40 via-sage/30 to-forest/30',
  },
  {
    name: 'Powered By OxyTurf',
    slug: 'oxyturf',
    image: '/images/services/oxyturf-palms.jpg',
    description:
      'Our hydrogen peroxide-based cleaner-deodorizer contains no bleach or ammonia and is completely safe for pets and kids.',
    gradient: 'from-sage-light/50 via-sage/40 to-forest/30',
  },
];

const testimonials = [
  {
    quote:
      "Our dogs destroyed our artificial turf smell-wise. Murphy's came out, did the OxyTurf treatment, and it smells like the day it was installed. The kids can play on it again worry-free.",
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
    question: 'Is OxyTurf safe for my pets and kids?',
    answer:
      'Absolutely. OxyTurf is a hydrogen peroxide-based cleaner that contains no bleach, ammonia, or hazardous chemicals. It is specifically formulated to be safe for pets, children, and the environment while still killing 99.9% of germs and bacteria.',
  },
  {
    question: 'What does your turf cleaning process include?',
    answer:
      'Our comprehensive process includes pet hair and debris removal, de-weeding edges and seams, running a magnet for metal objects, blooming and de-compacting matted fibers, and a full disinfect and deodorize treatment with OxyTurf. Every visit leaves your turf looking and smelling like new.',
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

const trustBadges = [
  { icon: PawPrint, label: 'Pet Friendly' },
  { icon: Leaf, label: 'Eco Friendly' },
  { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
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

/* ======================= QUOTE FORM ======================= */

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-sage" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-charcoal mb-2">
          Thank You!
        </h3>
        <p className="font-body text-charcoal-light max-w-md mx-auto">
          We&apos;ve received your request and will get back to you within 24 hours
          with a personalized quote. In the meantime, feel free to call us at{' '}
          <a href="tel:+19513313300" className="text-forest font-semibold hover:underline">
            (951) 331-3300
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Murphy"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(951) 331-3300"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition appearance-none bg-white"
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            placeholder="123 Main St, Murrieta, CA"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Message / Special Requests
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your turf, any pet concerns, or questions you have..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition resize-y"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        <Send className="w-5 h-5" />
        Submit Free Quote Request
      </button>
    </form>
  );
}

/* ==================== MAIN PAGE ==================== */

export default function Home() {
  return (
    <>
      {/* ────────────────── 1. HERO SECTION ────────────────── */}
      <section className="relative overflow-hidden">
        {/* Hero background image */}
        <Image
          src="/images/hero.jpg"
          alt="Murphy's Turf - Professional Artificial Turf Cleaning"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-sage/80" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              Professional Artificial Turf Cleaning
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight">
              When you care about clean turf call{' '}
              <span className="text-sage-light">Murphy&apos;s Turf</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-2xl">
              Worried about your pets ruining your turf? Count on Murphy&apos;s to help
              bring your artificial grass back to life with a variety of services
              ranging from reblooming to debris &amp; deodorizing. Our chemicals are
              no worry as we use pet-friendly and environmentally safe products to
              refresh your lawn.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Read More
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 hover:bg-white/25 text-white font-heading font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200"
              >
                Contact Us
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-heading font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
            <div className="mt-6">
              <Link
                href="/services/poop-scooping"
                className="inline-flex items-center gap-2 text-sage-light hover:text-white font-body font-medium text-base transition-colors group"
              >
                Just looking for a Poop Removal Service?
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 2. WELCOME SECTION ────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
            About Us
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Welcome to Murphy&apos;s
          </h2>
          <p className="mt-6 font-body text-charcoal-light text-lg leading-relaxed max-w-3xl mx-auto">
            With over 30 years in the cleaning &amp; disinfecting business, we&apos;ve
            decided to take our experience and bring it to your lawn with turf
            maintenance and pet waste removal services. Murphy&apos;s technicians are
            carefully selected and trained to provide you the satisfaction of clean
            and maintained artificial grass with the best of our ability. With this
            process we ensure consistency as well as invest in our technicians so
            each and every team member is proud of the service they provide our
            clients.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-1 rounded-full bg-sage" />
            <Sparkles className="w-5 h-5 text-sage" />
            <div className="w-12 h-1 rounded-full bg-sage" />
          </div>
        </div>
      </section>

      {/* ────────────────── 3. TRUST BADGES ────────────────── */}
      <section className="bg-cream border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <div className="w-16 h-16 bg-sage/15 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-forest" />
                  </div>
                  <span className="font-heading font-bold text-lg text-charcoal">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────── 4. SERVICES SECTION ────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              What We Offer
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Services
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Comprehensive artificial turf care solutions to keep your lawn looking,
              feeling, and smelling like new.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
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
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-xl text-charcoal group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-charcoal-light leading-relaxed text-[15px] flex-1">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── 5. BEFORE / AFTER SECTION ────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Real Results
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              See the Difference
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Real transformations from Murphy&apos;s Turf cleaning projects.
              The results speak for themselves.
            </p>
          </div>

          {/* Before/After comparison */}
          <div className="bg-cream rounded-3xl overflow-hidden shadow-lg border border-gray-100 max-w-5xl mx-auto">
            <Image
              src="/images/before-after.png"
              alt="Before and after artificial turf cleaning"
              width={800}
              height={400}
              className="rounded-t-3xl w-full h-auto"
            />
            <div className="px-6 py-5 text-center bg-white">
              <p className="font-heading font-semibold text-charcoal text-lg">
                Complete Turf Restoration
              </p>
              <p className="mt-1 font-body text-charcoal-light text-sm">
                Pet hair removal, blooming, disinfect &amp; deodorize with OxyTurf
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 6. OXYTURF FEATURE SECTION ────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
                Our Secret Weapon
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
                Powered by OxyTurf
              </h2>
              <p className="mt-6 font-body text-charcoal-light text-lg leading-relaxed">
                OxyTurf is specifically formulated for synthetic turf. Using
                stabilized accelerated hydrogen peroxide, it eliminates 99.9% of
                germs and bacteria lurking in your artificial grass and replaces them
                with a fresh grass smell.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'No bleach or ammonia — ever',
                  'Safe for pets, kids, and the environment',
                  'Eliminates odors at the source',
                  'Kills 99.9% of germs and bacteria',
                  'Leaves a fresh, clean grass scent',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                    <span className="font-body text-charcoal-light">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/services/oxyturf"
                  className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-white font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Learn About OxyTurf
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            {/* OxyTurf product image */}
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="/images/oxyturf-logo.png"
                  alt="OxyTurf - Pet-safe artificial turf cleaner and deodorizer"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sage/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-forest/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────── 7. TESTIMONIALS ────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Customer Reviews
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              What Our Customers Say
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Don&apos;t just take our word for it. Hear from pet owners across
              California who trust Murphy&apos;s Turf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-cream/60 rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Stars */}
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

      {/* ────────────────── 8. SERVICE AREAS ────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Where We Work
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Serving California Communities
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              From the coast to the capital, our team brings professional turf
              cleaning right to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 text-center"
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

      {/* ────────────────── 9. FAQ ACCORDION ────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Got Questions?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Everything you need to know about our artificial turf cleaning services.
              Can&apos;t find your answer?{' '}
              <Link
                href="/contact"
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

      {/* ────────────────── 10. CTA SECTION ────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest to-forest-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready for Fresh, Clean Turf?
          </h2>
          <p className="mt-4 font-body text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Get a free, no-obligation quote and discover why pet owners across
            California trust Murphy&apos;s Turf to keep their artificial grass
            looking and smelling like new.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19513313300"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-heading font-semibold text-lg px-10 py-4 rounded-xl transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Call 951-331-3300
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────── 11. QUOTE FORM SECTION ────────────────── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Free Estimate
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Request Your Free Quote
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed max-w-2xl mx-auto">
              Fill out the form below and one of our turf care specialists will get
              back to you within 24 hours with a personalized quote.
            </p>
            <div className="flex items-center justify-center gap-6 mt-5 text-sm font-body text-charcoal-light flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                No Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sage" />
                Response in 24hrs
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sage" />
                Pet-Safe Products
              </span>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
