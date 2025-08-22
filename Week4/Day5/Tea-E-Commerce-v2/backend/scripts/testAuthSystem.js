const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const testUserModel = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Test 1: Check if super admin exists
    console.log('\n📋 Test 1: Checking Super Admin...');
    const superAdmin = await User.findOne({ email: 'admin@teawebsite.com' });
    
    if (superAdmin) {
      console.log('✅ Super Admin found:');
      console.log(`   📧 Email: ${superAdmin.email}`);
      console.log(`   👤 Name: ${superAdmin.name}`);
      console.log(`   🛡️  Role: ${superAdmin.role}`);
      console.log(`   🚫 Blocked: ${superAdmin.isBlocked}`);
      console.log(`   🗓️  Created: ${superAdmin.createdAt}`);
      
      // Test role methods
      console.log('\n🔧 Testing role methods:');
      console.log(`   isAdmin(): ${superAdmin.isAdmin()}`);
      console.log(`   isSuperAdmin(): ${superAdmin.isSuperAdmin()}`);
      console.log(`   canManageUser('user'): ${superAdmin.canManageUser('user')}`);
      console.log(`   canManageUser('admin'): ${superAdmin.canManageUser('admin')}`);
    } else {
      console.log('❌ Super Admin not found. Running creation script...');
      const createSuperAdmin = require('./createSuperAdmin');
      await createSuperAdmin();
    }

    // Test 2: Create a test regular user
    console.log('\n📋 Test 2: Creating test user...');
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpass123',
      role: 'user'
    });

    await testUser.save();
    console.log('✅ Test user created:');
    console.log(`   📧 Email: ${testUser.email}`);
    console.log(`   🛡️  Role: ${testUser.role}`);
    console.log(`   🚫 Blocked: ${testUser.isBlocked}`);

    // Test 3: Test user methods
    console.log('\n🔧 Testing user methods:');
    console.log(`   isAdmin(): ${testUser.isAdmin()}`);
    console.log(`   isSuperAdmin(): ${testUser.isSuperAdmin()}`);
    console.log(`   canManageUser('user'): ${testUser.canManageUser('user')}`);

    // Test 4: Create test admin
    console.log('\n📋 Test 3: Creating test admin...');
    const testAdmin = new User({
      name: 'Test Admin',
      email: 'admin@example.com',
      password: 'adminpass123',
      role: 'admin'
    });

    await testAdmin.save();
    console.log('✅ Test admin created:');
    console.log(`   📧 Email: ${testAdmin.email}`);
    console.log(`   🛡️  Role: ${testAdmin.role}`);
    console.log(`   🚫 Blocked: ${testAdmin.isBlocked}`);

    // Test admin methods
    console.log('\n🔧 Testing admin methods:');
    console.log(`   isAdmin(): ${testAdmin.isAdmin()}`);
    console.log(`   isSuperAdmin(): ${testAdmin.isSuperAdmin()}`);
    console.log(`   canManageUser('user'): ${testAdmin.canManageUser('user')}`);
    console.log(`   canManageUser('admin'): ${testAdmin.canManageUser('admin')}`);

    // Test 5: Test blocking functionality
    console.log('\n📋 Test 4: Testing user blocking...');
    testUser.blockUser(superAdmin._id);
    await testUser.save();
    
    console.log('✅ User blocked:');
    console.log(`   🚫 Blocked: ${testUser.isBlocked}`);
    console.log(`   🗓️  Blocked At: ${testUser.blockedAt}`);
    console.log(`   👤 Blocked By: ${testUser.blockedBy}`);

    // Unblock user
    testUser.unblockUser();
    await testUser.save();
    console.log('✅ User unblocked');

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
  }
};

// Run the test
if (require.main === module) {
  testUserModel();
}

module.exports = testUserModel;
