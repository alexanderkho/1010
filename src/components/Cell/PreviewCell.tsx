import * as React from "react";
import { useDrag } from "react-dnd";

import { DragTypes, T_PieceData } from "../../game";
import { T_Pos } from "../Board/BoardTypes";
import {
  T_DragRef,
  T_PreviewContext,
  PreviewContext,
} from "../Pieces/PiecePreview";

import "./Cell.css";

type Props = {
  updateDragOrigin: (o: T_Pos | null) => void;
  pos: T_Pos;
};

const PreviewCell: React.FC<Props> = ({ children, updateDragOrigin, pos }) => {
  return (
    <div
      className={"cell"}
      onMouseDown={() => updateDragOrigin(pos)}
      onMouseUp={() => updateDragOrigin(null)}
    >
      {children}
    </div>
  );
};

export default PreviewCell;
