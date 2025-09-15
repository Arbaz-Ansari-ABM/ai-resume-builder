// Test connection between frontend and backend
const testConnection = async () => {
  try {
    console.log('🧪 Testing frontend-backend connection...');
    
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Connection Test',
        email: `test-${Date.now()}@example.com`,
        password: 'password123'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Connection successful!', data);
      return { success: true, data };
    } else {
      console.error('❌ Connection failed:', response.status, response.statusText);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error('❌ Connection error:', error);
    return { success: false, error: error.message };
  }
};

// Make it available globally for testing
window.testConnection = testConnection;

export default testConnection;
