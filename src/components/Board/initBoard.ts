import { T_QUEUE } from "../../game";
import { T_Board, T_Cell, T_Row } from "./BoardTypes";

const BOARD_SIZE: number = 10;

const initBoard: () => T_Board = function () {
  const board: T_Board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row: T_Row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      const cell: T_Cell = {
        piece: null,
        pos: [i, j], //[ row, col ]
      };
      row.push(cell);
    }
    board.push(row);
  }
  return board;
};

// const mapQueueToBoard = (queue: T_QUEUE):

export default initBoard;
