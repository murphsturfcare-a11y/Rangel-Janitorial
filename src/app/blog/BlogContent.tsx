'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Phone,
  Calendar,
  User,
  ChevronRight,
} from 'lucide-react';
import type { BlogPost } from './page';

/* ----------------------- TYPES ----------------------- */

interface BlogContentProps {
  posts: BlogPost[];
  categories: string[];
  categoryColors: Record<string, { bg: string; text: string }>;
  categoryCounts: Record<string, number>;
}

/* ----------------------- CONSTANTS ----------------------- */

const POSTS_PER_PAGE = 6;

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ═══════════════════════ COMPONENT ═══════════════════════ */

export default function BlogContent({
  posts,
  categories,
  categoryColors,
  categoryCounts,
}: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /* -- Filtered posts -- */
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== 'All') {
      result = result.filter((post) => post.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  /* -- Pagination -- */
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const recentPosts = posts.slice(0, 5);

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  return (
    <>
      {/* ----------------- CATEGORY FILTER TABS ----------------- */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-body font-semibold text-sm transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-forest text-white shadow-md'
                    : 'bg-gray-100 text-charcoal-light hover:bg-gray-200 hover:text-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <section className="bg-cream py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* -- LEFT COLUMN: Post Grid -- */}
            <div className="flex-1 min-w-0">
              {/* Results count */}
              <div className="mb-6">
                <p className="font-body text-charcoal-light text-sm">
                  Showing{' '}
                  <span className="font-semibold text-charcoal">
                    {paginatedPosts.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-charcoal">
                    {filteredPosts.length}
                  </span>{' '}
                  {filteredPosts.length === 1 ? 'article' : 'articles'}
                  {activeCategory !== 'All' && (
                    <span>
                      {' '}
                      in{' '}
                      <span className="font-semibold text-forest">
                        {activeCategory}
                      </span>
                    </span>
                  )}
                </p>
              </div>

              {/* Post cards grid */}
              {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {paginatedPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      {/* Featured image placeholder */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block relative"
                      >
                        <div
                          className={`aspect-[16/9] bg-gradient-to-br ${post.gradient} relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.4)_0%,transparent_70%)]" />
                          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_30%,rgba(0,0,0,0.1)_70%)]" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <span className="font-heading font-bold text-white text-xs">
                                  MT
                                </span>
                              </div>
                              <span className="text-white/90 font-body text-xs font-medium">
                                Murphy&apos;s Turf Care
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Card body */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Category badge */}
                        <div className="mb-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold ${
                              categoryColors[post.category]?.bg || 'bg-gray-100'
                            } ${
                              categoryColors[post.category]?.text ||
                              'text-gray-700'
                            }`}
                          >
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading font-bold text-lg text-charcoal group-hover:text-forest transition-colors duration-200 leading-snug mb-3">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="font-body text-charcoal-light text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Author + date */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-xs font-body text-charcoal-light">
                            <User className="w-3.5 h-3.5" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-body text-charcoal-light">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>

                        {/* Read More */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 font-body font-semibold text-sage hover:text-sage-dark text-sm transition-colors group/link"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-charcoal mb-2">
                    No Articles Found
                  </h3>
                  <p className="font-body text-charcoal-light max-w-md mx-auto">
                    We couldn&apos;t find any articles matching your criteria. Try
                    adjusting your search or selecting a different category.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="mt-4 inline-flex items-center gap-2 font-body font-semibold text-sage hover:text-sage-dark transition-colors"
                  >
                    Clear all filters
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ----------------- PAGINATION ----------------- */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                      safePage <= 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-charcoal hover:bg-forest hover:text-white shadow-sm hover:shadow-md border border-gray-200 hover:border-forest'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                            safePage === page
                              ? 'bg-forest text-white shadow-md'
                              : 'bg-white text-charcoal-light hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={safePage >= totalPages}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
                      safePage >= totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-charcoal hover:bg-forest hover:text-white shadow-sm hover:shadow-md border border-gray-200 hover:border-forest'
                    }`}
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* -- RIGHT COLUMN: Sidebar (desktop only) -- */}
            <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8 hidden lg:block">
              {/* Search */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-heading font-bold text-charcoal text-base mb-4">
                  Search Articles
                </h4>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 font-body text-sm text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
                  />
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-heading font-bold text-charcoal text-base mb-4">
                  Recent Posts
                </h4>
                <div className="space-y-4">
                  {recentPosts.map((post, idx) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${post.gradient} flex-shrink-0`}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-body font-semibold text-sm text-charcoal group-hover:text-forest transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h5>
                        <p className="font-body text-xs text-charcoal-light mt-1">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-heading font-bold text-charcoal text-base mb-4">
                  Categories
                </h4>
                <div className="space-y-2">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-body transition-all duration-200 ${
                        activeCategory === category
                          ? 'bg-forest/10 text-forest font-semibold'
                          : 'text-charcoal-light hover:bg-gray-50 hover:text-charcoal'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            activeCategory === category
                              ? 'text-forest'
                              : 'text-gray-400'
                          }`}
                        />
                        {category}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          activeCategory === category
                            ? 'bg-forest text-white'
                            : 'bg-gray-100 text-charcoal-light'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="relative bg-gradient-to-br from-forest to-forest-light rounded-2xl p-7 overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sage/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <h4 className="font-heading font-bold text-white text-lg mb-2">
                    Need Professional Help?
                  </h4>
                  <p className="font-body text-white/85 text-sm leading-relaxed mb-5">
                    Our California lawn care experts are ready to transform your
                    yard. Get a free consultation today.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="mt-4 flex items-center gap-2 text-white/75 text-xs font-body">
                    <Phone className="w-3.5 h-3.5" />
                    <a
                      href="tel:+19513313300"
                      className="hover:text-white transition-colors"
                    >
                      (951) 331-3300
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* -- MOBILE SIDEBAR CONTENT -- */}
          <div className="lg:hidden mt-12 space-y-8">
            {/* Mobile Search */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-heading font-bold text-charcoal text-base mb-4">
                Search Articles
              </h4>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 font-body text-sm text-charcoal placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/30 outline-none transition"
                />
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="relative bg-gradient-to-br from-forest to-forest-light rounded-2xl p-7 overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative text-center sm:text-left">
                <h4 className="font-heading font-bold text-white text-lg mb-2">
                  Need Professional Help?
                </h4>
                <p className="font-body text-white/85 text-sm leading-relaxed mb-5">
                  Our California lawn care experts are ready to transform your
                  yard. Get a free consultation today.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-sage hover:bg-sage-dark text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+19513313300"
                    className="inline-flex items-center gap-2 text-white/85 hover:text-white font-body text-sm transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    (951) 331-3300
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
