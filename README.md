# AI Agent PM Dashboard

AI Agent PM Dashboard is a lightweight project-management dashboard for AI agent work. It connects to `aicos-ra` (AICOS private Railway runtime) and helps a team see what agents are doing, what is blocked, which decisions are open, and which AICOS context should be read before continuing.

## Goals

- Show active AI agent workstreams, owners, status, risk, and next actions.
- Make it obvious which agents worked on the project, what they did, when they did it, and how far they got.
- Link PM dashboard items back to AICOS MCP scopes, packets, handoffs, and open questions.
- Provide templates that agents can fill consistently.
- Keep secrets out of git while making remote MCP setup repeatable.

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## AICOS MCP

Runtime: `aicos-ra` — AICOS private Railway MCP.

```text
https://aicos-core-production-0da9.up.railway.app/mcp
```

Scope: `projects/agents-dashboard`. Use token `a1-local-03-claude` (or another A1 token) from the private handoff file. Do not commit real tokens.

> **Deprecated:** `aicos-pub` (`aicos-pub-production.up.railway.app`) is no longer used by this project.

See [docs/aicos-ra-mcp.md](docs/aicos-ra-mcp.md).

Strategy and automation notes:

- [docs/strategy/agents-dashboard-cto-plan.md](docs/strategy/agents-dashboard-cto-plan.md)
- [docs/strategy/mvp-agent-activity-visibility-proposal-20260429.md](docs/strategy/mvp-agent-activity-visibility-proposal-20260429.md)
- [docs/strategy/ai-team-operating-system-cto-architecture-proposal-20260429.md](docs/strategy/ai-team-operating-system-cto-architecture-proposal-20260429.md)
- [docs/operations/overnight-automation.md](docs/operations/overnight-automation.md)

## Project Structure

```text
src/
  components/       Dashboard UI components
  data/             Mock project data and TypeScript types
docs/
  templates/        Agent/project/task templates
```

## Current Status

This is the initial scaffold. It uses local mock data first; AICOS MCP integration is documented and intentionally kept behind local env variables until auth/token handling is finalized.
