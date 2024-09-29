const { test, expect } = require('@playwright/test');

test('Handling different types of alerts', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');

  // Simple alert
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('You clicked a button');
    await dialog.dismiss();
  });
  await page.click('#alertButton');

  // Alert with timer
  const timerAlertPromise = page.waitForEvent('dialog');
  await page.click('#timerAlertButton');
  const timerDialog = await timerAlertPromise;
  expect(timerDialog.type()).toBe('alert');
  expect(timerDialog.message()).toBe('This alert appeared after 5 seconds');
  await timerDialog.dismiss();

  // Confirm box - Accept
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept();
  });

  
  await page.click('#confirmButton');
  await expect(page.locator('#confirmResult')).toContainText('You selected Ok');

  // Confirm box - Dismiss
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss();
  });
  await page.click('#confirmButton');
  await expect(page.locator('#confirmResult')).toContainText('You selected Cancel');

  // Prompt box
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.accept('Some Text');
  });
  await page.click('#promtButton');
  await expect(page.locator('#promptResult')).toContainText('You entered Some Text');
});