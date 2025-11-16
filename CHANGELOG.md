# Changelog

All notable changes to the Veer Patta Public School website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Website Modernization (2025-01-16)**:
  - **Testimonial Carousel System**: Auto-rotating carousel with 6 parent testimonials, touch/swipe gestures, keyboard navigation, and glassmorphism design
  - **Interactive Admission Wizard**: 5-step admission flow with localStorage progress tracking, document checklist, and WhatsApp integration
  - **Smart Fee Calculator**: Grade-based fee structure with automatic discounts (sibling 10%, annual 10%, merit 15%, early bird 5%), transport zones, and PDF export
  - **Animated Stats Dashboard**: Performance metrics with animated counters, Intersection Observer, and glassmorphism cards
  - **Marketing Analytics Tracker**: Privacy-focused client-side analytics tracking scroll depth, time on page, exit intent, CTA clicks, and engagement scoring
  - **Enhanced WhatsApp Integration**: Contextual pre-filled messages based on page context, online badge during school hours
  - **Modern CSS Components**: New `modern-components.css` with glassmorphism utilities, gradient system, and 1500+ lines of modern styles
  - **Enhanced Animations**: Testimonial slide transitions, wizard progress bar shimmer, fee table row stagger, stats counter animation, glass shimmer effect
  - **New Data Structures**: `/_data/testimonials.yml` with 6 bilingual testimonials, performance stats in `_config.yml`
  - **New Include Components**: `admission-wizard.html`, `fee-calculator.html`, `stats-dashboard.html`
  - **Comprehensive Documentation**: `MODERNIZATION_SUMMARY.md` with complete implementation guide, testing checklist, and maintenance instructions

- **New JavaScript Files (4)**:
  - `/assets/js/testimonial-carousel.js` - Carousel functionality with auto-play, touch support, and visibility API integration
  - `/assets/js/admission-wizard.js` - Step-by-step admission flow with localStorage persistence
  - `/assets/js/fee-calculator.js` - Interactive fee calculation with multiple discount types
  - `/assets/js/analytics-tracker.js` - Client-side analytics with engagement scoring

- **New CSS Files (1)**:
  - `/assets/css/modern-components.css` - Modern component library with glassmorphism and gradients

### Changed
- **Enhanced CSS Files**:
  - `/assets/css/animations.css` - Added 200+ lines for testimonial, wizard, fee calculator, and stats animations

- **Enhanced Include Files**:
  - `/_includes/whatsapp.html` - Context-aware messaging, online badge, bilingual support

- **Configuration Updates**:
  - `_config.yml` - Added performance stats section (pass_percentage, university_admits, sports_medals, ncc_cadets)

### Fixed
- **Animation and Visibility Issues (2025-11-13)**:
  - Fixed trust badges and "Why Parents Choose" cards remaining permanently invisible due to inline style conflicts
  - Removed inline style manipulation (`opacity: 0`, `transform`) in animation JavaScript - now uses CSS classes exclusively
  - Elements above the fold now animate correctly on page load instead of staying hidden
  - Elements below the fold animate smoothly when scrolled into view
  - Improved fallback behavior for browsers without IntersectionObserver support
  - Added new CSS classes: `.card-stagger-hidden`, `.card-stagger-visible`, and `.card-stagger-delay-1` through `.card-stagger-delay-6`
  - Updated `initStaggeredCards()` and `initScrollAnimations()` functions to use CSS classes instead of inline styles
  - Fixed issue where CSS default styles (`opacity: 1; transform: none;`) were being overridden by JavaScript inline styles
  - WhatsApp CTA properly integrated - no duplicates on mobile (desktop header button, sticky CTA bar on all devices, floating button hidden on mobile)

### Added
- **Marketing Features (2025-11-12)**:
  - Sticky CTA bar with Call, WhatsApp, Admissions, and Directions buttons
  - Bottom-sheet enquiry drawer with bilingual form validation
  - Enhanced admissions pages with 10 FAQ items (EN/HI parity)
  - JSON-LD FAQPage schema for improved SEO
  - School/Organization JSON-LD structured data
  - Privacy-first analytics event tracking for CTA interactions
  - News collection with sample posts (EN/HI)
  - News list pages at `/en/news/` and `/hi/news/`
  - PWA-lite support with manifest and service worker
  - Stale-while-revalidate caching for offline access
