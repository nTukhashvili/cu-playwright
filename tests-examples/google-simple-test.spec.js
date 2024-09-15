const { test, expect } = require('@playwright/test');

test('Search for cu.edu.ge on Google', async ({ page }) => {
  await page.goto('https://www.google.com');

  await page.waitForSelector('input[name="q"]');

  await page.fill('input[name="q"]', 'cu.edu.ge');

  await page.press('input[name="q"]', 'Enter');

  const title = await page.title();
  expect(title).toContain('cu.edu.ge');

  await page.waitForTimeout(5000);
});