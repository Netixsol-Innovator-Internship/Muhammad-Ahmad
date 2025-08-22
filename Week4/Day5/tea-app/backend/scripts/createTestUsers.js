const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'superAdmin' });
    if (existingSuperAdmin) {
      console.log('Super admin already exists:', existingSuperAdmin.email);
      process.exit(0);
    }

    // Create super admin user
    const superAdminData = {
      name: 'Super Admin',
      email: 'superadmin@tea.com',
      password: 'SuperAdmin123',
      role: 'superAdmin'
    };

    const superAdmin = await User.create(superAdminData);
    console.log('Super admin created successfully:', {
      id: superAdmin._id,
      name: superAdmin.name,
      email: superAdmin.email,
      role: superAdmin.role
    });

    // Create regular admin user
    const adminData = {
      name: 'Admin User',
      email: 'admin@tea.com',
      password: 'Admin123',
      role: 'admin'
    };

    const admin = await User.create(adminData);
    console.log('Admin user created successfully:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

    // Create regular user
    const userData = {
      name: 'Regular User',
      email: 'user@tea.com',
      password: 'User123',
      role: 'user'
    };

    const user = await User.create(userData);
    console.log('Regular user created successfully:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    console.log('\n=== Test Accounts Created ===');
    console.log('Super Admin: superadmin@tea.com / SuperAdmin123');
    console.log('Admin: admin@tea.com / Admin123');
    console.log('User: user@tea.com / User123');
    
  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

createSuperAdmin();
