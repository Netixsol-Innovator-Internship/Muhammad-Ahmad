const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_BASE = 'http://localhost:5000/api';

class APITester {
  constructor() {
    this.token = null;
    this.testUserId = null;
    this.testProductId = null;
    this.testCartItemId = null;
  }

  async runTests() {
    console.log('🧪 Starting API Tests...\n');

    try {
      // Test server health
      await this.testHealthCheck();
      
      // Test authentication
      await this.testRegister();
      await this.testLogin();
      await this.testProfile();
      
      // Test products
      await this.testGetProducts();
      await this.testGetFilterOptions();
      await this.testCreateProduct();
      await this.testGetSingleProduct();
      await this.testUpdateProduct();
      
      // Test cart functionality
      await this.testAddToCart();
      await this.testGetCart();
      await this.testUpdateCartItem();
      await this.testRemoveCartItem();
      
      console.log('\n✅ All tests passed successfully!');
    } catch (error) {
      console.error('\n❌ Test failed:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  }

  async testHealthCheck() {
    console.log('🏥 Testing health check...');
    const response = await axios.get(`${API_BASE.replace('/api', '')}/health`);
    console.log('✅ Health check passed:', response.data.status);
  }

  async testRegister() {
    console.log('\n👤 Testing user registration...');
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'Password123'
    };

    const response = await axios.post(`${API_BASE}/auth/register`, userData);
    this.token = response.data.data.token;
    this.testUserId = response.data.data.user.id;
    console.log('✅ Registration successful');
  }

  async testLogin() {
    console.log('🔑 Testing user login...');
    const loginData = {
      email: `test${Date.now() - 1000}@example.com`, // Use a different email for login test
      password: 'Password123'
    };

    // Register a user first for login test
    await axios.post(`${API_BASE}/auth/register`, {
      name: 'Login Test User',
      ...loginData
    });

    const response = await axios.post(`${API_BASE}/auth/login`, loginData);
    console.log('✅ Login successful');
  }

  async testProfile() {
    console.log('👤 Testing get profile...');
    const response = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    console.log('✅ Profile fetch successful');
  }

  async testGetProducts() {
    console.log('\n📦 Testing get products...');
    const response = await axios.get(`${API_BASE}/products`);
    console.log(`✅ Found ${response.data.data.products.length} products`);
  }

  async testGetFilterOptions() {
    console.log('🔍 Testing filter options...');
    const response = await axios.get(`${API_BASE}/products/filters`);
    console.log('✅ Filter options retrieved');
  }

  async testCreateProduct() {
    console.log('➕ Testing create product...');
    const productData = {
      name: 'Test Tea',
      description: 'A test tea product',
      price: 9.99,
      weight: '50g',
      collection: 'Test Collection',
      origin: 'Test Origin',
      flavours: ['Test Flavour'],
      quality: 'Premium',
      caffeine: 'Medium',
      stock: 10
    };

    const response = await axios.post(`${API_BASE}/products`, productData);
    this.testProductId = response.data.data._id;
    console.log('✅ Product created successfully');
  }

  async testGetSingleProduct() {
    console.log('🔍 Testing get single product...');
    const response = await axios.get(`${API_BASE}/products/${this.testProductId}`);
    console.log('✅ Single product retrieved');
  }

  async testUpdateProduct() {
    console.log('✏️ Testing update product...');
    const updateData = {
      price: 12.99,
      stock: 15
    };

    const response = await axios.put(`${API_BASE}/products/${this.testProductId}`, updateData);
    console.log('✅ Product updated successfully');
  }

  async testAddToCart() {
    console.log('\n🛒 Testing add to cart...');
    const cartData = {
      productId: this.testProductId,
      qty: 2
    };

    const response = await axios.post(`${API_BASE}/cart`, cartData, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    
    if (response.data.data.items.length > 0) {
      this.testCartItemId = response.data.data.items[0]._id;
    }
    console.log('✅ Item added to cart');
  }

  async testGetCart() {
    console.log('👁️ Testing get cart...');
    const response = await axios.get(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    console.log(`✅ Cart retrieved with ${response.data.data.itemCount} items`);
  }

  async testUpdateCartItem() {
    console.log('✏️ Testing update cart item...');
    if (!this.testCartItemId) {
      console.log('⚠️ Skipping cart item update (no item ID)');
      return;
    }

    const response = await axios.put(`${API_BASE}/cart/item/${this.testCartItemId}`, 
      { qty: 3 }, 
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
    console.log('✅ Cart item updated');
  }

  async testRemoveCartItem() {
    console.log('🗑️ Testing remove cart item...');
    if (!this.testCartItemId) {
      console.log('⚠️ Skipping cart item removal (no item ID)');
      return;
    }

    const response = await axios.delete(`${API_BASE}/cart/item/${this.testCartItemId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    console.log('✅ Cart item removed');
  }
}

// Check if we need axios
const checkDependencies = () => {
  try {
    require('axios');
    return true;
  } catch (error) {
    console.error('❌ axios is required for testing. Install it with: npm install axios');
    return false;
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  if (checkDependencies()) {
    const tester = new APITester();
    tester.runTests();
  }
}

module.exports = APITester;
