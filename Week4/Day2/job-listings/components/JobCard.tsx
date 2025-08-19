import React from 'react'
import Image from 'next/image'

function JobCard() {
    return (
        <article className="relative bg-[#fff] shadow-lg my-8 p-6 max-w-[600px] min-[900px]:w-full min-[900px]:max-w-[900px] mx-auto rounded-md flex flex-col min-[900px]:flex-row min-[900px]:items-center gap-6">
            
            <div className="flex items-center gap-6 w-full md:w-auto">
                <Image
                    src="/images/photosnap.svg"
                    alt="PhotoSnap"
                    width={75}
                    height={75}
                    className="absolute top-0 left-5 translate-y-[-60%] w-[50px] h-[50px] md:w-[75px] md:h-[75px] md:static md:translate-y-0 rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <span className="text-[#5da5a4] font-bold text-base py-1 mr-1">Photosnap</span>
                        <span className="bg-[#5da5a4] text-[#fff] text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">New!</span>
                        <span className="bg-[#2c3a3a] text-[#fff] text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Featured</span>
                    </div>
                    
                    <h2 className="font-bold text-lg md:text-xl text-[#2c3a3a] hover:text-[#5da5a4] cursor-pointer">Senior Frontend Developer</h2>
                    
                    <div className="flex items-center gap-2 text-[#7b8e8e] text-sm font-medium">
                        <span>1d ago</span>
                        <span className="mx-1">·</span>
                        <span>Full Time</span>
                        <span className="mx-1">·</span>
                        <span>USA only</span>
                    </div>
                </div>
            </div>
            <div className="min-[900px]:ml-auto flex-wrap flex gap-2">
                <span className="bg-[#eef6f6] text-[#5da5a4] font-bold px-3 py-1 rounded">Frontend</span>
                <span className="bg-[#eef6f6] text-[#5da5a4] font-bold px-3 py-1 rounded">Senior</span>
                <span className="bg-[#eef6f6] text-[#5da5a4] font-bold px-3 py-1 rounded">HTML</span>
                <span className="bg-[#eef6f6] text-[#5da5a4] font-bold px-3 py-1 rounded">CSS</span>
                <span className="bg-[#eef6f6] text-[#5da5a4] font-bold px-3 py-1 rounded">JavaScript</span>
            </div>
        </article>
    )
}

export default JobCard
