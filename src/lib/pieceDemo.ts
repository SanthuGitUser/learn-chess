import { Chess, type Color, type Square } from "chess.js";

export type DemoPieceKind = "pawn" | "rook" | "bishop" | "knight" | "queen" | "king";

export const PIECE_OPTIONS: {
  kind: DemoPieceKind;
  label: string;
  emoji: string;
  chess: "p" | "r" | "b" | "n" | "q" | "k";
}[] = [
  { kind: "pawn", label: "Pawn", emoji: "🌱", chess: "p" },
  { kind: "rook", label: "Rook", emoji: "🏰", chess: "r" },
  { kind: "bishop", label: "Bishop", emoji: "🎩", chess: "b" },
  { kind: "knight", label: "Knight", emoji: "🐴", chess: "n" },
  { kind: "queen", label: "Queen", emoji: "👸", chess: "q" },
  { kind: "king", label: "King", emoji: "👑", chess: "k" },
];

export function defaultSquare(kind: DemoPieceKind, color: Color): Square {
  if (kind === "pawn") return color === "w" ? "e2" : "e7";
  return "d4";
}

type BuildOptions = {
  color: Color;
  square: Square;
  pawnOnStartRank?: boolean;
  showCaptureTargets?: boolean;
};

export function buildDemoFen(kind: DemoPieceKind, options: BuildOptions): string {
  const chess = new Chess();
  chess.clear();

  const meta = PIECE_OPTIONS.find((p) => p.kind === kind)!;
  let square = options.square;

  if (kind === "pawn" && options.pawnOnStartRank) {
    square = options.color === "w" ? "e2" : "e7";
  }

  chess.put({ type: meta.chess, color: options.color }, square);

  ensureKingsForDemo(chess, options.color, kind, square);

  if (options.showCaptureTargets) {
    addCaptureTargets(chess, kind, square, options.color);
  }

  return withTurn(chess.fen(), options.color);
}

/** The demo piece's army must be the side to move, or chess.js reports no legal moves. */
function withTurn(fen: string, color: Color): string {
  const parts = fen.split(" ");
  parts[1] = color;
  parts[2] = "-";
  parts[3] = "-";
  return parts.join(" ");
}

function tryLoad(fen: string): Chess | null {
  try {
    return new Chess(fen);
  } catch {
    return null;
  }
}

const WHITE_KING_HOME: Square[] = ["h1", "a1", "h3", "a3", "e1"];
const BLACK_KING_HOME: Square[] = ["a8", "h8", "a6", "h6", "e8"];

/** chess.js 1.x requires both kings in any loadable FEN. */
function ensureKingsForDemo(
  chess: Chess,
  demoColor: Color,
  demoKind: DemoPieceKind,
  demoSquare: Square,
) {
  const demoIsWhiteKing = demoColor === "w" && demoKind === "king";
  const demoIsBlackKing = demoColor === "b" && demoKind === "king";

  if (!demoIsWhiteKing) {
    placeKing(chess, "w", WHITE_KING_HOME, demoSquare);
  }
  if (!demoIsBlackKing) {
    placeKing(chess, "b", BLACK_KING_HOME, demoSquare);
  }
}

function placeKing(chess: Chess, color: Color, candidates: Square[], avoid: Square) {
  for (const sq of candidates) {
    if (sq === avoid) continue;
    if (!chess.get(sq)) {
      chess.put({ type: "k", color }, sq);
      return;
    }
  }
}

