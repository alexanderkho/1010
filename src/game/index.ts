import * as React from "react";

import { T_Piece, getRandomPiece } from "../components/Pieces";

const PIECES_PER_ROUND = 3;
type T_Round = T_Piece[];

const useGameRounds = (): [T_Round, () => void] => {
  const [round, setRound] = React.useState<T_Round>([]);
  React.useEffect(() => {
    if (!round.length) {
      const newRound: T_Round = [];
      for (let i = 0; i < PIECES_PER_ROUND; i++) {
        newRound.push(getRandomPiece());
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
