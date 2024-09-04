"use client";
import React from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CanvasLoading from "./canvas-loading";
import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
};

const Canvas = ({boardId}: CanvasProps) => {
  const info = useSelf(me=> me.info);

  console.log(info);
  return <main className="h-full w-full relative bg-neutral-100 touch-none">
    <Info/>
    <Participants/>
    <Toolbar/>
  </main>;
};

export default Canvas;
