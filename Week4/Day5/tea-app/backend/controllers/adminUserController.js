const User = require('../models/User');

/**
 * Get all users (Admin only)
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      message: 'Users retrieved successfully',
      data: { 
        users,
        count: users.length 
      }
    });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching users', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Update user role (Admin/SuperAdmin only)
 */
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const currentUser = req.user;

  try {
    // Validate role
    if (!['user', 'admin', 'superAdmin'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role. Must be user, admin, or superAdmin' 
      });
    }

    // Find target user
    const targetUser = await User.findById(userId).select('-password');
    if (!targetUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Prevent users from changing their own role
    if (currentUser._id.toString() === userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot change your own role' 
      });
    }

    // Role-based permission checks
    if (currentUser.role === 'admin') {
      // Admin can only change user roles, not admin or superAdmin
      if (targetUser.role !== 'user') {
        return res.status(403).json({ 
          success: false, 
          message: 'Admins can only change roles of regular users' 
        });
      }
      
      // Admin cannot assign admin or superAdmin roles
      if (role !== 'user') {
        return res.status(403).json({ 
          success: false, 
          message: 'Admins can only assign user role' 
        });
      }
    } else if (currentUser.role === 'superAdmin') {
      // SuperAdmin can change user and admin roles, but not other superAdmins
      if (targetUser.role === 'superAdmin' && targetUser._id.toString() !== currentUser._id.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: 'Cannot change role of other super admins' 
        });
      }
    }

    // Update user role
    targetUser.role = role;
    await targetUser.save();

    res.json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: {
        user: {
          id: targetUser._id,
          name: targetUser.name,
          email: targetUser.email,
          role: targetUser.role,
          isBlocked: targetUser.isBlocked,
          createdAt: targetUser.createdAt
        }
      }
    });
  } catch (err) {
    console.error('Update user role error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating user role', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Block/Unblock user (Admin/SuperAdmin only)
 */
exports.toggleUserBlock = async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user;

  try {
    // Find target user
    const targetUser = await User.findById(userId).select('-password');
    if (!targetUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Prevent blocking yourself
    if (currentUser._id.toString() === userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot block/unblock yourself' 
      });
    }

    // Role-based permission checks
    if (currentUser.role === 'admin') {
      // Admin can only block/unblock regular users
      if (targetUser.role !== 'user') {
        return res.status(403).json({ 
          success: false, 
          message: 'Admins can only block/unblock regular users' 
        });
      }
    } else if (currentUser.role === 'superAdmin') {
      // SuperAdmin can block/unblock users and admins, but not other superAdmins
      if (targetUser.role === 'superAdmin') {
        return res.status(403).json({ 
          success: false, 
          message: 'Cannot block/unblock other super admins' 
        });
      }
    }

    // Toggle block status
    targetUser.isBlocked = !targetUser.isBlocked;
    await targetUser.save();

    const action = targetUser.isBlocked ? 'blocked' : 'unblocked';

    res.json({
      success: true,
      message: `User ${action} successfully`,
      data: {
        user: {
          id: targetUser._id,
          name: targetUser.name,
          email: targetUser.email,
          role: targetUser.role,
          isBlocked: targetUser.isBlocked,
          createdAt: targetUser.createdAt
        }
      }
    });
  } catch (err) {
    console.error('Toggle user block error:', err);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating user status', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};
