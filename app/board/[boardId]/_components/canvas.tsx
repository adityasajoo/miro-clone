"use client";
import { Camera, CanvasMode, CanvasState, Color, Point, LayerType } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@liveblocks/react/suspense";
import { useCallback, useState } from "react";
import CursorsPresence from "./cursors-presence";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { pointerEventsToCanvasPoint } from "@/lib/utils";
import {nanoid} from "nanoid";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./layer-preview";


const MAX_LAYERS = 100;
interface CanvasProps {
  boardId: string;
};

const Canvas = ({boardId}: CanvasProps) => {
  const [canvasSate, setCanvasState] =  useState<CanvasState>({
    mode: CanvasMode.None
  });
  const [camera, setCamera] = useState<Camera>({x: 0, y: 0,});
  const layerIds = useStorage((storage) => storage.layerIds);
   const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
   });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(({storage, setMyPresence}, 
    layerType:LayerType.Rectangle|LayerType.Ellipse|LayerType.Text|LayerType.Text|LayerType.Note,
    position : Point
  )=>{
    const liveLayers = storage.get("layers");
    if(liveLayers.size >= MAX_LAYERS){
      return;
    }

    const liveLayerIds = storage.get("layerIds");
    const layerId = nanoid();
    const layer = new LiveObject({
      type : layerType,
      x: position.x,
      y: position.y,
      width: 100,
      height: 100,
      fill: lastUsedColor,
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({selection : [layerId]}, {addToHistory: true});

    setCanvasState({mode: CanvasMode.None});
  },[lastUsedColor])

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

  const onPointerUp = useMutation(({}, e)=>{
    const point = pointerEventsToCanvasPoint(e, camera);
    if(canvasSate.mode === CanvasMode.Inserting){
      insertLayer(canvasSate.LayerType, point);
    }else{
      setCanvasState({mode: CanvasMode.None});
    }
    history.resume();
  },[camera, canvasSate, insertLayer, history])



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
      onPointerUp={onPointerUp}
    >
      <g
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`,
        }}
      >
        {layerIds.map((layerId)=>(
          <LayerPreview 
          key={layerId}
          id={layerId}
          onLayerPointerDown={()=>{}}
          selectionColor="#FF1122"
          />
        ))}
        <CursorsPresence />
      </g>
    </svg>
  </main>;
};

export default Canvas;
