import * as React from "react";
import { useDrop } from "react-dnd";
import { DragTypes } from "../../game";

import "./Cell.css";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Cell: React.FC<Props> = ({ children, onClick }) => {
  const [collected, drop] = useDrop(() => ({
    accept: DragTypes.PIECE,
    collect: (monitor) => ({
      isHovering: monitor.isOver(),
    }),
    drop: (item, monitor) => {
      console.log(item);
    },
    canDrop: (item, monitor) => {
      return true;
    },
  }));
  return (
    <div
      className={`cell ${collected.isHovering ? "hover" : ""}`}
      onClick={onClick}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default Cell;
