# Manual Testing Checklist - Marketing Features

**Testing Date:** ___________  
**Tester:** ___________  
**Build/Commit:** 0efd4e6

## Pre-Testing Setup

- [ ] Clear browser cache and cookies
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)
- [ ] Test on real mobile device if possible
- [ ] Disable browser extensions that might interfere

## A. Sticky CTA Bar Testing

### Mobile (320px - 767px)
- [ ] CTA bar is visible at bottom of screen
- [ ] All 4 buttons are visible and properly labeled
- [ ] Icons render correctly
- [ ] Bar doesn't overlap with content
- [ ] Tap targets are at least 44px (easily tappable)
- [ ] Bar stays fixed when scrolling

### Desktop (768px+)
- [ ] CTA bar is centered and styled appropriately
- [ ] Hover states work on all buttons
- [ ] Focus indicators visible when tabbing through

### Functionality
- [ ] **Call button** - Opens phone dialer with correct number (+919413748575)
- [ ] **WhatsApp button** - Opens WhatsApp with pre-filled message
- [ ] **Admissions button** - Opens enquiry drawer
- [ ] **Directions button** - Opens Google Maps with school location
- [ ] All links use `relative_url` (check in browser DevTools)

### English (`/en/`) Page
- [ ] CTA labels are in English
- [ ] WhatsApp message is in English

### Hindi (`/hi/`) Page
- [ ] CTA labels are in Hindi
- [ ] WhatsApp message is in Hindi

## B. Enquiry Drawer Testing

### Opening/Closing
- [ ] Drawer opens when clicking "Admissions" CTA button
- [ ] Drawer opens smoothly with animation
- [ ] Overlay appears behind drawer
- [ ] Clicking overlay closes drawer
- [ ] Close button (X) closes drawer
- [ ] Body scroll is disabled when drawer is open
- [ ] Focus moves to first input when drawer opens

### Form Fields
- [ ] Parent/Guardian Name field accepts text
- [ ] Child Name field accepts text
- [ ] Class Sought dropdown shows all options (Nursery through Class 12)
- [ ] Phone Number field accepts 10-12 digits
- [ ] All required fields marked with asterisk (*)

### Validation (English)
- [ ] Empty fields show "Please fill in all fields" error
- [ ] Invalid phone number (less than 10 digits) shows error
- [ ] Invalid phone number (letters) shows error
- [ ] Valid phone formats accepted: 9876543210, 91987654321
- [ ] Error messages display in red below phone field

### Validation (Hindi)
- [ ] Error messages appear in Hindi
- [ ] All validation rules work same as English

### Form Submission
- [ ] **Email button** - Opens mailto link with formatted subject and body
- [ ] **WhatsApp button** - Opens WhatsApp with formatted message
- [ ] Success toast appears after submission
- [ ] Success toast message is in correct language (EN/HI)
- [ ] Drawer closes automatically after 3 seconds
- [ ] Form resets after closing

### Mobile Responsiveness
- [ ] Drawer takes 85% of screen width on mobile
- [ ] Drawer scrolls if content is too tall
- [ ] Buttons stack vertically on mobile
- [ ] Touch targets are large enough (44px minimum)

### Desktop Responsiveness
- [ ] Drawer is centered and max 500px wide
- [ ] Buttons are side-by-side
- [ ] Drawer doesn't extend full width

## C. Admissions Page FAQs & JSON-LD

### English Page (`/en/admissions/`)
- [ ] All 10 FAQ items are visible
- [ ] Questions are clearly formatted
- [ ] Answers are readable and complete
- [ ] New FAQs added:
  - Teacher-student ratio
  - Mid-year admissions
  - Extracurricular activities
  - Dress code

### Hindi Page (`/hi/admissions/`)
- [ ] All 10 FAQ items are in Hindi
- [ ] Hindi text renders correctly (Noto Sans Devanagari font)
- [ ] Content matches English version (parity check)

### JSON-LD Schema
- [ ] View page source and find `FAQPage` JSON-LD script
- [ ] Validate JSON-LD at https://validator.schema.org/
- [ ] All 10 questions and answers present in schema
- [ ] Schema is valid JSON (no syntax errors)
- [ ] Test in Google Rich Results Test: https://search.google.com/test/rich-results

## D. Global SEO & JSON-LD

### Organization Schema
- [ ] View source of any page
- [ ] Find `@type: School` JSON-LD script
- [ ] Validate at https://validator.schema.org/
- [ ] Check all fields populated:
  - name: "Veer Patta Public School"
  - telephone: "+919413748575"
  - address (streetAddress, locality, region, postalCode)
  - geo coordinates (if present)
  - sameAs social links (if present)

