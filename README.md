# AI Agent PM Dashboard

AI Agent PM Dashboard is a lightweight project-management dashboard for AI agent work. It is designed to sit beside `aicos-pub` and help a community see what agents are doing, what is blocked, which decisions are open, and which AICOS context should be read before continuing.

## Goals

- Show active AI agent workstreams, owners, status, risk, and next actions.
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

Default endpoint:

```text
https://aicos-pub-production.up.railway.app/mcp
```

Use a dedicated bearer token from the private token handoff. Do not commit real tokens.

See [docs/aicos-pub-mcp.md](docs/aicos-pub-mcp.md).

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
