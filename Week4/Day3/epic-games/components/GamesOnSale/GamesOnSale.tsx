"use client"

// Next compnonents
import React from 'react'
import Image from 'next/image'

// React icons
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

// Swiper Configuration
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

// My components
import Card from '@/components/GamesOnSale/Card'

const gamesOnSale = [
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
    {
        image: "/images/valorant-GOS.png",
        title: "Valorant",
        saleInPercent: "-10%",
        newPrice: "₹850",
        oldPrice: "₹900",
    },
];

const GamesOnSale = () => {
    const prevRef = React.useRef<HTMLButtonElement>(null);
    const nextRef = React.useRef<HTMLButtonElement>(null);
    return (
        <section className="my-8 text-white">
            <div className='flex justify-between items-center'>
                <div className="flex gap-2 items-center my-6">
                    <h2 className="mt-1">Game on Sale</h2>
                    <Image
                        src="/svgs/expand-arrow.svg"
                        alt="Expand"
                        width={12}
                        height={12}>
                    </Image>
                </div>
                <div className='flex gap-3'>
                    <button ref={prevRef} className="bg-transparent">
                        <SlArrowLeftCircle className='hover:fill-white/70 w-4' />
                    </button>
                    <button ref={nextRef} className="bg-transparent">
                        <SlArrowRightCircle className='hover:fill-white/70 w-4' />
                    </button>
                </div>
            </div>
            
            {/* Games on Sale Card */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                slidesPerView={5}
                spaceBetween={16}
                className="mySwiper"
            >
                {gamesOnSale.map((game, idx) => (
                    <SwiperSlide key={idx}>
                        <Card
                            image={game.image}
                            title={game.title}
                            saleInPercent={game.saleInPercent}
                            newPrice={game.newPrice}
                            oldPrice={game.oldPrice}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default GamesOnSale
