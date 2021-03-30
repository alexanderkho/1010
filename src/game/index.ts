import * as React from "react";

import { Piece, getRandomPiece, T_BitMap } from "./Piece";

const QUEUE_SIZE = 3;

type T_QUEUE = Piece[];

const usePieceQueue = (): [T_QUEUE, (i: number) => void] => {
  const [queue, setQueue] = React.useState<T_QUEUE>([]);
  React.useEffect(() => {
    if (!queue.length) {
      const newQueue: T_QUEUE = [];
      for (let i = 0; i < QUEUE_SIZE; i++) {
        const piece = getRandomPiece();
        newQueue.push(piece);
      }
      setQueue(newQueue);
    }
  }, [queue]);

  const removePiece = (i: number) => {
    setQueue((prev) => {
      const newQueue = [...prev];
      newQueue.splice(i, 1);
      return newQueue;
    });
  };

  return [queue, removePiece];
};

const DragTypes = {
  PIECE: "piece",
};

export { usePieceQueue, DragTypes, Piece };
export type { T_QUEUE, T_BitMap };
