import { Activity, AlertTriangle, Bot, GitBranch, ShieldCheck } from "lucide-react";
import { dashboardSnapshot } from "../data/dashboard";
import type { AgentWorkstream, WorkStatus } from "../data/types";

const statusLabel: Record<WorkStatus, string> = {
  ready: "Ready",
  active: "Active",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
};

function statusClass(status: WorkStatus) {
  return `status status-${status}`;
}

function WorkstreamCard({ item }: { item: AgentWorkstream }) {
  return (
    <article className="work-card">
      <div className="work-card-top">
        <span className={statusClass(item.status)}>{statusLabel[item.status]}</span>
        <span className="priority">{item.priority}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.nextAction}</p>
      <div className="meta-grid">
        <span>Owner</span>
        <strong>{item.owner}</strong>
        <span>Scope</span>
        <strong>{item.scope}</strong>
      </div>
      <div className="progress">
        <div style={{ width: `${item.progress}%` }} />
      </div>
      <small>Updated {item.updatedAt}</small>
    </article>
  );
}

export function Dashboard() {
  const snapshot = dashboardSnapshot;
  const activeCount = snapshot.workstreams.filter((item) => item.status === "active").length;
  const readyCount = snapshot.workstreams.filter((item) => item.status === "ready").length;

  return (
    <main className="dashboard-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">
            <Bot size={18} /> Agent operating room
          </p>
          <h1>{snapshot.projectName}</h1>
          <p className="mission">{snapshot.mission}</p>
        </div>
        <div className="hero-panel">
          <span>Retrieval mode</span>
          <strong>{snapshot.retrievalMode}</strong>
          <small>AICOS public context is the source of truth for agent handoff state.</small>
        </div>
      </section>

      <section className="metrics">
        <div className="metric">
          <Activity />
          <span>Active</span>
          <strong>{activeCount}</strong>
        </div>
        <div className="metric">
          <GitBranch />
          <span>Ready</span>
          <strong>{readyCount}</strong>
        </div>
        <div className="metric">
          <AlertTriangle />
          <span>Open questions</span>
          <strong>{snapshot.openQuestions.length}</strong>
        </div>
        <div className="metric">
          <ShieldCheck />
          <span>Health</span>
          <strong>{snapshot.health}</strong>
        </div>
      </section>

      <section className="section-grid">
        <div>
          <div className="section-heading">
            <p>Workstreams</p>
            <h2>Agent task lanes</h2>
          </div>
          <div className="work-grid">
            {snapshot.workstreams.map((item) => (
              <WorkstreamCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <aside className="questions">
          <div className="section-heading">
            <p>Decisions</p>
            <h2>Open questions</h2>
          </div>
          {snapshot.openQuestions.map((item) => (
            <article key={item.id} className="question-card">
              <span>{item.owner}</span>
              <h3>{item.question}</h3>
              <p>{item.impact}</p>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
}
