import type { BlogPost } from '../types';
import { BLOG_POSTS } from '@/content/blog-registry';

/** Compatibility view of the canonical article records. Server/build use only. */
export const blogPosts: BlogPost[] = Object.values(BLOG_POSTS).map((post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content: post.content,
  featuredImage: '/images/og-image.png',
  category: post.category,
  author: post.author.name,
  publishedDate: post.publishDate,
  tags: [post.category],
  metaTitle: post.title,
  metaDescription: post.metaDescription,
}));
