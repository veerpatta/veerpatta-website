# Deployment

## Current architecture

Astro 7.4.7 generates a static site into `_site/`. That directory is intentionally **committed with its source changes**. Cloudflare Workers' existing Git integration deploys the committed files; it does not run the Astro build.

The Worker script exists only to support byte-range requests for video. Ordinary pages and other assets are served directly by Cloudflare's static asset store.

This is **Cloudflare Workers**, not Cloudflare Pages. Ruby/Jekyll files retained in the repository are historical migration sources. They are not required by the current Node-based validation or site-generation workflow.

## Validate before publishing

Use Node.js 24 LTS and the committed npm lockfile:

```bash
npm ci
npm run check
npm run build
npm test
```

`npm run build` stages public images/media, builds Astro, and runs `scripts/check-site.mjs`. Tests include contracts that read `_site/`, so build before tests. Review the source and output diff together; do not edit only generated HTML or rely on a later CI repair to publish the correct version.

For a local production preview:

```bash
npm run preview -- --host 127.0.0.1 --port 4321
```

This preview serves the static output, not Cloudflare's Worker routing. To check the actual Worker locally, use `npx wrangler dev` after building on a machine where Wrangler can start. That is a separate verification step from Astro preview.

A push to `main` is production publication. Commit matching source and `_site/` together before an authorized push. Keep `package-lock.json` tracked and use `npm ci` in clean environments.

## Cloudflare Workers Builds settings

These settings live in the Cloudflare dashboard under **Workers & Pages → veerpatta-website → Settings → Build**. Preserve the existing deployment method:

| Setting | Value |
| --- | --- |
| Git repository | `veerpatta/veerpatta-website` |
| Production branch | `main` |
| Build command | **Empty** |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

**The build command stays empty.** Cloudflare uploads the checked-in `_site/` as-is. It does not need Ruby, Bundler, Astro, or a build environment variable to regenerate pages. Dashboard dependency setup is distinct from the application build; do not infer that the site was rebuilt from an installation log.

Cloudflare deployments and GitHub Actions run independently. A failed Actions job does not prevent Cloudflare from deploying an already-pushed commit. A green Actions check does not prove that the Worker deployment completed. Check both before reporting publication.

Branch builds and preview availability depend on Cloudflare dashboard settings and account permissions. Verify the deployment URL before sharing or testing it; do not assume every branch or pull request automatically has a preview.

## Repository deployment configuration

The important parts of `wrangler.jsonc` are:

```jsonc
{
  "name": "veerpatta-website",
  "compatibility_date": "2026-08-19",
  "main": "worker.js",
  "preview_urls": true,
  "assets": {
    "directory": "./_site",
    "binding": "ASSETS",
    "run_worker_first": ["/assets/media/videos/*"],
    "not_found_handling": "404-page"
  }
}
```

- `main` and the `ASSETS` binding are required for this existing Worker. Do not remove them using the older static-assets-only instructions.
- Only `/assets/media/videos/*` runs the Worker first. Pages, CSS, JavaScript and images bypass it.
- `404-page` returns a real 404 with `404.html`. Do not use `single-page-application`, which would change missing-page behavior.
- `preview_urls: true` preserves the current configuration; it does not itself guarantee that a branch build occurred or that a preview is publicly accessible.
- Video-handler tracing is enabled with a sampling rate of `0.1`. Ordinary static page requests do not invoke the handler and therefore are not its traces.

No application secrets are needed to generate the static site. Keep credentials and private deployment state out of the repository and public output. Wrangler's local state is ignored.

## GitHub Actions

`.github/workflows/build.yml` runs on pushes and pull requests to `main`, and can be started manually. Its main job:

1. Checks out the commit and selects Node.js 24.
2. Runs `npm ci` using `package-lock.json`.
3. Runs `npm run check`.
4. Runs `npm run build`, including the output audit.
5. Runs `npm test` against that build.
6. Uploads the `_site/` directory as the `site` artifact, retained for seven days.
7. On `main` only, commits corrected `_site/` output if it differs and `main` has not advanced.

There is no `wrangler deploy` step in Actions. The output-sync commit is a safety net, not the preferred publication path. If the source and correct output were committed together, the rebuilt bytes match and the job skips the commit and extra deployment.

If output is stale, the original push can deploy the old output before the repair commit triggers a second Cloudflare deployment. A bot push using `GITHUB_TOKEN` normally does not start another Actions workflow, but Cloudflare's external integration can still deploy it. Protected-branch rules may prevent the repair push; resolve stale output in a normal reviewed commit instead of weakening branch protection.

Do not add CI-skip markers such as `[skip ci]` to deployment commits. Cloudflare may skip them too, leaving the live site behind the repository.

### Optional browser job

Select **Build site → Run workflow → browser_tests** to run the separate Chromium job. It installs the locked npm dependencies and Playwright Chromium with required system dependencies, builds the site, runs `npm run test:e2e`, and uploads browser reports even if tests fail.

For local execution:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Use Playwright's installed Chromium by default. A machine-specific executable override must not be hardcoded for CI. A browser suite that cannot launch because of a sandbox or socket restriction is **blocked**, not passed. A remote managed browser needs a reachable preview or authorized tunnel, not the container's localhost URL.

