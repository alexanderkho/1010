import * as React from "react";

import Cell from "./Cell";
import Block from "./Block";

type Props = {
  message: string;
};

const Board: React.FC<Props> = (props) => {
  return (
    <div>
      <p>{props.message}</p>
      <Cell></Cell>
    </div>
  );
};

export default Board;
