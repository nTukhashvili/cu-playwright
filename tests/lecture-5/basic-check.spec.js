

import { test, expect } from '@playwright/test';

test('GET single object', async ({ playwright }) => {
  const api = await playwright.request.newContext({
    baseURL: 'https://api.restful-api.dev'
  });

  const response = await api.get('/objects/7');
  expect(response.status()).toBe(200);
  
  const object = await response.json();
  expect(object).toHaveProperty('id');
  expect(object).toHaveProperty('name');
});

test('GET multiple objects', async ({ playwright }) => {
  const api = await playwright.request.newContext({
    baseURL: 'https://api.restful-api.dev'
  });

  const response = await api.get('/objects');
  expect(response.status()).toBe(200);
  
  const objects = await response.json();
  expect(Array.isArray(objects)).toBeTruthy();
  expect(objects.length).toBeGreaterThan(0);
});