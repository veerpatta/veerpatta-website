# Veer Patta Public School Website

Bilingual (English/Hindi) website for Veer Patta Public School, Nokha.

## Features

- Bilingual support (English and Hindi)
- Responsive design using Jekyll and GitHub Pages
- SEO optimized with meta tags and structured data
- Privacy-safe analytics (optional)

## Analytics

This site includes optional privacy-safe analytics support. Analytics are **disabled by default**.

### Enabling Analytics

To enable analytics, edit `_config.yml`:

```yaml
analytics_enabled: true
analytics_script: "https://plausible.io/js/script.js"
analytics_domain: "veerpatta.github.io"
```

### Supported Analytics Providers

The implementation works with privacy-focused analytics services like:
- [Plausible](https://plausible.io/) - Open source, privacy-first analytics
- [Umami](https://umami.is/) - Simple, fast, privacy-focused alternative

### Privacy Features

- **No cookies**: Analytics run without using cookies
- **No personal data**: No tracking of personal information
- **Async loading**: Script loads asynchronously for better performance
- **Opt-in by default**: Analytics disabled until explicitly enabled

### Configuration Options

- `analytics_enabled`: Set to `true` to enable analytics
- `analytics_script`: URL to your analytics script
- `analytics_domain`: Your website domain for analytics tracking

## Development

Built with Jekyll and deployed on GitHub Pages.

## License

Content and code for Veer Patta Public School.

---

## 📸 Media Upload System

This website includes an automated media upload system for easy monthly content updates.

### Quick Upload (3 Steps)

1. **Upload** images/videos to `assets/media/{category}/`
2. **Register** (gallery only): Add filename to `assets/js/gallery-items.js`
3. **Commit** changes → Website updates in 2-3 minutes ✨

### Full Documentation

- 📖 **English Guide:** [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md)
- 📖 **Hindi Guide (हिंदी):** [MEDIA_UPLOAD_GUIDE_HI.md](MEDIA_UPLOAD_GUIDE_HI.md)
- ⚡ **Quick Reference:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

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

### Need Help?

- Check [MEDIA_UPLOAD_GUIDE.md](MEDIA_UPLOAD_GUIDE.md) for troubleshooting
- Email: veerpatta.school@gmail.com
