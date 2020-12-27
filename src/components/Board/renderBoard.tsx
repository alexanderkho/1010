import Cell from "../Cell";
import { T_Board, T_Pos } from "./BoardTypes";
import Block from "../Block";

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

//TODO: see PiecePreview.tsx
// const renderPieceQueue = (queue: T_Queue ): JSX.Element => {
//   const queueBoard: T_Board = queue.map()
// }

export default renderBoard;
