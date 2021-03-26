import * as React from "react";

import { T_Pos } from "./BoardTypes";
import { T_BitMap, PiecePreview } from "../Pieces";
import initBoard from "./initBoard";
import boardReducer, { addPiece, clearRow, clearCol } from "./state";
import { T_PieceData, usePieceQueue } from "../../game";
import "./Board.css";
import renderBoard from "./renderBoard";

type T_BoardContext = {
  playPiece?: (o: T_Pos, p: T_PieceData, i: number) => void;
};

const BoardContext = React.createContext<T_BoardContext>({});

const Board: React.FC = () => {
  const [board, dispatch] = React.useReducer(boardReducer, initBoard());
  const [queue, next, removePiece] = usePieceQueue();

  //check for filled lines
  React.useEffect(() => {
    const rows = new Array(board.length).fill(true);
    const cols = new Array(board.length).fill(true);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = board[i][j];
        if (!cell.piece) {
          rows[i] = false;
          cols[j] = false;
        }
      }
    }
    rows.forEach((rowFilled, i) => {
      if (rowFilled) {
        dispatch(clearRow(i));
      }
    });
    cols.forEach((colFilled, j) => {
      if (colFilled) {
        dispatch(clearCol(j));
      }
    });
  }, [board]);

  //TODO: this + addPiece is !DRY AKA WET
  const isValidPlacement = (piece: T_BitMap, origin: T_Pos) => {
    const [originRow, originCol] = origin;
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j]) {
          const originPiece = board[originRow + i]?.[originCol + j];
          if (!originPiece || originPiece.piece) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const playPiece = (origin: T_Pos) => {
    const nextPiece = queue[queue.length - 1];
    const { bitmap } = nextPiece;
    if (!isValidPlacement(bitmap, origin)) {
      return;
    }
    const [originRow, originCol] = origin;
    for (let i = 0; i < bitmap.length; i++) {
      for (let j = 0; j < bitmap[i].length; j++) {
        if (bitmap[i][j]) {
          dispatch(addPiece(nextPiece.name, [i + originRow, j + originCol]));
        }
      }
    }
    next();
  };

  const playPieceDrop = (origin: T_Pos, piece: T_PieceData, index: number) => {
    const { bitmap, name } = piece;
    if (!isValidPlacement(bitmap, origin)) {
      return;
    }
    const [originRow, originCol] = origin;
    for (let i = 0; i < bitmap.length; i++) {
      for (let j = 0; j < bitmap[i].length; j++) {
        if (bitmap[i][j]) {
          dispatch(addPiece(name, [i + originRow, j + originCol]));
        }
      }
    }
    removePiece(index);
  };

  // const rQueue = [...queue].reverse();
  return (
    <BoardContext.Provider value={{ playPiece: playPieceDrop }}>
      <div className="board">
        <div>{renderBoard(board, playPiece)}</div>
        {queue && (
          <div className="piece-queue">
            <p>Current queue</p>
            <ul>
              {queue.map((p, i) => (
                <PiecePreview piece={p} key={i} index={i} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
export { BoardContext };
