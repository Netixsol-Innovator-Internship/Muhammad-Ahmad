import React from 'react'

interface filter {
  criteria: [string]
}

const FilterBar:React.FC<filter> = (props) => {
  return (
    <div className='max-w-[600px] min-[900px]:max-w-[900px] mx-auto translate-y-[-50%] rounded bg-white h-15'>
      
    </div>
  )
}

export default FilterBar;
