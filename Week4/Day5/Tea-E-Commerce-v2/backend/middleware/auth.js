const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Base authentication middleware
 * Validates JWT token and attaches user to request
 */
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false,
      message: 'Access denied. No token provided.' 
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token. User not found.' 
      });
    }
    
    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Please contact support for assistance.',
        isBlocked: true
      });
    }
    
    // Attach user to request object
    req.user = user;
    next();
    
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token format.' 
      });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired. Please login again.' 
      });
    }
    
    return res.status(401).json({ 
      success: false,
      message: 'Token validation failed.' 
    });
  }
};
