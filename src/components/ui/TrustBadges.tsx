import { Shield, Star, ThumbsUp, Leaf } from 'lucide-react';

interface Badge {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const badges: Badge[] = [
  { label: 'Licensed & Insured', icon: Shield },
  { label: '5-Star Rated', icon: Star },
  { label: '100% Satisfaction', icon: ThumbsUp },
  { label: 'Eco-Friendly', icon: Leaf },
];

export default function TrustBadges() {
  return (
    <section aria-label="Trust badges" className="w-full py-6">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {badges.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <Icon size={22} className="shrink-0 text-forest" />
            <span className="text-sm font-medium text-charcoal whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
