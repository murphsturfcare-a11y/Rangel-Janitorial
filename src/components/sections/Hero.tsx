import Link from 'next/link';

const stats = [
  { value: '8+', label: 'Years Experience' },
  { value: '2,500+', label: 'Happy Customers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '10,000+', label: 'Projects Completed' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-forest to-sage">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Transform Your Lawn Into a Masterpiece
        </h1>

        <p className="text-lg md:text-xl text-white/90 mt-4 font-body">
          Professional turf cleaning &amp; lawn care services across the Colorado
          Front Range.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-sage text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sage-light transition mt-8"
        >
          Get Your Free Quote
        </Link>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 ${
                index < stats.length - 1
                  ? 'lg:border-r lg:border-white/30'
                  : ''
              }`}
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-white/80 mt-1 font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
