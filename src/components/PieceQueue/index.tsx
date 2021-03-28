import * as React from "react";

import { T_QUEUE } from "../../game";
import PiecePreview from "./PiecePreview";
import "./PieceQueue.css";

type Props = {
  queue: T_QUEUE;
};

const PieceQueue: React.FC<Props> = ({ queue }) => {
  return (
    <div className="piece-queue-container">
      <ul className="piece-queue">
        {queue.map((p, i) => (
          <PiecePreview piece={p} key={i} index={i} />
        ))}
      </ul>
    </div>
  );
};

export default PieceQueue;
