import * as React from "react";

type Props = {
  color: "blue" | "red" | "orange" | "green";
};

const Block: React.FC<Props> = ({ color }: Props) => {
  const style = {
    backgroundColor: color,
  };
  return <div style={style} />;
};

export default Block;
