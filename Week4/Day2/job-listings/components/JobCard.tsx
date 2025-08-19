import React from 'react'
import Image from 'next/image'
import { useFilterStore } from '@/store/filterStore'

interface JobCardProps {
    logo: string,
    company: string,
    new: boolean,
    featured: boolean,
    position: string,
    role: string,
    level: string,
    postedAt: string,
    contract: string,
    location: string,
    languages: [string],
    tools?: [string]
}

const JobCard: React.FC<JobCardProps> = (props) => {
    const { addFilter } = useFilterStore()
    const filters = [props.role, props.level, ...props.languages];
    if (props.tools) {
        filters.push(...props.tools);
    }

    const handleFilterClick = (filter: string) => {
        addFilter(filter)
    }

    return (
        <article className={`relative bg-[#fff] shadow-lg mt-12 md:mt-4 p-6 max-w-[600px] min-[900px]:w-full min-[900px]:max-w-[900px] mx-auto rounded-md flex flex-col min-[900px]:flex-row min-[900px]:items-center gap-6
    ${props.featured ? 'border-l-4 border-[#5da5a4]' : ''}`}>

            <div className="flex items-center gap-6 w-full md:w-auto">
                <Image
                    src={props.logo}
                    alt={props.company}
                    width={75}
                    height={75}
                    className="absolute top-0 left-5 translate-y-[-60%] w-[50px] h-[50px] md:w-[75px] md:h-[75px] md:static md:translate-y-0 rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                        <span className="text-[#5da5a4] font-bold text-base py-1 mr-1">{props.company}</span>
                        {props.new && <span className="bg-[#5da5a4] text-[#fff] text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">New!</span>}
                        {props.featured && <span className="bg-[#2c3a3a] text-[#fff] text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Featured</span>}
                    </div>

                    <h2 className="font-bold text-lg md:text-xl text-[#2c3a3a] hover:text-[#5da5a4] cursor-pointer mb-2">{props.position}</h2>

                    <div className="flex items-center gap-2 text-[#7b8e8e] text-sm font-medium">
                        <span>{props.postedAt}</span>
                        <span className="mx-1">·</span>
                        <span>{props.contract}</span>
                        <span className="mx-1">·</span>
                        <span>{props.location}</span>
                    </div>
                </div>
            </div>
            <div className="min-[900px]:ml-auto flex-wrap flex gap-2">
                {filters.map((filter, idx) => (
                    <span
                        key={idx}
                        onClick={() => handleFilterClick(filter)}
                        className="bg-[#eef6f6] hover:bg-[#5da5a4] text-[#5da5a4] hover:text-white cursor-pointer text-sm font-bold px-3 py-1 rounded transition-colors"
                    >
                        {filter}
                    </span>
                ))}
            </div>
        </article>
    )
}

export default JobCard
