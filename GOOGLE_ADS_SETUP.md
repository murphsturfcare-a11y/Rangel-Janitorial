# Rangel Google Ads — current setup and launch handoff

Updated October 19, 2026. Account **Rangel Janitorial Services — 335-219-0709**. Both regional Search campaigns remain **paused at $41/day each, $82/day combined**, and Sacramento's copy error is repaired. The latest functional main commit, **`e8846754561ab9523463e4686ac07d94e2467c05`**, is live. Netlify's owner dashboard confirmed that the Free plan's operational-credit restriction was skipping production deploys; the owner restored credits, and production deployed successfully. A new, authorized Sacramento walkthrough TEST on this release reached exactly one GHL contact and Ralph's actual Inbox, and Tag Assistant showed the matching **Quote request accepted** Google Ads hit. Both regional website-call configurations were observed live. The misleading adjacent referral/Mailing List rows were corrected in all three regional owner-notification actions, and a fresh Sacramento TEST verified the corrected email in Ralph's Inbox. Google's own debug tool has now verified production number-replacement callbacks and opt-out restoration on both paid quote routes using its synthetic test number. **Both call assets are still Pending / Under review; actual Google forwarding-number allocation, routing and duration-qualified calls remain unverified**. Keep both campaigns paused until the remaining checks are complete.

## Current campaigns

