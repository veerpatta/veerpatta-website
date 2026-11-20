# Parent fieldbook: local review, not deployed

This Astro / TypeScript change is based on production-source merge `8263dd304703c2153bbdd854709ea5d2e0d517e3`. The branded canonical origin is `https://vpps.co.in`. Existing public paths, root → English, historic stories, video byte ranges, map and Formspree recipient remain. The root is not an ad destination. Use an explicit `/hi/…` route for a Hindi-first parent journey.

| Entry | Parent's task | Changes and limits |
|---|---|---|
| `/{en,hi}/` | See how school feels, then find a next step | Real wide school-lawn dance, school film on tap, three direct routes to life, class choice, visit. Nothing autoplayed. |
| `/admissions/` within each language | Choose a phase or enquire about any class | Nursery/KG and Class 11 directory, class-neutral original guided form and blank-cost calculator. |
| `/admissions/pre-primary/` | First-school decision | Actual room with round tables. Entry age, routine, cost questions; adult name/mobile/class and consent only. No age cutoff or attendance claim. |
| `/admissions/class-11/` | Compare senior-secondary transition | Science, Commerce, Arts; eligibility, subjects, current availability are office-confirmed. Separate class-specific form. |
| `/about/`, `/academics/` | Understand school and stages | Real campus evidence, school facts, age/stage decision links, subject questions. |
| `/beyond/`, `/gallery/` | Look at real school life | Grouped activity-to-photo links, native fallback for gallery links, clear caption and matches. Original film and videos remain on tap. |
| `/contact/`, `/faq/` | Visit, call or find an answer | Anchored `#visit` checklist, confirmed phone, map and office fallback, grouped common questions; no promised appointments. |
| `/digital/`, `/privacy/` | Use verified channels; understand data | Correct family journey and safe office handoff, no invented portal or credentials. Privacy covers enquiry and inactive optional measurement. |
| `/news/`, dated sports story EN/HI | Distinguish archive from current notices | Explicit dates and archive labelling; office fallback for current information. |
| root + 404 | Find a functioning language or return home | Root behavior preserved, 404 not canonicalized as the home page; `noindex,follow`. |

All 28 content URLs are in the branded sitemap. Each English/Hindi pair self-canonicalizes and alternates to its counterpart. The stage-specific ad URL has Hindi `x-default`; other existing sections retain English default. No query string or personal detail is embedded in canonicals. The parent guide is a disclosure of four verified questions, not a paid chatbot; it asks users to type nothing and records no questions. Read-only photos/film are usable without scripting. Navigation remains native; visuals are reserved in CSS. The thin, polite nonblocking navigation and form status appears after 275 ms, with a static reduced-motion experience. Duplicate submissions are blocked immediately. The mobile ad-page CTA addresses the local short form, not a second modal or WhatsApp.

## Intentional contact change
The prior baseline connected the verified school **telephone** to `wa.me` by assumption. In this reviewed version the footer, modal, contact card, fees, campus-visit link and all-class WhatsApp button no longer expose a messaging path. Telephone (`tel:`), map and the existing explicit Formspree submission remain. The public launch path must remain off until the school separately verifies the precise public WhatsApp routing/ownership and consent copy. Do not fill it automatically from the telephone. No Messaging Hub, AI vendor, social API or ad connector is called from this build.

## Media, deployment and validation
The front cover uses the previously public `dance-lawn` inter-house group-dance photograph, not a generic or generated school scene. The pre-primary lead is an image of the actual empty activity room; the Class 11 image simply identifies a classroom and makes no new subject-availability claim. These are scaled responsive derivatives. No new identifiable minors, facial edits, stock pupils, generated campus scenes, or invented testimonials were introduced. Small AVIF variants fall back to WebP; responsive photos have dimensions, videos need a tap. No original unapproved Drive media, source IDs or credentials are exposed in generated pages.

Build locally using `npm ci && npm run check && npm run build && npm test`. Then run `npm run test:e2e` using installed Playwright Chromium (or the executable path documented in README). Do not submit a real enquiry to test: all browser form network paths are intercepted and tested locally. CI has not run on this change; no PR, push, merge or deployment was made. The repository's main branch remains auto-deploy capable: do not push to it as a review step.
