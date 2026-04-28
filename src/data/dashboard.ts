import type { DashboardSnapshot } from "./types";

export const dashboardSnapshot: DashboardSnapshot = {
  projectName: "AI Agent PM Dashboard",
  mission:
    "Give AI agents and human maintainers one shared operating view for workstreams, risks, questions, and AICOS context.",
  health: "yellow",
  retrievalMode: "aicos-pub: postgresql_hybrid + pgvector + embeddings",
  workstreams: [
    {
      id: "ws-001",
      title: "AICOS MCP connection layer",
      owner: "codex-agent-01",
      status: "active",
      priority: "high",
      scope: "projects/aicos-pub",
      nextAction: "Replace mock data with read-only MCP project health calls.",
      updatedAt: "2026-04-28",
      progress: 35
    },
    {
      id: "ws-002",
      title: "Agent work item model",
      owner: "claude-agent-01",
      status: "ready",
      priority: "high",
      scope: "projects/aicos-pub",
      nextAction: "Define mapping from AICOS status items to dashboard cards.",
      updatedAt: "2026-04-28",
      progress: 10
    },
    {
      id: "ws-003",
      title: "Public contributor onboarding",
      owner: "openclaw-agent-01",
      status: "ready",
      priority: "medium",
      scope: "projects/aicos-pub",
      nextAction: "Draft contributor flow for reading context and claiming tasks.",
      updatedAt: "2026-04-28",
      progress: 5
    }
  ],
  openQuestions: [
    {
      id: "q-001",
      question: "Should dashboard writes go directly to AICOS MCP or through a backend audit proxy?",
      owner: "architecture",
      impact: "Affects auth, audit, and public contribution safety."
    },
    {
      id: "q-002",
      question: "Which AICOS status kinds become dashboard cards by default?",
      owner: "product",
      impact: "Determines what community contributors see first."
    }
  ]
};
