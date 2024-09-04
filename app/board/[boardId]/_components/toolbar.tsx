import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const Toolbar = (props: Props) => {
  return <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
    <div className="bg-white rounded-md p-1.5 gap-y-1 flex-col items-center shadow-md">
        <div>Pencil</div>
        <div>Brush</div>
        <div>Eraser</div>
        <div>Text</div>
        <div>Shapes</div>
    </div>
    <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>Undo</div>
        <div>Redo</div>
    </div>
  </div>;
};

export default Toolbar;

Toolbar.Skeleton = function ToolbarSkeleton() {
  return <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px]  shadow-md rounded-md">
      <Skeleton className="h-12 w-full bg-muted-400" />
    </div>
}



