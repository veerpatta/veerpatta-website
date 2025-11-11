# Contributing to Veer Patta Public School Website

**Welcome, Coding Agents and Developers!** This guide provides clear instructions for making contributions to this repository.

## 🎯 Quick Start for Coding Agents

### Repository Type
- **Technology**: Jekyll static site generator
- **Hosting**: GitHub Pages
- **Languages**: HTML, CSS, JavaScript (Vanilla)
- **Content**: Markdown files in `/en/` and `/hi/` directories
- **Deployment**: Automatic on push to main branch

### Key Principles
1. **Bilingual Parity**: All changes must be reflected in both English (`/en/`) and Hindi (`/hi/`)
2. **Mobile-First**: 70% of users are on mobile devices
3. **No Dependencies**: Avoid adding new npm packages or gems unless absolutely necessary
4. **Minimal Changes**: Make surgical, targeted changes only
5. **Accessibility**: Maintain WCAG AA compliance
6. **Performance**: Keep site fast on 3G networks

## 📂 Repository Structure

```
veerpatta-website/
├── en/                        # English content pages
│   ├── index.md              # Homepage
│   ├── about.md              # About page
│   ├── academics.md          # Academics page
│   ├── admissions.md         # Admissions page
│   ├── gallery.md            # Gallery page
│   ├── contact.md            # Contact page
│   └── privacy.md            # Privacy policy
├── hi/                        # Hindi content pages (mirrors en/)
│   └── [same structure as en/]
├── _includes/                 # Reusable HTML components
│   ├── head.html             # <head> section with meta tags
│   ├── header.html           # Site navigation header
│   ├── footer.html           # Site footer
│   ├── analytics.html        # Analytics script (optional)
│   └── whatsapp.html         # WhatsApp contact button
├── _layouts/                  # Page templates
│   └── default.html          # Main layout template
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   │   ├── style.css         # Main styles (mobile-first)
│   │   └── animations.css    # Animation definitions
│   ├── js/                   # JavaScript files
│   │   ├── main.js           # Core functionality
│   │   ├── gallery-loader.js # Gallery image loader
│   │   ├── gallery-items.js  # Gallery item registry
│   │   ├── media-loader.js   # Media loading system
│   │   └── home-media-loader.js # Homepage media
│   ├── images/               # Static images and placeholders
│   └── media/                # User-uploaded media
│       ├── home/             # Homepage media
│       ├── gallery/          # Gallery categories
│       │   ├── sports/
│       │   ├── ncc/
│       │   ├── cultural/
│       │   ├── academic/
│       │   └── celebrations/
│       ├── about/
│       ├── academics/
│       ├── admissions/
│       └── contact/
├── docs/                      # Documentation
│   ├── ARCHITECTURE.md       # Technical architecture
│   └── [other technical docs]
├── _config.yml               # Jekyll configuration
├── index.html                # Root redirect to /en/
├── 404.html                  # Custom 404 page
├── sitemap.xml               # SEO sitemap
├── robots.txt                # Search engine instructions
├── README.md                 # Project overview
├── PROJECT_GUIDE.md          # Non-technical guide
├── CONTRIBUTING.md           # This file
├── MEDIA_UPLOAD_GUIDE.md     # Media upload instructions
├── QUICK_REFERENCE.md        # Quick media reference
└── CHANGELOG.md              # Change history
```

## 🔧 Development Setup

### Prerequisites
- Git
- Ruby 2.7+ (for local Jekyll development, optional)
- Text editor or IDE

### Local Development (Optional)

If you want to preview changes locally before pushing:

```bash
# Install Jekyll and dependencies (one-time setup)
gem install bundler jekyll

# Clone repository
git clone https://github.com/veerpatta/veerpatta-website.git
cd veerpatta-website

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# View at http://localhost:4000/veerpatta-website/
```

**Note**: Local setup is optional. Changes can be made directly via GitHub interface.

### Testing Without Local Setup

1. Make changes in a new branch
2. Push to GitHub
3. GitHub Pages will build automatically
4. View at: `https://veerpatta.github.io/veerpatta-website/`

## 🎨 Making Changes

### Content Changes

**Updating Text Content:**

1. Locate the file in `/en/` or `/hi/`
2. Edit the Markdown content
3. **Important**: Update BOTH English and Hindi versions
4. Commit with descriptive message

**Example:**
```markdown
# File: en/about.md
---
layout: default
title: About Us
---

## Our Mission
Nurturing leaders of tomorrow...
```

### Design/Style Changes

**CSS Changes:**
- Main styles: `assets/css/style.css`
- Animations: `assets/css/animations.css`
- Use mobile-first approach (base styles for mobile, then `@media` for larger screens)

