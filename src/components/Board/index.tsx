import * as React from "react";

import Cell from "../Cell";
import Block from "../Block";
import "./Board.css";

const BOARD_SIZE: number = 10;

const initBoard = () => {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push(new Array(BOARD_SIZE).fill(0));
  }
  return board;
};

const Board: React.FC = () => {
  const board = initBoard();
  return (
    <div className="board">
      {board.map((row) => (
        <div className="row">
          {row.map(() => (
            <Cell />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
