import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import React from "react";

type Props = {};

const EmptyOrg = (props: Props) => {
  return <div className="h-full flex flex-col items-center justify-center">
    <Image 
    src="/empty-org.svg"
    alt="Empty organization"
    width={300}
    height={300}
    />
    <h2 className="text-2xl font-semibold mt-6">
        Welcome to Collab Boards
    </h2>
    <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
    </p>
    <div className="mt-6">
        <Dialog>
            <DialogTrigger asChild>
                <Button className="" size="lg">
                    Create organization
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization/>
            </DialogContent>
        </Dialog>
    </div>
  </div>;
};

export default EmptyOrg;
