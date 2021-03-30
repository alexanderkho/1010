import * as React from "react";

import { T_Pos } from "../../game";
import "./PieceQueue.css";

type Props = {
  updateDragOrigin: (o: T_Pos | null) => void;
  pos: T_Pos;
};

const PreviewCell: React.FC<Props> = ({ children, updateDragOrigin, pos }) => {
  return (
    <div
      className={"preview-cell"}
      onMouseDown={() => updateDragOrigin(pos)}
      onMouseUp={() => updateDragOrigin(null)}
    >
      {children}
    </div>
  );
};

export default PreviewCell;
