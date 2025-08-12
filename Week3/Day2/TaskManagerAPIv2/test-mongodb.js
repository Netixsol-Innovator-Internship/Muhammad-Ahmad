// MongoDB Connection Diagnostic Tool
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 MongoDB Connection Diagnostics\n');

// Check environment variables
console.log('📋 Environment Check:');
console.log('✓ MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('✓ JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('✓ NODE_ENV:', process.env.NODE_ENV || 'development');

if (!process.env.MONGODB_URI) {
    console.log('\n❌ MONGODB_URI is missing from .env file');
    process.exit(1);
}

// Extract connection details
const uri = process.env.MONGODB_URI;
const isAtlas = uri.includes('mongodb+srv://');
console.log('\n🌐 Connection Details:');
console.log('✓ Type:', isAtlas ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');

try {
    const url = new URL(uri.replace('mongodb+srv://', 'https://').replace('mongodb://', 'http://'));
    console.log('✓ Host:', url.hostname);
    console.log('✓ Database:', url.pathname.split('/')[1] || 'Not specified');
    console.log('✓ Username:', url.username || 'Not specified');
} catch (error) {
    console.log('⚠️  Could not parse connection string');
}

// Test connection
console.log('\n🔌 Testing Connection...');

const connectTest = async () => {
    try {
        console.log('⏳ Attempting to connect...');
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('✅ SUCCESS! MongoDB Connected');
        console.log('📍 Host:', conn.connection.host);
        console.log('📊 Database:', conn.connection.name);
        console.log('🔗 Ready State:', ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'][conn.connection.readyState]);
        
        // Test basic operation
        console.log('\n🧪 Testing Basic Operation...');
        const collections = await conn.connection.db.admin().listCollections().toArray();
        console.log('✅ Database is accessible');
        console.log('📦 Collections found:', collections.length);
        
        await mongoose.connection.close();
        console.log('\n🎉 All tests passed! Your MongoDB is ready to use.');
        
    } catch (error) {
        console.log('\n❌ Connection Failed!');
        console.log('📝 Error:', error.message);
        
        // Provide specific solutions
        if (error.message.includes('IP') || error.message.includes('whitelist')) {
            console.log('\n💡 Solution: Add your IP to MongoDB Atlas whitelist');
            console.log('   1. Go to https://cloud.mongodb.com/');
            console.log('   2. Navigate to Network Access');
            console.log('   3. Click "Add IP Address"');
            console.log('   4. Add your current IP or 0.0.0.0/0 for testing');
        } else if (error.message.includes('authentication')) {
            console.log('\n💡 Solution: Check your username and password');
            console.log('   1. Verify credentials in your .env file');
            console.log('   2. Check Database Users in Atlas');
            console.log('   3. Ensure user has readWrite permissions');
        } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
            console.log('\n💡 Solution: Check network connectivity');
            console.log('   1. Verify internet connection');
            console.log('   2. Check if cluster is running in Atlas');
            console.log('   3. Try connecting from a different network');
        }
        
        console.log('\n📚 For detailed help, see: MONGODB_ERROR_GUIDE.md');
    }
    
    process.exit(0);
};

connectTest();
