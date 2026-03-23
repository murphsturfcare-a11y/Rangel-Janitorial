import type { Metadata } from 'next';
import BlogContent from './BlogContent';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Expert artificial turf cleaning tips, pet care guides, and maintenance insights for California homeowners. Learn from Murphy's Turf professionals how to keep your synthetic turf clean, safe, and looking like new.",
  openGraph: {
    title: "Blog | Murphy's Turf",
    description:
      'Expert artificial turf cleaning tips, pet care guides, and maintenance insights for California homeowners.',
  },
};

/* --------------------------- DATA --------------------------- */

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-clean-artificial-turf',
    title: 'How to Clean Artificial Turf: The Complete Guide',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2026-03-15',
    excerpt:
      'Everything you need to know about cleaning artificial turf, from basic rinsing to deep sanitization. We cover tools, techniques, and the professional methods that keep synthetic grass looking and smelling fresh year-round.',
    gradient: 'from-emerald-600 via-green-500 to-teal-400',
  },
  {
    slug: 'removing-pet-odors-artificial-turf',
    title: 'Removing Pet Odors from Artificial Turf: What Actually Works',
    category: 'Pet Care',
    author: "Murphy's Turf Team",
    date: '2026-03-08',
    excerpt:
      'Pet urine odor on artificial turf is one of the most common complaints from homeowners. Learn which products actually eliminate odors versus just masking them, and why enzyme-based and hydrogen peroxide solutions outperform everything else.',
    gradient: 'from-amber-500 via-orange-400 to-yellow-400',
  },
  {
    slug: 'how-often-clean-artificial-turf',
    title: 'How Often Should You Clean Your Artificial Turf?',
    category: 'Maintenance Tips',
    author: "Murphy's Turf Team",
    date: '2026-02-25',
    excerpt:
      'The answer depends on foot traffic, pets, trees, and your local climate. We break down a practical cleaning schedule for California homeowners, from weekly rinses to quarterly deep cleans.',
    gradient: 'from-sky-500 via-blue-400 to-cyan-400',
  },
  {
    slug: 'diy-vs-professional-turf-cleaning',
    title: 'DIY vs Professional Turf Cleaning: Is It Worth Hiring a Pro?',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2026-02-18',
    excerpt:
      'You can handle basic turf maintenance yourself, but there are times when professional cleaning makes a real difference. We compare costs, results, and effort so you can decide what makes sense for your yard.',
    gradient: 'from-rose-500 via-pink-400 to-fuchsia-400',
  },
  {
    slug: 'artificial-turf-pets-clean-safe',
    title: 'Keeping Artificial Turf Clean and Safe for Pets',
    category: 'Pet Care',
    author: "Murphy's Turf Team",
    date: '2026-02-10',
    excerpt:
      'Artificial turf and pets are a great combination when you keep up with cleaning. Learn how to manage waste, prevent bacterial buildup, and create a safe play area your dogs will love.',
    gradient: 'from-teal-500 via-emerald-400 to-green-400',
  },
  {
    slug: 'hydrogen-peroxide-turf-cleaning',
    title: 'The Science Behind Our Hydrogen Peroxide-Based Cleaning Process',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2026-02-01',
    excerpt:
      'Our hydrogen peroxide-based cleaning solution eliminates bacteria and odors without harsh chemicals. Learn how it works, why we chose it over bleach and ammonia, and what makes it safe for pets and kids.',
    gradient: 'from-lime-500 via-green-400 to-emerald-400',
  },
  {
    slug: 'signs-turf-needs-professional-cleaning',
    title: '5 Signs Your Artificial Turf Needs Professional Cleaning',
    category: 'Maintenance Tips',
    author: "Murphy's Turf Team",
    date: '2026-01-22',
    excerpt:
      'Not sure if your synthetic turf needs professional attention? From lingering odors to matted fibers, these five warning signs mean it is time to call in the experts for a deep clean.',
    gradient: 'from-violet-500 via-purple-400 to-indigo-400',
  },
  {
    slug: 'turf-cleaning-huntington-beach',
    title: 'Artificial Turf Cleaning in Huntington Beach: What Local Homeowners Need to Know',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-01-14',
    excerpt:
      'Huntington Beach homeowners face unique turf cleaning challenges from salt air, sand, and coastal moisture. Here is what you need to know to keep your synthetic turf in top shape by the coast.',
    gradient: 'from-green-500 via-lime-400 to-yellow-400',
  },
  {
    slug: 'turf-cleaning-murrieta-inland-empire',
    title: 'Turf Cleaning in Murrieta & the Inland Empire: Beating the Heat',
    category: 'Local Guides',
    author: "Murphy's Turf Team",
    date: '2026-01-06',
    excerpt:
      'Inland Empire heat accelerates bacterial growth and intensifies odors on artificial turf. Learn the specific cleaning strategies Murrieta homeowners need to keep their synthetic lawns fresh through triple-digit summers.',
    gradient: 'from-forest via-sage to-sage-light',
  },
  {
    slug: 'poop-scooping-service-worth-it',
    title: 'Is a Poop Scooping Service Worth It? What Pet Owners Should Know',
    category: 'Pet Care',
    author: "Murphy's Turf Team",
    date: '2025-12-28',
    excerpt:
      'If you have dogs and artificial turf, pet waste removal is not optional. We break down what professional poop scooping services include, what they cost, and why they matter for turf longevity and hygiene.',
    gradient: 'from-emerald-500 via-teal-400 to-cyan-400',
  },
  {
    slug: 'artificial-turf-bacteria-health-risks',
    title: 'Bacteria on Artificial Turf: Health Risks and How to Eliminate Them',
    category: 'Turf Cleaning',
    author: "Murphy's Turf Team",
    date: '2025-12-18',
    excerpt:
      'Artificial turf can harbor harmful bacteria if not properly maintained. Learn about the health risks of E. coli, Staph, and other pathogens on synthetic grass and the proven methods to eliminate them.',
    gradient: 'from-red-500 via-orange-400 to-amber-400',
  },
  {
    slug: 'seasonal-turf-maintenance-california',
    title: 'Seasonal Artificial Turf Maintenance for California Homeowners',
    category: 'Maintenance Tips',
    author: "Murphy's Turf Team",
    date: '2025-12-08',
    excerpt:
      'California weather varies wildly by region and season. This month-by-month maintenance guide helps you stay ahead of seasonal challenges, from summer heat to winter rains, to keep your artificial turf performing its best.',
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
  },
];

const categories = ['All', 'Turf Cleaning', 'Pet Care', 'Maintenance Tips', 'Local Guides'] as const;

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Turf Cleaning': { bg: 'bg-sage/15', text: 'text-sage-dark' },
  'Pet Care': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Maintenance Tips': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'Local Guides': { bg: 'bg-blue-100', text: 'text-blue-700' },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ----------------------- CATEGORY COUNTS ----------------------- */

const categoryCounts: Record<string, number> = {};
blogPosts.forEach((post) => {
  categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
});

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function BlogPage() {
  return (
    <>
      {/* ----------------- HERO ----------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-sage/80" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            Insights &amp; Expertise
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Murphy&apos;s Turf Blog
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-3xl mx-auto">
            Artificial Turf Cleaning Tips, Pet Care Guides &amp; Maintenance Insights for California Homeowners
          </p>
        </AnimateOnScroll>
      </section>

      {/* ----------------- BLOG CONTENT ----------------- */}
      <BlogContent
        posts={blogPosts}
        categories={categories as unknown as string[]}
        categoryColors={categoryColors}
        categoryCounts={categoryCounts}
      />
    </>
  );
}
