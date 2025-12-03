# Deep Dive Debug and Improvement Audit

This document captures identified issues across JS, CSS, accessibility, and PWA layers for the recent marketing modernization.

## Pillar 1: Code Redundancy & Logic Conflicts
- Duplicate testimonial carousel initialization appears in both `assets/js/main.js` (lines ~498-915) and `assets/js/marketing-enhancements.js` (lines ~8-110), causing double event listeners and race conditions on auto-rotation and dot state.
- Animation observers for card grids exist in `main.js` (`initStaggeredCards`, lines ~1126-1213) and `marketing-enhancements.js` (`initWhyChooseUsAnimation`, lines ~229-293; `initTrustBadgesAnimation`, lines ~298-362), leading to redundant IntersectionObserver work and duplicated classes.
- Color consistency drifts in `assets/css/modern-components.css` where gradients use hard-coded hex values instead of the root variables defined in `assets/css/style.css`.

## Pillar 2: Performance on Budget Android/3G
- Multiple scroll/animation effects run without `prefers-reduced-motion` guards: hero parallax (`main.js` lines ~199-228), button ripple/magnetic effects (`main.js` lines ~1006-1050), and CSS page-load animations (`assets/css/animations.css` lines ~230-271), increasing work on low-end GPUs.
- Critical CSS in `_includes/head.html` is followed by loading full `style.css`, `animations.css`, and `marketing-enhancements.js` without deferral for non-critical assets. `modern-components.css` (≈35KB per docs) is not split/async-loaded and will block first paint when added to pages.
- Service worker caches omit new assets (e.g., `modern-components.css`, `marketing-enhancements.js`, gallery/testimonial JS), weakening the stale-while-revalidate coverage.

## Pillar 3: Bilingual Parity & Accessibility
- Hreflang logic in `_includes/head.html` only handles `/en/` and `/hi/` paths; homepage variants without language prefix may lack alternates and `x-default` could point to `/en/` only.
- Admissions Enquiry Drawer lacks focus trapping and ARIA state toggling when opened/closed; focus is not returned to the trigger and overlay remains focusable to screen readers.
- Sticky CTA buttons share English labels for WhatsApp/phone when lang=hi and do not expose state changes to assistive tech.

## Pillar 4: Edge Case Debugging
- `fee-calculator.js` does not guard against negative sibling counts or malformed numeric inputs, allowing discounts to increase totals incorrectly. Transport zone visibility toggles but does not validate selection when transport is enabled.
- Gallery/menu experiences degrade fully when JS is disabled because filters and mobile nav rely entirely on JS with no CSS fallback menus or `noscript` messaging.

## Recommended Fix Snippets
- **Single source of truth for testimonials**: move carousel logic to one module and gate the other with a feature flag.
- **Reduced motion safety**: wrap parallax/ripple/magnetic effects and CSS animations in `@media (prefers-reduced-motion: reduce)` fallbacks and short-circuit JS when motion is reduced.
- **Form validation hardening**: clamp numeric inputs to `>=0`, enforce phone regex, and short-circuit calculations when transport zone is missing.
- **Accessibility**: add focus-trap utilities to the enquiry drawer, return focus to the opener, and ensure bilingual `aria-label` text for sticky CTAs.
