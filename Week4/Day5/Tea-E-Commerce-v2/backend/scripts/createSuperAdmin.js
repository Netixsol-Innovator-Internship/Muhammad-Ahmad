const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createSuperAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ 
      email: 'admin@teawebsite.com' 
    });

    if (existingSuperAdmin) {
      console.log('Super admin already exists!');
      console.log('Email:', existingSuperAdmin.email);
      console.log('Role:', existingSuperAdmin.role);
      return;
    }

    // Create super admin
    const superAdmin = new User({
      name: 'Super Administrator',
      email: 'admin@teawebsite.com',
      password: 'SuperAdmin123!',
      role: 'superAdmin'
    });

    await superAdmin.save();

    console.log('✅ Super Admin created successfully!');
    console.log('📧 Email: admin@teawebsite.com');
    console.log('🔑 Password: SuperAdmin123!');
    console.log('👑 Role: superAdmin');
    console.log('');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
if (require.main === module) {
  createSuperAdmin();
}

module.exports = createSuperAdmin;
