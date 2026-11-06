import type { LessonBlock } from "@/data/curriculum";
import { ChessboardPanel } from "./ChessboardPanel";
import { useMemo } from "react";

type Props = {
  fen: string;
  caption?: string;
  compact?: boolean;
};

export function LessonBoard({ fen, caption, compact = false }: Props) {
  const position = useMemo(() => fen, [fen]);

  return (
    <figure className={`flex flex-col gap-1.5 ${compact ? "my-0" : "my-2"}`}>
      <ChessboardPanel position={position} maxWidth={compact ? 380 : 480} />
      {caption ? (
        <figcaption className="font-body text-xs leading-snug text-slate-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function splitLessonBlocks(blocks: LessonBlock[]) {
  const main: LessonBlock[] = [];
  const boards: LessonBlock[] = [];
  let moveLab: Extract<LessonBlock, { type: "moveLab" }> | null = null;
  const boardSteps: Extract<LessonBlock, { type: "boardSteps" }>[] = [];
  for (const block of blocks) {
    if (block.type === "fen") boards.push(block);
    else if (block.type === "moveLab") {
      if (!moveLab) moveLab = block;
    } else if (block.type === "boardSteps") {
      boardSteps.push(block);
    } else main.push(block);
  }
  return { main, boards, moveLab, boardSteps };
}
