import React, { RefObject, forwardRef, useEffect } from "react";

type CanvasProps = {
  draw: (ctx: CanvasRenderingContext2D) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  function CanvasComponent({ draw, ...rest }, canvasRef) {
    useEffect(() => {
      if (!canvasRef) return;
      const canvas = (canvasRef as RefObject<HTMLCanvasElement>).current;

      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      draw(context);
      return () => context.clearRect(0, 0, window.innerWidth, 400);
    }, [draw, canvasRef]);

    if (!canvasRef) return null;

    return (
      <canvas
        ref={canvasRef as any}
        className="h-full w-full border-[10px] border-black"
        {...rest}
      />
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
