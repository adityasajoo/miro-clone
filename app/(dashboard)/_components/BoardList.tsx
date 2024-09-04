"use client"
import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyBoards from "./empty-boards";

interface BoardListProps  {
    ordId: string;
    query: {
        search?: string;
        favorites?: boolean;
    }
};

const BoardList = ({ordId,query}: BoardListProps) => {
    const data = [];

    if(!data.length && query.search){
        return <EmptySearch/>;
    }

    if(!data.length && query.favorites){
        return <EmptyFavorites />;
    }

    if(!data.length){
        return <EmptyBoards/>;
    }

  return <div>BoardList</div>;
};

export default BoardList;
