#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# setup.sh — bring a Claude cloud container to a working Jekyll environment.
#
#   bash scripts/cloud/setup.sh          # install gems, build, report
#   bash scripts/cloud/setup.sh --serve  # ...then serve on 127.0.0.1:4000
#
# Verified 19 Aug 2026: ruby 3.3.6, bundler and a C toolchain are already in the
# image, so this is just `bundle install` plus a build. No Ruby version manager
# and no apt needed.
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
SERVE=0; [ "${1:-}" = "--serve" ] && SERVE=1

say "Ruby"
command -v ruby   >/dev/null || { echo "no ruby in this image" >&2; exit 1; }
command -v bundle >/dev/null || gem install bundler --no-document
echo "    $(ruby -v)"
echo "    bundler $(bundle -v | awk '{print $3}')"

say "Gems"
# Vendored so the install survives inside the checkout and .gitignore already
# covers vendor/. github-pages pins a large dependency tree; first run is slow.
bundle config set --local path vendor/bundle >/dev/null
bundle install --jobs 4
echo "    $(bundle list 2>/dev/null | grep -c '^  \*') gems"

say "Build"
# remote_theme (pages-themes/cayman) is fetched from GitHub at build time, so
# this step needs network. A container without it fails here, not at serve.
bundle exec jekyll build
echo "    $(find _site -type f | wc -l) files, $(du -sh _site | cut -f1)"

say "Sanity"
for f in _site/index.html _site/en/index.html _site/hi/index.html; do
  [ -f "$f" ] && echo "    ok   $f" || { echo "    MISSING $f" >&2; exit 1; }
done

if [ "$SERVE" = "1" ]; then
  say "Serving on http://127.0.0.1:4000/"
  exec bundle exec jekyll serve --host 127.0.0.1 --port 4000
fi

cat <<'EOT'

Next:
  bundle exec jekyll serve --host 127.0.0.1 --port 4000   # local preview
  git push origin main                                    # deploys via Cloudflare

Deployment note: this repo deploys through Cloudflare Pages, which builds from
GitHub on every push to main - so a push from a cloud container really is the
deploy. .github/workflows/build.yml is a build check only; it publishes nothing.
The sibling repo (veerpatta/schoolfees) deploys through Vercel's GitHub App,
which does NOT react to a container push - it needs scripts/cloud/deploy.sh
there.
EOT
