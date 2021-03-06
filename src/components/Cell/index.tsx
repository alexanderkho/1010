import * as React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { DragTypes, Piece } from "../../game";
import { BoardContext } from "../Board";
import { T_Pos } from "../../game";

import "./Cell.css";

type Props = {
  pos: T_Pos;
};

type T_DragItem = { piece: Piece; dragOrigin?: T_Pos; index: number };

const Cell: React.FC<Props> = ({ children, pos }) => {
  const { playPiece } = React.useContext(BoardContext);

  const [collected, drop] = useDrop(
    () => ({
      accept: DragTypes.PIECE,
      collect: (monitor: DropTargetMonitor) => ({
        isHovering: monitor.isOver(),
      }),
      drop: (item: T_DragItem, monitor: DropTargetMonitor) => {
        const dragOrigin = item.dragOrigin as T_Pos;
        //offset pos by dragOrigin to find actual drop origin target
        const dropOrigin: T_Pos = [
          pos[0] - dragOrigin[0],
          pos[1] - dragOrigin[1],
        ];
        //TODO: fix the way item is typed so we don't need this dumb check
        if (playPiece) {
          playPiece(item.index, dropOrigin);
        }
      },
      canDrop: (item, monitor) => {
        //TODO: call some func here passed down from Board to determine if valid placement
        //maybe check validPlacements dictonary`
        return true;
      },
    }),
    [playPiece]
  );

  return (
    <div
      //TODO: instead of this check on collected.isHovering, we should recieve an activeCell prop
      //from Board which is true if this cell is part of the currently hovering piece AND that piece is a valid placement
      className={`cell ${collected.isHovering ? "hover" : ""}`}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default Cell;
