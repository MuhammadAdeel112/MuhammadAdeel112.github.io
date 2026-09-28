import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function useViteHtml(): Plugin {
  return {
    name: "use-vite-html",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === "/" || req.url === "/index.html") {
          req.url = "/index.vite.html";
        }
        next();
      });
    },
  };
}

function publishToRoot(): Plugin {
  return {
    name: "publish-to-root",
    closeBundle() {
      const docs = path.resolve(rootDir, "docs");
      const built = path.join(docs, "index.vite.html");
      const docsIndex = path.join(docs, "index.html");
      if (fs.existsSync(built)) {
        fs.renameSync(built, docsIndex);
      }
      fs.writeFileSync(path.join(docs, ".nojekyll"), "");
      if (fs.existsSync(docsIndex)) {
        fs.copyFileSync(docsIndex, path.resolve(rootDir, "index.html"));
      }
      const appFrom = path.join(docs, "app");
      const appTo = path.resolve(rootDir, "app");
      if (fs.existsSync(appFrom)) {
        fs.rmSync(appTo, { recursive: true, force: true });
        fs.cpSync(appFrom, appTo, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [useViteHtml(), react(), publishToRoot()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  build: {
    outDir: "docs",
    assetsDir: "app",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(rootDir, "index.vite.html"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
