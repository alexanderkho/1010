import * as React from "react";

import "./Cell.css";

type Props = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const Cell: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {children}
    </div>
  );
};

export default Cell;
