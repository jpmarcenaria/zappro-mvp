#!/usr/bin/env bash
set -euo pipefail

dirname=$(cd "$(dirname "$0")" && pwd)
root=$(cd "$dirname/.." && pwd)
POLICY="$root/.codex/policy.json"

# Lightweight JSON extractors (no jq). Assumes simple arrays of strings.
extract_array() {
  local key="$1"
  sed -n "/\"$key\"\s*:\s*\[/,/]\s*$/p" "$POLICY" \
    | sed '1d;$d' \
    | sed -E 's/[",]//g;s/^\s+//;s/\s+$//' \
    | grep -v '^$' || true
}

ALLOW=( $(extract_array allow_write) )
DENY=( $(extract_array deny_write) )
DISALLOW_RENAMES=$(grep -o '"disallow_renames"\s*:\s*[^,]+' "$POLICY" | awk -F: '{gsub(/[ \t\"]/,"",$2); print $2}')
MAX_FILES=$(grep -o '"max_files_changed"\s*:\s*[^,]+' "$POLICY" | awk -F: '{gsub(/[ \t\"]/,"",$2); print $2}')
MAX_DIFF=$(grep -o '"max_diff_bytes"\s*:\s*[^,]+' "$POLICY" | awk -F: '{gsub(/[ \t\"]/,"",$2); print $2}')

changed_files() {
  if [ -n "${CHANGED_FILES:-}" ]; then
    echo "$CHANGED_FILES" | tr ' ' '\n' | grep -v '^$' || true
    return
  fi
  # Try PR diff base
  if git rev-parse --verify -q origin/"${GITHUB_BASE_REF:-}" >/dev/null 2>&1; then
    git diff --name-only origin/"${GITHUB_BASE_REF}"...HEAD
    return
  fi
  # Fallback to HEAD vs initial tree
  if git rev-parse --verify -q HEAD^ >/dev/null 2>&1; then
    git diff --name-only HEAD^ HEAD
  else
    # Initial commit: allow
    exit 0
  fi
}

match_glob() {
  local path="$1"; shift
  local pat
  for pat in "$@"; do
    # glob -> regex
    local rx="^"${pat//./\\.}
    rx=${rx//**/.+}
    rx=${rx//\*/[^/]*}
    rx+="$"
    if [[ "$path" =~ $rx ]]; then return 0; fi
  done
  return 1
}

FILES=( $(changed_files) )
COUNT=${#FILES[@]}
if [ "$COUNT" -eq 0 ]; then
  echo "policy-check: nenhum arquivo alterado detectado."
  exit 0
fi

echo "policy-check: arquivos alterados ($COUNT):" >&2
printf '%s\n' "${FILES[@]}" >&2

# Size check (best-effort)
if [ -n "${MAX_DIFF:-}" ] && command -v git >/dev/null 2>&1; then
  BYTES=$(git diff -U0 --no-color ${GITHUB_BASE_REF:+origin/${GITHUB_BASE_REF}...}HEAD | wc -c)
  if [ "$BYTES" -gt "$MAX_DIFF" ]; then
    echo "ERRO: diff muito grande ($BYTES bytes > $MAX_DIFF)." >&2
    exit 2
  fi
fi

# Files count
if [ -n "${MAX_FILES:-}" ] && [ "$COUNT" -gt "$MAX_FILES" ]; then
  echo "ERRO: muitos arquivos alterados ($COUNT > $MAX_FILES)." >&2
  exit 2
fi

# Renames/deletes if disallowed
if [ "${DISALLOW_RENAMES:-true}" = "true" ]; then
  if git rev-parse --verify -q HEAD^ >/dev/null 2>&1; then
    if git diff --name-status ${GITHUB_BASE_REF:+origin/${GITHUB_BASE_REF}...}HEAD | grep -E '^[RD]\s' >/dev/null 2>&1; then
      echo "ERRO: renomes/deletes detectados e não permitidos pela política." >&2
      exit 2
    fi
  fi
fi

# Allow/Deny by path
for f in "${FILES[@]}"; do
  if match_glob "$f" "${DENY[@]}"; then
    echo "ERRO: caminho negado pela política: $f" >&2
    exit 2
  fi
  if ! match_glob "$f" "${ALLOW[@]}"; then
    echo "ERRO: caminho fora do allowlist: $f" >&2
    exit 2
  fi
done

echo "policy-check: OK"
