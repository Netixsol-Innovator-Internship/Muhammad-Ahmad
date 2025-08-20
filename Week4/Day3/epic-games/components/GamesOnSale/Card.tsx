import React from 'react'
import Image from 'next/image'

interface CardProps {
  image: string,
  title: string,
  saleInPercent: string,
  newPrice: string,
  oldPrice: string
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <article className='cursor-pointer !min-w-[200px] relative rounded'>
      
      <div className='absolute top-0 right-0 bottom-0 left-0 bg-transparent hover:bg-white/5'></div>
      
      <Image
        src={props.image}
        alt={props.title}
        width={165}
        height={250}>
      </Image>

      <h3 className='my-2'>{props.title}</h3>

      <div className="my-2 flex items-center space-x-2">
        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">{props.saleInPercent}</span>
        <span className="text-gray-400 line-through text-sm">{props.oldPrice}</span>
        <span className="text-white text-sm">{props.newPrice}</span>
      </div>
    </article>
  )
}

export default Card
