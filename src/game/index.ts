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

const usePieceQueue = (): [T_QUEUE, (i: number) => void] => {
  const [queue, setQueue] = React.useState<T_QUEUE>([]);
  React.useEffect(() => {
    if (!queue.length) {
      const newQueue: T_QUEUE = [];
      for (let i = 0; i < QUEUE_SIZE; i++) {
        //should probably export all this initilization as a function from Pieces
        //e.g. newQueue.push(new Piece())
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

export { usePieceQueue, DragTypes };
export type { T_QUEUE, T_PieceData };
