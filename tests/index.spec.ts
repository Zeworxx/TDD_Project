import { execCommands } from '../src/commands';
import { start } from '../src/main';
import { Plateau, Rover } from '../src/models';
import { goForward, goLeft, goRight, isCollision } from '../src/rover-movements';

describe("Mars Rovers", () => {
  const plateau: Plateau = { sizeX: 5, sizeY: 5 };

  test("goLeft function", () => {
    expect(goLeft("N")).toBe("W");
    expect(goLeft("W")).toBe("S");
    expect(goLeft("S")).toBe("E");
    expect(goLeft("E")).toBe("N");
  });

  test("goRight function", () => {
    expect(goRight("N")).toBe("E");
    expect(goRight("E")).toBe("S");
    expect(goRight("S")).toBe("W");
    expect(goRight("W")).toBe("N");
  });

  test("isCollision function", () => {
    const rovers: Rover[] = [
      { x: 1, y: 2, direction: "N" },
      { x: 3, y: 3, direction: "E" }
    ];
    expect(isCollision(1, 2, rovers)).toBe(true);
    expect(isCollision(2, 2, rovers)).toBe(false);
  });

  test("goForward function moves the rover", () => {
    const rovers: Rover[] = [];
    expect(goForward({ x: 1, y: 2, direction: "N" }, plateau, rovers)).toEqual({
      x: 1,
      y: 3,
      direction: "N",
    });
    expect(goForward({ x: 1, y: 2, direction: "S" }, plateau, rovers)).toEqual({
      x: 1,
      y: 1,
      direction: "S",
    });
    expect(goForward({ x: 1, y: 2, direction: "E" }, plateau, rovers)).toEqual({
      x: 2,
      y: 2,
      direction: "E",
    });
    expect(goForward({ x: 1, y: 2, direction: "W" }, plateau, rovers)).toEqual({
      x: 0,
      y: 2,
      direction: "W",
    });
  });

  test("execCommands processes a series of commands", () => {
    const rovers: Rover[] = [];
    const rover: Rover = { x: 1, y: 2, direction: "N" };
    const commands = "LMLMLMLMM";
    expect(execCommands(rover, commands, plateau, rovers)).toEqual({
      x: 1,
      y: 3,
      direction: "N",
    });
  });

  test("marsRovers processes multiple rovers", () => {
    const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
    const output = `1 3 N
5 1 E`;
    expect(start(input)).toBe(output);
  });
});