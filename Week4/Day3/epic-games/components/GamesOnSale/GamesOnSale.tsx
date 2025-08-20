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
import useGamesStore from '@/stores/useGamesStore'

const GamesOnSale = () => {
    const prevRef = React.useRef<HTMLButtonElement>(null);
    const nextRef = React.useRef<HTMLButtonElement>(null);
    const gamesOnSale = useGamesStore((s) => s.sale)
    const totalSlides = gamesOnSale.length;
    const shouldCenter = totalSlides < 5; // center when fewer than 5 cards
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
                centeredSlides={shouldCenter}
                centeredSlidesBounds={shouldCenter}
                breakpoints={{
                    // when window width is >= 320px (mobile)
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    800: {
                        slidesPerView: 4,
                        spaceBetween: 14
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 16
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 16
                    }
                }}
                spaceBetween={16}
                className="mySwiper"
            >
                {gamesOnSale.map((game, idx) => {
                    const src = (game as any).src || (game as any).image || ''
                    const title = (game as any).title || 'Untitled'
                    const saleInPercent = (game as any).discount || (game as any).saleInPercent || ''
                    const newPrice = (game as any).discountPrice ? `₹${(game as any).discountPrice}` : ((game as any).newPrice || ((game as any).price ? `₹${(game as any).price}` : ''))
                    const oldPrice = (game as any).oldPrice ? `₹${(game as any).oldPrice}` : ''
                    return (
                        <SwiperSlide key={idx}>
                            <Card
                                image={src}
                                title={title}
                                saleInPercent={saleInPercent}
                                newPrice={newPrice}
                                oldPrice={oldPrice}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}

export default GamesOnSale
