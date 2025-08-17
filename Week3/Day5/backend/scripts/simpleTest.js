const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function simpleTest() {
  console.log('🧪 Starting Simple API Tests...\n');

  try {
    // Test health check
    console.log('🏥 Testing health check...');
    const health = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', health.data.status);

    // Test get products
    console.log('\n📦 Testing get products...');
    const products = await axios.get(`${API_BASE}/products`);
    console.log(`✅ Found ${products.data.data.products.length} products`);

    // Test register
    console.log('\n👤 Testing user registration...');
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'Password123'
    };

    const registerResponse = await axios.post(`${API_BASE}/auth/register`, userData);
    console.log('✅ Registration successful');
    
    const token = registerResponse.data.data.token;

    // Test get profile
    console.log('👤 Testing get profile...');
    const profile = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile fetch successful');

    // Test get cart
    console.log('\n🛒 Testing get cart...');
    const cart = await axios.get(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Cart retrieved successfully');

    console.log('\n✅ All basic tests passed!');
    console.log('\n🎉 Your backend is working correctly!');
    console.log('\n📖 Visit http://localhost:5000/docs for API documentation');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

simpleTest();
