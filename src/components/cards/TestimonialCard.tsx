import StarRating from '@/components/ui/StarRating';

interface TestimonialCardProps {
  rating: number;
  quote: string;
  name: string;
  location: string;
}

export default function TestimonialCard({
  rating,
  quote,
  name,
  location,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <StarRating rating={rating} />
      <blockquote className="font-body text-charcoal italic leading-relaxed mt-4 mb-4">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="font-heading font-bold text-charcoal text-sm">{name}</p>
      <p className="font-body text-gray-500 text-sm">{location}</p>
    </div>
  );
}
