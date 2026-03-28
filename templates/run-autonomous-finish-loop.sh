#!/bin/zsh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT"

echo "==> Rebuilding all templates"
npm run generate:all

echo
echo "==> Running browser review and structural validation"
./run-zero-stop-template-program.sh

echo
echo "==> Scoring every full-page screenshot with the 30-point rubric"
node ./tools/score-fullpage-screenshots.mjs

echo
echo "Autonomous finish loop completed successfully."