**Example:**
```css
/* Mobile-first: Base styles for 320px+ */
.element {
  padding: 10px;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    padding: 20px;
    font-size: 18px;
  }
}
```

### JavaScript Changes

**Files:**
- `assets/js/main.js` - Core functionality
- `assets/js/gallery-loader.js` - Gallery system
- `assets/js/media-loader.js` - Media loading

**Guidelines:**
- Use vanilla JavaScript (no jQuery)
- Ensure accessibility (keyboard navigation, ARIA labels)
- Test on mobile devices
- Add comments for complex logic

### Adding Media

**For Gallery Items:**

1. Upload file to correct folder: `assets/media/gallery/{category}/`
2. Register in `assets/js/gallery-items.js`:
```javascript
window.GalleryLoader.registerItems('sports', [
  'sports-day-2024.jpg'  // Add your filename
]);
```
3. Optional: Add caption in `assets/media/gallery/{category}/captions.txt`:
```
sports-day-2024.jpg | EN: Annual Sports Day 2024 | HI: वार्षिक खेल दिवस 2024
```

**For Other Pages:**
- Upload to: `assets/media/{page-name}/`
- Reference in page Markdown or template

📖 **Full Details**: See [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md)

## ✅ Checklist Before Committing

### For ALL Changes:
- [ ] Changes work on mobile (320px width minimum)
- [ ] Both English (`/en/`) and Hindi (`/hi/`) updated if content changed
- [ ] No console errors in browser DevTools
- [ ] Links work correctly (use `relative_url` filter)
- [ ] Images have descriptive `alt` text
- [ ] Code follows existing style and patterns

### For Content Changes:
- [ ] Markdown formatted correctly
- [ ] Frontmatter includes `layout`, `title`, `lang` (for Hindi pages)
- [ ] Grammar and spelling checked
- [ ] Hindi translation is accurate (use Google Translate if needed, but verify)

### For Code Changes:
- [ ] Mobile-first approach followed
- [ ] Accessibility maintained (WCAG AA)
- [ ] Performance not degraded
- [ ] Browser compatibility checked (Chrome, Safari, Firefox, Edge)
- [ ] No new dependencies added without discussion

### For Design Changes:
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Touch targets are minimum 48x48px
- [ ] Works on slow 3G networks
- [ ] Animations are smooth (60fps)
- [ ] Respects `prefers-reduced-motion`

## 🚀 Deployment

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Build Time**: 2-3 minutes
- **Live URL**: https://veerpatta.github.io/veerpatta-website/
- **Build System**: GitHub Actions workflow (`.github/workflows/jekyll.yml`)
- **Status**: Check the Actions tab in GitHub to monitor deployment progress

