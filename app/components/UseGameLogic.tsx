import { KeyboardEventHandler, useEffect, useState } from "react";
import { Direction, GameState, Position, UseGameLogic } from "../types/types";
import useInterval from "../utils/useInterval";
import createsnakeMovement, {
  hasSnakeEatenItself,
  willSnakeEatFood,
} from "./movement";
import randomPositionOnGrid from "../utils/randomPositionOnGrid";
import { MOVEMENT_SPEED, SEGMENT_SIZE } from "../utils/constants";

const useGameLogic = ({
  canvasHeight,
  canvasWidth,
  onGameOver,
  gameState,
}: UseGameLogic) => {
  const [snakeBody, setSnakeBody] = useState<Position[]>([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState<Direction>(Direction.DOWN);
  const [foodPosition, setFoodPosition] = useState<Position | undefined>();

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case "z":
        if (direction !== Direction.DOWN) setDirection(Direction.UP);
        break;
      case "s":
        if (direction !== Direction.UP) setDirection(Direction.DOWN);
        break;
      case "q":
        if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
        break;
      case "d":
        if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
        break;
    }
  };
  const snakeHeadPosition = snakeBody[snakeBody.length - 1];
  const { moveDown, moveLeft, moveRight, moveUp } = createsnakeMovement();

  useEffect(() => {
    if (!canvasHeight || !canvasWidth) {
      return;
    }
    setFoodPosition({
      x: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasWidth,
      }),
      y: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasHeight,
      }),
    });
    setSnakeBody([
      {
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasWidth,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasHeight,
        }),
      },
    ]);
  }, [canvasHeight, canvasWidth]);

  const moveSnake = () => {
    let snakeBodyAfterMove: Position[] | undefined;
    switch (direction) {
      case Direction.UP:
        if (snakeHeadPosition.y < 0 + SEGMENT_SIZE) {
          onGameOver();
          return;
        }
        snakeBodyAfterMove = moveUp(snakeBody);
        break;
      case Direction.DOWN:
        if (snakeHeadPosition.y > canvasHeight! - 10) {
          onGameOver();
          return;
        }
        snakeBodyAfterMove = moveDown(snakeBody);

        break;
      case Direction.LEFT:
        if (snakeHeadPosition.x < 0 + SEGMENT_SIZE) {
          onGameOver();
          return;
        }
        snakeBodyAfterMove = moveLeft(snakeBody);
        break;
      case Direction.RIGHT:
        if (snakeHeadPosition.x > canvasWidth! - 10) {
          onGameOver();
          return;
        }
        snakeBodyAfterMove = moveRight(snakeBody);
        break;
    }

    if (snakeBodyAfterMove) {
      const isGameOver = hasSnakeEatenItself(snakeBodyAfterMove);
      if (isGameOver) {
        onGameOver();
      }
    }

    if (
      direction !== undefined &&
      foodPosition &&
      willSnakeEatFood({
        foodPosition,
        snakeHeadPosition,
        direction,
      })
    ) {
      setSnakeBody([
        ...snakeBodyAfterMove!,
        { x: foodPosition.x, y: foodPosition.y },
      ]);

      setFoodPosition({
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasWidth!,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasHeight!,
        }),
      });
    } else if (snakeBodyAfterMove) setSnakeBody(snakeBodyAfterMove);
  };

  const resetGameState = () => {
    setDirection(Direction.DOWN);
    setFoodPosition({
      x: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasWidth!,
      }),
      y: randomPositionOnGrid({
        gridSize: SEGMENT_SIZE,
        threshold: canvasHeight!,
      }),
    });
    setSnakeBody([
      {
        x: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasWidth!,
        }),
        y: randomPositionOnGrid({
          gridSize: SEGMENT_SIZE,
          threshold: canvasHeight!,
        }),
      },
    ]);
  };

  useInterval(
    moveSnake,
    gameState === GameState.RUNNING ? MOVEMENT_SPEED : null
  );
  return {
    snakeBody,
    setSnakeBody,
    onKeyDownHandler,
    foodPosition,
    resetGameState,
  };
};

export default useGameLogic;
