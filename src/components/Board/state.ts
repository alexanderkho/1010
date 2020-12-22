import { T_Piece } from "../Pieces";
import { T_Board, T_Pos, T_Row } from "./BoardTypes";

const ADD_PIECE = "ADD_PIECE";
const CLEAR_ROW = "CLEAR_ROW";
const CLEAR_COL = "CLEAR_COL";

type T_AddPiece = {
  type: typeof ADD_PIECE;
  pieceName: T_Piece;
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

const addPiece = (pieceName: T_Piece, pos: T_Pos): T_AddPiece => {
  return {
    type: ADD_PIECE,
    pieceName,
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

const boardReducer = (state: T_Board, action: actionTypes): T_Board => {
  switch (action.type) {
    case ADD_PIECE:
      const { pieceName, pos } = action;
      const [updateRow, updateCol] = pos;
      const newBoard: T_Board = [...state];
      const newRow: T_Row = [...state[updateRow]];
      newRow[updateCol] = {
        ...newRow[updateCol],
        piece: pieceName,
      };
      newBoard[updateRow] = newRow;
      return newBoard;
    case CLEAR_ROW:
      console.log("clearing row ", action.index);
      return state;
    case CLEAR_COL:
      console.log("clearing col ", action.index);
      return state;
    default:
      return state;
  }
};

export default boardReducer;
export { addPiece, clearRow, clearCol };
