import { useCallback, useEffect, useMemo, useState } from "react";
import type { BoardSequence, BoardStep } from "@/data/boardSequences";
import { ChessboardPanel } from "@/components/ChessboardPanel";

type Props = {
  sequence: BoardSequence;
  compact?: boolean;
};

export function BoardStepPlayer({ sequence, compact = false }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const step: BoardStep = sequence.steps[index] ?? sequence.steps[0];
  const ms = sequence.autoPlayMs ?? 1500;

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(sequence.steps.length - 1, next)));
    },
    [sequence.steps.length],
  );

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [sequence.id]);

  useEffect(() => {
    if (!playing) return;
    if (index >= sequence.steps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => go(index + 1), ms);
    return () => clearTimeout(t);
  }, [playing, index, ms, go, sequence.steps.length]);

  const progress = useMemo(
    () => ((index + 1) / sequence.steps.length) * 100,
    [index, sequence.steps.length],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-xs font-bold text-slate-700">{sequence.title}</p>
        <span className="font-body text-[0.65rem] text-slate-500">
          Step {index + 1}/{sequence.steps.length}
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <ChessboardPanel
        position={step.fen}
        maxWidth={compact ? 400 : 480}
        customArrows={step.arrows}
      />

      <p className="min-h-[2.5rem] font-body text-xs leading-snug text-slate-700">{step.caption}</p>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="rounded-lg bg-slate-100 px-2 py-1 font-body text-xs font-bold disabled:opacity-40"
        >
          ◀ Prev
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="rounded-lg bg-emerald-600 px-3 py-1 font-body text-xs font-bold text-white"
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index >= sequence.steps.length - 1}
          className="rounded-lg bg-slate-100 px-2 py-1 font-body text-xs font-bold disabled:opacity-40"
        >
          Next ▶
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setPlaying(true);
          }}
          className="rounded-lg border border-slate-300 px-2 py-1 font-body text-xs font-bold text-slate-600"
        >
          ↺ Replay
        </button>
      </div>
    </div>
  );
}
