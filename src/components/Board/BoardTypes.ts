import { T_Piece } from "../Pieces";

type T_Pos = [number, number];

type T_Cell = {
  parentPiece: T_Piece | null;
  pos: T_Pos;
};

type T_Row = Array<T_Cell>;

type T_Board = Array<T_Row>;

export type { T_Cell, T_Row, T_Board, T_Pos };
