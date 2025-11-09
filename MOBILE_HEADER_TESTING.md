# Mobile-First Header Testing Guide

## Overview
This guide explains how to test the redesigned mobile-first header for Veer Patta Public School's website, optimized for budget Android smartphones on 3G networks in semi-rural Rajasthan.

## Testing Priorities
**CRITICAL:** Mobile devices (320px-767px) are the PRIMARY audience (70% of traffic).

## Quick Testing Checklist

### ✅ Mobile Testing (320px - 767px) - PRIORITY #1
- [ ] Logo displays at 60x60px
- [ ] School name displays on 2 lines (with line break)
- [ ] Hamburger menu button is 56x56px (easily tappable)
- [ ] Hamburger shows text "Menu" / "मेनू" below icon
- [ ] All elements have 16px minimum spacing
- [ ] No horizontal scrolling at any width
- [ ] Sticky WhatsApp button visible bottom-right (56x56px circle)
- [ ] Header sticks to top on scroll
- [ ] Shadow appears on scroll

### ✅ Mobile Menu Testing
- [ ] Hamburger button opens menu smoothly
- [ ] Menu slides in from right (300ms)
- [ ] Semi-transparent overlay appears behind menu
- [ ] Language switcher at top (English | हिंदी)
- [ ] Close button (✕) clearly visible top-right (48x48px)
- [ ] All menu items 60px height (easy tapping)
- [ ] 20px spacing between menu items
- [ ] WhatsApp button at bottom of menu (full width, 56px height)
- [ ] Menu closes when clicking overlay
- [ ] Menu closes when clicking any link
- [ ] Menu closes with Escape key
- [ ] Body scroll prevented when menu open

### ✅ Tablet Testing (768px - 1023px)
- [ ] Hamburger menu HIDDEN
- [ ] Desktop nav VISIBLE
- [ ] Language switcher VISIBLE
- [ ] WhatsApp button VISIBLE in header
- [ ] Sticky mobile WhatsApp HIDDEN
- [ ] Logo displays at 70x70px
- [ ] School name on single line

### ✅ Desktop Testing (1024px+)
- [ ] Logo displays at 80x80px
- [ ] All elements in single horizontal row
- [ ] Desktop WhatsApp button shows text + icon
- [ ] Header max-width 1400px centered
- [ ] All hover states work correctly

## Detailed Testing Instructions

### 1. Mobile Testing (Budget Android Simulation)

#### Using Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Test these specific devices:
   - **iPhone SE (375px)** - Common budget phone size
   - **Pixel 5 (393px)** - Mid-range Android
   - **Galaxy S8+ (360px)** - Popular in India
   - **Custom: 320px** - Smallest supported size

#### Test on Each Size:
1. **Initial Load:**
   - Header appears instantly (critical CSS working)
   - Logo, school name, and hamburger visible
   - No layout shift
   - No horizontal scroll

2. **Tap Hamburger Menu:**
   - Large enough to tap easily (56x56px)
   - Provides visual feedback (opacity change)
   - Menu slides in smoothly from right
   - Background overlay dims screen
   - Body scroll locked

3. **Inside Mobile Menu:**
   - Language switcher at top (English/हिंदी buttons)
   - Each 48x48px minimum
   - Close button (✕) top-right, 48x48px
   - 6 navigation links, each 60px height
   - Text size: 18px for English, 20px for Hindi
   - WhatsApp button at bottom, full-width, 56px height
   - Test tap all elements - each should respond

4. **Close Menu:**
   - Tap close button (✕) - menu slides out
   - Tap overlay - menu closes
   - Tap any nav link - menu closes and navigates
   - Press Escape key - menu closes

5. **Scroll Behavior:**
   - Scroll down page
   - Header stays at top (sticky)
   - Shadow becomes more pronounced
   - Sticky WhatsApp button remains bottom-right

