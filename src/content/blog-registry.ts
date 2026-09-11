import records from './blog-posts.json';

/** Server/build data. Client components receive summaries, never this registry. */
export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  author: { name: string; role: string; bio: string };
  publishDate: string;
  modifiedDate?: string;
  readingTime: string;
  featuredGradient: string;
  headings: string[];
  content: string;
  relatedSlugs: string[];
  excerpt: string;
}

export { BLOG_SUMMARIES, BLOG_SLUGS, BLOG_POSTS_PER_PAGE, BLOG_PAGE_COUNT, getBlogPage, getBlogPagePath, formatBlogDate } from './blog-index';
export type { BlogSummary } from './blog-index';

const articles: BlogPost[] = records;
export const BLOG_POSTS: Record<string, BlogPost> = Object.fromEntries(
  articles.map((post) => [post.slug, post]),
);
