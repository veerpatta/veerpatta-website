# School Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a modern, bilingual, authentic-media-led school website and verify the live production result.

**Architecture:** Astro static pages with shared components, typed bilingual content and progressively enhanced TypeScript. Preserve Cloudflare Worker video streaming and the committed _site deployment contract.

**Tech Stack:** Astro, TypeScript, CSS, Node built-in test runner, Playwright for browser QA, ffmpeg for a silent editorial film.

**Spec:** docs/superpowers/specs/2026-11-08-school-revamp-design.md

## Global Constraints
- Preserve all English/Hindi pages and both existing news article routes.
- No unverified stats, fees, offers, seats, teacher credentials, school-calendar claims or testimonials.
- Use existing public authentic media; no private Drive student-media publication or new analytics.
- Native forms and navigation remain usable without JS; reduced-motion and data-saving preferences respected.
- _site stays the deployment directory; preserve worker byte ranges and 404 status handling.

## Review Focus
- Small Hindi screens and long text must wrap without horizontal overflow.
- Repeated menu/dialog/filter actions, Escape and Back must restore usable state and focus.
- Form validation and failed submission must not claim success or retain private fields.
- Budget blank, zero, negative and invalid inputs must not produce misleading totals.
- Returning visitors must receive the revamp instead of a stale Jekyll service-worker cache.

### Task 1: Migrate static architecture
**Files:** package.json, package-lock.json, astro.config.mjs, tsconfig.json, src/layouts/SiteLayout.astro, src/pages/[lang]/[...slug].astro, src/pages/news/[slug].astro, src/pages/index.astro, src/pages/404.astro, scripts/prepare-public.mjs, scripts/check-site.mjs, .github/workflows/build.yml.
**Interfaces:** Lang='en'|'hi'; pathFor(lang,slug) returns preserved root-based path; Astro outputs _site; public contains only safe site assets.
- [ ] Add route/output audit that fails before the new architecture is built.
- [ ] Configure Astro static output and typed content; prepare public assets and safe metadata.
- [ ] Implement shared layout/header/footer/SEO and route generation.
- [ ] Run type check, full build and output audit; verify internal files never publish.

### Task 2: Build parent-first screens
**Files:** src/components/{Home,Gallery,Subpage,Admissions,Photo,VideoCard,PageHead}.astro, src/data/{site,media,content}.ts, src/styles/site.css, src/scripts/{site,admissions}.ts, tests/*.
**Interfaces:** page components accept lang; Subpage accepts slug; Photo accepts id/lang/eager?/sizes?/class?; VideoCard accepts id/lang; data-enquiry-open controls native dialog.
- [ ] Add tests for form validation, budget edge cases, safe WhatsApp encoding and supported gallery categories.
- [ ] Implement bilingual screens, authentic media, admission guide and parent-entered budget planner.
- [ ] Add accessible menu/enquiry/lightbox behavior, category filtering, tap-to-play videos and reduced-motion animation.
- [ ] Test all routes, mobile/desktop both languages, no-JS content and repeat/interrupted flows.

### Task 3: Create authentic school film
**Files:** assets/media/videos/school-story-720.mp4, school-story-en.vtt, school-story-hi.vtt, assets/media/photos/video-school-story-*.webp, docs/REVAMP_MEDIA.md.
**Interfaces:** media id school-story, H.264 720p faststart <=5 MB, silent, caption tracks and transparent montage label.
- [ ] Audit real/AI provenance and inspect source pixels.
- [ ] Render editorial film from already-public authentic images/clips, with no music or private metadata.
- [ ] Probe encoding, dimensions/duration and inspect frames/poster.

### Task 4: Review, publish and verify
**Files:** docs/DEPLOYMENT.md, README.md, agents.md, public/sw.js, QA report, complete generated _site.
**Interfaces:** npm ci, npm run check, npm test, npm run build, npm run test:e2e.
- [ ] Replace Ruby build/deploy guidance; preserve static Cloudflare integration, worker and security headers.
- [ ] Run all final checks and independent review; fix findings and rebuild.
- [ ] Verify main has not changed unexpectedly, commit source and _site together, push authorized production change.
- [ ] Confirm expected remote commit, exact-commit CI and live build marker, 404, English/Hindi pages, videos and responsive screenshots.
