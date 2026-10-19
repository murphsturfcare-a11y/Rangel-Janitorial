# Rangel Google Ads — current setup and launch handoff

Updated October 19, 2026. Account **Rangel Janitorial Services — 335-219-0709**. Both regional Search campaigns are **paused at $41/day each, $82/day combined**, and Sacramento's copy error is repaired. Each region now has two saved responsive search ads plus a regional call asset and Free Walkthrough sitelink; shared callouts and a service-catalog snippet are saved. The **authorized Sacramento TEST reached GHL and Ralph's actual Inbox on the older production build**. Main is pushed, but Netlify continues to skip builds, including the non-empty `1540508` push with the corrected GitHub identity. Authenticated Netlify queue/settings access is required; the new landing and tracking behavior is **not yet verified live**.

## Current campaigns

| Campaign | Verified state | Targeting and destination |
| --- | --- | --- |
| **Walnut Creek \| Commercial Cleaning \| Search** — `23276474121` | **Paused; $41/day**. Commercial group `200010416623` has two saved RSAs; legacy **Call Rangel Janitorial**, `189652927115`, and its three obsolete call-only ads are individually paused. | **Walnut Creek, Concord, Martinez, Pleasant Hill**; Presence only. [Regional landing](https://rangeljanitorial.com/quote/walnut-creek); **(925) 655-9008**. |
| **Sacramento \| Commercial Cleaning \| Search** — `24373704449` | **Paused; $41/day; Bid strategy learning; no System error** after refresh. Commercial group `204376617514` enabled under the paused campaign; legacy group paused with its error flag cleared. | **Sacramento, Folsom, Rancho Cordova, Rocklin, Roseville, Downtown Sacramento, Midtown Sacramento**; Presence only. [Regional landing](https://rangeljanitorial.com/quote/sacramento); **(916) 426-2311**. |

Both campaigns use **Maximize clicks, Search only, Search partners off**, with **AI Max, broad match, and automatic assets off**. Final reread confirmed campaign-specific goals retain **Contacts** and include all three **Phone call leads** actions: **Calls from ads**, **Sacramento website calls**, and **Walnut Creek website calls**, with sources **Call from Ads + Website**; **Get directions is unchecked**. Both campaigns remained **paused at $41/day each**. Each commercial group has **15 enabled exact/phrase keywords**; Sacramento's nine copied East Bay terms remain paused. Both campaigns now have the **same 59 verified negative keywords: 58 phrase terms plus exact `[free cleaning]`**. All 11 original geographic targets are preserved; Downtown and Midtown are neighborhoods within Sacramento.

Account settings: **auto-tagging on, call reporting on, auto-apply off**. The last account-wide check showed six campaigns all paused or removed, none enabled. The temporary Sacramento status reset used paused ad groups as a serving guard; it was not a campaign launch.

## Conversion measurement and call routing

| Item | Saved or verified state |
| --- | --- |
| **Quote request accepted** — `7367863185` | Primary; **One**; no value; data-driven; 30-day click-through window. Public destination: `AW-11465582021/SJyFCJHXorkbEMXLm9sq`. Current diagnostic is **Misconfigured: never received a tag ping or attribution data**. Accepted backend UUID is the native Ads transaction ID. The direct website TEST does not establish Ads attribution or clear that diagnostic. Do not also make GA4 `generate_lead` a primary action for the same lead. |
| **Calls from ads** — `6929057420` | Primary; **One**; **60-second minimum**; no value; data-driven. A 60-second call is a duration proxy, not proof of a qualified prospect. |
| Regional call assets | **(925) 655-9008** and **(916) 426-2311**, campaign-level associations; reporting on, recording off, account **Calls from ads** setting. **Monday–Friday, 00:00–00:00 Pacific** saved and reopened to confirm, matching the user's approved schedule. Last recorded association statuses: **Pending / Under review**. |
| Sacramento website calls — `7857458879` | **Saved; Awaiting conversions.** Destination `AW-11465582021/oEuBCL-d3aIdEMXLm9sq` for **(916) 426-2311**. Primary; **One**; **60-second minimum**; no value; 30-day window; data-driven. Intended to measure actual calls through Google's forwarding number, not clicks. |
| Walnut Creek website calls — `7857459002` | **Saved; Awaiting conversions.** Destination `AW-11465582021/y8jtCLqe3aIdEMXLm9sq` for **(925) 655-9008**. Primary; **One**; **60-second minimum**; no value; 30-day window; data-driven. Intended to measure actual calls through Google's forwarding number, not clicks. |
| Website-call implementation and verification | **Implemented in source; not yet live.** The website-call goal diagnostics remain **Inactive / Unverified**, pending tag activity. On quote routes, Google's callback updates the displayed phone and `tel:` destination together in the header and form-error fallback. Original numbers remain outside quote routes or when measurement is blocked, including GPC; opt-out clears `gwcc`, and stale/malformed callbacks are ignored. No phone-click conversion is sent. Neither live number replacement nor a duration-qualified website call has been verified. |
| Location assets | **Turned off at campaign level** in both campaigns. The Sacramento Business Profile website points to Walnut Creek; no matching profile was found for the approved 925 number. The alternate **(925) 260-5002** and its hours must not replace the approved number or schedule. |

## Website source versus production

- **Last verified ready production:** main `d3c9f72455b777924e0d1329ca0b84c9dfd6ee37`, exact Netlify deploy `6ad691747cf772d73b3d849e`. Its public Ads identifiers are present. This release predates the latest walkthrough and restricted-measurement work.
- **Functional source:** `a5df5c4` contains the walkthrough and restricted-measurement changes. It remains unreleased. Retry `fe689f5` did not establish a ready deployment.
- **Last deployment checkpoint checked before this update:** `1540508` is a non-empty documentation commit after identity retry `d243199`, using the corrected owner GitHub identity, **tothemax-media**. Netlify still skips that build. Authenticated access to the site's private deployment queue/settings is needed to diagnose the skipped state; another Git push or corrected identity alone does not establish a successful production release.
- **Current main landing behavior:** owner-approved free **20-minute walkthrough**, no obligation, same-business-day response, documented checklists, supervisor/photo-verified inspections, a point of contact, and trained primary crews with backup coverage. The request form does not reserve a time; the team confirms it. Paid routes remain noindex and excluded from the organic sitemap. Regional phones are preserved.
- **Current main measurement behavior, not yet verified live:** Google defaults deny storage/data globally, with restricted US Ads defaults enabled unless the visitor opts out or sends GPC; personalization stays denied and restricted data processing is enabled. GA remains opt-in. Current-URL click IDs may go to Ads under its regional controls; the site's own stored click IDs/UTMs and CRM attribution still require explicit enablement. No automatic banner or extra advertising checkbox is shown; footer privacy settings remain available. GTM `GTM-MB764DLF` owns only the Ads base and conversion linker; the accepted-receipt native event remains the sole form-lead conversion event.
- The required final form acknowledgment authorizes inquiry follow-up and does not grant advertising consent. Form starts, submit clicks, an HTTP success alone, and unknown delivery responses do not count as accepted leads. Duplicate receipts are guarded.

## Assets and ad copy

**Two RSAs are now saved in each commercial ad group**: the original quote angle and a second walkthrough/accountability angle, both reproduced below. Sacramento RSA IDs are `828526432044` and `828654544067`. Walnut Creek's original and walkthrough IDs are `828652168493` and `828528559830`, in commercial group `200010416623`. The second ads are **Enabled at ad level, Pending review, and Not eligible because the campaign is paused**. Inspection of both Walnut RSAs' 19 text assets found no disapprovals. Saved inventory and Ad Strength do not establish final policy approval or performance.

Four account sitelinks were repaired from the staging domain to production: **Office Cleaning** → `/services/office-cleaning`; **Janitorial Services** → `/services/janitorial-cleaning`; **Commercial Floor Care** → `/services/floor-care`; **Day Porter Services** → `/services/day-porter`. Both campaigns now have their regional **Free Walkthrough** sitelink **saved and verified, Pending / Under review**.

The seven original new account-level callouts were saved and verified. The legacy **Reliable & Affordable** and Sacramento “best team” callout associations are now **paused at account, Sacramento campaign, and Walnut Creek campaign levels**, removing the inherited Sacramento claim from Walnut Creek. Google classified the cleaning-related **Photo-Verified Checks** callout under **Dating and Companionship**; the audit found its sole association among 31 inspected rows and confirmed it **paused**. Its replacement **Cleaning Quality Checks** is saved at account level, **Enabled, Pending / Under review**.

Walnut Creek's aggregate **Most ads disapproved** warning includes the three paused legacy call-only ads marked **Update to call assets**. Both current RSAs' own text assets have no disapprovals. The aggregate warning has **not been proven cleared**; do not equate its existence with disapproval of the replacement RSAs or assert that all review issues are resolved.

The shared **Service catalog** structured snippet is **Eligible**, with **Office Cleaning, Janitorial Services, Floor Care, and Day Porter Services**. **No logo was saved:** the website scan found none. Images and other business-branding additions are not recorded as verified.

The two saved copy angles allow the original quote message and the owner's walkthrough/accountability offer to be evaluated after launch. No guarantees, instant booking, certifications, savings, ratings, or results were added beyond the owner's source. Keep campaigns paused until matching landing content is verified live. “Best” must be evaluated against qualified inquiries, scheduled walkthroughs and customers, not asset counts or Ad Strength alone. Two RSAs are variation within Google's serving system, not a controlled experiment by themselves.

## Remaining launch work

1. Resolve production deployment/access, then deploy and verify the implemented regional website-call code alongside the intended main changes: final required acknowledgment, privacy controls, accepted-lead event and regional phones. Confirm actual forwarding-number replacement and duration-based calls independently of phone-button clicks.
2. The **authorized Sacramento TEST is complete on the older production build**. After the intended main changes deploy, validate the new walkthrough acknowledgment and restricted-measurement behavior on that actual build. Do not treat the existing delivery pass as proof of the new build, its tracking behavior, or a reported attributed conversion.
3. Confirm final policy/phone approvals, the replacement callout's review result, aggregate-warning status and regional call routing; assess appropriate images/logo. Both walkthrough sitelinks, second RSAs, the service-catalog snippet, regional website-call actions, legacy-callout cleanup, and the identical **59-negative** inventories are already saved and verified. Reread both paused campaign states, enabled commercial inventory, paused legacy inventory, geography, goals and **$41/day each** before any authorized launch. Do not count website phone-button clicks as leads.
4. Treat Maximize clicks as an initial traffic strategy. Review actual commercial queries and qualified outcomes before changing bidding or expanding reach. A CPC cap needs observed costs and business economics; no optimal bid is established here.

An average daily budget is not a strict daily ceiling: for most campaigns, the combined **$82/day** can permit **$164 on one day**, with a **$2,492.80 monthly spending limit** when unchanged for a full month. Do not infer historical spend from paused budgets or the account table's $0/day display.

## Evidence and historical limits

- **Current source verification:** all **831 tests across 73 files passed**. Scoped lint, TypeScript and the production build passed. Static-export verification passed with **128 indexable pages, three paid landing pages, 46 article mirrors and zero unreachable pages**. These checks cover the current source, including website-call handling; they do not establish a deployed release or a real Google-attributed conversion.
- **Sacramento copy repair:** View details showed **177 changes, 175 successful, 2 errors**, with the campaign error linked to failed copying of the legacy **Call Rangel Janitorial** group and its three ads. Both groups were paused before the temporary campaign enable; the UI showed Eligible (Learning), then the campaign was paused again. Group flag repair occurred under the paused campaign. Final refresh confirmed campaign paused, commercial enabled, legacy paused, no System error. [Final evidence](/tmp/rangel-ads-review/sacramento-system-error-fixed-paused.png); file existence independently verified at **107,309 bytes**.
- **Authorized live Sacramento TEST — PASS on older production:** submitted from the public `/quote/sacramento` hero. Verified **one GHL contact**, with website source and Sacramento region, carrying `website-lead`, `location-sacramento`, `facility-office-building`, and `freq-weekly`. Submission UUID **`e4bcc079-dc40-48fa-8f40-b26adabb7774`** matches Ralph's actual owner-inbox email in the same minute (**23:10:10Z** recorded). No ref tag was present. This proves contact and owner-notification delivery on the older deployed build; it does not verify the undeployed main changes or Google Ads attribution.
- **Historical lead delivery:** an October 11, 2026 website lead was also verified in **GHL and owner Gmail in the same minute**. This is separate historical evidence, not a replacement for current-build validation or proof of Ads attribution.
- The conversion table showed zero conversions for September 22–October 19, 2026 at the earlier check. The current **Quote request accepted** diagnostic is **Misconfigured**, with the explanation **never received a tag ping or attribution data**. The two saved website-call actions show **Awaiting conversions**. Neither saved settings nor the direct, non-ad website TEST establish Ads attribution or clear diagnostics. Local automated tests and pre-release browser QA used mocked CRM responses; the older-production TEST above used real delivery.
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

Both second RSAs use their regional `/quote/` landing page and display path 2 **`walkthrough`**. Sacramento RSA `828654544067` is in commercial group `204376617514`; Walnut Creek RSA `828528559830` is in group `200010416623`. Both are enabled at ad level, pending review, and ineligible to serve because their campaigns remain paused.

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
