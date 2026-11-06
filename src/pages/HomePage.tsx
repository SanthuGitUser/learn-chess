import { Link } from "react-router-dom";
import { stages } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";

export function HomePage() {
  const { isComplete } = useProgress();
  const littleStar = stages[0];
  const doneInStar = littleStar.lessons.filter((l) => isComplete(littleStar.id, l.id)).length;

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      <section className="rounded-2xl bg-gradient-to-br from-mentor-sun via-amber-200 to-orange-200 p-5 shadow-md lg:col-span-2 xl:col-span-2">
        <p className="font-display text-xs font-bold uppercase tracking-widest text-amber-900/80">
          Welcome, young champion
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Learn chess — step by step
        </h1>
        <p className="mt-2 font-body text-sm text-amber-950/90 sm:text-base">
          Friendly lessons for a 4-year-old, then a full path to tournament-level study. Read together and
          mark lessons done when ready.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/learn/${littleStar.id}/${littleStar.lessons[0].id}`}
            className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 font-display text-sm font-bold text-white no-underline hover:bg-slate-800"
          >
            Start {littleStar.emoji} {littleStar.title}
          </Link>
          <Link
            to="/library"
            className="inline-flex rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-2.5 font-display text-sm font-bold text-indigo-900 no-underline hover:bg-indigo-100"
          >
            Library 📚
          </Link>
          <Link
            to="/coordinates"
            className="inline-flex rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 font-display text-sm font-bold text-sky-900 no-underline hover:bg-sky-100"
          >
            Square trainer
          </Link>
          <Link
            to="/try"
            className="inline-flex rounded-xl border border-emerald-700/30 bg-emerald-50 px-4 py-2.5 font-display text-sm font-bold text-emerald-900 no-underline hover:bg-emerald-100"
          >
            Move lab ♟️
          </Link>
          <Link
            to="/path"
            className="inline-flex rounded-xl border border-slate-900/20 bg-white/80 px-4 py-2.5 font-display text-sm font-bold text-slate-900 no-underline hover:bg-white"
          >
            Full path
          </Link>
        </div>
        {doneInStar > 0 ? (
          <p className="mt-3 font-body text-xs font-semibold text-amber-900">
            Little Star: {doneInStar}/{littleStar.lessons.length} ⭐
          </p>
        ) : null}
      </section>

      <section className="rounded-2xl bg-slate-900 p-5 text-white lg:row-span-2 xl:row-span-1">
        <h2 className="font-display text-lg font-bold">Teaching a 4-year-old</h2>
        <ul className="mt-2 space-y-1 font-body text-sm text-slate-200">
          <li>• 5–10 minutes per session</li>
          <li>• Curiosity before perfect rules</li>
          <li>• Stories: King needs a castle</li>
          <li>• Celebrate tries, not just wins</li>
        </ul>
      </section>

      {[
        { icon: "📖", title: "Read & play", text: "Kid tips and parent coaching hints." },
        { icon: "♟️", title: "See the board", text: "Diagrams beside the lesson text." },
        { icon: "🛤️", title: "Grow over years", text: "Six stages to pro topics." },
      ].map((card) => (
        <div key={card.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <span className="text-2xl">{card.icon}</span>
          <h3 className="mt-2 font-display text-base font-bold text-slate-900">{card.title}</h3>
          <p className="mt-1 font-body text-sm text-slate-600">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
