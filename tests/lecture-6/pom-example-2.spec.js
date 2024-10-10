const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login-page');
const ProductsPage = require('../../pages/product-page');

test.describe('Products Page', () => {
  let loginPage;
  let productPage;

  test.use({baseURL:"https://www.saucedemo.com"})

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
    productPage = new ProductsPage(page);
  });

  test('Check Count', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await productPage.addProductToCart('Sauce Labs Bike Light')
    const count = await productPage.getCartCount()
    console.log(count)



  });


});