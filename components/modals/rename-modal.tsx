"use client";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


const RenameModal = () => {
    const {
        initialValues,
        isOpen,
        onClose,
    } = useRenameModal();

    const {mutate, pending} = useApiMutation(api.board.update);

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();

      mutate({
        id: initialValues.id,
        title: title
      }).then(() => {
        toast.success('Board title updated');
        onClose();
      }).catch(() => {
        toast.error('Failed to update board title');
      })

    }
    
  return <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Edit board title</DialogTitle>
            <DialogDescription>Enter a new title for the board</DialogDescription>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input disabled={pending} required
                maxLength={60}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a new title"
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={pending}>
                    Save
                  </Button>
              </DialogFooter>
            </form>
        </DialogHeader>
    </DialogContent>
  </Dialog>;
};

export default RenameModal;
