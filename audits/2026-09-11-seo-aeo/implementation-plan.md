# Rangel Janitorial — SEO, AEO, and backend repair plan

Prepared September 11, 2026 for [rangeljanitorial.com](https://rangeljanitorial.com). Based on the live crawl of 169 sitemap URLs, source inspection at commit `a0a090b`, targeted tests, and follow-up tracing of forms, CRM integration, and analytics.

**Implementation update:** The technical repairs below are built locally. See [implementation results](implementation-results.md) for current changes, verification, and remaining content/account work. The finding tables below describe the original audit baseline. Nothing has been deployed.

**Outcome:** Make inquiries reach their intended destination, make every retained page discoverable, and make visible content and machine-readable business information agree. Preserve the existing Next.js static site, Netlify hosting/functions, GoHighLevel integration, and separate regional phone numbers.

The salesperson's phrase **“the backend doesn't link” is not a precise diagnosis**. We found specific connection defects that could explain it. We have not established what that person meant, and have not measured external backlink quality.

## Decisions and work already completed

The owner selected the number on the Murrieta location page. The approved regional numbers are:

| Region | Public phone |
|---|---|
| Murrieta / Inland Empire | **(951) 894-4222** |
| Sacramento | **(916) 426-2311** |
| Walnut Creek / East Bay | **(925) 655-9008** |

The approved numbers now derive from shared business/region records across pages, schemas, phone links, and generated text. These changes are **not deployed**. Unrelated working changes were preserved; the non-editorial generation timestamp was removed during the deterministic text-generator refactor.

Office hours still require authoritative business information. The conflicting hours from the original company/schema and AI records have been omitted pending confirmation. Separate regional numbers are intentional; they are not an SEO defect. The owner confirmed there is **no newsletter**; collection and subscription events have been removed.

## What is actually disconnected

| Finding | Evidence | Consequence |
|---|---|---|
| CRM errors become apparent success | `netlify/functions/lead.mts:147–154` logs a rejected GoHighLevel response, then returns success. `LeadForm.tsx:89–93` trusts the HTTP status. | A rejected inquiry can still display “Quote Request Received.” Actual lost inquiries were not measured. |
| Newsletter has no subscription destination | `NewsletterForm.tsx:10–18` only validates an email and changes React state. | The footer promises subscription without sending or saving the address. |
| Fast quote submissions are discarded | `LeadForm.tsx:63–66` displays success when completion takes under three seconds. | Legitimate autofill or assisted submissions can be dropped. |
| CRM workflow handoff is unverified | Regional form IDs are submitted but ignored. The function creates a contact in one configured GHL location. | Workflows triggered by the former embedded GHL form may need different triggers. One shared CRM account may be intentional. |
| Measurement code is not connected | GA/GTM components and conversion helpers have no active application call sites. | Organic inquiries, phone clicks, and conversion outcomes cannot be credited to those integrations. |
| Internal links omit retained pages | 42 HTML pages have no inbound HTML anchors; 71 are unreachable from home in the captured graph. | Discovery depends more heavily on the sitemap and other sources. This does not establish non-indexation. |

The quote function exists in production: a read-only GET to `/.netlify/functions/lead` returns the expected **405 Method not allowed** JSON response. No lead was submitted and CRM delivery has not been verified.

```text
Website quote CTA → regional page → Netlify lead function → GHL contact API
                                                              ↓
                                                workflow / office assignment
                                                              ↓
                                                   staff notification
```

The source confirms the path through the API call; the final workflow and delivery steps require account verification. Dormant Supabase migrations and console-only email helpers are not the active quote backend and should not be activated just because they exist.

## Implementation order

| Stage | Deliverable | Completion gate |
|---|---|---|
| 1 — Inquiry reliability | Honest form responses, server validation, timeouts, correct regional routing, usable error recovery | Rejected/unknown CRM outcomes never appear as received; accepted inquiries follow the verified workflow |
| 2 — Shared business and content records | One source for regional facts, routes, article metadata, and machine-readable exports | Website, schema, sitemap, and generated text agree |
| 3 — Discovery and URL behavior | Complete regional links, static blog pagination, canonical and redirect repair | Every retained HTML page is reachable from home without JavaScript; URLs resolve as intended |
| 4 — Metadata, schema, and generated files | Consistent entities, real dates, complete previews, reconciled mirrors | Exported pages and deployed headers pass the checks below |
| 5 — Content quality | Useful distinct city pages and reviewed service/article answers | Each retained page serves a clear need supported by truthful information |
| 6 — Measurement and performance | One verified analytics path; measured and reduced asset costs | Accepted leads are counted once; consent and mobile behavior are verified |
| 7 — Release and search validation | Reviewed changes, passing export/browser checks, preview and production verification | Technical gates pass; account reports establish indexing and delivery outcomes |

Stage 1's false-success fix can proceed before the broader data refactor. Business/content consolidation supports stages 3–4. Editorial work and account checks can run alongside engineering; unconfirmed business facts must not be invented to unblock them.

## 1. Repair the inquiry and subscription flows

Primary files: `netlify/functions/lead.mts`, `src/components/forms/LeadForm.tsx`, `src/components/forms/NewsletterForm.tsx`, `src/components/layout/Footer.tsx`, and regional page form props.

- Return success only after the provider accepts the request and its documented response confirms acceptance. Validate the response body in the browser as well as the HTTP status. Add a bounded upstream timeout, safe error codes, redacted diagnostics, and a correlation/submission ID.
- Preserve entered information on failure. Offer retry and the correct regional click-to-call fallback. Remove the rule that treats completion under three seconds as success. Give both form instances unique input IDs and accessible error/status announcements.
- Submit an allowlisted `regionSlug`, form placement, source page, and bounded contact/service fields. Derive routing and tags on the server. Verify whether regions share a GHL account or require separate destinations; do not equate different public phones with different CRM accounts.
- Move meaningful abuse protection to the server: validate the honeypot and field limits, and use a supported platform or shared rate limiter. The unused process-local limiter is insufficient across serverless instances.
- Confirm GHL custom fields, duplicate-contact settings, and the workflow trigger for contact creation. A contact API call does not inherently submit the old GHL form. Pin and test a supported API contract before changing the current API version. If using upsert, preserve existing tags and CRM history.
- Treat timeout-after-send as an uncertain outcome. Avoid blind POST retries that can duplicate contacts or notifications. Establish the provider's duplicate behavior and the submission receipt policy first; add durable state only if the required delivery semantics justify it.
- Replace the newsletter's misleading collection with a plain contact/resources CTA immediately unless an actual mailing program is confirmed. If the program exists, connect the real list/provider and show its documented subscribed or pending-confirmation state. Do not silently subscribe quote leads to marketing.

**Tests:** accepted response; provider 400/401/429/500; timeout/network failure; malformed response; missing configuration; invalid region; duplicate/retry behavior; fast legitimate input; both form placements. Direct requests must not bypass server abuse controls; invalid field types, oversized payloads, and invalid regions must never reach GHL. Failed or uncertain outcomes must emit no successful-lead event. A controlled sandbox test per region must verify assignment and test notification, beyond contact creation. Any production test that notifies staff needs an agreed test recipient and delivery arrangement.

Preview browser tests need an explicitly allowed preview origin and a sandbox CRM destination with real staff notifications disabled. The current origin allowlist excludes deployment previews. Allow only the intended preview environment rather than every Netlify origin, and direct test notifications to the sandbox test recipient.

## 2. Consolidate the facts and route inventory

Regional facts currently repeat in `src/data/company.ts`, `src/data/locations.ts`, regional and city page files, the sitemap, and the text generator. Blog archive summaries and active article records are also separate and disagree on dates.

Create small shared, runtime-neutral records that both Next and the Node generator can import, using JSON or `.mjs` with types/JSDoc. These records should hold approved phones and `tel:` values, verified office details, region/city slugs, service relationships, article metadata, and verified publication/modification dates. Public records must not contain CRM credentials; private routing configuration stays server-side.

Extract the **active** article metadata from `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, and `src/content/location-posts.ts`. Do not adopt the stale three-post `src/data/blog.ts` as the authority. Derive route constants and generated indexes from the active registry. Keep article bodies server-side and pass only summaries into the client archive.

**Gate:** every retained record maps to one intended route, every route has its intended content, and all surfaces use the approved regional facts. Unknown dates or office details remain omitted until verified.

## 3. Make the whole retained site crawlable

- Generate each regional hub's city links from the actual route registry. The baseline is Sacramento 21, Murrieta 20, and Walnut Creek 20 city routes; the hubs currently expose only 9, 11, and 8 respectively.
- Give city pages contextual links to their region, relevant service pages, and useful guides. Add accessible footer links to both legal pages.
- Replace the unfiltered blog archive's state-only pagination with static pages and normal anchors. With all 46 posts retained at six per page, use `/blog` and `/blog/page/2` through `/blog/page/8`. Derive the page count from content.
- Add `src/app/blog/page/[page]/page.tsx` with `generateStaticParams`; await Next 16's promise-based params. Share archive presentation. Each page must emit its own article slice, title, and self-canonical. Normalize `/blog/page/1` to `/blog`; invalid pages return 404. Category/search controls can remain enhancements without hiding unfiltered archive discovery.
- Make `src/app/page.tsx` a server wrapper with homepage metadata; move the existing client presentation to `HomeContent.tsx`. Keep the root layout free of a canonical that could leak into child pages.
- Repair Netlify `.html` aliases and the unsupported legacy search-query rule. Retain targeted 410 behavior for obsolete WordPress routes; preserve legitimate campaign parameters. Test clean URLs and aliases together to catch Pretty URL redirect loops.

**Gate:** zero retained HTML pages unreachable from home through initial HTML anchors, zero broken internal destinations, and one appropriate canonical per page. Sitemap discovery alone does not satisfy the internal-link gate.

## 4. Repair machine-readable output

Use the existing `src/lib/seo/metadata.ts`, `src/lib/seo/schema.ts`, and escaping `src/components/seo/JsonLd.tsx` where useful, but connect them to actual production pages rather than leaving them as test-only helpers.

- Append the brand once. Differentiate the region hub from the same-named city page by purpose and title, or evaluate consolidation using content and search evidence.
- Explicitly merge shared Open Graph/Twitter fields into child metadata. Next's shallow merge currently leaves 118 of 121 pages without `og:image`. Verify the selected image URLs.
- Replace root `next/script` business schema with native server-emitted JSON-LD. Establish stable organization and verified office IDs; reference those entities from articles and services. Describe coverage cities through service areas rather than implying an office in every city.
- Check addresses, service claims, testimonials, author identity, and profile links against real business records. Keep useful visible FAQs. Do not promise Google review stars from self-published business ratings or use FAQ markup as a growth shortcut.
- Reconcile archive/article dates and store ISO dates separately from their human display format. All 46 articles currently use display strings in machine date fields; some archive dates also disagree with their articles. Do not fabricate publication history or replace every modification date with build time.
- Update `scripts/generate-llm-files.mjs` to read shared records, fail on missing/duplicate articles, and reconcile only files it owns. Retire or deliberately redirect the two stale carpet-cleaning Markdown mirrors and repair references to retired services.
- Keep the search sitemap focused on preferred retained HTML URLs. Remove Markdown mirrors and the two optional LLM text files from it. Use actual significant `lastmod` dates or omit unknown dates.
- Generate explicit per-mirror HTTP canonical `Link` headers in `public/_headers`, pointing to valid HTML originals; remove overlapping header rules from `netlify.toml`. Verify actual Netlify responses rather than assuming wildcard substitution works in header values.
- Keep `src/app/robots.ts` authoritative and reconcile the stale static robots file. Keep search-crawler controls separate from training-crawler preferences.

**Gate:** complete and consistent initial-HTML entities, valid machine dates, one canonical per HTML page, valid mirror canonical headers, no stale generated articles, and a sitemap matching the retained HTML manifest. Current URL counts are audit baselines, not permanent test assertions.

## 5. Address thin and repetitive content

The main issue is **61 city pages sharing the same normalized main text**, mostly about 281–296 words. Service pages and regional hubs contain more substantial content; the 46 articles vary in depth. This is not a finding that the whole site is thin, and word count alone is not the acceptance criterion.

Create a disposition for each city page: **improve and retain**, **consolidate into a relevant page**, or **retire**. Keep existing URLs during the technical repair until content and available Search Console/backlink evidence support a change. Avoid mass deletion or arbitrary word targets.

For a retained city page, require a clear local service purpose and useful information beyond replacing city names: verified coverage and scheduling details, facility types actually served, service scope and exclusions, a real project or operational example where available, relevant first-party photos, and answers to local customers' practical questions. Do not invent jobs, addresses, testimonials, qualifications, or local conditions. Where no distinct value can be supported, a strong regional page may be the better destination.

For services and articles, make the main question and direct answer easy to find, followed by concrete scope, process, limitations, and next steps. Review advice and credentials with a knowledgeable business representative. Link related answers naturally, identify real authors/reviewers where appropriate, and update content when facts change. Validate both factual accuracy and usefulness before adding schema.

**Gate:** each retained page has a documented purpose and supported information that helps its intended visitor. Redirect consolidated URLs only to genuinely relevant replacements; use 404/410 when no suitable replacement exists. Update internal links, schema, sitemap, and mirrors with the same decision.

## 6. Connect measurement and measure performance

Use one analytics delivery path, preferably the existing direct GA4 component once its property is verified. Do not mount both GA and GTM implementations unchanged. Fix consent initialization and restore saved choices before event delivery. Keep contact PII out of analytics.

Record quote starts, accepted `generate_lead` events, region, form placement, and phone clicks. A phone click is not a connected call. Preserve permitted attribution through regional navigation and into CRM. Remove the helpers' arbitrary EUR conversion values; use a genuine business value only if established. Verify one accepted inquiry produces one event and errors produce none.

The logo transfers about 703 KB and the autoplay hero video about 5 MB. Optimize responsive logo assets, provide a video poster, and evaluate loading behavior on mobile and reduced-motion connections/preferences. Keep the static-export architecture; Next's default server image optimization cannot simply be enabled without a compatible loader or hosting change.

Capture mobile lab measurements and available field data before/after changes. Verify layout, readability, and form interaction as well as loading. Asset sizes are confirmed; current Core Web Vitals failures have not been established.

## 7. Test, release, and verify account outcomes

The targeted SEO baseline had **13 failed tests, 38 passed tests, and one suite-load failure**. Repair outdated route expectations and the Netlify test's incorrect project path. Do not revive retired turf/service pages to satisfy stale assertions. Add checks of actual exported HTML using existing dependencies.

| Layer | Required verification |
|---|---|
| Source/contracts | Lead success/error contract, region allowlist, duplicate behavior, safe diagnostics, generated content completeness |
| Clean static export | Build, type/lint and relevant tests; repeated generation is stable; every retained route exists |
| Exported HTML | Home reachability, canonical/title rules, regional facts, ISO dates, schema references, OG images, no accidental noindex |
| Browser | JavaScript-disabled navigation, all blog archive pages, mobile CTAs, both quote forms, accessible errors, consent persistence and one conversion per accepted inquiry |
| Netlify preview | Function responses, redirects/query handling, unknown 404 and retired 410 routes, mirror headers, no loops; preview-only noindex protection |
| Production | Recheck deployed phone files and representative page families, headers, forms and asset loading; production must remain indexable |
| Accounts | GHL routing/workflows, Search Console indexing/canonicals/security/manual actions, sitemap submission, Bing Webmaster Tools, business profiles, analytics attribution |

The project uses `output: "export"`; use build-time generation and Netlify hosting rules, not unsupported request-time Next features. The local Netlify site ID is present, but remote deployment binding is unverified. Git has two differently named remotes, including an origin URL named `murphys-turf`; resolve the actual repository/site binding before pushing or deploying.

Implement in reviewable commits. Complete code review, QA, and focused security review before release. Validate a preview, preserve a known prior deployment for rollback, then deploy and recheck production. Review crawl/indexing and delivery results after release and again as search systems recrawl; this plan does not create a scheduled monitor.

The remaining business/account inputs are office hours and actual office identities, historical article dates where conflicting, real local evidence, CRM routing/workflows, newsletter intent, and analytics/search account configuration. They do not block fixing the confirmed false-success behavior or crawlable navigation.

**Completion means passing the technical and content gates above.** Indexing, rankings, and AI citations remain decisions made by search/answer systems and must be measured, not promised.

## Evidence and implementation references

- [Full audit](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/audit.md), [URL inventory](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/url-inventory.csv), and [link graph](/Users/wififunded/ralph/rangel-janitorial/rangel-janitorial/audits/2026-09-11-seo-aeo/link-graph.json).
- Google: [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [article dates](https://developers.google.com/search/docs/appearance/structured-data/article), and [sitemap lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- Google: [AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [review snippet eligibility](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), and [FAQ rich-result retirement](https://developers.google.com/search/updates#may-2026). Special AI files or additional schema are not required for Google's generative search visibility.
- OpenAI: [crawler roles and controls](https://developers.openai.com/api/docs/bots).
- GoHighLevel: [upsert behavior](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/index.html) and [contact API versions](https://marketplace.gohighlevel.com/docs/ghl/contacts/contacts-api-v-3/). Verify compatibility with the existing integration before adopting a different API contract.
- Installed Next 16.2 documentation consulted: `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` and `node_modules/next/dist/docs/01-app/02-guides/json-ld.md`.
