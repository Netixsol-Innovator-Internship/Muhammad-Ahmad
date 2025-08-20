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
    
    // Show navigation buttons only when there are slides to navigate
    const showNavigation = totalSlides > 1;
    return (
        <section className="my-8 text-white">
            <style jsx>{`
                .centered-swiper .swiper-wrapper {
                    justify-content: center !important;
                }
                .mySwiper .swiper-slide {
                    width: auto !important;
                }
            `}</style>
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
                {showNavigation && (
                    <div className='flex gap-3'>
                        <button 
                            ref={prevRef} 
                            className="bg-transparent hover:bg-white/10 p-2 rounded-full transition-colors duration-200 swiper-button-prev-custom"
                        >
                            <SlArrowLeftCircle className='hover:fill-white/70 w-6 h-6 fill-white' />
                        </button>
                        <button 
                            ref={nextRef} 
                            className="bg-transparent hover:bg-white/10 p-2 rounded-full transition-colors duration-200 swiper-button-next-custom"
                        >
                            <SlArrowRightCircle className='hover:fill-white/70 w-6 h-6 fill-white' />
                        </button>
                    </div>
                )}
            </div>
            
            {/* Games on Sale Card */}
            <Swiper
                modules={[Navigation]}
                navigation={showNavigation ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                } : false}
                onBeforeInit={(swiper) => {
                    if (showNavigation) {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                onInit={(swiper) => {
                    if (showNavigation) {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.update();
                    }
                }}
                centeredSlides={shouldCenter}
                centeredSlidesBounds={shouldCenter}
                slidesPerView="auto"
                breakpoints={{
                    // when window width is >= 320px (mobile)
                    320: {
                        slidesPerView: Math.min(1, totalSlides),
                        spaceBetween: 10,
                        centeredSlides: totalSlides < 1 ? true : false
                    },
                    400: {
                        slidesPerView: Math.min(2, totalSlides),
                        spaceBetween: 10,
                        centeredSlides: totalSlides < 2 ? true : false
                    },
                    600: {
                        slidesPerView: Math.min(3, totalSlides),
                        spaceBetween: 10,
                        centeredSlides: totalSlides < 3 ? true : false
                    },
                    800: {
                        slidesPerView: Math.min(4, totalSlides),
                        spaceBetween: 14,
                        centeredSlides: totalSlides < 4 ? true : false
                    },
                    1024: {
                        slidesPerView: Math.min(5, totalSlides),
                        spaceBetween: 16,
                        centeredSlides: totalSlides < 5 ? true : false
                    },
                    1280: {
                        slidesPerView: Math.min(5, totalSlides),
                        spaceBetween: 16,
                        centeredSlides: totalSlides < 5 ? true : false
                    }
                }}
                spaceBetween={16}
                className={`mySwiper ${shouldCenter ? 'centered-swiper' : ''}`}
                watchOverflow={true}
                observer={true}
                observeParents={true}
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
