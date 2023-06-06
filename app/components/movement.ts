import { Postion } from "../types/types";

const createsnakeMovement = (gridSize = 5) => ({
  moveRight: (snakeBody: Postion[]) =>
    snakeBody.map((segment) => ({
      x: segment.x + gridSize,
      y: segment.y,
    })),
  moveLeft: (snakeBody: Postion[]) =>
    snakeBody.map((segment) => ({
      x: segment.x - gridSize,
      y: segment.y,
    })),
  moveUp: (snakeBody: Postion[]) =>
    snakeBody.map((segment) => ({
      x: segment.x,
      y: segment.y - gridSize,
    })),
  moveDown: (snakeBody: Postion[]) =>
    snakeBody.map((segment) => ({
      x: segment.x,
      y: segment.y + gridSize,
    })),
});

export default createsnakeMovement;
