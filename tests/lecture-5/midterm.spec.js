const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');


test('Midterm', async ({ page }) => {
  // await page.goto('file:///C:/Users/Nika_Tukhashvili/Desktop/form-midterm-v2.html');
  await page.goto('file:///C:/Users/Nika_Tukhashvili/Desktop/e-commerce-midterm.html');



  //2
  const increaseButton = await page.locator('.product[data-name="Product A"] .increase-quantity');
  for (let i = 0; i < 4; i++) {
    await increaseButton.click();
  }

  //3
  await page.locator('.product[data-name="Product A"] .addToCart').click();

  //4
  const secondButton = await page.locator('.product[data-name="Product B"] .increase-quantity');
  for (let i = 0; i < 4; i++) {  
    await increaseButton.click();
  }

  //5
  await page.locator('.product[data-name="Product B"] .addToCart').click();

  //6
  await page.locator('#purchaseButton').click();

  //7
  const totalPriceText = await page.locator('#totalPrice').textContent();
  const totalPrice = parseInt(totalPriceText);
  if (totalPrice === 50) {
    console.log("Correct Price");
  } else {
    console.log("Incorrect Price");
  }

  //8
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    //9
    await dialog.accept();
  });


});