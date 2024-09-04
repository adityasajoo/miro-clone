"use client";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";

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
        </div>
        <Footer 
            isFavorite={isFavorite}
            authorLabel={authorLabel}
            createAtLabel={createAtLabel}
            title = {title}
            onClick={()=>{}}
            disabled={false}
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