import { useCallback, useMemo, useState } from "react";
import type { Square } from "chess.js";
import { ChessboardPanel } from "@/components/ChessboardPanel";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8"];

function randomSquare(): Square {
  const f = FILES[Math.floor(Math.random() * FILES.length)]!;
  const r = RANKS[Math.floor(Math.random() * RANKS.length)]!;
  return `${f}${r}` as Square;
}

export function CoordinateTrainerPage() {
  const [target, setTarget] = useState<Square>(() => randomSquare());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [flash, setFlash] = useState<"ok" | "miss" | null>(null);

  const highlight = useMemo(() => {
    if (flash === "ok") {
      return {
        [target]: {
          background: "radial-gradient(circle, rgba(34,197,94,0.7) 30%, transparent 32%)",
        },
      };
    }
    if (flash === "miss") {
      return {
        [target]: {
          boxShadow: "inset 0 0 0 4px rgba(244,63,94,0.9)",
        },
      };
    }
    return undefined;
  }, [flash, target]);

  const nextTarget = useCallback(() => {
    setTarget(randomSquare());
    setMessage(null);
    setFlash(null);
  }, []);

  const onSquareClick = useCallback(
    (sq: string) => {
      if (sq === target) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
        setMessage(`Yes! That is ${target} 🎉`);
        setFlash("ok");
        window.setTimeout(nextTarget, 600);
      } else {
        setStreak(0);
        setMessage(`That was ${sq}. Find ${target.toUpperCase()}!`);
        setFlash("miss");
      }
    },
    [target, nextTarget],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,38vw)]">
      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <h1 className="font-display text-2xl font-bold text-slate-900">Square names trainer</h1>
        <p className="mt-1 font-body text-sm text-slate-600">
          Like Old School Chess&apos;s coordinate trainer—made simple for kids. Read the square name, tap it on
          the board.
        </p>
        <div className="mt-4 rounded-xl bg-gradient-to-r from-sky-100 to-indigo-100 p-4 text-center">
          <p className="font-body text-xs font-bold uppercase tracking-wide text-slate-600">Find this square</p>
          <p className="mt-1 font-display text-5xl font-bold text-slate-900">{target.toUpperCase()}</p>
        </div>
        {message ? <p className="mt-3 font-body text-sm font-semibold text-slate-800">{message}</p> : null}
        <div className="mt-4 flex gap-4 font-body text-sm">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span>
            Streak: <strong>{streak}</strong> 🔥
          </span>
        </div>
        <ul className="mt-4 space-y-1 font-body text-xs text-slate-600">
          <li>• Files are letters a–h (columns).</li>
          <li>• Ranks are numbers 1–8 (rows).</li>
          <li>• e4 is the center meeting square.</li>
        </ul>
      </section>
      <section className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
        <ChessboardPanel position="8/8/8/8/8/8/8/8 w - - 0 1" maxWidth={520} onSquareClick={onSquareClick} customSquareStyles={highlight} />
      </section>
    </div>
  );
}
