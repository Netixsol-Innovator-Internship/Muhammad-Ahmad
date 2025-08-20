"use client"
import React from 'react'
import useGamesStore from '@/stores/useGamesStore'

const TopGames: React.FC = () => {
  return (
    <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Top Sellers Column */}
          <div className="space-y-3">
             <div className='flex justify-between my-4'>
                <h2 className=" mb-4 font-semibold text-gray-200">Top Sellers</h2>
                <button className='border-1 px-1 border-[#F5F5F5]'>view more</button>
            </div>
            {useGamesStore(s => s.sale).slice(0,5).map((g, i) => (
              <article key={i} className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={g.src} alt={g.title || 'Game'} className="w-full h-full object-cover rounded-l-lg" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-around">
                    <h3 className="text-white text-sm mb-1">{g.title || 'Untitled'}</h3>
                    <p className='text-white text-sm mb-1'>{g.discountPrice ? `₹${g.discountPrice}` : (g.price ? `₹${g.price}` : '')}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Best Sellers Column */}
          <div className="space-y-3">
            <div className='flex justify-between my-4'>
                <h2 className="mb-4 font-semibold text-gray-200">Best Seller</h2>
                <button className='border-1 px-1 border-[#F5F5F5]'>view more</button>
            </div>
            {useGamesStore(s => s.featured).slice(0,5).map((g, i) => (
              <article key={i} className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={g.src} alt={g.title || 'Featured'} className="w-full h-full object-cover rounded-l-lg" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-around">
                    <h3 className="text-white text-sm mb-1">{g.title || 'Untitled'}</h3>
                    <p className='text-white text-sm mb-1'>{g.price ? `₹${g.price}` : ''}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Top Upcoming Column */}
          <div className="space-y-3">
             <div className='flex justify-between my-4'>
                <h2 className=" mb-4 font-semibold text-gray-200">Top Upcoming Game</h2>
                <button className='border-1 px-1 border-[#F5F5F5]'>view more</button>
            </div>
            {useGamesStore(s => s.heroSecondary).slice(0,5).map((g, i) => (
              <article key={i} className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={g.src} alt={g.title || 'Upcoming'} className="w-full h-full object-cover rounded-l-lg" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-around">
                    <h3 className="text-white text-sm mb-1">{g.title || 'Untitled'}</h3>
                    <p className='text-white text-sm mb-1'></p>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
    </section>
  )
}

export default TopGames