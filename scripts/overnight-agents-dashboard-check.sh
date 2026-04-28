#!/bin/zsh

set -euo pipefail

REPO="/Users/minh/Projects/agents-pm-dashboard"
PROMPT_FILE="$REPO/automation/agents-dashboard-overnight.prompt.md"
LOG_DIR="$REPO/.logs"
STAMP="$(date +%Y%m%dT%H%M%S)"
LOG_FILE="$LOG_DIR/overnight-agents-dashboard-$STAMP.log"

mkdir -p "$LOG_DIR"

required_files=(
  "$REPO/docs/strategy/agents-dashboard-cto-plan.md"
  "$REPO/docs/operations/overnight-automation.md"
)

required_sections=(
  "## Executive Summary"
  "## Pain Points This Project Should Solve"
  "## Who This Serves"
  "## Should We Build This?"
  "## What To Build"
  "## What Not To Build"
  "## Candidate Tools Instead Of Plane"
  "## Review And Critique Of The Project Plan"
  "## Execution Plan"
  "## CTO Verdict"
)

needs_work=0

for path in "${required_files[@]}"; do
  if [[ ! -f "$path" ]]; then
    needs_work=1
  fi
done

if [[ -f "$REPO/docs/strategy/agents-dashboard-cto-plan.md" ]]; then
  for section in "${required_sections[@]}"; do
    if ! grep -Fq "$section" "$REPO/docs/strategy/agents-dashboard-cto-plan.md"; then
      needs_work=1
    fi
  done
fi

if [[ "$needs_work" -eq 0 ]]; then
  echo "agents-dashboard overnight check: deliverables already complete"
  exit 0
fi

echo "agents-dashboard overnight check: missing or incomplete deliverables"

/Applications/Codex.app/Contents/Resources/codex exec \
  --cd "$REPO" \
  --dangerously-bypass-approvals-and-sandbox \
  --output-last-message "$LOG_FILE" \
  - < "$PROMPT_FILE"
