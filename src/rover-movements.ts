import { Direction, Plateau, Rover } from "./models";

const leftTurnMap: { [key in Direction]: Direction } = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
};

const rightTurnMap: { [key in Direction]: Direction } = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

export function goLeft(direction: Direction): Direction {
  if (!leftTurnMap[direction]) {
    throw new Error(`Invalid direction: ${direction}`);
  }
  return leftTurnMap[direction];
}

export function goRight(direction: Direction): Direction {
  if (!rightTurnMap[direction]) {
    throw new Error(`Invalid direction: ${direction}`);
  }
  return rightTurnMap[direction];
}

export function isCollision(
  newX: number,
  newY: number,
  rovers: Rover[]
): boolean {
  return rovers.some((rover) => rover.x === newX && rover.y === newY);
}

export function goForward(
  rover: Rover,
  plateau: Plateau,
  rovers: Rover[]
): Rover {
  let { x, y, direction } = rover;
  let newX = x;
  let newY = y;

  switch (direction) {
    case "N":
      newY = y + 1;
      break;
    case "E":
      newX = x + 1;
      break;
    case "S":
      newY = y - 1;
      break;
    case "W":
      newX = x - 1;
      break;
    default:
      throw new Error("Invalid direction");
  }

  if (newX < 0 || newX > plateau.sizeX || newY < 0 || newY > plateau.sizeY) {
    return rover;
  }

  if (isCollision(newX, newY, rovers)) {
    return rover;
  }

  return { x: newX, y: newY, direction };
}
