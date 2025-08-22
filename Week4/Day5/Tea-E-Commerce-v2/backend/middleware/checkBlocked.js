/**
 * Middleware to check if user is blocked
 * This can be used independently or combined with other auth middleware
 */

/**
 * Check if the current user is blocked
 */
const checkBlocked = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  if (req.user.isBlocked) {
    return res.status(403).json({
      success: false,
      message: 'Your account has been blocked. Please contact support for assistance.',
      isBlocked: true,
      blockedAt: req.user.blockedAt,
      contactInfo: {
        support: 'admin@teawebsite.com',
        message: 'Contact support to resolve account issues'
      }
    });
  }

  next();
};

/**
 * Check if a target user (from params) is blocked
 * Useful for admin operations on user accounts
 */
const checkTargetUserBlocked = async (req, res, next) => {
  try {
    const targetUserId = req.params.userId || req.params.id;
    
    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required.'
      });
    }

    const User = require('../models/User');
    const targetUser = await User.findById(targetUserId);
    
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Attach target user info to request for controller use
    req.targetUser = targetUser;
    req.targetUserBlocked = targetUser.isBlocked;
    
    next();

  } catch (error) {
    console.error('checkTargetUserBlocked middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking target user status.'
    });
  }
};

module.exports = {
  checkBlocked,
  checkTargetUserBlocked
};
