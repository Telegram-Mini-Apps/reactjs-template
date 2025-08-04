// Test script for Vercel API endpoints
const BACKEND_URL = 'https://tma-ofm-react-template.vercel.app'; // Replace with your URL

async function testAPI() {
  console.log('🧪 Testing Vercel Backend API...\n');

  // 1. Health Check
  try {
    console.log('1️⃣ Health Check');
    const health = await fetch(`${BACKEND_URL}/health`);
    const healthData = await health.json();
    console.log('✅ Health:', healthData);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }

  // 2. Get Locations
  try {
    console.log('\n2️⃣ Get Locations');
    const locations = await fetch(`${BACKEND_URL}/api/locations`);
    const locationsData = await locations.json();
    console.log('✅ Locations:', locationsData.length + ' locations found');
  } catch (error) {
    console.log('❌ Get Locations Failed:', error.message);
  }

  // 3. Test User Creation
  try {
    console.log('\n3️⃣ Create Test User');
    const createUser = await fetch(`${BACKEND_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegramId: '12345',
        nickname: 'Test User',
        avatarUrl: null
      })
    });
    const userData = await createUser.json();
    console.log('✅ User Created:', userData);

    // 4. Get User
    console.log('\n4️⃣ Get User');
    const getUser = await fetch(`${BACKEND_URL}/api/users/12345`);
    const getUserData = await getUser.json();
    console.log('✅ User Retrieved:', getUserData);

  } catch (error) {
    console.log('❌ User Operations Failed:', error.message);
  }

  console.log('\n🎉 API Testing Complete!');
}

// Run if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;