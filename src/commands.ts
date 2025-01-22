import { Plateau, Rover } from "./models";
import { goForward, goLeft, goRight } from "./rover-movements";

export function execCommands(
  rover: Rover,
  commands: string,
  plateau: Plateau,
  rovers: Rover[]
): Rover {
  for (const command of commands) {
    switch (command) {
      case "L":
        rover.direction = goLeft(rover.direction);
        break;
      case "R":
        rover.direction = goRight(rover.direction);
        break;
      case "M":
        rover = goForward(rover, plateau, rovers);
        break;
    }
  }

  return rover;
}
