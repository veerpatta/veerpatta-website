# Deployment

## Overview

This site is built and hosted by **Cloudflare Workers** using
[static assets](https://developers.cloudflare.com/workers/static-assets/).
Workers Builds watches the GitHub repository — pushing to `main` is the deploy.
There is no deployment step in GitHub Actions.

This is Workers, **not Cloudflare Pages**. The two are similar but configured
differently, and Cloudflare is steering new projects to Workers. If you follow a
Pages tutorial, most of it will not apply here.

GitHub Actions still runs `.github/workflows/build.yml`, but that is a **build
check only**: it compiles the site to catch broken Liquid, bad YAML frontmatter,
or a missing include before Cloudflare publishes it. It publishes nothing.

```
Push to main
      │
      ├──► GitHub Actions (build.yml) ──► build check, publishes nothing
      │
      └──► Cloudflare Workers Builds
             bundle exec jekyll build  ──►  _site/
             npx wrangler deploy       ──►  live site
```

## Repository configuration

[`wrangler.jsonc`](../wrangler.jsonc) at the repository root defines the
deployment:

```jsonc
{
  "name": "veerpatta-website",
  "compatibility_date": "2026-08-19",
  "assets": {
    "directory": "./_site",
    "not_found_handling": "404-page"
  }
}
```

Notes on that file:

- There is **no `main`** and **no `assets.binding`**. Both are only valid when a
  Worker script exists. This site is static assets only; adding either causes a
  deploy error.
- `not_found_handling: "404-page"` serves `404.html` with a real 404 status.
  Do not switch this to `"single-page-application"` — that returns **200** for
  every unmatched path, which makes search engines index soft 404s.
- `wrangler.jsonc` is listed under `exclude:` in `_config.yml`. It has no
  frontmatter, so Jekyll would otherwise copy it into `_site/` and publish it.

## Workers Builds settings

These live in the Cloudflare dashboard (Workers & Pages → `veerpatta-website` →
Settings → Build), not in this repository:

| Setting | Value |
|---|---|
| Git repository | `veerpatta/veerpatta-website` |
| Production branch | `main` |
| Build command | `bundle exec jekyll build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

### Ruby version

Ruby is pinned to **3.2.2** by [`.ruby-version`](../.ruby-version) at the
repository root. The Workers Builds image honours that file and can install any
version.

Do not delete it. The build image defaults to Ruby 3.4.4, which is newer than
this site's `jekyll ~> 3.10` / `github-pages ~> 232` stack was built for. The
`RUBY_VERSION` environment variable overrides the file if you ever need to test
a different one without committing.

### Environment variables

| Variable | Value | Why |
|---|---|---|
| `JEKYLL_ENV` | `production` | Enables production-only output |
| `GITHUB_TOKEN` | a fine-grained token, public-repo read | See below |

`jekyll-remote-theme` fetches `pages-themes/cayman` from the GitHub API at build
time. Without a token the build uses GitHub's anonymous rate limit, shared
across Cloudflare's build IPs, so it can fail intermittently with a 403.

## Files Cloudflare reads from `_site/`

| File | Purpose |
|---|---|
| `_headers` | Response headers (security headers; `no-cache` on `sw.js`) |
| `404.html` | Served for unmatched paths, per `not_found_handling` |

`_headers` and `_redirects` are supported natively by Workers static assets, and
must be inside the asset directory — here, `_site/`. `_headers` starts with an
underscore, so Jekyll would normally skip it; it is listed under `include:` in
`_config.yml` to force it into `_site/`. If you add a `_redirects` file, add it
to `include:` too or it will silently never deploy.

## Base path

The site is served from the **domain root**, so `_config.yml` has
`baseurl: ""`. Under GitHub Pages it was `/veerpatta-website`.

Nothing should hardcode either value. Templates use the `relative_url` filter;
JavaScript that builds asset URLs at runtime reads `window.SITE_BASEURL`, which
`_includes/head.html` sets from `site.baseurl`.

## Monitoring a deploy

1. Cloudflare dashboard → Workers & Pages → `veerpatta-website` → **Deployments**
2. Open the latest build to read its log
3. Enable non-production branch builds to get preview URLs for branches and
   pull requests

## Rollback

In the Cloudflare dashboard, open the Worker's **Deployments**, find the last
known-good version, and roll back to it. This is instant and needs no push.

To fix forward instead:

```bash
git revert HEAD
git push origin main
```

## Troubleshooting

### Every path returns "Hello world"
The Worker is still the default scaffold — the repository was never connected,
or the deploy command never ran. Check Settings → Build in the dashboard.

### Every path returns 200, including nonexistent ones
`not_found_handling` is set to `single-page-application`. It should be
`404-page` for this site.

### Build fails on Cloudflare but the GitHub Actions check passed
Usually the environment differs. Check that `.ruby-version` is present and that
`GITHUB_TOKEN` is set — the remote theme fetch is the most common cause.

### Site deploys but CSS, JS, or images 404
Something is hardcoding a base path. Search for `veerpatta-website` outside the
documentation; templates should use `relative_url` and scripts should use
`window.SITE_BASEURL`.

### Changes are live but a visitor still sees the old site
A stale service worker. `_headers` sets `Cache-Control: no-cache` on `/sw.js`
to prevent this; confirm `_site/_headers` exists in the build output, since
Jekyll drops it if the `include:` entry in `_config.yml` is removed.

### A `_redirects` or `_headers` file has no effect
It was not copied into `_site`. Add it to `include:` in `_config.yml`.

## References

- [Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Static asset redirects](https://developers.cloudflare.com/workers/static-assets/redirects/)
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Build image and language versions](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/)
- [Build check workflow](../.github/workflows/build.yml)

---

*Last Updated: August 2026*
