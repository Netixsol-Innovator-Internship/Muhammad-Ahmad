import React from 'react'
import Image from 'next/image'

const TopUpcomingCard: React.FC = () => {
  return (
    <div className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
      <div className="flex">
        {/* Game Image */}
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            src="/images/hogwarts-legacy-top-upcoming.png"
            alt="Hogwarts Legacy"
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        
        {/* Game Info */}
        <div className="flex-1 p-3 flex flex-col justify-around">
            <h3 className="text-white text-sm mb-1">Ghostbusters: Spirits Unleashed</h3>
            <p className='text-white text-sm mb-1'>₹3,499</p>
        </div>
      </div>
    </div>
  )
}

export default TopUpcomingCard