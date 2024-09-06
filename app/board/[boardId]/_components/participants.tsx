"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { useOther, useOthersMapped, useSelf } from "@liveblocks/react/suspense";
import React from "react";
import UserAvatar from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";
const MAX_SHOWN_USERS = 2;

type Props = {};

const Participants = (props: Props) => {
  const users = useOthersMapped(
    (other) =>{
      const connectionId = other.connectionId;
        const info = other.info as {name: string, picture: string};

      return {connectionId, info}
    });

      const currentUser = useSelf(me => {
        const info = me.info as {name: string, picture: string};
        return {connectionId: me.connectionId, info}
      });
  const hasMore = users.length > MAX_SHOWN_USERS;


  return <div className="top-2 right-2 absolute flex items-center bg-white shadow-md p-3 rounded-md h-12"> 
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(([connectionId, data])=>(
          <UserAvatar 
            key={connectionId}
            src={data.info.picture}
            name={data.info.name}
            fallback={data.info.name[0]||"T"}
            borderColor={connectionIdToColor(connectionId)}
            // borderColor={currentUser.connectionId === connectionId ? 'blue' : 'transparent'}
          />
))}
{currentUser && <UserAvatar
  src={currentUser.info?.picture}
  name={`${currentUser.info?.name} (You)`}
  fallback={currentUser.info.name[0]||"T"}
  borderColor={connectionIdToColor(currentUser.connectionId)}
/>}

{hasMore && (
  <UserAvatar
    name={`+${users.length - MAX_SHOWN_USERS} more`}
    fallback={`+${users.length - MAX_SHOWN_USERS}`}
    />

)}

      </div>
  </div>;
};

export default Participants;

Participants.Skeleton = function ParticipantsSkeleton() {
  return <div className="top-2 right-2 absolute flex items-center bg-white shadow-md p-3 rounded-md w-[100px] h-12 animate-pulse">
    <Skeleton className="bg-muted-400 w-full h-full" />
  </div>;
} 
