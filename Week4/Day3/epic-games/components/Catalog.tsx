import React from 'react'
import Image from 'next/image'


const Catalog: React.FC = () => {
  return (
    <section className="w-full py-8 px-4 flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Catalog Image */}
        <div className="flex justify-center">
          <Image
            src="/images/catalog.png"
            alt="Catalog Preview"
            height={320}
            width={600}
            className="rounded-2xl shadow-xl min-w-[300] max-w-2xl"
          />
        </div>

        {/* Right: Catalog Text */}
        <div className="flex flex-col lg:justify-center items-start px-2 lg:px-8">
          <h2 className="text-white text-2xl mb-2 leading-tight">Explore our Catalog</h2>
          <p className="text-gray-400 font-normal">Browse by genre, features, price, and more to find your next favorite game.</p>
        </div>
      </div>
    </section>
  );
}

export default Catalog
