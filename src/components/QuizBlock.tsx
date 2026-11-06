import { useState } from "react";

type Props = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  compact?: boolean;
};

export function QuizBlock({
  question,
  options,
  correctIndex,
  explanation,
  compact = false,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === correctIndex;

  return (
    <div
      className={`rounded-lg border border-violet-300/60 bg-violet-50/80 ${
        compact ? "my-1 p-3" : "my-2 p-4"
      }`}
    >
      <p className="font-display text-sm font-semibold text-violet-900">Quick check ✨</p>
      <p className="mt-1 text-slate-800">{question}</p>
      <ul className={`mt-2 flex flex-col ${compact ? "gap-1" : "gap-1.5"}`}>
        {options.map((opt, i) => {
          let btnClass =
            "rounded-lg border px-3 py-2 text-left font-body text-sm font-semibold transition ";
          if (!answered) {
            btnClass += "border-violet-200 bg-white hover:border-violet-400 hover:bg-violet-100";
          } else if (i === correctIndex) {
            btnClass += "border-emerald-500 bg-emerald-100 text-emerald-900";
          } else if (i === selected) {
            btnClass += "border-rose-400 bg-rose-100 text-rose-900";
          } else {
            btnClass += "border-slate-200 bg-slate-50 text-slate-500";
          }
          return (
            <li key={opt}>
              <button
                type="button"
                disabled={answered}
                className={btnClass}
                onClick={() => setSelected(i)}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {answered ? (
        <p className={`mt-2 font-body text-xs ${correct ? "text-emerald-800" : "text-rose-800"}`}>
          {correct ? "Yes! 🎉 " : "Nice try! 💛 "}
          {explanation}
        </p>
      ) : null}
    </div>
  );
}
