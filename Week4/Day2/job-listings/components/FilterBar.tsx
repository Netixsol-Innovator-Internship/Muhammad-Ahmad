import React from 'react'
import { useFilterStore } from '@/store/filterStore'
import Image from 'next/image'

const FilterBar: React.FC = () => {
  const { activeFilters, removeFilter, clearAllFilters } = useFilterStore()

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className='max-w-[600px] min-[900px]:max-w-[900px] mx-auto translate-y-[-50%] rounded bg-white shadow-lg p-4 flex items-center justify-between'>
      <div className='flex flex-wrap gap-2'>
        {activeFilters.map((filter, idx) => (
          <div key={idx} className='flex items-center cursor-pointer bg-[#eef6f6] rounded'>
            <span className='text-[#5da5a4] font-bold text-sm px-2 py-1'>
              {filter}
            </span>
            <button 
              onClick={() => removeFilter(filter)}
              className='bg-[#5da5a4] cursor-pointer hover:bg-[#2c3a3a] p-1 rounded-r text-white transition-colors'
              aria-label={`Remove ${filter} filter`}
            >
              <Image 
                src="/images/icon-remove.svg" 
                alt="Remove" 
                width={12} 
                height={12}
              />
            </button>
          </div>
        ))}
      </div>
      <button 
        onClick={clearAllFilters}
        className='text-[#7b8e8e] cursor-pointer hover:text-[#5da5a4] hover:underline font-bold text-sm transition-colors'
      >
        Clear
      </button>
    </div>
  )
}

export default FilterBar;
