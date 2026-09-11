import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  List,
} from 'lucide-react';
import { AnimateOnScroll, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';
import { BLOG_POSTS as blogPosts, BLOG_SLUGS, formatBlogDate } from '@/content/blog-registry';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';

// ---------------------------------------------------------------------------
// Static Params & Metadata
// ---------------------------------------------------------------------------

const validSlugs = BLOG_SLUGS;

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const metadata = generatePageMetadata(post.title, post.metaDescription, `/blog/${post.slug}`);
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: post.publishDate,
      ...(post.modifiedDate ? { modifiedTime: post.modifiedDate } : {}),
      authors: [post.author.name],
      section: post.category,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  // Build related posts
  const relatedPosts = post.relatedSlugs
    .map((s) => blogPosts[s])
    .filter(Boolean);

  // Category color mapping
  const categoryColors: Record<string, string> = {
    'Janitorial Tips': 'bg-sage/15 text-sage-dark',
    'Industry Insights': 'bg-amber-100 text-amber-700',
    'Local Guides': 'bg-blue-100 text-blue-700',
  };

  const categoryColor =
    categoryColors[post.category] || 'bg-sage/15 text-sage-dark';

  // Build JSON-LD structured data (BlogPosting for Generative Engine Optimization)
  const postUrl = `https://rangeljanitorial.com/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.metaDescription,
    url: postUrl,
    inLanguage: 'en-US',
    author: { '@id': 'https://rangeljanitorial.com/#organization' },
    publisher: { '@id': 'https://rangeljanitorial.com/#organization' },
    datePublished: post.publishDate,
    ...(post.modifiedDate ? { dateModified: post.modifiedDate } : {}),
    image: 'https://rangeljanitorial.com/images/og-image.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    keywords: [post.category, 'commercial cleaning', 'janitorial', 'California'],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://rangeljanitorial.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://rangeljanitorial.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <JsonLd schema={articleJsonLd} />
      <JsonLd schema={breadcrumbJsonLd} />

      {/* ----------------------------------------------------------------- */}
      {/* Breadcrumb */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1 text-sm text-charcoal-light font-body">
            <Link
              href="/"
              className="hover:text-forest transition-colors py-1 px-1"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <Link
              href="/blog"
              className="hover:text-forest transition-colors py-1 px-1"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-charcoal font-medium truncate max-w-[200px] sm:max-w-none py-1 px-1">
              {post.title}
            </span>
          </nav>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Article Header */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white border-b border-gray-100">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-body ${categoryColor}`}
            >
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-charcoal leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-charcoal-light font-body">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sage" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sage" />
              <time dateTime={post.publishDate}>{formatBlogDate(post.publishDate)}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sage" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Featured Image Placeholder */}
      {/* ----------------------------------------------------------------- */}
      <div
        className={`w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-r ${post.featuredGradient} relative`}
      >
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/30 font-heading font-bold text-lg sm:text-xl tracking-wider uppercase">
            Featured Image
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Two-Column Layout: Article + Sidebar */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-14">
            {/* LEFT: Article Content */}
            <article
              className="min-w-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* RIGHT: Sidebar (Desktop Only) */}
            <aside className="hidden lg:block">
              <div className="sticky top-8 space-y-8">
                {/* Table of Contents */}
                <div className="bg-cream rounded-2xl p-6 border border-gray-100">
                  <h3 className="flex items-center gap-2 text-sm font-bold font-heading text-charcoal uppercase tracking-wider mb-4">
                    <List className="w-4 h-4 text-sage" />
                    Table of Contents
                  </h3>
                  <nav>
                    <ul className="space-y-2">
                      {post.headings.map((heading, idx) => {
                        const headingId = heading
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '');
                        return (
                          <li key={idx}>
                            <a
                              href={`#${headingId}`}
                              className="text-sm text-charcoal-light font-body hover:text-forest transition-colors leading-snug block py-1"
                            >
                              {heading}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold font-heading mb-2">
                    Need Professional Cleaning?
                  </h3>
                  <p className="text-white/80 text-sm font-body leading-relaxed mb-5">
                    Rangel Janitorial serves businesses across
                    California. Get a free, no-obligation quote today.
                  </p>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors font-body text-sm w-full justify-center"
                  >
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/locations"
                    className="flex items-center justify-center gap-2 text-white/80 hover:text-white font-body text-sm mt-3 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Find Your Local Office
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Share Buttons */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-cream border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold font-heading text-charcoal">
              Share this article:
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                aria-label="Share on Facebook"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                aria-label="Share on Twitter"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                aria-label="Share on LinkedIn"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-charcoal-light hover:text-forest hover:border-forest/30 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Author Bio Card */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-xs font-body text-charcoal-light uppercase tracking-wider mb-1">
                  Written by
                </p>
                <h3 className="text-xl font-bold font-heading text-charcoal mb-1">
                  {post.author.name}
                </h3>
                <p className="text-sm font-body text-sage font-semibold mb-3">
                  {post.author.role}
                </p>
                <p className="text-sm text-charcoal-light font-body leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Related Posts */}
      {/* ----------------------------------------------------------------- */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream py-12 sm:py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-charcoal mb-8 text-center">
              Related Articles
            </h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => {
                const relatedCategoryColor =
                  categoryColors[related.category] ||
                  'bg-sage/15 text-sage-dark';
                return (
                  <StaggerItem key={related.slug}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 hover:shadow-lg transition-all card-hover block"
                    >
                      <div
                        className={`h-36 bg-gradient-to-r ${related.featuredGradient} relative`}
                      >
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                      </div>
                      <div className="p-5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold font-body mb-3 ${relatedCategoryColor}`}
                        >
                          {related.category}
                        </span>
                        <h3 className="font-bold font-heading text-charcoal group-hover:text-forest transition-colors mb-2 leading-snug">
                          {related.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-charcoal-light font-body">
                          <span>{related.author.name}</span>
                          <span className="text-gray-300">|</span>
                          <span>{related.readingTime}</span>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* CTA Banner */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-forest to-forest-dark">
        <AnimateOnScroll direction="up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
            Ready for a Cleaner Facility?
          </h2>
          <p className="text-lg text-white/85 font-body mb-8 max-w-2xl mx-auto leading-relaxed">
            Rangel Janitorial provides professional janitorial and commercial
            cleaning services across California. From Sacramento to Murrieta
            to Walnut Creek, our experienced crews keep your facility clean,
            healthy, and professional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body shadow-md hover:shadow-lg"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors font-body backdrop-blur-sm"
            >
              <MapPin className="w-5 h-5" />
              Find Your Local Office
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
