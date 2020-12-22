import * as React from "react";

import Cell from "../Cell";
import Block from "../Block";
import { T_Pos } from "./BoardTypes";
import { BitMaps, T_Piece } from "../Pieces";
import initBoard from "./initBoard";
import boardReducer, { addPiece, clearLine } from "./state";
import "./Board.css";

const Board: React.FC = () => {
  const [board, dispatch] = React.useReducer(boardReducer, initBoard());

  const checkForFilledLines = () => {
    const rows = new Array(board.length).fill(true);
    const cols = new Array(board.length).fill(true);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const piece = board[i][j];
        if (!piece.parentPiece) {
          rows[i] = false;
          cols[j] = false;
        }
      }
    }
    rows.forEach((rowFilled, i) => {
      if (rowFilled) {
        dispatch(clearLine("row", i));
      }
    });
    cols.forEach((colFilled, j) => {
      if (colFilled) {
        dispatch(clearLine("col", j));
      }
    });
  };

  React.useEffect(() => {
    checkForFilledLines();
  }, [board]);

  //TODO: this + addPiece is !DRY AKA WET
  const isValidPlacement = (pieceName: T_Piece, origin: T_Pos) => {
    const [originRow, originCol] = origin;
    const piece = BitMaps[pieceName];
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j]) {
          const originPiece = board[originRow + i]?.[originCol + j];
          if (!originPiece || originPiece.parentPiece) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const _addPiece = (pieceName: T_Piece, origin: T_Pos) => {
    if (!isValidPlacement(pieceName, origin)) {
      return;
    }
    const [originRow, originCol] = origin;
    const piece = BitMaps[pieceName];
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j]) {
          dispatch(addPiece(pieceName, [i + originRow, j + originCol]));
        }
      }
    }
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <Cell onClick={() => _addPiece("Square", cell.pos)} key={j}>
              {cell.parentPiece ? <Block piece={cell.parentPiece} /> : null}
            </Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
