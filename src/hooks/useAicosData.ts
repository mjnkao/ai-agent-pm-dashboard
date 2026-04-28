import { useEffect, useState } from "react";
import {
  fetchHandoffCurrent,
  fetchProjectHealth,
  fetchStatusItems,
} from "../lib/aicosClient";
import { type AicosDashboardData, mapAicosData } from "../lib/aicosMapper";

type State =
  | { status: "loading" }
  | { status: "ok"; data: AicosDashboardData }
  | { status: "error"; message: string };

export function useAicosData(scope: string): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setState({ status: "loading" });
      try {
        const [health, items, handoff] = await Promise.all([
          fetchProjectHealth(scope),
          fetchStatusItems(scope),
          fetchHandoffCurrent(scope),
        ]);
        if (!cancelled) {
          setState({ status: "ok", data: mapAicosData(health, items, handoff) });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof Error ? err.message : "Failed to load AICOS data",
          });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [scope]);

  return state;
}
