const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * Get all users with pagination and filtering
 */
exports.getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      isBlocked,
      search
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (role) {
      filter.role = role;
    }
    
    if (isBlocked !== undefined) {
      filter.isBlocked = isBlocked === 'true';
    }
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Get users with pagination
    const users = await User.find(filter)
      .select('-password')
      .populate('blockedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    // Get role statistics
    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const roleDistribution = roleStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers: total,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1,
          limit: limitNum
        },
        roleDistribution,
        filters: {
          role,
          isBlocked,
          search
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get user by ID
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select('-password')
      .populate('blockedBy', 'name email role')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get user by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Change user role
 */
exports.changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const currentUser = req.user;

    // The userManagement middleware already validated permissions
    // and attached targetUser to request
    const targetUser = req.targetUser;

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'Target user not found'
      });
    }

    // Additional validation for role assignment
    if (role === 'superAdmin' && !currentUser.isSuperAdmin()) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admins can assign Super Admin role'
      });
    }

    if (role === 'admin' && !currentUser.isSuperAdmin()) {
      return res.status(403).json({
        success: false,
        message: 'Only Super Admins can assign Admin role'
      });
    }

    // Store previous role for audit
    const previousRole = targetUser.role;

    // Update user role
    targetUser.role = role;
    await targetUser.save();

    // Log the role change (you can expand this for audit trail)
    console.log(`Role change: ${currentUser.email} changed ${targetUser.email} from ${previousRole} to ${role}`);

    res.json({
      success: true,
      message: `User role updated from ${previousRole} to ${role}`,
      data: {
        user: {
          id: targetUser._id,
          name: targetUser.name,
          email: targetUser.email,
          role: targetUser.role,
          previousRole
        },
        changedBy: {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role
        }
      }
    });

  } catch (error) {
    console.error('Change user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while changing user role',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Block or unblock user
 */
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked, reason } = req.body;
    const currentUser = req.user;

    // The userManagement middleware already validated permissions
    // and attached targetUser to request
    const targetUser = req.targetUser;

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'Target user not found'
      });
    }

    // Check if trying to change to same status
    if (targetUser.isBlocked === isBlocked) {
      return res.status(400).json({
        success: false,
        message: `User is already ${isBlocked ? 'blocked' : 'unblocked'}`
      });
    }

    // Update block status
    if (isBlocked) {
      targetUser.blockUser(currentUser._id);
    } else {
      targetUser.unblockUser();
    }

    await targetUser.save();

    // Log the action
    console.log(`Block action: ${currentUser.email} ${isBlocked ? 'blocked' : 'unblocked'} ${targetUser.email}${reason ? ` - Reason: ${reason}` : ''}`);

    res.json({
      success: true,
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: {
        user: {
          id: targetUser._id,
          name: targetUser.name,
          email: targetUser.email,
          isBlocked: targetUser.isBlocked,
          blockedAt: targetUser.blockedAt,
          blockedBy: targetUser.blockedBy
        },
        action: {
          performed: isBlocked ? 'blocked' : 'unblocked',
          performedBy: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email
          },
          reason: reason || null,
          timestamp: new Date()
        }
      }
    });

  } catch (error) {
    console.error('Block user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user block status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get dashboard statistics
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total user counts by role
    const userStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get blocked users count
    const blockedUsersCount = await User.countDocuments({ isBlocked: true });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentUsersCount = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get recent user registrations by day (last 7 days)
    const dailyRegistrations = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Format user stats
    const roleDistribution = userStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    // Ensure all roles are represented
    const allRoles = ['user', 'admin', 'superAdmin'];
    allRoles.forEach(role => {
      if (!roleDistribution[role]) {
        roleDistribution[role] = 0;
      }
    });

    // Get total users count
    const totalUsers = Object.values(roleDistribution).reduce((sum, count) => sum + count, 0);

    // Get recent activity (last 10 users)
    const recentUsers = await User.find()
      .select('name email role createdAt isBlocked')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          blockedUsers: blockedUsersCount,
          recentUsers: recentUsersCount,
          activeUsers: totalUsers - blockedUsersCount
        },
        roleDistribution,
        dailyRegistrations,
        recentActivity: recentUsers,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
