import Image from 'next/image';
import React from 'react';

type Props = {};

const Loading = (props: Props) => {
  return <div className="h-full w-full flex flex-col items-center justify-center">
    <Image
      src="/logo.svg"
      alt="Logo"
      width={120}
      height={120}
      className="animate-pulse duration-700"
    />
  </div>;
};

export default Loading;
