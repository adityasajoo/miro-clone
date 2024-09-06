"use client";
import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Cursor from "./cursor";

type Props = {};

export const Cursors = () =>{
    const ids = useOthersConnectionIds();
    
    return (
        <>
            {ids.map((id) => (
                <Cursor 
                key={id}
                connectionId={id}
                />
            ))}
        </>
    )

}

const CursorsPresence = memo((props: Props) => {
    return( <>
    <Cursors />
    </>);
  });

  CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence;
