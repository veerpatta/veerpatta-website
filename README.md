# Shri Veer Patta Senior Secondary School Website

The bilingual English/Hindi website for Shri Veer Patta Senior Secondary School in Amet, Rajasthan. Built with **Astro 7.4.7 and TypeScript**, with static HTML hosted on **Cloudflare Workers**.

- [Live site](https://veerpatta-website.raj-39e.workers.dev/)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Contributor and coding-agent guide](agents.md)
- [Revamp media notes](docs/REVAMP_MEDIA.md)

## Start locally

Use **Node.js 24 LTS** and npm. The minimum Node version in `package.json` is 22.12. Ruby and Bundler are not needed for the current site.

```bash
npm ci
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:4321/en/ or http://127.0.0.1:4321/hi/. The root URL redirects to English.

To validate and preview the production output:

```bash
npm run check
npm run build
npm test
npm run preview -- --host 127.0.0.1
```

Run the build **before** tests: the output-contract tests inspect `_site/`. `bash scripts/cloud/setup.sh` runs installation, type checking, build, and tests in that order. Add `--serve` to preview the result.

## Current architecture

```text
src/
  pages/                  Astro routes, root redirect, 404 and sitemap
  layouts/                Shared page layout and navigation
  components/             Home, gallery, admissions and reusable UI
  data/                   Bilingual content, school details and media registry
  scripts/                TypeScript browser interactions and tested helpers
  styles/site.css         Mobile-first styles
assets/images/            Source images
assets/media/             Source photos, video, posters and captions
public/                   Explicit public files: headers, service worker, manifest, robots
scripts/prepare-public.mjs Stages images and media for Astro
scripts/check-site.mjs     Audits built routes, links and public-file boundaries
_site/                    Generated production output, intentionally committed
worker.js                 Video byte-range handler only
wrangler.jsonc            Existing Cloudflare Workers deployment configuration
tests/                    Unit, output-contract and browser tests
```

`astro.config.mjs` produces a static site in `_site/`, served from the domain root. Astro bundles the active CSS and TypeScript into `_astro/`. `package-lock.json` is committed so local and CI builds install the same dependency versions with `npm ci`.

`public/assets/` is generated staging, not an editing location. The staging script copies only `assets/images/` and `assets/media/`; it never copies the repository root. Do not place internal notes, configuration, tests, credentials or tooling in `public/` or those asset directories. The build audit checks for leaked tooling and broken local links.

### Historical files

The old Jekyll files remain as migration reference: `en/`, `hi/`, `_layouts/`, `_includes/`, `_data/`, `_news/`, `_config.yml`, `Gemfile`, `.ruby-version`, and the old `assets/css/` and `assets/js/` files. They are not the current page, CSS or JavaScript sources and are not used by `npm run build`.

Older guides such as `CONTRIBUTING.md`, `QUICK_START.md`, `PROJECT_GUIDE.md`, `MEDIA_UPLOAD_GUIDE.md`, `docs/ARCHITECTURE.md` and historical audit reports may describe that earlier implementation. Use this README, `agents.md`, and `docs/DEPLOYMENT.md` for the current build and deploy workflow. Earlier performance figures and accessibility claims do not establish results for this version.

## Content and parent-facing features

Both `/en/` and `/hi/` include home, about, academics, admissions, school life (`beyond`), digital learning, contact, FAQs, gallery, news, and privacy pages. Existing news URLs are preserved.

- Maintain English and Hindi together in `src/data/` and the relevant components.
- Update school contact details in `src/data/site.ts` and verify both languages.
- Update the current gallery registry in `src/data/media.ts`, not the old JavaScript registry.
- Keep local media in the explicit asset directories and rebuild after changes.
- Keep meaningful text, links and forms available without JavaScript. Dialogs, filtering and motion enhance the basic pages.
- Videos load after a tap rather than downloading on first page load. Keep direct-file fallbacks, posters and captions available.

The admissions flow is an **enquiry**, not an application acceptance, payment or seat reservation. It asks for parent/guardian contact details and class interest. Submission uses the configured Formspree endpoint; the WhatsApp option is a separate explicit action. Do not use real parent or student information in tests, and intercept form requests when exercising test submissions.

The budget calculator starts with blank inputs. It adds costs entered by the parent, separates annual costs from the one-time admission amount, and is not an official school fee quote. Do not add invented fees, rankings, results or testimonials.

## Tests

### Required local and CI checks

```bash
npm ci
npm run check
npm run build
npm test
```

The test suite includes:

- Current admissions helper tests for budgets, invalid amounts, Indian phone numbers and bilingual WhatsApp messages.
- Current gallery filter helpers and built-site contract tests.
- `worker.js` tests with mocked `ASSETS`, verifying exact range bytes, 206/416 headers, HEAD, missing assets and fallback behavior.
- Two retained `.cjs` suites for the legacy admission wizard and fee calculator. Those legacy tests alone do **not** validate the new UI.

### Browser and accessibility checks

On a machine that can launch Chromium:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

The suite in `tests/browser/` exercises English/Hindi routes, responsive layouts, keyboard and dialog interactions, gallery filters, media behavior, admissions error handling, no-JavaScript fallbacks and axe accessibility checks. Read actual run results before claiming those flows passed. Build and unit checks are not a substitute for browser testing or a WCAG conformance assessment.

GitHub Actions exposes an optional Chromium job under **Build site → Run workflow → browser_tests**. It installs Chromium and its system dependencies, runs the browser suite, and uploads reports. The regular push/PR build does not run that optional job.

For Safari/iPhone and Android testing, use an authorized BrowserStack session or actual devices against a reachable preview. Availability and plan access must be verified. The remote service cannot reach a container's localhost without an approved tunnel. [The older BrowserStack guide](docs/BROWSERSTACK.md) has connection guidance, but its Jekyll command and port 4000 are historical; use the Astro commands above and port 4321.

## Deployment

**A push to `main` triggers production deployment through Cloudflare's existing Git integration.** Build and validate first, then commit the changed source and its matching `_site/` together.

Cloudflare dashboard settings remain:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | Empty |
| Deploy command | `npx wrangler deploy` |
| Static asset directory | `_site/` |

Cloudflare uploads the committed output without rebuilding Astro. GitHub Actions independently checks, builds, tests and uploads a `site` artifact. On `main`, it can commit corrected `_site/` output as a fallback. When the output already matches, it makes no commit and causes no extra deployment. CI and Cloudflare run independently, so a successful CI run does not prove a deployment succeeded, and a failed CI run is not a deployment gate.

Keep `worker.js`, the `ASSETS` binding, `run_worker_first: ["/assets/media/videos/*"]`, and `not_found_handling: "404-page"` intact. The Worker supplies video byte ranges; ordinary pages and assets bypass it. See [deployment details and rollback](docs/DEPLOYMENT.md).

## Contribution checklist

- Make changes in the current `src/` implementation and maintain bilingual parity.
- Test narrow layouts, keyboard navigation, focus restoration, reduced motion and no-JavaScript fallbacks.
- Verify media, form error states and external-contact actions without sending real test enquiries.
- Run check, build and tests, and document browser/device results or exact blockers separately.
- Review `_site/` for output changes and accidental private files before committing it with the source.
- Do not push to `main` until production publication is intended.

Content and code belong to Shri Veer Patta Senior Secondary School. All rights reserved.
