"use client";
import { Camera, CanvasMode, CanvasState, Color, Point, LayerType, XYWH, Side } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "@liveblocks/react/suspense";
import { useCallback, useMemo, useState } from "react";
import CursorsPresence from "./cursors-presence";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { connectionIdToColor, findIntersectingLayersWithRectangle, pointerEventsToCanvasPoint, resizeBounds } from "@/lib/utils";
import {nanoid} from "nanoid";
import { LiveObject } from "@liveblocks/client";
import LayerPreview from "./layer-preview";
import SelectionBox from "./selection-box";
import SelectionTools from "./selection-tools";


const MAX_LAYERS = 100;
interface CanvasProps {
  boardId: string;
};

const Canvas = ({boardId}: CanvasProps) => {
  const [canvasState, setCanvasState] =  useState<CanvasState>({
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

  const resizeSelectedLayer = useMutation(({storage, self}, point:Point)=>{
    if(canvasState.mode !== CanvasMode.Resizing){
      return;
    }

    const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point);

    const liveLayers = storage.get("layers");

    const layer = liveLayers.get(self.presence.selection[0]);

    if(layer){
      layer.update(bounds);
    }
  },[canvasState])

  const updateSelectionNet = useMutation(({storage,setMyPresence}, current:Point, origin:Point)=>{
    const layers = storage.get("layers").toImmutable();
    setCanvasState({
      mode: CanvasMode.SelectionNet,
      origin,
      current,
    })

    const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current);

    setMyPresence({selection: ids}, {addToHistory: true});
  },[layerIds])

  const startMultiSelection = useCallback((current:Point, origin:Point)=>{
    if(Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) >5 ){
      setCanvasState({mode: CanvasMode.SelectionNet,origin , current});
      return;
    }
  },[])

  const onResizeHandlerPointerDown=useCallback((corner:Side, initialBounds:XYWH)=>{
    history.pause();
    console.log("Resize Handler Pointer Down", corner)
    setCanvasState({mode: CanvasMode.Resizing, corner, initialBounds});


  },[history])

  const translateSelectedLayers = useMutation(({storage, self}, point:Point)=>{
    if(canvasState.mode !== CanvasMode.Translating){
      return;
    }

    const offset ={
      x:point.x - canvasState.current.x,
      y:point.y - canvasState.current.y,
    }

    const liveLayers = storage.get("layers");

    for(const id of self.presence.selection){
      const layer = liveLayers.get(id);
      if(layer){
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y, 
        });
      }
    }

    setCanvasState({mode: CanvasMode.Translating, current: point});

  },[canvasState])

  const unSelectLayers = useMutation(({setMyPresence, self})=>{
    if(self.presence.selection.length > 0){
      setMyPresence({selection: []}, {addToHistory: true});
    }
  },[])

  const onWheel = useCallback((e:React.WheelEvent)=>{
    setCamera(camera => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
 
  },[])

  const onPointerMove = useMutation(({setMyPresence}, e:React.PointerEvent)=>{
    e.preventDefault();
    const current = pointerEventsToCanvasPoint(e, camera);

    if(canvasState.mode === CanvasMode.Pressing){
      startMultiSelection(current, canvasState.origin);
    }

    else if(canvasState.mode === CanvasMode.SelectionNet){
      updateSelectionNet(current, canvasState.origin);
    }

    else if(canvasState.mode === CanvasMode.Translating){
      
      translateSelectedLayers(current);
    }
    else if(canvasState.mode === CanvasMode.Resizing){
      resizeSelectedLayer(current);
    }

    setMyPresence({cursor: current});
  },[canvasState, camera, resizeSelectedLayer, translateSelectedLayers])

  const onPointerLeave = useMutation(({setMyPresence})=>{
    setMyPresence({cursor: null});
  },[])

  const onPointerDown = useCallback((e:React.PointerEvent)=>{
    const point = pointerEventsToCanvasPoint(e, camera);
    if(canvasState.mode === CanvasMode.Inserting){
      return;
    }
    setCanvasState({mode: CanvasMode.Pressing, origin: point});
  },[camera, canvasState.mode, setCanvasState])

  const onPointerUp = useMutation(({}, e)=>{
    const point = pointerEventsToCanvasPoint(e, camera);

    if(canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){
      unSelectLayers();
      setCanvasState({mode: CanvasMode.None});
    }

    else if(canvasState.mode === CanvasMode.Inserting){
      insertLayer(canvasState.LayerType, point);
    }else{
      setCanvasState({mode: CanvasMode.None});
    }
    history.resume();
  },[camera, canvasState, insertLayer, history, setCanvasState, unSelectLayers])

  const onLayerPointerDown = useMutation(({setMyPresence, self}, e:React.PointerEvent, layerId:string)=>{
    if(canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting){
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventsToCanvasPoint(e, camera);

    if(!self.presence.selection.includes(layerId)){
      setMyPresence({selection: [layerId]}, {addToHistory: true});
    }

    setCanvasState({mode: CanvasMode.Translating, current:point});


  },[setCanvasState, camera, history, canvasState.mode, ])  

  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(()=>{
    const layerIdsToColorSelection:Record<string, string> = {};

    for (const user of selections){
      const [connectionId, selection] = user;

        for(const layerId of selection){
          layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
        }
    }

    return layerIdsToColorSelection;
  },[selections])


  return <main className="relative bg-neutral-100 w-full h-full touch-none">
    <Info boardId={boardId}/>
    <Participants/>
    <Toolbar canvasState={canvasState}
    setCanvasState={setCanvasState}
    canRedo={canRedo}
    canUndo={canUndo}
    redo={history.redo}
    undo={history.undo}
    />
    <SelectionTools
      camera={camera}
      setLastUsedColor={setLastUsedColor} 
      />
    <svg className="w-[100vw] h-[100vh]"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
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
          onLayerPointerDown={onLayerPointerDown}
          selectionColor={layerIdsToColorSelection[layerId]}
          />
        ))}
        <SelectionBox onResizeHandlerPointerDown={onResizeHandlerPointerDown} />
        {canvasState.mode === CanvasMode.SelectionNet && 
            canvasState.current!=null && (
              <rect 
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )
        }
        <CursorsPresence />
      </g>
    </svg>
  </main>;
};

export default Canvas;


