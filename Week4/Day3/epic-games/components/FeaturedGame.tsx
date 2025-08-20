import React from 'react'
import Image from 'next/image'

interface FeaturedGameProps {
  image: string,
  title: string,
  description: string,
  price: string
}

const FeaturedGame:React.FC<FeaturedGameProps> = (props) => {
  return (
        <article className='text-white text-sm space-y-2 max-w-[320px] cursor-pointer'>
            <Image
                src={props.image}
                alt={props.title}
                height={200}
                width={315}
                className='object-cover object-center rounded-lg'>
            </Image>

            <h2 className='text-base'>{props.title}</h2>
            <p className='text-[#FFFFFF99]'>{props.description}</p>
            <p>{props.price}</p>
        </article>
  )
}

export default FeaturedGame
