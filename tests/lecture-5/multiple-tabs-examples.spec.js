const { test, expect } = require('@playwright/test');

test.describe('Multiple Tabs Handling', () => {
  test('Opening and managing multiple tabs', async ({ context }) => {

    // Example 1: Opening a new tab
    const page1 = await context.newPage();
    await page1.goto('https://example.com');
    
    const page2 = await context.newPage();
    await page2.goto('https://playwright.dev');

    expect(context.pages().length).toBe(2);

    // Example 2: Handling a new tab opened by clicking a link
    const page3 = await context.newPage();
    await page3.goto('https://www.wikipedia.org');

    // Example 3: Iterating through all open tabs
    for (const page of context.pages()) {
      expect(page.url()).not.toBe('');
    }

    // Example 4: Closing a specific tab
    await page2.close();
    expect(context.pages().length).toBe(2);

    // Example 5: Working with multiple tabs simultaneously
    const page4 = await context.newPage();
    await page4.goto('https://example.com');
    
    const page5 = await context.newPage();
    await page5.goto('https://playwright.dev');

    const [title4, title5] = await Promise.all([
      page4.title(),
      page5.title()
    ]);

    expect(title4).toBe('Example Domain');
    expect(title5).toContain('Playwright');

    // Example 6: Bringing a background tab to the foreground
    await page5.bringToFront();
    expect(page5.url()).toContain('playwright.dev');
  });

  test('Handling dynamically opened tabs', async ({ page }) => {
    await page.goto('https://www.example.com');

    // Simulate opening a new tab programmatically
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.evaluate(() => window.open('https://playwright.dev'))
    ]);

    await newPage.waitForLoadState();
    expect(await newPage.title()).toContain('Playwright');

    // Switch back to the original tab
    await page.bringToFront();
    expect(page.url()).toBe('https://www.example.com/');
  });

  test('Working with tabs in different contexts', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto('https://example.com');
    await page2.goto('https://playwright.dev');

    expect(await page1.title()).toBe('Example Domain');
    expect(await page2.title()).toContain('Playwright');

    await context1.close();
    await context2.close();
  });
});