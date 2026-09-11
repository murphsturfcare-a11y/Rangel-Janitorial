import { BLOG_POSTS } from './blog-registry';

/** Compatibility export; all article content is maintained in blog-posts.json. */
export const LOCATION_BLOG_POSTS = Object.fromEntries(
  Object.entries(BLOG_POSTS).filter(([slug]) => /^(sacramento|murrieta|walnut-creek|inland-empire)-/.test(slug)),
);
export const LOCATION_BLOG_SLUGS = Object.keys(LOCATION_BLOG_POSTS);
