You are working in `/Users/minh/Projects/agents-pm-dashboard`.

Objective:

Check whether the following deliverables are complete:

1. `docs/strategy/agents-dashboard-cto-plan.md`
2. `docs/operations/overnight-automation.md`

If they are incomplete, finish them. Keep scope tight. Do not invent unrelated
feature work.

Required outcomes:

1. Preserve any existing user changes you did not make.
2. Only modify files needed for the deliverables or the automation loop.
3. If code changes, run the smallest relevant validation command.
4. Commit only your own changes with a clear message.
5. Push the commit to `origin/main`.
6. Update AICOS public context for `projects/agents-dashboard` after the work is
   done.

For the AICOS writeback:

- Use the public AICOS tools, not the railway-mvp tools.
- Scope: `projects/agents-dashboard`
- If you write, include the contract ack
  `mcp-v0.6-write-contract-ack`.
- Record at least:
  - one checkpoint summarizing the work,
  - one handoff update with the next step,
  - one status item update for the overnight automation loop.

When deciding whether work is complete, make sure the CTO strategy document
contains all of these sections:

- Executive Summary
- Pain Points This Project Should Solve
- Who This Serves
- Should We Build This?
- What To Build
- What Not To Build
- Candidate Tools Instead Of Plane
- Review And Critique Of The Project Plan
- Execution Plan
- CTO Verdict

Also make sure the overnight automation document contains these sections:

- Goal
- Deliverables Checked By The Cron Loop
- How The Loop Works
- Safety Notes
- Runtime Environment
- Scheduler Note

Stop conditions:

1. If the repo contains conflicting unrelated user edits in the same file, do not
   force through them.
2. If git push fails, explain the failure in the final message and write a blocked
   or partial AICOS update.
3. If AICOS write tools are unavailable, still commit and push, then state the
   exact AICOS blocker.
