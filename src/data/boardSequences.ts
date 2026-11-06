import { Chess, type Square } from "chess.js";

export type BoardStep = {
  fen: string;
  caption: string;
  arrows?: [Square, Square, string?][];
};

export type BoardSequence = {
  id: string;
  title: string;
  steps: BoardStep[];
  autoPlayMs?: number;
};

function stepsFromMoves(startFen: string, moves: string[], captions: string[]): BoardStep[] {
  const chess = new Chess(startFen);
  const steps: BoardStep[] = [{ fen: chess.fen(), caption: captions[0] ?? "Start" }];
  moves.forEach((san, i) => {
    chess.move(san);
    steps.push({ fen: chess.fen(), caption: captions[i + 1] ?? san });
  });
  return steps;
}

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const boardSequences: Record<string, BoardSequence> = {
  "castling-kingside": {
    id: "castling-kingside",
    title: "Kingside castling",
    autoPlayMs: 1400,
    steps: stepsFromMoves("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1", ["O-O"], [
      "King and kingside Rook are ready—no pieces between them.",
      "One move: King to g1, Rook to f1. The King hides behind pawns.",
    ]),
  },
  "castling-queenside": {
    id: "castling-queenside",
    title: "Queenside castling",
    autoPlayMs: 1400,
    steps: stepsFromMoves("r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1", ["O-O-O"], [
      "This time the King runs toward the a-side Rook.",
      "King on c1, Rook on d1—long castle!",
    ]),
  },
  "en-passant": {
    id: "en-passant",
    title: "En passant",
    autoPlayMs: 1600,
    steps: (() => {
      const c = new Chess(START);
      c.move("e4");
      c.move("h6");
      c.move("e5");
      c.move("f5");
      const before = c.fen();
      c.move("exf6");
      return [
        { fen: before, caption: "Black just jumped f7→f5 (two squares). White pawn on e5 is next door." },
        {
          fen: c.fen(),
          caption: "En passant! White captures on f6 as if the pawn only moved one step. Only legal immediately.",
          arrows: [["e5", "f6", "rgba(34, 197, 94, 0.9)"]],
        },
      ];
    })(),
  },
  "scholars-mate": {
    id: "scholars-mate",
    title: "Scholar's Mate",
    autoPlayMs: 1100,
    steps: stepsFromMoves(START, ["e4", "e5", "Qh5", "Nc6", "Bc4", "Nf6", "Qxf7#"], [
      "The game begins.",
      "White opens with e4.",
      "Black copies with e5.",
      "Queen to h5—eyes the weak f7 square!",
      "Black develops.",
      "Bishop joins the attack on f7.",
      "Black brings the Knight out…",
      "Checkmate! f7 falls. The King has no escape.",
    ]),
  },
  "stop-scholars": {
    id: "stop-scholars",
    title: "Stop Scholar's Mate",
    autoPlayMs: 1100,
    steps: stepsFromMoves(START, ["e4", "e5", "Qh5", "Nc6", "Bc4", "g6"], [
      "The same attack starts…",
      "Black blocks with g6!",
      "f7 is defended. Black is safe—keep developing and have fun.",
    ]),
  },
  "knight-fork": {
    id: "knight-fork",
    title: "Knight fork",
    autoPlayMs: 1500,
    steps: [
      {
        fen: "r5k1/8/8/8/8/2N5/8/4K3 w - - 0 1",
        caption: "White Knight on c3. Black King on g8, Rook on a8.",
      },
      {
        fen: "r5k1/2N5/8/8/8/8/8/4K3 w - - 0 1",
        caption: "Knight to c7—one hop attacks BOTH King and Rook!",
        arrows: [
          ["c7", "g8", "rgba(244, 63, 94, 0.85)"],
          ["c7", "a8", "rgba(244, 63, 94, 0.85)"],
        ],
      },
    ],
  },
  "bishop-pin": {
    id: "bishop-pin",
    title: "Pin",
    autoPlayMs: 1500,
    steps: [
      {
        fen: "4k3/5n2/8/8/2B5/8/8/4K3 w - - 0 1",
        caption: "White Bishop on c4 looks through the Knight on f7 at the King on e8.",
        arrows: [["c4", "e8", "rgba(168, 85, 247, 0.85)"]],
      },
      {
        fen: "4k3/5n2/8/8/2B5/8/8/4K3 w - - 0 1",
        caption: "The Knight is pinned—it cannot move without exposing the King.",
      },
    ],
  },
  "opening-develop": {
    id: "opening-develop",
    title: "Develop pieces (Italian start)",
    autoPlayMs: 1200,
    steps: stepsFromMoves(START, ["e4", "e5", "Nf3", "Nc6", "Bc4"], [
      "Take the center with e4.",
      "Black meets you.",
      "Knight out—controls the center.",
      "Black develops too.",
      "Bishop on c4—classic Italian Game. Castle soon!",
    ]),
  },
  "promotion-movie": {
    id: "promotion-movie",
    title: "Promotion",
    autoPlayMs: 1400,
    steps: stepsFromMoves("8/4P3/8/8/8/8/8/4K2k w - - 0 1", ["e8=Q+"], [
      "Pawn on e7 is one step from the back rank.",
      "Promote to Queen! (Almost always best.)",
    ]),
  },
  "back-rank-ladder": {
    id: "back-rank-ladder",
    title: "Two Rooks checkmate",
    autoPlayMs: 1300,
    steps: [
      {
        fen: "6k1/5ppp/8/8/8/8/8/5RRK w - - 0 1",
        caption: "Two White Rooks and King vs lonely Black King.",
      },
      {
        fen: "6k1/5ppp/8/8/8/8/7R/5R1K w - - 0 1",
        caption: "Rook checks on the back rank—the King must move.",
        arrows: [["h2", "h8", "rgba(34, 197, 94, 0.8)"]],
      },
      {
        fen: "6k1/5ppp/8/8/8/8/7R/5R1K b - - 0 1",
        caption: "Second Rook cuts off escape—repeat checks until checkmate.",
      },
    ],
  },
};

export function getSequence(id: string): BoardSequence | undefined {
  return boardSequences[id];
}

export function validateAllSequences(): string[] {
  const errors: string[] = [];
  for (const seq of Object.values(boardSequences)) {
    seq.steps.forEach((step, i) => {
      try {
        new Chess(step.fen);
      } catch (e) {
        errors.push(`${seq.id} step ${i}: ${(e as Error).message}`);
      }
    });
  }
  return errors;
}
