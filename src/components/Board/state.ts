import { T_Piece } from "../Pieces";
import { T_Board, T_Pos, T_Row } from "./BoardTypes";

const ADD_PIECE = "ADD_PIECE";
const CLEAR_LINE = "CLEAR_LINE";

type T_Line = "row" | "col";

type addPieceAction = {
  type: typeof ADD_PIECE;
  pieceName: T_Piece;
  pos: T_Pos;
};

//TODO: probably split this into CLEAR_ROW and CLEAR_COL
type clearLineAction = {
  type: typeof CLEAR_LINE;
  lineType: T_Line;
  index: number;
};

type actionTypes = addPieceAction | clearLineAction;

const addPiece = (pieceName: T_Piece, pos: T_Pos): addPieceAction => {
  return {
    type: ADD_PIECE,
    pieceName,
    pos,
  };
};

const clearLine = (lineType: T_Line, index: number): clearLineAction => {
  return {
    type: CLEAR_LINE,
    lineType,
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
        parentPiece: pieceName,
      };
      newBoard[updateRow] = newRow;
      return newBoard;
    case CLEAR_LINE:
      console.log("clearing line: ", action);
      return state;
    default:
      return state;
  }
};

export default boardReducer;
export { addPiece, clearLine };
