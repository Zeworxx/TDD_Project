export interface Plateau {
  sizeX: number;
  sizeY: number;
}

export interface Rover {
  x: number;
  y: number;
  direction: Direction;
}

export type Direction = "N" | "E" | "S" | "W";
