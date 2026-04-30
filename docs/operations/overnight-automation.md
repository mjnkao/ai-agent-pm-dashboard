# Overnight Automation

## Goal

Run a non-interactive Codex pass every 2 hours to check whether the project
strategy deliverables are complete. If not, continue the work, commit the result,
push to git, and write project context back to AICOS.

## Deliverables Checked By The Cron Loop

1. `docs/strategy/agents-dashboard-cto-plan.md`
2. `docs/operations/overnight-automation.md`

## How The Loop Works

1. `scripts/overnight-agents-dashboard-check.sh` checks whether the required
   files exist and contain the expected section markers.
2. If the deliverables are already present, the script exits cleanly.
3. If they are missing or incomplete, the script runs `codex exec`
   non-interactively using `automation/agents-dashboard-overnight.prompt.md`.
4. The Codex prompt instructs the agent to:
   - complete missing deliverables,
   - run validation if code changed,
   - commit and push its own work,
   - write the result back into `projects/agents-dashboard` through AICOS.

## Safety Notes

1. The cron loop is only safe because its scope is bounded to this repo.
2. The Codex invocation is configured for unattended execution, so it should not
   be repurposed casually.
3. The current cron script uses
   `--dangerously-bypass-approvals-and-sandbox` because unattended `git push`
   and AICOS writeback would otherwise block on approval.
4. The prompt explicitly tells the agent not to overwrite unrelated user changes.
5. Real bearer tokens must remain outside git and outside browser bundles.

## Runtime Environment

The scheduler must run the script with a PATH that can resolve system tools,
git, and the Codex CLI. A minimal macOS-safe PATH is:

`/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`

Keep the PATH setup in the scheduler or script entrypoint, not inside the Codex
prompt. The prompt should describe the work contract; the shell entrypoint should
own host execution details.

## Scheduler Note

This repo is prepared for cron-style execution every 2 hours, but on this macOS
host the `crontab` binary is currently failing while creating its temp file. If
that remains true, use a LaunchAgent with `StartInterval = 7200` as the native
host scheduler while keeping the same shell-script entrypoint.
