const { test, expect } = require('@playwright/test');

test.describe('Filw Download', () => {
  test('File download', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.goto('https://demoqa.com/upload-download')
    await page.click('#downloadButton')
    const download = await downloadPromise;
    const path = await download.path();
    expect(path).toBeTruthy();



  })
});