Browser and accessibility tests, actual iPhone/Safari or Android checks, and performance measurements are separate evidence from a passing build. BrowserStack access and real-device session availability must be verified before claiming coverage. The older `docs/BROWSERSTACK.md` describes connection options; replace its Jekyll/port-4000 example with the current Astro/port-4321 preview. Use mock/intercepted submissions and never send real parent data to test the form.

## Public-file boundary

Astro publishes `public/` and its generated pages/assets, not the repository root. `scripts/prepare-public.mjs` stages only the source `assets/images/` and `assets/media/` directories into `public/assets/`. `public/assets/` is generated and ignored; `_site/` is generated and committed.

The current public control files are:

| Source | Published output | Purpose |
| --- | --- | --- |
| `public/_headers` | `_site/_headers` | Static asset response headers |
| `public/sw.js` | `_site/sw.js` | Service worker |
| `public/manifest.webmanifest` | `_site/manifest.webmanifest` | Web app metadata |
| `public/robots.txt` | `_site/robots.txt` | Crawler instructions |
| `src/pages/404.astro` | `_site/404.html` | Missing-page body |
| `src/pages/sitemap.xml.ts` | `_site/sitemap.xml` | Generated sitemap |

Edit these current sources, not retained root/Jekyll copies. If a new `_redirects` file is needed, put the approved public configuration in `public/_redirects` and verify `_site/_redirects` after building. Jekyll `include:` and `exclude:` settings no longer control publication.

Do not copy repository docs, scripts, tests, configuration or credentials into a public directory. The output audit checks routes, local links, image alt attributes and known forbidden paths; it supplements, but does not replace, reviewing newly introduced public files.

## Video byte ranges

`worker.js` requests the whole, unencoded video from `ASSETS` and slices valid single ranges. It preserves this existing behavior:

- An initial `bytes=0-1`, an open-ended `bytes=7-`, or a suffix `bytes=-3` returns 206 with the selected bytes and `Content-Range` / `Content-Length`.
- An end or suffix beyond the file length is clamped to the available bytes.
- Unsatisfiable ranges return 416 with `Content-Range: bytes */<size>`.
- Invalid or multiple ranges fall back to a whole-file 200 response.
- HEAD ignores a requested range. Upstream non-200 responses, including a missing video, pass through unchanged.

`tests/worker.test.mjs` checks those semantics with mocked `ASSETS` and real `Request`/`Response` objects. It is not a Cloudflare integration or Safari playback test. Preserve `worker.js` and its existing configuration unless a separately verified change is required.

## Verify a deployment

1. Confirm the intended commit is present on the remote branch.
2. Check the Actions result for that commit. Distinguish main validation from the optional browser job.
3. In Cloudflare **Deployments**, verify the deployed commit/version and build/deploy log.
4. Open the exact production or verified preview URL and check both English and Hindi pages, current release content and assets.
5. Verify a nonexistent page returns HTTP 404 with the designed 404 body.
6. Verify a small video range returns 206 and the requested bytes, and an out-of-bounds range returns 416. Check HEAD and direct video playback when relevant.
7. Exercise the intended UI flows without sending real test enquiries. Record browser/device, URL and outcome separately.

Do not label a preview as production or treat a successful deploy command as proof that visitors are receiving the expected content.

## Rollback

For an urgent rollback, select a previously verified Worker version under Cloudflare **Deployments** and use the dashboard rollback. This restores that deployed version without waiting for a repository build.

For a reviewed fix-forward or revert, restore matching source and `_site/`, run the checks, review the diff and push only when production publication is intended. Rebuild after reverting so source and generated output remain consistent. A dashboard rollback alone does not change `main`; a later push can deploy it again.

## Troubleshooting

### Source changed but the deployed page did not

Inspect the `_site/` included in the deployed commit. Cloudflare's empty build command means source-only edits cannot update published HTML. Build, test and commit matching output. Check whether the Actions repair push failed or a skip marker prevented a deployment.

### `_site/` is missing during deployment

The committed build artifact is absent or ignored. Restore it from a clean build and commit it with the source. Do not switch to Ruby/Jekyll or add an unplanned Cloudflare build step to hide the mismatch.

### Actions passed but production did not update

Inspect the Cloudflare deployment log and commit/version. Actions is not the deployer. Verify the Git integration, production branch, empty build command and `npx wrangler deploy` command separately.

### Styles or media return 404

Inspect the built HTML and output audit. Source styles/scripts are bundled under `_astro/`; media remains under `/assets/`. Paths are root-relative. Historical Liquid filters and the old GitHub Pages `/veerpatta-website` prefix do not apply.

### Visitors retain the old version

Inspect the service-worker response and cache behavior. Ensure the current `public/sw.js` and `public/_headers` reached `_site/` and the deployment. Check in a fresh browser context as well as an existing one; avoid assuming a hard refresh alone proves a service-worker update.

### iPhone video playback fails

Verify the request path matches `/assets/media/videos/*`, the Worker still has `ASSETS`, and a range request receives 206 with valid byte counts. Local Astro preview does not execute this Worker. Test the deployed URL or Wrangler locally, then check Safari playback on an available actual/remote device.

## References

- [Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Static asset redirects](https://developers.cloudflare.com/workers/static-assets/redirects/)
- [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Repository validation workflow](../.github/workflows/build.yml)

Updated for the Astro migration, 8 November 2026.
