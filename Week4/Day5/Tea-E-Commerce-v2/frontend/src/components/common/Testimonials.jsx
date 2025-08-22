import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      text: 'TeaBliss has completely transformed my tea experience. The quality is exceptional, and every cup feels like a moment of pure bliss. Their Earl Grey Supreme is absolutely divine!',
      image: '/images/placeholders/avatar-1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      rating: 5,
      text: 'As a tea connoisseur, I\'m very particular about quality. TeaBliss consistently delivers premium teas that exceed my expectations. The Dragon Well Green is my daily go-to.',
      image: '/images/placeholders/avatar-2.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Austin, TX',
      rating: 5,
      text: 'I love how TeaBliss makes discovering new teas so easy. Their curated collections helped me find my perfect evening tea - the Chamomile Dreams is incredibly soothing.',
      image: '/images/placeholders/avatar-3.jpg'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'Seattle, WA',
      rating: 5,
      text: 'The packaging is beautiful, the shipping is fast, and the tea is exceptional. TeaBliss has made me a tea lover, and I couldn\'t be happier with my monthly subscription.',
      image: '/images/placeholders/avatar-4.jpg'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-primary-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of tea lovers who have discovered their perfect cup with TeaBliss.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-neutral-700 mb-8 italic">
              "{testimonials[currentTestimonial].text}"
            </blockquote>

            {/* Customer Info */}
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-lg">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="ml-4 text-left">
                <div className="font-semibold text-neutral-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-neutral-600">
                  {testimonials[currentTestimonial].location}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-neutral-50 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? 'bg-primary-600'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
            <div className="text-neutral-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-neutral-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-neutral-600">Tea Varieties</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-neutral-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
