import { Position } from "@/app/types/types";
import { SEGMENT_SIZE } from "@/app/utils/constants";

type DrawArgs = {
  ctx: CanvasRenderingContext2D;
  snakeBody: Position[];
  foodPosition: Position | undefined;
};

const draw = ({ ctx, snakeBody, foodPosition }: DrawArgs) => {
  if (foodPosition) {
    ctx.fillStyle = "red";
    ctx.fillRect(foodPosition.x, foodPosition.y, SEGMENT_SIZE, SEGMENT_SIZE);
  }
  ctx.fillStyle = "blue";
  snakeBody.forEach((segment) =>
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  );
};

export default draw;
