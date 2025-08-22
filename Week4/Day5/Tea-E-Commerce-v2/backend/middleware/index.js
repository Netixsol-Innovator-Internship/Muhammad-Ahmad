/**
 * Middleware composition utilities
 * Helper functions to combine multiple middleware functions
 */

/**
 * Combines multiple middleware functions into a single middleware
 * @param {...Function} middlewares - Middleware functions to combine
 * @returns {Function} Combined middleware function
 */
const combine = (...middlewares) => {
  return (req, res, next) => {
    let index = 0;

    const runNext = (err) => {
      if (err) {
        return next(err);
      }

      if (index >= middlewares.length) {
        return next();
      }

      const middleware = middlewares[index++];
      
      try {
        middleware(req, res, runNext);
      } catch (error) {
        next(error);
      }
    };

    runNext();
  };
};

/**
 * Common middleware combinations for different access levels
 */

// Base authentication (used for all protected routes)
const auth = require('./auth');

// Admin access (admin or superAdmin)
const adminAccess = () => {
  const { requireAdmin } = require('./roleAuth');
  return combine(auth, requireAdmin);
};

// Super admin access only
const superAdminAccess = () => {
  const { requireSuperAdmin } = require('./roleAuth');
  return combine(auth, requireSuperAdmin);
};

// User management access (with user blocking check)
const userManagement = () => {
  const { requireAdmin, canManageUser, preventSelfManagement } = require('./roleAuth');
  return combine(auth, requireAdmin, canManageUser, preventSelfManagement);
};

// Product management access
const productManagement = (action = 'read') => {
  const { canManageProducts } = require('./roleAuth');
  return combine(auth, canManageProducts(action));
};

// Role-based access for specific roles
const roleAccess = (roles) => {
  const { requireRole } = require('./roleAuth');
  return combine(auth, requireRole(roles));
};

module.exports = {
  combine,
  auth,
  adminAccess,
  superAdminAccess,
  userManagement,
  productManagement,
  roleAccess
};
