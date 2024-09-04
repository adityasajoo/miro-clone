import Image from "next/image";
import React from "react";

type Props = {};

const EmptyFavorites = (props: Props) => {
  return<div className="h-full flex flex-col items-center justify-center">
  <Image
  src="/empty-fav.svg"
  alt="Empty organization"
  width={300}
  height={300}
  />
  <h2 className="text-2xl font-semibold mt-6">
      No favorites found
  </h2>
  <p className="text-muted-foreground text-sm mt-2">
        Try adding some boards to your favorites
  </p>
  </div>;
};

export default EmptyFavorites;
