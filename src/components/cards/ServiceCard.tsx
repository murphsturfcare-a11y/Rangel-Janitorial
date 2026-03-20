import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  slug: string;
}

export default function ServiceCard({
  icon: Icon,
  name,
  description,
  slug,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <Icon size={40} className="text-forest mb-4" aria-hidden="true" />
      <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">
        {name}
      </h3>
      <p className="font-body text-charcoal-light text-sm leading-relaxed mb-4">
        {description}
      </p>
      <Link
        href={`/services/${slug}`}
        className="text-forest font-semibold text-sm hover:underline inline-flex items-center gap-1"
      >
        Learn More &rarr;
      </Link>
    </div>
  );
}
