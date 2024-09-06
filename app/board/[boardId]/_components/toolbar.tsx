import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ToolButton from "./tool-button";
import { Circle, MousePointer2, Pencil, Redo, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface ToolbarProps  {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  undo : () => void;
  redo : () => void;
  canUndo : boolean;
  canRedo : boolean;
};

const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return <div className="top-[50%] left-2 absolute flex flex-col gap-y-4 -translate-y-[50%]">
    <div className="flex flex-col items-center bg-white shadow-md p-1.5 rounded-md">
       <ToolButton label="Select"
       icon={MousePointer2}
        onClick={()=>setCanvasState({mode: CanvasMode.None})}
        isActive={canvasState.mode === CanvasMode.None||
        canvasState.mode === CanvasMode.Translating||
        canvasState.mode === CanvasMode.SelectionNet||
        canvasState.mode === CanvasMode.Pressing||
        canvasState.mode === CanvasMode.Resizing
        }
       />
        <ToolButton label="Text"
       icon={Type}
        onClick={()=>setCanvasState({
          mode: CanvasMode.Inserting,
          LayerType: LayerType.Text
          })}
        isActive={canvasState.mode === CanvasMode.Inserting && canvasState.LayerType === LayerType.Text}
       />
       <ToolButton label="Sticky Note"
       icon={StickyNote}
        onClick={()=>{
          setCanvasState({
            mode: CanvasMode.Inserting,
            LayerType: LayerType.Note
          })
        }}
        isActive={canvasState.mode === CanvasMode.Inserting && canvasState.LayerType === LayerType.Note}
       />
       <ToolButton label="Rectangle"
       icon={Square}
        onClick={()=>{
          setCanvasState({
            mode: CanvasMode.Inserting,
            LayerType: LayerType.Rectangle
          })
        }}
        isActive={canvasState.mode === CanvasMode.Inserting && canvasState.LayerType === LayerType.Rectangle}
       />
       <ToolButton label="Ellipse"
       icon={Circle}
        onClick={()=>{
          setCanvasState({
            mode: CanvasMode.Inserting,
            LayerType: LayerType.Ellipse
          })
        }}
        isActive={canvasState.mode === CanvasMode.Inserting && canvasState.LayerType === LayerType.Ellipse}
       />
        <ToolButton label="Pen"
       icon={Pencil}
        onClick={()=>{
          setCanvasState({
            mode: CanvasMode.Pencil
          })
        }}
        isActive={canvasState.mode === CanvasMode.Pencil}
       />


    </div>
    <div className="flex flex-col items-center bg-white shadow-md p-1.5 rounded-md">
    <ToolButton label="Undo"
       icon={Undo2}
        onClick={undo}
        isActive={false}
        isDisabled={!canUndo}
       />
         <ToolButton label="Redo"
       icon={Redo2}
        onClick={redo}
        isActive={false}
        isDisabled={!canRedo}

       />
    </div>
  </div>;
};

export default Toolbar;

Toolbar.Skeleton = function ToolbarSkeleton() {
  return <div className="top-[50%] left-2 absolute flex flex-col gap-y-4 bg-white shadow-md rounded-md w-[52px] h-[360px] -translate-y-[50%]">
      <Skeleton className="bg-muted-400 w-full h-12" />
    </div>
}



