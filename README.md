# 🏫 Veer Patta Public School Website

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Pages-orange?logo=cloudflare&logoColor=white)](https://veerpatta-website.raj-39e.workers.dev/)
[![Jekyll](https://img.shields.io/badge/Built%20with-Jekyll-red?logo=jekyll)](https://jekyllrb.com/)
[![Mobile First](https://img.shields.io/badge/Design-Mobile%20First-green)](#responsive-design)
[![Bilingual](https://img.shields.io/badge/Languages-EN%20%7C%20HI-orange)](#bilingual-support)

Official bilingual website for **Veer Patta Public School**, Amet, Rajasthan, India.

🌐 **Live Site**: [veerpatta-website.raj-39e.workers.dev](https://veerpatta-website.raj-39e.workers.dev/)

---

## 📖 Documentation Quick Links

**Choose your guide based on your role:**

| I want to... | Read this |
|--------------|-----------|
| 📘 **Understand what this project is** | [PROJECT_GUIDE.md](PROJECT_GUIDE.md) ← Start here! |
| 👨‍💻 **Contribute code or make changes** | [CONTRIBUTING.md](CONTRIBUTING.md) |
| ⚡ **Quick start for coding agents** | [QUICK_START.md](QUICK_START.md) |
| 🖼️ **Upload photos/videos** | [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) |
| 📋 **Quick media upload reference** | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| 🏗️ **Understand technical architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 📝 **See what changed** | [CHANGELOG.md](CHANGELOG.md) |
| 🤝 **Understand community guidelines** | [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |

---

## ✨ Key Features

- 🌍 **Bilingual support** - English and Hindi
- 📱 **Mobile-first design** - Optimized for 70% mobile traffic
- ⚡ **Fast loading** - Works great on 3G networks
- ♿ **Accessible** - WCAG AA compliant
- 🎨 **Modern design** - Clean, professional interface
- 📸 **Gallery system** - Easy photo/video uploads
- 💬 **WhatsApp integration** - Direct contact button
- 🔒 **Privacy-focused** - No tracking by default
- 🚀 **SEO optimized** - Meta tags and structured data
- 📊 **Performance** - Lighthouse score >90

---

## 🚀 Quick Start

### For Non-Technical Users
1. Read the [PROJECT_GUIDE.md](PROJECT_GUIDE.md) to understand the website
2. To upload media, follow [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md)
3. For quick reference, see [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### For Developers
1. Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines
2. Check [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for technical details
3. Clone the repository and start contributing!

```bash
git clone https://github.com/veerpatta/veerpatta-website.git
cd veerpatta-website

# Optional: Test locally with Jekyll
bundle install
bundle exec jekyll serve

# View at http://localhost:4000/veerpatta-website/
```

### For Coding Agents
1. **Repository Type**: Jekyll static site, Cloudflare Workers hosting
2. **Key Principle**: Mobile-first, bilingual parity (EN/HI required)
3. **Read First**: [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
4. **Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
5. **Make minimal, surgical changes** following existing patterns

---

## 📂 Repository Structure

```
veerpatta-website/
├── 📄 README.md                    # This file
├── 📄 PROJECT_GUIDE.md             # Non-technical project guide
├── 📄 CONTRIBUTING.md              # Developer guidelines
├── 📄 CHANGELOG.md                 # Version history
├── 📄 CODE_OF_CONDUCT.md           # Community guidelines
├── 📄 MEDIA_UPLOAD_GUIDE.md        # Media upload instructions
├── 📄 QUICK_REFERENCE.md           # Quick reference
├── 📁 docs/                        # Technical documentation
│   ├── ARCHITECTURE.md             # Technical architecture
│   ├── QA_SUMMARY.md               # QA validation report
│   ├── MOBILE_FIRST_HEADER.md      # Mobile header docs
│   └── MOBILE_HEADER_TESTING.md    # Testing guide
├── 📁 en/                          # English content pages
├── 📁 hi/                          # Hindi content pages
├── 📁 _includes/                   # HTML components
├── 📁 _layouts/                    # Page templates
├── 📁 assets/                      # Static assets
│   ├── css/                        # Stylesheets
│   ├── js/                         # JavaScript
│   ├── images/                     # Static images
│   └── media/                      # User-uploaded media
├── 📁 .github/                     # GitHub templates
│   ├── ISSUE_TEMPLATE/             # Issue templates
│   └── pull_request_template.md   # PR template
├── 📄 _config.yml                  # Jekyll configuration
├── 📄 index.html                   # Root redirect
├── 📄 sitemap.xml                  # SEO sitemap
└── 📄 robots.txt                   # Search engine rules
```

---

## 🌐 Bilingual Support

The website is fully available in both languages:

- **English**: `/en/` - Primary language
- **हिंदी (Hindi)**: `/hi/` - Complete translation

### Pages Available:
- 🏠 Home (index)
- 👥 About
- 📚 Academics
- 🎓 Admissions
- 🖼️ Gallery
- 📞 Contact
- 🔒 Privacy Policy

All content changes **must** be made in both languages to maintain parity.

---

## 📱 Responsive Design

Optimized for all devices with mobile-first approach:

| Device | Width Range | Features |
|--------|-------------|----------|
| 📱 Mobile | 320px - 767px | Hamburger menu, large touch targets |
| 📲 Tablet | 768px - 1023px | Desktop navigation, optimized layout |
| 💻 Desktop | 1024px+ | Full features, max-width 1400px |

**Mobile Statistics**: 70% of visitors use mobile devices, primarily budget Android smartphones on 3G networks.

---

## 📸 Media Upload System

Easy monthly content updates with automated media loading.

### Quick Upload (3 Steps)

1. **Upload** images/videos to `assets/media/{category}/`
2. **Register** (gallery only): Add filename to `assets/js/gallery-items.js`
3. **Commit** changes → Website updates in 2-3 minutes ✨

### Supported Media

- **Images:** `.jpg`, `.png`, `.webp` (any size)
- **Videos:** `.mp4`, `.webm` (max 100MB, recommended 50MB)

### System Features

✅ Auto-detects images and videos
✅ Bilingual caption support (English/Hindi)
✅ Lazy loading for fast performance
✅ Responsive on all devices (mobile-first)
✅ No code changes needed after setup
✅ Simple file registration system

### Full Documentation

- 📖 **English Guide:** [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md)
- 📖 **Hindi Guide (हिंदी):** [MEDIA_UPLOAD_GUIDE_HI.md](MEDIA_UPLOAD_GUIDE_HI.md)
- ⚡ **Quick Reference:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

## 🔧 Technology Stack

- **Jekyll 4.x** - Static site generator
- **Cloudflare Workers** - Hosting, builds, and preview deployments
- **Liquid** - Template language
- **Markdown** - Content format
- **HTML5** - Semantic markup
- **CSS3** - Mobile-first styling
- **JavaScript (ES6+)** - Vanilla JS, no dependencies

**No build tools needed!** Cloudflare Workers runs the Jekyll build automatically.

---
## ⚙️ Configuration

### Jekyll Config (`_config.yml`)

Key settings:
- `baseurl: ""` - Empty; Cloudflare Workers serves the site from the domain root
- `lang: en` - Default language
- `remote_theme: pages-themes/cayman@v0.2.0` - Base theme

### Analytics (Optional)

Analytics are **disabled by default**. To enable:

```yaml
# _config.yml
analytics_enabled: true
analytics_script: "https://plausible.io/js/script.js"
analytics_domain: "veerpatta-website.raj-39e.workers.dev"
```

**Supported Providers:**
- [Plausible](https://plausible.io/) - Privacy-first analytics
- [Umami](https://umami.is/) - Simple, privacy-focused

**Privacy Features:**
- ✅ No cookies
- ✅ No personal data tracking
- ✅ Async loading
- ✅ Opt-in by default

---

## 🚀 Deployment

### Automatic Deployment

**Host**: Cloudflare Workers  
**Trigger**: Push to `main` branch  
**Build Time**: 1-3 minutes  
**Live URL**: https://veerpatta-website.raj-39e.workers.dev/  
**Monitor**: Cloudflare dashboard -> Workers & Pages -> Deployments

### Process:
1. Code pushed to GitHub
2. Cloudflare Workers runs `bundle install && bundle exec jekyll build`
3. `_site/` is published
4. Website live!

Branches and pull requests each get their own preview deployment URL.

GitHub Actions also runs [`build.yml`](.github/workflows/build.yml), but that is
a **build check only** — it compiles the site to catch Liquid and YAML errors
and publishes nothing.

No manual deployment steps needed. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
for the Cloudflare project settings and required environment variables.

---

## 🧪 Testing

### Performance Benchmarks

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint | <1.5s | 0.8s | ✅ |
| Time to Interactive | <3s | 1.9s | ✅ |
| Total Page Size | <1MB | 450KB | ✅ |
| Lighthouse Performance | >90 | 92 | ✅ |
| Lighthouse Accessibility | >95 | 98 | ✅ |

### Testing Checklist

Before merging changes:
- [ ] Test on mobile (320px, 375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px+)
- [ ] Test both EN and HI versions
- [ ] Check keyboard navigation
- [ ] Verify color contrast (WCAG AA)
- [ ] Run Lighthouse audit
- [ ] Check all links work

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Read the guidelines**: [CONTRIBUTING.md](CONTRIBUTING.md)
2. **Check existing issues**: Avoid duplicates
3. **Create a branch**: `git checkout -b feature/your-feature`
4. **Make changes**: Follow coding standards
5. **Test thoroughly**: See testing checklist
6. **Submit PR**: Use the PR template
7. **Wait for review**: Address feedback

### Contribution Guidelines

- ✅ **Maintain bilingual parity** (EN/HI)
- ✅ **Mobile-first approach**
- ✅ **Accessibility compliance** (WCAG AA)
- ✅ **Minimal changes** - surgical edits only
- ✅ **Update documentation**
- ✅ **Test on real devices**

---

## 📞 Support & Contact

### For Help With:

**Media Uploads**: [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md)
**Development**: [CONTRIBUTING.md](CONTRIBUTING.md)
**Project Questions**: [PROJECT_GUIDE.md](PROJECT_GUIDE.md)
**Technical Details**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

### Contact Information:

- **Email**: veerpatta.school@gmail.com
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/veerpatta/veerpatta-website/issues)
- **WhatsApp**: Available on the website

---

## 📋 Key Documents

### For Everyone
- [README.md](README.md) - This file
- [PROJECT_GUIDE.md](PROJECT_GUIDE.md) - Project overview for non-technical users
- [CHANGELOG.md](CHANGELOG.md) - Version history and changes

### For Content Editors
- [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) - How to upload media
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick reference guide

### For Developers
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Technical architecture
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community guidelines

### For Reference
- [docs/QA_SUMMARY.md](docs/QA_SUMMARY.md) - QA validation report
- [docs/MOBILE_FIRST_HEADER.md](docs/MOBILE_FIRST_HEADER.md) - Mobile header implementation
- [docs/MOBILE_HEADER_TESTING.md](docs/MOBILE_HEADER_TESTING.md) - Testing guide

---

## 📜 License

Content and code for Veer Patta Public School.

All rights reserved. This website and its content are the property of Veer Patta Public School.

---

## 🙏 Acknowledgments

- **Jekyll** - Static site generator
- **Cloudflare Workers** - Hosting and builds
- **Google Fonts** - Poppins & Noto Sans Devanagari
- All contributors who help improve this website

---

## 🎯 Project Goals

This website aims to:

1. **Inform** - Provide clear information about the school
2. **Engage** - Showcase school activities and achievements
3. **Connect** - Make it easy for parents to reach the school
4. **Perform** - Work fast on budget devices and slow networks
5. **Include** - Be accessible to all users, in both languages

---

## 📈 Future Roadmap

Potential improvements (see [CHANGELOG.md](CHANGELOG.md)):

- [ ] Search functionality
- [ ] Event calendar
- [ ] News/Blog section
- [ ] Online admission form
- [ ] Service Worker for offline support
- [ ] Enhanced gallery features
- [ ] Additional language support

Suggestions? [Open an issue](https://github.com/veerpatta/veerpatta-website/issues)!

---

**Made with ❤️ for students and parents in Nokha, Rajasthan**

*Last Updated: November 2025*
