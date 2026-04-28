# Agents Dashboard CTO Plan

## Executive Summary

Build `agents-dashboard` as a thin, AI-native operating surface for AICOS-managed
projects, not as a generic replacement for every project-management tool.

The winning shape is:

- A public read surface for current handoff, status items, health, and feedback.
- A controlled write surface for low-risk agent feedback and bounded updates.
- A bridge layer that can sync selected work items into external PM systems when a
  team already lives there.

The wrong shape is:

- Rebuilding a full PM suite.
- Owning task truth that already lives better in code hosts or team PM systems.
- Adding broad write automation before read reliability, auth boundaries, and
  operator visibility are stable.

## Pain Points This Project Should Solve

### Primary pain points

1. AI agent work is hard to inspect quickly.
   Humans cannot easily see what an agent is doing, what is blocked, or what the
   next safe move should be.
2. Agent context is fragmented.
   Handoffs, feedback, decisions, and status often live across chat, code, and
   memory systems with no single operating view.
3. Existing PM tools are not AI-native.
   They track human tasks well, but they do not naturally expose agent context,
   MCP-read state, or bounded machine-write workflows.
4. External contributors need a safer entry point.
   A public dashboard can let people understand a project before they are given
   broad write permissions.

### What the project does not need to solve

1. It does not need to replace GitHub, Linear, or Jira as the canonical task
   system for every team.
2. It does not need to become the source of truth for code, auth, or secrets.
3. It does not need to automate high-risk writes until read paths and review
   boundaries are stable.

## Who This Serves

### Direct users

1. Project operators who need a fast read on agent state.
2. Human maintainers who need to know where to intervene.
3. AI agents that need scoped context before taking action.
4. External contributors who need orientation before touching private systems.

### Indirect users

1. Stakeholders who want visibility without joining the raw ops flow.
2. Future integration owners who want a safer bridge between AICOS and other PM
   tools.
3. Teams evaluating whether AICOS can coordinate multi-agent work in public.

## Should We Build This?

### Short answer

Yes, but only as a thin AICOS operating surface with strong boundaries.

### Why it is worth building

1. The pain is real.
   AI agent projects accumulate context faster than standard PM tools can present
   it.
2. The differentiation is real.
   The value is not "another board." The value is turning AICOS truth into a
   readable, navigable, low-risk coordination surface.
3. The scope can stay disciplined.
   The dashboard can succeed before it owns any deep write path.

### When it would not be worth building

1. If the goal drifts into "build an AI-native Plane competitor."
2. If the dashboard duplicates work that GitHub Projects or Linear already cover
   well for the target team.
3. If the team cannot maintain a strict rule that AICOS remains context authority
   and code remains code authority.

## What To Build

### Phase 1: Read reliability

1. Replace mock data with AICOS MCP reads.
2. Render current handoff, current state, current direction, health, and status
   items.
3. Show clear empty states when a project has no declared backlog yet.
4. Make auth and proxy boundaries explicit so secrets never enter browser code.

### Phase 2: Operator visibility

1. Add structured views for blockers, recent feedback, and active work.
2. Add artifact provenance so each card links back to AICOS refs.
3. Add last-refresh and staleness indicators.
4. Add degraded-state messaging for auth or MCP errors.

### Phase 3: Safe write flows

1. Allow low-risk feedback submission into AICOS.
2. Allow bounded status-item creation or updates only through reviewed write paths.
3. Gate writes with explicit auth scope and audit metadata.

### Phase 4: External system bridges

1. Sync selected work into an external PM tool only after AICOS-side semantics are
   stable.
2. Keep the bridge selective.
   Sync only what helps humans coordinate, not every internal artifact.

## What Not To Build

### Do not build now

1. A full issue tracker.
   GitHub, Linear, Jira, and Plane already do this better.
2. Rich workflow automation that mutates many systems at once.
   This creates blast radius before the operating model is proven.
3. Browser-direct token handling.
   The current proxy pattern is acceptable for local dev only.
4. Deep analytics dashboards.
   The project first needs operational clarity, not vanity metrics.
5. A universal project data model across every PM platform.
   That becomes integration drag too early.

### Why not

1. The project wins by clarity, not feature count.
2. AI-native PM is still mostly an orchestration and context problem.
3. Large write surfaces multiply auth, review, and correctness risk.

## Candidate Tools Instead Of Plane

Assumption: "Plane" means the external PM product being considered as the default
human-facing work tracker.

### Evaluation criteria

