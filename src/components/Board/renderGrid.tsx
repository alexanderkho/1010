import { T_Pos } from "./BoardTypes";

function renderGrid<C>(
  grid: Array<Array<C>>,
  renderCell: (cell: C, pos: T_Pos) => JSX.Element
): JSX.Element {
  return (
    <>
      {grid.map((row, i) => (
        <div className="row">
          {row.map((cell, j) => renderCell(cell, [i, j]))}
        </div>
      ))}
    </>
  );
}

export default renderGrid;
