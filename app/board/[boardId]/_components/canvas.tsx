"use client";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useCanUndo, useHistory } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
};

const Canvas = ({boardId}: CanvasProps) => {
  const [canvasSate, setCanvasState] =  useState<CanvasState>({
    mode: CanvasMode.None
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanUndo();



  return <main className="relative bg-neutral-100 w-full h-full touch-none">
    <Info boardId={boardId}/>
    <Participants/>
    <Toolbar canvasState={canvasSate}
    setCanvasState={setCanvasState}
    canRedo={canRedo}
    canUndo={canUndo}
    redo={history.redo}
    undo={history.undo}
    />
  </main>;
};

export default Canvas;
