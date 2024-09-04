"use client"
import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps { 
    children: ReactNode, 
    roomId:string 
    fallback: NonNullable<ReactNode>|null;
}

export function Room({ children, roomId, fallback }:RoomProps) {
    return (
      <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}>
        <RoomProvider id={roomId} initialPresence={{}}>
          <ClientSideSuspense fallback={fallback}>
            {() => children}
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    );
  }