### Monitoring Deployment
1. Go to the [Actions tab](https://github.com/veerpatta/veerpatta-website/actions) in the repository
2. Look for the latest workflow run for your commit
3. Click on the workflow to see build logs and deployment status
4. Green checkmark ✓ means successful deployment
5. Red X ✗ means build failed - click to see error details

### Manual Testing
After deployment, test these URLs:
- English: https://veerpatta.github.io/veerpatta-website/en/
- Hindi: https://veerpatta.github.io/veerpatta-website/hi/
- Test on mobile device if possible

## 🧪 Testing Guidelines

### Manual Testing

**Browser Testing:**
- Chrome (Desktop & Mobile)
- Safari (Desktop & iOS)
- Firefox
- Edge

**Device Testing:**
- Mobile: 320px, 375px, 414px widths
- Tablet: 768px, 1024px widths
- Desktop: 1280px, 1920px widths

**Feature Testing:**
- Navigation works on all pages
- Language switcher toggles correctly
- WhatsApp button opens with correct message
- Gallery loads and filters work
- Forms submit correctly (if applicable)
- All links work (no 404s)

### Accessibility Testing

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space activate buttons and links
- Escape closes modals/menus
- Focus visible on all elements

**Screen Reader:**
- Use NVDA (Windows) or VoiceOver (Mac)
- All images have alt text
- ARIA labels are descriptive
- Headings are in logical order

**Color Contrast:**
- Use browser extension (WAVE, axe DevTools)
- Ensure all text meets WCAG AA standard

### Performance Testing

**Lighthouse:**
```bash
# Run Lighthouse audit
lighthouse https://veerpatta.github.io/veerpatta-website/en/ --view
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

## 🐛 Common Issues and Solutions

### Issue: Changes not showing after commit

**Solution:**
- Wait 2-3 minutes for GitHub Pages rebuild
- Check build status in the [Actions tab](https://github.com/veerpatta/veerpatta-website/actions)
- Hard refresh browser (Ctrl+Shift+R)
- Verify the deployment workflow completed successfully

### Issue: Images not loading

**Solution:**
- Verify file path is correct
- Use `{{ '/assets/...' | relative_url }}` for paths
- Check file extension is correct (.jpg, .png, .webp)
- Ensure file was committed to repository

### Issue: Styles not applying

**Solution:**
- Check CSS syntax (missing semicolons, braces)
- Clear browser cache
- Verify CSS file is linked in `_includes/head.html`
- Check browser DevTools for CSS errors

### Issue: Page not found (404)

**Solution:**
- Ensure page exists in correct folder (`/en/` or `/hi/`)
- Check frontmatter includes `permalink` or use default
- Verify link uses `{{ page_url | relative_url }}`
- Check `_config.yml` for `baseurl` setting

## 📋 Coding Standards

### HTML/Liquid
- Use semantic HTML5 tags (`<header>`, `<main>`, `<section>`, `<article>`)
- Include ARIA labels for accessibility
- Use Liquid filters for URLs: `{{ url | relative_url }}`
- Keep markup clean and indented (2 spaces)

### CSS
- Mobile-first (base styles, then `@media` queries)
- Use meaningful class names (`.header-nav`, not `.nav1`)
- Group related properties
- Add comments for complex sections
- Avoid `!important` unless absolutely necessary

### JavaScript
- Use `const` and `let`, not `var`
- Add JSDoc comments for functions
- Handle errors gracefully
- Use event delegation where appropriate
- Avoid global variables (use IIFE or modules)

### Markdown
- Use consistent heading levels
- Add blank lines between sections
- Use lists for better readability
- Include code blocks with language syntax highlighting

## 🎯 Priority Areas for Agents

### High Priority (Core Functionality)
- Navigation (header/footer)
- Mobile responsiveness
- Bilingual content parity
- Gallery system
- Contact/WhatsApp integration

### Medium Priority (Enhancements)
- Performance optimizations
- Accessibility improvements
- SEO enhancements
- Animation polish

### Low Priority (Nice to Have)
- Additional features
- Advanced interactions
- Experimental enhancements

## 📚 Key Documents Reference

| Document | Purpose | Audience |
|----------|---------|----------|
| README.md | Project overview | Everyone |
| PROJECT_GUIDE.md | Non-technical guide | Non-developers |
| CONTRIBUTING.md | Development guide | Developers/Agents |
| ARCHITECTURE.md | Technical details | Developers |
| MEDIA_UPLOAD_GUIDE.md | Media uploads | Content editors |
| QUICK_REFERENCE.md | Quick media reference | Content editors |
| CHANGELOG.md | Change history | Everyone |

## 🤝 Code Review Process

### Before Submitting PR:
1. Self-review your changes
2. Test on mobile device
3. Verify both EN/HI versions
4. Run accessibility check
5. Update CHANGELOG.md

### PR Description Should Include:
- What changed and why
- Screenshots (for visual changes)
- Testing performed
- Accessibility considerations
- Performance impact

### Review Criteria:
- Code quality and style
- Bilingual parity
- Mobile responsiveness
- Accessibility compliance
- Performance impact
- Documentation updates

## 🔐 Security Considerations

### Do NOT commit:
- API keys or secrets
- Personal phone numbers or emails
- Passwords or credentials
- Student or parent personal information

### Safe Practices:
- Use environment variables for sensitive data
- Validate and sanitize all user inputs
- Keep dependencies updated
- Use HTTPS for all external resources

## 📞 Getting Help

### Questions About:
- **Repository structure**: Read this file
- **Technical architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Media uploads**: See [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md)
- **General info**: See [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

### Still Need Help?
- Open an issue with detailed description
- Email: veerpatta.school@gmail.com

## 📝 Commit Message Guidelines

### Format:
```
<type>: <short description>

<optional longer description>
<optional footer>
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: CSS/design changes
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples:
```
feat: Add cultural events gallery category

Added new category for cultural events in gallery system.
Updated gallery-items.js and gallery loader.

fix: Mobile menu not closing on link click

Added event listener to close mobile menu when navigation
link is clicked. Improves UX on mobile devices.

docs: Update media upload guide with video compression tips

Added section on video compression using HandBrake and
online tools. Helps reduce file sizes for faster loading.
```

## 🎉 Recognition

Contributors who make valuable improvements will be recognized in:
- Repository README.md
- CHANGELOG.md
- Commit history

Thank you for contributing to Veer Patta Public School's web presence! 🏫

---

*Last Updated: November 2025*
