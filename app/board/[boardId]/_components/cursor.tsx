"use client";
import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import React, { memo } from "react";

interface CursorProps  {
    connectionId: number;
};

const Cursor = memo(({connectionId
}: CursorProps) => {
    const info = useOther(connectionId, (user)=>{
        return user.info as {name?: string, picture?: string};

    });

    const cursor = useOther(connectionId, (user)=>user.presence.cursor);

    const name = info?.name || "Teammate";

    if(!cursor) {
        return null;
    }

    const {x,y} = cursor;

    return <foreignObject 
        style={{
            transform: `translateX(${x}px) translateY(${y}px)`,
        }}
        height={50}
        width={name.length * 10 + 24}
        className="absolute drop-shadow-md"
    >
        <MousePointer2 className="w-5 h-5"
            style={{
                fill: connectionIdToColor(connectionId),
                color: connectionIdToColor(connectionId),
            }}
        />
        <div className="left-5 absolute px-1.5 py-0.5 rounded-md font-semibold text-white text-xs"
            style={{
                backgroundColor: connectionIdToColor(connectionId),
            }}
        >
            {name}
        </div>
    </foreignObject>;
  })

Cursor.displayName = "Cursor";

export default Cursor;
