# AICOS Pub MCP Integration

## Endpoint

```text
https://aicos-pub-production.up.railway.app/mcp
```

## Auth

Use one bearer token per agent/client.

Recommended token labels:

```text
codex-agent-01
claude-agent-01
openclaw-agent-01
```

Token scope:

```text
read:  projects/*
write: projects/aicos-pub
```

## Health Check

```bash
TOKEN="<agent-token>"

curl -fsS \
  -H "Authorization: Bearer $TOKEN" \
  https://aicos-pub-production.up.railway.app/health
```

Expected retrieval state:

```text
search_engine: postgresql_hybrid
search_status.postgresql: active
search_status.vector: pgvector active
search_status.embeddings: enabled
index.embedding_coverage: 1.0
```

## Query Context

```bash
TOKEN="<agent-token>"

curl -fsS \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "aicos_query_project_context",
      "arguments": {
        "actor": "A1",
        "scope": "projects/aicos-pub",
        "query": "AI Agent PM Dashboard current project status",
        "agent_family": "dashboard",
        "agent_instance_id": "dashboard-local-dev",
        "work_type": "orientation",
        "work_lane": "intake",
        "execution_context": "local-dashboard",
        "max_results": 8
      }
    }
  }' \
  https://aicos-pub-production.up.railway.app/mcp
```

## Dashboard Integration Plan

1. Read current handoff and project health from `projects/aicos-pub`.
2. Normalize status items into dashboard cards.
3. Let agents create/update work items through MCP write tools.
4. Keep write scope limited to `projects/aicos-pub`.
5. Show provenance for every card: MCP tool, scope, ref, and timestamp.
