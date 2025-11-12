# Agents Guide for Veer Patta Public School Website

> **Quick Start for AI Agents**: This document provides everything you need to understand and work effectively on this codebase. Read this first before making any changes.

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Critical Constraints](#critical-constraints)
- [Directory Structure](#directory-structure)
- [Development Workflow](#development-workflow)
- [Common Tasks](#common-tasks)
- [Code Patterns](#code-patterns)
- [Testing Guidelines](#testing-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

**Veer Patta Public School Website** is a bilingual (English/Hindi) static site built with Jekyll and hosted on GitHub Pages. The site serves as the official web presence for a public school in Amet, Rajasthan, India.

### Key Facts
- **Type**: Static site (Jekyll-based)
- **Hosting**: GitHub Pages
- **Languages**: English (`/en/`) and Hindi (`/hi/`)
- **Target Audience**: Parents and students in semi-rural India
- **Primary Devices**: Budget Android phones on 3G networks
- **Live URL**: https://veerpatta.github.io/veerpatta-website/
- **Repository Size**: 944KB (50 source files)
- **Build Time**: 2-3 minutes

### Design Principles
1. **Mobile-first**: 70% of users on budget smartphones
2. **Performance**: Optimized for 3G networks (~0.8s First Contentful Paint)
3. **Accessibility**: WCAG AA compliant
4. **Bilingual parity**: All changes must be made in both EN and HI
5. **Simplicity**: No complex frameworks; easy for non-experts to maintain

---

## Technology Stack

### Core Technologies
```yaml
Static Site Generator: Jekyll 4.x
Templating:            Liquid
Content Format:        Markdown with YAML frontmatter
Styling:               CSS3 (mobile-first, no preprocessor)
Scripting:             Vanilla JavaScript ES6+ (no frameworks)
Hosting:               GitHub Pages
CI/CD:                 GitHub Actions
```

### Dependencies (Gemfile)
```ruby
gem "jekyll", "~> 3.10.0"        # Jekyll core
gem "github-pages", "~> 232"     # GitHub Pages bundle
gem "jekyll-remote-theme"        # Remote theme support
gem "jekyll-seo-tag"             # SEO meta tags
```

### Key Configuration (_config.yml)
```yaml
baseurl: "/veerpatta-website"    # CRITICAL: Required for GitHub Pages
remote_theme: pages-themes/cayman@v0.2.0
plugins: [jekyll-remote-theme, jekyll-seo-tag]
lang: en                          # Default language
permalink: pretty                 # Clean URLs
analytics_enabled: false          # Privacy-first
```

---

## Critical Constraints

### MUST Follow Rules

#### 1. Bilingual Parity (CRITICAL)
**All content changes MUST be made in both `/en/` and `/hi/` directories.**
- If you update `en/about.md`, you MUST update `hi/about.md`
- Test both language versions before committing
- Use proper Hindi fonts: Noto Sans Devanagari

#### 2. Always Use `relative_url` Filter
**All URLs in Liquid templates MUST use the `relative_url` filter.**
```liquid
<!-- ✓ CORRECT -->
<a href="{{ '/en/about/' | relative_url }}">About</a>
<img src="{{ '/assets/images/logo.jpg' | relative_url }}">

<!-- ✗ WRONG (breaks on GitHub Pages) -->
<a href="/en/about/">About</a>
<img src="/assets/images/logo.jpg">
```

#### 3. Mobile-First CSS
**Write CSS mobile-first with progressive enhancement.**
```css
/* Base styles for mobile (320px+) */
.element { padding: 16px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .element { padding: 24px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .element { padding: 32px; }
}
```

#### 4. No Breaking Changes Without Testing
- Test on mobile (320px, 375px, 414px)
- Test on tablet (768px, 1024px)
- Test on desktop (1280px, 1920px)
- Test both English and Hindi pages
- Run Lighthouse for performance/accessibility

#### 5. Preserve Accessibility
- Maintain semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Keep ARIA labels on interactive elements
- Ensure keyboard navigation works
- Maintain color contrast (WCAG AA: 4.5:1 minimum)
- Test with screen reader if possible

---

## Directory Structure

```
veerpatta-website/
├── en/                          # English pages (7 files)
│   ├── index.md                # Homepage
│   ├── about.md                # About page
│   ├── academics.md            # Academics page
│   ├── admissions.md           # Admissions page
│   ├── gallery.md              # Gallery with filtering
│   ├── contact.md              # Contact form
│   └── privacy.md              # Privacy policy
│
├── hi/                          # Hindi pages (mirror of en/)
│   └── [same structure as en/]
│
├── _includes/                   # Reusable components
│   ├── head.html               # <head> with meta, SEO, critical CSS
│   ├── header.html             # Mobile-first navigation
│   ├── footer.html             # Footer with language awareness
│   ├── analytics.html          # Optional analytics
│   └── whatsapp.html           # WhatsApp floating button
│
├── _layouts/                    # Page templates
│   └── default.html            # Main layout wrapper
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Main stylesheet (1603 lines)
│   │   └── animations.css      # Animation definitions
│   ├── js/
│   │   ├── main.js             # Core functionality (~520 lines)
│   │   ├── media-loader.js     # Media utility (~100 lines)
│   │   ├── gallery-loader.js   # Gallery system (~90 lines)
│   │   ├── gallery-items.js    # User-editable registry (~40 lines)
│   │   └── home-media-loader.js # Homepage media (~90 lines)
│   ├── images/                 # Static images
│   │   └── VPPS LOGO ONNLY.jpg # Official school logo
│   └── media/                  # User-uploaded media
│       ├── home/               # Hero and program cards
│       ├── gallery/            # Categorized gallery media
│       │   ├── sports/
│       │   ├── ncc/
│       │   ├── cultural/
│       │   ├── academic/
│       │   └── celebrations/
│       └── [other page media]/
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md         # Technical deep-dive
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── [other docs]
│
├── .github/workflows/
│   └── jekyll.yml              # GitHub Actions CI/CD
│
├── _config.yml                  # Jekyll configuration
├── index.html                   # Root redirect to /en/
├── 404.html                     # Custom 404 page
├── sitemap.xml                  # SEO sitemap
└── robots.txt                   # Search engine instructions
```

### Key File Purposes
| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `en/*.md` | English content pages | High |
| `hi/*.md` | Hindi content pages | High |
| `_includes/header.html` | Site navigation | Medium |
| `_includes/footer.html` | Footer content | Low |
| `assets/css/style.css` | All styling | Medium |
| `assets/js/main.js` | Core interactions | Low |
| `assets/media/` | Photos/videos | High |
| `_config.yml` | Site configuration | Low |

---

## Development Workflow

### Local Development (Optional)
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# View at http://localhost:4000/veerpatta-website/
```

### GitHub Actions Workflow
**Automatic deployment** on push to `main` branch:
1. Checkout code
2. Setup Ruby 3.1
3. Install gems via Bundler
4. Build Jekyll site
5. Deploy to GitHub Pages

**No manual deployment needed.**

### Making Changes

#### For Content Updates
1. Edit markdown files in `en/` and `hi/`
2. Use YAML frontmatter for page metadata
3. Maintain consistent structure between languages
4. Test locally if possible
5. Commit and push to trigger deployment

#### For Code/Style Updates
1. Edit files in `assets/`, `_includes/`, or `_layouts/`
2. Test changes locally
3. Run Lighthouse for performance check
4. Test on multiple screen sizes
5. Commit and push

---

## Common Tasks

### Task 1: Add a New Page

#### Steps:
1. **Create English page** (`en/new-page.md`):
```markdown
---
layout: default
title: Page Title
description: SEO description
lang: en
permalink: /en/new-page/
---

# Page Heading

Content here...
```

2. **Create Hindi page** (`hi/new-page.md`):
```markdown
---
layout: default
title: पेज शीर्षक
description: SEO विवरण
lang: hi
permalink: /hi/new-page/
---

# पेज शीर्षक

सामग्री यहाँ...
```

3. **Add navigation links** to `_includes/header.html`:
```liquid
{% if current_lang == 'en' %}
  <a href="{{ '/en/new-page/' | relative_url }}">New Page</a>
{% else %}
  <a href="{{ '/hi/new-page/' | relative_url }}">नया पेज</a>
{% endif %}
```

4. **Test both versions** before committing.

### Task 2: Update Styles

#### Location: `assets/css/style.css`

**Example: Change brand color**
```css
:root {
  --brand-blue: #5375E2;    /* Change this value */
}
```

**Example: Add new component**
```css
/* Base (mobile) */
.new-component {
  padding: 16px;
  background: var(--brand-bg);
}

/* Tablet */
@media (min-width: 768px) {
  .new-component {
    padding: 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .new-component {
    padding: 32px;
    max-width: 1400px;
  }
}
```

### Task 3: Add Gallery Media

#### Steps:
1. **Upload files** to `assets/media/gallery/{category}/`
   - Categories: sports, ncc, cultural, academic, celebrations
   - Supported: .jpg, .png, .webp, .mp4, .webm

2. **Register files** in `assets/js/gallery-items.js`:
```javascript
window.GalleryLoader.registerItems('sports', [
  'relay-race.jpg',
  'football-match.mp4',
  'cricket.jpg'
]);
```

3. **Add captions** (optional) in `assets/media/gallery/{category}/captions.txt`:
```
relay-race.jpg | EN: Students competing in relay race | HI: रिले दौड़ में प्रतिस्पर्धा करते छात्र
```

4. **Test gallery page** to ensure media loads correctly.

### Task 4: Update Contact Information

#### Location: `_includes/header.html` and `_includes/whatsapp.html`

**WhatsApp number**: Search for `919413748575` and replace
**Pre-filled message**: Update the `text=` parameter in WhatsApp URLs

### Task 5: Fix a Bug

#### Process:
1. **Reproduce the bug** on multiple devices/browsers
2. **Identify the root cause** using browser DevTools
3. **Make the fix** in the appropriate file
4. **Test thoroughly** (mobile, tablet, desktop, both languages)
5. **Check for side effects** on other pages
6. **Commit with descriptive message**: `fix: [description of bug]`

---

## Code Patterns

### Liquid Template Patterns

#### Language Detection
```liquid
{% assign segments = page.url | split: '/' %}
{% assign lang_segment = segments[1] %}
{% if lang_segment == 'hi' %}
  {% assign nav_home = 'होम' %}
  {% assign current_lang = 'hi' %}
{% else %}
  {% assign nav_home = 'Home' %}
  {% assign current_lang = 'en' %}
{% endif %}
```

#### Conditional Content
```liquid
{% if page.lang == 'hi' %}
  <h1>हिंदी शीर्षक</h1>
{% else %}
  <h1>English Heading</h1>
{% endif %}
```

#### URL Handling (CRITICAL)
```liquid
<!-- Always use relative_url -->
<a href="{{ '/en/about/' | relative_url }}">About</a>
<img src="{{ '/assets/images/logo.jpg' | relative_url }}" alt="Logo">

<!-- For absolute URLs (SEO) -->
<link rel="canonical" href="{{ page.url | absolute_url }}">
```

#### Hreflang Tags (SEO)
```liquid
{% if lang_segment == 'en' %}
  {% assign alt_hi = page.url | replace_first: '/en/', '/hi/' | absolute_url %}
  <link rel="alternate" href="{{ alt_hi }}" hreflang="hi">
  <link rel="alternate" href="{{ page.url | absolute_url }}" hreflang="en">
{% elsif lang_segment == 'hi' %}
  {% assign alt_en = page.url | replace_first: '/hi/', '/en/' | absolute_url %}
  <link rel="alternate" href="{{ alt_en }}" hreflang="en">
  <link rel="alternate" href="{{ page.url | absolute_url }}" hreflang="hi">
{% endif %}
```

### CSS Patterns

#### Mobile-First Responsive
```css
/* Default (mobile) */
.element {
  padding: 16px;
  font-size: 14px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .element {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .element {
    padding: 32px;
    font-size: 18px;
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

#### CSS Variables (Color System)
```css
:root {
  --brand-blue: #5375E2;
  --brand-green: #84AC64;
  --brand-yellow: #E2D64B;
  --brand-bg: #FEFEFE;
  --text-color: #1e2430;
  --muted-text: #4f5b75;
}

.element {
  background: var(--brand-blue);
  color: var(--brand-bg);
}
```

#### Accessibility Focus States
```css
.button {
  /* Base styles */
}

.button:focus-visible {
  outline: 2px solid var(--brand-blue);
  outline-offset: 2px;
}
```

### JavaScript Patterns

#### Module Pattern (IIFE)
```javascript
(function() {
  // Private scope
  const privateVar = 'hidden';

  function privateFunction() {
    // Not accessible outside
  }

  // Public API
  window.PublicAPI = {
    method: function() {
      privateFunction();
    }
  };
})();
```

#### IntersectionObserver (Scroll Animations)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target); // Stop observing
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

#### DOM Manipulation (Classes)
```javascript
// Toggle menu
const menu = document.getElementById('mobileNav');
menu.classList.add('active');      // Open
menu.classList.remove('active');   // Close
menu.classList.toggle('active');   // Toggle
```

#### Async File Checking
```javascript
async function fileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Usage
if (await fileExists('/assets/media/home/hero-video.mp4')) {
  loadVideo('/assets/media/home/hero-video.mp4');
}
```

---

## Testing Guidelines

### Manual Testing Checklist

#### Device Testing
- [ ] **Mobile**: 320px, 375px, 414px (Chrome DevTools)
- [ ] **Tablet**: 768px, 1024px
- [ ] **Desktop**: 1280px, 1920px
- [ ] **Real devices**: Test on at least one Android phone

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

#### Language Testing
- [ ] Test all changes in **both** `/en/` and `/hi/` pages
- [ ] Verify Hindi font renders correctly (Noto Sans Devanagari)
- [ ] Check language switcher works

#### Functionality Testing
- [ ] Navigation works on all pages
- [ ] Mobile menu opens/closes smoothly
- [ ] WhatsApp button opens with pre-filled message
- [ ] Gallery filters work (All, Sports, NCC, etc.)
- [ ] All links work (no 404s)
- [ ] Images load correctly
- [ ] Videos play with controls
- [ ] No console errors in DevTools

#### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] All images have alt text
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Screen reader test (NVDA or VoiceOver if possible)

#### Performance Testing
- [ ] Run Lighthouse audit
  - Performance: >90
  - Accessibility: >95
  - Best Practices: >90
  - SEO: >95
- [ ] Check total page size (<1MB)
- [ ] Test on throttled 3G network

### Testing Tools
- **Lighthouse**: Built into Chrome DevTools
- **WAVE**: WebAIM accessibility checker
- **axe DevTools**: Accessibility audit browser extension
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile Testing**: Chrome DevTools device emulation

---

## Deployment

### Automatic Deployment (Preferred)
**Trigger**: Push to `main` branch

**Process**:
1. GitHub Actions workflow triggers
2. Ruby 3.1 environment setup
3. Bundle install (dependencies)
4. `bundle exec jekyll build`
5. Deploy to GitHub Pages
6. Live in ~2-3 minutes

### Manual Build (Optional, for testing)
```bash
bundle exec jekyll build
# Output in _site/ directory
```

### Rollback
If something breaks:
```bash
git revert <commit-hash>
git push origin main
```
GitHub Actions will automatically deploy the reverted version.

---

## Troubleshooting

### Problem: Site not updating after push

**Solution**:
1. Check GitHub Actions tab for build errors
2. Wait 2-3 minutes for deployment to complete
3. Hard refresh browser (Ctrl+Shift+R)
4. Check if changes were actually pushed: `git log --oneline -5`

### Problem: Images not loading

**Solution**:
1. Verify image path uses `relative_url` filter
2. Check file exists in `assets/images/` or `assets/media/`
3. Check filename case sensitivity (Linux is case-sensitive)
4. Verify image is committed and pushed

### Problem: CSS changes not appearing

**Solution**:
1. Hard refresh browser (Ctrl+Shift+R)
2. Check browser DevTools for CSS file load errors
3. Verify CSS syntax is valid (no missing braces)
4. Check if changes are in `assets/css/style.css` (not elsewhere)

### Problem: Mobile menu not working

**Solution**:
1. Check browser console for JavaScript errors
2. Verify `main.js` is loading: check Network tab in DevTools
3. Check if HTML structure changed in `_includes/header.html`
4. Verify menu button has correct `id="mobileMenuBtn"`

### Problem: Hindi text not rendering correctly

**Solution**:
1. Verify Noto Sans Devanagari font is loading
2. Check `<head>` includes font link:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```
3. Check CSS applies correct font:
   ```css
   [lang="hi"], .lang-hi {
     font-family: 'Noto Sans Devanagari', sans-serif;
   }
   ```

### Problem: Gallery not loading media

**Solution**:
1. Check `gallery-items.js` has files registered
2. Verify files exist in `assets/media/gallery/{category}/`
3. Check browser console for fetch errors
4. Verify file extensions match: `.jpg`, `.png`, `.webp`, `.mp4`, `.webm`

### Problem: Build failing in GitHub Actions

**Solution**:
1. Check Actions tab for error logs
2. Common causes:
   - Liquid syntax error in templates
   - Invalid YAML frontmatter
   - Broken markdown syntax
   - Missing closing tags in HTML
3. Test build locally: `bundle exec jekyll build`
4. Fix errors and push again

### Problem: Accessibility score dropped

**Solution**:
1. Run Lighthouse audit to identify issues
2. Common causes:
   - Missing alt text on images
   - Insufficient color contrast
   - Missing ARIA labels
   - Improper heading hierarchy
3. Fix identified issues
4. Re-run Lighthouse to verify

---

## Quick Reference

### Essential Commands
```bash
# Local development
bundle install                    # Install dependencies
bundle exec jekyll serve          # Start local server
bundle exec jekyll build          # Build site to _site/

# Git workflow
git add .                         # Stage changes
git commit -m "description"       # Commit with message
git push origin main              # Push to trigger deployment

# Check status
git status                        # See changed files
git log --oneline -5              # Recent commits
```

### File Locations Quick Reference
| What | Where |
|------|-------|
| English pages | `en/*.md` |
| Hindi pages | `hi/*.md` |
| Navigation | `_includes/header.html` |
| Footer | `_includes/footer.html` |
| All styles | `assets/css/style.css` |
| Main JavaScript | `assets/js/main.js` |
| Gallery media | `assets/media/gallery/{category}/` |
| School logo | `assets/images/VPPS LOGO ONNLY.jpg` |
| Site config | `_config.yml` |

### Important URLs
| Purpose | URL |
|---------|-----|
| Live site | https://veerpatta.github.io/veerpatta-website/ |
| GitHub repo | https://github.com/veerpatta/veerpatta-website |
| Actions (CI/CD) | https://github.com/veerpatta/veerpatta-website/actions |

### CSS Breakpoints
```css
/* Mobile: 320px - 767px (default) */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

### Color Variables
```css
--brand-blue: #5375E2;
--brand-green: #84AC64;
--brand-yellow: #E2D64B;
--brand-bg: #FEFEFE;
--text-color: #1e2430;
--muted-text: #4f5b75;
```

---

## Best Practices for AI Agents

### Before Making Changes
1. **Read this document first** (you're doing it!)
2. **Understand the context** of the change
3. **Check both language versions** if touching content
4. **Identify affected files** before editing

### While Making Changes
1. **Follow bilingual parity rule** religiously
2. **Use `relative_url` filter** for all URLs
3. **Test changes** if possible (local or in browser)
4. **Maintain accessibility** features
5. **Write mobile-first CSS**

### After Making Changes
1. **Verify both EN and HI pages** work
2. **Check for console errors** in DevTools
3. **Test on multiple screen sizes**
4. **Run Lighthouse** if major changes
5. **Write clear commit messages**

### Communication Style
1. **Be concise** in explanations
2. **Show code examples** when suggesting changes
3. **Explain rationale** for decisions
4. **Flag breaking changes** clearly
5. **Ask for clarification** if requirements unclear

### When Uncertain
1. **Check existing patterns** in codebase
2. **Refer to documentation** in `docs/` directory
3. **Test thoroughly** before committing
4. **Ask user for clarification** rather than guessing
5. **Document new patterns** if introducing them

---

## Additional Resources

### Documentation Files
- `README.md` - Project overview
- `docs/ARCHITECTURE.md` - Technical deep-dive
- `docs/DEPLOYMENT.md` - Deployment guide
- `CONTRIBUTING.md` - Developer guidelines
- `PROJECT_GUIDE.md` - Non-technical guide
- `MEDIA_UPLOAD_GUIDE.md` - Media upload instructions
- `QUICK_START.md` - Quick start for developers

### External Resources
- Jekyll documentation: https://jekyllrb.com/docs/
- Liquid syntax: https://shopify.github.io/liquid/
- GitHub Pages: https://docs.github.com/en/pages
- Lighthouse: https://developer.chrome.com/docs/lighthouse/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

## Summary

This codebase is **production-ready**, well-documented, and optimized for its target audience. It prioritizes:

1. **Performance** - Fast on 3G networks
2. **Accessibility** - WCAG AA compliant
3. **Simplicity** - No complex frameworks
4. **Maintainability** - Clear patterns, good documentation
5. **Bilingual support** - Full English and Hindi parity

**Key principle**: Make changes thoughtfully, test thoroughly, and maintain the bilingual nature of the site.

---

## Questions?

If you encounter issues not covered in this guide:
1. Check the `docs/` directory for specific documentation
2. Review the codebase for similar patterns
3. Ask the user for clarification
4. Document new patterns you introduce

**Happy coding!**
