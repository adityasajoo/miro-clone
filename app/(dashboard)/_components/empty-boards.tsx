"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useMutation } from "convex/react";
import {api} from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

type Props = {};

const EmptyBoards = (props: Props) => {
  // const create = useMutation(api.board.create);

  const {mutate, pending} = useApiMutation(api.board.create);

  const {organization} = useOrganization();

  const onClick = () =>{
    if(!organization) return;
    mutate({
      orgId: organization.id,
      title: "New board",
    }).then((id)=>{
      toast.success("Board created");
    }).catch((error)=>{
      toast.error("Failed to create board");
      console.error(error);
    });
  }

  return<div className="h-full flex flex-col items-center justify-center">
  <Image
  src="/empty-boards.svg"
  alt="Empty organization"
  width={300}
  height={300}
  />
  <h2 className="text-2xl font-semibold mt-6">
      No boards found
  </h2>
  <p className="text-muted-foreground text-sm mt-2">
    Start by creating a board!
  </p>
  <div className="mt-6">
    <Button disabled={pending} className="" size="lg" onClick={onClick}>
        Create board
    </Button>
  </div>
  </div>;
};

export default EmptyBoards;
