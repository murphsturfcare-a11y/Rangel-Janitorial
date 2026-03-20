'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Star,
  ThumbsUp,
  Leaf,
  Scissors,
  Wind,
  Sprout,
  Droplets,
  Bug,
  Calendar,
  Users,
  DollarSign,
  Award,
  ChevronDown,
  Phone,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

/* --------------------------- DATA --------------------------- */

const stats = [
  { label: 'Years Experience', value: '8+' },
  { label: 'Happy Customers', value: '2,500+' },
  { label: 'Satisfaction Rate', value: '98%' },
  { label: 'Projects Completed', value: '10,000+' },
];

const trustBadges = [
  { icon: Shield, label: 'Licensed & Insured' },
  { icon: Star, label: '5-Star Rated' },
  { icon: ThumbsUp, label: 'Satisfaction Guaranteed' },
  { icon: Leaf, label: 'Eco-Friendly' },
];

const services = [
  {
    icon: Scissors,
    name: 'Lawn Cleaning',
    slug: 'lawn-cleaning',
    description:
      'Professional turf cleaning, debris removal, and lawn dethatching to restore your yard to its natural beauty.',
  },
  {
    icon: Wind,
    name: 'Aeration',
    slug: 'aeration',
    description:
      'Core aeration that breaks up compacted soil, promoting healthier root growth and better nutrient absorption.',
  },
  {
    icon: Sprout,
    name: 'Seeding',
    slug: 'seeding',
    description:
      'Expert overseeding and new lawn establishment using premium seed blends suited to California\'s climate.',
  },
  {
    icon: Droplets,
    name: 'Fertilization',
    slug: 'fertilization',
    description:
      'Custom fertilization programs designed to deliver lush, vibrant lawns throughout every season.',
  },
  {
    icon: Bug,
    name: 'Pest Control',
    slug: 'pest-control',
    description:
      'Eco-friendly pest and weed management that keeps your lawn healthy without harming the environment.',
  },
  {
    icon: Calendar,
    name: 'Seasonal Maintenance',
    slug: 'seasonal-maintenance',
    description:
      'Comprehensive year-round lawn care programs tailored to California\'s unique seasonal demands.',
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Experienced Team',
    description:
      'Our crew brings over 8 years of hands-on expertise caring for California lawns. We know California turf inside and out.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description:
      'We use environmentally responsible products that are safe for your family, pets, and the local ecosystem.',
  },
  {
    icon: Award,
    title: 'Satisfaction Guarantee',
    description:
      'Not happy with the results? We\'ll come back and make it right at no extra cost. Your satisfaction is our top priority.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'Premium lawn care doesn\'t have to break the bank. We offer transparent pricing with no hidden fees or surprise charges.',
  },
];

const galleryPairs = [
  { id: 1, label: 'Residential Front Yard' },
  { id: 2, label: 'Backyard Renovation' },
  { id: 3, label: 'Commercial Property' },
  { id: 4, label: 'Seasonal Recovery' },
];

const testimonials = [
  {
    quote:
      "Murphy's Turf Care transformed our backyard from a patchy mess into a lush green paradise. The team was professional, punctual, and the results speak for themselves. Best lawn service in Murrieta!",
    name: 'Sarah M.',
    location: 'Murrieta, CA',
  },
  {
    quote:
      "After trying three other companies, we finally found Murphy's Turf Care. Their aeration and overseeding program brought our lawn back to life in just one season. Highly recommend to anyone in California.",
    name: 'James & Linda R.',
    location: 'Los Angeles, CA',
  },
  {
    quote:
      "As a property manager, I need reliable service. Murphy's Turf Care has maintained all six of our properties for two years now. Consistent quality, fair pricing, and they always go the extra mile.",
    name: 'Michael T.',
    location: 'Sacramento, CA',
  },
];

const locations = [
  {
    name: 'Los Angeles',
    slug: 'los-angeles',
    tagline: 'Expert lawn care for the heart of Southern California.',
  },
  {
    name: 'Murrieta',
    slug: 'murrieta',
    tagline: 'Headquarters and home base for premium turf care.',
  },
  {
    name: 'Martinez',
    slug: 'martinez',
    tagline: 'Trusted turf care for Martinez families and businesses.',
  },
  {
    name: 'Sacramento',
    slug: 'sacramento',
    tagline: 'Professional lawn services across Sacramento neighborhoods.',
  },
];

