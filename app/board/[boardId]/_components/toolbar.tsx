import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ToolButton from "./tool-button";
import { Circle, MousePointer2, Pencil, Redo, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";

type Props = {};

const Toolbar = (props: Props) => {
  return <div className="top-[50%] left-2 absolute flex flex-col gap-y-4 -translate-y-[50%]">
    <div className="flex flex-col items-center bg-white shadow-md p-1.5 rounded-md">
       <ToolButton label="Select"
       icon={MousePointer2}
        onClick={()=>{}}
        isActive={false}
       />
        <ToolButton label="Text"
       icon={Type}
        onClick={()=>{}}
        isActive={false}
       />
       <ToolButton label="Sticky Note"
       icon={StickyNote}
        onClick={()=>{}}
        isActive={false}
       />
       <ToolButton label="Rectangle"
       icon={Square}
        onClick={()=>{}}
        isActive={false}
       />
       <ToolButton label="Ellipse"
       icon={Circle}
        onClick={()=>{}}
        isActive={false}
       />
        <ToolButton label="Pen"
       icon={Pencil}
        onClick={()=>{}}
        isActive={false}
       />


    </div>
    <div className="flex flex-col items-center bg-white shadow-md p-1.5 rounded-md">
    <ToolButton label="Undo"
       icon={Undo2}
        onClick={()=>{}}
        isActive={false}
        isDisabled={true}
       />
         <ToolButton label="Redo"
       icon={Redo2}
        onClick={()=>{}}
        isActive={false}
        isDisabled={true}

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