| Campaign | Verified state | Targeting and destination |
| --- | --- | --- |
| **Walnut Creek \| Commercial Cleaning \| Search** — `23276474121` | **Paused; $41/day**. Commercial group `200010416623` has two saved RSAs; legacy **Call Rangel Janitorial**, `189652927115`, and its three obsolete call-only ads are individually paused. | **Walnut Creek, Concord, Martinez, Pleasant Hill**; Presence only. [Regional landing](https://rangeljanitorial.com/quote/walnut-creek); **(925) 655-9008**. |
| **Sacramento \| Commercial Cleaning \| Search** — `24373704449` | **Paused; $41/day; Bid strategy learning; no System error** after refresh. Commercial group `204376617514` enabled under the paused campaign; legacy group paused with its error flag cleared. | **Sacramento, Folsom, Rancho Cordova, Rocklin, Roseville, Downtown Sacramento, Midtown Sacramento**; Presence only. [Regional landing](https://rangeljanitorial.com/quote/sacramento); **(916) 426-2311**. |

Both campaigns use **Maximize clicks, Search only, Search partners off**, with **AI Max, broad match, and automatic assets off**. Final reread confirmed campaign-specific goals retain **Contacts** and include all three **Phone call leads** actions: **Calls from ads**, **Sacramento website calls**, and **Walnut Creek website calls**, with sources **Call from Ads + Website**; **Get directions is unchecked**. Both campaigns remained **paused at $41/day each**. Each commercial group has **15 enabled exact/phrase keywords**; Sacramento's nine copied East Bay terms remain paused. Both campaigns now have the **same 59 verified negative keywords: 58 phrase terms plus exact `[free cleaning]`**. All 11 original geographic targets are preserved; Downtown and Midtown are neighborhoods within Sacramento.

Account settings: **auto-tagging on, call reporting on, auto-apply off**. The last account-wide check showed six campaigns all paused or removed, none enabled. The temporary Sacramento status reset used paused ad groups as a serving guard; it was not a campaign launch.

## Website lead delivery and owner notification

The regional website wizard submits to the site's backend, which creates the contact in GHL with the regional source, facility/frequency details and tags. The existing published **Contact Form Submission** workflow uses **Contact created with regional-tag filtering** for this route, alongside its legacy **Form submitted** trigger. Tags are part of its routing/filter conditions; the observed website route should not be described as a standalone tag-added trigger.

The latest notification inspection found two adjacent rows: **How They Found Us** with a blank value, followed by an obsolete **Mailing List** row. That layout made the message misleading; the CRM itself contained no false Mailing List referral value. Only the three regional email actions were corrected in the existing workflow: the referral now uses `{{default contact.how_did_you_hear_about_us "Not provided"}}`, and the obsolete row is now **Lead Source** with `{{contact.source}}`. Recipients, triggers and the rest of the layout are preserved. The editor showed **Saved** with the **Publish** switch on; a fresh public-production Sacramento submission verified the published result in Ralph's Inbox with **How They Found Us: Not provided**, **Lead Source: Website - Sacramento**, and no Mailing List row. The same correction is saved in the Murrieta and Walnut Creek actions; the post-correction delivery test exercised Sacramento.

## Conversion measurement and call routing

| Item | Saved or verified state |
| --- | --- |
| **Quote request accepted** — `7367863185` | Primary; **One**; no value; data-driven; 30-day click-through window. Public destination: `AW-11465582021/SJyFCJHXorkbEMXLm9sq`. Current diagnostic is **Awaiting conversions**, replacing the earlier Misconfigured state. On the new live release, Tag Assistant's **Hits Sent** showed the exact destination and accepted backend UUID as the native Ads transaction ID, with restricted data processing `1` and no personal contact information in the hit. The direct website TEST establishes tag firing and delivery, not paid-click attribution or a reported attributed conversion. Do not also make GA4 `generate_lead` a primary action for the same lead. |
| **Calls from ads** — `6929057420` | Fresh Google Ads settings reread confirmed Primary; **One**; **60-second minimum**; no value; data-driven; **one-week click-through window**. Status is **Awaiting conversions**; the last-recorded tooltip refers to **November 23, 2025 at 7 AM**, not a current test. A 60-second call is a duration proxy, not proof of a qualified prospect. |
| Regional call assets | **(925) 655-9008** and **(916) 426-2311**, campaign-level associations; reporting on, recording off, account **Calls from ads** setting. **Monday–Friday, 00:00–00:00 Pacific** saved and reopened to confirm, matching the user's approved schedule. Both associations were rechecked at approximately **2026-10-20 00:46 UTC** (October 19, 7:46 PM Bogotá): still **Pending / Under review**, with both campaigns **paused at $41/day each**. |
| Sacramento website calls — `7857458879` | **Saved; Awaiting conversions.** Destination `AW-11465582021/oEuBCL-d3aIdEMXLm9sq` for **(916) 426-2311**. Primary; **One**; **60-second minimum**; no value; 30-day window; data-driven. Intended to measure actual calls through Google's forwarding number, not clicks. |
| Walnut Creek website calls — `7857459002` | **Saved; Awaiting conversions.** Destination `AW-11465582021/y8jtCLqe3aIdEMXLm9sq` for **(925) 655-9008**. Primary; **One**; **60-second minimum**; no value; 30-day window; data-driven. Intended to measure actual calls through Google's forwarding number, not clicks. |
| Website-call implementation and verification | **Live; both regional configurations observed in Tag Assistant, and Google's debug callback verified on both production quote routes.** The Sacramento and Walnut Creek labels and original regional numbers match their saved conversion actions. Both actions currently show **Awaiting conversions**. On quote routes, Google's callback updates the displayed phone and `tel:` destination together in the header and form-error fallback. Google's `#google-wcc-debug` Force test changed the visible header number to **(999) 999-9999** and the link to **tel:+19999999999** on both routes; opting out restored each correct regional number, and ordinary reloads retained the originals. This is a synthetic callback test, not a real forwarding number or call. Original numbers remain outside quote routes or when measurement is blocked, including GPC; opt-out clears `gwcc`, and stale/malformed callbacks are ignored. No phone-click conversion is sent. **Real Google forwarding-number allocation, call routing and duration-qualified reporting remain unverified.** |
| Location assets | **Turned off at campaign level** in both campaigns. The Sacramento Business Profile website points to Walnut Creek; no matching profile was found for the approved 925 number. The alternate **(925) 260-5002** and its hours must not replace the approved number or schedule. |

## Verified production release

- **Ready and published production:** main **`e8846754561ab9523463e4686ac07d94e2467c05`**, Netlify deploy **`6ad6b4cc49cd8d804cb70f9c`**, published **October 19, 2026 at 7:25:30 PM Bogotá time** (`2026-10-20T00:25:30.113Z`). Build completed in **44 seconds**, plugin state success. The site's published-deploy API and public routes agree. This release includes the walkthrough, restricted measurement and regional website-call code.
- **Deployment cause and resolution:** the authenticated **murphsturfcare** owner-team UI confirmed that Free-plan operational credits blocked production deploys. The owner completed the plan/credit change, clearing that restriction. The earlier “new one was scheduled for the same branch” message did not identify the true cause. Correcting GitHub attribution alone had not resolved the credit gate. CLI/newer-connector credentials belonged to the separate **tothemaxbase** team and exposed only public `rngl` metadata.
- **Live landing checks:** all three `/quote/` routes return **HTTP 200**, with only their correct regional telephone link: Murrieta **(951) 894-4222**, Sacramento **(916) 426-2311**, Walnut Creek **(925) 655-9008**. Owner-approved free **20-minute walkthrough**, no obligation, same-business-day response, documented checklists, supervisor/photo-verified inspections, a point of contact, and trained primary crews with backup coverage are published. The request form does not reserve a time; the team confirms it. Paid routes remain noindex and excluded from the organic sitemap.
- **Live measurement configuration:** production bundles contain `GTM-MB764DLF`, `AW-11465582021`, form label `SJyFCJHXorkbEMXLm9sq`, Sacramento call label `oEuBCL-d3aIdEMXLm9sq`, and Walnut Creek call label `y8jtCLqe3aIdEMXLm9sq`. Google defaults deny storage/data globally, with restricted US Ads defaults enabled unless the visitor opts out or sends GPC; personalization stays denied and restricted data processing is enabled. GA remains opt-in. Current-URL click IDs may go to Ads under its regional controls; the site's own stored click IDs/UTMs and CRM attribution still require explicit enablement. No automatic banner or extra advertising checkbox is shown; footer privacy settings remain available. GTM owns only the Ads base and conversion linker; the accepted-receipt native event remains the sole form-lead conversion event. No unconditional GTM noscript fallback is published.
- **Live form acknowledgment:** all three quote pages contain one required, initially unchecked acknowledgment. The new live TEST stored request type **walkthrough**, acknowledgment version **`request-followup-v1`**, privacy acknowledgment and request-specific phone/email follow-up. The acknowledgment does not grant advertising consent or promotional SMS permission. Form starts, submit clicks, an HTTP success alone, and unknown delivery responses do not count as accepted leads. Duplicate receipts are guarded.

## Assets and ad copy

**Two RSAs are saved in each commercial ad group**: the original quote angle and a second walkthrough/accountability angle, both reproduced below. Sacramento RSA IDs are `828526432044` and `828654544067`. Walnut Creek's original and walkthrough IDs are `828652168493` and `828528559830`, in commercial group `200010416623`. The latest review found **no disapprovals on the four current RSAs**; they cannot serve because their campaigns are paused. Regional call assets and business-name assets remain **Under review**. Saved inventory and Ad Strength do not establish performance.

Four account sitelinks were repaired from the staging domain to production: **Office Cleaning** → `/services/office-cleaning`; **Janitorial Services** → `/services/janitorial-cleaning`; **Commercial Floor Care** → `/services/floor-care`; **Day Porter Services** → `/services/day-porter`. Both campaigns have their regional **Free Walkthrough** sitelink saved and verified; the latest review showed **no remaining review flag** on these links.

The seven current account-level callouts are verified **Eligible**, including the replacement **Cleaning Quality Checks**. The legacy **Reliable & Affordable** and Sacramento “best team” callout associations are **paused at account, Sacramento campaign, and Walnut Creek campaign levels**, removing the inherited Sacramento claim from Walnut Creek. Google classified the cleaning-related **Photo-Verified Checks** callout under **Dating and Companionship**; the audit found its sole association among 31 inspected rows and confirmed it **paused**. Its replacement has cleared review.

Walnut Creek's aggregate **Most ads disapproved** warning includes the three paused legacy call-only ads marked **Update to call assets**. Both current RSAs' own text assets have no disapprovals. The aggregate warning has **not been proven cleared**; do not equate its existence with disapproval of the replacement RSAs or assert that all review issues are resolved.

The shared **Service catalog** structured snippet is **Eligible**, with **Office Cleaning, Janitorial Services, Floor Care, and Day Porter Services**. **No logo was saved:** the website scan found none. Images and other business-branding additions are not recorded as verified.

The two saved copy angles allow the original quote message and the owner's walkthrough/accountability offer to be evaluated after launch. No guarantees, instant booking, certifications, savings, ratings, or results were added beyond the owner's source. Matching landing content is now verified live; **keep campaigns paused until the remaining conversion, call-routing and review checks are complete**. “Best” must be evaluated against qualified inquiries, scheduled walkthroughs and customers, not asset counts or Ad Strength alone. Two RSAs are variation within Google's serving system, not a controlled experiment by themselves.

## Remaining launch work

1. Verify **real Google forwarding-number allocation, regional call routing and duration-qualified call reporting** independently of phone-button clicks. Both live regional configurations, Google's synthetic replacement callbacks and the form-conversion hit are verified; no actual paid-click attribution or qualifying call has yet been established. Direct calls to the original business numbers can check the destination answering/routing but cannot establish Google's forwarding or conversion reporting; the user-assisted direct-call check is pending. [Google's documented full test](https://support.google.com/google-ads/answer/6095883?hl=en) requires an eligible ad click. Both campaigns remain paused, so no new eligible ad interaction is available for that test. Do not activate them to work around this constraint. The remaining sequence is: confirm call-asset approval; verify direct regional destination routing; obtain an eligible Google-issued forwarding number when a separately authorized test becomes possible; confirm the displayed and dialed number match; complete a call exceeding the saved 60-second threshold; then inspect the corresponding Google call details and conversion report. A synthetic number or a direct call alone cannot complete those checks.
2. The **form, owner-notification delivery and corrected Sacramento email rendering are verified** on the published release. Preserve that working path while completing the call and policy checks. The separate delivered-email test confirmed the referral fallback and real Lead Source; no website source change was needed and correct CRM data was preserved. A direct website TEST does not establish a reported paid-click conversion.
3. Confirm final regional call-asset and business-name approvals, aggregate-warning status and regional call routing; assess appropriate images/logo. All four current RSAs have no disapprovals, the seven current callouts including the replacement are Eligible, and both walkthrough sitelinks have no remaining review flag. The service-catalog snippet, regional website-call actions, legacy-callout cleanup, and identical **59-negative** inventories are already saved and verified. Both campaign states were reread as **paused at $41/day each**; repeat that guard and review commercial/legacy inventory, geography and goals before any authorized launch. Do not count website phone-button clicks as leads.
4. Treat Maximize clicks as an initial traffic strategy. Review actual commercial queries and qualified outcomes before changing bidding or expanding reach. A CPC cap needs observed costs and business economics; no optimal bid is established here.

An average daily budget is not a strict daily ceiling: for most campaigns, the combined **$82/day** can permit **$164 on one day**, with a **$2,492.80 monthly spending limit** when unchanged for a full month. Do not infer historical spend from paused budgets or the account table's $0/day display.

## Evidence and historical limits

- **Current source verification:** all **831 tests across 73 files passed**. Scoped lint, TypeScript and the production build passed. Static-export verification passed with **128 indexable pages, three paid landing pages, 46 article mirrors and zero unreachable pages**. Functional source is unchanged since those checks. Production publication and live checks below independently establish release behavior; automated checks alone do not establish real Google-attributed conversions.
- **Production release and route proof:** [published main screenshot](/tmp/rangel-release-verification/latest-main-published.png), [three-route and linked-bundle verification](/tmp/rangel-live-release/static-verification.json). Live checks found the five expected public identifiers, correct regional numbers, walkthrough copy and required unchecked acknowledgment on each quote route.
- **New live Sacramento walkthrough TEST — PASS on `e884675`:** submitted through public `/quote/sacramento`. Exactly **one GHL contact** was found, source **Website - Sacramento**, with exactly `website-lead`, `location-sacramento`, `facility-office-building`, and `freq-weekly`. Request UUID **`e27e5efc-b4ba-48f9-85aa-eb7945b29336`** matched the acceptance receipt and Ralph's actual owner-inbox email. The server acknowledgment timestamp is **`2026-10-20T00:26:47.277Z`** (October 19, **7:26:47 PM Bogotá time**); contact creation is `00:26:47.490Z`. The contact stores the walkthrough request type, `request-followup-v1`, privacy acknowledgment and requested inquiry follow-up. No referral field value is present. [GHL evidence](/tmp/rangel-release-verification/ghl-test-result.json), [accepted walkthrough](/tmp/rangel-release-verification/live-walkthrough-accepted.png), [owner Inbox](/tmp/rangel-release-verification/owner-notification-delivered.png), [matching owner-email request reference](/tmp/rangel-release-verification/owner-request-reference.png).
- **Live Google Ads form hit — PASS for tag firing:** Tag Assistant's **Hits Sent** showed **Quote request accepted**, exact destination `AW-11465582021/SJyFCJHXorkbEMXLm9sq`, the matching transaction UUID above, restricted data processing **`1`**, and no personal contact information. [Accepted event and hit](/tmp/rangel-release-verification/accepted-event-and-hit.png), [Google Ads form hit](/tmp/rangel-release-verification/google-ads-form-hit.png). This was a controlled direct visit, not an actual ad click; it does not prove attributed conversion reporting. The current Ads diagnostic is **Awaiting conversions**, but its tooltip included earlier tag activity, so the status change is not attributed to this particular TEST: [diagnostic proof](/tmp/rangel-release-verification/quote-conversion-awaiting.png).
- **Post-correction Sacramento notification TEST — PASS:** a separate fresh production submission, **TEST Rangel Notification QA 20261019**, returned receipt **`ca5d1364-3d1b-4964-ada8-468c40ff4860`**, server timestamp **`2026-10-20T00:39:55.448Z`** (October 19, **7:39:55 PM Bogotá time**). Exactly **one matching GHL contact** was independently confirmed. Ralph's Inbox showed the fresh email at **7:40 PM** with that exact request reference, **How They Found Us: Not provided**, **Lead Source: Website - Sacramento**, and no Mailing List row. This verifies the saved workflow correction's actual rendered output for Sacramento. [Corrected owner notification](/tmp/rangel-release-verification/owner-notification-corrected.png).
- **Live regional call configurations — PASS for configuration:** Tag Assistant showed the correct original regional numbers and each exact saved label: [Sacramento](/tmp/rangel-release-verification/sacramento-live-call-tag.png), [Walnut Creek](/tmp/rangel-release-verification/walnut-live-call-tag.png). Actual forwarding-number replacement and 60-second call reporting remain unverified. [Conversion-action statuses](/tmp/rangel-release-verification/conversion-actions-status.png).
- **Call-asset review recheck — still pending:** at approximately **2026-10-20 00:46 UTC**, both campaign-level call associations remained **Pending / Under review**. Both campaigns remained **paused at $41/day each**, totaling **$82/day**. [Current asset review evidence](/tmp/rangel-call-verification/assets-still-under-review.png).
- **Fresh call-conversion settings reread — PASS for saved configuration:** all three actions were reopened in Google Ads and confirmed **Primary**, **One**, **60-second minimum**, **no value**, and **data-driven** attribution. **Calls from ads** has a **one-week** click-through window; both website-call actions have **30-day** windows. Sacramento's destination/display values are **9164262311 / (916) 426-2311**; Walnut Creek's are **9256559008 / (925) 655-9008**. Both website actions remain **Awaiting conversions** and are described as recently created. Calls from ads also shows **Awaiting conversions**, with historical last-recorded activity on **November 23, 2025 at 7 AM**; this does not establish a recent call or any current test result. [Sacramento settings](/tmp/rangel-call-verification/sacramento-conversion-settings.txt), [Walnut Creek settings](/tmp/rangel-call-verification/walnut-conversion-settings.txt), [Calls from ads settings](/tmp/rangel-call-verification/calls-from-ads-settings.txt).
- **Current-month call-report check:** Google Ads Report editor → Call details, **October 1–19, 2026**, with no added filters, displayed **No statistics match your filters**. No existing current-month call rows were available to verify routing or a qualifying conversion, and no fresh real call test was completed. The user-assisted direct-call check remains pending. [Call report screenshot](/tmp/rangel-call-verification/october-call-report.png), [report text](/tmp/rangel-call-verification/october-call-report.txt).
- **Google debug replacement — PASS for production callback mechanics only:** on both public quote routes, Google's `#google-wcc-debug` Force control supplied **(999) 999-9999** and **tel:+19999999999**; the displayed and dialed values matched. [Sacramento replacement](/tmp/rangel-call-verification/sacramento-synthetic-replacement.png), [Walnut Creek replacement](/tmp/rangel-call-verification/walnut-synthetic-replacement.png). Opting out restored **(916) 426-2311 / tel:+19164262311** for Sacramento and **(925) 655-9008 / tel:+19256559008** for Walnut Creek, and ordinary-route reloads retained each original. [Sacramento restoration](/tmp/rangel-call-verification/sacramento-opt-out-restores.txt), [Walnut Creek restoration](/tmp/rangel-call-verification/walnut-opt-out-restores.txt). The debugger became available after explicit measurement enablement and reload in the test browser, consistent with the site's denied defaults outside the US; US defaults differ. Restricted data processing remained enabled. The synthetic test did not allocate a real Google forwarding number, place a call, or establish an attributed conversion.
- **Sacramento copy repair:** View details showed **177 changes, 175 successful, 2 errors**, with the campaign error linked to failed copying of the legacy **Call Rangel Janitorial** group and its three ads. Both groups were paused before the temporary campaign enable; the UI showed Eligible (Learning), then the campaign was paused again. Group flag repair occurred under the paused campaign. Final refresh confirmed campaign paused, commercial enabled, legacy paused, no System error. [Final evidence](/tmp/rangel-ads-review/sacramento-system-error-fixed-paused.png); file existence independently verified at **107,309 bytes**.
- **Earlier authorized Sacramento TEST — historical PASS on `d3c9f7`:** submitted from the public `/quote/sacramento` hero. Verified **one GHL contact**, with website source and Sacramento region, carrying `website-lead`, `location-sacramento`, `facility-office-building`, and `freq-weekly`. Submission UUID **`e4bcc079-dc40-48fa-8f40-b26adabb7774`** matched Ralph's actual owner-inbox email in the same minute (**23:10:10Z** recorded). No ref tag was present. This older-build test is distinct from the new walkthrough TEST above and does not establish the newer build's behavior or Ads attribution.
- **Historical lead delivery:** an October 11, 2026 website lead was also verified in **GHL and owner Gmail in the same minute**. This is separate historical evidence, not a replacement for current-build validation or proof of Ads attribution.
- The conversion table showed zero conversions for September 22–October 19, 2026 at the earlier check. **Quote request accepted** is now **Awaiting conversions**, replacing the earlier missing-tag-ping/Misconfigured diagnostic. Both website-call actions also show **Awaiting conversions**. Direct, non-ad website tests do not establish Ads attribution. Local automated tests and pre-release browser QA used mocked CRM responses; both separately identified public-production tests above used real CRM and owner-email delivery.
- [Walnut call schedule](/tmp/rangel-ads-review/walnut-weekday-call-schedule.png), [Sacramento call schedule](/tmp/rangel-ads-review/sacramento-weekday-call-schedule.png), [account settings](/tmp/rangel-ads-review/account-auto-tagging.png).

## Saved copy and keyword appendix

## Sacramento responsive search ad — saved

Saved as RSA `828526432044` in **Commercial & Office Cleaning**, ad group `204376617514`, within the paused Sacramento campaign. Final URL: `https://rangeljanitorial.com/quote/sacramento`. All 15 headlines are at most 30 characters; all four descriptions are at most 90 characters. No pinning is prescribed.

### Headlines

1. Sacramento Office Cleaning
2. Sacramento Janitorial
3. Commercial Cleaning Services
4. Recurring Office Cleaning
5. Your Facility. Your Schedule.
6. Request Your Free Quote
7. Rangel Janitorial
8. Folsom Office Cleaning
9. Roseville Office Cleaning
10. Rocklin Office Cleaning
11. Rancho Cordova Office Cleaning
12. Downtown Office Cleaning
13. Midtown Office Cleaning
14. Need A New Janitorial Team?
15. Office Floors & Common Areas

### Descriptions

1. Recurring office cleaning in Sacramento. Discuss your facility and preferred schedule.
2. Choose your facility and cleaning schedule. Request a free quote, with no obligation.
3. Workspaces, lobbies, restrooms, break rooms and floor care. Tell us what needs cleaning.
4. Serving Folsom, Roseville, Rocklin and Rancho Cordova. Talk with our Sacramento team.

### Saved exact and phrase keywords

These 15 keywords are enabled: six general commercial terms and nine Sacramento-region terms. Nine copied East Bay terms are paused. Square brackets indicate exact match; quotation marks indicate phrase match.

```text
[office cleaning sacramento]
"commercial cleaning sacramento"
[janitorial services sacramento]
"recurring office cleaning"
"commercial janitorial services"
"office cleaning company"
[office cleaning folsom]
[office cleaning rancho cordova]
[office cleaning rocklin]
[office cleaning roseville]
"office cleaning downtown sacramento"
"office cleaning midtown sacramento"
"commercial cleaning near me"
"office cleaning services near me"
"janitorial cleaning company"
```

## Walnut Creek responsive search ad — saved

Saved as RSA `828652168493` in **Commercial & Office Cleaning**, ad group `200010416623`, within the paused existing campaign. Final URL: `https://rangeljanitorial.com/quote/walnut-creek`. All 15 headlines are at most 30 characters; all four descriptions are at most 90 characters. No pinning is prescribed.

### Headlines

1. Walnut Creek Office Cleaning
2. Walnut Creek Janitorial
3. Commercial Cleaning Services
4. Recurring Office Cleaning
5. Your Facility. Your Schedule.
6. Request Your Free Quote
7. Rangel Janitorial
8. Concord Office Cleaning
9. Martinez Office Cleaning
10. Pleasant Hill Office Cleaning
11. Janitorial For Your Workplace
12. Cleaning For Local Businesses
13. Need A New Janitorial Team?
14. Office Floors & Common Areas
15. Offices, Lobbies & Break Rooms

### Descriptions

1. Office cleaning in Walnut Creek, Concord, Martinez and Pleasant Hill. Request a quote.
2. Choose your facility and cleaning schedule. Request a free quote, with no obligation.
3. Ongoing cleaning for offices and commercial facilities. Discuss scope and frequency.
4. Need a new janitorial team? Tell us about your workplace and the cleaning tasks you need.

### Saved exact and phrase keywords

```text
[office cleaning walnut creek]
"commercial cleaning walnut creek"
[janitorial services walnut creek]
[office cleaning concord]
"commercial cleaning concord"
[office cleaning martinez]
"commercial cleaning martinez"
[office cleaning pleasant hill]
"commercial cleaning pleasant hill"
"recurring office cleaning"
"commercial janitorial services"
"office cleaning company"
"office cleaning services near me"
"commercial cleaning near me"
"janitorial cleaning company"
```

## Second responsive search ads — walkthrough and accountability, saved

Both second RSAs use their regional `/quote/` landing page and display path 2 **`walkthrough`**. Sacramento RSA `828654544067` is in commercial group `204376617514`; Walnut Creek RSA `828528559830` is in group `200010416623`. Both are enabled at ad level, have no current disapprovals, and are ineligible to serve because their campaigns remain paused.

### Shared headlines in each second RSA

1. Commercial Cleaning Services
2. Free 20-Minute Walkthrough
3. Cleaning With Accountability
4. Documented Cleaning Checklists
5. Supervisor Inspections
6. Photo-Verified Inspections
7. A Real Point Of Contact
8. Trained Crews. Backup Coverage
9. Same Business Day Response
10. Rangel Janitorial
11. Recurring Office Cleaning

### Four additional Sacramento headlines

12. Sacramento Office Cleaning
13. Sacramento Janitorial
14. Folsom Office Cleaning
15. Rancho Cordova Office Cleaning

### Sacramento descriptions

1. Recurring office cleaning in Sacramento. Request a free 20-minute walkthrough.
2. Serving Folsom, Roseville, Rocklin and Rancho Cordova. We confirm your walkthrough time.
3. Documented checklists, supervisor inspections and photo-verified quality checks.
4. Trained crews, backup coverage and a real point of contact. Response same business day.

### Four additional Walnut Creek headlines

12. Walnut Creek Office Cleaning
13. Concord Office Cleaning
14. Martinez Office Cleaning
15. Pleasant Hill Office Cleaning

### Walnut Creek descriptions

1. Office cleaning in Walnut Creek, Concord, Martinez and Pleasant Hill. Free walkthrough.
2. Request a free 20-minute walkthrough. We'll confirm a time to discuss your facility.
3. Documented checklists, supervisor inspections and photo-verified quality checks.
4. Trained crews, backup coverage and a real point of contact. Response same business day.

## Shared negative keyword reference

The final audit confirms **59 identical saved negatives per campaign: 58 preserved phrase-match terms and exact-match `[free cleaning]`**. Removed phrase entries were `hiring cleaners`, `free cleaning`, `kitchen cleaning`, and a capitalization duplicate. This avoids suppressing relevant searches such as hiring a commercial cleaner or requesting a free cleaning quote while retaining the narrower exact exclusion. Both campaigns remained paused at **$41/day each** after the correction. The following 26-entry reference set informed the rebuild and is not the complete saved list.

```text
"job"
"jobs"
"career"
"careers"
"employment"
"salary"
"salaries"
"resume"
"now hiring"
"do it yourself"
"how to clean"
"cleaning tips"
"cleaning course"
"cleaning courses"
"janitorial training"
"cleaning supplies"
"janitorial supplies"
"cleaning products"
"cleaning equipment for sale"
"equipment rental"
"house cleaning"
"home cleaning"
"maid service"
"maid services"
"airbnb cleaning"
"residential house cleaning"
```

Review actual search terms before expanding these exclusions. Do not blanket-exclude `free`, `hiring`, `floor`, `medical`, `apartment`, or `residential`: they can occur in relevant commercial quote, facility, or property-management searches. For example, `hiring an office cleaning company` and `free commercial cleaning quote` are relevant intents.

## Official references

- [Call-only migration dates](https://support.google.com/google-ads/answer/16598240)
- [Phone verification policy](https://support.google.com/adspolicy/answer/16428224?hl=en)
- [Call-ad phone and verification URL fields](https://support.google.com/google-ads/answer/6341403?hl=en)
- [Call assets and location phone precedence](https://support.google.com/google-ads/answer/2453991?hl=en)
- [Call conversions](https://support.google.com/google-ads/answer/6100664)
- [Average daily budgets and spending limits](https://support.google.com/google-ads/answer/10486637)
- [Primary and secondary conversions](https://support.google.com/google-ads/answer/11461796?hl=en)
- [High-quality lead measurement](https://support.google.com/google-ads/answer/13489421?hl=en)
- [Location targeting options](https://support.google.com/google-ads/answer/9376662)
- [Copy-error troubleshooting](https://support.google.com/google-ads/answer/9475438)
- [Campaign status and paused child entities](https://support.google.com/google-ads/answer/2404259?hl=en)


## Owner email and lead-source improvements — 2026-10-21

- Published all three regional internal email actions in the existing Contact Form Submission workflow. Sender name is Rangel Janitorial Leads; sender uses Rangel's business address rather than the lead's address. Existing recipients, regional triggers, SMS actions, and campaign states were preserved.
- Email subjects include region, contact source, and contact name. The layout has a source panel, contact details, call/email links, facility/frequency, customer message, and a working contact-record link. Table/cell styling and nested text spans survive HighLevel's rich-text normalization; actual inbox rendering verified.
- Created the contact field Website Request Details. The local handler now stores request reference, page/form, attribution evidence, and acknowledgment details there, while Questions / Comments contains only customer notes.
- Local website source classification supports Google Ads, explicitly identified Organic Search, other Paid campaign, and Website (organic/direct). Regional and channel tags support filtering. A current-request hint carries only fixed channel/evidence enums; actual click-ID and campaign storage retain the existing consent behavior. An untagged visit is not proof of organic search, and a submitted source label is not verified ad attribution.
- Four clearly labeled QA contacts were accepted through the current local handler into the live Rangel sub-account. The three regional tests exercised simulated Google Ads / website / organic labels; all three owner emails reached Ralph's inbox. CRM readback confirmed correct source/tags, clean notes, and separate request metadata. A fourth test confirmed the corrected sender. The delivered CRM link opened its matching QA contact. These tests did not execute browser Google Ads conversion events and do not prove actual paid-click attribution or call routing.
- Verification: scoped ESLint, TypeScript/production build, export audit (128 indexable pages and three paid landing pages), and static-export credential scan passed. New website and landing-page changes remain local and unpublished pending an authorized push/deploy. Templates and the new CRM field are live.
- Intake remains browser form → same-origin Netlify lead function → HighLevel contacts API using server-only GHL_API_KEY and GHL_LOCATION_ID. Rangel's separate Make account is not part of this path. Credentials are present in the ignored local environment and were verified against this sub-account without being printed or exported. No credential was changed.
