# CLAUDE.md - AI Assistant Guide

> **For AI Assistants**: This document provides comprehensive guidance for working on the Veer Patta Public School website codebase. Read this before making any changes.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Critical Constraints](#critical-constraints)
4. [Codebase Structure](#codebase-structure)
5. [Development Workflows](#development-workflows)
6. [Key Conventions](#key-conventions)
7. [Common Tasks](#common-tasks)
8. [Testing Requirements](#testing-requirements)
9. [Deployment Process](#deployment-process)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Essential Facts
- **Type**: Jekyll static site (no server-side code)
- **Hosting**: GitHub Pages (automatic deployment)
- **Languages**: Bilingual - English (`/en/`) and Hindi (`/hi/`)
- **Target Users**: 70% mobile users on budget Android devices with 3G networks
- **Build Time**: 2-3 minutes after push
- **Live URL**: https://veerpatta.github.io/veerpatta-website/

### Three Critical Rules
1. **Bilingual Parity**: ALL content changes must be made in BOTH `/en/` and `/hi/` directories
2. **Mobile-First**: Design for 320px width first, enhance for larger screens
3. **Use `relative_url` Filter**: All URLs in templates must use `{{ url | relative_url }}`

### Before You Start
- Read the full [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines
- Check [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for technical details
- Review recent changes in [CHANGELOG.md](CHANGELOG.md)

---

## Project Overview

### What This Is
A bilingual static website for Veer Patta Public School in Amet, Rajasthan, India. The site provides school information, admissions details, gallery, and contact options for parents and students in semi-rural areas.

### Technology Stack

```yaml
Generator:     Jekyll 4.x
Templates:     Liquid templating language
Content:       Markdown with YAML frontmatter
Styling:       CSS3 (mobile-first, no preprocessor in production)
JavaScript:    Vanilla ES6+ (no frameworks/libraries)
Hosting:       GitHub Pages
CI/CD:         GitHub Actions
Fonts:         Poppins (EN), Noto Sans Devanagari (HI)
PWA:           Service Worker with stale-while-revalidate caching
```

### Key Dependencies (Gemfile)
```ruby
gem "jekyll", "~> 3.10.0"
gem "github-pages", "~> 232"
gem "jekyll-remote-theme"
gem "jekyll-seo-tag"
```

**Important**: No npm/webpack/build tools. GitHub Pages handles everything.

### Design Principles
1. **Mobile-First**: 70% of traffic is from mobile devices
2. **Performance**: Optimized for slow 3G networks (~450KB total page size)
3. **Accessibility**: WCAG AA compliant (Lighthouse score: 98)
4. **Bilingual**: Complete parity between English and Hindi
5. **Privacy**: Analytics disabled by default
6. **Simplicity**: Easy for non-technical staff to maintain

### Performance Benchmarks
| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | <1.5s | ~0.8s |
| Time to Interactive | <3s | ~1.9s |
| Total Page Size | <1MB | ~450KB |
| Lighthouse Performance | >90 | 92 |
| Lighthouse Accessibility | >95 | 98 |

---

## Critical Constraints

### 1. Bilingual Parity (MANDATORY)

**Rule**: Every content change MUST be reflected in both `/en/` and `/hi/` directories.

**Example**:
```markdown
# If you update:
en/about.md

# You MUST also update:
hi/about.md
```

**In Templates**:
```liquid
{% if page.lang == 'hi' %}
  {% assign nav_home = 'होम' %}
  {% assign nav_about = 'हमारे बारे में' %}
{% else %}
  {% assign nav_home = 'Home' %}
  {% assign nav_about = 'About' %}
{% endif %}
```

### 2. Always Use `relative_url` Filter

**Rule**: All URLs in Liquid templates MUST use the `relative_url` filter because of GitHub Pages baseurl.

```liquid
<!-- ✓ CORRECT -->
<a href="{{ '/en/about/' | relative_url }}">About</a>
<img src="{{ '/assets/images/logo.jpg' | relative_url }}" alt="Logo">
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">

<!-- ✗ WRONG - Will break on GitHub Pages -->
<a href="/en/about/">About</a>
<img src="/assets/images/logo.jpg" alt="Logo">
```

**Why**: The site uses `baseurl: "/veerpatta-website"` in `_config.yml`, so all URLs need this prefix.

### 3. Mobile-First CSS

**Rule**: Write CSS for mobile (320px) first, then enhance for larger screens using `min-width` media queries.

```css
/* ✓ CORRECT - Mobile-first */
.header {
  padding: 8px;
  font-size: 16px;
}

@media (min-width: 768px) {
  .header {
    padding: 16px;
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  .header {
    padding: 24px;
    font-size: 20px;
  }
}

/* ✗ WRONG - Desktop-first */
.header {
  padding: 24px;
}

@media (max-width: 768px) {
  .header {
    padding: 8px;
  }
}
```

### 4. Preserve Accessibility

**Requirements**:
- Semantic HTML5 tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`)
- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Escape)
- Color contrast minimum 4.5:1 (WCAG AA)
- Alt text on all images
- `lang` attribute on `<html>` tag
- Focus visible styles
- Touch targets minimum 48x48px

### 5. No Breaking Changes Without Testing

**Before committing**:
- [ ] Test at 320px, 375px, 414px (mobile)
- [ ] Test at 768px, 1024px (tablet)
- [ ] Test at 1280px, 1920px (desktop)
- [ ] Test both `/en/` and `/hi/` pages
- [ ] Check keyboard navigation
- [ ] Run Lighthouse audit (Performance >90, Accessibility >95)
- [ ] Verify no console errors

---

## Codebase Structure

### Directory Layout

```
veerpatta-website/
├── en/                          # English content pages (Markdown)
│   ├── index.md                # Homepage
│   ├── about.md                # About page
│   ├── academics.md            # Academics page
│   ├── admissions.md           # Admissions + FAQs
│   ├── gallery.md              # Gallery with 5 categories
│   ├── contact.md              # Contact information
│   ├── privacy.md              # Privacy policy
│   ├── faq.md                  # FAQ page
│   └── news/                   # News posts
│
├── hi/                          # Hindi content (mirrors en/)
│   └── [same structure as en/]
│
├── _includes/                   # Reusable HTML components
│   ├── head.html               # <head> section (meta, SEO, CSS)
│   ├── header.html             # Navigation (mobile-first)
│   ├── footer.html             # Site footer
│   ├── sticky-cta.html         # Sticky CTA bar (Call, WhatsApp, etc.)
│   ├── enquiry-drawer.html     # Bottom-sheet enquiry form
│   ├── whatsapp.html           # WhatsApp floating button
│   └── analytics.html          # Optional analytics script
│
├── _layouts/                    # Page templates
│   └── default.html            # Main layout (wraps all pages)
│
├── _news/                       # News collection (Jekyll collection)
│   ├── [news posts in EN/HI]
│
├── assets/                      # Static assets
│   ├── css/
│   │   ├── style.css           # Main stylesheet (~15KB, mobile-first)
│   │   └── animations.css      # Animation definitions
│   ├── js/
│   │   ├── main.js             # Core functionality (~7KB)
│   │   ├── gallery-loader.js   # Gallery system
│   │   ├── gallery-items.js    # Gallery file registry
│   │   ├── media-loader.js     # Media loading utilities
│   │   ├── home-media-loader.js # Homepage media
│   │   └── marketing-enhancements.js # Marketing features
│   ├── images/                 # Static images, logo, placeholders
│   └── media/                  # User-uploaded content
│       ├── home/               # Homepage media
│       ├── about/              # About page media
│       ├── academics/          # Academics media
│       ├── admissions/         # Admissions media
│       ├── contact/            # Contact media
│       └── gallery/            # Gallery by category
│           ├── sports/
│           ├── ncc/
│           ├── cultural/
│           ├── academic/
│           └── celebrations/
│
├── docs/                        # Technical documentation
│   ├── ARCHITECTURE.md         # Technical architecture
│   ├── DEPLOYMENT.md           # Deployment process
│   ├── MOBILE_FIRST_HEADER.md  # Mobile header implementation
│   ├── MOBILE_HEADER_TESTING.md # Testing guide
│   └── QA_SUMMARY.md           # QA validation
│
├── .github/                     # GitHub configuration
│   ├── workflows/
│   │   └── jekyll.yml          # GitHub Actions deployment
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   └── pull_request_template.md # PR template
│
├── _config.yml                  # Jekyll configuration
├── index.html                   # Root redirect to /en/
├── 404.html                     # Custom 404 page
├── sitemap.xml                  # SEO sitemap
├── robots.txt                   # Search engine rules
├── sw.js                        # Service Worker (PWA)
├── manifest.webmanifest         # PWA manifest
├── Gemfile                      # Ruby dependencies
├── README.md                    # Project overview
├── CONTRIBUTING.md              # Developer guidelines
├── PROJECT_GUIDE.md             # Non-technical guide
├── MEDIA_UPLOAD_GUIDE.md        # Media upload instructions
├── QUICK_START.md               # Quick start for developers
├── QUICK_REFERENCE.md           # Quick reference
├── CHANGELOG.md                 # Version history
├── CODE_OF_CONDUCT.md           # Community guidelines
└── CLAUDE.md                    # This file
```

### Key Configuration Files

#### `_config.yml` (Jekyll Configuration)
```yaml
title: Veer Patta Public School
description: Bilingual learning environment nurturing leaders of tomorrow.
url: "https://veerpatta.github.io"
baseurl: "/veerpatta-website"          # CRITICAL: Required for GitHub Pages
remote_theme: pages-themes/cayman@v0.2.0
plugins:
  - jekyll-remote-theme
  - jekyll-seo-tag
lang: en
permalink: pretty

# Collections
collections:
  news:
    output: true
    permalink: /:collection/:name/

# School Contact Data (used in templates)
school_name: "Veer Patta Public School"
school_phone: "+919413748575"
school_email: "veerpatta.school@gmail.com"
school_address: "Opp. Mela Ground, Amet, Rajasthan - 313332"
school_geo_lat: "25.3040"
school_geo_lng: "73.9271"

# Analytics (disabled by default for privacy)
analytics_enabled: false
analytics_script: "https://plausible.io/js/script.js"
analytics_domain: "veerpatta.github.io"
```

---

## Development Workflows

### Workflow 1: Update Content (Most Common)

**Scenario**: Update text on About page

1. **Edit English version**:
   ```bash
   # Edit en/about.md
   ```

2. **Edit Hindi version** (MANDATORY):
   ```bash
   # Edit hi/about.md
   ```

3. **Commit and push**:
   ```bash
   git add en/about.md hi/about.md
   git commit -m "docs: Update about page with new principal message"
   git push origin main
   ```

4. **Wait 2-3 minutes** for GitHub Pages to rebuild
5. **Verify both versions** at:
   - https://veerpatta.github.io/veerpatta-website/en/about/
   - https://veerpatta.github.io/veerpatta-website/hi/about/

### Workflow 2: Add Gallery Media

**Scenario**: Add new sports photos

1. **Upload files**:
   ```bash
   # Upload to assets/media/gallery/sports/
   # Example: sports-day-2024-relay.jpg
   ```

2. **Register in gallery-items.js**:
   ```javascript
   // assets/js/gallery-items.js
   window.GalleryLoader.registerItems('sports', [
     'sports-day-2024-relay.jpg',
     'sports-day-2024-football.jpg'
   ]);
   ```

3. **Add captions** (optional):
   ```
   # assets/media/gallery/sports/captions.txt
   sports-day-2024-relay.jpg | EN: Annual Sports Day 2024 - Relay Race | HI: वार्षिक खेल दिवस 2024 - रिले दौड़
   ```

4. **Commit and push**:
   ```bash
   git add assets/media/gallery/sports/ assets/js/gallery-items.js
   git commit -m "feat: Add sports day 2024 photos"
   git push origin main
   ```

### Workflow 3: Modify Styles

**Scenario**: Change button colors

1. **Edit CSS (mobile-first)**:
   ```css
   /* assets/css/style.css */

   /* Mobile (default) */
   .btn-primary {
     background-color: #5375E2;
     padding: 12px 24px;
     font-size: 16px;
   }

   /* Tablet+ */
   @media (min-width: 768px) {
     .btn-primary {
       padding: 14px 28px;
       font-size: 18px;
     }
   }
   ```

2. **Test on multiple viewports**:
   - Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
   - Test: 320px, 375px, 768px, 1024px, 1920px

3. **Run Lighthouse**:
   - Check Performance and Accessibility scores

4. **Commit**:
   ```bash
   git add assets/css/style.css
   git commit -m "style: Update primary button colors and sizing"
   git push origin main
   ```

### Workflow 4: Add JavaScript Feature

**Scenario**: Add smooth scroll behavior

1. **Edit main.js using IIFE pattern**:
   ```javascript
   // assets/js/main.js

   /* ============================================
      SMOOTH SCROLL FOR ANCHOR LINKS
      ============================================ */
   (function initSmoothScroll() {
     'use strict';

     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function(e) {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
           target.scrollIntoView({
             behavior: 'smooth',
             block: 'start'
           });
         }
       });
     });
   })();
   ```

2. **Test keyboard accessibility**:
   - Tab through links
   - Enter key should activate

3. **Test on mobile**:
   - Verify smooth scroll works on touch devices

4. **Commit**:
   ```bash
   git add assets/js/main.js
   git commit -m "feat: Add smooth scroll for anchor links"
   git push origin main
   ```

### Workflow 5: Update Header/Footer Navigation

**Scenario**: Add new "Facilities" page

1. **Create content pages**:
   ```markdown
   # en/facilities.md
   ---
   layout: default
   title: Facilities
   permalink: /en/facilities/
   ---

   # Facilities
   Content here...
   ```

   ```markdown
   # hi/facilities.md
   ---
   layout: default
   title: सुविधाएं
   lang: hi
   permalink: /hi/facilities/
   ---

   # सुविधाएं
   सामग्री यहाँ...
   ```

2. **Update header.html**:
   ```liquid
   <!-- _includes/header.html -->
   {% if page.lang == 'hi' %}
     {% assign nav_facilities = 'सुविधाएं' %}
   {% else %}
     {% assign nav_facilities = 'Facilities' %}
   {% endif %}

   <nav>
     <!-- ... other links ... -->
     <a href="{{ '/facilities/' | relative_url }}">{{ nav_facilities }}</a>
   </nav>
   ```

3. **Test both language versions**

4. **Commit**:
   ```bash
   git add en/facilities.md hi/facilities.md _includes/header.html
   git commit -m "feat: Add facilities page in EN/HI"
   git push origin main
   ```

---

## Key Conventions

### File Naming Conventions

**Good**:
- `sports-day-2024.jpg` (descriptive, kebab-case)
- `ncc-drill-practice.mp4` (descriptive, kebab-case)
- `annual-function-chief-guest.jpg` (descriptive)

**Avoid**:
- `IMG_1234.jpg` (not descriptive)
- `my video.mp4` (spaces break URLs)
- `photo.png` (too generic)

### JavaScript Pattern: IIFE (Immediately Invoked Function Expression)

**Why**: No bundler, need namespace isolation

```javascript
/* ============================================
   MODULE NAME AND PURPOSE
   ============================================ */
(function initModuleName() {
  'use strict';

  // Private variables
  const config = {
    speed: 300,
    enabled: true
  };

  // Private functions
  function helperFunction() {
    // ...
  }

  // Public API (if needed)
  const PublicAPI = {
    init: function() {
      // ...
    },

    doSomething: function() {
      // ...
    }
  };

  // Expose to window if needed by other modules
  window.ModuleName = PublicAPI;

  // Auto-init if no external control needed
  // PublicAPI.init();
})();
```

### CSS Class Naming

**Use BEM-inspired naming**:
```css
/* Block */
.header { }

/* Element */
.header__nav { }
.header__logo { }

/* Modifier */
.header--sticky { }
.header--transparent { }
```

**Semantic names**:
```css
/* ✓ Good */
.btn-primary
.card-feature
.section-hero

/* ✗ Bad */
.btn1
.blue-box
.div-3
```

### Animation Pattern: CSS Classes, Not Inline Styles

**Recent Fix**: Animations now use CSS classes instead of inline styles to prevent visibility issues.

```javascript
/* ✗ OLD WAY (caused bugs) */
element.style.opacity = '0';
element.style.transform = 'translateY(20px)';

/* ✓ NEW WAY (correct) */
element.classList.add('card-stagger-hidden');
// ... later ...
element.classList.add('card-stagger-visible');
```

**CSS**:
```css
.card-stagger-hidden {
  opacity: 0;
  transform: translateY(20px);
}

.card-stagger-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.card-stagger-delay-1 { transition-delay: 0.1s; }
.card-stagger-delay-2 { transition-delay: 0.2s; }
/* ... etc ... */
```

### Responsive Breakpoints

```css
/* Mobile: 320px - 767px (default, no media query) */
.element { /* mobile styles */ }

/* Tablet: 768px - 1023px */
@media (min-width: 768px) {
  .element { /* tablet styles */ }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .element { /* desktop styles */ }
}

/* Large Desktop: 1400px+ */
@media (min-width: 1400px) {
  .element { /* large desktop styles */ }
}
```

### Markdown Frontmatter Format

```markdown
---
layout: default
title: Page Title
lang: en              # 'en' or 'hi'
permalink: /en/page/  # Clean URL
description: SEO description here (optional)
---

# Page Heading

Content starts here...
```

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: CSS/design changes (not code style)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```
feat: Add cultural events gallery category
fix: Mobile menu not closing on landscape orientation
docs: Update media upload guide with video compression tips
style: Improve button hover states and animations
refactor: Simplify gallery loading logic
perf: Lazy load below-fold images
chore: Update Jekyll dependencies
```

---

## Common Tasks

### Task 1: Update School Contact Information

**Files to update**:
1. `_config.yml` - School data used globally
2. `en/contact.md` - English contact page
3. `hi/contact.md` - Hindi contact page

```yaml
# _config.yml
school_phone: "+919413748575"
school_email: "veerpatta.school@gmail.com"
```

### Task 2: Add FAQ Item

**Files**: `en/admissions.md` and `hi/admissions.md`

```markdown
## Frequently Asked Questions

### What are the admission requirements?
Students must...

### <-- ADD NEW FAQ HERE -->
```

**Also update JSON-LD structured data** if present:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the admission requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students must..."
      }
    }
  ]
}
</script>
```

### Task 3: Change Brand Colors

**File**: `assets/css/style.css`

**Find and replace**:
```css
/* Current brand colors */
--brand-blue: #5375E2;
--brand-green: #84AC64;
--brand-yellow: #E2D64B;
```

**After changing**, verify:
- Color contrast still meets WCAG AA (4.5:1 for text)
- Consistent across all pages
- Works in both light/dark backgrounds

### Task 4: Add News Post

1. **Create news file**:
   ```markdown
   # _news/2025-01-15-annual-function-en.md
   ---
   layout: default
   title: Annual Function 2025
   date: 2025-01-15
   lang: en
   ---

   Our annual function...
   ```

2. **Create Hindi version**:
   ```markdown
   # _news/2025-01-15-annual-function-hi.md
   ---
   layout: default
   title: वार्षिक समारोह 2025
   date: 2025-01-15
   lang: hi
   ---

   हमारा वार्षिक कार्यक्रम...
   ```

3. **Commit both files**

### Task 5: Update WhatsApp Number

**Files**:
- `_includes/whatsapp.html`
- `_includes/sticky-cta.html`
- `_config.yml` (school_phone)

**Find and replace**: `+919413748575` with new number

### Task 6: Enable Analytics

**File**: `_config.yml`

```yaml
# Change from:
analytics_enabled: false

# To:
analytics_enabled: true
analytics_script: "https://plausible.io/js/script.js"
analytics_domain: "veerpatta.github.io"
```

**Privacy-safe options**:
- Plausible (recommended)
- Umami
- Simple Analytics

**Avoid**: Google Analytics (privacy concerns)

### Task 7: Optimize Image

**Before uploading**:
1. Resize to appropriate dimensions:
   - Hero images: 1920px max width
   - Gallery images: 1200px max width
   - Thumbnails: 400px max width

2. Compress:
   - Use TinyPNG, ImageOptim, or Squoosh
   - Target: <200KB per image

3. Format:
   - Photos: `.jpg` (quality 80-85%)
   - Graphics: `.png` or `.webp`
   - Avoid: `.bmp`, `.tiff`

### Task 8: Fix Broken Link

**Find the link**:
```bash
# Search for the broken URL
grep -r "broken-url" .
```

**Replace with correct URL**:
```liquid
<!-- Remember to use relative_url filter -->
<a href="{{ '/correct/url/' | relative_url }}">Link</a>
```

---

## Testing Requirements

### Pre-Commit Testing Checklist

**Every change must pass**:

#### Visual Testing
- [ ] Test at 320px width (smallest mobile)
- [ ] Test at 375px width (iPhone SE)
- [ ] Test at 414px width (iPhone Pro Max)
- [ ] Test at 768px width (iPad)
- [ ] Test at 1024px width (iPad landscape)
- [ ] Test at 1920px width (desktop)

#### Functional Testing
- [ ] All links work (no 404s)
- [ ] Images load correctly
- [ ] Forms submit successfully (if applicable)
- [ ] Navigation works on mobile and desktop
- [ ] Language switcher toggles correctly
- [ ] WhatsApp button opens with correct message
- [ ] Gallery filtering works

#### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Focus visible on all elements
- [ ] No keyboard traps
- [ ] ARIA labels present and descriptive
- [ ] Images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Screen reader test (if possible)

#### Performance Testing
- [ ] Lighthouse Performance score >90
- [ ] Lighthouse Accessibility score >95
- [ ] No console errors
- [ ] Page load <2s on Fast 3G
- [ ] Total page size <1MB

#### Bilingual Testing
- [ ] English version (`/en/`) works correctly
- [ ] Hindi version (`/hi/`) works correctly
- [ ] Content parity between EN and HI
- [ ] Hindi font (Noto Sans Devanagari) loads
- [ ] `lang` attribute set correctly on `<html>` tag

### Browser Testing Matrix

**Minimum browsers**:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)

**Mobile browsers**:
- Chrome Mobile (Android)
- Safari iOS

### Lighthouse Audit

**Run audit**:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Mobile" device
4. Check all categories
5. Generate report

**Minimum scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

**If scores drop below targets**, investigate and fix before merging.

### Accessibility Testing Tools

**Browser extensions**:
- WAVE (WebAIM)
- axe DevTools
- Lighthouse

**Screen readers**:
- NVDA (Windows)
- VoiceOver (Mac)
- TalkBack (Android)

**Color contrast checkers**:
- WebAIM Contrast Checker
- Coolors Contrast Checker

---

## Deployment Process

### Automatic Deployment Flow

```
Developer Push to GitHub
         ↓
GitHub Actions Triggered (.github/workflows/jekyll.yml)
         ↓
Jekyll Build Process
  - Install Ruby 3.1
  - Install bundler
  - bundle install (with cache)
  - bundle exec jekyll build
         ↓
Generate Static HTML in _site/
         ↓
Upload to GitHub Pages
         ↓
Live at: https://veerpatta.github.io/veerpatta-website/
         ↓
Build Time: 2-3 minutes
```

### Monitoring Deployment

**Check build status**:
1. Go to repository on GitHub
2. Click "Actions" tab
3. Find latest workflow run
4. Green checkmark ✓ = success
5. Red X ✗ = failure (click to see logs)

**Common build failures**:
- Liquid syntax errors
- Invalid YAML frontmatter
- Missing files referenced in includes
- Ruby gem conflicts

### Manual Deployment (if needed)

**Never necessary** - GitHub Pages handles everything automatically on push to `main`.

### Rollback Process

**If deployment breaks**:
1. Revert commit:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. Wait for rebuild (2-3 minutes)

3. Fix issue in new commit

---

## Troubleshooting

### Issue: Changes Not Showing After Push

**Symptoms**: Pushed changes but website hasn't updated

**Solutions**:
1. **Wait 2-3 minutes** - Build takes time
2. **Check Actions tab** - Verify build succeeded
3. **Hard refresh browser** - Ctrl+Shift+R (Cmd+Shift+R on Mac)
4. **Clear browser cache**
5. **Check if pushed to correct branch** - Must be `main`

### Issue: Images Not Loading

**Symptoms**: Broken image icons

**Solutions**:
1. **Check file path**:
   ```liquid
   <!-- Must use relative_url -->
   {{ '/assets/media/image.jpg' | relative_url }}
   ```

2. **Verify file exists** in repository

3. **Check file extension** - `.jpg`, `.png`, `.webp` (case-sensitive)

4. **Check file size** - GitHub has 100MB file limit

5. **Verify commit included file**:
   ```bash
   git add assets/media/image.jpg
   git commit -m "Add image"
   git push
   ```

### Issue: Styles Not Applying

**Symptoms**: Page looks unstyled or wrong

**Solutions**:
1. **Check CSS syntax** - Missing `;` or `}`
2. **Clear browser cache** - Hard refresh
3. **Verify CSS file linked** in `_includes/head.html`:
   ```html
   <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
   ```
4. **Check browser DevTools** - Console for CSS errors
5. **Check CSS specificity** - More specific rule may be overriding

### Issue: Page Not Found (404)

**Symptoms**: Clicking link shows 404 page

**Solutions**:
1. **Check file exists** in correct folder (`/en/` or `/hi/`)
2. **Verify permalink** in frontmatter:
   ```markdown
   ---
   permalink: /en/about/
   ---
   ```
3. **Use relative_url** in link:
   ```liquid
   <a href="{{ '/en/about/' | relative_url }}">About</a>
   ```
4. **Check baseurl** in `_config.yml` - Should be `/veerpatta-website`

### Issue: Mobile Menu Not Working

**Symptoms**: Hamburger menu doesn't open/close

**Solutions**:
1. **Check JavaScript errors** in console
2. **Verify main.js loaded**:
   ```html
   <script src="{{ '/assets/js/main.js' | relative_url }}" defer></script>
   ```
3. **Check mobile menu function** in `main.js`
4. **Test on actual mobile device** - Desktop DevTools may behave differently

### Issue: Build Failing on GitHub Actions

**Symptoms**: Red X in Actions tab

**Solutions**:
1. **Click on failed workflow** to see logs
2. **Common errors**:
   - **Liquid syntax error**: Check `{% %}` and `{{ }}` syntax
   - **YAML frontmatter error**: Verify indentation and colons
   - **Missing include file**: Ensure referenced file exists
   - **Gem dependency issue**: Check Gemfile

3. **Test locally**:
   ```bash
   bundle exec jekyll serve
   ```

4. **Fix error** and push again

### Issue: Bilingual Content Out of Sync

**Symptoms**: EN and HI pages show different content

**Solutions**:
1. **Compare files**:
   ```bash
   diff en/page.md hi/page.md
   ```

2. **Update missing content** in appropriate language

3. **Add to checklist** before committing

### Issue: Slow Performance

**Symptoms**: Lighthouse score <90 or slow page load

**Solutions**:
1. **Optimize images**:
   - Compress with TinyPNG
   - Resize to appropriate dimensions
   - Convert to WebP format

2. **Lazy load images**:
   ```html
   <img src="..." loading="lazy" alt="...">
   ```

3. **Minimize JavaScript**:
   - Remove unused code
   - Use `defer` attribute on scripts

4. **Check network tab** in DevTools - Find largest files

5. **Reduce file sizes**:
   - Minify CSS (if needed)
   - Optimize videos (<50MB)

### Issue: Accessibility Score Dropping

**Symptoms**: Lighthouse Accessibility <95

**Common fixes**:
1. **Add alt text** to all images
2. **Fix color contrast** - Use WebAIM checker
3. **Add ARIA labels** to buttons/links without text
4. **Fix heading hierarchy** - No skipped levels (h1→h2→h3)
5. **Ensure keyboard navigation** - Tab through all elements
6. **Add focus styles** - `:focus` visible

### Issue: Hindi Text Not Displaying Correctly

**Symptoms**: Hindi characters show as boxes or incorrectly

**Solutions**:
1. **Verify font loaded** in `_includes/head.html`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
   ```

2. **Check `lang` attribute**:
   ```html
   <html lang="hi">
   ```

3. **Use UTF-8 encoding**:
   ```html
   <meta charset="UTF-8">
   ```

4. **Increase line-height** for Devanagari:
   ```css
   html[lang="hi"] {
     font-family: 'Noto Sans Devanagari', sans-serif;
     line-height: 1.8;
   }
   ```

---

## Additional Resources

### Documentation Files to Reference

| File | Purpose | When to Read |
|------|---------|--------------|
| README.md | Project overview | First time setup |
| CONTRIBUTING.md | Developer guidelines | Before contributing |
| docs/ARCHITECTURE.md | Technical architecture | Understanding structure |
| QUICK_START.md | Quick reference | Fast onboarding |
| MEDIA_UPLOAD_GUIDE.md | Media uploads | Adding images/videos |
| CHANGELOG.md | Version history | See what changed |
| PROJECT_GUIDE.md | Non-technical guide | Context for decisions |

### External Resources

**Jekyll Documentation**:
- https://jekyllrb.com/docs/
- https://shopify.github.io/liquid/ (Liquid templates)

**GitHub Pages**:
- https://docs.github.com/en/pages

**Web Standards**:
- https://www.w3.org/WAI/WCAG21/quickref/ (WCAG AA)
- https://web.dev/learn/ (Web performance)

**Testing Tools**:
- https://developers.google.com/web/tools/lighthouse (Lighthouse)
- https://wave.webaim.org/ (WAVE accessibility)
- https://pagespeed.web.dev/ (PageSpeed Insights)

### Design System Reference

**Brand Colors**:
```css
--brand-blue: #5375E2;      /* Primary - Header, buttons */
--brand-green: #84AC64;     /* Secondary - Accents */
--brand-yellow: #E2D64B;    /* Tertiary - Highlights */
--text-color: #1e2430;      /* Body text */
--bg-color: #FEFEFE;        /* Background */
```

**Typography**:
- English: Poppins (18px base, 1.6 line-height)
- Hindi: Noto Sans Devanagari (20px base, 1.8 line-height)

**Spacing Scale** (use these):
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

**Touch Targets**:
- Minimum: 48x48px
- Recommended: 56x56px

---

## Summary: Quick Reminders

### Before Every Commit
1. ✅ Updated both EN and HI content
2. ✅ Used `relative_url` filter for all URLs
3. ✅ Tested on mobile (320px width minimum)
4. ✅ Checked keyboard accessibility
5. ✅ Ran Lighthouse audit
6. ✅ No console errors
7. ✅ Updated CHANGELOG.md if significant

### Common Patterns to Follow
- **URLs**: `{{ url | relative_url }}`
- **CSS**: Mobile-first with `min-width` media queries
- **JavaScript**: IIFE pattern, vanilla JS only
- **Animations**: CSS classes, not inline styles
- **Accessibility**: Semantic HTML, ARIA labels, keyboard support

### Files You'll Edit Most
- `en/*.md` and `hi/*.md` - Content updates
- `assets/css/style.css` - Style changes
- `assets/js/main.js` - JavaScript features
- `_includes/header.html` - Navigation changes
- `assets/js/gallery-items.js` - Gallery media

### Critical Don'ts
- ❌ Don't update only EN or only HI (maintain parity)
- ❌ Don't use hardcoded URLs (use `relative_url`)
- ❌ Don't use `max-width` media queries (mobile-first only)
- ❌ Don't add npm packages without discussion
- ❌ Don't ignore accessibility requirements
- ❌ Don't commit without testing on mobile

---

**Last Updated**: 2025-11-16

**Maintained By**: Veer Patta Public School Development Team

**Questions?** Open an issue or contact veerpatta.school@gmail.com
