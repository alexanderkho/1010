import * as React from "react";
import { useDrag } from "react-dnd";

import { T_PieceData, DragTypes } from "../../game";
import PreviewCell from "../Cell/PreviewCell";
import Block from "../Block";
import "./PiecePreview.css";
import { T_Pos } from "../Board/BoardTypes";

type Props = {
  piece: T_PieceData;
};

//TODO: Find a way to do this with renderBoard
const PiecePreview: React.FC<Props> = ({ piece }) => {
  // const [dragRef, setDragRef] = React.useState<T_DragRef>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.PIECE,
    item: piece.name,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      setDragOrigin(null);
    },
  }));

  const [dragOrigin, setDragOrigin] = React.useState<T_Pos | null>(null);

  const updateDragOrigin = (origin: T_Pos | null): void => {
    setDragOrigin(origin);
  };

  //TODO: Add onClick to cells to grab the cell that was selected
  //Then, onHover we can calculate if it is a valid placement based
  //on the initial cell that was selected + the piece type/rotation.
  return (
    <div ref={drag}>
      {piece.bitmap.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <PreviewCell
              key={j}
              pos={[i, j]}
              updateDragOrigin={updateDragOrigin}
            >
              {cell ? <Block piece={piece.name} /> : null}
            </PreviewCell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PiecePreview;
