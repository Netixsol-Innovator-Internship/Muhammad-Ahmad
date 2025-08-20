import React from 'react'
import Image from 'next/image'
import Card from "@/components/Hero/Card"

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
                        height={28}>
                    </Image>
                    <input
                        type="text"
                        placeholder="Search Store"
                        className="bg-transparent focus:outline-none text-sm text-gray-300 placeholder-gray-400 w-full"
                    />
                </div>
                {/* Navigation  */}
                <nav className="hidden sm:flex items-center gap-6 text-sm">
                    <a href="#" className="text-white font-medium">Discover</a>
                    <a href="#" className="text-gray-400 hover:text-white">Browse</a>
                    <a href="#" className="text-gray-400 hover:text-white">News</a>
                </nav>
            </div>

            {/* Hero Section */}
            <section className='mt-8 grid md:grid-cols-[3fr_1fr] md:gap-6'>

                {/* Main Section */}
                <div className='h-[432px] flex items-end rounded-3xl bg-[url(/images/god-of-war.jpg)] bg-center bg-cover'>
                    <div className='text-white text-[15px] flex flex-col gap-1 px-4 sm:px-10 pb-8 sm:max-w-[80%] md:max-w-[60%]'>
                        <p className='font-light'>PRE-PURCHASE AVAILABLE</p>
                        <p>Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive</p>
                        <button className='bg-white text-black mt-5 rounded-md py-3 px-4 w-fit'>PRE-PURCHASE NOW</button>
                    </div>
                </div>

                {/* Secondary Section. Cards */}
                <div className='hidden md:block text-white'>
                    <Card image="/images/god-of-war-card.jpg" title="God Of War 4"></Card>
                    <Card image="/images/god-of-war-card.jpg" title="God Of War 4"></Card>
                    <Card image="/images/god-of-war-card.jpg" title="God Of War 4"></Card>
                    <Card image="/images/god-of-war-card.jpg" title="God Of War 4"></Card>
                </div>
            </section>

        </div>
    )
}

export default Hero
