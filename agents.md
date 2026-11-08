# Working on the school website

Read this guide before changing the repository. The current site is **Astro 7.4.7 + TypeScript**, statically generated into committed `_site/` and deployed through the existing Cloudflare Workers Git integration.

## Required workflow

Use Node.js 24 LTS. `package.json` permits Node 22.12 or newer; CI uses Node 24. The npm lockfile is part of the source and must remain committed.

```bash
npm ci
npm run check
npm run build
npm test
```

Build before tests because site-contract tests inspect the generated output. `npm run build` stages public media, runs Astro, and audits `_site/`. `scripts/cloud/setup.sh` runs this sequence, with optional `--serve` for a production preview on port 4321. It never pushes or deploys.

For development, use `npm run dev -- --host 127.0.0.1`; for the built site, use `npm run preview -- --host 127.0.0.1`. Ruby, Bundler, Liquid and Jekyll are no longer in the active build workflow.

## Edit the current sources

| Concern | Current source |
| --- | --- |
| Routes, redirects, 404, sitemap | `src/pages/` |
| Shared layout and navigation | `src/layouts/SiteLayout.astro` |
| Home, admissions, gallery and subpages | `src/components/` |
| School details and route helpers | `src/data/site.ts` |
| Bilingual page content | `src/data/content.ts` |
| Photos, videos and captions | `src/data/media.ts`, `assets/images/`, `assets/media/` |
| Browser interactions | `src/scripts/` |
| Styles | `src/styles/site.css` |
| Headers, service worker, manifest, robots | `public/` |
| Output and public-file audit | `scripts/prepare-public.mjs`, `scripts/check-site.mjs` |
| Video range handling | `worker.js` |
| Deployment configuration | `wrangler.jsonc` |

The old `en/`, `hi/`, `_includes/`, `_layouts/`, `_data/`, `_news/`, `_config.yml`, `Gemfile`, `.ruby-version`, root HTML/metadata files, and `assets/css/` / `assets/js/` are historical implementation files. Editing them does not update the Astro pages. Old documentation and audit reports may describe Jekyll; use this guide, README and `docs/DEPLOYMENT.md` for current instructions. Do not copy their old Liquid patterns, build commands, measured scores or unsupported compliance claims into the new implementation.

## Keep these boundaries

1. **English/Hindi parity.** Update both languages, preserve `/en/` and `/hi/` URLs, and check the correct `lang`, alternate links, titles and descriptions. Shared helpers such as `pathFor` and `pick` keep routes and text consistent.
2. **Static, mobile-first pages.** Preserve semantic HTML, meaningful links, responsive images, keyboard focus, native form behavior, reduced-motion support and readable content before scripts run. Test at 320, 375, 414, 768, 1024, 1280 and 1920 pixels where applicable.
3. **No invented school claims.** Confirm facts against supplied sources. A budget estimate uses parent-entered values, not invented official fees. Enquiry success is not admission acceptance, a confirmed visit or a reserved seat.
4. **Respect private information.** Do not introduce child-data collection, analytics, new external recipients or real-data test submissions as incidental UI changes. Browser tests must intercept form submissions. Do not send a real enquiry to verify a visual state.
5. **Explicit public assets only.** `scripts/prepare-public.mjs` stages `assets/images/` and `assets/media/` into generated `public/assets/`. It never copies the repository root. Do not put internal files in those source directories or `public/`. Update an allowlist deliberately if adding another public asset class.
6. **Generated output stays committed.** Change source, rebuild and review `_site/` together. Never make a fix only in generated HTML. Do not ignore `_site/` while Cloudflare's build command remains empty.
7. **Keep the existing Worker contract.** `main: "worker.js"`, `assets.binding: "ASSETS"`, video-only `run_worker_first`, and `not_found_handling: "404-page"` are intentional. Do not replace the deployment with Cloudflare Pages or single-page-application fallback.

## Content and media changes

