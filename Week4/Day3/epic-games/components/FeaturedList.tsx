'use client'

import React from 'react'
import useGamesStore from '@/stores/useGamesStore'
import FeaturedGame from './FeaturedGame'

const FeaturedList: React.FC = () => {
  const featured = useGamesStore(s => s.featured)
  return (
    <section className="my-6 grid gap-y-8 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-6'>">
      {featured.map((f, idx) => (
        <FeaturedGame
          key={idx}
          image={f.src}
          title={f.title || 'Untitled'}
          description={f.description || ''}
          price={f.price ? `₹${f.price}` : ''}
        />
      ))}
    </section>
  )
}

export default FeaturedList
