import { RectangleLayer } from "@/types/canvas";
import React from "react";

interface RectangleProps {
  id: string;
  layer : RectangleLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor: string | null;
};

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  return <rect 
    className="drop-shadow-md"
    onPointerDown={(e)=>onPointerDown(e, id)}
    style={{
      transform: `translate(${x}px, ${y}px)`,
    }}
    x={0}
    y={0}
    width={width} 
    height={height}
    fill="#000"
    stroke={"transparent"}
    strokeWidth={1}
    />;
};

export default Rectangle;
