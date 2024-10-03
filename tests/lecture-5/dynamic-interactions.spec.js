import { test, expect } from '@playwright/test';

test.describe("Dynamic Actions", () => {

    test("Test Double click", async ({page}) => {
        await page.goto('https://demoqa.com/buttons');
        // Double click Action
        await page.dblclick('#doubleClickBtn');
        // Right click
        await page.click('#rightClickBtn', { button: "right" });
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
        await page.wait

    });
  
    test('Move Element', async ({ page }) => {
        await page.goto('https://demoqa.com/sortable');
        
        const firstElement = await page.locator('#demo-tabpane-list > div > div:nth-child(1)');
        const lastElement = await page.locator('#demo-tabpane-list > div > div:nth-child(6)');
        
        for (let i = 0; i < 5; i++) {
            await firstElement.hover();
            await page.mouse.down();
            await lastElement.hover();
            await page.mouse.up();

            await lastElement.hover();
            await page.mouse.down();
            await firstElement.hover();
            await page.mouse.up();

            await page.waitForTimeout(1000);
        }

        await page.click('#demo-tab-grid');

        const gridElement = await page.locator('#demo-tabpane-grid > div > div > div:nth-child(1)');
        const lastGridElement = await page.locator('#demo-tabpane-grid > div > div > div:nth-child(9)');
        
        for (let i = 1; i <= 9; i++) {
            await page.waitForTimeout(2000);
            const element = await page.locator(`#demo-tabpane-grid > div > div > div:nth-child(${i})`);
            await element.hover();
            await page.mouse.down();
            await lastGridElement.hover();
            await page.mouse.up();
        }
    });
});