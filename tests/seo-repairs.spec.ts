import { test, expect, type Page, type Locator } from '@playwright/test';
import regions from '../src/data/regions.json';

// Never contact analytics, maps, or CRM. All form outcomes below are mocked.
test.beforeEach(async ({ context }) => {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') return route.abort();
    if (url.pathname === '/.netlify/functions/lead') return route.fulfill({status: 503, contentType: 'application/json', body: JSON.stringify({success:false,outcome:'rejected',message:'Unmocked test request blocked',retryAllowed:false})});
    return route.continue();
  });
});

async function fillQuote(form: Locator) {
  await form.getByLabel('First Name', {exact: false}).fill('Browser');
  await form.getByLabel('Last Name', {exact: false}).fill('Test');
  await form.getByLabel('Phone', {exact: false}).fill('2025550149');
  await form.getByLabel('Email', {exact: false}).fill('browser-test@example.com');
}
async function recordLeadEvents(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as Window & {accepted: unknown[]}).accepted = [];
    window.addEventListener('rangel:lead-accepted', (event) => (window as unknown as Window & {accepted: unknown[]}).accepted.push((event as CustomEvent).detail));
  });
}

test('navigation and all city links remain visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({javaScriptEnabled:false});
  await context.route('**/*', route => new URL(route.request().url()).hostname === 'localhost' ? route.continue() : route.abort());
  const page = await context.newPage();
  await page.goto('http://localhost:4173/locations/sacramento');
  await expect(page.locator('h1')).toBeVisible();
  const cityLink = page.locator('a[href="/locations/sacramento/rocklin"]').first();
  await expect(cityLink).toBeVisible();
  await cityLink.click();
  await expect(page).toHaveURL(/\/locations\/sacramento\/rocklin$/);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('a[href="/services/day-porter"]').first()).toBeVisible();
  await page.goto('http://localhost:4173/blog');
  await page.locator('a[href="/blog/page/2"]').first().click();
  await expect(page).toHaveURL(/\/blog\/page\/2$/);
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});

test('mobile homepage uses poster, has metadata and no newsletter collection', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  const videos: string[] = []; page.on('request', req => {if(req.url().endsWith('.mp4')) videos.push(req.url());});
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(new URL(canonical!).href).toBe('https://rangeljanitorial.com/');
  await expect(page.locator('video')).toHaveAttribute('poster','/images/gallery/hero-poster.webp');
  await expect(page.locator('video')).not.toHaveAttribute('src', /.+/);
  await expect(page.locator('footer input[type="email"]')).toHaveCount(0);
  await expect(page.locator('footer a[href="/privacy-policy"]')).toBeVisible();
  await page.getByRole('button',{name:'Open menu'}).click();
  await expect(page.getByRole('button',{name:'Close menu'})).toBeVisible();
  await page.getByRole('button',{name:'Close menu'}).click();
  await expect(page.getByRole('button',{name:'Close menu'})).toHaveCount(0);
  const galleryImage = page.getByAltText('Rangel crew member mopping commercial floors');
  await galleryImage.scrollIntoViewIfNeeded();
  await expect(galleryImage).toBeVisible();
  await expect.poll(() => galleryImage.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(videos).toEqual([]); expect(errors).toEqual([]);
  await page.screenshot({path:'test-results/gallery-mobile.png'});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({path:'test-results/home-mobile.png'});
});

