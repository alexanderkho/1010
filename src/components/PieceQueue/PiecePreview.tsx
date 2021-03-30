import * as React from "react";
import { useDrag } from "react-dnd";

import { DragTypes, Piece, T_Pos } from "../../game";
import PreviewCell from "./PreviewCell";
import Block from "../Block";
import "./PieceQueue.css";

type Props = {
  piece: Piece;
  index: number;
};

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
    <div className="piece-preview" ref={drag}>
      {piece.bitmap.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <PreviewCell
              pos={[i, j]}
              updateDragOrigin={updateDragOrigin}
              key={j}
            >
              {cell ? <Block piece={piece} /> : null}
            </PreviewCell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PiecePreview;