const faqs = [
  {
    question: 'How much does lawn care cost?',
    answer:
      'Our lawn care services typically range from $50 to $250 per visit depending on your lawn size, condition, and the services required. We offer free on-site estimates so you know exactly what to expect with no hidden fees. Many customers save money by choosing one of our bundled seasonal maintenance packages.',
  },
  {
    question: 'How often should I aerate my lawn?',
    answer:
      'For most California lawns, we recommend aerating once or twice a year. The best times are in early spring (March-April) and fall (September-October) when grasses are actively growing. Lawns with heavy clay soil or high foot traffic may benefit from bi-annual aeration.',
  },
  {
    question: "What's included in seasonal maintenance?",
    answer:
      'Our seasonal maintenance program covers everything your lawn needs year-round: spring cleanup and pre-emergent treatment, summer mowing and fertilization, fall aeration and overseeding, and winter prep including final fertilization and debris removal. Each program is customized to your lawn\'s specific needs.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Absolutely! We provide free, no-obligation estimates for all of our services. Simply fill out the quote form on this page or give us a call at (951) 331-3300. One of our lawn care specialists will assess your property and provide a detailed estimate within 24 hours.',
  },
  {
    question: 'Are your products pet-safe?',
    answer:
      'Yes. We prioritize using pet-friendly and eco-conscious products across all our services. After application, we recommend keeping pets off treated areas for 24 hours as a precaution. We\'re happy to discuss our product choices and provide safety data sheets upon request.',
  },
  {
    question: 'How do I prepare for your visit?',
    answer:
      'Preparing is simple: clear any toys, furniture, or debris from the lawn area, make sure gates are unlocked for backyard access, and mark any sprinkler heads or shallow irrigation lines. If you have pets, please keep them indoors during the service. We\'ll handle everything else.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We proudly serve communities across California including Los Angeles, Murrieta, Martinez, Sacramento, and surrounding areas. If you\'re unsure whether we service your area, just give us a call and we\'ll let you know.',
  },
  {
    question: 'Do you offer organic lawn care?',
    answer:
      'Yes, we offer fully organic lawn care programs for customers who prefer an all-natural approach. Our organic options include compost-based fertilizers, natural pest deterrents, and biological soil amendments. These programs are especially popular across all of our California service areas.',
  },
];

/* --------------------- FAQ ACCORDION ITEM --------------------- */

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

