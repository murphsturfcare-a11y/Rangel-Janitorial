import type { Metadata } from 'next';
import BlogContent from './BlogContent';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { JsonLd } from '@/components/seo/JsonLd';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { BLOG_SUMMARIES, BLOG_PAGE_COUNT, BLOG_POSTS_PER_PAGE, getBlogPage, getBlogPagePath } from '@/content/blog-index';

export function blogArchiveMetadata(page: number): Metadata {
  return generatePageMetadata(
    page === 1 ? 'Commercial Cleaning Blog — Tips & Guides' : `Commercial Cleaning Blog — Page ${page}`,
    `Commercial cleaning tips, facility maintenance guides, and regional advice from Rangel Janitorial.${page > 1 ? ` Browse page ${page} of ${BLOG_PAGE_COUNT}.` : ''}`,
    getBlogPagePath(page),
  );
}

const categories = ['All', ...new Set(BLOG_SUMMARIES.map((post) => post.category))];
const categoryCounts = Object.fromEntries(categories.slice(1).map((category) => [
  category, BLOG_SUMMARIES.filter((post) => post.category === category).length,
]));
const categoryColors = {
  'Janitorial Tips': { bg: 'bg-sage/15', text: 'text-sage-dark' },
  'Industry Insights': { bg: 'bg-amber-100', text: 'text-amber-700' },
  'Local Guides': { bg: 'bg-blue-100', text: 'text-blue-700' },
};

export default function BlogArchive({ page }: { page: number }) {
  const url = `https://rangeljanitorial.com${getBlogPagePath(page)}`;
  return (
    <>
      <JsonLd schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: page === 1 ? 'Rangel Janitorial Blog' : `Rangel Janitorial Blog — Page ${page}`,
        publisher: { '@id': 'https://rangeljanitorial.com/#organization' },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: getBlogPage(page).map((post, index) => ({
            '@type': 'ListItem',
            position: (page - 1) * BLOG_POSTS_PER_PAGE + index + 1,
            name: post.title,
            url: `https://rangeljanitorial.com/blog/${post.slug}`,
          })),
        },
      }} />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/95 via-forest/90 to-sage/80" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] bg-[length:40px_40px]" />
        <AnimateOnScroll direction="up" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-block bg-sage/20 border border-sage/40 text-sage-light font-body font-semibold text-sm px-4 py-1.5 rounded-full mb-6">Insights &amp; Expertise</span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight">
            Rangel Janitorial Blog{page > 1 ? ` — Page ${page}` : ''}
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-200 font-body leading-relaxed max-w-3xl mx-auto">Commercial Cleaning Tips, Facility Maintenance Guides &amp; Industry Insights for California Businesses</p>
        </AnimateOnScroll>
      </section>
      <BlogContent posts={BLOG_SUMMARIES} categories={categories} categoryColors={categoryColors} categoryCounts={categoryCounts} currentPage={page} totalPages={BLOG_PAGE_COUNT} postsPerPage={BLOG_POSTS_PER_PAGE} />
    </>
  );
}
