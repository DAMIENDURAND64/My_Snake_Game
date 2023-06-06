"use client";
import React, { useRef } from "react";
import Canvas from "./Canvas";
import draw from "./draw/draw";
import UseGameLogic from "./UseGameLogic";

type Props = {};

const Game = (props: Props) => {
  const { snakeBody, onKeyDownHandler } = UseGameLogic();
  const drawGame = (ctx: CanvasRenderingContext2D) => {
    draw({ ctx, snakeBody });
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDownHandler}
      className="w-auto flex flex-col items-center outline-none"
    >
      <Canvas draw={drawGame} ref={canvasRef} />
    </div>
  );
};

export default Game;
