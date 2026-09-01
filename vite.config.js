import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

/**
 * Two build-time HTML steps, in one plugin so their order is guaranteed:
 *
 * 1. Flatten the homepage request waterfall. The "/" route's chunks (the Index
 *    page, the Navbar, and their static imports) are otherwise discovered only
 *    after the entry bundle executes, costing a round-trip before first paint.
 *    Emitting modulepreload links lets the browser fetch them alongside the
 *    entry. Chunks reached only through a dynamic import (three.js, Firebase)
 *    are deliberately not preloaded.
 *
 * 2. Copy the finished shell to 404.html. GitHub Pages serves that file for
 *    unknown paths, so deep links (/technology, /contact, ...) boot the router
 *    instead of showing the GitHub 404 page.
 *
 * The chunk graph is captured in writeBundle but the HTML is rewritten in
 * closeBundle: Vite writes index.html itself during the write phase, and
 * editing it earlier races that write.
 */
const htmlBuildSteps = () => {
  let preloadFiles = [];

  return {
    name: "zeliontech-html-build-steps",
    apply: "build",

    writeBundle(options, bundle) {
      const chunks = Object.values(bundle).filter((c) => c.type === "chunk");
      const byFile = new Map(chunks.map((c) => [c.fileName, c]));
      // Match on moduleIds, not facadeModuleId: when Rollup merges these
      // modules into a shared chunk the chunk has no single facade and
      // facadeModuleId is null.
      const HOME_ROOTS = /(pages[\\/]Index|components[\\/]Navbar)\.jsx$/;
      const isHomeRoot = (c) => (c.moduleIds || []).some((id) => HOME_ROOTS.test(id));

      const seen = new Set();
      const visit = (file) => {
        if (seen.has(file)) return;
        seen.add(file);
        const chunk = byFile.get(file);
        if (chunk) chunk.imports.forEach(visit);
      };
      chunks.filter(isHomeRoot).forEach((c) => visit(c.fileName));
      preloadFiles = [...seen];
    },

    closeBundle() {
      const indexPath = path.resolve(__dirname, "dist/index.html");
      if (!fs.existsSync(indexPath)) return;

      if (preloadFiles.length) {
        const html = fs.readFileSync(indexPath, "utf8");
        const links = preloadFiles
          .filter((f) => !html.includes(f))
          .map((f) => `    <link rel="modulepreload" crossorigin href="/${f}" />`)
          .join("\n");
        if (links) {
          fs.writeFileSync(indexPath, html.replace("</head>", `${links}\n  </head>`));
        }
      }

      fs.copyFileSync(indexPath, path.resolve(__dirname, "dist/404.html"));
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), htmlBuildSteps()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
