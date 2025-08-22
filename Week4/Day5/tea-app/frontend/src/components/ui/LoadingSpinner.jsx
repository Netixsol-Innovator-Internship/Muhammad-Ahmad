const LoadingSpinner = ({ size = 'md', className = '', type = 'spinner' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (type === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        <div className={`bg-blue-600 rounded-full animate-bounce ${sizeClasses.sm}`} style={{ animationDelay: '0ms' }}></div>
        <div className={`bg-blue-600 rounded-full animate-bounce ${sizeClasses.sm}`} style={{ animationDelay: '150ms' }}></div>
        <div className={`bg-blue-600 rounded-full animate-bounce ${sizeClasses.sm}`} style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`bg-blue-600 rounded-full animate-pulse-slow ${sizeClasses[size]}`}></div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-200 ${sizeClasses[size]}`}>
        <div className="w-full h-full rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-600"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
