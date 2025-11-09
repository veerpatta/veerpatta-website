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
