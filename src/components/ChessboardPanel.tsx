import { Chessboard } from "react-chessboard";
import type { Arrow, CustomSquareStyles } from "react-chessboard/dist/chessboard/types";
import { useId, useMemo } from "react";
import { useContainerWidth } from "@/hooks/useContainerWidth";

type Props = {
  position: string;
  maxWidth?: number;
  boardOrientation?: "white" | "black";
  customSquareStyles?: CustomSquareStyles;
  customArrows?: Arrow[];
  onSquareClick?: (square: import("react-chessboard/dist/chessboard/types").Square) => void;
  onPieceClick?: (piece: string, square: import("react-chessboard/dist/chessboard/types").Square) => void;
  showNotation?: boolean;
};

const boardColors = {
  customDarkSquareStyle: { backgroundColor: "#b58863" },
  customLightSquareStyle: { backgroundColor: "#f0d9b5" },
};

export function ChessboardPanel({
  position,
  maxWidth = 420,
  boardOrientation = "white",
  customSquareStyles,
  customArrows,
  onSquareClick,
  onPieceClick,
  showNotation = true,
}: Props) {
  const instanceId = useId().replace(/:/g, "");
  const { ref, width } = useContainerWidth(280);
  const boardWidth = Math.max(160, Math.min(width, maxWidth));

  const remountKey = useMemo(
    () => `${boardOrientation}-${position}-${boardWidth}`,
    [boardOrientation, position, boardWidth],
  );

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative mx-auto isolate overflow-hidden rounded-lg bg-board-light"
        style={{ width: boardWidth, height: boardWidth }}
      >
        <Chessboard
          id={instanceId}
          key={remountKey}
          position={position}
          boardWidth={boardWidth}
          boardOrientation={boardOrientation}
          animationDuration={0}
          arePiecesDraggable={false}
          areArrowsAllowed={false}
          showBoardNotation={showNotation}
          customSquareStyles={customSquareStyles}
          customArrows={customArrows}
          onSquareClick={onSquareClick}
          onPieceClick={onPieceClick}
          customBoardStyle={{ borderRadius: "0.5rem" }}
          {...boardColors}
        />
      </div>
    </div>
  );
}
