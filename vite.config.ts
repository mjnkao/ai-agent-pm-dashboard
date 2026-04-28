import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const mcpUrl =
    env.VITE_AICOS_MCP_URL ??
    "https://aicos-pub-production.up.railway.app/mcp";
  const token = env.VITE_AICOS_BEARER_TOKEN ?? "";

  // Parse origin and pathname from MCP URL
  const parsed = new URL(mcpUrl);
  const mcpOrigin = parsed.origin;
  const mcpPath = parsed.pathname;

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api/mcp": {
          target: mcpOrigin,
          changeOrigin: true,
          rewrite: () => mcpPath,
          headers: {
            // Token injected here — never bundled into browser JS
            Authorization: `Bearer ${token}`,
          },
        },
      },
    },
  };
});
