const { test, expect } = require('@playwright/test');

test.describe('Advanced Playwright Examples', () => {
  test('Handling file downloads', async ({ page, context }) => {
    // Set up download handler
    const downloadPromise = page.waitForEvent('download');
    await page.goto('https://github.com/microsoft/playwright/releases');
    await page.click('a[href$=".zip"]');
    const download = await downloadPromise;
    
    // Wait for the download to complete
    const path = await download.path();
    expect(path).toBeTruthy();
  });

  test('Intercepting network requests', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
    await page.goto('https://example.com');
    // Now the page should load without images
  });

  test('Emulating mobile device', async ({ browser }) => {
    const iPhone11 = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
      viewport: { width: 414, height: 896 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    };
    const context = await browser.newContext({ ...iPhone11 });
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    // The page should now look like it's being viewed on an iPhone 11
  });

  test('Taking screenshots', async ({ page }) => {
    await page.goto('https://example.com');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
  });


  test('Geolocation and permissions', async ({ browser }) => {
    const context = await browser.newContext({
      geolocation: { latitude: 51.507351, longitude: -0.127758 },
      permissions: ['geolocation']
    });
    const page = await context.newPage();
    await page.goto('https://maps.google.com');
    // The map should now center on London
  });

  test('Testing responsive design', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
  });


  test('API testing', async ({ request }) => {
    const response = await request.get('https://api.github.com/users/microsoft');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.login).toBe('microsoft');
  });

//   test('Visual comparison testing', async ({ page }) => {
//     await page.goto('https://example.com');
//     expect(await page.screenshot()).toMatchSnapshot('homepage.png');
//   });
});