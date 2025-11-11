# Quick Start Guide for Coding Agents

**TL;DR**: Jekyll static site, mobile-first, bilingual (EN/HI), minimal changes only.

## 🎯 Agent Quick Facts

- **Type**: Jekyll static site
- **Hosting**: GitHub Pages (auto-deploy on push to main)
- **Build Time**: 2-3 minutes
- **No Local Build Required**: Can edit directly via GitHub
- **Primary Constraint**: Maintain bilingual parity (EN/HI)

## 📂 Repository Layout

```
en/              # English pages (Markdown)
hi/              # Hindi pages (Markdown) - MUST mirror en/
_includes/       # HTML components (header, footer, etc.)
_layouts/        # Page templates
assets/          # CSS, JS, images, media
  css/           # style.css (mobile-first)
  js/            # main.js, gallery-loader.js, etc.
  media/         # User-uploaded media
docs/            # Technical documentation
```

## 🚨 Critical Rules

1. **Bilingual Parity**: ALL content changes must be in BOTH `/en/` and `/hi/`
2. **Mobile-First**: Base styles for 320px+, then `@media (min-width: ...)`
3. **No Dependencies**: Don't add npm packages or gems unless critical
4. **Minimal Changes**: Surgical edits only - don't refactor working code
5. **WCAG AA**: Maintain accessibility compliance

## ⚡ Common Tasks

### Task: Update Text Content

**Files**: `/en/page.md` and `/hi/page.md`

```markdown
---
layout: default
title: Page Title
lang: en  # or 'hi' for Hindi
---

# Heading
Content here...
```

✅ **Do**: Update both EN and HI
❌ **Don't**: Change only one language

### Task: Add Image/Video

**Gallery Items**:
1. Upload to `assets/media/gallery/{category}/`
2. Add filename to `assets/js/gallery-items.js`:
```javascript
window.GalleryLoader.registerItems('sports', [
  'new-file.jpg'
]);
```

**Other Pages**:
- Upload to `assets/media/{page-name}/`
- Reference in page: `![Alt]({% raw %}{{ '/assets/media/page/file.jpg' | relative_url }}{% endraw %})`

### Task: Modify Styles

**File**: `assets/css/style.css`

**Mobile-First Pattern**:
```css
/* Mobile (320px+) - Base styles */
.element {
  padding: 10px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .element {
    padding: 20px;
  }
}
```

❌ **Don't**: Use `max-width` queries (not mobile-first)

### Task: Add JavaScript

**File**: `assets/js/main.js` or create new file

**Pattern** (IIFE, no bundler):
```javascript
(function() {
  'use strict';
  
  // Your code
  
  // Expose if needed
  window.MyModule = {};
})();
```

✅ **Do**: Use vanilla JS (no jQuery)
✅ **Do**: Add `defer` attribute in `_includes/head.html`

### Task: Update Header/Footer

**Files**: 
- `_includes/header.html`
- `_includes/footer.html`

**Critical**: Use Liquid variables for bilingual content:
```liquid
{% raw %}
{% if page.lang == 'hi' %}
  {% assign nav_home = 'होम' %}
{% else %}
  {% assign nav_home = 'Home' %}
{% endif %}
{% endraw %}
```

## 🧪 Testing Checklist

Before committing:
- [ ] Test at 320px width (mobile)
- [ ] Test both `/en/` and `/hi/` pages
- [ ] No console errors
- [ ] Links work (use `{% raw %}{{ url | relative_url }}{% endraw %}`)
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Images have alt text

## 📝 Commit Format

```
<type>: <description>

Types: feat, fix, docs, style, refactor, perf, test, chore
```

**Examples**:
```
feat: Add sports gallery category
fix: Mobile menu not closing on landscape
docs: Update media upload guide
style: Improve button hover states
```

## 🔗 Liquid Filters (Jekyll)

**URLs** (always use these):
```liquid
{% raw %}
{{ '/en/about/' | relative_url }}        → /veerpatta-website/en/about/
{{ '/assets/css/style.css' | absolute_url }} → https://veerpatta.github.io/veerpatta-website/assets/css/style.css
{% endraw %}
```

