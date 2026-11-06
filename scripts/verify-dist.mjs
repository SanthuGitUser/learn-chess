import { readFileSync } from "node:fs";
import { join } from "node:path";

const htmlPath = join(process.cwd(), "dist", "index.html");
const html = readFileSync(htmlPath, "utf8");

if (html.includes("main.tsx") || html.includes("/src/")) {
  console.error(
    "verify-dist: dist/index.html still references dev sources (main.tsx or /src/).\n" +
      "Run `npm run build` and fix vite config. Do not publish the repo root index.html to GitHub Pages.",
  );
  process.exit(1);
}

if (!html.includes("./assets/") && !html.match(/src="assets\//)) {
  console.warn(
    "verify-dist: dist/index.html has no ./assets/ script — check vite base in vite.config.ts.",
  );
}

console.log("verify-dist: OK — dist/index.html looks like a Vite production build.");
