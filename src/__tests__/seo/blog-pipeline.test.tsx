import { renderToStaticMarkup } from 'react-dom/server';
import { mkdtempSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BlogArchive, { blogArchiveMetadata } from '@/app/blog/BlogArchive';
import BlogPostPage, { generateMetadata } from '@/app/blog/[slug]/page';
import ArchivePage, { generateStaticParams } from '@/app/blog/page/[page]/page';
import { BLOG_POSTS } from '@/content/blog-registry';
import { BLOG_PAGE_COUNT, BLOG_SLUGS, getBlogPage } from '@/content/blog-index';
import business from '@/data/business.json';
import regions from '@/data/regions.json';
import { buildGeneratedFiles, writeGeneratedFiles, validatePosts } from '../../../scripts/generate-llm-files.mjs';

vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NEXT_NOT_FOUND'); } }));
const services = { 'office-cleaning': 'Office Cleaning' };
const records = Object.values(BLOG_POSTS);
const directories: string[] = [];
afterEach(() => directories.splice(0).forEach((directory) => rmSync(directory, { recursive: true, force: true })));

describe('crawlable blog output', () => {
  it('renders each archive slice and URL pagination in initial HTML', () => {
    const discovered = new Set<string>();
    for (let page = 1; page <= BLOG_PAGE_COUNT; page++) {
      const html = renderToStaticMarkup(<BlogArchive page={page} />);
      const document = new DOMParser().parseFromString(html, 'text/html');
      for (const post of getBlogPage(page)) {
        expect(document.querySelector(`article a[href="/blog/${post.slug}"]`)).not.toBeNull();
        discovered.add(post.slug);
      }
      expect(document.querySelector('nav[aria-label="Blog pagination"] a[href="/blog/page/2"]')).not.toBeNull();
      expect(document.querySelector('nav[aria-label="Blog pagination"] a[aria-current="page"]')?.textContent).toBe(String(page));
      expect(blogArchiveMetadata(page).alternates?.canonical).toBe(`${business.url}${page === 1 ? '/blog' : `/blog/page/${page}`}`);
    }
    expect([...discovered]).toEqual(BLOG_SLUGS);
  });

  it('exports only valid pages and rejects unavailable archive URLs', async () => {
    expect(generateStaticParams()).toHaveLength(BLOG_PAGE_COUNT - 1);
    for (const page of ['0', '1', '01', '-1', '2.5', 'abc', String(BLOG_PAGE_COUNT + 1)]) {
      await expect(ArchivePage({ params: Promise.resolve({ page }) })).rejects.toThrow('NEXT_NOT_FOUND');
    }
  });

  it('emits ISO article dates, complete previews, and a stable publisher identity', async () => {
    const slug = BLOG_SLUGS[0];
    const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
    expect(metadata.openGraph).toHaveProperty('publishedTime', BLOG_POSTS[slug].publishDate);
    expect(metadata.openGraph).not.toHaveProperty('modifiedTime');
    expect(metadata.openGraph?.images).toBeDefined();
    expect(metadata.twitter).toHaveProperty('images');
    const html = renderToStaticMarkup(await BlogPostPage({ params: Promise.resolve({ slug }) }));
    const document = new DOMParser().parseFromString(html, 'text/html');
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map((element) => JSON.parse(element.textContent || '{}'));
    const article = schemas.find((schema) => schema['@type'] === 'BlogPosting');
    expect(article.datePublished).toBe(BLOG_POSTS[slug].publishDate);
    expect(article).not.toHaveProperty('dateModified');
    expect(article.publisher['@id']).toBe(`${business.url}/#organization`);
    expect(document.querySelector('time')?.getAttribute('datetime')).toBe(article.datePublished);
  });
});

describe('deterministic generated mirrors', () => {
  it('produces every mirror with an exact HTTP canonical and consistent regional facts', () => {
    const first = buildGeneratedFiles({ posts: records, business, regions, services });
    const second = buildGeneratedFiles({ posts: records, business, regions, services });
    expect([...first]).toEqual([...second]);
    for (const post of records) {
      expect(first.get(`blog/${post.slug}.md`)).toContain(`**Published:** ${post.publishDate}`);
      expect(first.get('_headers')).toContain(`Link: <${business.url}/blog/${post.slug}>; rel="canonical"`);
    }
    for (const region of regions) expect(first.get('llms.txt')).toContain(region.phone);
    expect(first.get('llms.txt')).not.toContain('(951) 331-3300');
    expect(first.get('llms.txt')).not.toMatch(/7am|9am|6pm|5pm/);
    expect(first.get('llms-full.txt')).not.toContain('Generated:');
  });

  it('removes only owned orphans and preserves custom files and unmanaged headers', () => {
    const outputDir = mkdtempSync(join(tmpdir(), 'rangel-mirrors-'));
    directories.push(outputDir);
    const files = buildGeneratedFiles({ posts: records, business, regions, services });
    writeGeneratedFiles(files, outputDir);
    writeFileSync(join(outputDir, 'blog', 'manual.md'), '# Do not remove');
    writeFileSync(join(outputDir, 'blog', 'retired.md'), '*Published by Rangel Janitorial — old export*\n*Read the original: https://rangeljanitorial.com/blog/retired*');
    writeFileSync(join(outputDir, '_headers'), `/custom\n  X-Test: preserve\n\n${readFileSync(join(outputDir, '_headers'), 'utf8')}`);
    writeGeneratedFiles(files, outputDir);
    const headers = readFileSync(join(outputDir, '_headers'), 'utf8');
    expect(headers).toContain('X-Test: preserve');
    expect(existsSync(join(outputDir, 'blog', 'retired.md'))).toBe(false);
    expect(existsSync(join(outputDir, 'blog', 'manual.md'))).toBe(true);
    writeGeneratedFiles(files, outputDir);
    expect(readFileSync(join(outputDir, '_headers'), 'utf8')).toBe(headers);
  });

  it('fails on invalid records instead of silently dropping articles', () => {
    expect(() => validatePosts([])).toThrow();
    expect(() => validatePosts([records[0], records[0]])).toThrow(/Duplicate/);
    expect(() => validatePosts([{ ...records[0], content: '' }])).toThrow(/Missing/);
    expect(() => validatePosts([{ ...records[0], publishDate: '2026-02-30' }])).toThrow(/date/);
    expect(() => validatePosts([{ ...records[0], relatedSlugs: ['missing-post'] }])).toThrow(/related/);
  });
});
