"use client";

import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Footer from "./footer";
import Overlay from "./overlay";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}:BoardCardProps) => {

    const {userId} = useAuth();

    const authorLabel = userId === authorId ? "You" : authorName;

    const createAtLabel = formatDistanceToNow(createdAt, {addSuffix: true});

    const {mutate:onFavorite, pending:pendingFavorite} =  useApiMutation(api.board.favorite);
    const {mutate:onUnFavorite, pending:pendingUnFavorite} =  useApiMutation(api.board.unfavorite)
    ;
 
    const toggleFavorite = () => {
          if(isFavorite){
               onUnFavorite({id}).catch(()=> toast.error("Failed to unfavorite board"));
          } else {
               onFavorite({id, orgId:orgId}).catch(()=> toast.error("Failed to favorite board"));
          }
    }


  return (
  <Link href={`/board/${id}`}>
    <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
            <Image 
                src={imageUrl}
                alt={title}
                fill
                className="object-fit"
            />
            <Overlay />
            <Actions 
                id={id}
                title={title}
                side="right"
                // sideOffset={8}
                >
                  <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                    <MoreHorizontal 
                      className="text-white opacity-75 hover:opacity-100 transition-opacity"
                    />
                  </button>
              </Actions>
        </div>
        <Footer 
            isFavorite={isFavorite}
            authorLabel={authorLabel}
            createAtLabel={createAtLabel}
            title = {title}
            onClick={toggleFavorite}
            disabled={pendingFavorite||pendingUnFavorite}
            />
    </div>
    </Link>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden animate-pulse">
        <Skeleton className="h-full w-full"/>

    </div>
  );
}