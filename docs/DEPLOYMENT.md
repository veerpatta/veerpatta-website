# Deployment

## Overview

This site is built and hosted by **Cloudflare Pages**. Cloudflare watches the
GitHub repository directly — pushing to `main` is the deploy. There is no
deployment step in GitHub Actions.

GitHub Actions still runs `.github/workflows/build.yml`, but that is a **build
check only**: it compiles the site to catch broken Liquid, bad YAML frontmatter,
or a missing include before Cloudflare publishes it. It publishes nothing.

```
Push to main
      │
      ├──► GitHub Actions (build.yml) ──► build check, publishes nothing
      │
      └──► Cloudflare Pages ──► bundle exec jekyll build ──► live site
```

## Cloudflare Pages project settings

These live in the Cloudflare dashboard (Workers & Pages → the project →
Settings → Build), not in this repository:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `bundle exec jekyll build` |
| Build output directory | `_site` |
| Root directory | `/` |
| Build image | v3 (the default for new projects) |

### Ruby version

Ruby is pinned to **3.2.2** by [`.ruby-version`](../.ruby-version) at the
repository root. Cloudflare honours that file and will install any version.

Do not delete it. The v3 build image defaults to Ruby 3.4.4, which is newer than
this site's `jekyll ~> 3.10` / `github-pages ~> 232` stack was built for; 3.2.2
is the version the v2 image shipped and what this stack is known to work on.
`RUBY_VERSION` as an environment variable overrides the file if you ever need to
test a different one without committing.

### Environment variables

| Variable | Value | Why |
|---|---|---|
| `JEKYLL_ENV` | `production` | Enables production-only output |
| `GITHUB_TOKEN` | a fine-grained token, public-repo read | See below |

`jekyll-remote-theme` fetches `pages-themes/cayman` from the GitHub API at build
time. Without a token the build uses GitHub's anonymous rate limit, shared
across Cloudflare's build IPs, so it can fail intermittently with a 403.

## Files that Cloudflare reads

| File | Purpose |
|---|---|
| `_headers` | Response headers (security headers; `no-cache` on `sw.js`) |
| `404.html` | Served automatically for unmatched paths |

`_headers` starts with an underscore, so Jekyll would normally skip it. It is
listed under `include:` in `_config.yml` to force it into `_site`. If you add a
`_redirects` file, add it to `include:` too or it will silently never deploy.

## Base path

Cloudflare Pages serves the site from the **domain root**, so `_config.yml` has
`baseurl: ""`. Under GitHub Pages it was `/veerpatta-website`.

Nothing should hardcode either value. Templates use the `relative_url` filter;
JavaScript that builds asset URLs at runtime reads `window.SITE_BASEURL`, which
`_includes/head.html` sets from `site.baseurl`.

## Monitoring a deploy

1. Cloudflare dashboard → Workers & Pages → the project → **Deployments**
2. Open the latest deployment to read its build log
3. Every push also produces a **preview deployment** on its own URL —
   branches and pull requests get one before anything reaches production

Build time is roughly 1–3 minutes.

## Rollback

In the Cloudflare dashboard, open **Deployments**, find the last known-good one,
and choose **Rollback to this deployment**. This is instant and needs no push.

To fix forward instead:

```bash
git revert HEAD
git push origin main
```

## Troubleshooting

### Build fails on Cloudflare but the GitHub Actions check passed
Usually the environment differs. Check that the build image is v2+, that
`.ruby-version` is a version Cloudflare can provide, and that `GITHUB_TOKEN` is
set — the remote theme fetch is the most common cause.

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

- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages `_headers`](https://developers.cloudflare.com/pages/configuration/headers/)
- [Cloudflare Pages `_redirects`](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Jekyll documentation](https://jekyllrb.com/docs/)
- [Build check workflow](../.github/workflows/build.yml)

---

*Last Updated: August 2026*