/* --------------------- QUOTE FORM --------------------- */

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

        {/* Preferred Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold font-body text-charcoal mb-1.5">
            Preferred Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
          />
        </div>

        {/* Address */}
        <div>
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
            placeholder="Tell us about your lawn, any specific concerns, or questions you have..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition resize-y"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        Submit Free Quote Request
      </button>
    </form>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function Home() {
  return (
    <>
      {/* ----------------- 1. HERO ----------------- */}
      <section className="relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-forest-light/85" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              California&apos;s Trusted Lawn Care Professionals
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight tracking-tight">
              Transform Your Lawn Into a{' '}
              <span className="text-sage-light">Masterpiece</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-2xl">
              From turf cleaning to complete lawn renovation, Murphy&apos;s Turf Care delivers
              expert care that keeps your California property looking its
              absolute best — season after season.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-sage hover:bg-sage-dark text-white font-heading font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19513313300"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-heading font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                (951) 331-3300
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-5 text-center"
              >
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                  {stat.value}
                </div>
                <div className="mt-1 font-body text-sm sm:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 2. TRUST BADGES ----------------- */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center justify-center gap-3 py-3"
                >
                  <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-sage" />
                  </div>
                  <span className="font-heading font-semibold text-sm sm:text-base text-charcoal">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 3. SERVICES OVERVIEW ----------------- */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              What We Offer
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Our Professional Services
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Comprehensive lawn care solutions tailored to California&apos;s unique
              climate. Every service backed by our satisfaction guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-forest/10 group-hover:bg-sage/20 rounded-xl flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-7 h-7 text-forest group-hover:text-sage transition-colors duration-300" />
                  </div>
                  <h3 className="mt-5 font-heading font-bold text-xl text-charcoal group-hover:text-forest transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 font-body text-charcoal-light leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 4. WHY CHOOSE US ----------------- */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              The Murphy&apos;s Difference
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              Why Choose Murphy&apos;s Turf Care
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              We combine years of local expertise with a genuine commitment to quality
              that sets us apart from the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="flex gap-5 bg-cream/60 rounded-2xl p-7 border border-gray-100 hover:border-sage/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-sage/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-charcoal">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 font-body text-charcoal-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 5. BEFORE / AFTER GALLERY ----------------- */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block font-body font-semibold text-sage text-sm uppercase tracking-widest mb-3">
              Real Results
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
              See the Difference
            </h2>
            <p className="mt-4 font-body text-charcoal-light text-lg leading-relaxed">
              Transformations from real Murphy&apos;s Turf Care projects across
              California. These results speak for themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryPairs.map((pair) => (
              <div key={pair.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="flex">
                  {/* Before */}
                  <div className="relative w-1/2">
                    <div className="aspect-[4/3] bg-gradient-to-br from-brown/70 via-brown-light/50 to-amber-800/40 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_60%_40%,rgba(121,85,72,0.5)_0%,transparent_70%)]" />
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_40%,rgba(93,64,55,0.3)_60%,transparent_80%)]" />
                    </div>
                    <span className="absolute top-3 left-3 bg-brown/80 backdrop-blur-sm text-white text-xs font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Before
                    </span>
                  </div>
                  {/* After */}
                  <div className="relative w-1/2">
                    <div className="aspect-[4/3] bg-gradient-to-br from-forest/60 via-sage/50 to-sage-light/40 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_40%_60%,rgba(124,179,66,0.5)_0%,transparent_70%)]" />
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_40%,rgba(45,80,22,0.2)_60%,transparent_80%)]" />
                    </div>
                    <span className="absolute top-3 right-3 bg-sage/80 backdrop-blur-sm text-white text-xs font-heading font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      After
                    </span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="font-heading font-semibold text-charcoal text-sm">
                    {pair.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 6. TESTIMONIALS ----------------- */}
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
              Don&apos;t just take our word for it. Here&apos;s what homeowners and property
              managers across California have to say about working with us.
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

      {/* ----------------- 7. CTA BANNER ----------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest to-forest-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_75%_50%,white_1px,transparent_1px)] bg-[length:32px_32px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Ready to Transform Your Lawn?
          </h2>
          <p className="mt-4 font-body text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Join over 2,500 happy customers across California. Get a
            personalized quote today and see why Murphy&apos;s Turf Care is the name
            California trusts.
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
              Call (951) 331-3300
            </a>
          </div>
        </div>
      </section>

      {/* ----------------- 8. SERVICE AREAS ----------------- */}
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
              From Los Angeles to Sacramento, our team is ready to deliver outstanding
              lawn care right to your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-forest/10 group-hover:bg-sage/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-forest group-hover:text-sage transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-charcoal group-hover:text-forest transition-colors">
                      {loc.name}
                    </h3>
                    <p className="mt-1 font-body text-charcoal-light text-sm leading-relaxed">
                      {loc.tagline}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 font-body font-semibold text-sage group-hover:text-sage-dark transition-colors text-sm">
                      View Services
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 9. FAQ ACCORDION ----------------- */}
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
              Everything you need to know about our services. Can&apos;t find your
              answer?{' '}
              <Link href="/contact" className="text-sage hover:text-sage-dark font-semibold underline underline-offset-2">
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

      {/* ----------------- 10. QUOTE FORM ----------------- */}
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
              Fill out the form below and one of our lawn care specialists will get
              back to you within 24 hours with a personalized quote.
            </p>
            <div className="flex items-center justify-center gap-6 mt-5 text-sm font-body text-charcoal-light">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                No Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sage" />
                Response in 24hrs
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-sage" />
                No Hidden Fees
              </span>
            </div>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  );
}
