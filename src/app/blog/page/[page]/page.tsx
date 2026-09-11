import { notFound } from 'next/navigation';
import BlogArchive, { blogArchiveMetadata } from '../../BlogArchive';
import { BLOG_PAGE_COUNT } from '@/content/blog-index';

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: BLOG_PAGE_COUNT - 1 }, (_, index) => ({ page: String(index + 2) }));
}

function archivePage(value: string): number {
  const page = Number(value);
  if (!/^[1-9]\d*$/.test(value) || page < 2 || page > BLOG_PAGE_COUNT) notFound();
  return page;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  return blogArchiveMetadata(archivePage((await params).page));
}

export default async function PaginatedBlogPage({ params }: { params: Promise<{ page: string }> }) {
  return <BlogArchive page={archivePage((await params).page)} />;
}
