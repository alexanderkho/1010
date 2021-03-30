import { useReducer, useEffect } from "react";

import { Piece } from "./Piece";
import { T_Pos } from "./BoardTypes";
import {
  T_GameState,
  initialState,
  boardReducer,
  resetQueue,
  clearRow,
  clearCol,
  addPiece,
} from "./gameReducer";

/**
 * Returns Board and a function to add a piece to board
 */
const useGameState = (): [T_GameState, (i: number, o: T_Pos) => void] => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const { board, queue } = state;

  //check for empty queue
  useEffect(() => {
    if (!queue.length) {
      dispatch(resetQueue());
    }
  }, [queue]);

  //check for filled rows/cols
  useEffect(() => {
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

  const isValidPlacement = (piece: Piece, origin: T_Pos) => {
    const { bitmap } = piece;
    const [originRow, originCol] = origin;
    for (let i = 0; i < bitmap.length; i++) {
      for (let j = 0; j < bitmap[i].length; j++) {
        if (bitmap[i][j]) {
          const originPiece = board[originRow + i]?.[originCol + j];
          if (!originPiece || originPiece.piece) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const playPiece = (index: number, origin: T_Pos): void => {
    const piece = queue[index];
    if (!isValidPlacement(piece, origin)) return;

    dispatch(addPiece(index, origin, piece));
  };

  return [state, playPiece];
};

export default useGameState;
