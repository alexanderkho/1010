import { Piece } from "./Piece";

type T_Pos = [number, number];

type T_Cell = {
  piece: Piece | null;
  pos: T_Pos;
};

type T_Row = Array<T_Cell>;

type T_Board = Array<T_Row>;

type T_Queue = Piece[];

export type { T_Cell, T_Row, T_Board, T_Pos, T_Queue };
