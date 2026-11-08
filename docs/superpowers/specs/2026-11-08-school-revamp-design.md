# School website revamp design

## Intent
Rebuild the entire public school website so parents can understand the school, see authentic campus and student life, ask about admissions and arrange a visit. The user asked for fresh brainstorming, a coding-language change, animation/video, planning, and deployment. Execution is autonomous with reasonable defaults, as relayed by the parent task.

## Approach and alternatives
1. Restyle Jekyll: least migration risk but keeps the old Ruby/Liquid stack, does not meet the requested language change, and retains a large overlapping CSS/JS surface.
2. **Chosen: Astro + TypeScript, statically generated.** A small, maintainable component system, type-checked behavior, bilingual static HTML, very little browser JavaScript, and the current Cloudflare Worker and URLs preserved.
3. React SPA: interactive but needlessly expensive for mostly informational pages and slower on budget phones. Rejected.

## Design direction
Warm paper, deep navy and royal blue, saffron accents and editorial serif headlines. A light, legible parent-first interface, generous spacing, authentic campus photography, easy English/Hindi switching, minimal primary navigation, visible phone and WhatsApp paths. Real photos lead the homepage and learning pages. Animated details are decorative and opt out with reduced motion. Videos are deliberately tap-to-load with duration and size shown.

## Goals
- Preserve /en/ and /hi/ routes for home, about, academics, admissions, gallery, beyond, digital, contact, faq, privacy and news, plus both /news/2025-01-15-sports-day-{en,hi}/ articles.
- Shared Astro layout and components, native semantic controls, responsive photos, bilingual content parity.
- Admission guidance, enquiry form with the current Formspree destination, WhatsApp contact and campus-visit enquiry remain available. Do not imply an enquiry secures admission or a visit is booked.
- Replace contradictory advertised fee figures with a useful editable budget planner based only on amounts a parent enters from a school quote. Keep printing and WhatsApp help.
- Gallery categories and keyboard-accessible image viewing; authentic videos remain playable on Safari via existing worker byte ranges.
- Create a short silent editorial school-story film from already-public authentic media. Label it as an edited montage, with descriptive caption tracks. No new claims about achievements, staff credentials, fees, offers, seats, dates or service coverage without evidence.
- Privacy: use existing public media, not the private marketing Drive folder. No new tracking. Do not send form inputs until the parent explicitly submits. Do not persist personal form fields. Only optional consented transmission to named Formspree destination or WhatsApp.

## Non-goals and anti-goals
No admin portal or payment processor; do not invent integrations, outcomes, testimonials, AI pupils/campus scenes or fresh school claims. Do not make every interaction depend on JavaScript. Do not replace Cloudflare hosting or change security/access permissions.

## Deployment and verification
Generate into _site/, commit the generated site with sources, preserve Cloudflare's empty build command and npx wrangler deploy integration. Replace Jekyll CI with locked npm + type checks + unit tests + build-output audit. Check local small mobile to desktop widths, both languages, navigation/Back/escape/dialog focus, gallery repeat filtering, video failures, enquiry validation and budget edge cases. Preserve real 404s, metadata, SEO alternates, service-worker update behavior, headers and video 206 behavior. Push only after tests and review; confirm exact remote commit and live output marker. Disclose real-device testing limits and any unavailable checks.
