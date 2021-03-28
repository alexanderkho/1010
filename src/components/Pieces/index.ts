const Pieces = {
  Square: "Square",
  Line: "Line",
  LLeft: "LLeft",
};

type T_Piece = keyof typeof Pieces;

const Colors = {
  Square: "red",
  Line: "blue",
  LLeft: "green",
};

type T_BitMap = Array<Array<1 | 0>>;

const BM_Square: T_BitMap = [
  [1, 1],
  [1, 1],
];

const BM_Line: T_BitMap = [[1], [1], [1], [1]];

const BM_LLeft: T_BitMap = [
  [1, 0],
  [1, 0],
  [1, 1],
];

const BitMaps = {
  Square: BM_Square,
  Line: BM_Line,
  LLeft: BM_LLeft,
};

type T_Rotation = 0 | 1 | 2 | 3;

const rotatePiece = (piece: T_BitMap, rotations: T_Rotation): T_BitMap => {
  let rotated: T_BitMap = piece;
  for (let i = 0; i < rotations; i++) {
    let tRotated: T_BitMap = [];
    const nRows = rotated.length;
    const nCols = rotated[0].length;
    for (let i = 0; i < nCols; i++) {
      const row: Array<1 | 0> = [];
      for (let j = nRows - 1; j >= 0; j--) {
        row.push(rotated[j][i]);
      }
      tRotated.push(row);
    }
    rotated = tRotated;
  }
  return rotated;
};

//TODO: Find a cleaner way to handle piece typings so we don't need to typecast here
const getRandomPiece = (): T_Piece => {
  //select random piece
  const keys = Object.keys(Pieces) as Array<T_Piece>;
  const p = Pieces[keys[(keys.length * Math.random()) << 0]] as T_Piece;
  return p;
};

export { Pieces, Colors, BitMaps, getRandomPiece, rotatePiece };
export type { T_Piece, T_BitMap, T_Rotation };
