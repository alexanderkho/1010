import * as React from "react";

import Cell from "../Cell";
import Block from "../Block";
import { T_Pos } from "./BoardTypes";
import { BitMaps, T_Piece, T_BitMap } from "../Pieces";
import initBoard from "./initBoard";
import boardReducer, { addPiece, clearRow, clearCol } from "./state";
import { usePieceQueue } from "../../game";
import "./Board.css";
import renderBoard from "./renderBoard";

const Board: React.FC = () => {
  const [board, dispatch] = React.useReducer(boardReducer, initBoard());
  const [queue, next] = usePieceQueue();

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

  return (
    <div className="board">
      {renderBoard(board, playPiece)}
      {queue && (
        <div>
          <p>Current queue</p>
          <ul>
            {queue.map((p, i) => (
              <li key={i}>
                <span className={i === queue.length - 1 ? "active" : ""}>
                  {JSON.stringify(p)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Board;
