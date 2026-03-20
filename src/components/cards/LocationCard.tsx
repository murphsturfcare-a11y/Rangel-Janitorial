import Link from 'next/link';

interface LocationCardProps {
  city: string;
  description: string;
  slug: string;
}

export default function LocationCard({
  city,
  description,
  slug,
}: LocationCardProps) {
  return (
    <div className="bg-white rounded-lg border-l-4 border-forest p-5 shadow-sm hover:shadow-lg transition-all duration-300">
      <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">
        {city}
      </h3>
      <p className="font-body text-charcoal-light text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={`/locations/${slug}`}
          className="text-forest font-semibold text-sm hover:underline inline-flex items-center gap-1"
        >
          Learn More &rarr;
        </Link>
        <Link
          href={`/locations/${slug}#quote-form`}
          className="inline-flex items-center justify-center gap-1 bg-sage text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-forest transition-colors min-h-[44px]"
        >
          Get a Quote &rarr;
        </Link>
      </div>
    </div>
  );
}
