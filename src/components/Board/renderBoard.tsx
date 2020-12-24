import Cell from "../Cell";
import { T_Board, T_Pos } from "./BoardTypes";
import Block from "../Block";
import { T_Round } from "../../game";

const renderBoard = (
  board: T_Board,
  onClick: (p: T_Pos) => void
): JSX.Element => {
  return (
    <>
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <Cell onClick={() => onClick(cell.pos)} key={j}>
              {cell.piece ? <Block piece={cell.piece} /> : null}
            </Cell>
          ))}
        </div>
      ))}
    </>
  );
};

//TODO
// const renderPieceQueue = (round: T_Round ): JSX.Element => {
//   const queueBoard: T_Board = round.map()
// }

export default renderBoard;
