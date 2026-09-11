import { BLOG_POSTS } from '@/content/blog-registry';
import { BLOG_SUMMARIES, BLOG_SLUGS, BLOG_PAGE_COUNT, getBlogPage, getBlogPagePath } from '@/content/blog-index';
import { blogPosts } from '@/data/blog';
import { validatePosts, summarizePosts } from '../../../scripts/generate-llm-files.mjs';

describe('canonical article inventory', () => {
  it('keeps archive and compatibility data aligned with every retained article', () => {
    const articles = Object.values(BLOG_POSTS);
    validatePosts(articles);
    expect(articles).toHaveLength(46);
    expect(BLOG_SUMMARIES).toEqual(summarizePosts(articles));
    expect(blogPosts.map((post) => post.slug)).toEqual(BLOG_SLUGS);
  });

  it('preserves article dates without fabricating modification dates', () => {
    expect(BLOG_POSTS['office-cleaning-best-practices'].publishDate).toBe('2026-03-15');
    expect(BLOG_POSTS['janitorial-services-walnut-creek'].publishDate).toBe('2025-12-08');
    for (const summary of BLOG_SUMMARIES) {
      expect(summary.date).toBe(BLOG_POSTS[summary.slug].publishDate);
      expect(BLOG_POSTS[summary.slug].modifiedDate).toBeUndefined();
    }
  });

  it('covers every article exactly once across URL-addressable archive pages', () => {
    const pages = Array.from({ length: BLOG_PAGE_COUNT }, (_, index) => getBlogPage(index + 1));
    expect(pages.flat().map((post) => post.slug)).toEqual(BLOG_SLUGS);
    expect(getBlogPagePath(1)).toBe('/blog');
    expect(getBlogPagePath(BLOG_PAGE_COUNT)).toBe(`/blog/page/${BLOG_PAGE_COUNT}`);
    for (const invalid of [0, -1, 1.5, BLOG_PAGE_COUNT + 1, NaN]) {
      expect(() => getBlogPage(invalid)).toThrow(RangeError);
    }
  });

  it('keeps article bodies out of client summaries', () => {
    for (const summary of BLOG_SUMMARIES) {
      expect(summary).not.toHaveProperty('content');
      expect(summary).not.toHaveProperty('headings');
      expect(typeof summary.author).toBe('string');
    }
  });
});
