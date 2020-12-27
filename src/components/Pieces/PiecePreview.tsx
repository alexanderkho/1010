import * as React from "react";

import { T_PieceData } from "../../game";
import Cell from "../Cell";
import Block from "../Block";
import "./PiecePreview.css";

type Props = {
  piece: T_PieceData;
};

//TODO: Find a way to do this with renderBoard
const PiecePreview: React.FC<Props> = ({ piece }) => {
  return (
    <div>
      {piece.bitmap.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <Cell>{cell ? <Block piece={piece.name} /> : null}</Cell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PiecePreview;
