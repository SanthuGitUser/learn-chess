import { Link, Outlet, useLocation } from "react-router-dom";
import { stages } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";

export function Layout() {
  const { pathname } = useLocation();
  const { completedCount, resetProgress } = useProgress();
  const totalLessons = stages.reduce((n, s) => n + s.lessons.length, 0);
  const isLesson = pathname.startsWith("/learn/");
  const isPath = pathname.startsWith("/path");
  const isTry = pathname.startsWith("/try");
  const isLibrary = pathname.startsWith("/library") || pathname.startsWith("/coordinates");

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-sky-100 via-white to-emerald-50/80">
      <header className="shrink-0 border-b border-sky-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[100rem] flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-5">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl" aria-hidden>
              ♔
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-tight text-slate-900">Chess Mentor</p>
              {!isLesson ? (
                <p className="font-body text-[0.65rem] text-slate-500">Learn from first steps to pro</p>
              ) : null}
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-body text-xs font-semibold text-emerald-800">
              {completedCount}/{totalLessons}
            </span>
            <nav className="flex gap-1.5">
              <Link
                to="/"
                className={`rounded-full px-3 py-1.5 font-body text-xs font-bold no-underline sm:text-sm ${
                  pathname === "/"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Home
              </Link>
              <Link
                to="/try"
                className={`rounded-full px-3 py-1.5 font-body text-xs font-bold no-underline sm:text-sm ${
                  isTry
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                }`}
              >
                Move lab
              </Link>
              <Link
                to="/library"
                className={`hidden rounded-full px-3 py-1.5 font-body text-xs font-bold no-underline sm:inline sm:text-sm ${
                  isLibrary
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
                }`}
              >
                Library
              </Link>
              <Link
                to="/path"
                className={`rounded-full px-3 py-1.5 font-body text-xs font-bold no-underline sm:text-sm ${
                  isPath || isLesson
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Learning path
              </Link>
            </nav>
            {!isLesson ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Reset all lesson progress on this device?")) resetProgress();
                }}
                className="rounded-full border border-slate-300 px-2 py-1 font-body text-[0.65rem] text-slate-600 hover:bg-slate-50 sm:text-xs"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>
      </header>
      <main
        className={`mx-auto w-full max-w-[100rem] flex-1 px-3 sm:px-5 ${
          isLesson ? "py-2" : "py-4 sm:py-6"
        }`}
      >
        <Outlet />
      </main>
      {!isLesson ? (
        <footer className="shrink-0 border-t border-slate-200 py-3 text-center font-body text-xs text-slate-500">
          Made for curious kids and patient parents.
        </footer>
      ) : null}
    </div>
  );
}
