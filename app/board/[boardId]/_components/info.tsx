import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const Info = (props: Props) => {
  return <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
    Todo : Info about the board</div>;
};

export default Info;

Info.Skeleton = function InfoSkeleton() {
  return <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md animate-pulse w-[300px]">
    <Skeleton className="h-full w-full bg-muted-400" />
  </div>;
}