6. **Sticky WhatsApp Button:**
   - Visible at bottom-right
   - 56x56px circle
   - Green background (#25D366)
   - Tap - opens WhatsApp with pre-filled message

### 2. Performance Testing (3G Simulation)

#### Chrome DevTools Network Throttling:
1. Open DevTools → Network tab
2. Change throttling to "Slow 3G"
3. Hard reload (Ctrl+Shift+R)
4. Verify:
   - Header visible immediately (inline critical CSS)
   - Layout stable (no jumping)
   - Interactive within 3 seconds
   - Total page size < 500KB for header resources

#### Lighthouse Testing:
1. Open DevTools → Lighthouse tab
2. Select "Mobile" device
3. Select "Performance" category
4. Run analysis
5. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90

### 3. Accessibility Testing

#### Keyboard Navigation:
1. Tab through header elements:
   - Logo receives focus
   - Hamburger menu receives focus
   - Focus visible (blue outline)
2. Open mobile menu with Enter/Space
3. Tab through menu items:
   - Language switcher items
   - Navigation links
   - WhatsApp button
   - Close button
4. Focus trapped inside menu when open
5. Close menu with Escape

#### Screen Reader Testing:
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Verify announcements:
   - "Veer Patta Public School Home" for logo
   - "Open navigation menu" for hamburger
   - "Mobile navigation" for menu
   - "Close navigation menu" for close button
   - Each link announced correctly
   - "Contact us on WhatsApp for admission inquiry"

#### Color Contrast:
1. Use browser extension (WAVE, axe)
2. Verify:
   - Text meets WCAG AA (4.5:1)
   - Blue (#5375E2) on white passes
   - White text on blue passes

### 4. Touch Target Testing

#### Minimum Size Verification:
All interactive elements should be at minimum 48x48px (preferably 56x56px):

- [ ] Logo: 60x60px ✅
- [ ] Hamburger button: 56x56px ✅
- [ ] Close button: 48x48px ✅
- [ ] Language buttons: 48x48px ✅
- [ ] Mobile nav links: 60px height ✅
- [ ] Mobile WhatsApp button: 56px height ✅
- [ ] Sticky WhatsApp: 56x56px ✅

#### Spacing Verification:
Minimum 16px spacing between interactive elements:

- [ ] Logo to hamburger: 12px + padding ✅
- [ ] Menu items: 2px gap ✅
- [ ] Language buttons: 8px gap ✅

### 5. Cross-Browser Testing

Test on:
- [ ] Chrome (Desktop & Android)
- [ ] Safari (Desktop & iOS)
- [ ] Firefox (Desktop & Android)
- [ ] Edge (Desktop)
- [ ] Samsung Internet (Android)
- [ ] UC Browser (Popular in India)

### 6. Real Device Testing

**Ideal Test Devices:**
- Budget Android (< $150) - Primary audience
- iPhone SE - Small screen iOS
- Mid-range Android - Common device
- Tablet (iPad/Android) - Tablet breakpoint

**Tests on Real Device:**
1. **Load Speed:**
   - On WiFi - should load instantly
   - On 3G - header visible in < 2 seconds

2. **Touch Response:**
   - All buttons respond to first tap
   - No double-tap required
   - No accidental taps

3. **Scrolling:**
   - Smooth 60fps scrolling
   - No janky animations
   - Menu scroll smooth

4. **Orientation:**
   - Rotate device portrait ↔ landscape
   - Header adapts correctly
   - Menu closes on resize to landscape tablet

### 7. Language Switching Testing

#### English to Hindi:
1. Click/tap हिंदी in language switcher
2. Verify:
   - URL changes to /hi/
   - Navigation text in Hindi
   - Font: Noto Sans Devanagari
   - Font size: 20px (larger for Hindi)
   - Line height: 1.7 (better for Devanagari)
   - WhatsApp button: "📱 प्रवेश पूछताछ"
   - Menu label: "मेनू"
   - Close label: "बंद करें"

#### Hindi to English:
1. Click/tap English
2. Verify all elements in English
3. Font: Poppins
4. Font size: 18px

### 8. Visual Regression Testing

#### Mobile (320px):
- [ ] Header height: 70px
- [ ] Logo: 60x60px, aligned left
- [ ] School name: 2 lines, 16px font
- [ ] Hamburger: aligned right, 56x56px

#### Mobile (375px):
- [ ] Same as 320px
- [ ] Slightly more spacing

#### Tablet (768px):
- [ ] Header height: 80px
- [ ] Logo: 70x70px
- [ ] Nav links visible
- [ ] Single row layout

#### Desktop (1024px+):
- [ ] Header height: 80px
- [ ] Logo: 80x80px
- [ ] Max-width: 1400px
- [ ] All elements in one row

## Common Issues to Check

### Mobile:
- ❌ Horizontal scrolling → Check max-width, overflow
- ❌ Text too small → Increase to 18px minimum
- ❌ Buttons too small → Increase to 56x56px
- ❌ Hamburger not working → Check JavaScript console
- ❌ Menu not closing → Check event listeners

### Performance:
- ❌ Header jumps on load → Check critical CSS
- ❌ Slow menu animation → Check GPU acceleration
- ❌ WhatsApp button laggy → Check z-index conflicts

### Accessibility:
- ❌ No focus visible → Add outline styles
- ❌ Can't navigate with keyboard → Add tabindex
- ❌ Screen reader issues → Check ARIA labels

## Success Criteria

### Must Have (Blocker):
- ✅ Works on 320px width
- ✅ No horizontal scroll
- ✅ All touch targets ≥ 48px
- ✅ Mobile menu opens/closes
- ✅ Header visible on 3G in < 3 seconds
- ✅ Keyboard accessible

### Should Have (High Priority):
- ✅ Touch targets ≥ 56px
- ✅ Smooth 60fps animations
- ✅ Lighthouse Performance > 90
- ✅ WCAG AA contrast
- ✅ Works on UC Browser

### Nice to Have:
- ✅ Lighthouse Performance > 95
- ✅ Advanced animations
- ✅ Haptic feedback

## Testing Report Template

```markdown
## Header Testing Report

**Date:** YYYY-MM-DD
**Tester:** [Name]
**Environment:** [Browser/Device]

### Mobile (320px-767px)
- Layout: ✅ / ❌
- Touch targets: ✅ / ❌
- Menu functionality: ✅ / ❌
- Performance: ✅ / ❌
- Notes: [Any issues]

### Tablet (768px-1023px)
- Layout: ✅ / ❌
- Navigation: ✅ / ❌
- Notes: [Any issues]

### Desktop (1024px+)
- Layout: ✅ / ❌
- All features: ✅ / ❌
- Notes: [Any issues]

### Accessibility
- Keyboard: ✅ / ❌
- Screen reader: ✅ / ❌
- Color contrast: ✅ / ❌
- Notes: [Any issues]

### Performance (3G)
- Load time: [X] seconds
- Lighthouse score: [XX]/100
- Notes: [Any issues]

### Issues Found:
1. [Issue description]
2. [Issue description]

### Overall Assessment:
- Ready for production: Yes / No
- Blockers: [List any blockers]
```

## Quick Commands for Testing

### Start Jekyll locally:
```bash
bundle exec jekyll serve
```

### Access local site:
```
http://localhost:4000/veerpatta-website/
```

### Test on local network (mobile):
1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access on mobile: `http://[YOUR-IP]:4000/veerpatta-website/`

### Run Lighthouse:
```bash
# Install
npm install -g lighthouse

# Run
lighthouse http://localhost:4000/veerpatta-website/en/ --view
```

## Conclusion

The mobile-first header redesign prioritizes the 70% mobile audience with:
- ✅ Large touch targets (56x56px)
- ✅ Optimized for 3G networks (critical inline CSS)
- ✅ Smooth 60fps animations
- ✅ Fully accessible (WCAG AA)
- ✅ Works on budget Android devices
- ✅ Progressive enhancement (works without JS)

Test thoroughly on real mobile devices before deploying!
