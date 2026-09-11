# Rangel Janitorial — SEO and AEO backend audit

Audited September 11, 2026. Production: [rangeljanitorial.com](https://rangeljanitorial.com). Source: `/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial`, commit `a0a090b`. Existing working changes were preserved. The initial audit made no application changes or deployments; the subsequent owner-approved phone correction and expanded backend findings are recorded below.

**Verdict:** The site is accessible to crawlers and its static hosting is functioning in the tested cases. The largest repair priorities are conflicting business information, weak internal discovery, and incomplete or inconsistent machine-readable signals. City-page differentiation needs editorial work alongside the backend fixes. This is an evidence-based technical audit, not a ranking or traffic score.

## Scope and results

Fetched all **169 sitemap URLs**: **121 HTML pages, 46 Markdown mirrors, and two LLM text files**. All returned HTTP 200. Inspected initial HTML, response headers, internal anchors, JSON-LD, generated files, source configuration, and selected SEO tests. Additional checks covered URL variants, retired routes, crawler user-agent strings, and image availability.

| Check | Observed result |
|---|---|
| Sitemap availability and listed URLs | 169/169 HTTP 200; XML parsed successfully |
| HTML titles, descriptions, H1s | All 121 HTML pages have a title, description, and exactly one H1 |
| Indexing directives | No `noindex` in sitemap HTML pages or their response headers |
| Canonicals | 120/121 HTML pages have a self-canonical; homepage missing |
| JSON-LD syntax | Every emitted native JSON-LD block parsed; semantic issues remain below |
| Internal discovery | 42 HTML pages have no inbound anchors from another sitemap HTML page |
| Homepage reachability | 50/121 pages reachable through captured HTML anchors; 71 unreachable |
| Domain redirects | HTTP and www homepage variants issue 301 to HTTPS apex |
| Retired-route handling | Sample product, WordPress login, `?p=`, and `?page_id=` URLs return 410; unknown route and unknown city return 404 |
| Crawler access smoke test | Googlebot, Bingbot, OAI-SearchBot, PerplexityBot user-agent requests all returned identical-size 200 responses for Murrieta |

The link graph uses initial HTML anchors, excludes self-links, and does not simulate clicks. The sitemap can still expose pages absent from navigation. User-agent tests originate from this audit machine, not verified crawler IP ranges. A 200 response does not prove indexing, ranking, or AI citations.

## Repair first

### 1. High verification priority — Same-region Murrieta discrepancy and inconsistent hours

Each service area has its own phone number; those regional differences are intentional and should be preserved, as the owner clarified during this audit. The observed comparison is:

| Area | Location website/schema | LLM company facts |
|---|---|---|
| Sacramento | (916) 426-2311 | (916) 426-2311 |
| Murrieta / Inland Empire | (951) 894-4222 | (951) 331-3300 |
| Walnut Creek / East Bay | (925) 655-9008 | (925) 655-9008 |

The finding concerns two numbers assigned to **Murrieta**, not the use of different numbers across areas. **Resolved by the owner on September 11:** use the location page's **(951) 894-4222**. The generator and both AI text files have been corrected locally; deployment is pending. The table above preserves the original crawl evidence. Hours remain unconfirmed.

[Live llms.txt](https://rangeljanitorial.com/llms.txt) lists Murrieta **(951) 331-3300**, weekdays **7am–6pm**, and Saturday **8am–4pm**. The active location/service content and schema use **(951) 894-4222**. Company data and root schema give weekdays **9am–5pm**, with company data showing weekends closed. [llms-full.txt](https://rangeljanitorial.com/llms-full.txt) contains both phone numbers, including the conflicting number in its final company block at line 2705.

This can give an answer engine inconsistent information about the same service area. Verify the authoritative records by region, any intentional tracking-number assignments, and the distinction between office hours and cleaning availability. Derive visible content, schema, and generated files from those records. Do not patch generated output alone.

Source: [generator phone/hours](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/scripts/generate-llm-files.mjs:415), [second phone copy](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/scripts/generate-llm-files.mjs:522), [root business schema](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/layout.tsx:117), [company record](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/data/company.ts:14).

Acceptance: a fresh generation preserves the approved separate regional phone numbers, with consistent, clearly labeled hours. The owner's selected Murrieta number is (951) 894-4222.

### 2. High — Internal discovery misses substantial content

**33 of 61 city pages** have no inbound HTML links. Region hubs expose only Sacramento **9/21**, Murrieta **11/20**, and Walnut Creek **8/20** children. Examples include [Rocklin](https://rangeljanitorial.com/locations/sacramento/rocklin), [Ontario](https://rangeljanitorial.com/locations/murrieta/ontario), and [Livermore](https://rangeljanitorial.com/locations/walnut-creek/livermore).

The blog archive initially links to **6 of 46 posts**. Pagination changes client state through buttons and provides no independently crawlable page URLs. Nine articles have no inbound HTML links; 36 articles are unreachable from the homepage even after following related-post links. Together with the 33 city pages and two legal pages, **71 pages** lack a path from the homepage in the captured graph.

Generate region links from the same route dataset as the sitemap. Provide static archive pages with normal anchors, or an HTML archive listing all retained articles. Each retained indexable page should have a contextual inbound link. This follows [Google's internal-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable); these findings do not establish non-indexation.

Source: [region link arrays](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/locations/[slug]/page.tsx:177), [region link rendering](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/locations/[slug]/page.tsx:808), [blog pagination](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/blog/BlogContent.tsx:259). Full affected URLs are in [link-graph.json](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/link-graph.json).

Acceptance: every retained HTML page is reachable from home through server-emitted anchors, without pagination button clicks.

### 3. Medium — Homepage variants lack a canonical signal

The [homepage](https://rangeljanitorial.com), `/index.html`, and `/?s=cleaning` return homepage content with HTTP 200 and no canonical. Other sitemap HTML pages correctly self-canonicalize. `/services.html` also returns 200, but points its canonical to `/services`.

The root canonical was intentionally removed to prevent inheritance across all routes; the client homepage never received its own replacement. Add homepage-specific server metadata. Redirect redundant HTML variants to their clean URL. Fix the old WordPress search-query rule: `from = "/?*s=*"` does not produce the intended removal behavior in the live test. Use a supported query condition for retired searches and preserve legitimate marketing query parameters.

Source: [layout](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/layout.tsx:33), [homepage](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/page.tsx:1), [Netlify query rule](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/netlify.toml:242). See [canonical consolidation guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Acceptance: homepage has one correct canonical; retired search URLs return the intended removal status; aliases normalize without redirect loops.

### 4. Medium — Business schema is delayed and fragmented

The complete sitewide business record uses `next/script` with default `afterInteractive`, so it is not a native JSON-LD block in initial HTML. The homepage's initial JSON-LD contains only business name and aggregate rating. Native article, service, region, and city schemas do appear in initial HTML.

Render the complete business record as a server-emitted script. Use stable organization and verified-office `@id` references across pages. Every subcity currently declares a separate `LocalBusiness` named after that city, without its own address or URL. Model service coverage with `Service.areaServed` where no physical branch exists; verify actual offices before choosing the entity model. Google can render JavaScript; this recommendation improves interoperability with consumers that do not.

Source: [delayed root script](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/layout.tsx:105), [homepage schema](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/page.tsx:155), [city entity](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/locations/[slug]/[subcity]/page.tsx:255).

Acceptance: initial HTML exposes the verified entity graph and consistent business facts without client execution.

### 5. Medium — All 46 articles use display strings as schema dates

Article JSON-LD emits values such as `March 15, 2026` for both publication and modification; Open Graph timestamps repeat this pattern. Use ISO-formatted dates stored independently of human display formatting, and use a genuine content modification date when known. These are semantic format defects; the JSON itself parses. [Google's article guidance](https://developers.google.com/search/docs/appearance/structured-data/article) specifies ISO 8601 dates.

Source: [article dates](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/blog/[slug]/page.tsx:560), [OG timestamps](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/blog/[slug]/page.tsx:497).

Acceptance: every article's exported timestamps use valid machine-readable dates and agree with the visible publication information.

### 6. Medium — Markdown mirrors compete with HTML and retain deleted content

The sitemap lists all **46 Markdown copies**, and responses advertise `X-Robots-Tag: index, follow` without an HTTP canonical `Link` header. A plain-text “Source” link does not declare a canonical. Recommend reserving the search sitemap for preferred HTML URLs and adding a per-mirror HTTP canonical header to its HTML counterpart. Keep optional mirrors discoverable from the LLM index. This is signal cleanup, not proof that Google currently ranks the mirrors.

Two additional obsolete mirrors return 200 while their HTML originals return 404: [carpet-cleaning-commercial-buildings.md](https://rangeljanitorial.com/blog/carpet-cleaning-commercial-buildings.md) and [murrieta-hot-climate-carpet-care.md](https://rangeljanitorial.com/blog/murrieta-hot-climate-carpet-care.md). The former also links to `/services/carpet-cleaning`, which returns 404. Reconcile generated files against active routes and intentionally redirect or retire obsolete mirrors.

Source: [generator writes without reconciliation](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/scripts/generate-llm-files.mjs:355), [sitemap mirrors](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/sitemap.ts:108), [mirror headers](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/netlify.toml:45). [Google documents HTTP canonical headers for non-HTML documents](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Acceptance: every retained mirror resolves to a valid canonical original; retired content and broken source links no longer remain in generated output.

## Remaining improvements

| Priority | Finding and evidence | Recommended action |
|---|---|---|
| Medium | **61 city pages repeat the same main text** after normalizing place names and phone numbers; 281–296 words each. [City template](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/locations/[slug]/[subcity]/page.tsx:313). | Add verified local projects, coverage/service details and useful local answers, or consolidate pages lacking distinct value. Repetition is confirmed; a spam penalty is not. |
| Medium | **70/121 page titles repeat the brand**: `Janitorial Cleaning | Rangel Janitorial | Rangel Janitorial`. [Root title template](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/layout.tsx:40) and [child title](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/services/[slug]/page.tsx:569). | Let the root template append branding once, or use absolute titles. Sacramento hub and Sacramento subcity also share the same title. |
| Medium | All **169 sitemap lastmod values equal `2026-04-12T01:26:02.567Z`**. Source uses `new Date()` on every route at build time. [Sitemap](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/sitemap.ts:99). | Use actual significant modification dates or omit unknown dates. This follows [Google's lastmod guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Tuning priority/changefreq is unnecessary for Google. |
| Medium | **Measurement implementation is disconnected.** GA/GTM components exist but no production call sites mount them; all 121 initial HTML pages lack their loader strings. [Layout](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/layout.tsx:81), [GA component](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/components/analytics/GoogleAnalytics.tsx:8). | Wire the chosen analytics integration and verify consent-aware organic/AI referral attribution, phone clicks, and successful lead events. This does not establish whether separate hosting analytics exist. |
| Medium | **SEO tests are stale.** Targeted run: 13 failed, 38 passed, plus one suite-load failure. The Netlify test reads outside the project; assertions refer to retired pages/services. Metadata/schema helper tests do not exercise the actual inline page metadata. [Netlify test](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/__tests__/config/netlify.test.ts:5), [metadata test](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/__tests__/seo/metadata.test.ts:9). | Repair paths and current route expectations. Validate rendered HTML, graph reachability, business facts, dates, and deploy status codes. Do not resurrect obsolete content to satisfy stale tests. |
| Lower | **118/121 pages omit `og:image`** because child metadata replaces the root Open Graph object. [Blog metadata](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/blog/[slug]/page.tsx:493). | Explicitly share OG fields and choose relevant article images. This improves previews; no ranking penalty is asserted. |
| Measure next | The priority header logo is **702,856 bytes**; autoplay homepage video is **5,000,012 bytes** with no poster specified. [Header](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/components/layout/Header.tsx:58), [video](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/src/app/page.tsx:174). | Resize/compress the logo and evaluate video loading and a poster on mobile. These are transfer-size observations, not measured Core Web Vitals failures. |
| Hygiene | `public/robots.txt` points to an old Netlify hostname, while generated production robots correctly points to the current domain. [Static file](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/public/robots.txt:4). | Retain one authoritative robots source. The live file is currently correct. |

## AEO guidance that affects priorities

The existing robots file permits major search crawlers. OAI-SearchBot governs ChatGPT search crawling; GPTBot is a separate training control. Allowing training bots is not required to enable OAI-SearchBot. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

Google's current guidance says special AI files, custom AI meta tags, and additional schema are unnecessary for its generative search visibility. Keep any optional files accurate, but prioritize accessible pages, reliable original information, and useful internal links. [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

FAQ text is useful to readers and the checked FAQ markup agrees with the visible answers. However, Google retired FAQ rich results on May 7, 2026; adding more FAQ markup is not a Google rich-result growth strategy. [Google documentation updates](https://developers.google.com/search/updates#may-2026). Likewise, the site's self-published LocalBusiness ratings should not be presented as eligibility for Google review stars. [Review snippet guidance](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

## What needs account data

This audit did not inspect Search Console, Bing Webmaster Tools, Business Profile management, analytics reports, or CDN access logs. It did not measure field Core Web Vitals or submit pages to the Rich Results Test. No claims are made about actual rankings, indexing counts, penalties, verified business details, or AI citation frequency.

The Netlify comments reference historical hacked URLs and past 5xx counts. Those counts were not verified. Current sampled removal responses are healthy; actual recovery requires Search Console indexing/crawl reports and Security Issues/Manual Actions review. Check submitted sitemaps, selected canonical URLs, representative orphan pages, and current generative search reporting. Confirm business phone, hours, office locations, and profile consistency with the business owner/account records.

The expanded [implementation plan](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/implementation-plan.md) sets the repair order, source changes, dependencies, and verification gates, including the additional form/CRM findings below.

## Follow-up: backend connections and repair plan

Source inspection found concrete connection defects beyond SEO navigation:

- **Quote forms can report success after CRM rejection.** `netlify/functions/lead.mts:147–154` logs a non-success GoHighLevel response and then returns HTTP 200 success. The form trusts that status. This is a confirmed failure-handling defect; actual lost inquiries were not measured.
- **Newsletter submissions do not subscribe or save anyone.** `src/components/forms/NewsletterForm.tsx:10–18` only validates the email and updates local React state.
- **Fast legitimate quote submissions can be discarded.** `src/components/forms/LeadForm.tsx:63–66` displays success without sending a request if completion takes under three seconds.
- **The workflow after contact creation is unverified.** The native form calls GHL's contact API, ignores the old regional form IDs, and uses one configured GHL location. Automations tied to the former embedded form may need a different trigger; neither failed notification nor incorrect account routing has been established.

A read-only GET to the deployed lead function returned the expected 405 JSON response. The endpoint is present. No lead was submitted or external notification sent. Dormant Supabase and email helper files are not the active delivery path.

The salesperson's wording, “the backend doesn't link,” is too vague to identify their exact claim. The evidence supports repairing the specific form, internal-link, data-consistency, and analytics defects documented here. It does not establish a missing backend as a whole or an external backlink problem.

See the [implementation plan](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/implementation-plan.md) for the full sequence, including thin-content decisions, CRM verification, static-export constraints, and release checks.

## Evidence and reproducibility

- [URL inventory](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/url-inventory.csv): all 169 sitemap URLs, status, title, canonical, H1 count, JSON-LD count, and HTML inbound-link count.
- [Link graph findings](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/link-graph.json): all zero-inbound and homepage-unreachable URLs.
- Raw response snapshots and inspection scripts: `/tmp/rangel-seo-aeo-20260911/` (temporary diagnostic files).
- Test command: `npm test -- src/__tests__/config/sitemap.test.ts src/__tests__/config/robots.test.ts src/__tests__/config/netlify.test.ts src/__tests__/seo/metadata.test.ts`.
