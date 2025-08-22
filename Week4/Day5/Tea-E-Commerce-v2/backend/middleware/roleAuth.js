/**
 * Role-based authorization middleware
 * This module provides middleware functions for role-based access control
 */

/**
 * Middleware to require admin or superAdmin role
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  if (!req.user.isAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
      requiredRole: ['admin', 'superAdmin'],
      currentRole: req.user.role
    });
  }

  next();
};

/**
 * Middleware to require superAdmin role only
 */
const requireSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  if (!req.user.isSuperAdmin()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super Admin privileges required.',
      requiredRole: ['superAdmin'],
      currentRole: req.user.role
    });
  }

  next();
};

/**
 * Dynamic role checker middleware
 * @param {string|string[]} allowedRoles - Single role or array of allowed roles
 */
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient privileges.',
        requiredRole: roles,
        currentRole: req.user.role
      });
    }

    next();
  };
};

/**
 * Middleware to check if user can manage another user
 * Used for user management operations like role changes, blocking, etc.
 */
const canManageUser = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  try {
    const targetUserId = req.params.userId || req.params.id;
    
    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: 'Target user ID is required.'
      });
    }

    // Find the target user
    const User = require('../models/User');
    const targetUser = await User.findById(targetUserId);
    
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'Target user not found.'
      });
    }

    // Check if current user can manage the target user
    if (!req.user.canManageUser(targetUser.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You cannot manage this user.',
        reason: `${req.user.role} cannot manage ${targetUser.role}`,
        managementRules: {
          admin: 'Can only manage users with role "user"',
          superAdmin: 'Can manage users with any role'
        }
      });
    }

    // Attach target user to request for use in controller
    req.targetUser = targetUser;
    next();

  } catch (error) {
    console.error('canManageUser middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking user management permissions.'
    });
  }
};

/**
 * Middleware to prevent self-management
 * Prevents users from blocking themselves or changing their own role
 */
const preventSelfManagement = (req, res, next) => {
  const targetUserId = req.params.userId || req.params.id;
  
  if (req.user._id.toString() === targetUserId) {
    return res.status(400).json({
      success: false,
      message: 'You cannot perform this action on your own account.'
    });
  }
  
  next();
};

/**
 * Middleware for product management permissions
 * Different roles have different product management capabilities
 */
const canManageProducts = (action = 'read') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const role = req.user.role;

    switch (action) {
      case 'read':
        // All authenticated users can read products
        next();
        break;
        
      case 'create':
      case 'update':
        // Admin and SuperAdmin can create/update products
        if (role === 'admin' || role === 'superAdmin') {
          next();
        } else {
          return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required for product management.',
            requiredRole: ['admin', 'superAdmin'],
            currentRole: role
          });
        }
        break;
        
      case 'delete':
        // Only SuperAdmin can delete products
        if (role === 'superAdmin') {
          next();
        } else {
          return res.status(403).json({
            success: false,
            message: 'Access denied. Super Admin privileges required for product deletion.',
            requiredRole: ['superAdmin'],
            currentRole: role
          });
        }
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action specified.'
        });
    }
  };
};

module.exports = {
  requireAdmin,
  requireSuperAdmin,
  requireRole,
  canManageUser,
  preventSelfManagement,
  canManageProducts
};
