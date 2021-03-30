import { useReducer, useEffect } from "react";

import { Piece, getRandomPiece } from "./Piece";
import { T_Queue, T_Board, T_Cell, T_Row, T_Pos } from "./BoardTypes";
import {
  boardReducer,
  initialState,
  resetQueue,
  T_GameState,
} from "./gameReducer";

/**
 * Returns Board and a function to add a piece to board
 */
const useGameState = (): [T_GameState, (i: number, o: T_Pos) => void] => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const { board, queue } = state;

  //check for empty queue
  useEffect(() => {
    if (!queue.length) {
      dispatch(resetQueue());
    }
  }, [queue]);

  //check for filled rows/cols
  useEffect(() => {
    //TODO
  }, [board]);

  //TODO
  const playPiece = (index: number, p: T_Pos): void => {};

  return [state, playPiece];
};

export default useGameState;