**Variables**:
```liquid
{% raw %}
{{ page.title }}      → Page title from frontmatter
{{ site.title }}      → Site title from _config.yml
{{ page.lang }}       → Language (en or hi)
{{ content }}         → Page content (in layouts)
{% endraw %}
```

**Conditionals**:
```liquid
{% raw %}
{% if page.lang == 'hi' %}
  Hindi content
{% else %}
  English content
{% endif %}
{% endraw %}
```

## 🎨 Design System

**Colors** (use these):
```css
--brand-blue: #5375E2;     /* Primary */
--brand-green: #84AC64;    /* Secondary */
--brand-yellow: #E2D64B;   /* Accent */
--text-color: #1e2430;     /* Text */
--bg-color: #FEFEFE;       /* Background */
```

**Fonts**:
- English: Poppins (18px base)
- Hindi: Noto Sans Devanagari (20px base)

**Touch Targets**: Minimum 48x48px, prefer 56x56px

## 🚫 Common Mistakes

❌ **Don't**:
- Edit only EN or only HI (maintain parity)
- Use `max-width` media queries (use `min-width`)
- Add npm packages without discussion
- Hardcode URLs (use `relative_url` filter)
- Remove working code "just to clean up"
- Ignore accessibility (color contrast, alt text, focus)
- Add large dependencies (jQuery, Bootstrap, etc.)

✅ **Do**:
- Test on mobile first
- Use semantic HTML
- Keep changes minimal
- Update documentation
- Follow existing patterns

## 📚 Key Files Reference

| File | Purpose | When to Edit |
|------|---------|-------------|
| `en/*.md` | English pages | Content updates |
| `hi/*.md` | Hindi pages | Content updates (mirror EN) |
| `_includes/header.html` | Navigation | Change menu items |
| `_includes/footer.html` | Footer | Change footer links |
| `assets/css/style.css` | Main styles | Design changes |
| `assets/js/main.js` | Core JS | Interactive features |
| `_config.yml` | Site config | Rarely (site-wide settings) |
| `assets/js/gallery-items.js` | Gallery registry | Add gallery items |

## 🔍 Debugging

**Build Failures**:
- Check GitHub Actions tab for logs
- Look for Liquid syntax errors (`{% raw %}{% %}{% endraw %}`, `{% raw %}{{ }}{% endraw %}`)
- Verify YAML frontmatter format

**Styles Not Applied**:
- Clear browser cache (Ctrl+Shift+R)
- Check CSS syntax (missing `;` or `}`)
- Verify file linked in `_includes/head.html`

**Page Not Found**:
- Check `permalink` in frontmatter
- Ensure file in correct folder (`/en/` or `/hi/`)
- Use `relative_url` filter for links

## ⏱️ Expected Timings

- **Local edit**: Instant
- **Commit & push**: Few seconds
- **GitHub Pages build**: 2-3 minutes
- **Live update**: 2-3 minutes after push

## 🔗 Essential Links

- **Live Site**: https://veerpatta.github.io/veerpatta-website/
- **Full Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Project Overview**: [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

## 💡 Pro Tips

1. **Always test mobile first** (70% of users)
2. **Use browser DevTools mobile emulator** (F12 → Device toolbar)
3. **Check both languages** after content changes
4. **Run Lighthouse audit** before final commit
5. **Follow existing code patterns** instead of reinventing
6. **Document complex changes** in code comments
7. **Update CHANGELOG.md** for significant changes

## 🎯 Success Criteria

Your changes are ready when:
- ✅ Works on 320px width
- ✅ Both EN and HI versions updated
- ✅ No console errors
- ✅ Keyboard accessible
- ✅ Fast on 3G (Lighthouse >90)
- ✅ WCAG AA compliant
- ✅ Documentation updated

---

**Remember**: This is a school website. Keep it professional, accessible, and fast! 🏫

*Quick Reference - Last Updated: November 2025*
