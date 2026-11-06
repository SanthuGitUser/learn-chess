import { Chess, type Square } from "chess.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChessboardPanel } from "@/components/ChessboardPanel";
import {
  buildDemoFen,
  defaultSquare,
  getMovementPreview,
  PIECE_OPTIONS,
  squareStylesForPreviewPlain,
  type DemoPieceKind,
} from "@/lib/pieceDemo";

type Props = {
  initialPiece?: DemoPieceKind;
  allowPiecePicker?: boolean;
  caption?: string;
  compact?: boolean;
};

export function PieceMovementLab({
  initialPiece = "pawn",
  allowPiecePicker = true,
  caption,
  compact = false,
}: Props) {
  const [kind, setKind] = useState<DemoPieceKind>(initialPiece);
  const [color, setColor] = useState<"w" | "b">("w");
  const [square, setSquare] = useState<Square>(() => defaultSquare(initialPiece, "w"));
  const [pawnStart, setPawnStart] = useState(true);
  const [showCaptures, setShowCaptures] = useState(false);

  useEffect(() => {
    setKind(initialPiece);
    setSquare(defaultSquare(initialPiece, color));
    setPawnStart(initialPiece === "pawn");
  }, [initialPiece, color]);

  const activeSquare = useMemo(() => {
    if (kind === "pawn" && pawnStart) return defaultSquare("pawn", color);
    return square;
  }, [kind, pawnStart, color, square]);

  const fen = useMemo(
    () =>
      buildDemoFen(kind, {
        color,
        square,
        pawnOnStartRank: kind === "pawn" && pawnStart,
        showCaptureTargets: showCaptures,
      }),
    [kind, color, square, pawnStart, showCaptures],
  );

  const preview = useMemo(() => getMovementPreview(fen, activeSquare), [fen, activeSquare]);

  const customSquareStyles = useMemo(
    () => squareStylesForPreviewPlain(preview, activeSquare),
    [preview, activeSquare],
  );

  const customArrows = preview?.arrows ?? [];
  const orientation = color === "w" ? "white" : "black";

  const pickKind = useCallback(
    (next: DemoPieceKind) => {
      setKind(next);
      setSquare(defaultSquare(next, color));
      setPawnStart(next === "pawn");
    },
    [color],
  );

  const switchColor = useCallback(
    (next: "w" | "b") => {
      setColor(next);
      setSquare(defaultSquare(kind, next));
      setPawnStart(kind === "pawn");
    },
    [kind],
  );

  const onSquareClick = useCallback(
    (sq: Square) => {
      let chess: Chess;
      try {
        chess = new Chess(fen);
      } catch {
        return;
      }
      const occupant = chess.get(sq);
      const meta = PIECE_OPTIONS.find((p) => p.kind === kind)!;

      if (sq === activeSquare) return;

      if (occupant && occupant.color === color && occupant.type === meta.chess) {
        return;
      }

      if (occupant?.type === "k") return;
      if (kind === "pawn" && (sq[1] === "1" || sq[1] === "8")) return;

      if (kind === "pawn" && pawnStart) setPawnStart(false);
      setSquare(sq);
    },
    [activeSquare, color, fen, kind, pawnStart],
  );

  const moveCount = (preview?.quiet.length ?? 0) + (preview?.capture.length ?? 0);

  return (
    <div className="flex flex-col gap-2">
      {allowPiecePicker ? (
        <div className="flex flex-wrap gap-1">
          {PIECE_OPTIONS.map((p) => (
            <button
              key={p.kind}
              type="button"
              onClick={() => pickKind(p.kind)}
              className={`rounded-lg px-2 py-1 font-body text-xs font-bold transition ${
                kind === p.kind
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              title={p.label}
            >
              {p.emoji} {compact ? "" : p.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 font-body text-xs text-slate-600">
        <span className="font-semibold text-slate-700">Army:</span>
        <button
          type="button"
          onClick={() => switchColor("w")}
          className={`rounded-md px-2 py-0.5 font-bold ${color === "w" ? "bg-white ring-2 ring-slate-400" : "bg-slate-100"}`}
        >
          White
        </button>
        <button
          type="button"
          onClick={() => switchColor("b")}
          className={`rounded-md px-2 py-0.5 font-bold ${color === "b" ? "bg-slate-800 text-white ring-2 ring-slate-400" : "bg-slate-100"}`}
        >
          Black
        </button>
        {kind === "pawn" ? (
          <label className="ml-1 flex cursor-pointer items-center gap-1">
            <input
              type="checkbox"
              checked={pawnStart}
              onChange={(e) => {
                setPawnStart(e.target.checked);
                if (e.target.checked) setSquare(defaultSquare("pawn", color));
              }}
              className="rounded"
            />
            First move (2 steps)
          </label>
        ) : null}
        <label className="flex cursor-pointer items-center gap-1">
          <input
            type="checkbox"
            checked={showCaptures}
            onChange={(e) => setShowCaptures(e.target.checked)}
            className="rounded"
          />
          Show captures (adds enemy pieces)
        </label>
      </div>

      <p className="font-body text-xs leading-snug text-slate-600">
        Tap the piece or another square to <strong>move it</strong>. Green dots = it can go there. Red =
        capture. Lines show the path.
        {moveCount > 0 ? (
          <span className="ml-1 font-semibold text-emerald-700">({moveCount} squares)</span>
        ) : null}
      </p>

      <ChessboardPanel
        position={fen}
        maxWidth={compact ? 400 : 520}
        boardOrientation={orientation}
        customSquareStyles={customSquareStyles}
        customArrows={customArrows}
        onSquareClick={(sq) => onSquareClick(sq as Square)}
        onPieceClick={(piece, sq) => {
          if (piece[0] === color) onSquareClick(sq as Square);
        }}
      />

      {caption ? <p className="font-body text-xs text-slate-500">{caption}</p> : null}

      <div className="flex flex-wrap gap-3 font-body text-[0.65rem] text-slate-500">
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Can move
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-500" />
          Can capture
        </span>
        <span>
          <span className="mr-1 inline-block h-2 w-2 rounded-sm bg-amber-400" />
          Piece here
        </span>
      </div>
    </div>
  );
}