for (const region of regions) {
  test(`${region.slug}: one gallery and one section with unique customer reviews`, async ({ page }) => {
    await page.goto(`/locations/${region.slug}`);
    const galleryHeading = page.getByRole('heading', { level: 2, name: 'Our Work', exact: true });
    await expect(galleryHeading).toHaveCount(1);
    const gallery = galleryHeading.locator('xpath=ancestor::section');
    await expect(gallery.locator('img')).toHaveCount(12);
    const photoSources = await gallery.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')));
    expect(new Set(photoSources).size).toBe(photoSources.length);
    const reviews = page.getByRole('region', { name: `What ${region.city} Customers Say`, exact: true });
    await expect(reviews).toHaveCount(1);
    await expect(reviews.locator('blockquote')).toHaveCount(3);
    await expect(page.locator('main blockquote')).toHaveCount(3);
    const quotes = await reviews.locator('blockquote').allTextContents();
    expect(new Set(quotes).size).toBe(quotes.length);
  });

  test(`${region.slug}: both form placements deliver correct region and accepted event`, async ({ page }) => {
    await recordLeadEvents(page);
    const received: Record<string, unknown>[] = [];
    await page.route('**/.netlify/functions/lead', async (route) => {
      const body = route.request().postDataJSON(); received.push(body);
      await route.fulfill({status:200, contentType:'application/json',body:JSON.stringify({success:true,outcome:'accepted',submissionId:body.submissionId})});
    });
    await page.goto(`/locations/${region.slug}`);
    const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
    expect(new Set(ids).size).toBe(ids.length);
    await expect(page.locator('main')).toContainText(region.phone);
    await fillQuote(page.locator('form').first());
    await page.locator('form').first().getByRole('button',{name:'Get Your Free Quote'}).click();
    await expect(page.getByRole('status')).toContainText('Quote Request Received');
    await fillQuote(page.locator('form').first());
    await page.locator('form').first().getByRole('button',{name:'Get Your Free Quote'}).click();
    await expect(page.getByRole('status')).toHaveCount(2);
    expect(received.map(item=>item.regionSlug)).toEqual([region.slug,region.slug]);
    expect(received.map(item=>item.formPlacement)).toEqual(['hero','bottom']);
    expect(received[0].submissionId).not.toEqual(received[1].submissionId);
    expect(await page.evaluate(() => (window as unknown as Window & {accepted: unknown[]}).accepted.length)).toBe(2);
  });
}

for (const outcome of ['rejected','unknown','malformed'] as const) {
  test(`CRM ${outcome} never shows success or emits accepted event`, async ({ page }) => {
    await recordLeadEvents(page);
    await page.route('**/.netlify/functions/lead', async route => {
      const body = route.request().postDataJSON();
      await route.fulfill({status:outcome==='malformed'?200:502,contentType:'application/json',body:JSON.stringify(outcome==='malformed'?{success:true}:{success:false,outcome,message:'We could not accept this request.',submissionId:body.submissionId,retryAllowed:false})});
    });
    await page.goto('/locations/murrieta');
    const form = page.locator('form').first(); await fillQuote(form);
    await form.getByRole('button',{name:'Get Your Free Quote'}).click();
    await expect(form.getByRole('alert')).toBeVisible();
    await expect(page.getByText('Quote Request Received!')).toHaveCount(0);
    await expect(form.getByLabel('First Name',{exact:false})).toHaveValue('Browser');
    await expect(form.locator('a[href="tel:+19518944222"]')).toBeVisible();
    expect(await page.evaluate(() => (window as unknown as Window & {accepted: unknown[]}).accepted.length)).toBe(0);
  });
}

test('Netlify redirects, removals, canonical headers and marketing parameters', async ({ request }) => {
  for (const path of ['/','/services','/blog/page/2','/?utm_source=google','/locations/murrieta']) expect((await request.get(path)).status()).toBe(200);
  for (const [from,to] of [['/index.html','/'],['/services.html','/services'],['/blog/page/1','/blog'],['/locations/murrieta.html','/locations/murrieta']]) {
    const res=await request.get(from,{maxRedirects:0}); expect(res.status()).toBe(301); expect(new URL(res.headers().location,'http://localhost:4173').pathname).toBe(to);
    expect((await request.get(from)).status()).toBe(200);
  }
  for(const path of ['/?s=cleaning','/?p=123','/products/123','/blog/carpet-cleaning-commercial-buildings.md','/blog/murrieta-hot-climate-carpet-care.md']) expect((await request.get(path)).status()).toBe(410);
  expect((await request.get('/not-a-real-page')).status()).toBe(404);
  expect((await request.get('/locations/murrieta/not-a-city')).status()).toBe(404);
  const mirror=await request.get('/blog/office-cleaning-best-practices.md');
  expect(mirror.headers().link).toBe('<https://rangeljanitorial.com/blog/office-cleaning-best-practices>; rel="canonical"');
  expect((await request.get('/.netlify/functions/lead')).status()).toBe(405);
});
