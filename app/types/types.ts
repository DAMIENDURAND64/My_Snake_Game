export type Position = {
  x: number;
  y: number;
};

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum GameState {
  RUNNING,
  PAUSED,
  GAME_OVER,
}

export interface UseGameLogic {
  canvasWidth?: number;
  canvasHeight?: number;
  onGameOver: () => void;
  gameState: GameState;
}

export interface RandomPositionOnGrid {
  gridSize?: number;
  threshold: number;
}

export interface WillSnakeEatFood {
  snakeHeadPosition: Position;
  foodPosition: Position;
  direction: Direction;
}
