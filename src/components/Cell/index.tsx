import * as React from "react";

import "./Cell.css";

const Cell: React.FC = ({ children }) => {
  return <div className="cell">{children}</div>;
};

export default Cell;
