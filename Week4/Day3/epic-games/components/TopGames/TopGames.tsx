"use client"
import React from 'react'
// Hardcoded data for TopGames (images expected under public/images/...)
const TOP_SELLERS = [
  { src: '/images/top-sellers/ghostbusters.png', title: 'Ghostbusters: Spirits Unleashed', price: '₹3,999' },
  { src: '/images/top-sellers/gta-v.png', title: 'GTA V : Premier edition', price: '₹2,499' },
  { src: '/images/top-sellers/daysgone.png', title: 'Daysgone', price: '₹2,699' },
  { src: '/images/top-sellers/last-of-us.png', title: 'Last of Us', price: '₹1,499' },
  { src: '/images/top-sellers/god-of-war.png', title: 'God of War 4', price: '₹2,659' },
]

const BEST_SELLERS = [
  { src: '/images/best-sellers/fortnite.png', title: 'Fortnite', price: 'Free' },
  { src: '/images/best-sellers/gta-v.png', title: 'GTA V : Premier edition', price: '₹2,499' },
  { src: '/images/best-sellers/igi.png', title: 'IGI 2', price: '₹499' },
  { src: '/images/best-sellers/tomb-raider.png', title: 'Tomb Raider', price: '₹2,499' },
  { src: '/images/best-sellers/uncharted.png', title: 'Uncharted 4', price: '₹3,499' },
]

const TOP_UPCOMING = [
  { src: '/images/top-upcoming/hogwarts-legacy.png', title: 'Hogwarts Legacy', price: '₹2,999' },
  { src: '/images/top-upcoming/uncharted.png', title: 'Uncharted Legacy of Thieves', price: '₹4,499' },
  { src: '/images/top-upcoming/assasin.png', title: "Assassin's Creed Mirage", price: '₹3,499' },
  { src: '/images/top-upcoming/last-of-us.png', title: 'Last of Us II', price: '₹3,999' },
  { src: '/images/top-upcoming/dead-by-daylight.png', title: 'Dead by Daylight', price: 'coming soon' },
]

const TopGames: React.FC = () => {
  return (
    <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Top Sellers Column */}
          <div className="space-y-3">
       <div className='flex justify-between my-4'>
        <h2 className=" mb-4 font-semibold text-gray-200">Top Sellers</h2>
        <button className='border-1 px-1 border-[#F5F5F5] cursor-pointer'>view more</button>
      </div>
            {TOP_SELLERS.map((g, i) => (
              <article key={i} className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={g.src} alt={g.title} className="w-full h-full object-cover rounded-l-lg" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-around">
                    <h3 className="text-white text-sm mb-1">{g.title}</h3>
                    <p className='text-white text-sm mb-1'>{g.price}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Best Sellers Column */}
          <div className="space-y-3">
      <div className='flex justify-between my-4'>
        <h2 className="mb-4 font-semibold text-gray-200">Best Seller</h2>
        <button className='border-1 px-1 border-[#F5F5F5] cursor-pointer'>view more</button>
      </div>
            {BEST_SELLERS.map((g, i) => (
              <article key={i} className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={g.src} alt={g.title} className="w-full h-full object-cover rounded-l-lg" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-around">
                    <h3 className="text-white text-sm mb-1">{g.title}</h3>
                    <p className='text-white text-sm mb-1'>{g.price}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Top Upcoming Column */}
          <div className="space-y-3">
       <div className='flex justify-between my-4'>
        <h2 className=" mb-4 font-semibold text-gray-200">Top Upcoming Game</h2>
        <button className='border-1 px-1 border-[#F5F5F5] cursor-pointer'>view more</button>
      </div>
            {TOP_UPCOMING.map((g, i) => (
              <article key={i} className="bg-neutral-900/50 rounded-lg overflow-hidden hover:bg-neutral-800/70 transition-all duration-200 cursor-pointer border border-neutral-800/50">
                <div className="flex">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={g.src} alt={g.title} className="w-full h-full object-cover rounded-l-lg" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-around">
                    <h3 className="text-white text-sm mb-1">{g.title}</h3>
                    <p className='text-white text-sm mb-1'>{g.price}</p>
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