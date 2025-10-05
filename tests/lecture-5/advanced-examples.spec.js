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
    const response = await apiContext.get('/posts/1');
    
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    
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
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
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
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost).toHaveProperty('id');
    
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
    
    expect(result.title).toBe(partialUpdate.title);
    expect(result).toHaveProperty('body');
    expect(result).toHaveProperty('userId');
    
    console.log('✓ PATCH request successful: Partially updated post');
  });

  test('DELETE request - Remove a resource', async () => {
    const response = await apiContext.delete('/posts/1');
    
    expect([200, 204]).toContain(response.status());
    
    console.log('✓ DELETE request successful: Deleted post 1');
  });

  test('GET request with query parameters', async () => {
    const response = await apiContext.get('/posts', {
      params: {
        userId: 1
      }
    });
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    
    expect(Array.isArray(posts)).toBeTruthy();
    posts.forEach(post => {
      expect(post.userId).toBe(1);
    });
    
    console.log(`✓ GET with params successful: Retrieved ${posts.length} posts for user 1`);
  });

  test('Verify response headers', async () => {
    const response = await apiContext.get('/posts/1');
    
    expect(response.status()).toBe(200);
    
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
  });
});

test.describe('API Mocking and Interception', () => {
  
  test('Mock API response completely', async ({ page }) => {
    console.log('Before mocking - would get real data from API');
    
    await page.route('**/posts/1', async (route) => {
      console.log('Intercepting request and returning mocked data');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          title: 'Mocked Post Title',
          body: 'This is mocked content',
          userId: 1
        })
      });
    });

    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const post = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return response.json();
    });

    console.log('After mocking - received:', post);
    expect(post.title).toBe('Mocked Post Title');
    expect(post.body).toBe('This is mocked content');
  });

  test('Intercept and modify real response', async ({ page }) => {
    console.log('Before interception - fetching real API data');
    
    await page.route('**/posts/1', async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      
      console.log('Original data from API:', body.title);
      
      body.title = 'MODIFIED: ' + body.title;
      body.intercepted = true;
      
      console.log('Modified data:', body.title);
      
      await route.fulfill({
        response,
        body: JSON.stringify(body)
      });
    });

    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const post = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return response.json();
    });

    console.log('After interception - received:', post.title);
    expect(post.title).toContain('MODIFIED:');
    expect(post.intercepted).toBe(true);
  });

  test('Mock error response', async ({ page }) => {
    console.log('Before mocking - would get 200 OK from API');
    
    await page.route('**/posts/1', async (route) => {
      console.log('Intercepting request and returning 500 error');
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Internal Server Error'
        })
      });
    });

    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const result = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return {
        status: response.status,
        data: await response.json()
      };
    });

    console.log('After mocking - received status:', result.status);
    console.log('Error message:', result.data.error);
    expect(result.status).toBe(500);
    expect(result.data.error).toBe('Internal Server Error');
  });
});