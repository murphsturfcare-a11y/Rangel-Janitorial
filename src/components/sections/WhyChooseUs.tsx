import { Shield, Award, FileText, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description:
      'Fully licensed and insured for your peace of mind. We carry comprehensive liability coverage.',
  },
  {
    icon: Award,
    title: 'Satisfaction Guaranteed',
    description:
      "Not happy with our work? We'll come back and make it right, guaranteed.",
  },
  {
    icon: FileText,
    title: 'Free Estimates',
    description:
      'Get a detailed, no-obligation estimate for your property. No hidden fees, no surprises.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description:
      'We use environmentally responsible products that are safe for your family and pets.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-charcoal">
          Why Choose Murphy&apos;s Turf
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="bg-forest/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Icon size={28} className="text-forest" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-charcoal mt-4">
                  {benefit.title}
                </h3>
                <p className="text-charcoal-light mt-2 font-body text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
