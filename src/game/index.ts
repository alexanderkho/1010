import * as React from "react";

import {
  T_Piece,
  getRandomPiece,
  rotatePiece,
  T_BitMap,
  T_Rotation,
  BitMaps,
} from "../components/Pieces";

const PIECES_PER_ROUND = 3;

type T_PieceData = {
  name: T_Piece;
  bitmap: T_BitMap;
  rotation: T_Rotation;
};

type T_Round = T_PieceData[];

const useGameRounds = (): [T_Round, () => void] => {
  const [round, setRound] = React.useState<T_Round>([]);
  React.useEffect(() => {
    if (!round.length) {
      const newRound: T_Round = [];
      for (let i = 0; i < PIECES_PER_ROUND; i++) {
        const rotation = Math.floor(Math.random() * 4) as T_Rotation;
        const pieceName = getRandomPiece();
        const piece: T_PieceData = {
          name: pieceName,
          bitmap: rotatePiece(BitMaps[pieceName], rotation),
          rotation,
        };
        newRound.push(piece);
      }
      setRound(newRound);
    }
  }, [round]);

  const next = () =>
    setRound((prev) => {
      const newRound: T_Round = [...prev];
      newRound.pop();
      return newRound;
    });

  return [round, next];
};

export { useGameRounds };
export type { T_Round };
