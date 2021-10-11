// Type definitions for ellerjs
// Definitions by: ihorb
export = eller;

interface Cell {
  top: boolean; // true if cell has a wall in this direction, false if not
  bottom: boolean;
  left: boolean;
  right: boolean;
}

type Line = Array<Cell>;
type Maze = Array<Line>;

declare function eller(width: number, height: number): Maze;


