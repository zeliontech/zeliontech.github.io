import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// GitHub Pages serves 404.html for unknown paths. Copying the SPA shell there
// lets deep links (/technology, /contact, ...) boot the router instead of
// showing the GitHub 404 page.
const spaFallback = () => ({
  name: "spa-404-fallback",
  closeBundle() {
    const index = path.resolve(__dirname, "dist/index.html");
    if (fs.existsSync(index)) {
      fs.copyFileSync(index, path.resolve(__dirname, "dist/404.html"));
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), spaFallback()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
