/**
 * Maps raw AICOS MCP responses to dashboard display types.
 */

import type {
  AicosHandoffResponse,
  AicosHealthResponse,
  AicosStatusItem,
  AicosStatusItemsResponse,
} from "./aicosClient";
import type { AgentWorkstream, DashboardSnapshot, WorkStatus } from "../data/types";

// ── Status mapping ────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, WorkStatus> = {
  open: "active",
  blocked: "blocked",
  completed: "done",
  closed: "done",
  deferred: "ready",
  paused: "ready",
};

function toWorkStatus(raw: string): WorkStatus {
  return STATUS_MAP[raw] ?? "ready";
}

function toProgress(status: string): number {
  if (status === "completed" || status === "closed") return 100;
  if (status === "blocked") return 0;
  if (status === "open") return 50;
  return 10;
}

function toDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return iso.split("T")[0];
}

// ── Item filter ───────────────────────────────────────────────────────────────

function isRealItem(item: AicosStatusItem): boolean {
  // Skip README sentinel entries that have no meaningful data
  return Boolean(item.item_id && item.item_id !== "README" && item.title);
}

// ── Mappers ───────────────────────────────────────────────────────────────────

export function mapStatusItem(item: AicosStatusItem): AgentWorkstream {
  const owner = item.agent_instance_id || item.agent_family || "unassigned";
  return {
    id: item.item_id,
    title: item.title,
    owner,
    status: toWorkStatus(item.status),
    priority: item.work_type === "code" ? "high" : "medium",
    scope: "projects/agents-dashboard",
    nextAction: item.next_step || item.summary || "—",
    updatedAt: toDate(item.last_updated_at),
    progress: toProgress(item.status),
  };
}

export interface AicosDashboardData {
  snapshot: DashboardSnapshot;
  handoffTitle: string;
  handoffContent: string;
  activeCount: number;
  blockedCount: number;
}

export function mapAicosData(
  health: AicosHealthResponse,
  items: AicosStatusItemsResponse,
  handoff: AicosHandoffResponse
): AicosDashboardData {
  const realItems = items.items.filter(isRealItem);
  const workstreams = realItems.map(mapStatusItem);

  const snapshot: DashboardSnapshot = {
    projectName: "AI Agent PM Dashboard",
    mission:
      "Give AI agents and human maintainers one shared operating view for workstreams, risks, questions, and AICOS context.",
    health:
      health.summary.blocked_status_item_count > 0
        ? "red"
        : health.summary.active_status_item_count > 0
          ? "yellow"
          : "green",
    retrievalMode: "aicos-ra: postgresql_hybrid + pgvector + embeddings",
    workstreams,
    openQuestions: [],
  };

  return {
    snapshot,
    handoffTitle: handoff.title,
    handoffContent: handoff.content,
    activeCount: health.summary.active_status_item_count,
    blockedCount: health.summary.blocked_status_item_count,
  };
}
