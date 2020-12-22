const Pieces = {
  Square: "Square",
  Line: "Line",
};

type T_Piece = keyof typeof Pieces;

const Colors = {
  Square: "red",
  Line: "Blue",
};

type T_BitMap = Array<Array<1 | 0>>;

const BM_Square: T_BitMap = [
  [1, 1],
  [1, 1],
];

const BM_Line: T_BitMap = [[1], [1], [1], [1]];

const BitMaps = {
  Square: BM_Square,
  Line: BM_Line,
};

export { Pieces, Colors, BitMaps };
export type { T_Piece, T_BitMap };
