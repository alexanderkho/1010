import { getRandomPiece, Piece, T_BitMap } from "./Piece";
import { T_Board, T_Pos, T_Queue, T_Row } from "./BoardTypes";
import initBoard from "./initBoard";

type T_GameState = {
  board: T_Board;
  queue: T_Queue;
};

const QUEUE_SIZE = 3;

const ADD_PIECE = "ADD_PIECE";
const CLEAR_ROW = "CLEAR_ROW";
const CLEAR_COL = "CLEAR_COL";
const RESET_QUEUE = "RESET_QUEUE";

//TODO: is there a more sane way to type this
type T_AddPiece = {
  type: typeof ADD_PIECE;
  piece: Piece;
  origin: T_Pos;
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

type actionTypes = T_AddPiece | T_ClearRow | T_ClearCol | T_ResetQueue;

const addPiece = (index: number, origin: T_Pos, piece: Piece): T_AddPiece => {
  return {
    type: ADD_PIECE,
    piece,
    origin,
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

//TODO: some of this logic could be cleaned up.
const boardReducer = (state: T_GameState, action: actionTypes): T_GameState => {
  let newBoard: T_Board, newRow: T_Row, newQueue: T_Queue;
  switch (action.type) {
    case ADD_PIECE:
      //add piece to board
      const { piece, origin } = action;
      const { bitmap } = piece;
      const [originRow, originCol] = origin;
      //hacky deep clone
      newBoard = [...state.board].map((r) => [...r]);
      for (let i = 0; i < bitmap.length; i++) {
        for (let j = 0; j < bitmap[i].length; j++) {
          if (bitmap[i][j]) {
            newBoard[i + originRow][j + originCol] = {
              ...newBoard[i][j],
              piece,
            };
          }
        }
      }

      //remove piece from queue
      const { index } = action;
      newQueue = [...state.queue];
      newQueue.splice(index, 1);
      return { board: newBoard, queue: newQueue };
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
    default:
      return state;
  }
};

const initialState = {
  board: initBoard(),
  queue: [],
};

export type { T_GameState };

export { addPiece, clearRow, clearCol, resetQueue, boardReducer, initialState };
