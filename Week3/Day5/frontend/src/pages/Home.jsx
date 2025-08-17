const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero/hero-landing-page.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Discover the World of 
            <span className="block text-primary-400">Premium Tea</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-neutral-200">
            From the finest gardens to your cup. Experience the perfect blend of tradition and quality 
            with our carefully curated collection of teas from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Explore Collections
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-neutral-900 text-lg px-8 py-3">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            Our Tea Collections
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium teas, each with its own unique character and story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample Collection Cards */}
          {[
            {
              name: 'Black Tea',
              image: '/images/collections/black-tea.jpg',
              description: 'Bold and robust flavors'
            },
            {
              name: 'Green Tea',
              image: '/images/collections/green-tea.jpg',
              description: 'Fresh and delicate taste'
            },
            {
              name: 'Herbal Tea',
              image: '/images/collections/herbal-tea.jpg',
              description: 'Caffeine-free wellness'
            },
            {
              name: 'White Tea',
              image: '/images/collections/white-tea.jpg',
              description: 'Subtle and refined'
            },
            {
              name: 'Oolong Tea',
              image: '/images/collections/oolong.jpg',
              description: 'Complex and aromatic'
            },
            {
              name: 'Matcha',
              image: '/images/collections/matcha.jpg',
              description: 'Pure Japanese tradition'
            }
          ].map((collection, index) => (
            <div key={index} className="card-hover overflow-hidden group cursor-pointer">
              <div className="aspect-w-16 aspect-h-12 bg-neutral-200">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/collection-placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {collection.name}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {collection.description}
                </p>
                <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  Explore Collection →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Why Choose TeaBliss?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Premium Quality</h3>
              <p className="text-neutral-600">
                Hand-selected teas from the finest gardens and trusted growers worldwide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Fast Delivery</h3>
              <p className="text-neutral-600">
                Quick and secure shipping to ensure your tea arrives fresh and ready to enjoy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Expert Curation</h3>
              <p className="text-neutral-600">
                Our tea masters carefully select each blend for exceptional flavor and quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
