import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Relative URLs work on GitHub Pages for any repo name or custom domain.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "./" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
