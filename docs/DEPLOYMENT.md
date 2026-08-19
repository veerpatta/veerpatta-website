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
             bundle install && jekyll build  ──►  _site/
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

### Tracing

`observability.traces.enabled` is set to `true`, following
[Cloudflare's agent tracing setup](https://developers.cloudflare.com/agent-setup/tracing.md).

Be aware that it currently records nothing. Automatic instrumentation captures
handler calls, outbound fetch calls, and binding calls — all of which require
the Worker to actually be invoked. This Worker has no `main`, so every request
is answered directly from the static asset store without running Worker code.
No traces will appear in the dashboard until a Worker script exists.

The rest of that guide does not apply here: it instruments agent entry points
built on Think, Flue, or the AI SDK, and this is a static Jekyll site with no
agent code and no `main`.

If a Worker script is ever added, set `head_sampling_rate` below `1` before it
takes real traffic — the default samples 100% of invocations.

## Workers Builds settings

These live in the Cloudflare dashboard (Workers & Pages → `veerpatta-website` →
Settings → Build), not in this repository:

| Setting | Value |
|---|---|
| Git repository | `veerpatta/veerpatta-website` |
| Production branch | `main` |
| **Build command** | **empty** |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

**Build command must stay empty.** Ruby is deliberately not on the deployment
path. `_site/` is committed to the repository and Cloudflare uploads it as-is,
so a deploy is a file upload and takes seconds.

Running Jekyll on Cloudflare was tried and abandoned: the image spent about
four minutes initializing and six installing gems before the build even
started, and the build then failed in four seconds for reasons the dashboard
log never made legible. GitHub Actions compiles the same commit in twenty
seconds, so that is where the build happens.

### Ruby version

Ruby is pinned to **3.2.2** by [`.ruby-version`](../.ruby-version) at the
repository root. The Workers Builds image honours that file and can install any
version.

Do not delete it. The build image defaults to Ruby 3.4.4, which is newer than
this site's `jekyll ~> 3.10` / `github-pages ~> 232` stack was built for. The
`RUBY_VERSION` environment variable overrides the file if you ever need to test
a different one without committing.

### Environment variables

None, and none can be set. The dashboard states plainly:

> Variables cannot be added to a Worker that only has static assets.

That is a consequence of `wrangler.jsonc` declaring assets with no `main`, and
it is fine here - nothing in this repo branches on `jekyll.environment`, so
`JEKYLL_ENV` would have changed nothing anyway. The GitHub Actions build sets
it for parity with local builds.

No `GITHUB_TOKEN` is needed either. It used to be, because `jekyll-remote-theme`
fetched `pages-themes/cayman` from the GitHub API on every build and the
anonymous rate limit is shared across a CI provider's IPs. That theme was
removed - it rendered nothing, verified by a byte-identical build - so the
network dependency is gone rather than worked around.

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

### The deploy step fails and nothing was built
Check **Build command** under Settings -> Build in the dashboard. If it reads
`None`, Workers Builds clones the repo and installs dependencies but never runs
Jekyll, so `_site/` never exists and the deploy fails on the assets directory
named in `wrangler.jsonc`.

This is a dashboard setting the repository cannot supply, and the GitHub
Actions check cannot catch it: Actions runs its own build steps and passes on
the very commit whose Cloudflare build fails.

Workers Builds installs Ruby gems automatically when it finds a Gemfile, so the
build command does not need its own `bundle install`.


### Build fails on Cloudflare but the GitHub Actions check passed
The two run different steps, so a green check is not evidence the Cloudflare
build works. Compare the build command and environment in the dashboard against
what Actions does, and check `.ruby-version` is present.

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