1. API quality for machine use.
2. Webhook/event support.
3. AI and MCP friendliness.
4. Fit with code-centric teams.
5. Setup and ops burden.
6. Risk of duplicating AICOS.

### Top 3

#### 1. Linear

Why it ranks first:

- Linear provides a public GraphQL API plus webhooks.
- Linear also ships a hosted MCP server, which makes it unusually friendly for
  agent workflows.
- Its product model is opinionated and fast, which helps avoid process sprawl.

Best fit:

- Small-to-medium product and engineering teams.
- Teams that want a polished human UI plus strong machine-facing integration.

Risks:

- Less flexible than Jira for custom enterprise process.
- Another source of task truth unless AICOS-to-Linear ownership is defined
  narrowly.

#### 2. GitHub Projects

Why it ranks second:

- GitHub Projects can be automated through the GraphQL API.
- For code-first teams, it keeps project tracking close to issues, PRs, and repo
  activity.
- It reduces tool sprawl when work already lives in GitHub.

Best fit:

- Code-heavy teams whose main work already sits in GitHub.
- Projects where engineering delivery matters more than cross-department process.

Risks:

- Weaker as a broad cross-functional PM tool.
- Human-facing PM ergonomics are usually behind dedicated PM products.

#### 3. Jira

Why it ranks third:

- Jira has a mature REST API and strong automation surface.
- It is the safest choice when enterprise controls, workflow depth, or existing
  company adoption dominate the decision.

Best fit:

- Larger organizations with existing Atlassian gravity.
- Teams that need strict workflow governance.

Risks:

- High process overhead.
- Easy to recreate the exact complexity this dashboard is trying to reduce.
- Lowest AI-native feel of the top three choices here.

### Recommendation

1. If this project stays public and code-adjacent, prefer GitHub Projects.
2. If the goal is the best human PM UX plus strong AI integration, prefer Linear.
3. Use Jira only when organization-level process constraints force it.

## Review And Critique Of The Project Plan

### What is currently sound

1. AICOS already has a public project scope for `projects/agents-dashboard`.
2. The repo already contains a safe local dev proxy pattern for MCP reads.
3. The project direction is correctly read-heavy first.

### What is still weak

1. There is no declared workstream index yet.
   This makes the dashboard look empty even when direction exists.
2. There are no real status items yet.
   The product cannot demonstrate value if the source project has no structured
   backlog.
3. The write story is underspecified.
   "Safe write flow" needs a narrower contract.
4. The build-vs-buy argument is not encoded into the product boundary.
   Without this, the scope can drift toward generic PM.

### Updated plan corrections

1. Treat project bootstrapping as product work.
   The dashboard should help a project that has only handoff/state first, then
   grow into status items.
2. Add explicit "source-of-truth" badges.
   Each card should say whether it came from AICOS, GitHub, or another system.
3. Define one write path only for the first milestone.
   Recommended first write path: external feedback submission into AICOS.
4. Add an integration decision memo before building external sync.
   Choose one primary bridge target, not several.

## Execution Plan

### Phase A: Establish operating truth

1. Finish MCP read integration in the dashboard.
2. Add empty states and error states.
3. Add a minimal status-item bootstrap guide for projects that have only handoff
   and direction.

### Phase B: Make the dashboard genuinely useful

1. Render handoff, health, feedback, and status in one view.
2. Link cards back to source refs.
3. Add project health and recent feedback modules.

### Phase C: Prove write usefulness

1. Implement bounded external feedback submission to AICOS.
2. Add audit metadata to every write.
3. Add operator copy that explains exactly what a write will do.

### Phase D: Decide integration strategy

1. Choose one external PM bridge target.
2. Define the sync contract.
3. Only sync a small subset: status, owner, next action, and canonical link.

## CTO Verdict

### Build recommendation

Build it, but keep the product narrow and opinionated.

### Strategic position

The dashboard should not compete with every PM tool. It should become the best
human-facing window into AICOS-managed agent work and a narrow bridge into
existing PM ecosystems where needed.

### Decision rule

If a feature does not improve:

1. visibility into agent work,
2. safety of human intervention, or
3. interoperability with an already-adopted PM surface,

then it should probably not be built here.

## Done Criteria For This Strategy Pass

- The project has a written build-vs-buy position.
- The project has a phased execution plan.
- The project has a clear list of what to build and what not to build.
- The project has a ranked top-3 alternative set to Plane.
- The project has a CTO verdict tied to real user pain instead of feature
  ambition.
