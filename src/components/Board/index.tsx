import * as React from "react";

import Cell from "../Cell";
import Block from "../Block";
import { T_Board, T_Cell, T_Row, T_Pos } from "./BoardTypes";
import { BitMaps, T_Piece } from "../Pieces";
import "./Board.css";

const BOARD_SIZE: number = 10;

const initBoard: () => T_Board = function () {
  const board: T_Board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row: T_Row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell: T_Cell = {
        parentPiece: null,
        pos: [i, j], //[ row, col ]
      };
      row.push(cell);
    }
    board.push(row);
  }
  return board;
};

const Board: React.FC = () => {
  const [board, setBoard] = React.useState(initBoard());

  const updateBoard = (pieceName: T_Piece, pos: T_Pos) => {
    setBoard((prev) => {
      const [updateRow, updateCol] = pos;
      const newBoard: T_Board = [...prev];
      const newRow: T_Row = [...prev[updateRow]];
      newRow[updateCol] = {
        ...newRow[updateCol],
        parentPiece: pieceName,
      };
      newBoard[updateRow] = newRow;
      return newBoard;
    });
  };

  const isValidPlacement = (pos: T_Pos) => {
    return true;
  };

  const addPiece = (pieceName: T_Piece, origin: T_Pos) => {
    if (!isValidPlacement(origin)) {
      return;
    }
    const [originRow, originCol] = origin;
    const piece = BitMaps[pieceName];
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        if (piece[i][j]) {
          updateBoard(pieceName, [i + originRow, j + originCol]);
        }
      }
    }
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <Cell onClick={() => addPiece("Square", cell.pos)} key={j}>
              {cell.parentPiece ? <Block piece={cell.parentPiece} /> : null}
            </Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
