"use client"
import React from 'react'
import Image from 'next/image'
import Card from "@/components/Hero/Card"
import useGamesStore from '@/stores/useGamesStore'

const Hero: React.FC = () => {
    return (
        <div className='mt-10'>
            {/* Header */}
            <div className="flex items-center gap-6 bg-black py-4 text-white">

                {/* Search Bar */}
                <div className="flex items-center gap-1 bg-neutral-900 rounded-lg px-3 py-2 w-64">
                    <Image
                        src="/svgs/search.svg"
                        alt="Search"
                        width={24}
                        height={28}
                        className='cursor-pointer'
                    >
                    </Image>
                    <input
                        type="text"
                        placeholder="Search Store"
                        className="bg-transparent focus:outline-none text-sm text-gray-300 placeholder-gray-400 w-full"
                    />
                </div>
                {/* Navigation  */}
                <nav className="hidden sm:flex items-center gap-6 text-sm">
                    <a href="#" className="text-white font-medium cursor-pointer">Discover</a>
                    <a href="#" className="text-gray-400 hover:text-white cursor-pointer">Browse</a>
                    <a href="#" className="text-gray-400 hover:text-white cursor-pointer">News</a>
                </nav>
            </div>

            {/* Hero Section */}
            <section className='mt-8 grid md:grid-cols-[3fr_1fr] md:gap-6'>

                {/* Main Section */}
                {(() => {
                    const heroMain = useGamesStore(s => s.heroMain)
                    const bg = heroMain?.[0]?.src || '/images/god-of-war.jpg'
                    const description = heroMain?.[0]?.description || 'Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive'
                    return (
                        <div className='h-[432px] flex items-end rounded-3xl bg-center bg-cover' style={{ backgroundImage: `url(${bg})` }}>
                            <div className='text-white text-[15px] flex flex-col gap-1 px-4 sm:px-10 pb-8 sm:max-w-[80%] md:max-w-[60%]'>
                                <p className='font-light'>PRE-PURCHASE AVAILABLE</p>
                                <p>{description}</p>
                                <button className='bg-white text-black mt-5 rounded-md py-3 px-4 w-fit cursor-pointer'>PRE-PURCHASE NOW</button>
                            </div>
                        </div>
                    )
                })()}

                {/* Secondary Section. Cards */}
                <div className='hidden md:block text-white'>
                    {useGamesStore(s => s.heroSecondary).map((h, idx) => (
                        <Card key={idx} image={h.src} title={h.title || 'Untitled'} />
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Hero
