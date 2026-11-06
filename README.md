# Chess Mentor

A friendly **learn chess** web app for kids and parents. Start with short, playful lessons for a **4-year-old**, then follow the same path from beginner rules all the way to **pro-level** study topics.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## What's inside

| Stage | Focus |
|--------|--------|
| **Little Star** | Board, pieces, turns — age 3–5 with a grown-up |
| **Explorer** | Check, mate, castling, promotion, en passant |
| **Knight Rank** | Values, mates, openings, forks & pins |
| **Champion** | Endgames, strategy, combinations |
| **Master Path** | Repertoire, calculation, clocks |
| **Pro Horizon** | Ratings, FIDE titles, tournament rules, training |

Progress is saved in your browser (`localStorage`). Use **Mark lesson done** after each session.

## Build for production

```bash
npm run build
npm run preview
```

Production uses **relative asset URLs** (`./`) so it works on GitHub Pages at  
`https://<user>.github.io/<repo>/` for any repo name. Routing uses **`#/`** in the URL (HashRouter) so refreshes and deep links work without server config.

**Deploy:** See **[DEPLOY.md](./DEPLOY.md)**. The workflow in `.github/workflows/deploy-pages.yml` builds and publishes **`dist/`** only.

**Blank page + Network shows `main.tsx` 404?** GitHub Pages is serving the repo root instead of the build. Set **Settings → Pages → Source: GitHub Actions**, not “Deploy from branch” pointing at raw source.

Open the app at **`https://<user>.github.io/<repo>/#/`** (hash routes for static hosting).

## Teaching your 4-year-old

Stay on **Little Star** for a while. Read the yellow **For little learners** boxes out loud, use the board diagrams, and ignore perfect rules until they're curious. Come back to later stages over the years.
