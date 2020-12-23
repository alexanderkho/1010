const Pieces = {
  Square: "Square",
  Line: "Line",
  RLeft: "RLeft",
};

type T_Piece = keyof typeof Pieces;

const Colors = {
  Square: "red",
  Line: "blue",
  RLeft: "green",
};

type T_BitMap = Array<Array<1 | 0>>;

const BM_Square: T_BitMap = [
  [1, 1],
  [1, 1],
];

const BM_Line: T_BitMap = [[1], [1], [1], [1]];

const BM_RLeft: T_BitMap = [
  [1, 0],
  [1, 0],
  [1, 1],
];

const BitMaps = {
  Square: BM_Square,
  Line: BM_Line,
  RLeft: BM_RLeft,
};

//TODO: Find a cleaner way to handle piece typings so we don't need to typecast here
const getRandomPiece = (): T_Piece => {
  const keys = Object.keys(Pieces) as Array<T_Piece>;
  const p = Pieces[keys[(keys.length * Math.random()) << 0]] as T_Piece;
  return p;
};

export { Pieces, Colors, BitMaps, getRandomPiece };
export type { T_Piece, T_BitMap };
