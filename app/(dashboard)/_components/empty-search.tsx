import Image from "next/image";
import React from "react";

type Props = {};

const EmptySearch = (props: Props) => {
  return<div className="h-full flex flex-col items-center justify-center">
  <Image
  src="/empty-search.svg"
  alt="Empty organization"
  width={300}
  height={300}
  />
  <h2 className="text-2xl font-semibold mt-6">
      No results found
  </h2>
  <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
  </p>
  </div>;
};

export default EmptySearch;
