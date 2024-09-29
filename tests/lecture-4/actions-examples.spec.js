// actionsDemo.test.js
const { test, expect } = require('@playwright/test');

test.describe('Actions Demo Tests', () => {
  test.use({baseURL:'https://demoqa.com/', viewport: { width: 1920, height: 1080 }})

  test('Resize Demo Test', async ({ page }) => {
    await page.goto('https://demoqa.com/resizable');
    
    const resizable = await page.locator('#resizableBoxWithRestriction span');
    const resizable2 = await page.locator('#resizable span');
    
    await resizable.hover();
    await page.mouse.down();
    await page.mouse.move(100, 100); // Move by offset
    await page.mouse.up();
    
    for (let i = 0; i < 5; i++) {
      await page.waitForTimeout(2000);
      await resizable2.hover();
      await page.mouse.down();
      await page.mouse.move(100, 100);
      await page.mouse.up();
    }
  });

  test('Move Element Demo Test', async ({ page }) => {
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


  test('Draggable Test', async ({ page }) => {
    await page.goto('https://demoqa.com/dragabble');
    
    const draggableBox = await page.locator('#dragBox');
    
    for (let i = 0; i < 10; i++) {
      await page.waitForTimeout(1000);
      if (i % 2 === 0) {
        await draggableBox.dragTo(draggableBox, { targetPosition: { x: 50, y: 50 } });
      } else {
        await draggableBox.dragTo(draggableBox, { targetPosition: { x: -50, y: -50 } });
      }
    }
  });

});
