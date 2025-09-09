// @ts-check
const { test, expect } = require('@playwright/test');

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// 1. Test-specific headers examples
test.describe('JSONPlaceholder API Tests with Headers', () => {
  
  // Simple GET with headers
  test('get posts with specific headers', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts`, {
      headers: {
        'Accept': 'application/json',
        'Custom-Header': 'test-value',
        'User-Agent': 'Playwright-Test'
      }
    });

    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
  });

  // POST with content-type header
  test('create post with headers', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': '123456'
      },
      data: {
        title: 'Test Post',
        body: 'This is a test post',
        userId: 1
      }
    });

    expect(response.status()).toBe(201); // Created
    const post = await response.json();
    expect(post.title).toBe('Test Post');
  });

  // Multiple requests with different headers
  test('multiple requests with different headers', async ({ request }) => {
    // First request with one set of headers
    const getPosts = await request.get(`${API_BASE_URL}/posts`, {
      headers: {
        'Accept': 'application/json',
        'X-Request-Type': 'GET-Posts'
      }
    });

    // Second request with different headers
    const getComments = await request.get(`${API_BASE_URL}/comments`, {
      headers: {
        'Accept': 'application/json',
        'X-Request-Type': 'GET-Comments'
      }
    });

    expect(getPosts.ok()).toBeTruthy();
    expect(getComments.ok()).toBeTruthy();
  });
});

// 2. Global headers configuration
// First, create a test fixture with global headers
const test2 = test.extend({
  // Auto-attach these headers to all requests
  autoHeaders: async ({ request }, use) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Test-Framework': 'Playwright'
    };
    await use(headers);
  }
});

test2.describe('Tests with Global Headers', () => {
  test2('get posts using global headers', async ({ request, autoHeaders }) => {
    const response = await request.get(`${API_BASE_URL}/posts`, {
      headers: autoHeaders
    });
    
    expect(response.ok()).toBeTruthy();
  });

  // Combining global and specific headers
  test2('combine global and specific headers', async ({ request, autoHeaders }) => {
    const response = await request.post(`${API_BASE_URL}/posts`, {
      headers: {
        ...autoHeaders,
        'X-Custom-Header': 'specific-value'
      },
      data: {
        title: 'New Post',
        body: 'Post content',
        userId: 1
      }
    });

    expect(response.status()).toBe(201);
  });
});

// 3. Practical examples with error handling
test.describe('Error Handling with Headers', () => {
  test('handle 404 with custom headers', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts/999`, {
      headers: {
        'Accept': 'application/json',
        'X-Error-Trace': 'test-error-trace'
      }
    });

    expect(response.status()).toBe(404);
  });

  // Testing different content types
  test('verify content type headers', async ({ request }) => {
    // Request JSON
    const jsonResponse = await request.get(`${API_BASE_URL}/posts/1`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    expect(jsonResponse.headers()['content-type']).toContain('application/json');

    // Request with different accept header
    const response = await request.get(`${API_BASE_URL}/posts/1`, {
      headers: {
        'Accept': 'application/xml'  // JSONPlaceholder will still return JSON
      }
    });
    
    // Verify response headers
    const responseHeaders = response.headers();
    console.log('Response headers:', responseHeaders);
  });
});

// 4. Helper functions for headers
const getRequestHeaders = (requestType) => {
  const commonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Request-Time': new Date().toISOString()
  };

  switch(requestType) {
    case 'GET':
      return {
        ...commonHeaders,
        'Cache-Control': 'no-cache'
      };
    case 'POST':
      return {
        ...commonHeaders,
        'X-Request-Type': 'Creation'
      };
    default:
      return commonHeaders;
  }
};

// Using helper function
test('use helper function for headers', async ({ request }) => {
  const response = await request.get(`${API_BASE_URL}/posts`, {
    headers: getRequestHeaders('GET')
  });

  expect(response.ok()).toBeTruthy();
});

// 5. Testing different HTTP methods with headers
test('test all HTTP methods with headers', async ({ request }) => {
  // GET
  const getResponse = await request.get(`${API_BASE_URL}/posts/1`, {
    headers: getRequestHeaders('GET')
  });
  expect(getResponse.ok()).toBeTruthy();

  // POST
  const postResponse = await request.post(`${API_BASE_URL}/posts`, {
    headers: getRequestHeaders('POST'),
    data: {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
  });
  expect(postResponse.status()).toBe(201);

  // PUT
  const putResponse = await request.put(`${API_BASE_URL}/posts/1`, {
    headers: getRequestHeaders('PUT'),
    data: {
      id: 1,
      title: 'updated foo',
      body: 'updated bar',
      userId: 1
    }
  });
  expect(putResponse.ok()).toBeTruthy();

  // DELETE
  const deleteResponse = await request.delete(`${API_BASE_URL}/posts/1`, {
    headers: getRequestHeaders('DELETE')
  });
  expect(deleteResponse.ok()).toBeTruthy();
});