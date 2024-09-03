"use client"

import Hint from "@/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react"

import React from "react";

type Props = {};

const NewButton = (props: Props) => {
  return <Dialog>
    <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="Create Organization" side="right" align="start" sideOffset={12}>
            <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                <Plus className="text-white"/>
            </button>
          </Hint>
        </div>
    </DialogTrigger>
    <DialogContent className="p-0 bg-transparent border-none max-w-[400px]">
        <CreateOrganization/>
    </DialogContent>

  </Dialog>;
};

export default NewButton;
