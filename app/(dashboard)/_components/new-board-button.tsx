"use client"
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

interface NewBoardButtonProps {
    orgId : string;
    disabled?: boolean;
};

const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {
    const {mutate, pending} = useApiMutation(api.board.create);
    const router = useRouter();
    
    const handleClick = () => {
        if(!orgId) return;
        mutate({
            orgId,
            title: "Untitled board",
        }).then((id) => {
           toast.success("Board created");
           router.push(`/board/${id}`);
        }).catch((error) => {
            toast.error("Failed to create board");
            console.error(error);
    })
}

  return <button disabled={pending || disabled}
  onClick = {handleClick}
  className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center p-6",
    (pending || disabled) && "cursor-not-allowed opacity-75 hover:bg-blue-600"
  )}
  
  >
    <div></div>
    <Plus className="h-12 w-12 text-white stroke-1"/>
    <p className="text-white text-sm font-light">
        New board
    </p>
  </button>;
};

export default NewBoardButton;
