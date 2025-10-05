// basic-api-examples.spec.js
// Basic API Request Context examples using JSONPlaceholder API
// Run with: npx playwright test basic-api-examples.spec.js

import { test, expect } from '@playwright/test';

// Base URL for our public API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Request Context - Basic HTTP Methods', () => {
  let apiContext;

  // Create API context before all tests
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  });

  // Cleanup after all tests
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('GET request - Fetch a single post', async () => {
    // Make GET request
    const response = await apiContext.get('/posts/1');
    
    // Check status code
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    
    // Parse and validate response body
    const post = await response.json();
    
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    
    console.log('✓ GET request successful:', post.title);
  });

  test('GET request - Fetch all users', async () => {
    const response = await apiContext.get('/users');
    
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    
    // Validate array response
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    // Check first user structure
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    
    console.log(`✓ GET request successful: Retrieved ${users.length} users`);
  });

  test('POST request - Create a new post', async () => {
    const newPost = {
      title: 'Testing with Playwright',
      body: 'This is a test post created via API',
      userId: 1
    };
    
    const response = await apiContext.post('/posts', {
      data: newPost
    });
    
    // POST typically returns 201 Created
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    
    // Validate the created resource
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost).toHaveProperty('id'); // Server assigns ID
    
    console.log('✓ POST request successful: Created post with ID', createdPost.id);
  });

  test('PUT request - Update entire resource', async () => {
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'This post has been completely updated',
      userId: 1
    };
    
    const response = await apiContext.put('/posts/1', {
      data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    
    const result = await response.json();
    
    expect(result.title).toBe(updatedPost.title);
    expect(result.body).toBe(updatedPost.body);
    expect(result.id).toBe(1);
    
    console.log('✓ PUT request successful: Updated post', result.id);
  });

  test('PATCH request - Partial update', async () => {
    const partialUpdate = {
      title: 'Only Title Updated'
    };
    
    const response = await apiContext.patch('/posts/1', {
      data: partialUpdate
    });
    
    expect(response.status()).toBe(200);
    
    const result = await response.json();
    
    // Title should be updated
    expect(result.title).toBe(partialUpdate.title);
    // Other fields should remain
    expect(result).toHaveProperty('body');
    expect(result).toHaveProperty('userId');
    
    console.log('✓ PATCH request successful: Partially updated post');
  });

  test('DELETE request - Remove a resource', async () => {
    const response = await apiContext.delete('/posts/1');
    
    // DELETE typically returns 200 or 204 No Content
    expect([200, 204]).toContain(response.status());
    
    console.log('✓ DELETE request successful: Deleted post 1');
  });

  test('GET request with query parameters', async () => {
    // Fetch posts filtered by userId
    const response = await apiContext.get('/posts', {
      params: {
        userId: 1
      }
    });
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    
    // All posts should belong to userId 1
    expect(Array.isArray(posts)).toBeTruthy();
    posts.forEach(post => {
      expect(post.userId).toBe(1);
    });
    
    console.log(`✓ GET with params successful: Retrieved ${posts.length} posts for user 1`);
  });

  test('Verify response headers', async () => {
    const response = await apiContext.get('/posts/1');
    
    expect(response.status()).toBe(200);
    
    // Check important headers
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    
  });


});