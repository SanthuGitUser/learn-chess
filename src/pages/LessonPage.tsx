import { Link, useNavigate, useParams } from "react-router-dom";
import { getLesson, stages } from "@/data/curriculum";
import { LessonContent } from "@/components/LessonContent";
import { LessonBoard, splitLessonBlocks } from "@/components/LessonBoard";
import { PieceMovementLab } from "@/components/PieceMovementLab";
import { BoardStepPlayer } from "@/components/BoardStepPlayer";
import { getSequence } from "@/data/boardSequences";
import { useProgress } from "@/hooks/useProgress";
import type { DemoPieceKind } from "@/lib/pieceDemo";

const LESSON_DEFAULT_PIECE: Record<string, DemoPieceKind> = {
  "pawn-friends": "pawn",
  "rook-friends": "rook",
  "bishop-friends": "bishop",
  "knight-friends": "knight",
  "queen-king": "queen",
};

export function LessonPage() {
  const { stageId, lessonId } = useParams<{ stageId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { isComplete, markComplete } = useProgress();

  if (!stageId || !lessonId) {
    return <p className="font-body text-rose-600">Missing lesson.</p>;
  }

  const result = getLesson(stageId, lessonId);
  if (!result) {
    return (
      <div className="space-y-2">
        <p className="font-body text-rose-600">Lesson not found.</p>
        <Link to="/path" className="font-body text-sm font-bold text-sky-700">
          Back to path
        </Link>
      </div>
    );
  }

  const { stage, lesson } = result;
  const { main, boards, moveLab, boardSteps } = splitLessonBlocks(lesson.blocks);
  const stageLessons = stage.lessons;
  const index = stageLessons.findIndex((l) => l.id === lesson.id);
  const prev = index > 0 ? stageLessons[index - 1] : null;
  const next = index < stageLessons.length - 1 ? stageLessons[index + 1] : null;
  const nextStage =
    !next && stages.findIndex((s) => s.id === stage.id) < stages.length - 1
      ? stages[stages.findIndex((s) => s.id === stage.id) + 1]
      : null;
  const done = isComplete(stage.id, lesson.id);
  const showStaticBoards = boards.length > 0 && (!moveLab || lesson.id === "meet-the-team");
  const hasAside = showStaticBoards || moveLab !== null || boardSteps.length > 0;

  return (
    <article className="flex min-h-0 flex-col gap-2 lg:max-h-[calc(100dvh-3.75rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/80 px-2 py-1.5 ring-1 ring-slate-200/80 sm:px-3">
        <nav className="min-w-0 font-body text-xs text-slate-500">
          <Link to="/path" className="text-sky-700 hover:underline">
            Path
          </Link>
          <span> · </span>
          <span className="text-slate-700">
            {stage.emoji} {stage.title}
          </span>
        </nav>
        <div className="flex flex-wrap items-center gap-1.5">
          {prev ? (
            <button
              type="button"
              onClick={() => navigate(`/learn/${stage.id}/${prev.id}`)}
              className="rounded-lg bg-slate-100 px-2 py-1 font-body text-xs font-bold text-slate-800 hover:bg-slate-200"
            >
              ← Prev
            </button>
          ) : null}
          {next ? (
            <button
              type="button"
              onClick={() => navigate(`/learn/${stage.id}/${next.id}`)}
              className="rounded-lg bg-slate-100 px-2 py-1 font-body text-xs font-bold text-slate-800 hover:bg-slate-200"
            >
              Next →
            </button>
          ) : nextStage?.lessons[0] ? (
            <button
              type="button"
              onClick={() => navigate(`/learn/${nextStage.id}/${nextStage.lessons[0].id}`)}
              className="rounded-lg bg-slate-800 px-2 py-1 font-body text-xs font-bold text-white"
            >
              {nextStage.title} →
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => markComplete(stage.id, lesson.id)}
            disabled={done}
            className={`rounded-lg px-3 py-1 font-display text-xs font-bold sm:text-sm ${
              done
                ? "cursor-default bg-emerald-200 text-emerald-900"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            {done ? "Done ✓" : "Mark done 🎉"}
          </button>
        </div>
      </div>

      <div
        className={`min-h-0 flex-1 gap-3 ${
          hasAside
            ? "grid lg:grid-cols-[minmax(0,1fr)_minmax(240px,36vw)] lg:grid-rows-[auto_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(280px,34vw)]"
            : "flex flex-col"
        }`}
      >
        <header
          className={`rounded-xl bg-gradient-to-r ${stage.color} px-4 py-2.5 sm:py-3 ${
            hasAside ? "lg:col-span-1" : ""
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900 sm:text-2xl">
              <span>{lesson.emoji}</span>
              {lesson.title}
            </h1>
            <span className="font-body text-xs font-semibold text-slate-800/75">
              {stage.ageHint} · ~{lesson.minutes} min
            </span>
          </div>
          <p className="mt-0.5 font-body text-sm text-slate-900/85">{lesson.summary}</p>
        </header>

        {hasAside ? (
          <aside className="flex min-h-0 flex-col gap-2 overflow-y-auto lg:row-span-2 lg:row-start-1 lg:col-start-2 lg:max-h-[calc(100dvh-6rem)]">
            {moveLab ? (
              <div className="rounded-xl bg-gradient-to-b from-emerald-50 to-white p-2 shadow-sm ring-1 ring-emerald-200/80">
                <p className="mb-1.5 font-display text-xs font-bold uppercase tracking-wide text-emerald-800">
                  Try it — move paths
                </p>
                <PieceMovementLab
                  initialPiece={moveLab.piece ?? LESSON_DEFAULT_PIECE[lesson.id] ?? "pawn"}
                  allowPiecePicker={!moveLab.piece}
                  caption={moveLab.caption}
                  compact
                />
              </div>
            ) : null}
            {boardSteps.map((block, i) => {
              const seq = getSequence(block.sequenceId);
              if (!seq) return null;
              return (
                <div
                  key={`steps-${block.sequenceId}-${i}`}
                  className="rounded-xl bg-gradient-to-b from-indigo-50 to-white p-2 shadow-sm ring-1 ring-indigo-200/80"
                >
                  <p className="mb-1.5 font-display text-xs font-bold uppercase tracking-wide text-indigo-800">
                    ▶ {block.title ?? "Step-by-step board"}
                  </p>
                  <BoardStepPlayer sequence={seq} compact />
                </div>
              );
            })}
            {showStaticBoards ? (
              <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200/80">
                <p className="mb-1.5 font-display text-xs font-bold uppercase tracking-wide text-slate-500">
                  Picture on the board
                </p>
                <div className={`grid gap-2 ${boards.length > 1 ? "sm:grid-cols-2 lg:grid-cols-1" : ""}`}>
                  {boards.map((block, i) =>
                    block.type === "fen" ? (
                      <LessonBoard key={`board-${i}`} fen={block.fen} caption={block.caption} compact />
                    ) : null,
                  )}
                </div>
              </div>
            ) : null}
          </aside>
        ) : null}

        <div
          className={`min-h-0 overflow-y-auto rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100 sm:px-4 sm:py-3 ${
            hasAside ? "lg:col-start-1 lg:row-start-2" : "flex-1"
          }`}
        >
          <LessonContent blocks={main} dense />
        </div>
      </div>
    </article>
  );
}
