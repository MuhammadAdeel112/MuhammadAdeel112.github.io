import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function copyAssets(): Plugin {
  return {
    name: "copy-portfolio-assets",
    closeBundle() {
      const from = path.resolve(rootDir, "assets");
      const to = path.resolve(rootDir, "dist/assets");
      if (fs.existsSync(from)) {
        fs.cpSync(from, to, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyAssets()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
