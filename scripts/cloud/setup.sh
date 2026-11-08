#!/usr/bin/env bash
# Prepare the Astro site using the committed npm lockfile.
#   bash scripts/cloud/setup.sh          # install, check, build, test
#   bash scripts/cloud/setup.sh --serve  # then preview _site on port 4321
set -euo pipefail
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

say() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
SERVE=0
case "${1:-}" in
  '') ;;
  --serve) SERVE=1 ;;
  *) echo "Usage: bash scripts/cloud/setup.sh [--serve]" >&2; exit 2 ;;
esac
if [ "$#" -gt 1 ]; then
  echo "Usage: bash scripts/cloud/setup.sh [--serve]" >&2
  exit 2
fi

say "Node.js and npm"
command -v node >/dev/null || { echo "Install Node.js 24 LTS first (minimum 22.12)." >&2; exit 1; }
command -v npm >/dev/null || { echo "npm is required; use the npm bundled with Node.js." >&2; exit 1; }
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major<22 || (major===22 && minor<12)){console.error("Node.js 22.12 or newer is required; Node.js 24 LTS is recommended.");process.exit(1)}'
printf '    Node %s\n    npm %s\n' "$(node --version)" "$(npm --version)"

say "Install locked dependencies"
npm ci

say "Check Astro and TypeScript"
npm run check

say "Build and audit public output"
npm run build

say "Run unit and output-contract tests"
npm test
printf '    %s files, %s\n' "$(find _site -type f | wc -l)" "$(du -sh _site | cut -f1)"

if [ "$SERVE" = "1" ]; then
  say "Previewing the built site at http://127.0.0.1:4321/"
  exec npm run preview -- --host 127.0.0.1 --port 4321
fi

cat <<'EOT'

Next:
  npm run dev -- --host 127.0.0.1              # development with live reload
  npm run preview -- --host 127.0.0.1          # preview the built _site/
  npx playwright install chromium            # browser install, when available
  npm run test:e2e                            # separate browser/accessibility suite

The checks above do not include browser or real-device testing.
Review source and rebuilt _site/ together before committing. Pushing to main
triggers Cloudflare Workers production deployment. Its build command stays
empty; npx wrangler deploy uploads the committed _site/ without rebuilding it.
See docs/DEPLOYMENT.md. This script does not commit, push, or deploy anything.
EOT
