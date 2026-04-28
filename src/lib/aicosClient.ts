/**
 * AICOS Railway MCP client — browser-safe read layer.
 *
 * In dev: requests go through the Vite proxy at /api/mcp which injects
 * the bearer token server-side. Token never appears in browser JS.
 *
 * In prod: replace /api/mcp with a real backend proxy that holds the token.
 */

const MCP_ENDPOINT = "/api/mcp";

let _reqId = 0;

async function callTool<T>(
  name: string,
  args: Record<string, unknown>
): Promise<T> {
  const res = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: ++_reqId,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });

  if (!res.ok) {
    throw new Error(`MCP HTTP ${res.status}: ${res.statusText}`);
  }

  const rpc = await res.json();

  if (rpc.error) {
    throw new Error(rpc.error.message ?? JSON.stringify(rpc.error));
  }

  // MCP tool result shape: { content: [{ type: "text", text: "<json>" }] }
  const text = rpc.result?.content?.[0]?.text;
  if (!text) throw new Error("Empty MCP tool response");

  return JSON.parse(text) as T;
}

// ── Shared read identity ─────────────────────────────────────────────────────

const BASE = {
  agent_family: "claude-code",
  agent_instance_id: "dashboard-browser-reader",
  work_type: "ops",
  work_lane: "dashboard-read",
  execution_context: "browser",
} as const;

// ── Public API ───────────────────────────────────────────────────────────────

export interface AicosHealthResponse {
  summary: {
    active_status_item_count: number;
    blocked_status_item_count: number;
    active_task_count: number;
    recent_feedback_count: number;
  };
  active_task_state: unknown[];
  blocked_status_items: unknown[];
  recent_feedback: Array<{
    title: string;
    feedback_type: string;
    severity: string;
    summary: string;
    last_updated_at: string;
  }>;
}

export interface AicosStatusItem {
  item_id: string;
  item_type: string;
  status: string;
  title: string;
  path: string;
  last_updated_at: string;
  actor_role: string;
  agent_family: string;
  agent_instance_id: string;
  work_type: string;
  work_lane: string;
  summary: string;
  reason: string;
  next_step: string;
}

export interface AicosStatusItemsResponse {
  items: AicosStatusItem[];
}

export interface AicosHandoffResponse {
  title: string;
  content: string;
}

export async function fetchProjectHealth(
  scope: string
): Promise<AicosHealthResponse> {
  return callTool("aicos_get_project_health", { scope, ...BASE });
}

export async function fetchStatusItems(
  scope: string
): Promise<AicosStatusItemsResponse> {
  return callTool("aicos_get_status_items", {
    scope,
    ...BASE,
    max_results: 20,
  });
}

export async function fetchHandoffCurrent(
  scope: string
): Promise<AicosHandoffResponse> {
  return callTool("aicos_get_handoff_current", { scope, ...BASE });
}
