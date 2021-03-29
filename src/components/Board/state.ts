import { Piece } from "../../game";
import { T_Board, T_Pos, T_Row } from "./BoardTypes";

const ADD_PIECE = "ADD_PIECE";
const CLEAR_ROW = "CLEAR_ROW";
const CLEAR_COL = "CLEAR_COL";

type T_AddPiece = {
  type: typeof ADD_PIECE;
  piece: Piece;
  pos: T_Pos;
};

type T_ClearRow = {
  type: typeof CLEAR_ROW;
  index: number;
};

type T_ClearCol = {
  type: typeof CLEAR_COL;
  index: number;
};

type actionTypes = T_AddPiece | T_ClearRow | T_ClearCol;

const addPiece = (piece: Piece, pos: T_Pos): T_AddPiece => {
  return {
    type: ADD_PIECE,
    piece,
    pos,
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

//TODO: some of this logic could be cleaned up.
const boardReducer = (state: T_Board, action: actionTypes): T_Board => {
  let newBoard: T_Board, newRow: T_Row;
  switch (action.type) {
    case ADD_PIECE:
      const { piece, pos } = action;
      const [updateRow, updateCol] = pos;
      newBoard = [...state];
      newRow = [...state[updateRow]];
      newRow[updateCol] = {
        ...newRow[updateCol],
        piece: piece,
      };
      newBoard[updateRow] = newRow;
      return newBoard;
    case CLEAR_ROW:
      newBoard = [...state];
      newRow = [...state[action.index]];
      newRow.forEach((cell) => (cell.piece = null));
      newBoard[action.index] = newRow;
      return newBoard;
    case CLEAR_COL:
      newBoard = [...state];
      newBoard.forEach((row) => {
        row[action.index].piece = null;
      });
      return newBoard;
    default:
      return state;
  }
};

export default boardReducer;
export { addPiece, clearRow, clearCol };
