import React from 'react'
import Image from 'next/image'
import Card from "@/components/FreeGames/Card"

const FreeGames = () => {
    return (
        <section className='bg-[#2A2A2A] px-10 py-6'>
            <div className='text-white flex justify-between'>
                <div className='flex gap-4 items-center'>
                    <Image
                        src="/svgs/gift.svg"
                        alt='Free Games'
                        width={33}
                        height={33}>
                    </Image>
                    <h2 className='hidden sm:block'>Free Games</h2>
                </div>

                <button className='border-1 py-1 px-2 md:px-5'>view More</button>
            </div>

            <div className='grid justify-items-center mt-8 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <Card
                    image="/images/darkwood-free.png"
                    title="Darkwood"
                    dateRange='Free Now - Jul 25'>
                </Card>
                <Card
                    image="/images/darkwood-free.png"
                    title="Darkwood"
                    dateRange='Free Now - Jul 25'>
                </Card>
                <Card
                    image="/images/darkwood-free.png"
                    title="Darkwood"
                    dateRange='Free Now - Jul 25'>
                </Card>
                <Card
                    image="/images/darkwood-free.png"
                    title="Darkwood"
                    dateRange='Free Now - Jul 25'>
                </Card>
            </div>
        </section>
    )
}

export default FreeGames
