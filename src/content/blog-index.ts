import summaries from './blog-index.json';

/** Lightweight generated summaries: safe to import from client components. */
export interface BlogSummary {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  gradient: string;
}

export const BLOG_SUMMARIES: BlogSummary[] = summaries;
export const BLOG_SLUGS = summaries.map((post) => post.slug);
export const BLOG_POSTS_PER_PAGE = 6;
export const BLOG_PAGE_COUNT = Math.ceil(BLOG_SUMMARIES.length / BLOG_POSTS_PER_PAGE);

export function getBlogPagePath(page: number): string {
  if (!Number.isInteger(page) || page < 1 || page > BLOG_PAGE_COUNT) {
    throw new RangeError('Invalid blog archive page');
  }
  return page === 1 ? '/blog' : `/blog/page/${page}`;
}

export function getBlogPage(page: number): BlogSummary[] {
  getBlogPagePath(page);
  return BLOG_SUMMARIES.slice((page - 1) * BLOG_POSTS_PER_PAGE, page * BLOG_POSTS_PER_PAGE);
}

export function formatBlogDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}
