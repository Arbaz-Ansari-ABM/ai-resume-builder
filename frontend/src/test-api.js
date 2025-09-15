// Test API connection
import api from './utils/api';

export const testAPI = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test registration
    const response = await api.post('/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ API Test Successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return { success: false, error: error.message };
  }
};

// Test login
export const testLogin = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    console.log('✅ Login Test Successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Login Test Failed:', error);
    return { success: false, error: error.message };
  }
};
