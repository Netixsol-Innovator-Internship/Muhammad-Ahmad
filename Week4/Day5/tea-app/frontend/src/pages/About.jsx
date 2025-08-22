const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-6 sm:mb-8">About Us</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
            We are passionate about bringing you the finest tea from around the world, 
            carefully curated to ensure exceptional quality and flavor in every cup.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                Founded with a love for tea and a commitment to quality, our journey began 
                when we discovered the incredible diversity and complexity of teas from 
                different regions around the world.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Today, we work directly with tea gardens and suppliers to bring you 
                authentic, high-quality teas that tell the story of their origin and 
                the hands that crafted them.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                To make exceptional tea accessible to everyone, while supporting 
                sustainable farming practices and fair trade relationships with 
                tea producers worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We believe that every cup of tea should be a moment of mindfulness, 
                connection, and appreciation for the craft behind it.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quality</h3>
                <p className="text-sm text-gray-600">
                  Only the finest teas make it to our collection, carefully tested and approved.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainability</h3>
                <p className="text-sm text-gray-600">
                  Supporting eco-friendly practices and sustainable farming methods.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-900 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600">
                  Building relationships with tea communities and sharing knowledge.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-4 sm:mb-6">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              Have questions about our teas or need recommendations? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Get in Touch
              </a>
              <a 
                href="/collections" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Browse Teas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