- Update the current bilingual component or data record rather than a retained Jekyll page.
- Register gallery assets in `src/data/media.ts` with accurate English and Hindi descriptions.
- Keep local links root-relative because this deployment is at the domain root. The old `/veerpatta-website` GitHub Pages base path and Liquid `relative_url` filter do not apply.
- Use appropriately sized images with meaningful alt text, dimensions and existing responsive-image patterns.
- Keep videos tap-to-load, with posters, direct links and available captions. Do not restore eager video downloads or unrequested autoplay with sound.
- Change deployment headers and service-worker source in `public/`, not the historical root copies.
- If adding a route, update both languages, navigation as needed, the sitemap, and route/output test expectations.

## Tests and evidence

### Node and output checks

`npm run check` runs Astro/TypeScript checking. `npm run build` checks required bilingual routes, release metadata, local links, image alt attributes and public-file boundaries. `npm test` runs current admissions helpers, gallery helpers, generated-site contracts, video Worker tests and two retained CommonJS legacy suites.

The `.cjs` suites target only the old `assets/js/` modules; they are not proof that the current admissions or budget UI works. Add tests for behavior changed in `src/` and run the affected browser flows too.

Worker tests mock `ASSETS` using real Node `Request`/`Response` objects. They cover exact 206 bytes for initial, open-ended, suffix and overlong ranges; invalid/multiple-range fallback; 416; HEAD; missing assets; and non-video fallback. These unit tests do not prove Cloudflare's production routing, so verify deployment behavior separately when publishing Worker changes.

### Browser testing

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Use Playwright's installed Chromium by default. A runner with a preinstalled browser may use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` when the configuration supports the override. Do not hardcode a machine-specific browser path for every developer or CI runner.

The optional GitHub Actions browser job is selected through **Build site → Run workflow → browser_tests**. It installs Chromium and system dependencies and uploads reports. A default push/PR build does not run that optional job.

Check the relevant English and Hindi pages, navigation, no-JavaScript fallback, gallery filters, dialogs, Escape/close and focus restoration, repeated actions, admissions validation and failure/retry states, media, reduced motion and axe findings. Do not treat screenshot creation or test discovery as a completed browser run.

If Chromium launch is blocked by a sandbox/socket restriction, report the exact launch failure and mark the browser stage **blocked**, not passed. A managed remote browser cannot reach this container's localhost without a working preview or authorized tunnel. Keep the Node/build results separate, and use a reachable preview for remote checks.

### Cross-browser and real devices

Use an available authorized BrowserStack connection or physical devices for Safari/iPhone and Android checks, particularly video ranges, narrow-screen layouts, Hindi rendering and touch interactions. Verify current product/plan/session availability; do not assume an older license or sign-in remains active. Record device, OS, browser, tested URL/commit and result. If unavailable, record the limitation and continue other checks.

`docs/BROWSERSTACK.md` contains historical connection guidance. Its Jekyll commands and port 4000 are obsolete; use the Astro preview on port 4321, or a reachable deployment. Do not put access keys in the repository. Read-only production inspection is different from sending a real form submission.

## Deployment and CI

The Workers dashboard keeps **build command empty** and **deploy command `npx wrangler deploy`**. A push to `main` publishes the committed `_site/` through the existing Git integration. Do not change those settings as part of routine source work.

GitHub Actions independently runs `npm ci`, check, build and tests, then uploads the output. On `main` it repairs stale committed `_site/` only when the build differs and the branch has not advanced. An up-to-date output produces no second commit or extra deployment. A repair commit causes another Cloudflare deployment, so source and output should be committed together from the outset.

CI is not a deployment gate: Cloudflare can deploy before Actions finishes. Avoid CI-skip markers in commit messages because Cloudflare may honor them as well. Branch preview availability depends on dashboard settings and permissions; `preview_urls: true` alone does not prove an accessible preview exists.

Before reporting publication, verify the remote commit, Actions result and Cloudflare deployment independently. Run a post-deploy smoke test for both languages, a real 404, updated assets and video byte ranges. Follow the approved publication scope; source edits or a passing check do not authorize a push or production deploy. See `docs/DEPLOYMENT.md` for details and rollback.

## Completion report

Report what changed and which checks actually ran. Distinguish passed, failed, blocked and not run. Include browser/device and deployment results separately. Do not claim production readiness, performance scores, WCAG compliance, browser coverage or form delivery without supporting evidence.
