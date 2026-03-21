import Link from 'next/link';

export default function CTABanner() {
  return (
    <section
      className="py-16 lg:py-20 text-center text-white"
      style={{
        background: 'linear-gradient(to right, #2D5016, #7CB342)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold">
          Ready for Clean, Fresh Turf?
        </h2>
        <p className="text-white/90 text-lg mt-4 max-w-2xl mx-auto font-body">
          Get a free quote today and see the difference professional turf
          cleaning makes. Select your area to call your local office or request a quote online.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-forest px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream transition mt-8"
        >
          Get Your Free Quote
        </Link>
      </div>
    </section>
  );
}
