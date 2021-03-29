import * as React from "react";

import { Piece } from "../../game";
import "./Block.css";

type Props = {
  piece: Piece;
};

const Block: React.FC<Props> = ({ piece }: Props) => {
  let style;
  if (piece) {
    style = {
      backgroundColor: piece.color,
    };
  }
  return <div style={style} className="block" />;
};

export default Block;
