import * as React from "react";

import "./Block.css";

type Props = {
  color: "blue" | "red" | "orange" | "green";
};

const Block: React.FC<Props> = ({ color }: Props) => {
  const style = {
    backgroundColor: color,
  };
  return <div style={style} className="block" />;
};

export default Block;
