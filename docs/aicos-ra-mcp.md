# AICOS RA MCP Integration

> **Migration note:** `aicos-pub` is deprecated. All MCP connections now use `aicos-ra`.
> Project scope is `projects/agents-dashboard` on `aicos-ra`.

## Endpoint

```text
https://aicos-core-production-0da9.up.railway.app/mcp
```

## Auth

Use one A1 bearer token per agent/client. Tokens are in the private handoff file:

```text
/Users/minh/aicos/.runtime-home/AICOS_RA_RAILWAY_AGENT_ACCESS.md
```

Token labels for this project:

```text
a1-local-03-claude      (Claude Code)
a1-local-01-codex       (Codex)
a1-local-04-openclaw    (OpenClaw)
```

Token scope (A1):

```text
read:  projects/agents-dashboard, projects/btc-trading-framework, shared
write: projects/agents-dashboard
```

## Dev Setup

```bash
cp .env.example .env.local
# Edit VITE_AICOS_BEARER_TOKEN with a1-local-03-claude token
```

Vite proxy at `/api/mcp` injects the token server-side — never in browser JS.

## Health Check

```bash
TOKEN="<a1-local-03-claude-token>"
curl -fsS \
  -H "Authorization: Bearer $TOKEN" \
  https://aicos-core-production-0da9.up.railway.app/health
```

Expected: `status: ok`, `search_engine: postgresql_hybrid`, `vector: pgvector active`.

## Query Context

```bash
TOKEN="<a1-local-03-claude-token>"
curl -fsS \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0","id":1,"method":"tools/call",
    "params":{
      "name":"aicos_query_project_context",
      "arguments":{
        "scope":"projects/agents-dashboard",
        "query":"current project status",
        "agent_family":"claude-code",
        "agent_instance_id":"dashboard-local-dev",
        "work_type":"orientation",
        "work_lane":"intake",
        "execution_context":"local-dashboard",
        "max_results":8
      }
    }
  }' \
  https://aicos-core-production-0da9.up.railway.app/mcp
```

## Dashboard Integration

1. Fetch from `projects/agents-dashboard` on `aicos-ra` via Vite proxy.
2. Map status items → cards via `src/lib/aicosMapper.ts`.
3. Agents write updates with `scope: projects/agents-dashboard`.
4. Show provenance per card: MCP tool, scope, ref, timestamp.
