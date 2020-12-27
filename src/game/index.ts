import * as React from "react";

import {
  T_Piece,
  getRandomPiece,
  rotatePiece,
  T_BitMap,
  T_Rotation,
  BitMaps,
} from "../components/Pieces";

const QUEUE_SIZE = 3;

type T_PieceData = {
  name: T_Piece;
  bitmap: T_BitMap;
  rotation: T_Rotation;
};

type T_QUEUE = T_PieceData[];

const usePieceQueue = (): [T_QUEUE, () => void] => {
  const [queue, setQueue] = React.useState<T_QUEUE>([]);
  React.useEffect(() => {
    if (!queue.length) {
      const newQueue: T_QUEUE = [];
      for (let i = 0; i < QUEUE_SIZE; i++) {
        const rotation = Math.floor(Math.random() * 4) as T_Rotation;
        const pieceName = getRandomPiece();
        const piece: T_PieceData = {
          name: pieceName,
          bitmap: rotatePiece(BitMaps[pieceName], rotation),
          rotation,
        };
        newQueue.push(piece);
      }
      setQueue(newQueue);
    }
  }, [queue]);

  const next = () =>
    setQueue((prev) => {
      const newQueue: T_QUEUE = [...prev];
      newQueue.pop();
      return newQueue;
    });

  return [queue, next];
};

export { usePieceQueue };
export type { T_QUEUE, T_PieceData };
