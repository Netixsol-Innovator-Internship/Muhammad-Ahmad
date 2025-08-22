import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    collections: [
      'Black Teas',
      'Green Teas',
      'White Teas',
      'Herbal Teas',
      'Matcha',
      'Chai',
      'Oolong',
      'Rooibos',
      'Teaware'
    ],
    learn: [
      'About us',
      'About our Teas',
      'Tea academy'
    ],
    customerService: [
      'Ordering and payment',
      'Delivery',
      'Privacy and policy',
      'Terms & Conditions'
    ],
    contactUs: [
      {
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        text: 'Street no 2, Residencia Area, Shirala Tea Plaza Pakistan'
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        text: 'Email: amedbrat@gmail.com'
      },
      {
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        ),
        text: 'Tel: +92 9070630506'
      }
    ]
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Collections */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">COLLECTIONS</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.collections.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">LEARN</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.learn.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerSections.customerService.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-medium text-gray-900 mb-4 tracking-wide">CONTACT US</h3>
            <ul className="space-y-3 sm:space-y-4">
              {footerSections.contactUs.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-gray-500 mt-0.5 flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-sm text-gray-600 leading-relaxed break-words">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.21 2.12-.56 3.03-1.03C14.6 26.59 14.13 26.31 13.63 26 13.13 25.69 12.59 25.32 12 24.9 12 24.9 12 24.9 12 24.9c-.59.42-1.13.79-1.63 1.1-.5.31-.97.59-1.4.84.86.22 1.76.38 2.7.47.18-.07.36-.15.54-.23C16.04 25.96 19 22.05 19 17V7L12 2z"/>
                </svg>
                <span className="ml-2 text-base sm:text-lg font-medium text-gray-900">Brand Name</span>
              </div>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
              © {currentYear} Brand Name. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
