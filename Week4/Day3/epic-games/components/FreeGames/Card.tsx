import React from 'react';
import Image from 'next/image';

interface FreeGameCardProps {
  image: string;
  title: string;
  dateRange: string;
}

const Card: React.FC<FreeGameCardProps> = ({ image, title, dateRange }) => {
  return (
    <article className="bg-transparent rounded flex flex-col min-w-[180px] max-w-[220px]">
      <div className="overflow-hidden rounded w-full flex justify-center items-center h-[260px]">
        <Image
          src={image}
          alt={title}
          width={180}
          height={260}
          className="object-cover w-full h-full rounded"
        />
      </div>
      <h3 className="mt-3 mb-1 text-white text-base font-semibold w-full truncate">{title}</h3>
      <p className="text-gray-300 text-xs w-full">{dateRange}</p>
    </article>
  );
};

export default Card;
