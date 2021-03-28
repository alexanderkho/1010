import * as React from "react";
import { useDrop } from "react-dnd";
import { DragTypes, T_PieceData } from "../../game";
import { BoardContext } from "../Board";
import { T_Pos } from "../Board/BoardTypes";

import "./Cell.css";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  pos: T_Pos;
};

//TODO: this should NOT be defined here
type T_Item = { piece: T_PieceData; dragOrigin?: T_Pos; index: number };

const Cell: React.FC<Props> = ({ children, onClick, pos }) => {
  const { playPiece } = React.useContext(BoardContext);

  const [collected, drop] = useDrop(
    () => ({
      accept: DragTypes.PIECE,
      collect: (monitor) => ({
        isHovering: monitor.isOver(),
      }),
      drop: (item: T_Item, monitor) => {
        const dragOrigin = item.dragOrigin as T_Pos;
        //offset pos by dragOrigin to find actual drop origin target
        const dropOrigin: T_Pos = [
          pos[0] - dragOrigin[0],
          pos[1] - dragOrigin[1],
        ];
        //TODO: fix the way item is typed so we don't need this dumb check
        if (playPiece) {
          playPiece(dropOrigin, item.piece, item.index);
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
      onClick={onClick}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default Cell;
