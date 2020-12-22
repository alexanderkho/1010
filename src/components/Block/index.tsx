import * as React from "react";

import { T_Piece, Colors } from "../Pieces";
import "./Block.css";

type Props = {
  piece: T_Piece;
};

const Block: React.FC<Props> = ({ piece }: Props) => {
  let style;
  if (piece) {
    style = {
      backgroundColor: Colors[piece],
    };
  } else {
    style = {
      display: "none",
    };
  }
  return <div style={style} className="block" />;
};

export default Block;
