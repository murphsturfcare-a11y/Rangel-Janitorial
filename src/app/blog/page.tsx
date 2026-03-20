import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Expert lawn care tips, seasonal guides, and local insights for California homeowners. Learn from Murphy's Turf Care professionals how to maintain a beautiful, healthy lawn year-round.",
  openGraph: {
    title: "Blog | Murphy's Turf Care",
    description:
      'Expert lawn care tips, seasonal guides, and local insights for California homeowners.',
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
    slug: 'ultimate-guide-lawn-care-los-angeles',
    title: 'The Ultimate Guide to Lawn Care in Los Angeles',
    category: 'Local Guides',
    author: 'Patrick Murphy',
    date: '2026-02-15',
    excerpt:
      "Discover the best lawn care practices for LA's unique Mediterranean climate. From watering schedules to grass selection, this comprehensive guide covers everything you need for a stunning Los Angeles lawn.",
    gradient: 'from-emerald-600 via-green-500 to-teal-400',
  },
  {
    slug: 'turf-maintenance-murrieta-hot-summers',
    title: "Turf Maintenance Tips for Murrieta's Hot Summers",
    category: 'Local Guides',
    author: 'Patrick Murphy',
    date: '2026-02-08',
    excerpt:
      'Beat the Inland Empire heat with these proven turf maintenance strategies. Keep your Murrieta lawn lush and green even when temperatures soar past 100 degrees.',
    gradient: 'from-amber-500 via-orange-400 to-yellow-400',
  },
  {
    slug: 'bay-area-lawn-care-martinez-homeowners',
    title: 'Bay Area Lawn Care: A Guide for Martinez Homeowners',
    category: 'Local Guides',
    author: 'Sarah Chen',
    date: '2026-01-25',
    excerpt:
      'Navigate the unique micro-climates of the East Bay for a healthier lawn. From coastal fog influence to valley heat, learn what works best for Martinez and surrounding areas.',
    gradient: 'from-sky-500 via-blue-400 to-cyan-400',
  },
  {
    slug: 'sacramento-valley-lawn-care-central-valley-heat',
    title: 'Sacramento Valley Lawn Care: Thriving in Central Valley Heat',
    category: 'Local Guides',
    author: 'Patrick Murphy',
    date: '2026-01-18',
    excerpt:
      'Central Valley temperatures demand smart lawn care strategies. Discover how Sacramento homeowners can maintain a beautiful lawn despite extreme summer heat and limited water.',
    gradient: 'from-rose-500 via-pink-400 to-fuchsia-400',
  },
  {
    slug: 'water-smart-lawn-care-california-drought',
    title: 'Water-Smart Lawn Care During California Drought Conditions',
    category: 'Eco-Friendly',
    author: 'Sarah Chen',
    date: '2026-01-10',
    excerpt:
      'California-friendly irrigation techniques that keep your lawn green while conserving water. Learn about smart controllers, drought-tolerant varieties, and efficient watering.',
    gradient: 'from-teal-500 via-emerald-400 to-green-400',
  },
  {
    slug: 'when-to-aerate-lawn-southern-california',
    title: 'When to Aerate Your Lawn in Southern California',
    category: 'Lawn Care Tips',
    author: 'Patrick Murphy',
    date: '2025-12-20',
    excerpt:
      "Timing is everything when it comes to aeration in SoCal's warm climate. Learn the optimal windows for core aeration to maximize root growth and nutrient absorption.",
    gradient: 'from-lime-500 via-green-400 to-emerald-400',
  },
  {
    slug: 'benefits-professional-turf-cleaning',
    title: '7 Benefits of Professional Turf Cleaning You Didn\'t Know About',
    category: 'Lawn Care Tips',
    author: 'Patrick Murphy',
    date: '2025-12-12',
    excerpt:
      'Professional turf cleaning goes far beyond what DIY methods can achieve. Discover the hidden advantages that can transform your lawn and extend its lifespan.',
    gradient: 'from-violet-500 via-purple-400 to-indigo-400',
  },
  {
    slug: 'spring-lawn-care-checklist-california',
    title: 'Spring Lawn Care Checklist for California Homeowners',
    category: 'Seasonal',
    author: 'Sarah Chen',
    date: '2025-12-05',
    excerpt:
      'Get your California lawn ready for spring with this comprehensive checklist. From dethatching to fertilization schedules, cover every step for a vibrant season.',
    gradient: 'from-green-500 via-lime-400 to-yellow-400',
  },
  {
    slug: 'choosing-right-grass-type-california',
    title: 'Choosing the Right Grass Type for Your California Lawn',
    category: 'Lawn Care Tips',
    author: 'Patrick Murphy',
    date: '2025-11-28',
    excerpt:
      'Bermuda, fescue, or St. Augustine? Find the perfect grass for your region. We break down the pros and cons of every popular California grass variety.',
    gradient: 'from-forest via-sage to-sage-light',
  },
  {
    slug: 'eco-friendly-lawn-care-greener-california',
    title: 'Eco-Friendly Lawn Care for a Greener California',
    category: 'Eco-Friendly',
    author: 'Sarah Chen',
    date: '2025-11-15',
    excerpt:
      'Organic products and sustainable practices for environmentally conscious homeowners. Reduce your carbon footprint while maintaining a gorgeous California lawn.',
    gradient: 'from-emerald-500 via-teal-400 to-cyan-400',
  },
  {
    slug: 'common-lawn-pests-california',
    title: 'Common Lawn Pests in California and How to Beat Them',
    category: 'Lawn Care Tips',
    author: 'Patrick Murphy',
    date: '2025-11-08',
    excerpt:
      'Identify and eliminate grubs, chinch bugs, gophers, and other California lawn pests. Protect your investment with proven integrated pest management techniques.',
    gradient: 'from-red-500 via-orange-400 to-amber-400',
  },
  {
    slug: 'fall-lawn-preparation-california',
    title: 'Fall Lawn Preparation: Getting Your California Lawn Ready for Winter',
    category: 'Seasonal',
    author: 'Sarah Chen',
    date: '2025-10-30',
    excerpt:
      "California winters are mild, but your lawn still needs fall prep. Learn essential tasks like overseeding, final fertilization, and irrigation adjustments.",
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
  },
];

const categories = ['All', 'Lawn Care Tips', 'Local Guides', 'Seasonal', 'Eco-Friendly'] as const;

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Lawn Care Tips': { bg: 'bg-sage/15', text: 'text-sage-dark' },
  'Local Guides': { bg: 'bg-blue-100', text: 'text-blue-700' },
  Seasonal: { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Eco-Friendly': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
            Insights &amp; Expertise
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Murphy&apos;s Turf Care Blog
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-3xl mx-auto">
            Expert Lawn Care Tips, Guides &amp; Local Insights for California Homeowners
          </p>
        </div>
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
