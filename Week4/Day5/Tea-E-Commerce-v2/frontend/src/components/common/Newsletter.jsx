import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock API call - in real app, this would connect to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Thank you! You\'ve been subscribed to our newsletter.');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get the latest updates on new tea arrivals, exclusive offers, and brewing tips delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-lg border-0 text-neutral-900 placeholder-neutral-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {message && (
              <p className={`mt-4 text-sm ${
                message.includes('Thank you') ? 'text-green-200' : 'text-red-200'
              }`}>
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-primary-200">
            Join over 5,000 tea enthusiasts. No spam, unsubscribe anytime.
          </p>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-8 opacity-70">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5K+</div>
              <div className="text-primary-200 text-sm">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Weekly</div>
              <div className="text-primary-200 text-sm">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Exclusive</div>
              <div className="text-primary-200 text-sm">Offers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