### WebPage Schema
- [ ] WebPage JSON-LD present on each page
- [ ] `inLanguage` set to "en" on English pages
- [ ] `inLanguage` set to "hi" on Hindi pages

### Hreflang Tags
- [ ] EN page has `<link rel="alternate" hreflang="hi">` to HI version
- [ ] HI page has `<link rel="alternate" hreflang="en">` to EN version
- [ ] Both have `hreflang="x-default"` to `/en/`

## E. Analytics Events (if enabled)

**Note:** Set `analytics_enabled: true` in `_config.yml` to test

- [ ] Analytics script loads (check Network tab in DevTools)
- [ ] Console shows no errors
- [ ] Click "Call" CTA - Event tracked: "CTA: Call"
- [ ] Click "WhatsApp" CTA - Event tracked: "CTA: WhatsApp"
- [ ] Click "Directions" CTA - Event tracked: "CTA: Directions"
- [ ] Click "Admissions" CTA - Event tracked: "CTA: Admissions Drawer"
- [ ] Submit enquiry via Email - Event tracked: "Lead: Enquiry Email"
- [ ] Submit enquiry via WhatsApp - Event tracked: "Lead: Enquiry WhatsApp"

### Analytics Disabled (Default)
- [ ] `window.plausible` is undefined (safe guards work)
- [ ] No analytics script loaded
- [ ] No console errors

## F. News Collection

### English News Page (`/en/news/`)
- [ ] Page loads without errors
- [ ] Page title: "School News & Updates"
- [ ] Sample news post is visible
- [ ] Date formatted correctly: "January 15, 2025"
- [ ] News title: "Annual Sports Day Celebration 2025"
- [ ] News content displays with bullet points

### Hindi News Page (`/hi/news/`)
- [ ] Page loads without errors
- [ ] Page title in Hindi: "स्कूल समाचार और अपडेट"
- [ ] Sample news post is visible
- [ ] Date formatted correctly: "15 January 2025"
- [ ] News title in Hindi
- [ ] Hindi content renders correctly

### Navigation Links
- [ ] "News" link visible in desktop navigation (EN)
- [ ] "समाचार" link visible in desktop navigation (HI)
- [ ] "News" link in mobile menu (EN)
- [ ] "समाचार" link in mobile menu (HI)
- [ ] All news links use `relative_url` filter
- [ ] Clicking news link navigates to correct page

## G. PWA (Progressive Web App)

### Manifest
- [ ] Navigate to `/veerpatta-website/manifest.webmanifest`
- [ ] Manifest loads as valid JSON
- [ ] Check fields:
  - name: "Veer Patta Public School"
  - short_name: "VPPS"
  - start_url: "/veerpatta-website/en/"
  - display: "standalone"
  - theme_color: "#5375E2"
  - icons array present

### Service Worker
- [ ] Open DevTools → Application → Service Workers
- [ ] Service worker registered successfully
- [ ] Status shows "activated and running"
- [ ] Scope: "/veerpatta-website/"

### Offline Functionality
- [ ] Visit site normally (online)
- [ ] Go offline (DevTools → Network → Offline)
- [ ] Refresh page - site still loads
- [ ] Navigate to `/en/` - page loads from cache
- [ ] Navigate to `/en/admissions/` - page loads from cache
- [ ] Images and CSS load from cache

### Install Prompt (Chrome/Edge)
- [ ] "Install" button appears in address bar (desktop)
- [ ] Clicking install creates app shortcut
- [ ] App opens in standalone window (no browser UI)
- [ ] App icon is school logo

### Cache Strategy
- [ ] Check Cache Storage in DevTools
- [ ] Cache named "vpps-v1" exists
- [ ] Core assets are cached:
  - /veerpatta-website/
  - /veerpatta-website/en/
  - /veerpatta-website/hi/
  - /veerpatta-website/en/admissions/
  - /veerpatta-website/hi/admissions/
  - style.css, animations.css, main.js
  - VPPS logo

## H. Cross-Browser Testing

### Chrome (Desktop)
- [ ] All features work correctly
- [ ] No console errors
- [ ] Service worker registers

### Firefox (Desktop)
- [ ] All features work correctly
- [ ] No console errors
- [ ] Service worker registers

### Safari (Desktop/iOS)
- [ ] All features work correctly
- [ ] No console errors
- [ ] Service worker registers (iOS 11.3+)

### Edge (Desktop)
- [ ] All features work correctly
- [ ] No console errors
- [ ] Service worker registers

### Chrome Mobile (Android)
- [ ] Sticky CTA bar works perfectly
- [ ] Drawer opens and closes smoothly
- [ ] Form validation works
- [ ] Install prompt appears
- [ ] PWA installable

