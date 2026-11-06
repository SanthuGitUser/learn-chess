import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// GitHub Pages serves project sites at /<repo-name>/ (e.g. /learn-chess/)
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/learn-chess/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
