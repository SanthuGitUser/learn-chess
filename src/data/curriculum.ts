import type { DemoPieceKind } from "@/lib/pieceDemo";

export type LessonBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "kidTip"; text: string }
  | { type: "parentTip"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "rules"; items: { title: string; detail: string }[] }
  | { type: "quiz"; question: string; options: string[]; correctIndex: number; explanation: string }
  | { type: "fen"; fen: string; caption: string; arrows?: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "moveLab"; piece?: DemoPieceKind; caption?: string }
  | { type: "boardSteps"; sequenceId: string; title?: string };

export type Lesson = {
  id: string;
  title: string;
  emoji: string;
  minutes: number;
  summary: string;
  blocks: LessonBlock[];
};

export type Stage = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  ageHint: string;
  color: string;
  description: string;
  lessons: Lesson[];
};

export const stages: Stage[] = [
  {
    id: "little-star",
    title: "Little Star",
    subtitle: "First hello to chess",
    emoji: "⭐",
    ageHint: "Ages 3–5 (with a grown-up)",
    color: "from-mentor-sun to-amber-300",
    description:
      "Big colors, short stories, and one idea at a time. Perfect for a 4-year-old who loves games and stories.",
    lessons: [
      {
        id: "what-is-chess",
        title: "What Is Chess?",
        emoji: "🎲",
        minutes: 3,
        summary: "A two-player adventure on a checkerboard with special toy soldiers.",
        blocks: [
          { type: "kidTip", text: "Chess is a game where two friends take turns moving pieces on a square board. No running—just thinking!" },
          { type: "paragraph", text: "Chess is played by two people. One plays with the light army (White), one with the dark army (Black). You take turns—one move each, like saying \"your turn, my turn.\"" },
          { type: "heading", text: "What makes chess special" },
          { type: "steps", items: [
            "Every piece has its own way to move—like each toy has a special dance.",
            "There is no dice. You choose your move with your brain.",
            "The goal is to protect your King and catch the other King.",
          ]},
          { type: "parentTip", text: "At age 4, focus on fun and names—not winning. Play 5–10 minutes and stop while they still want more." },
          { type: "quiz", question: "How many players play one chess game?", options: ["One", "Two", "Four"], correctIndex: 1, explanation: "Chess is always two players: White and Black." },
        ],
      },
      {
        id: "the-board",
        title: "The Chess Board",
        emoji: "🏁",
        minutes: 4,
        summary: "64 squares in light and dark colors, like a colorful floor.",
        blocks: [
          { type: "paragraph", text: "The board has 8 rows and 8 columns—64 squares total. Squares alternate light and dark. When you set up the board, a light square goes on the right corner near each player (\"light on the right\")." },
          { type: "kidTip", text: "Count squares like steps: 1, 2, 3… up to 8! The board is your playground." },
          { type: "rules", items: [
            { title: "Files", detail: "Up-and-down columns are called files (a, b, c… h)." },
            { title: "Ranks", detail: "Side-to-side rows are ranks (1, 2, 3… 8)." },
            { title: "Square name", detail: "Each square has a letter + number, like e4—the meeting spot in the middle." },
          ]},
          { type: "parentTip", text: "Use snacks or stickers on squares to teach \"forward\" for each color. White moves toward higher numbers (rank 8); Black toward rank 1." },
          { type: "fen", fen: "8/8/8/8/8/8/8/8 w - - 0 1", caption: "Empty board—imagine your pieces standing here." },
        ],
      },
      {
        id: "meet-the-team",
        title: "Meet the Chess Team",
        emoji: "👋",
        minutes: 5,
        summary: "Each army has 16 helpers: 8 pawns and 8 special friends.",
        blocks: [
          { type: "paragraph", text: "Each side starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, and 8 Pawns." },
          { type: "steps", items: [
            "King 👑 — the boss you must keep safe",
            "Queen 👸 — super powerful",
            "Rooks 🏰 — castle towers that go straight",
            "Bishops 🎩 — diagonal sliders",
            "Knights 🐴 — jump in an L-shape",
            "Pawns 🌱 — little soldiers that march forward",
          ]},
          { type: "kidTip", text: "Give each piece a silly voice when it moves. The Knight says \"Hop hop!\"" },
          { type: "fen", fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", caption: "Starting position—everyone in their home row." },
          {
            type: "moveLab",
            caption: "Pick any piece and explore where it can go on an empty board.",
          },
          { type: "quiz", question: "Which piece is the most important to protect?", options: ["Queen", "King", "Pawn"], correctIndex: 1, explanation: "If the King is trapped, the game ends!" },
        ],
      },
      {
        id: "pawn-friends",
        title: "Pawns — Little Steps",
        emoji: "🌱",
        minutes: 5,
        summary: "Pawns move forward one step (sometimes two on their first move).",
        blocks: [
          { type: "paragraph", text: "Pawns move straight forward one square. On their very first move, a pawn may go one OR two squares forward. Pawns capture diagonally one square—not straight ahead." },
          { type: "kidTip", text: "Pawns are like ants marching. They only go forward, never backward!" },
          { type: "rules", items: [
            { title: "Move", detail: "Forward 1 (or 2 on first move only)." },
            { title: "Capture", detail: "Diagonal one square to eat an enemy piece." },
            { title: "Promotion (later)", detail: "If a pawn reaches the other end, it becomes a Queen—big upgrade!" },
          ]},
          { type: "parentTip", text: "Try \"Pawn races\" on an empty board: who gets a pawn to the other side first?" },
          { type: "fen", fen: "8/8/8/8/4P3/8/8/8 w - - 0 1", caption: "White pawn on e4—it marched forward." },
          {
            type: "moveLab",
            piece: "pawn",
            caption: "Try moving the pawn—toggle “First move” to see two steps from the start row.",
          },
        ],
      },
      {
        id: "rook-friends",
        title: "Rooks — Straight Lines",
        emoji: "🏰",
        minutes: 4,
        summary: "Rooks slide up, down, left, and right like a train on tracks.",
        blocks: [
          { type: "paragraph", text: "Rooks move any number of empty squares horizontally or vertically. They cannot jump over pieces." },
          { type: "kidTip", text: "The Rook is a train 🚂—choo choo along the lines!" },
          { type: "fen", fen: "8/8/8/8/8/3R4/8/8 w - - 0 1", caption: "On an empty board, the Rook on d3 can slide to any square on the d-file or the 3rd rank." },
          {
            type: "moveLab",
            piece: "rook",
            caption: "Lines show straight paths up, down, left, and right.",
          },
        ],
      },
      {
        id: "bishop-friends",
        title: "Bishops — Diagonal Slides",
        emoji: "🎩",
        minutes: 4,
        summary: "Bishops stay on one color their whole life—light or dark squares.",
        blocks: [
          { type: "paragraph", text: "Each Bishop moves diagonally any number of squares. One Bishop starts on light squares, one on dark—they never switch color." },
          { type: "kidTip", text: "Bishops slide on the color they were born on—like staying on the same colored carpet." },
          { type: "fen", fen: "8/8/8/8/3B4/8/8/8 w - - 0 1", caption: "Bishop on d4 controls long diagonals." },
          {
            type: "moveLab",
            piece: "bishop",
            caption: "The bishop stays on the same color squares—watch the diagonal lines.",
          },
        ],
      },
      {
        id: "knight-friends",
        title: "Knights — Hop Hop!",
        emoji: "🐴",
        minutes: 5,
        summary: "Knights jump in an L: two steps, then one sideways.",
        blocks: [
          { type: "paragraph", text: "Knights move in an L-shape: two squares in one direction, then one square perpendicular. Knights are the only pieces that can jump over others." },
          { type: "kidTip", text: "Draw an L in the air: down-down-side! The Knight is the only jumper." },
          { type: "parentTip", text: "Place a Knight in the center and count all the squares it can hop to—that's a fun counting game." },
          { type: "fen", fen: "8/8/8/8/3N4/8/8/8 w - - 0 1", caption: "Knight on d4 has up to eight hop spots." },
          {
            type: "moveLab",
            piece: "knight",
            caption: "Green dots are L-shaped hops—the knight jumps over anything in the way.",
          },
        ],
      },
      {
        id: "queen-king",
        title: "Queen & King",
        emoji: "👑",
        minutes: 5,
        summary: "Queen combines Rook + Bishop power. King moves one careful step.",
        blocks: [
          { type: "rules", items: [
            { title: "Queen", detail: "Moves any number of squares: straight or diagonal—the strongest piece." },
            { title: "King", detail: "Moves one square in any direction. Must stay safe!" },
          ]},
          { type: "kidTip", text: "The King is slow but important—like a turtle you guard with your whole team." },
          { type: "paragraph", text: "You never leave your King where it can be captured on the next turn. We'll learn \"check\" soon in the next stage!" },
          { type: "quiz", question: "How many squares can a King move at once (max)?", options: ["One", "Three", "Any number"], correctIndex: 0, explanation: "The King takes one step at a time in any direction." },
          {
            type: "moveLab",
            caption: "Switch between Queen and King with the buttons—compare one step vs many lines.",
          },
        ],
      },
      {
        id: "taking-turns",
        title: "Taking Turns & Gentle Rules",
        emoji: "🤝",
        minutes: 4,
        summary: "White moves first, then Black, then White again…",
        blocks: [
          { type: "steps", items: [
            "White always moves first.",
            "One move per turn—move one piece (except special rules you'll learn later).",
            "You may not skip your turn.",
            "If you touch a piece, tournament rules say you must move it—but at home, be kind and flexible with kids.",
          ]},
          { type: "parentTip", text: "Use a \"move bell\" or funny phrase when switching turns. Celebrate good tries, not just captures." },
          { type: "checklist", items: [
            "Board set with light square on the right",
            "Pieces in starting places",
            "White moves first",
            "Hug when the game ends",
          ]},
        ],
      },
    ],
  },
  {
    id: "explorer",
    title: "Explorer",
    subtitle: "Full piece rules",
    emoji: "🧭",
    ageHint: "Ages 5–7",
    color: "from-mentor-mint to-emerald-400",
    description: "Complete movement rules, special moves, and the idea of check.",
    lessons: [
      {
        id: "check",
        title: "Check — Tag the King!",
        emoji: "⚠️",
        minutes: 6,
        summary: "When the King is attacked, it's check—you must stop it.",
        blocks: [
          { type: "paragraph", text: "Check means your King is under attack by an enemy piece. You must get out of check on your next move. You cannot make any other move while in check." },
          { type: "steps", items: [
            "Move the King to a safe square",
            "Block the attack with another piece",
            "Capture the attacking piece",
          ]},
          { type: "rules", items: [
            { title: "Illegal", detail: "You cannot move into check or leave your King in check." },
            { title: "Two checks", detail: "Double check: only moving the King works (can't block or capture both at once)." },
          ]},
          { type: "fen", fen: "4k3/8/8/8/8/8/8/4R2K b - - 0 1", caption: "Check! The White Rook on e1 attacks the Black King on e8 straight up the e-file. Black must move the King off the e-file (to d8, f8, d7 or f7) to escape." },
        ],
      },
      {
        id: "checkmate",
        title: "Checkmate — Game Over",
        emoji: "🏆",
        minutes: 6,
        summary: "Check with no escape—checkmate wins the game.",
        blocks: [
          { type: "paragraph", text: "Checkmate is check where the King has no legal way to escape. The game ends immediately. The player who checkmates wins; the King is never actually \"captured.\"" },
          { type: "kidTip", text: "Checkmate means the King says \"I'm stuck!\" and we start a new game." },
          { type: "fen", fen: "7k/6Q1/6K1/8/8/8/8/8 b - - 0 1", caption: "Checkmate! The White Queen on g7 attacks the Black King, and the White King on g6 protects her, so she can't be captured. Every escape square is covered." },
          { type: "quiz", question: "What happens when you're checkmated?", options: ["You lose", "You swap Kings", "Keep playing"], correctIndex: 0, explanation: "Checkmate ends the game—you lost that round. High five and play again!" },
        ],
      },
      {
        id: "stalemate-draw",
        title: "Stalemate & Draws",
        emoji: "🤝",
        minutes: 5,
        summary: "Not every game has a winner—sometimes it's a tie.",
        blocks: [
          { type: "paragraph", text: "Stalemate: it's your turn, you're not in check, but you have no legal moves—a draw. Other draws include agreement, insufficient material, threefold repetition, and the 50-move rule (tournament topics)." },
          { type: "rules", items: [
            { title: "Stalemate", detail: "No legal moves + not in check = draw." },
            { title: "Insufficient material", detail: "Example: King vs King—no one can mate." },
          ]},
          { type: "fen", fen: "7k/5Q2/6K1/8/8/8/8/8 b - - 0 1", caption: "Stalemate! It's Black's turn and the King on h8 is not in check, but g8, g7 and h7 are all covered, so Black has no legal move. The game is a draw, even though White has a Queen." },
          { type: "parentTip", text: "Kids often stalemate by accident when they're winning. Point out: always leave the enemy King at least one square until you can checkmate." },
        ],
      },
      {
        id: "castling",
        title: "Castling — King Hides with Rook",
        emoji: "🏰",
        minutes: 8,
        summary: "One special move: King and Rook move together for safety.",
        blocks: [
          { type: "paragraph", text: "Castling moves the King two squares toward a Rook, and that Rook jumps to the other side of the King. It's one move." },
          { type: "steps", items: [
            "Neither King nor that Rook has moved before",
            "No pieces between them",
            "King is not in check, does not pass through check, or land in check",
            "Kingside (short): O-O — Rook on h-file side",
            "Queenside (long): O-O-O — Rook on a-file side",
          ]},
          { type: "boardSteps", sequenceId: "castling-kingside", title: "Watch kingside castling" },
          { type: "boardSteps", sequenceId: "castling-queenside", title: "Watch queenside castling" },
        ],
      },
      {
        id: "en-passant",
        title: "En Passant",
        emoji: "🌬️",
        minutes: 5,
        summary: "A rare pawn capture when a pawn rushes past your pawn.",
        blocks: [
          { type: "paragraph", text: "If a pawn moves two squares forward from its start and lands beside your pawn, you may capture it as if it moved only one square—but only on the very next move." },
          { type: "parentTip", text: "Skip this with very young kids until pawn movement is solid. Introduce when they ask \"why didn't you capture?\"" },
          { type: "boardSteps", sequenceId: "en-passant", title: "En passant step-by-step" },
        ],
      },
      {
        id: "promotion",
        title: "Pawn Promotion",
        emoji: "✨",
        minutes: 5,
        summary: "A pawn that reaches the last rank becomes Queen (almost always).",
        blocks: [
          { type: "paragraph", text: "When a pawn reaches the opposite back rank, it promotes to Queen, Rook, Bishop, or Knight of the same color. Almost always choose Queen; underpromotion is a fun advanced trick." },
          { type: "fen", fen: "8/4P3/8/8/8/8/8/4K2k w - - 0 1", caption: "e7 pawn promotes next move—usually to Queen!" },
          { type: "boardSteps", sequenceId: "promotion-movie", title: "Watch promotion" },
        ],
      },
      {
        id: "illegal-moves",
        title: "Legal vs Illegal Moves",
        emoji: "📜",
        minutes: 5,
        summary: "Chess has rules the board enforces in apps; at home, learn together.",
        blocks: [
          { type: "checklist", items: [
            "Move only your own color on your turn",
            "Move pieces according to their rules",
            "Never leave your King in check",
            "Castle only when all conditions are met",
            "Promote pawns on the back rank",
          ]},
        ],
      },
    ],
  },
  {
    id: "knight-rank",
    title: "Knight Rank",
    subtitle: "Winning skills",
    emoji: "🛡️",
    ageHint: "Ages 7–10",
    color: "from-mentor-sky to-blue-400",
    description: "Checkmate patterns, piece values, and simple planning.",
    lessons: [
      {
        id: "piece-values",
        title: "Piece Values",
        emoji: "💎",
        minutes: 6,
        summary: "Points help you decide trades—Queen is worth most.",
        blocks: [
          { type: "rules", items: [
            { title: "Pawn", detail: "1 point" },
            { title: "Knight / Bishop", detail: "3 points each" },
            { title: "Rook", detail: "5 points" },
            { title: "Queen", detail: "9 points" },
            { title: "King", detail: "Priceless—protect it!" },
          ]},
          { type: "paragraph", text: "Trading Queen for a pawn is usually bad. Trading Bishop for Knight is often equal. Context matters—activity and King safety beat raw points." },
        ],
      },
      {
        id: "mate-patterns",
        title: "Basic Checkmate Patterns",
        emoji: "🎯",
        minutes: 10,
        summary: "Back-rank mate, Queen + King vs King, two Rooks ladder.",
        blocks: [
          { type: "steps", items: [
            "Queen + King vs lone King: drive King to edge, bring your King close, mate with Queen",
            "Two Rooks: \"ladder\" checks along ranks/files",
            "Back rank: Rook or Queen on the back rank when pawns trap the King",
          ]},
          { type: "fen", fen: "3R2k1/5ppp/8/8/8/8/8/6K1 b - - 0 1", caption: "Back-rank mate: the White Rook on d8 checks along the back row, and Black's own pawns on f7, g7, h7 block every escape." },
          { type: "boardSteps", sequenceId: "back-rank-ladder", title: "Two Rooks ladder (idea)" },
        ],
      },
      {
        id: "opening-basics",
        title: "Opening Goals",
        emoji: "🚀",
        minutes: 8,
        summary: "Control center, develop pieces, castle early, don't move Queen out too soon.",
        blocks: [
          { type: "checklist", items: [
            "Fight for center squares (e4, d4, e5, d5)",
            "Develop Knights and Bishops toward the center",
            "Castle to safety—usually by move 10 or sooner",
            "Connect Rooks on the back rank",
            "Don't bring Queen out too early—she can get chased",
          ]},
          { type: "paragraph", text: "Classic first moves: 1.e4, 1.d4, 1.Nf3. Respond with sensible development—not random pawn grabs." },
          { type: "boardSteps", sequenceId: "opening-develop", title: "Italian Game start (5 moves)" },
        ],
      },
      {
        id: "tactics-intro",
        title: "Tactics — Forks & Pins",
        emoji: "⚡",
        minutes: 10,
        summary: "One move, two problems: fork. Piece can't move: pin.",
        blocks: [
          { type: "rules", items: [
            { title: "Fork", detail: "One piece attacks two enemy pieces at once (Knight forks are famous)." },
            { title: "Pin", detail: "Piece can't move without exposing a more valuable piece behind it (Bishops and Rooks pin)." },
            { title: "Skewer", detail: "Attack valuable piece; when it moves, capture what's behind." },
          ]},
          { type: "parentTip", text: "Use puzzles 5 minutes a day—better than long games for improvement at this stage." },
          { type: "boardSteps", sequenceId: "knight-fork", title: "Knight fork animation" },
          { type: "boardSteps", sequenceId: "bishop-pin", title: "Pin animation" },
        ],
      },
      {
        id: "scholars-mate",
        title: "Scholar's Mate Trap",
        emoji: "🎓",
        minutes: 6,
        summary: "A four-move trick—and how to stop it.",
        blocks: [
          { type: "kidTip", text: "Some friends try a fast trick. If you block early, you are safe!" },
          { type: "paragraph", text: "Scholar's Mate tries to checkmate on f7 with Queen and Bishop. It's common among beginners." },
          { type: "boardSteps", sequenceId: "scholars-mate", title: "The trap (4 moves)" },
          { type: "boardSteps", sequenceId: "stop-scholars", title: "How to defend (…g6)" },
          { type: "quiz", question: "Best simple defense when White plays Qh5?", options: ["Ignore it", "Play g6", "Move your Queen to h5"], correctIndex: 1, explanation: "g6 guards f7 and kicks the Queen away." },
        ],
      },
    ],
  },
  {
    id: "champion",
    title: "Champion",
    subtitle: "Strategy & endgames",
    emoji: "🏅",
    ageHint: "Ages 10–14",
    color: "from-mentor-grape to-violet-400",
    description: "Plans, pawn structure, and must-know endgames.",
    lessons: [
      {
        id: "endgame-kpk",
        title: "King & Pawn vs King",
        emoji: "👣",
        minutes: 12,
        summary: "Opposition and the square rule decide many pawn races.",
        blocks: [
          { type: "paragraph", text: "Learn key ideas: King in front of pawn, opposition (Kings face each other with one square between), and converting extra pawn to Queen." },
          { type: "steps", items: [
            "Bring your King toward the pawn",
            "Take opposition when it helps",
            "Promote then checkmate with Queen + King",
          ]},
        ],
      },
      {
        id: "rook-endgames",
        title: "Rook Endgame Basics",
        emoji: "📏",
        minutes: 10,
        summary: "Rooks belong behind passed pawns; cut off the enemy King.",
        blocks: [
          { type: "paragraph", text: "Active Rook on open files, seventh rank invasion, and Lucena/Philidor ideas come later—start with \"Rook behind passing pawn\" rule." },
        ],
      },
      {
        id: "strategy",
        title: "Strategy — Weaknesses & Plans",
        emoji: "🗺️",
        minutes: 12,
        summary: "Target weak pawns, open lines for your pieces, improve worst piece.",
        blocks: [
          { type: "checklist", items: [
            "Identify weak squares and backward pawns",
            "Trade toward favorable endgames",
            "Improve your least active piece",
            "Prophylaxis: stop opponent's plan before yours",
          ]},
        ],
      },
      {
        id: "more-tactics",
        title: "Combinations & Motifs",
        emoji: "🔥",
        minutes: 12,
        summary: "Deflection, decoy, discovered attack, double check, clearance.",
        blocks: [
          { type: "rules", items: [
            { title: "Discovered attack", detail: "Move a piece to uncover another piece's line of attack." },
            { title: "Deflection", detail: "Lure a defender away from its job." },
            { title: "Double check", detail: "Two pieces check at once—only King can move." },
          ]},
        ],
      },
    ],
  },
  {
    id: "master",
    title: "Master Path",
    subtitle: "Serious study",
    emoji: "🎓",
    ageHint: "Teens & adults",
    color: "from-mentor-coral to-rose-400",
    description: "Openings repertoire, calculation, and tournament readiness.",
    lessons: [
      {
        id: "opening-repertoire",
        title: "Building a Repertoire",
        emoji: "📚",
        minutes: 15,
        summary: "Pick systems you understand—White and Black answers.",
        blocks: [
          { type: "paragraph", text: "Choose main openings (e.g. Italian Game, London System, Sicilian as Black) and learn ideas, not just memorized moves to move 20." },
          { type: "steps", items: [
            "Pick one opening as White and responses as Black",
            "Study model games from masters",
            "Review losses to find recurring mistakes",
          ]},
        ],
      },
      {
        id: "calculation",
        title: "Calculation & Candidate Moves",
        emoji: "🧠",
        minutes: 15,
        summary: "Find checks, captures, threats—then calculate forcing lines.",
        blocks: [
          { type: "steps", items: [
            "List candidate moves (checks, captures, threats first)",
            "Calculate forcing variations 3–5 moves deep",
            "Compare final positions—pick the best",
            "Blunder-check before moving",
          ]},
        ],
      },
      {
        id: "time-management",
        title: "Clocks & Time Management",
        emoji: "⏱️",
        minutes: 8,
        summary: "Use time on critical moves; know common controls.",
        blocks: [
          { type: "rules", items: [
            { title: "Blitz", detail: "Often 3+2 or 5+0 minutes—fast instincts." },
            { title: "Rapid", detail: "10–25 minutes—club standard." },
            { title: "Classical", detail: "90+ minutes—deep thinking." },
          ]},
          { type: "paragraph", text: "Increment (+2 or +3 seconds per move) rewards good moves under time pressure." },
        ],
      },
    ],
  },
  {
    id: "pro",
    title: "Pro Horizon",
    subtitle: "Competitive excellence",
    emoji: "🌍",
    ageHint: "Advanced / competitive",
    color: "from-slate-600 to-slate-800",
    description: "Rating systems, norms, psychology, and long-term improvement.",
    lessons: [
      {
        id: "rating-fide",
        title: "Ratings & Titles",
        emoji: "📈",
        minutes: 10,
        summary: "Elo ratings measure strength; FIDE titles from Candidate Master to GM.",
        blocks: [
          { type: "rules", items: [
            { title: "FIDE titles", detail: "CM, FM, IM, GM, WGM, etc.—norms + rating requirements." },
            { title: "Online ratings", detail: "Chess.com / Lichess ratings are great for practice—not identical to FIDE." },
          ]},
          { type: "paragraph", text: "Improvement is a marathon: tournaments, analysis, coaching, physical fitness, and sleep matter at high level." },
        ],
      },
      {
        id: "tournament-rules",
        title: "Tournament Rules & Etiquette",
        emoji: "⚖️",
        minutes: 12,
        summary: "Touch-move, writing moves, arbiter calls, fair play.",
        blocks: [
          { type: "checklist", items: [
            "Record moves (algebraic notation) when required",
            "Touch-move: if you touch a piece, you must move it if legal",
            "Offer draws properly; never distract opponents",
            "Call arbiter for disputes—never argue at the board",
            "Zero tolerance for cheating—engines banned in OTB play",
          ]},
        ],
      },
      {
        id: "training-plan",
        title: "Pro Training Process",
        emoji: "📋",
        minutes: 15,
        summary: "Daily mix: tactics, endgames, openings, games, review.",
        blocks: [
          { type: "steps", items: [
            "Tactics puzzles (30–60 min/day at serious level)",
            "Endgame theory weekly focus",
            "Opening maintenance + database review",
            "Play long games; analyze without engine first",
            "Coach or second for objective feedback",
            "Rest and sport—mental stamina is physical too",
          ]},
          { type: "parentTip", text: "For your 4-year-old today: joy first. This stage is the road ahead when they choose competition years later." },
        ],
      },
      {
        id: "psychology",
        title: "Psychology & Resilience",
        emoji: "💪",
        minutes: 10,
        summary: "Handle losses, time trouble, and tilt like a pro.",
        blocks: [
          { type: "paragraph", text: "Every master loses thousands of games. Process: breathe, learn one lesson per game, avoid rage quits. Build habits young—shaking hands and saying \"good game\" matters." },
        ],
      },
    ],
  },
];

export function getLesson(stageId: string, lessonId: string): { stage: Stage; lesson: Lesson } | null {
  const stage = stages.find((s) => s.id === stageId);
  if (!stage) return null;
  const lesson = stage.lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  return { stage, lesson };
}

export function allLessonsFlat(): { stage: Stage; lesson: Lesson }[] {
  return stages.flatMap((stage) => stage.lessons.map((lesson) => ({ stage, lesson })));
}
