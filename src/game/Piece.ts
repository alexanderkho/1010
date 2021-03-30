const PieceNames = [
  "Square_sm",
  "Square_md",
  "Square_lg",
  "Line",
  "LLeft",
  "LRight",
] as const;
type T_PieceName = typeof PieceNames[number];

type T_BitMap = Array<Array<1 | 0>>;
type T_Rotation = 0 | 1 | 2 | 3;

class Piece {
  name: T_PieceName;
  color: string;
  bitmap: T_BitMap;
  points: number;

  constructor(name: T_PieceName) {
    this.name = name;
    this.color = Piece.colors[name];
    this.bitmap = Piece.getRandomRotation(Piece.defaultBitmaps[name]);
    this.points = Piece.pointMap[name];
  }

  private static colors: Record<T_PieceName, string> = {
    Square_sm: "#d68427",
    Square_md: "#e34086",
    Square_lg: "cornflowerblue",
    Line: "#2069e0",
    LLeft: "#3dd966",
    LRight: "blueviolet",
  };

  private static pointMap: Record<T_PieceName, number> = {
    Square_sm: 1,
    Square_md: 4,
    Square_lg: 9,
    Line: 4,
    LLeft: 4,
    LRight: 4,
  };

  private static defaultBitmaps: Record<T_PieceName, T_BitMap> = {
    Square_sm: [[1]],
    Square_md: [
      [1, 1],
      [1, 1],
    ],
    Square_lg: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    Line: [[1], [1], [1], [1]],
    LLeft: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    LRight: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  };

  private static getRandomRotation(bitmap: T_BitMap): T_BitMap {
    const rotation: T_Rotation = Math.floor(Math.random() * 4) as T_Rotation;
    let rotated: T_BitMap = bitmap;
    for (let i = 0; i < rotation; i++) {
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
  }
}

const getRandomPiece = (): Piece => {
  const pieceName = PieceNames[Math.floor(Math.random() * PieceNames.length)];
  return new Piece(pieceName);
};

export { Piece, getRandomPiece };
export type { T_BitMap };
