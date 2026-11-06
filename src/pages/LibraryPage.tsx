import { Link } from "react-router-dom";
import { stages } from "@/data/curriculum";

/** Simplified library inspired by Old School Chess — kid-friendly paths into our app. */
const sections = [
  {
    title: "Pieces & board",
    emoji: "♟️",
    blurb: "How every piece moves, square names, starting setup.",
    links: [
      { to: "/learn/little-star/the-board", label: "The chessboard" },
      { to: "/learn/little-star/meet-the-team", label: "Meet the team" },
      { to: "/try", label: "Move lab (interactive)" },
      { to: "/coordinates", label: "Square name trainer" },
    ],
  },
  {
    title: "Rules & special moves",
    emoji: "📜",
    blurb: "Check, mate, draws, castling, en passant, promotion.",
    links: [
      { to: "/learn/explorer/check", label: "Check" },
      { to: "/learn/explorer/checkmate", label: "Checkmate" },
      { to: "/learn/explorer/stalemate-draw", label: "Stalemate & draws" },
      { to: "/learn/explorer/castling", label: "Castling (animated)" },
      { to: "/learn/explorer/en-passant", label: "En passant (animated)" },
    ],
  },
  {
    title: "Tactics & traps",
    emoji: "⚡",
    blurb: "Forks, pins, and tricks to know—especially Scholar's Mate.",
    links: [
      { to: "/learn/knight-rank/tactics-intro", label: "Fork & pin movies" },
      { to: "/learn/knight-rank/scholars-mate", label: "Scholar's Mate trap" },
      { to: "/learn/knight-rank/mate-patterns", label: "Mate patterns" },
    ],
  },
  {
    title: "Openings & plans",
    emoji: "🚀",
    blurb: "Simple opening ideas—not long memorized lines.",
    links: [
      { to: "/learn/knight-rank/opening-basics", label: "Opening goals" },
      { to: "/learn/knight-rank/piece-values", label: "Piece values" },
    ],
  },
  {
    title: "Endgames & beyond",
    emoji: "🏅",
    blurb: "Pawn endings, strategy, and the path to serious play.",
    links: [
      { to: "/path", label: "Full learning path (all stages)" },
      { to: "/learn/champion/endgame-kpk", label: "King & pawn endgames" },
      { to: "/learn/master/opening-repertoire", label: "Building a repertoire" },
    ],
  },
];

export function LibraryPage() {
  const lessonCount = stages.reduce((n, s) => n + s.lessons.length, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-slate-900">Chess library</h1>
        <p className="mt-2 max-w-3xl font-body text-sm text-slate-600 sm:text-base">
          Inspired by libraries like{" "}
          <a href="https://oldschoolchess.com/learn" target="_blank" rel="noreferrer" className="text-sky-700">
            Old School Chess Learn
          </a>
          —same topics, shorter words, interactive boards and step-by-step “mini movies” instead of long articles.
        </p>
        <p className="mt-1 font-body text-xs text-slate-500">{lessonCount} lessons in your path · tap any topic</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((sec) => (
          <article key={sec.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
              <span>{sec.emoji}</span>
              {sec.title}
            </h2>
            <p className="mt-1 font-body text-xs text-slate-600">{sec.blurb}</p>
            <ul className="mt-3 space-y-1.5">
              {sec.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block rounded-lg bg-slate-50 px-3 py-2 font-body text-sm font-semibold text-sky-800 no-underline hover:bg-sky-50"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
