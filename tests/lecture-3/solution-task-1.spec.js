const { test, expect } = require('@playwright/test');

test('fill out student registration form', async ({ page }) => {
  await page.goto('./practice_form.html');
  
  await page.selectOption('#course-level', 'intermediate');
  await page.fill('#student-id', 'STU12345');
  await page.fill('#full-name', 'Alex Johnson');
  await page.check('#lang-javascript');
  await page.check('#lang-python');
  await page.check('#schedule-evening');
  await page.click('#submit-btn');
  
  await expect(page.locator('#success-message')).toBeVisible();
});