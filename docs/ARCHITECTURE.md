# Technical Architecture - Veer Patta Public School Website

## Overview

This document describes the technical architecture of the Veer Patta Public School website for developers and coding agents.

## Technology Stack

### Core Technologies
- **Jekyll 4.x** - Static site generator
- **GitHub Pages** - Hosting platform
- **Liquid** - Templating language
- **Markdown** - Content format
- **HTML5** - Semantic markup
- **CSS3** - Styling (Mobile-first)
- **JavaScript (ES6+)** - Client-side functionality

### Dependencies
- `jekyll-remote-theme` - Remote theme support
- `jekyll-seo-tag` - SEO meta tags
- `pages-themes/cayman@v0.2.0` - Base theme

### No Build Tools Required
- No Node.js/npm
- No webpack/bundler
- No preprocessors (Sass compilation handled by Jekyll)
- Direct deployment to GitHub Pages

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         GitHub Pages                         │
│                    (Hosting & Build Server)                  │
└─────────────────┬───────────────────────────────────────────┘
                  │ Automatic Build on Push
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                      Jekyll Builder                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. Read _config.yml                                  │   │
│  │ 2. Process Liquid templates                          │   │
│  │ 3. Convert Markdown → HTML                           │   │
│  │ 4. Apply layouts from _layouts/                      │   │
│  │ 5. Include partials from _includes/                  │   │
│  │ 6. Copy assets/                                      │   │
│  │ 7. Generate sitemap.xml                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │ Outputs _site/
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    Static HTML Website                       │
│              veerpatta.github.io/veerpatta-website/          │
└──────────────────────────────────────────────────────────────┘
```

## Directory Structure Deep Dive

### Content Pages (`/en/` and `/hi/`)

**Purpose**: Store Markdown content for all pages in both languages

**Structure**:
```
en/                          hi/
├── index.md                ├── index.md
├── about.md                ├── about.md
├── academics.md            ├── academics.md
├── admissions.md           ├── admissions.md
├── gallery.md              ├── gallery.md
├── contact.md              ├── contact.md
└── privacy.md              └── privacy.md
```

**File Format** (Frontmatter + Content):
```markdown
---
layout: default
title: About Us
lang: en              # or 'hi' for Hindi
permalink: /en/about/
---

# About Us
Content here...
```

**Key Points**:
- Each English page has a Hindi equivalent
- `lang: hi` in frontmatter sets `<html lang="hi">` for screen readers
- Permalink defines URL structure
- Content uses Markdown syntax

### Layouts (`/_layouts/`)

**Purpose**: Define page templates

**Files**:
- `default.html` - Main layout for all pages

**Structure**:
```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: 'en' }}">
  {% include head.html %}
  <body>
    {% include header.html %}
    
    <main>
      {{ content }}  <!-- Page content inserted here -->
    </main>
    
    {% include footer.html %}
    {% include whatsapp.html %}
    {% include analytics.html %}
  </body>
</html>
```

### Assets (`/assets/`)

#### CSS (`/assets/css/`)

**Files**:
- `style.css` - Main stylesheet (~15KB)
- `animations.css` - Animation definitions

**Mobile-First Approach**:
- Base styles target 320px+ (mobile)
- Progressive enhancement via `@media (min-width: ...)`
- No `max-width` queries

#### JavaScript (`/assets/js/`)

**Files**:

| File | Purpose | Size | Dependencies |
|------|---------|------|--------------|
| `main.js` | Core functionality | ~7KB | None |
| `gallery-loader.js` | Gallery system core | ~3KB | None |
| `gallery-items.js` | Gallery item registry | ~1KB | gallery-loader.js |
| `media-loader.js` | Generic media loader | ~2KB | None |
| `home-media-loader.js` | Homepage media | ~1KB | media-loader.js |

**Module Pattern** (No bundler, using IIFE):

```javascript
// gallery-loader.js
(function() {
  'use strict';
  
  const GalleryLoader = {
    items: {},
    
    registerItems(category, files) {
      this.items[category] = files;
    },
    
    loadCategory(category) {
      // Load and display items
    }
  };
  
  // Expose to global scope
  window.GalleryLoader = GalleryLoader;
})();
```

## Responsive Design

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | 320px - 767px | Single column, hamburger menu |
| Tablet | 768px - 1023px | Multi-column, desktop nav |
| Desktop | 1024px+ | Full layout, max-width 1400px |

### Mobile-First CSS

```css
/* Mobile (default) */
.container {
  padding: 16px;
  width: 100%;
}

/* Tablet up */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    max-width: 1100px;
  }
}

/* Desktop up */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

## Configuration

### Jekyll Config (`_config.yml`)

```yaml
# Site Info
title: Veer Patta Public School
description: Bilingual learning environment...
url: "https://veerpatta.github.io"
baseurl: "/veerpatta-website"

# Theme
remote_theme: pages-themes/cayman@v0.2.0

# Plugins
plugins:
  - jekyll-remote-theme
  - jekyll-seo-tag

# Defaults
lang: en
permalink: pretty

# Analytics (disabled by default)
analytics_enabled: false
analytics_script: "https://plausible.io/js/script.js"
analytics_domain: "veerpatta.github.io"
```

## Performance Benchmarks

### Current Metrics (Mobile)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint | <1.5s | ~0.8s | ✅ |
| Time to Interactive | <3s | ~1.9s | ✅ |
| Total Page Size | <1MB | ~450KB | ✅ |
| Lighthouse Performance | >90 | ~92 | ✅ |
| Lighthouse Accessibility | >95 | ~98 | ✅ |

## Resources

### Documentation
- [Jekyll Docs](https://jekyllrb.com/docs/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Liquid Template Docs](https://shopify.github.io/liquid/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility](https://wave.webaim.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Document Version**: 1.0
**Last Updated**: November 2025

For questions, see [CONTRIBUTING.md](../CONTRIBUTING.md) or open an issue.
