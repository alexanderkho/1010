import * as React from "react";

import Cell from "../Cell";
import Block from "../Block";
import "./Board.css";

type Props = {
  message: string;
};

const Board: React.FC<Props> = (props) => {
  return (
    <div className="board">
      <Cell>
        <Block color="green" />
      </Cell>
    </div>
  );
};

export default Board;
