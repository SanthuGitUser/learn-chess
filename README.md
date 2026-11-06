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

The production build uses base path **`/learn-chess/`** so it works on GitHub Pages at  
`https://<user>.github.io/learn-chess/`. Local dev still uses `/`.

**GitHub Pages:** enable Pages (Actions or deploy the `dist` folder), then copy the contents of `dist/` to the published branch/folder. After updating the site, redeploy so `index.html` loads JS/CSS from `/learn-chess/assets/...`.

## Teaching your 4-year-old

Stay on **Little Star** for a while. Read the yellow **For little learners** boxes out loud, use the board diagrams, and ignore perfect rules until they're curious. Come back to later stages over the years.
