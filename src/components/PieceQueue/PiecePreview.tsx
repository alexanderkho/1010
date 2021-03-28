import * as React from "react";
import { useDrag } from "react-dnd";

import { T_PieceData, DragTypes } from "../../game";
import PreviewCell from "./PreviewCell";
import Block from "../Block";
import "./PieceQueue.css";
import { T_Pos } from "../Board/BoardTypes";
import renderGrid from "../Board/renderGrid";

type Props = {
  piece: T_PieceData;
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

  const renderPreviewCell = (cell: 0 | 1, pos: T_Pos): JSX.Element => {
    return (
      <PreviewCell pos={pos} updateDragOrigin={updateDragOrigin}>
        {cell ? <Block piece={piece.name} /> : null}
      </PreviewCell>
    );
  };

  return (
    <div className="piece-preview" ref={drag}>
      {renderGrid(piece.bitmap, renderPreviewCell)}
    </div>
  );
};

export default PiecePreview;
