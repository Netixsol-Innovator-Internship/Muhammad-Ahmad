import { useState, useEffect } from 'react';
import FeaturedProducts from '../components/product/FeaturedProducts';
import Testimonials from '../components/common/Testimonials';
import Newsletter from '../components/common/Newsletter';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToCollections = () => {
    document.getElementById('collections').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Matching Figma Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative group">
              <img
                src="/images/hero/tea-spoons-hero.jpg"
                alt="Various teas in spoons"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                onError={(e) => {
                  e.target.src = '/images/hero/hero-landing-page.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Every day is unique,
              <br />
              <span className="font-normal">just like our tea</span>
            </h1>
            
            <div className="space-y-4 mb-8 text-gray-600 leading-relaxed">
              <p className="animate-fade-in-up delay-500">
                Lorem ipsum dolor sit amet consectetur. Orci nibh 
                nullam risus adipiscing odio. Neque lacus nibh eros 
                tincidunt quis.
              </p>
              <p className="animate-fade-in-up delay-700">
                Lorem ipsum dolor sit amet consectetur. Orci nibh 
                nullam risus adipiscing odio. Neque lacus nibh eros 
                tincidunt quis.
              </p>
            </div>
            
            <button 
              onClick={scrollToCollections}
              className="bg-gray-900 text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg animate-fade-in-up delay-1000"
            >
              BROWSE TEAS
            </button>
          </div>
        </div>
      </section>

      {/* Features Section - 4 Point Icons */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 tracking-wide">450+ KIND OF LOOSELEAF TEA</h3>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 tracking-wide">CERTIFICATED ORGANIC TEAS</h3>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 tracking-wide">FREE DELIVERY</h3>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 tracking-wide">SAMPLE FOR ALL TEAS</h3>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors duration-200">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 animate-fade-in-up">
            Our Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Row 1 */}
          {[
            { name: 'BLACK TEA', image: '/images/collections/black-tea.jpg', delay: '100' },
            { name: 'GREEN TEA', image: '/images/collections/green-tea.jpg', delay: '200' },
            { name: 'WHITE TEA', image: '/images/collections/white-tea.jpg', delay: '300' }
          ].map((tea, index) => (
            <div key={tea.name} className={`group cursor-pointer animate-fade-in-up delay-${tea.delay}`}>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={tea.image}
                  alt={tea.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/collection-placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    VIEW COLLECTION
                  </span>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
                {tea.name}
              </h3>
            </div>
          ))}

          {/* Row 2 */}
          {[
            { name: 'MATCHA', image: '/images/collections/matcha.jpg', delay: '400' },
            { name: 'HERBAL TEA', image: '/images/collections/herbal-tea.jpg', delay: '500' },
            { name: 'CHAI', image: '/images/collections/chai.jpg', delay: '600' }
          ].map((tea, index) => (
            <div key={tea.name} className={`group cursor-pointer animate-fade-in-up delay-${tea.delay}`}>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={tea.image}
                  alt={tea.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/collection-placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    VIEW COLLECTION
                  </span>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
                {tea.name}
              </h3>
            </div>
          ))}

          {/* Row 3 */}
          {[
            { name: 'OOLONG', image: '/images/collections/oolong.jpg', delay: '700' },
            { name: 'ROOIBOS', image: '/images/collections/rooibos.jpg', delay: '800' },
            { name: 'TEAWARE', image: '/images/collections/teaware.jpg', delay: '900' }
          ].map((tea, index) => (
            <div key={tea.name} className={`group cursor-pointer animate-fade-in-up delay-${tea.delay}`}>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={tea.image}
                  alt={tea.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/placeholders/collection-placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-sm tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    VIEW COLLECTION
                  </span>
                </div>
              </div>
              <h3 className="text-center text-sm font-medium text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
                {tea.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
