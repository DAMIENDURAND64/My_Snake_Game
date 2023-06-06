import React, { KeyboardEventHandler, useState } from "react";
import { Postion } from "../types/types";
import useInterval from "../utils/useInterval";

const MOVEMENT_SPEED = 75;

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const UseGameLogic = () => {
  const [snakeBody, setSnakeBody] = useState<Postion[]>([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState<Direction>(Direction.DOWN);

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case "KeyZ":
        setDirection(Direction.UP);
        break;
      case "KeyS":
        setDirection(Direction.DOWN);
        break;
      case "KeyQ":
        setDirection(Direction.LEFT);
        break;
      case "KeyD":
        setDirection(Direction.RIGHT);
        break;
    }
    console.log(event.key);
  };

  const moveSnake = () => {
    switch (direction) {
      case Direction.UP:
        setSnakeBody((snakeBody) => [
          { x: snakeBody[0].x, y: snakeBody[0].y - 1 },
          ...snakeBody.slice(0, -1),
        ]);
        break;
      case Direction.DOWN:
        setSnakeBody((snakeBody) => [
          { x: snakeBody[0].x, y: snakeBody[0].y + 1 },
          ...snakeBody.slice(0, -1),
        ]);
        break;
      case Direction.LEFT:
        setSnakeBody((snakeBody) => [
          { x: snakeBody[0].x - 1, y: snakeBody[0].y },
          ...snakeBody.slice(0, -1),
        ]);
        break;
      case Direction.RIGHT:
        setSnakeBody((snakeBody) => [
          { x: snakeBody[0].x + 1, y: snakeBody[0].y },
          ...snakeBody.slice(0, -1),
        ]);
        break;
    }
  };

  useInterval(moveSnake, MOVEMENT_SPEED);

  return {
    snakeBody,
    setSnakeBody,
    onKeyDownHandler,
  };
};

export default UseGameLogic;
