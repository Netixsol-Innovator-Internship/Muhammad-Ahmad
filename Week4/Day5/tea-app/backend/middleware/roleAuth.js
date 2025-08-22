const User = require('../models/User');

/**
 * Middleware to check if user has required role(s)
 * @param {string|array} roles - Required role(s) 
 * @returns {function} Express middleware function
 */
const requireRole = (roles) => {
  return async (req, res, next) => {
    try {
      // Ensure user is authenticated first
      if (!req.user || !req.user._id) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }

      // Get fresh user data to check for blocks and role changes
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      // Check if user is blocked
      if (user.isBlocked) {
        return res.status(403).json({ 
          success: false, 
          message: 'Account has been blocked. Please contact support.' 
        });
      }

      // Update req.user with fresh data
      req.user = user;

      // Check role permissions
      const allowedRoles = Array.isArray(roles) ? roles : [roles];
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ 
          success: false, 
          message: 'Insufficient permissions' 
        });
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error during authorization' 
      });
    }
  };
};

/**
 * Middleware to check if user is admin or superAdmin
 */
const requireAdmin = requireRole(['admin', 'superAdmin']);

/**
 * Middleware to check if user is superAdmin only
 */
const requireSuperAdmin = requireRole(['superAdmin']);

module.exports = {
  requireRole,
  requireAdmin,
  requireSuperAdmin
};
