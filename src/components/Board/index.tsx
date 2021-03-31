import * as React from "react";

import { useGameState, T_Pos } from "../../game";
import "./Board.css";
import Cell from "../Cell";
import Block from "../Block";
import PieceQueue from "../PieceQueue";
import { get as getHighScore } from "../../game/HighScore";

type T_BoardContext = {
  playPiece?: (i: number, o: T_Pos) => void;
};

const BoardContext = React.createContext<T_BoardContext>({});

const Board: React.FC = () => {
  const [{ queue, board, score }, playPiece, newGame] = useGameState();

  return (
    <div>
      <div className="game-info">
        <p className="score">Current Score: {score}</p>
        <p className="score high-score">High Score: {getHighScore()}</p>
        <button className="new-game-btn" onClick={newGame}>
          New Game
        </button>
      </div>
      <BoardContext.Provider value={{ playPiece }}>
        <div className="board">
          <div>
            {board.map((row, i) => (
              <div key={i} className="row">
                {row.map((cell, j) => (
                  <Cell pos={[i, j]} key={j}>
                    {cell.piece ? <Block piece={cell.piece} /> : null}
                  </Cell>
                ))}
              </div>
            ))}
          </div>
          {queue && <PieceQueue queue={queue} />}
        </div>
      </BoardContext.Provider>
    </div>
  );
};

export default Board;
export { BoardContext };
