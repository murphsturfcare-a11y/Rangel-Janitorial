import BlogArchive, { blogArchiveMetadata } from './BlogArchive';

export const metadata = blogArchiveMetadata(1);

export default function BlogPage() {
  return <BlogArchive page={1} />;
}
