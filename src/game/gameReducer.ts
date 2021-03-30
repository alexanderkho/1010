import { getRandomPiece, Piece } from "./Piece";
import { T_Board, T_Pos, T_Queue, T_Row } from "./BoardTypes";
import initBoard from "./initBoard";

type T_GameState = {
  board: T_Board;
  queue: T_Queue;
};

const QUEUE_SIZE = 3;

const ADD_PIECE = "ADD_PIECE";
const PLAY_PIECE = "PLAY_PIECE";
const CLEAR_ROW = "CLEAR_ROW";
const CLEAR_COL = "CLEAR_COL";
const RESET_QUEUE = "RESET_QUEUE";
const REMOVE_FROM_QUEUE = "REMOVE_FROM_QUEUE";

//TODO: is there a more sane way to type this
type T_AddPiece = {
  type: typeof ADD_PIECE;
  piece: Piece;
  pos: T_Pos;
};

type T_PlayPiece = {
  type: typeof PLAY_PIECE;
  piece: Piece;
  pos: T_Pos;
  index: number;
};

type T_ClearRow = {
  type: typeof CLEAR_ROW;
  index: number;
};

type T_ClearCol = {
  type: typeof CLEAR_COL;
  index: number;
};

type T_ResetQueue = {
  type: typeof RESET_QUEUE;
};

type T_RemoveFromQueue = {
  type: typeof REMOVE_FROM_QUEUE;
  index: number;
};

type actionTypes =
  | T_AddPiece
  | T_PlayPiece
  | T_ClearRow
  | T_ClearCol
  | T_ResetQueue
  | T_RemoveFromQueue;

const addPiece = (piece: Piece, pos: T_Pos): T_AddPiece => {
  return {
    type: ADD_PIECE,
    piece,
    pos,
  };
};

const playPiece = (piece: Piece, pos: T_Pos, index: number): T_PlayPiece => {
  return {
    type: PLAY_PIECE,
    piece,
    pos,
    index,
  };
};

const clearRow = (index: number): T_ClearRow => {
  return {
    type: CLEAR_ROW,
    index,
  };
};

const clearCol = (index: number): T_ClearCol => {
  return {
    type: CLEAR_COL,
    index,
  };
};

const resetQueue = (): T_ResetQueue => {
  return {
    type: RESET_QUEUE,
  };
};

const removeFromQueue = (index: number) => {
  return {
    type: REMOVE_FROM_QUEUE,
    index,
  };
};

//TODO: some of this logic could be cleaned up.
const boardReducer = (state: T_GameState, action: actionTypes): T_GameState => {
  let newBoard: T_Board, newRow: T_Row, newQueue: T_Queue;
  switch (action.type) {
    case ADD_PIECE:
      const { piece, pos } = action;
      const [updateRow, updateCol] = pos;
      newBoard = [...state.board];
      newRow = [...state.board[updateRow]];
      newRow[updateCol] = {
        ...newRow[updateCol],
        piece: piece,
      };
      newBoard[updateRow] = newRow;
      return { ...state, board: newBoard };
    case PLAY_PIECE:
      //TODO
      return state;
    case CLEAR_ROW:
      newBoard = [...state.board];
      newRow = [...state.board[action.index]];
      newRow.forEach((cell) => (cell.piece = null));
      newBoard[action.index] = newRow;
      return { ...state, board: newBoard };
    case CLEAR_COL:
      newBoard = [...state.board];
      newBoard.forEach((row) => {
        row[action.index].piece = null;
      });
      return { ...state, board: newBoard };
    case RESET_QUEUE:
      newQueue = [];
      for (let i = 0; i < QUEUE_SIZE; i++) {
        newQueue.push(getRandomPiece());
      }
      return { ...state, queue: newQueue };
    case REMOVE_FROM_QUEUE:
      const { index } = action;
      newQueue = [...state.queue];
      newQueue.splice(index, 1);
      return { ...state, queue: newQueue };
    default:
      return state;
  }
};

const initialState = {
  board: initBoard(),
  queue: [],
};

export type { T_GameState };

export {
  addPiece,
  playPiece,
  clearRow,
  clearCol,
  resetQueue,
  removeFromQueue,
  boardReducer,
  initialState,
};
