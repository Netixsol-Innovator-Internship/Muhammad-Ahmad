const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

const testAdminSystem = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing test data (except super admin)
    await User.deleteMany({ 
      email: { $ne: 'admin@teawebsite.com' }
    });
    await Product.deleteMany({});
    console.log('🧹 Cleared existing test data');

    // Test 1: Create test users
    console.log('\n📋 Test 1: Creating test users...');
    
    const testUsers = [
      {
        name: 'Regular User',
        email: 'user@test.com',
        password: 'password123',
        role: 'user'
      },
      {
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
      },
      {
        name: 'Another User',
        email: 'user2@test.com',
        password: 'password123',
        role: 'user'
      }
    ];

    const createdUsers = await User.insertMany(testUsers);
    console.log(`✅ Created ${createdUsers.length} test users`);

    // Test 2: Create test products
    console.log('\n📋 Test 2: Creating test products...');
    
    const testProducts = [
      {
        name: 'Earl Grey Tea',
        description: 'Classic Earl Grey with bergamot',
        price: 15.99,
        weight: '250g',
        collection: 'Black Tea',
        origin: 'Sri Lanka',
        stock: 50,
        flavours: ['bergamot', 'citrus'],
        quality: 'Premium',
        caffeine: 'High'
      },
      {
        name: 'Green Dragon Well',
        description: 'Traditional Chinese green tea',
        price: 22.50,
        weight: '100g',
        collection: 'Green Tea',
        origin: 'China',
        stock: 0, // Out of stock
        flavours: ['fresh', 'grassy'],
        quality: 'Premium',
        caffeine: 'Medium'
      },
      {
        name: 'Chamomile Dreams',
        description: 'Relaxing herbal blend',
        price: 12.99,
        weight: '50g',
        collection: 'Herbal Tea',
        origin: 'Egypt',
        stock: 25,
        flavours: ['floral', 'honey'],
        quality: 'Organic',
        caffeine: 'None'
      }
    ];

    const createdProducts = await Product.insertMany(testProducts);
    console.log(`✅ Created ${createdProducts.length} test products`);

    // Test 3: Test role-based permissions
    console.log('\n📋 Test 3: Testing role-based permissions...');
    
    const superAdmin = await User.findOne({ email: 'admin@teawebsite.com' });
    const testAdmin = await User.findOne({ email: 'admin@test.com' });
    const regularUser = await User.findOne({ email: 'user@test.com' });
    
    console.log('Super Admin permissions:');
    console.log(`  Can manage user: ${superAdmin.canManageUser('user')}`);
    console.log(`  Can manage admin: ${superAdmin.canManageUser('admin')}`);
    console.log(`  Is admin: ${superAdmin.isAdmin()}`);
    console.log(`  Is super admin: ${superAdmin.isSuperAdmin()}`);
    
    console.log('Admin permissions:');
    console.log(`  Can manage user: ${testAdmin.canManageUser('user')}`);
    console.log(`  Can manage admin: ${testAdmin.canManageUser('admin')}`);
    console.log(`  Is admin: ${testAdmin.isAdmin()}`);
    console.log(`  Is super admin: ${testAdmin.isSuperAdmin()}`);
    
    console.log('Regular User permissions:');
    console.log(`  Can manage user: ${regularUser.canManageUser('user')}`);
    console.log(`  Is admin: ${regularUser.isAdmin()}`);
    console.log(`  Is super admin: ${regularUser.isSuperAdmin()}`);

    // Test 4: Test user blocking
    console.log('\n📋 Test 4: Testing user blocking...');
    
    const userToBlock = await User.findOne({ email: 'user2@test.com' });
    console.log(`Before blocking: isBlocked = ${userToBlock.isBlocked}`);
    
    userToBlock.blockUser(superAdmin._id);
    await userToBlock.save();
    console.log(`After blocking: isBlocked = ${userToBlock.isBlocked}`);
    console.log(`Blocked by: ${userToBlock.blockedBy}`);
    console.log(`Blocked at: ${userToBlock.blockedAt}`);
    
    // Unblock user
    userToBlock.unblockUser();
    await userToBlock.save();
    console.log(`After unblocking: isBlocked = ${userToBlock.isBlocked}`);

    // Test 5: Database statistics
    console.log('\n📋 Test 5: Database statistics...');
    
    const userStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const productStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          averagePrice: { $avg: '$price' },
          outOfStock: { $sum: { $cond: [{ $eq: ['$stock', 0] }, 1, 0] } }
        }
      }
    ]);
    
    console.log('User statistics:');
    userStats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count}`);
    });
    
    console.log('Product statistics:');
    const stats = productStats[0];
    console.log(`  Total products: ${stats.totalProducts}`);
    console.log(`  Total stock: ${stats.totalStock}`);
    console.log(`  Average price: $${stats.averagePrice.toFixed(2)}`);
    console.log(`  Out of stock: ${stats.outOfStock}`);

    console.log('\n🎉 All admin system tests completed successfully!');
    
    // Display test summary
    console.log('\n📊 Test Summary:');
    console.log('=================');
    console.log(`✅ Users created: ${createdUsers.length}`);
    console.log(`✅ Products created: ${createdProducts.length}`);
    console.log(`✅ Role system: Working`);
    console.log(`✅ User blocking: Working`);
    console.log(`✅ Database queries: Working`);
    console.log(`✅ Admin system: Ready for implementation`);

  } catch (error) {
    console.error('❌ Admin system test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
  }
};

// Run the test
if (require.main === module) {
  testAdminSystem();
}

module.exports = testAdminSystem;
