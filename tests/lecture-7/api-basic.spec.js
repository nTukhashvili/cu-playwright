// @ts-check
const { test, expect } = require('@playwright/test');

// Base URL for JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Testing with Playwright', () => {
  // Basic GET request
  test('should fetch a specific post', async ({ request }) => {
    console.log('\n🔍 Testing GET request for a specific post...');
    
    const response = await request.get(`${API_BASE_URL}/posts/1`);
    expect(response.ok()).toBeTruthy();
    
    const post = await response.json();
    console.log('📄 Retrieved post:', JSON.stringify(post, null, 2));
    
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  });

  // POST request with body
  test('should create a new post', async ({ request }) => {
    console.log('\n📝 Testing POST request to create a new post...');
    
    const newPost = {
      title: 'Playwright Testing',
      body: 'Testing API capabilities with Playwright',
      userId: 1
    };
    console.log('📤 Sending data:', JSON.stringify(newPost, null, 2));

    const response = await request.post(`${API_BASE_URL}/posts`, {
      data: newPost
    });
    expect(response.ok()).toBeTruthy();
    
    const createdPost = await response.json();
    console.log('📥 Created post:', JSON.stringify(createdPost, null, 2));
    
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
  });

  // Chaining requests example
  test('should fetch user and their posts', async ({ request }) => {
    console.log('\n🔄 Testing chained requests (user -> posts)...');
    
    // First request: Get user
    console.log('👤 Fetching user data...');
    const userResponse = await request.get(`${API_BASE_URL}/users/1`);
    expect(userResponse.ok()).toBeTruthy();
    const user = await userResponse.json();
    console.log('User data:', JSON.stringify(user, null, 2));

    // Second request: Get user's posts
    console.log(`📚 Fetching posts for user ${user.id}...`);
    const postsResponse = await request.get(`${API_BASE_URL}/users/${user.id}/posts`);
    expect(postsResponse.ok()).toBeTruthy();
    const posts = await postsResponse.json();
    console.log(`Found ${posts.length} posts for user`);
    console.log('First post:', JSON.stringify(posts[0], null, 2));
  });

  // Testing with query parameters
  test('should filter todos by user ID', async ({ request }) => {
    console.log('\n🔍 Testing GET request with query parameters...');
    
    console.log('Filtering todos: userId=1, completed=false');
    const response = await request.get(`${API_BASE_URL}/todos`, {
      params: {
        userId: '1',
        completed: 'false'
      }
    });
    
    const todos = await response.json();
    console.log(`📋 Found ${todos.length} incomplete todos for user 1`);
    console.log('First todo:', JSON.stringify(todos[0], null, 2));
  });

  // Testing response headers and status codes
  test('should verify response details', async ({ request }) => {
    console.log('\n🔍 Testing response headers and status...');
    
    const response = await request.get(`${API_BASE_URL}/posts/1`);
    
    // Status code check
    console.log('📊 Status Code:', response.status());
    
    // Headers check
    const headers = response.headers();
    console.log('📋 Response Headers:', JSON.stringify(headers, null, 2));
    
    // Response body check
    const post = await response.json();
    console.log('📄 Response Body:', JSON.stringify(post, null, 2));
  });

  // PUT request example
  test('should update a post', async ({ request }) => {
    console.log('\n✏️ Testing PUT request to update a post...');
    
    const updatedData = {
      title: 'Updated Title',
      body: 'This is an updated post',
      userId: 1
    };
    console.log('📤 Sending update:', JSON.stringify(updatedData, null, 2));

    const response = await request.put(`${API_BASE_URL}/posts/1`, {
      data: updatedData
    });

    const updatedPost = await response.json();
    console.log('📥 Updated post:', JSON.stringify(updatedPost, null, 2));
  });

  // DELETE request example
  test('should delete a post', async ({ request }) => {
    console.log('\n❌ Testing DELETE request...');
    
    const response = await request.delete(`${API_BASE_URL}/posts/1`);
    console.log('Status Code:', response.status());
    console.log('Post deleted successfully');
  });

  // Error handling example
  test('should handle 404 errors', async ({ request }) => {
    console.log('\n⚠️ Testing error handling (404)...');
    
    const response = await request.get(`${API_BASE_URL}/posts/999`);
    console.log('Status Code:', response.status());
    
    const body = await response.json();
    console.log('Error Response:', JSON.stringify(body, null, 2));
  });

  // Parallel requests example
  test('should fetch multiple posts simultaneously', async ({ request }) => {
    console.log('\n⚡ Testing parallel requests...');
    
    const postIds = [1, 2, 3];
    console.log(`Fetching posts with IDs: ${postIds.join(', ')}`);
    
    const requests = postIds.map(id => 
      request.get(`${API_BASE_URL}/posts/${id}`)
        .then(response => response.json())
    );

    const posts = await Promise.all(requests);
    console.log('\nRetrieved posts:');
    posts.forEach(post => {
      console.log(`\nPost ${post.id}:`, JSON.stringify(post, null, 2));
    });
  });

  // Authentication example
  test('should send request with auth header', async ({ request }) => {
    console.log('\n🔐 Testing authenticated request...');
    
    const headers = {
      'Authorization': 'Bearer your-token-here',
      'Custom-Header': 'custom-value'
    };
    console.log('Request Headers:', JSON.stringify(headers, null, 2));

    const response = await request.get(`${API_BASE_URL}/posts/1`, { headers });
    console.log('Status Code:', response.status());
    
    const post = await response.json();
    console.log('Retrieved post:', JSON.stringify(post, null, 2));
  });

  // Testing response time
  test('should check response time', async ({ request }) => {
    console.log('\n⏱️ Testing response time...');
    
    const startTime = Date.now();
    console.log('Starting request...');
    
    const response = await request.get(`${API_BASE_URL}/posts/1`);
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    console.log(`Response Time: ${responseTime}ms`);
    console.log('Status:', response.status());
    
    const post = await response.json();
    console.log('Retrieved post:', JSON.stringify(post, null, 2));
  });
});