### Safari Mobile (iOS)
- [ ] Sticky CTA bar works
- [ ] Drawer works (might not support install)
- [ ] Form validation works

## I. Mobile Screen Sizes

### 320px (iPhone SE)
- [ ] Sticky CTA buttons fit without horizontal scroll
- [ ] Drawer doesn't overflow
- [ ] All touch targets are 44px minimum
- [ ] Text is readable

### 375px (iPhone 12)
- [ ] Layout looks good
- [ ] All features work

### 414px (iPhone 12 Pro Max)
- [ ] Layout looks good
- [ ] All features work

### 768px (iPad)
- [ ] Sticky CTA transitions to desktop style
- [ ] Drawer is centered and max-width
- [ ] Desktop navigation includes News link

## J. Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all CTA buttons
- [ ] Tab into enquiry drawer
- [ ] Tab through form fields
- [ ] Enter key submits form
- [ ] Escape key closes drawer (bonus if works)

### Screen Reader (Optional)
- [ ] CTA buttons have aria-labels
- [ ] Drawer has role="dialog"
- [ ] Drawer has aria-labelledby pointing to title
- [ ] Form fields have proper labels
- [ ] Error messages have aria-live="polite"

### Focus Indicators
- [ ] All focusable elements show focus outline
- [ ] Focus outline is visible (2px solid blue)
- [ ] Focus doesn't get lost when drawer opens

### Color Contrast
- [ ] All text meets WCAG AA (4.5:1 minimum)
- [ ] CTA button text readable
- [ ] Error messages readable

## K. Performance Testing

### Lighthouse Audit (Chrome DevTools)
- [ ] Run Lighthouse on `/en/`
- [ ] Performance score: ≥ 85
- [ ] Accessibility score: ≥ 95
- [ ] Best Practices score: ≥ 90
- [ ] SEO score: ≥ 95
- [ ] PWA category shows installable

### Page Load
- [ ] First Contentful Paint < 2s on 3G
- [ ] Time to Interactive < 3s on 3G
- [ ] No layout shift when CTA bar appears
- [ ] Sticky CTA doesn't block content

### JavaScript Size
- [ ] Check Network tab in DevTools
- [ ] Enquiry drawer JS is inline (no separate file)
- [ ] Total new JS < 10KB
- [ ] Service worker ~3KB

## L. Link Testing

### All Links Use relative_url
- [ ] View page source
- [ ] Search for `href="/en/` - should find NONE (all should be relative_url)
- [ ] Search for `src="/assets/` - should find NONE
- [ ] All internal links have `/veerpatta-website` prefix

### External Links
- [ ] WhatsApp links open in new tab
- [ ] Maps link opens in new tab
- [ ] All external links have `rel="noopener noreferrer"`

## M. Content Parity (EN/HI)

### Pages to Check
- [ ] Home page - sticky CTA labels match language
- [ ] Admissions page - FAQs in both languages
- [ ] Admissions page - enquiry drawer labels match language
- [ ] News page - content in correct language
- [ ] All navigation labels in correct language

## N. Regression Testing

### Existing Features Still Work
- [ ] WhatsApp float button still works (desktop)
- [ ] WhatsApp float hidden on mobile (replaced by sticky CTA)
- [ ] Header navigation still works
- [ ] Mobile menu still works
- [ ] Gallery still works
- [ ] Contact form still works
- [ ] Footer still displays correctly

### No Visual Breakage
- [ ] Body has bottom padding (72px mobile, 84px desktop)
- [ ] Content not hidden behind sticky CTA
- [ ] No z-index conflicts
- [ ] No layout shifts

## O. Error Handling

### Form Validation Errors
- [ ] Submit empty form - shows error
- [ ] Enter 9-digit phone - shows error
- [ ] Enter letters in phone - shows error
- [ ] Errors clear when field is corrected

### Network Errors
- [ ] Go offline, try to submit form via mailto - opens mailto (works offline)
- [ ] Go offline, try to submit form via WhatsApp - opens WhatsApp (works offline)

### Service Worker Errors
- [ ] Service worker fails to register - site still works
- [ ] Cache fails to populate - site still works (network fallback)

## P. Print Testing

- [ ] Print preview the page
- [ ] Sticky CTA bar hidden in print
- [ ] Enquiry drawer hidden in print
- [ ] Content prints correctly

## Summary

**Total Tests:** _____ / _____  
**Pass Rate:** _____% 

**Critical Issues Found:**
1. ___________
2. ___________

**Minor Issues Found:**
1. ___________
2. ___________

**Notes:**
___________________________________________________________________________
___________________________________________________________________________
___________________________________________________________________________

**Sign-off:**  
[ ] All critical features tested and working  
[ ] Ready for production deployment  

**Tester Signature:** ___________  
**Date:** ___________
