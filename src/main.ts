import { execCommands } from "./commands";
import { Direction, Plateau, Rover } from "./models";

export function start(input: string): string {
  const lines = input.trim().split("\n");
  const [sizeX, sizeY] = lines[0].split(" ").map(Number);
  if (sizeX < 0 || sizeY < 0) {
    throw new Error(
      "Invalid plateau size. Coordinates must be positive numbers."
    );
  }
  const plateau: Plateau = { sizeX, sizeY };

  const rovers: Rover[] = [];
  const results: string[] = [];
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, direction] = lines[i].split(" ");
    const commands = lines[i + 1];

    const rover: Rover = {
      x: parseInt(x),
      y: parseInt(y),
      direction: direction as Direction,
    };

    if (rover.x < 0 || rover.y < 0) {
      throw new Error(
        "Invalid rover position. Coordinates must be positive numbers."
      );
    }

    if (rover.x > plateau.sizeX || rover.y > plateau.sizeY) {
      throw new Error("Rover is out of bounds.");
    }

    const finalRover = execCommands(rover, commands, plateau, rovers);
    rovers.push(finalRover);
    results.push(`${finalRover.x} ${finalRover.y} ${finalRover.direction}`);
  }

  return results.join("\n");
}

const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
console.log(start(input));
