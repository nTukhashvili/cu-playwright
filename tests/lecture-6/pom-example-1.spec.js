const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login-page');

test.describe('Login Functionality', () => {
  let loginPage;

  test.use({baseURL:"https://www.saucedemo.com"})

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await loginPage.login('standar_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Failed login with invalid credentials', async ({ page }) => {
    await loginPage.login('invaliduser@example.com', 'invalidpassword123');

    // Assert that login failed
    await expect(page).toHaveURL('/');
    await expect(page.locator('//h3[@data-test="error"]')).toBeVisible();
  });

  

});