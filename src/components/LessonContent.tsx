import type { LessonBlock } from "@/data/curriculum";
import { LessonBoard } from "./LessonBoard";
import { QuizBlock } from "./QuizBlock";

type Props = {
  blocks: LessonBlock[];
  dense?: boolean;
};

export function LessonContent({ blocks, dense = false }: Props) {
  const gap = dense ? "space-y-1.5" : "space-y-2";
  const text = dense ? "text-sm leading-snug md:text-[0.9375rem]" : "text-sm leading-relaxed md:text-base";

  return (
    <div className={`${gap} font-body text-slate-800 ${text}`}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "heading":
            return (
              <h3 key={key} className="pt-1 font-display text-base font-bold text-slate-900 md:text-lg">
                {block.text}
              </h3>
            );
          case "paragraph":
            return <p key={key}>{block.text}</p>;
          case "kidTip":
            return (
              <div
                key={key}
                className="rounded-lg border border-amber-300/80 bg-amber-50/90 px-3 py-2"
              >
                <p className="font-display text-[0.65rem] font-bold uppercase tracking-wide text-amber-800">
                  For little learners 🌟
                </p>
                <p className="mt-0.5 text-amber-950">{block.text}</p>
              </div>
            );
          case "parentTip":
            return (
              <div key={key} className="rounded-lg border border-sky-300/80 bg-sky-50/90 px-3 py-2">
                <p className="font-display text-[0.65rem] font-bold uppercase tracking-wide text-sky-800">
                  Grown-up tip 💡
                </p>
                <p className="mt-0.5 text-sky-950">{block.text}</p>
              </div>
            );
          case "steps":
            return (
              <ol key={key} className="ml-4 list-decimal space-y-0.5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "rules":
            return (
              <dl key={key} className="grid gap-1.5 sm:grid-cols-2">
                {block.items.map((item) => (
                  <div key={item.title} className="rounded-md bg-slate-50 px-2.5 py-2 ring-1 ring-slate-200/80">
                    <dt className="font-display text-sm font-bold text-slate-900">{item.title}</dt>
                    <dd className="mt-0.5 text-slate-700">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            );
          case "checklist":
            return (
              <ul key={key} className="columns-1 gap-x-6 sm:columns-2">
                {block.items.map((item) => (
                  <li key={item} className="mb-0.5 flex gap-1.5 break-inside-avoid">
                    <span aria-hidden className="shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "quiz":
            return (
              <QuizBlock
                key={key}
                question={block.question}
                options={block.options}
                correctIndex={block.correctIndex}
                explanation={block.explanation}
                compact={dense}
              />
            );
          case "fen":
            return (
              <LessonBoard key={key} fen={block.fen} caption={block.caption} compact={dense} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
