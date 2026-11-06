import { PieceMovementLab } from "@/components/PieceMovementLab";

export function PracticePage() {
  return (
    <div className="flex min-h-0 flex-col gap-3 lg:max-h-[calc(100dvh-3.75rem)] lg:flex-row">
      <section className="min-w-0 flex-1 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 lg:overflow-y-auto">
        <h1 className="font-display text-2xl font-bold text-slate-900">Piece move lab</h1>
        <p className="mt-1 font-body text-sm text-slate-600">
          Choose a piece, tap the board to place it somewhere new, and see every square it can reach. Green
          dots are moves, red is capture, lines show sliding paths.
        </p>
        <ul className="mt-3 grid gap-2 font-body text-sm text-slate-700 sm:grid-cols-2">
          <li>
            <strong>Rook / Bishop / Queen</strong> — lines run until the edge (or a blocker).
          </li>
          <li>
            <strong>Knight</strong> — hop dots in an L; can jump over pieces.
          </li>
          <li>
            <strong>King</strong> — one step in any direction.
          </li>
          <li>
            <strong>Pawn</strong> — forward; turn on “First move” or “Capture dots” to learn more.
          </li>
        </ul>
      </section>
      <section className="w-full shrink-0 rounded-2xl bg-gradient-to-b from-emerald-50 to-white p-3 shadow-sm ring-1 ring-emerald-200/80 lg:w-[min(420px,38vw)]">
        <PieceMovementLab allowPiecePicker initialPiece="pawn" />
      </section>
    </div>
  );
}
