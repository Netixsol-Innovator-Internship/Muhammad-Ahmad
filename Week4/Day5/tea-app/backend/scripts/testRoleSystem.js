const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

class RoleSystemTester {
  constructor() {
    this.superAdminToken = '';
    this.adminToken = '';
    this.userToken = '';
  }

  async testLogin(email, password) {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password
      });
      
      console.log(`✅ Login successful for ${email}`);
      console.log(`   Role: ${response.data.data.user.role}`);
      console.log(`   Blocked: ${response.data.data.user.isBlocked || false}`);
      
      return response.data.data.token;
    } catch (error) {
      console.log(`❌ Login failed for ${email}:`, error.response?.data?.message || error.message);
      return null;
    }
  }

  async testAdminEndpoint(token, endpoint, method = 'GET', data = null) {
    try {
      const config = {
        method,
        url: `${API_BASE}${endpoint}`,
        headers: { Authorization: `Bearer ${token}` }
      };
      
      if (data) config.data = data;
      
      const response = await axios(config);
      console.log(`✅ ${method} ${endpoint} - Success`);
      return response.data;
    } catch (error) {
      console.log(`❌ ${method} ${endpoint} - Failed:`, error.response?.data?.message || error.message);
      return null;
    }
  }

  async runTests() {
    console.log('🔍 Testing Role-Based Authentication System\n');

    // Test logins
    console.log('=== Testing Logins ===');
    this.superAdminToken = await this.testLogin('superadmin@tea.com', 'SuperAdmin123');
    this.adminToken = await this.testLogin('admin@tea.com', 'Admin123');
    this.userToken = await this.testLogin('user@tea.com', 'User123');
    
    console.log('\n=== Testing Admin Endpoints ===');
    
    // Test get all users
    console.log('\n--- Get All Users ---');
    await this.testAdminEndpoint(this.superAdminToken, '/admin/users');
    await this.testAdminEndpoint(this.adminToken, '/admin/users');
    await this.testAdminEndpoint(this.userToken, '/admin/users');
    
    // Test create product (admin level)
    console.log('\n--- Create Product (Admin Required) ---');
    const productData = {
      name: 'Test Tea',
      description: 'A test tea product',
      price: 29.99,
      weight: '100g',
      collection: 'Test Collection'
    };
    
    await this.testAdminEndpoint(this.superAdminToken, '/products', 'POST', productData);
    await this.testAdminEndpoint(this.adminToken, '/products', 'POST', productData);
    await this.testAdminEndpoint(this.userToken, '/products', 'POST', productData);
    
    console.log('\n🎉 Role system testing completed!');
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  const tester = new RoleSystemTester();
  tester.runTests().catch(console.error);
}

module.exports = RoleSystemTester;
