import { RandomPositionOnGrid } from "../types/types";

const randomPositionOnGrid = ({
  gridSize = 5,
  threshold,
}: RandomPositionOnGrid) =>
  Math.floor((Math.random() * threshold) / gridSize) * gridSize;

export default randomPositionOnGrid;
