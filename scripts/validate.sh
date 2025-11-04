#!/usr/bin/env bash
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)

need() { command -v "$1" >/dev/null 2>&1 || { echo "Falta comando: $1" >&2; exit 1; }; }
need git

# Checagens básicas
[ -f "$root/PRD.md" ] || { echo "PRD.md ausente"; exit 1; }
[ -f "$root/AGENTS.md" ] || { echo "AGENTS.md ausente"; exit 1; }
[ -f "$root/.codex/policy.json" ] || { echo ".codex/policy.json ausente"; exit 1; }
[ -f "$root/.github/workflows/ci.yml" ] || { echo "CI ausente"; exit 1; }

# PRD deve conter seções mínimas
grep -qi "Visão Geral" "$root/PRD.md" || { echo "PRD sem 'Visão Geral'"; exit 1; }

# Rodar policy-check (melhor esforço)
if git rev-parse --verify -q HEAD >/dev/null 2>&1; then
  CHANGED_FILES=$(git diff --name-only ${GITHUB_BASE_REF:+origin/${GITHUB_BASE_REF}...}HEAD || true)
  CHANGED_FILES="$CHANGED_FILES" "$root/scripts/policy-check.sh" || true
fi

echo "validate: OK"
