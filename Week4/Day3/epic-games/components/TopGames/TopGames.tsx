import React from 'react'
import BestSellerCard from './BestSellerCard'
import TopSellerCard from './TopSellerCard'
import TopUpcomingCard from './TopUpcomingCard'

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
            <TopSellerCard />
            <TopSellerCard />
            <TopSellerCard />
            <TopSellerCard />
            <TopSellerCard />
          </div>

          {/* Best Sellers Column */}
          <div className="space-y-3">
            <div className='flex justify-between my-4'>
                <h2 className="mb-4 font-semibold text-gray-200">Best Seller</h2>
                <button className='border-1 px-1 border-[#F5F5F5]'>view more</button>
            </div>
            <BestSellerCard />
            <BestSellerCard />
            <BestSellerCard />
            <BestSellerCard />
            <BestSellerCard />
          </div>

          {/* Top Upcoming Column */}
          <div className="space-y-3">
             <div className='flex justify-between my-4'>
                <h2 className=" mb-4 font-semibold text-gray-200">Top Upcoming Game</h2>
                <button className='border-1 px-1 border-[#F5F5F5]'>view more</button>
            </div>
            <TopUpcomingCard />
            <TopUpcomingCard />
            <TopUpcomingCard />
            <TopUpcomingCard />
            <TopUpcomingCard />
          </div>

        </div>
    </section>
  )
}

export default TopGames