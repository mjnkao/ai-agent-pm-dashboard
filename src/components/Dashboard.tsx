import { Activity, AlertTriangle, Bot, GitBranch, RefreshCw, ShieldCheck } from "lucide-react";
import { dashboardSnapshot } from "../data/dashboard";
import type { AgentWorkstream, DashboardSnapshot, WorkStatus } from "../data/types";
import { useAicosData } from "../hooks/useAicosData";

const SCOPE = "projects/agents-dashboard";

// ── Status labels / classes ───────────────────────────────────────────────────

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

// ── Sub-components ────────────────────────────────────────────────────────────

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

function LoadingOverlay() {
  return (
    <div className="data-state">
      <RefreshCw size={22} className="spin" />
      <span>Loading AICOS context…</span>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="data-state data-state-error">
      <AlertTriangle size={18} />
      <span>AICOS unavailable — showing cached snapshot. ({message})</span>
    </div>
  );
}

function DataSourceBadge({ live }: { live: boolean }) {
  return (
    <span className={`source-badge ${live ? "source-live" : "source-mock"}`}>
      {live ? "● live" : "○ mock"}
    </span>
  );
}

function HandoffSection({ title, content }: { title: string; content: string }) {
  // Show only the first meaningful paragraph (skip the H1 line)
  const lines = content
    .split("\n")
    .filter((l) => !l.startsWith("# ") && l.trim() !== "");
  const preview = lines.slice(0, 6).join(" ").slice(0, 420);

  return (
    <section className="handoff-section">
      <div className="section-heading">
        <p>AICOS</p>
        <h2>{title}</h2>
      </div>
      <p className="handoff-preview">{preview}{preview.length >= 420 ? "…" : ""}</p>
    </section>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

interface DashboardBodyProps {
  snapshot: DashboardSnapshot;
  handoffTitle?: string;
  handoffContent?: string;
  activeCount: number;
  blockedCount: number;
  live: boolean;
}

function DashboardBody({
  snapshot,
  handoffTitle,
  handoffContent,
  activeCount,
  blockedCount,
  live,
}: DashboardBodyProps) {
  const readyCount = snapshot.workstreams.filter((i) => i.status === "ready").length;

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
          <strong>
            {snapshot.retrievalMode} <DataSourceBadge live={live} />
          </strong>
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
          <span>Blocked</span>
          <strong>{blockedCount}</strong>
        </div>
        <div className="metric">
          <ShieldCheck />
          <span>Health</span>
          <strong>{snapshot.health}</strong>
        </div>
      </section>

      {handoffTitle && handoffContent && (
        <HandoffSection title={handoffTitle} content={handoffContent} />
      )}

      <section className="section-grid">
        <div>
          <div className="section-heading">
            <p>Workstreams</p>
            <h2>Agent task lanes</h2>
          </div>
          {snapshot.workstreams.length === 0 ? (
            <p className="empty-state">No active status items in AICOS for this scope.</p>
          ) : (
            <div className="work-grid">
              {snapshot.workstreams.map((item) => (
                <WorkstreamCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {snapshot.openQuestions.length > 0 && (
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
        )}
      </section>
    </main>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

export function Dashboard() {
  const state = useAicosData(SCOPE);

  if (state.status === "loading") {
    return (
      <main className="dashboard-shell">
        <LoadingOverlay />
      </main>
    );
  }

  if (state.status === "error") {
    // Fallback to mock data so dashboard is always usable
    return (
      <>
        <ErrorBanner message={state.message} />
        <DashboardBody
          snapshot={dashboardSnapshot}
          activeCount={dashboardSnapshot.workstreams.filter((i) => i.status === "active").length}
          blockedCount={dashboardSnapshot.workstreams.filter((i) => i.status === "blocked").length}
          live={false}
        />
      </>
    );
  }

  const { data } = state;
  return (
    <DashboardBody
      snapshot={data.snapshot}
      handoffTitle={data.handoffTitle}
      handoffContent={data.handoffContent}
      activeCount={data.activeCount}
      blockedCount={data.blockedCount}
      live={true}
    />
  );
}
