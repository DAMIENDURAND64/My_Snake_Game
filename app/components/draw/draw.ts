import { Postion } from "@/app/types/types";
import React from "react";

type DrawArgs = {
  ctx: CanvasRenderingContext2D;
  snakeBody: Postion[];
};

const SEGMENT_SIZE = 5;

const draw = ({ ctx, snakeBody }: DrawArgs) => {
  ctx.fillStyle = "blue";
  snakeBody.forEach((segment) =>
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  );
  return;
};

export default draw;
