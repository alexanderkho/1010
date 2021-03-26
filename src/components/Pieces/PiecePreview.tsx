import * as React from "react";
import { useDrag } from "react-dnd";

import { T_PieceData, DragTypes } from "../../game";
import PreviewCell from "../Cell/PreviewCell";
import Block from "../Block";
import "./PiecePreview.css";
import { T_Pos } from "../Board/BoardTypes";

type Props = {
  piece: T_PieceData;
  index: number;
};

//TODO: Find a way to do this with renderBoard
const PiecePreview: React.FC<Props> = ({ piece, index }) => {
  const [dragOrigin, setDragOrigin] = React.useState<T_Pos | null>(null);
  const updateDragOrigin = (origin: T_Pos | null): void => {
    setDragOrigin(origin);
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragTypes.PIECE,
      item: () => {
        return {
          piece,
          dragOrigin,
          index,
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        // setDragOrigin(null);
      },
    }),
    [piece, dragOrigin, index]
  );

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
