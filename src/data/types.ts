export type WorkStatus = "ready" | "active" | "blocked" | "review" | "done";

export type AgentWorkstream = {
  id: string;
  title: string;
  owner: string;
  status: WorkStatus;
  priority: "low" | "medium" | "high";
  scope: string;
  nextAction: string;
  updatedAt: string;
  progress: number;
};

export type OpenQuestion = {
  id: string;
  question: string;
  owner: string;
  impact: string;
};

export type DashboardSnapshot = {
  projectName: string;
  mission: string;
  health: "green" | "yellow" | "red";
  retrievalMode: string;
  workstreams: AgentWorkstream[];
  openQuestions: OpenQuestion[];
};
