"use client";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import { useCanUndo, useHistory, useMutation } from "@liveblocks/react/suspense";
import { useCallback, useState } from "react";
import CursorsPresence from "./cursors-presence";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { pointerEventsToCanvasPoint } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
};

const Canvas = ({boardId}: CanvasProps) => {
  const [canvasSate, setCanvasState] =  useState<CanvasState>({
    mode: CanvasMode.None
  });
  const [camera, setCamera] = useState<Camera>({x: 0, y: 0,});

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanUndo();

  const onWheel = useCallback((e:React.WheelEvent)=>{
    setCamera(camera => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
 
  },[])

  const onPointerMove = useMutation(({setMyPresence}, e:React.PointerEvent)=>{
    e.preventDefault();
    const current = pointerEventsToCanvasPoint(e, camera);
    setMyPresence({cursor: current});
  },[])

  const onPointerLeave = useMutation(({setMyPresence})=>{
    setMyPresence({cursor: null});
  },[])



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
    <svg className="w-[100vw] h-[100vh]"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <g
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`,
        }}
      >
        <CursorsPresence />
      </g>
    </svg>
  </main>;
};

export default Canvas;
