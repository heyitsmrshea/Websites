#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/andrewshea/Desktop/Websites/templates"
E2E="$ROOT/e2e/forced-browser-review.mjs"
VALIDATOR="$ROOT/tools/validate-template-criteria.mjs"

templates=(
  "corporate-investment"
  "industrial-services"
  "luxury-product-launch"
  "presentation-microsite"
  "calculator-explainer"
  "consultancy"
  "saas-marketing"
  "photography-portfolio"
  "startup-brochure"
  "event-launch"
)

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

[[ -f "$E2E" ]] || fail "Missing review runner: $E2E"
[[ -f "$VALIDATOR" ]] || fail "Missing validation criteria runner: $VALIDATOR"

for template in "${templates[@]}"; do
  config="$ROOT/e2e/configs/$template.json"
  dir="$ROOT/$template"

  echo ""
  echo "==> Validating template scaffold: $template"

  [[ -d "$dir" ]] || fail "Missing template directory: $dir"
  [[ -f "$config" ]] || fail "Missing template config: $config"
  [[ -f "$dir/index.html" ]] || fail "Missing index.html in $dir"
  [[ -f "$dir/styles.css" ]] || fail "Missing styles.css in $dir"
  [[ -f "$dir/script.js" ]] || fail "Missing script.js in $dir"
  [[ -d "$dir/assets" ]] || fail "Missing assets directory in $dir"
  [[ -f "$dir/README.md" ]] || fail "Missing README.md in $dir"
  [[ -f "$dir/.nojekyll" ]] || fail "Missing .nojekyll in $dir"
  [[ -f "$dir/.github/workflows/deploy-pages.yml" ]] || fail "Missing deploy-pages.yml in $dir"

  echo "==> Running forced browser review: $template"
  node "$E2E" --config "$config"

  echo "==> Enforcing validation criteria: $template"
  node "$VALIDATOR" "$template"
done

echo ""
echo "All templates passed forced browser review."
