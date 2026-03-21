import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ClipboardList,
  MessageCircle,
  CalendarCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import LocationPicker from '@/components/ui/LocationPicker';

const phoneList = [
  { name: 'Huntington Beach / LA Area', phone: '951-331-3300', tel: '9513313300' },
  { name: 'Murrieta / Inland Empire', phone: '951-331-3300', tel: '9513313300' },
  { name: 'Martinez / Bay Area', phone: '925-338-0048', tel: '9253380048' },
  { name: 'Greater Sacramento', phone: '916-432-5033', tel: '9164325033' },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/images/grass-pattern.svg')] opacity-5" />
        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading tracking-tight mb-4">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed">
            Ready for cleaner, fresher artificial turf? Reach out for a{' '}
            <span className="font-semibold text-cream">free quote</span> and let our experts
            take care of the rest.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Contact Form + Info Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <AnimateOnScroll direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT: Location Picker */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-forest font-heading mb-2">
                  Get a Free Quote
                </h2>
                <p className="text-charcoal-light font-body mb-8">
                  Select your area below to request a free quote from your local Murphy&apos;s Turf team. You&apos;ll be taken to your location&apos;s page where you can fill out our quote form or call directly.
                </p>
                <LocationPicker />
              </div>
            </div>

            {/* RIGHT: Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phone — pick your location */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-sage" />
                  </div>
                  <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide">
                    Call Your Local Office
                  </h3>
                </div>
                <div className="space-y-2">
                  {phoneList.map((loc) => (
                    <a
                      key={loc.tel}
                      href={`tel:${loc.tel}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-cream transition-colors group"
                    >
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-charcoal font-body">
                          {loc.name}
                        </span>
                        <span className="block text-sm font-bold text-forest group-hover:text-sage-dark transition-colors">
                          {loc.phone}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sage shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Email Card */}
              <a
                href="mailto:info@murphysturfcare.com"
                className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sage/25 transition-colors">
                    <Mail className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-1">
                      Email
                    </h3>
                    <p className="text-lg font-bold text-forest font-heading group-hover:text-sage-dark transition-colors">
                      info@murphysturfcare.com
                    </p>
                    <p className="text-sm text-charcoal-light font-body mt-0.5">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>
              </a>

              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-1">
                      Address
                    </h3>
                    <p className="text-lg font-bold text-forest font-heading">
                      26323 Jefferson Avenue
                    </p>
                    <p className="text-charcoal-light font-body">Murrieta, CA 92562</p>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-sage" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-body text-sm">Monday - Friday</span>
                        <span className="text-forest font-semibold font-body text-sm">
                          7:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-body text-sm">Saturday</span>
                        <span className="text-forest font-semibold font-body text-sm">
                          8:00 AM - 4:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-body text-sm">Sunday</span>
                        <span className="text-charcoal-light font-semibold font-body text-sm">
                          Closed
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal font-body text-sm flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-sage" />
                            Emergency Line
                          </span>
                          <span className="text-sage font-bold font-body text-sm">
                            Available 24/7
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Map Placeholder */}
      <section className="bg-cream-dark">
        <AnimateOnScroll direction="fade" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-forest font-heading text-center mb-8">
            Find Us
          </h2>
          <div className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-sage/10 via-forest/5 to-sage/10 rounded-2xl border-2 border-dashed border-sage/30 flex flex-col items-center justify-center overflow-hidden shadow-inner">
            <MapPin className="w-12 h-12 text-sage/50 mb-4" />
            <p className="text-lg font-semibold text-forest/70 font-heading">
              26323 Jefferson Avenue, Murrieta, CA 92562
            </p>
            <p className="text-sm text-charcoal-light/60 font-body mt-1">
              Interactive map coming soon
            </p>
            {/* Decorative grid lines to mimic map texture */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(45,80,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,80,22,1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest font-heading mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              From first contact to pristine turf, here&apos;s how we make it simple.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <StaggerItem>
              <div className="relative text-center group">
                <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/25 transition-colors">
                  <ClipboardList className="w-8 h-8 text-sage" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold font-heading shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold text-charcoal font-heading mb-3">
                  Submit Your Request
                </h3>
                <p className="text-charcoal-light font-body leading-relaxed">
                  Fill out our quick contact form or give us a call. Tell us about your turf and
                  what services you&apos;re interested in.
                </p>
              </div>
            </StaggerItem>

            {/* Step 2 */}
            <StaggerItem>
              <div className="relative text-center group">
                <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/25 transition-colors">
                  <MessageCircle className="w-8 h-8 text-sage" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold font-heading shadow-md">
                  2
                </div>
                <h3 className="text-xl font-bold text-charcoal font-heading mb-3">
                  We&apos;ll Contact You Within 24 Hours
                </h3>
                <p className="text-charcoal-light font-body leading-relaxed">
                  A turf cleaning specialist will reach out to discuss your needs, answer any questions,
                  and schedule a convenient time to visit.
                </p>
              </div>
            </StaggerItem>

            {/* Step 3 */}
            <StaggerItem>
              <div className="relative text-center group">
                <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/25 transition-colors">
                  <CalendarCheck className="w-8 h-8 text-sage" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold font-heading shadow-md">
                  3
                </div>
                <h3 className="text-xl font-bold text-charcoal font-heading mb-3">
                  Get Your Free On-Site Estimate
                </h3>
                <p className="text-charcoal-light font-body leading-relaxed">
                  We&apos;ll visit your property, assess your turf&apos;s condition, and provide a
                  detailed, no-obligation quote tailored to your needs.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
