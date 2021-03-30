import * as React from "react";

import { T_Cell, T_Pos } from "./BoardTypes";
import useGameState from "../../game/useGameState";
import "./Board.css";
import renderGrid from "./renderGrid";
import Cell from "../Cell";
import Block from "../Block";
import PieceQueue from "../PieceQueue";

type T_BoardContext = {
  playPiece?: (i: number, o: T_Pos) => void;
};

const BoardContext = React.createContext<T_BoardContext>({});

const Board: React.FC = () => {
  const [{ queue, board }, playPiece] = useGameState();

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
