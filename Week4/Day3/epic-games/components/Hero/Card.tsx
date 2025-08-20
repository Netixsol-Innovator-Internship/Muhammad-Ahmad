import React from 'react'
import Image from 'next/image'

interface cardProps {
    image: string
    title: string
}

const Card: React.FC<cardProps> = (props) => {
    return (
        <div>
            <div className='flex items-center gap-4 cursor-pointer w-full p-3 hover:bg-[#252525] rounded-2xl'>
                <Image
                    src={props.image}
                    alt={props.title}
                    width={60}
                    height={80}
                    className="rounded-md">
                </Image>
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

export default Card
