import StarRating from '@/components/ui/StarRating';
import TestimonialCard from '@/components/cards/TestimonialCard';

interface Testimonial {
  rating: number;
  quote: string;
  name: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    quote:
      "Murphy's Turf completely transformed our backyard. The team was professional, punctual, and the results exceeded our expectations.",
    name: 'Sarah Johnson',
    location: 'Denver, CO',
  },
  {
    rating: 5,
    quote:
      "Best lawn care service in the Front Range. They've been maintaining our property for 3 years and it's never looked better.",
    name: 'Mike Rodriguez',
    location: 'Aurora, CO',
  },
  {
    rating: 5,
    quote:
      "Incredible attention to detail. Our neighbors keep asking who does our lawn. Highly recommend Murphy's Turf!",
    name: 'Jennifer Walsh',
    location: 'Lakewood, CO',
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center font-heading text-3xl md:text-4xl font-bold text-charcoal">
          What Our Customers Say
        </h2>

        <div className="flex items-center justify-center gap-2 mt-4">
          <StarRating rating={4.9} size="lg" />
          <p className="text-charcoal-light font-body text-sm">
            4.9 out of 5 based on 200+ reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              rating={testimonial.rating}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
