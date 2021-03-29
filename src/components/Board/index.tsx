import * as React from "react";

import { T_Cell, T_Pos } from "./BoardTypes";
import initBoard from "./initBoard";
import boardReducer, { addPiece, clearRow, clearCol } from "./state";
import { usePieceQueue, T_BitMap, Piece } from "../../game";
import "./Board.css";
import renderGrid from "./renderGrid";
import Cell from "../Cell";
import Block from "../Block";
import PieceQueue from "../PieceQueue";

type T_BoardContext = {
  playPiece?: (o: T_Pos, p: Piece, i: number) => void;
};

const BoardContext = React.createContext<T_BoardContext>({});

const Board: React.FC = () => {
  const [board, dispatch] = React.useReducer(boardReducer, initBoard());
  const [queue, removeFromQueue] = usePieceQueue(); //maybe rename to something like useGameState

  //TODO: can this be encapsulated in usePieceQueue()?
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

  //TODO: this + playPiece is !DRY
  //maybe define a func to loop over board and run a callback on each cell
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

  const playPiece = (origin: T_Pos, piece: Piece, index: number) => {
    const { bitmap } = piece;
    if (!isValidPlacement(bitmap, origin)) {
      return;
    }
    const [originRow, originCol] = origin;
    for (let i = 0; i < bitmap.length; i++) {
      for (let j = 0; j < bitmap[i].length; j++) {
        if (bitmap[i][j]) {
          dispatch(addPiece(piece, [i + originRow, j + originCol]));
        }
      }
    }
    removeFromQueue(index);
  };

  const renderBoardCell = (cell: T_Cell, pos: T_Pos): JSX.Element => {
    return (
      <Cell pos={pos}>{cell.piece ? <Block piece={cell.piece} /> : null}</Cell>
    );
  };

  return (
    <BoardContext.Provider value={{ playPiece }}>
      <div className="board">
        <div>{renderGrid(board, renderBoardCell)}</div>
        {queue && <PieceQueue queue={queue} />}
      </div>
    </BoardContext.Provider>
  );
};

export default Board;
export { BoardContext };
