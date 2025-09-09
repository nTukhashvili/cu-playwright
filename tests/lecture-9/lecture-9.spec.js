// playwright-test.spec.js
const { test, expect } = require('@playwright/test');

test.describe('JSONPlaceholder API Test Suite', () => {
  let testUserId;
  let testPostId;

  // Setup - Create test data
  test.beforeAll(async ({ request }) => {
    // Create a test user
    const userResponse = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser'
      }
    });
    expect(userResponse.ok()).toBeTruthy();
    const userData = await userResponse.json();
    testUserId = userData.id;

    // Create a test post
    const postResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Test Post',
        body: 'This is a test post',
        userId: testUserId
      }
    });
    expect(postResponse.ok()).toBeTruthy();
    const postData = await postResponse.json();
    testPostId = postData.id;
  });

  // Teardown - Clean up test data
  test.afterAll(async ({ request }) => {
    // Delete test post
    if (testPostId) {
      const deletePostResponse = await request.delete(`https://jsonplaceholder.typicode.com/posts/${testPostId}`);
      expect(deletePostResponse.ok()).toBeTruthy();
    }

    // Delete test user
    if (testUserId) {
      const deleteUserResponse = await request.delete(`https://jsonplaceholder.typicode.com/users/${testUserId}`);
      expect(deleteUserResponse.ok()).toBeTruthy();
    }
  });

  // Test 1: Get all posts and verify response structure
  test('should get all posts and verify response structure', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.ok()).toBeTruthy();
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    
    // Verify first post structure
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  // Test 2: Create a new post and verify its content
  test('should create a new post and verify its content', async ({ request }) => {
    const newPost = {
      title: 'New Test Post',
      body: 'This is a test post body',
      userId: testUserId
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });
    expect(response.ok()).toBeTruthy();
    
    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost).toHaveProperty('id');
  });


});