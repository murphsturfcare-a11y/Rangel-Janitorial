import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { htmlPaths, business, regions, posts } from './lib/routes.mjs';

const paths = htmlPaths();
const errors = [];
const graph = new Map();
const site = business.url;
const out = new URL('../out/', import.meta.url);
const fileFor = (path) => new URL(path === '/' ? 'index.html' : `${path.slice(1)}.html`, out);
const check = (ok, message) => { if (!ok) errors.push(message); };
const headers = readFileSync(new URL('_headers', out), 'utf8');
const sitemap = new JSDOM(readFileSync(new URL('sitemap.xml', out), 'utf8'), {contentType: 'text/xml'}).window.document;
const sitemapPaths = [...sitemap.querySelectorAll('loc')].map((node) => new URL(node.textContent).pathname);
check(new Set(sitemapPaths).size === sitemapPaths.length, 'Sitemap contains duplicate URLs');
check(paths.length === sitemapPaths.length && paths.every((path) => sitemapPaths.includes(path)), 'Sitemap does not exactly match preferred HTML routes');
check(sitemap.querySelectorAll('lastmod').length === 0, 'Unverified sitemap modification dates present');

function walkSchema(value, path) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) { value.forEach((item) => walkSchema(item, path)); return; }
  for (const key of ['datePublished', 'dateModified']) if (value[key]) {
    check(/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value[key]) && !Number.isNaN(Date.parse(value[key])), `${path}: invalid ${key}`);
  }
  if (value['@type'] === 'LocalBusiness') check(value['@id'] === `${site}/#headquarters`, `${path}: unverified separate LocalBusiness entity`);
  Object.values(value).forEach((item) => walkSchema(item, path));
}

for (const path of paths) {
  if (!existsSync(fileFor(path))) { errors.push(`${path}: missing exported HTML`); continue; }
  const html = readFileSync(fileFor(path), 'utf8');
  const dom = new JSDOM(html, {url: site + path});
  const doc = dom.window.document;
  const canonical = [...doc.querySelectorAll('link[rel="canonical"]')];
  check(canonical.length === 1 && new URL(canonical[0]?.href || site).pathname === path, `${path}: canonical mismatch`);
  check(canonical[0]?.href.startsWith(site), `${path}: nonproduction canonical`);
  const title = doc.querySelector('title')?.textContent || '';
  check(title.split(business.name).length === 2, `${path}: brand missing or repeated in title`);
  check(doc.querySelectorAll('h1').length === 1, `${path}: expected one H1`);
  check(Boolean(doc.querySelector('meta[name="description"]')?.content), `${path}: missing description`);
  check(Boolean(doc.querySelector('meta[property="og:image"]')?.content), `${path}: missing OG image`);
  check(![...doc.querySelectorAll('meta[name="robots"]')].some((node) => /noindex/i.test(node.content)), `${path}: accidental noindex`);
  check(!html.includes('331-3300'), `${path}: stale Murrieta phone`);
  const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap((node) => {
    try { return JSON.parse(node.textContent); }
    catch { errors.push(`${path}: invalid JSON-LD`); return []; }
  });
  check(schemas.some((schema) => schema['@id'] === `${site}/#organization`), `${path}: organization missing from initial HTML`);
  schemas.forEach((schema) => walkSchema(schema, path));
  const ids = [...doc.querySelectorAll('[id]')].map((node) => node.id);
  check(new Set(ids).size === ids.length, `${path}: duplicate DOM IDs`);
  const allowedPhones = regions.map((region) => region.phone.replace(/\D/g, ''));
  const normalizePhone = (phone) => phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  for (const phone of (doc.querySelector('main')?.textContent || '').match(/\(\d{3}\)\s*\d{3}-\d{4}/g) || []) check(allowedPhones.includes(normalizePhone(phone)), `${path}: unapproved visible phone ${phone}`);
  const destinations = new Set();
  for (const anchor of doc.querySelectorAll('a[href]')) {
    if (anchor.getAttribute('href').startsWith('tel:')) check(allowedPhones.includes(normalizePhone(anchor.getAttribute('href'))), `${path}: unapproved telephone link`);
    const url = new URL(anchor.href, site);
    if (url.origin !== site || !['http:', 'https:'].includes(url.protocol)) continue;
    const target = url.pathname.replace(/\/$/, '') || '/';
    if (paths.includes(target)) destinations.add(target);
    else check(existsSync(new URL(target.slice(1), out)), `${path}: missing internal destination ${target}`);
  }
  graph.set(path, destinations);
  const region = regions.find((entry) => path.startsWith(`/locations/${entry.slug}`));
  if (region) check(doc.querySelector('main')?.textContent.includes(region.phone), `${path}: incorrect regional contact`);
  dom.window.close();
}
const visited = new Set();
const pending = ['/'];
while (pending.length) { const path = pending.shift(); if (visited.has(path)) continue; visited.add(path); for (const to of graph.get(path) || []) if (!visited.has(to)) pending.push(to); }
const unreachable = paths.filter((path) => !visited.has(path));
check(unreachable.length === 0, `Unreachable from homepage: ${unreachable.join(', ')}`);
for (const post of posts) {
  check(existsSync(new URL(`blog/${post.slug}.md`, out)), `Missing mirror ${post.slug}`);
  check(headers.includes(`Link: <${site}/blog/${post.slug}>; rel="canonical"`), `Missing canonical header ${post.slug}`);
}
for (const name of ['carpet-cleaning-commercial-buildings', 'murrieta-hot-climate-carpet-care']) check(!existsSync(new URL(`blog/${name}.md`, out)), `Stale mirror ${name}`);
for (const name of ['llms.txt', 'llms-full.txt']) {
  const content = readFileSync(new URL(name, out), 'utf8');
  check(!content.includes('331-3300'), `${name}: old Murrieta number`);
  regions.forEach((region) => check(content.includes(region.phone), `${name}: missing ${region.slug} phone`));
}
check(!readFileSync(new URL('robots.txt', out), 'utf8').includes('netlify.app'), 'Stale robots hostname');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${paths.length} HTML pages; ${posts.length} article mirrors; zero unreachable pages; canonicals, schema, dates, regional phones, and sitemap verified.`);