- PROJECT_GUIDE.md - Comprehensive guide for non-technical users
- CONTRIBUTING.md - Developer and coding agent guidelines
- docs/ARCHITECTURE.md - Technical architecture documentation
- CHANGELOG.md - This file, for tracking changes
- .gitignore - Standard Jekyll gitignore configuration
- CODE_OF_CONDUCT.md - Community guidelines
- .github/ directory with issue and PR templates

### Changed
- README.md - Updated with better navigation and structure
- Repository structure - Organized documentation in docs/ folder
- `_config.yml` - Added school contact data and news collection configuration
- Header navigation - Added "News" link in both English and Hindi versions
- Admissions pages - Expanded FAQ sections from 6 to 10 questions
- Default layout - Integrated sticky CTA bar and enquiry drawer globally

## [1.0.0] - 2025-11-09

### Added
- Complete bilingual website (English/Hindi)
- Mobile-first responsive header design
- Gallery system with 5 categories (Sports, NCC, Cultural, Academic, Celebrations)
- Media upload system for easy content updates
- WhatsApp contact integration
- Privacy-safe analytics support (disabled by default)
- Comprehensive documentation (MEDIA_UPLOAD_GUIDE, QUICK_REFERENCE, etc.)
- QA validation and accessibility compliance (WCAG AA)

### Features
- 7 pages in both languages (Home, About, Academics, Admissions, Gallery, Contact, Privacy)
- Lazy loading for images and videos
- Bilingual caption support
- Mobile menu with smooth animations
- Sticky WhatsApp button for easy contact
- SEO optimized with meta tags and structured data
- Responsive design for all devices (320px - 2560px)

### Performance
- Lighthouse Performance Score: >90
- Lighthouse Accessibility Score: >98
- Fast loading on 3G networks (<2s Time to Interactive)
- Optimized for budget Android smartphones

### Accessibility
- WCAG AA compliant
- Proper language attributes (lang="en" / lang="hi")
- Keyboard navigation support
- Screen reader friendly
- High color contrast ratios
- Focus visible on all interactive elements
- Large touch targets (56x56px minimum)

### Documentation
- MEDIA_UPLOAD_GUIDE.md - Step-by-step media upload instructions
- MEDIA_UPLOAD_GUIDE_HI.md - Hindi version of upload guide
- QUICK_REFERENCE.md - Quick reference for common tasks
- MOBILE_FIRST_HEADER.md - Mobile-first header implementation details
- MOBILE_HEADER_TESTING.md - Comprehensive testing guide
- QA_SUMMARY.md - QA validation report
- README.md - Project overview and setup

### Technical
- Jekyll 4.x static site generator
- GitHub Pages hosting
- Remote theme (pages-themes/cayman@v0.2.0)
- Jekyll SEO Tag plugin
- Custom CSS (mobile-first approach)
- Vanilla JavaScript (no dependencies)
- Bilingual support (English/Hindi)

---

## Version History

### [1.0.0] - Initial Release (2025-11-09)
- Complete website launch
- All core features implemented
- Full bilingual support
- Mobile-optimized design
- Comprehensive documentation

---

## How to Use This Changelog

### For Contributors
When making changes, add entries under `[Unreleased]` in the appropriate category:
- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be-removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Example Entry
```markdown
## [Unreleased]

### Added
- Contact form with email integration

### Fixed
- Mobile menu not closing on landscape orientation
- Gallery filter buttons too small on mobile

### Changed
- Updated WhatsApp number in header
```

### Releasing a New Version
1. Move `[Unreleased]` changes to a new version section
2. Add date in YYYY-MM-DD format
3. Create a new `[Unreleased]` section
4. Tag the release in Git

---

## Links
- [Project Repository](https://github.com/veerpatta/veerpatta-website)
- [Live Website](https://veerpatta.github.io/veerpatta-website/)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Project Guide](PROJECT_GUIDE.md)
