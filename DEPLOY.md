# Deploy to GitHub Pages (fix blank page)

## If DevTools Network shows `main.tsx` → 404

That means GitHub Pages is serving the **wrong files**: the **repository root** (with `index.html` pointing at `/src/main.tsx` for Vite dev), **not** the **`dist/`** folder after `npm run build`.

Browsers cannot run `.tsx`. You must publish **only** the contents of **`dist/`**.

## Option A — GitHub Actions (recommended)

1. Push this repo to GitHub with `.github/workflows/deploy-pages.yml` on branch **`main`**.
2. In the repo: **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. If you previously used **branch `gh-pages`** or **`/ (root)`**, switch to Actions or delete that old deployment source.
5. **Actions** tab → confirm **Deploy to GitHub Pages** ran green after the last push.

Your site URL stays: `https://<user>.github.io/learn-chess/`  
App routes use a hash: `https://<user>.github.io/learn-chess/#/`

## Option B — Manual `gh-pages` branch

From your machine:

```bash
npm ci
npm run build
# dist/ must contain index.html with <script src="./assets/index-....js"> not main.tsx
```

Then put **only** `dist/` contents on the branch GitHub Pages uses (often `gh-pages` with `/ root`).

## Quick check before you leave

Open the deployed `index.html`:

- **Good:** `<script type="module" src="./assets/index-XXXXXXXX.js">`
- **Bad:** `<script type="module" src="/src/main.tsx">` → wrong folder published
