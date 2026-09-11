import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { htmlPaths } from './lib/routes.mjs';
const output = new URL('../public/_redirects', import.meta.url);
const marker = '# BEGIN GENERATED SEO ROUTES';
const end = '# END GENERATED SEO ROUTES';
const previous = existsSync(output) ? readFileSync(output, 'utf8') : '';
const generated = [marker,
  '/blog/page/1 /blog 301!',
  '/blog/carpet-cleaning-commercial-buildings.md /404.html 410!',
  '/blog/murrieta-hot-climate-carpet-care.md /404.html 410!',
  ...htmlPaths().map((path) => `${path === '/' ? '/index' : path}.html ${path} 301!`), end].join('\n');
const startIndex = previous.indexOf(marker);
const endIndex = previous.indexOf(end);
if ((startIndex === -1) !== (endIndex === -1) || endIndex < startIndex) throw new Error('Unbalanced generated routing markers');
const result = startIndex === -1 ? `${generated}\n${previous}` : `${previous.slice(0, startIndex)}${generated}${previous.slice(endIndex + end.length)}`;
writeFileSync(output, result);
console.log(`Generated aliases for ${htmlPaths().length} preferred HTML routes`);
