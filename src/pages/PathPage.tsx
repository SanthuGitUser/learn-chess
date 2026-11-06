import { Link } from "react-router-dom";
import { stages } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";

export function PathPage() {
  const { isComplete } = useProgress();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Learning path</h1>
        <p className="mt-1 max-w-4xl font-body text-sm text-slate-600 sm:text-base">
          Six stages from first hello to competitive play. Start with{" "}
          <strong className="text-slate-800">Little Star</strong> with your child.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {stages.map((stage, stageIndex) => {
          const completed = stage.lessons.filter((l) => isComplete(stage.id, l.id)).length;
          const pct = Math.round((completed / stage.lessons.length) * 100);

          return (
            <article
              key={stage.id}
              className="flex min-h-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100"
            >
              <div className={`shrink-0 bg-gradient-to-r ${stage.color} px-4 py-3`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-body text-xs font-bold text-slate-800/80">
                      Stage {stageIndex + 1} · {stage.ageHint}
                    </p>
                    <h2 className="mt-0.5 flex items-center gap-1.5 font-display text-lg font-bold text-slate-900">
                      <span>{stage.emoji}</span>
                      {stage.title}
                    </h2>
                    <p className="font-body text-sm text-slate-800/90">{stage.subtitle}</p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-white/90 px-3 py-1 text-center shadow-sm">
                    <p className="font-display text-lg font-bold text-slate-900">{pct}%</p>
                    <p className="font-body text-[0.65rem] text-slate-600">
                      {completed}/{stage.lessons.length}
                    </p>
                  </div>
                </div>
                <p className="mt-2 font-body text-xs text-slate-900/85 line-clamp-2">{stage.description}</p>
              </div>

              <ul className="min-h-0 flex-1 divide-y divide-slate-100 overflow-y-auto px-2 sm:max-h-[22rem] xl:max-h-[18rem]">
                {stage.lessons.map((lesson, li) => (
                  <li key={lesson.id}>
                    <Link
                      to={`/learn/${stage.id}/${lesson.id}`}
                      className="flex items-center gap-2 py-2.5 no-underline transition hover:bg-slate-50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-base">
                        {lesson.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-bold text-slate-900">
                          {li + 1}. {lesson.title}
                          {isComplete(stage.id, lesson.id) ? (
                            <span className="ml-1 text-emerald-600">✓</span>
                          ) : null}
                        </p>
                        <p className="truncate font-body text-xs text-slate-500">{lesson.summary}</p>
                      </div>
                      <span className="shrink-0 font-body text-xs text-slate-400">{lesson.minutes}m</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
