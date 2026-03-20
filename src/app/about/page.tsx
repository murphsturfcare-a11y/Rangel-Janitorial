import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  ShieldCheck,
  Clock,
  Leaf,
  Award,
  Heart,
  Sparkles,
  PawPrint,
  Droplets,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Meet the Murphy's Turf team — the crew (and their four-legged supervisors) behind California's favorite artificial turf cleaning service. 30+ years of cleaning & disinfecting experience.",
  openGraph: {
    title: "About Us | Murphy's Turf",
    description:
      "Meet the Murphy's Turf team — California's trusted artificial turf cleaning crew with 30+ years of experience in cleaning & disinfecting.",
  },
};

const teamMembers = [
  {
    name: 'Big Murph',
    title: 'Founder',
    image: '/images/team/big-murph.png',
    bio: "Hello! My friends call me Big Murph, I'm the big dog of the crew. I am very happy to start this new venture, I feel with the staff that I have brought on we have a leg up on the competition.",
    accent: 'bg-forest',
    ring: 'ring-forest',
  },
  {
    name: 'Roman',
    title: 'On-Site Supervisor',
    image: '/images/team/roman.png',
    bio: "I have known Murphy for several years now and I'm very excited to join his team. I may be known as a very demanding leader and ruff at times this is the quality that Murphy was looking for in a supervisor.",
    accent: 'bg-sage',
    ring: 'ring-sage',
  },
  {
    name: 'Lady',
    title: 'Quality Control Supervisor',
    image: '/images/team/lady.png',
    bio: 'Being the smallest of all crew members, Murph picked me for my independent and lively devoted personality that will give me the ability to blend in with all of our stubborn customers.',
    accent: 'bg-brown',
    ring: 'ring-brown',
  },
  {
    name: 'Biggie Smalls',
    title: 'Pawresident',
    image: '/images/team/biggie-smalls.png',
    bio: 'Let me introduce myself, my name is Biggie Smalls, I am new to this crew. I may be a little shih-tzu, but I can guarantee you I will run a tight crew.',
    accent: 'bg-forest-light',
    ring: 'ring-forest-light',
  },
  {
    name: 'Dewey',
    title: 'Little Shift Supervisor',
    image: '/images/team/dewey.png',
    bio: 'I have been on many job sites with Murphy over the years and very impressed on the way he handles himself this is one of the reasons that I jumped on this opportunity to bark out orders as a little shift supervisor for his new company.',
    accent: 'bg-sage-dark',
    ring: 'ring-sage-dark',
  },
  {
    name: 'Momo',
    title: 'HR Department',
    image: '/images/team/momo.png',
    bio: 'Hi! Hired by Big Murph I believe he chose the purfect cat for the job. I oversee all our staff members and provide them any help they may need alongside making sure that no one in our team goes on with a ruff day.',
    accent: 'bg-brown-light',
    ring: 'ring-brown-light',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Pet-Safe Products',
    description:
      'Every product we use is safe for your furry family members. Your pets can enjoy the turf right after we clean it.',
  },
  {
    icon: Award,
    title: '30+ Years Experience',
    description:
      'Over three decades in the cleaning & disinfecting business means we know how to get the job done right.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description:
      'Our cleaning methods and products are environmentally responsible — good for your turf and good for the planet.',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guaranteed',
    description:
      'We stand behind every job. If you are not completely satisfied, we will make it right.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage rounded-full blur-3xl" />
        </div>
        {/* Decorative paw prints */}
        <div className="absolute top-8 right-12 opacity-10 text-white">
          <PawPrint className="w-16 h-16 rotate-[-15deg]" />
        </div>
        <div className="absolute bottom-12 left-16 opacity-10 text-white">
          <PawPrint className="w-12 h-12 rotate-[20deg]" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-5 text-white">
          <PawPrint className="w-24 h-24 rotate-[45deg]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
            <PawPrint className="w-5 h-5 text-sage-light" />
            <span className="text-white/90 font-body text-sm font-medium">
              California&apos;s Favorite Turf Cleaning Crew
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 tracking-tight">
            Meet the Murphy&apos;s Turf Team
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-3xl mx-auto leading-relaxed">
            Get to know the crew behind California&apos;s favorite turf cleaning service
            — a hardworking pack with 30+ years of cleaning experience and plenty of personality.
          </p>
        </div>
      </section>

      {/* Welcome / Company Story Section */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-sage rounded-full" />
              <span className="text-sage-dark font-semibold font-body text-sm uppercase tracking-wider">
                Our Story
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-10">
              Welcome to Murphy&apos;s
            </h2>
            <p className="text-charcoal-light font-body text-lg leading-relaxed">
              With over 30 years in the cleaning &amp; disinfecting business, we&apos;ve decided to
              take our experience and bring it to your lawn with turf maintenance and pet waste
              removal services. Murphy&apos;s technicians are carefully selected and trained to
              provide you the satisfaction of clean and maintained artificial grass with the best of
              our ability. With this process we ensure consistency as well as invest in our
              technicians so each and every team member is proud of the service they provide our
              clients.
            </p>
          </div>
        </div>
      </section>

      {/* Team Group Photo Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/team/team-group.jpg"
              alt="The Murphy's Turf Team"
              width={1200}
              height={600}
              className="rounded-2xl w-full h-auto object-cover"
            />
          </div>
          <p className="text-center text-charcoal-light font-body text-sm mt-4 italic">
            The Murphy&apos;s Turf crew — keeping California&apos;s turf clean, one yard at a time
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <PawPrint className="w-5 h-5 text-sage-dark" />
              <span className="text-sage-dark font-semibold font-body text-sm uppercase tracking-wider">
                The Pack
              </span>
              <PawPrint className="w-5 h-5 text-sage-dark" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal">
              Our Team Members
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                  index % 2 === 0 ? 'hover:-translate-y-1' : 'hover:translate-y-[-0.25rem]'
                }`}
              >
                {/* Top accent bar */}
                <div className={`h-2 ${member.accent}`} />

                {/* Decorative paw prints on card */}
                <div className="absolute top-6 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                  <PawPrint className="w-20 h-20 rotate-[-20deg] text-charcoal" />
                </div>

                <div className="p-8 pt-6 relative">
                  {/* Team member photo */}
                  <div
                    className={`w-32 h-32 mx-auto rounded-full ring-4 ${member.ring} ring-offset-4 ring-offset-white overflow-hidden mb-6`}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-5">
                    <h3 className="text-2xl font-bold font-heading text-charcoal">
                      {member.name}
                    </h3>
                    <span
                      className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold font-body uppercase tracking-wider text-white ${member.accent}`}
                    >
                      {member.title}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-charcoal-light font-body text-sm leading-relaxed italic text-center">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                </div>

                {/* Bottom paw trail decoration */}
                <div className="flex justify-center gap-1.5 pb-5 opacity-30">
                  <PawPrint className="w-3 h-3 text-charcoal" />
                  <PawPrint className="w-3 h-3 text-charcoal translate-y-0.5" />
                  <PawPrint className="w-3 h-3 text-charcoal" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-sage rounded-full" />
              <span className="text-sage-dark font-semibold font-body text-sm uppercase tracking-wider">
                What We Stand For
              </span>
              <div className="w-12 h-1 bg-sage rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-cream rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-2xl mb-6 group-hover:bg-sage/20 transition-colors">
                  <value.icon className="w-8 h-8 text-forest" />
                </div>
                <h3 className="text-xl font-bold font-heading text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal-light font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OxyTurf Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-forest-dark via-forest to-forest-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-8 opacity-10">
              <Droplets className="w-24 h-24 text-white" />
            </div>
            <div className="absolute -bottom-4 -right-8 opacity-10">
              <Sparkles className="w-20 h-20 text-white" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
                <Droplets className="w-5 h-5 text-sage-light" />
                <span className="text-white/90 font-body text-sm font-medium">
                  Our Cleaning Product
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-6">
                Powered by OxyTurf
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-body leading-relaxed mb-8">
                We trust OxyTurf to keep your artificial turf spotless and safe. This hydrogen
                peroxide-based cleaning solution eliminates bacteria, odors, and stains without harsh
                chemicals.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-sage-light font-heading font-bold text-lg mb-1">
                    No Bleach
                  </div>
                  <p className="text-white/70 font-body text-sm">
                    Won&apos;t damage or discolor your turf fibers
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-sage-light font-heading font-bold text-lg mb-1">
                    No Ammonia
                  </div>
                  <p className="text-white/70 font-body text-sm">
                    No harsh fumes or chemical residue left behind
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                  <div className="text-sage-light font-heading font-bold text-lg mb-1">
                    Pet &amp; Kid Safe
                  </div>
                  <p className="text-white/70 font-body text-sm">
                    Hydrogen peroxide-based — safe for the whole family
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="w-10 h-10 text-sage mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-charcoal mb-6">
            Ready to See What Murphy&apos;s Team Can Do for Your Turf?
          </h2>
          <p className="text-charcoal-light font-body text-lg max-w-2xl mx-auto mb-10">
            Get a free quote today and let our crew show you why California homeowners trust
            Murphy&apos;s Turf for their artificial turf cleaning needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors font-body shadow-md hover:shadow-lg text-lg"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:+19513313300"
              className="inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-white font-semibold px-8 py-4 rounded-lg transition-colors font-body shadow-md hover:shadow-lg text-lg"
            >
              <Phone className="w-5 h-5" />
              (951) 331-3300
            </a>
          </div>
          <p className="mt-6 text-charcoal-light font-body text-sm flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            Serving all of California
          </p>
        </div>
      </section>
    </>
  );
}
