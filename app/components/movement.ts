import { Direction, Position, WillSnakeEatFood } from "../types/types";
import { SEGMENT_SIZE } from "../utils/constants";

const createsnakeMovement = (gridSize = 5) => ({
  moveRight: (snakeBody: Position[]) => {
    const copyBody = [...snakeBody];
    const head = copyBody[copyBody.length - 1];
    copyBody.shift();
    return [...copyBody, { ...head, x: head.x + gridSize }];
  },
  moveLeft: (snakeBody: Position[]) => {
    const copyBody = [...snakeBody];
    const head = copyBody[copyBody.length - 1];
    copyBody.shift();
    return [...copyBody, { ...head, x: head.x - gridSize }];
  },

  moveUp: (snakeBody: Position[]) => {
    const copyBody = [...snakeBody];
    const head = copyBody[copyBody.length - 1];
    copyBody.shift();
    return [...copyBody, { ...head, y: head.y - gridSize }];
  },
  moveDown: (snakeBody: Position[]) => {
    const copyBody = [...snakeBody];
    const head = copyBody[copyBody.length - 1];
    copyBody.shift();
    return [...copyBody, { ...head, y: head.y + gridSize }];
  },
});

export const willSnakeEatFood = ({
  snakeHeadPosition,
  foodPosition,
  direction,
}: WillSnakeEatFood) => {
  switch (direction) {
    case Direction.UP:
      return (
        snakeHeadPosition.x === foodPosition.x &&
        snakeHeadPosition.y - SEGMENT_SIZE === foodPosition.y
      );
    case Direction.DOWN:
      return (
        snakeHeadPosition.x === foodPosition.x &&
        snakeHeadPosition.y + SEGMENT_SIZE === foodPosition.y
      );
    case Direction.LEFT:
      return (
        snakeHeadPosition.x - SEGMENT_SIZE === foodPosition.x &&
        snakeHeadPosition.y === foodPosition.y
      );
    case Direction.RIGHT:
      return (
        snakeHeadPosition.x + SEGMENT_SIZE === foodPosition.x &&
        snakeHeadPosition.y === foodPosition.y
      );
  }
};

export const hasSnakeEatenItself = (snakeBody: Position[]) => {
  if (snakeBody.length <= 1) {
    return false;
  }

  const head = snakeBody[snakeBody.length - 1];
  const body = snakeBody.slice(0, snakeBody.length - 1);

  return body.some((segment) => segment.x === head.x && segment.y === head.y);
};

export default createsnakeMovement;
