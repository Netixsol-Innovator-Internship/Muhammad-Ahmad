const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

/**
 * Register a new user
 */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already registered. Please use a different email or login.' 
      });
    }

    // Create new user
    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    
    // Handle duplicate key error (in case unique index catches it)
    if (err.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ 
        success: false, 
        message: 'Account has been blocked. Please contact support.' 
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

/**
 * Get current user profile
 */
exports.getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching profile', 
      error: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};