function captureCandidates(chess: Chess, kind: DemoPieceKind, from: Square, color: Color): Square[] {
  if (kind === "pawn") {
    const file = from.charCodeAt(0);
    const capRank = Number(from[1]) + (color === "w" ? 1 : -1);
    if (capRank < 1 || capRank > 8) return [];
    return [file - 1, file + 1]
      .filter((f) => f >= 97 && f <= 104)
      .map((f) => `${String.fromCharCode(f)}${capRank}` as Square);
  }

  const probe = tryLoad(withTurn(chess.fen(), color));
  if (!probe) return [];
  const moves = probe.moves({ square: from, verbose: true });

  if (kind === "knight") {
    return moves.filter((_, i) => i % 2 === 0).slice(0, 3).map((m) => m.to);
  }
  if (kind === "king") {
    return moves.filter((_, i) => i % 3 === 0).slice(0, 2).map((m) => m.to);
  }

  // Sliders: put a target at the far end of each ray so the full path stays visible.
  const farthest = new Map<string, { to: Square; dist: number }>();
  for (const m of moves) {
    const df = Math.sign(m.to.charCodeAt(0) - from.charCodeAt(0));
    const dr = Math.sign(Number(m.to[1]) - Number(from[1]));
    const dist = Math.max(
      Math.abs(m.to.charCodeAt(0) - from.charCodeAt(0)),
      Math.abs(Number(m.to[1]) - Number(from[1])),
    );
    const key = `${df},${dr}`;
    const current = farthest.get(key);
    if (!current || dist > current.dist) farthest.set(key, { to: m.to, dist });
  }
  return [...farthest.values()].slice(0, 4).map((v) => v.to);
}

function addCaptureTargets(chess: Chess, kind: DemoPieceKind, from: Square, color: Color) {
  const enemy: Color = color === "w" ? "b" : "w";

  for (const target of captureCandidates(chess, kind, from, color)) {
    if (chess.get(target)) continue;
    // Pawns guard the fewest squares, so they keep the king's moves visible; they can't stand on rank 1 or 8.
    const onEdgeRank = target[1] === "1" || target[1] === "8";
    const type = kind === "king" && !onEdgeRank ? "p" : "n";
    chess.put({ type, color: enemy }, target);
    const test = tryLoad(withTurn(chess.fen(), color));
    if (!test || test.inCheck()) chess.remove(target);
  }
}

export type MovementPreview = {
  from: Square;
  quiet: Square[];
  capture: Square[];
  arrows: [Square, Square, string?][];
};

const SLIDERS = new Set(["r", "b", "q"]);

export function getMovementPreview(fen: string, from: Square): MovementPreview | null {
  let chess: Chess;
  try {
    chess = new Chess(fen);
  } catch {
    return null;
  }
  const piece = chess.get(from);
  if (!piece) return null;

  const moves = chess.moves({ square: from, verbose: true });
  const quiet: Square[] = [];
  const capture: Square[] = [];
  const arrows: [Square, Square, string?][] = [];
  const arrowColor = "rgba(34, 197, 94, 0.75)";

  for (const m of moves) {
    if (m.captured) capture.push(m.to);
    else quiet.push(m.to);

    const isSlider = SLIDERS.has(piece.type);
    const sameFile = m.from[0] === m.to[0];
    const sameRank = m.from[1] === m.to[1];
    const diagonal =
      Math.abs(m.from.charCodeAt(0) - m.to.charCodeAt(0)) ===
      Math.abs(Number(m.from[1]) - Number(m.to[1]));

    if (isSlider && (sameFile || sameRank || diagonal)) {
      arrows.push([m.from, m.to, arrowColor]);
    } else if (piece.type === "n" || piece.type === "k") {
      arrows.push([m.from, m.to, "rgba(59, 130, 246, 0.7)"]);
    } else if (piece.type === "p" && m.captured) {
      arrows.push([m.from, m.to, "rgba(244, 63, 94, 0.75)"]);
    }
  }

  return { from, quiet, capture, arrows };
}

export type SquareStyleMap = Record<string, Record<string, string | number>>;

export function squareStylesForPreviewPlain(
  preview: MovementPreview | null,
  selected: Square | null,
): SquareStyleMap {
  const styles: SquareStyleMap = {};

  if (selected) {
    styles[selected] = {
      boxShadow: "inset 0 0 0 4px rgba(250, 204, 21, 0.95)",
    };
  }

  if (!preview) return styles;

  for (const sq of preview.quiet) {
    styles[sq] = {
      background: "radial-gradient(circle, rgba(22, 163, 74, 0.85) 22%, transparent 24%)",
    };
  }
  for (const sq of preview.capture) {
    styles[sq] = {
      background: "radial-gradient(circle, transparent 58%, rgba(225, 29, 72, 0.85) 60%)",
      boxShadow: "inset 0 0 0 3px rgba(225, 29, 72, 0.9)",
    };
  }

  return styles;
}
