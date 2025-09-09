// @ts-check
const { test, expect } = require('@playwright/test');

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Simple User API Tests', () => {
  let userId;
  let testPost;

  // Setup: Create a test user
  test.beforeAll(async ({ request }) => {
    console.log('\n🔧 Setup: Creating test user');
    const response = await request.post(`${API_BASE_URL}/users`, {
      data: {
        name: 'John Doe',
        email: 'john@test.com'
      }
    });
    const user = await response.json();
    userId = user.id;
    console.log('✅ Test user created with ID:', userId);
  });

  // Teardown: Remove test user and post
  test.afterAll(async ({ request }) => {
    console.log('\n🧹 Cleanup: Removing test data');
    if (testPost) {
      await request.delete(`${API_BASE_URL}/posts/${testPost.id}`);
    }
    await request.delete(`${API_BASE_URL}/users/${userId}`);
    console.log('✅ Cleanup completed');
  });

  // Test 1: Create a post for the user
  test('should create a post for user', async ({ request }) => {
    console.log('\n🔍 Test 1: Creating post');
    const response = await request.post(`${API_BASE_URL}/posts`, {
      data: {
        title: 'Test Post',
        body: 'Test Content',
        userId: userId
      }
    });
    
    testPost = await response.json();
    console.log('✅ Post created:', testPost.id);
    
    expect(response.status()).toBe(201);
    expect(testPost.title).toBe('Test Post');
  });

});