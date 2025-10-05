const { test, expect } = require('@playwright/test');

// Base URL - update this to your actual URL
const BASE_URL = 'C:\\Users\\Nika_Tukhashvili\\Desktop\\cu-playwright\\tests\\lecture-4\\new-examples\\automation-demo-page.html'; // Change to your demo page URL

test.describe('Alert Dialog Tests', () => {
  
  test('should handle alert dialog', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Setup dialog handler before triggering
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('This is a simple alert!');
      await dialog.accept();
    });
    
    await page.waitForTimeout(3000)
    await page.locator('#btn-alert').click();
    
    // Verify result text updated
    await expect(page.locator('#alert-result')).toContainText('Alert was shown');
  });

});



// test.describe('Form Elements Tests', () => {
  
//   test('should fill text input', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const textInput = page.locator('#input-text');
//     await textInput.fill('Test Automation');
    
//     await expect(textInput).toHaveValue('Test Automation');
//   });

//   test('should fill email input', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const emailInput = page.locator('#input-email');
//     await emailInput.fill('test@automation.com');
    
//     await expect(emailInput).toHaveValue('test@automation.com');
//   });

//   test('should select dropdown option', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const dropdown = page.locator('#select-dropdown');
//     await dropdown.selectOption('option2');
    
//     await expect(dropdown).toHaveValue('option2');
//   });

//   test('should select date', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const dateInput = page.locator('#input-date');
//     await dateInput.fill('2025-12-31');
    
//     await expect(dateInput).toHaveValue('2025-12-31');
//   });

//   test('should check checkbox', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const checkbox1 = page.locator('#checkbox-1');
//     await checkbox1.check();
    
//     await expect(checkbox1).toBeChecked();
//   });

//   test('should select radio button', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const radio2 = page.locator('#radio-2');
//     await radio2.check();
    
//     await expect(radio2).toBeChecked();
//   });

// });

// test.describe('Slider Tests with Mouse Actions', () => {
  
//   test('should move range slider using mouse drag', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const slider = page.locator('#range-slider');
//     const sliderDisplay = page.locator('#slider-value-display');
    
//     // Get slider bounding box
//     const sliderBox = await slider.boundingBox();
    
//     // Calculate position for 75% (right side of slider)
//     const targetX = sliderBox.x + (sliderBox.width * 0.75);
//     const targetY = sliderBox.y + (sliderBox.height / 2);
    
//     // Drag slider to 75% position
//     await slider.hover();
//     await page.mouse.down();
//     await page.mouse.move(targetX, targetY);
//     await page.mouse.up();
    
//     // Wait for value to update
//     await page.waitForTimeout(500);
    
//     // Verify slider moved (value should be around 75)
//     const displayText = await sliderDisplay.textContent();
//     const value = parseInt(displayText.replace('Value: ', ''));
//     expect(value).toBeGreaterThan(70);
//     expect(value).toBeLessThan(80);
//   });

//   test('should move jQuery UI slider using mouse drag', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const jquerySlider = page.locator('#jquery-slider');
//     const sliderHandle = jquerySlider.locator('.ui-slider-handle');
//     const valueDisplay = page.locator('#jquery-slider-value');
    
//     // Get slider bounding box
//     const sliderBox = await jquerySlider.boundingBox();
    
//     // Calculate position for 80% of slider
//     const targetX = sliderBox.x + (sliderBox.width * 0.80);
//     const targetY = sliderBox.y + (sliderBox.height / 2);
    
//     // Drag the handle
//     await sliderHandle.hover();
//     await page.mouse.down();
//     await page.mouse.move(targetX, targetY, { steps: 10 });
//     await page.mouse.up();
    
//     // Wait for value update
//     await page.waitForTimeout(500);
    
//     // Verify value is around 80
//     const displayText = await valueDisplay.textContent();
//     const value = parseInt(displayText.replace('Value: ', ''));
//     expect(value).toBeGreaterThan(75);
//     expect(value).toBeLessThan(85);
//   });

// });

// test.describe('Toggle Switch Tests', () => {
  
//   test('should toggle switch on and off', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const toggle1 = page.locator('#toggle-switch-1');
//     const statusDisplay = page.locator('#toggle-status');
    
//     // Toggle is initially ON, turn it OFF
//     await toggle1.click();
//     await expect(toggle1).not.toBeChecked();
//     await expect(statusDisplay).toContainText('Switch 1 is OFF');
    
//     // Turn it back ON
//     await toggle1.click();
//     await expect(toggle1).toBeChecked();
//     await expect(statusDisplay).toContainText('Switch 1 is ON');
//   });

//   test('should toggle second switch', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const toggle2 = page.locator('#toggle-switch-2');
//     const statusDisplay = page.locator('#toggle-status');
    
//     // Toggle is initially OFF, turn it ON
//     await toggle2.click();
//     await expect(toggle2).toBeChecked();
//     await expect(statusDisplay).toContainText('Switch 2 is ON');
    
//     // Turn it back OFF
//     await toggle2.click();
//     await expect(toggle2).not.toBeChecked();
//     await expect(statusDisplay).toContainText('Switch 2 is OFF');
//   });

// });

// test.describe('Sortable List Tests', () => {
  
//   test('should drag first item to last position', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const firstItem = page.locator('[data-item-id="item-1"]');
//     const lastItem = page.locator('[data-item-id="item-5"]');
    
//     // Get initial position
//     const firstItemText = await firstItem.textContent();
    
//     // Get bounding boxes
//     const sourceBox = await firstItem.boundingBox();
//     const targetBox = await lastItem.boundingBox();
    
//     // Perform drag and drop
//     await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
//     await page.mouse.down();
//     await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height + 10, { steps: 5 });
//     await page.mouse.up();
    
//     // Wait for animation
//     await page.waitForTimeout(500);
    
//     // Verify the item moved - it should now be at the bottom
//     const sortableItems = page.locator('#sortable-list .sortable-item');
//     const lastItemInList = sortableItems.nth(4);
//   });

//   test('should loop through all items and move each to the end', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const sortableList = page.locator('#sortable-list');
    
//     // Get initial count of items
//     const itemCount = await sortableList.locator('.sortable-item').count();
//     console.log(`Total items in sortable list: ${itemCount}`);
    
//     // Loop through each item (except the last one as it's already at the end)
//     for (let i = 0; i < itemCount - 1; i++) {
//       // Always get the first item since we're moving it to the end
//       const currentFirstItem = sortableList.locator('.sortable-item').first();
//       const currentFirstText = await currentFirstItem.textContent();
//       console.log(`Moving item: ${currentFirstText}`);
      
//       // Get all items to find the last one
//       const allItems = sortableList.locator('.sortable-item');
//       const lastItem = allItems.nth(itemCount - 1);
      
//       // Get bounding boxes
//       const sourceBox = await currentFirstItem.boundingBox();
//       const targetBox = await lastItem.boundingBox();
      
//       // Perform drag to end of list
//       await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
//       await page.mouse.down();
//       await page.mouse.move(
//         targetBox.x + targetBox.width / 2, 
//         targetBox.y + targetBox.height + 20, 
//         { steps: 5 }
//       );
//       await page.mouse.up();
      
//       // Wait for animation and DOM update
//       await page.waitForTimeout(500);
      
//       console.log(`Moved ${currentFirstText} to the end`);
//     }
    
//     // Verify final order (should be reversed: 5, 4, 3, 2, 1)
//     const finalItems = await sortableList.locator('.sortable-item').allTextContents();
//     console.log('Final order:', finalItems);
//   });

// });


// test.describe('Selectable Grid Tests', () => {
  
//   test('should select grid items by clicking', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const gridItem1 = page.locator('[data-grid-id="grid-1"]');
//     const gridItem5 = page.locator('[data-grid-id="grid-5"]');
//     const selectionCount = page.locator('#selection-count');
    
//     // Click to select
//     await gridItem1.click();
//     await gridItem5.click();
    
//     // Verify selection
//     await expect(gridItem1).toHaveClass(/selected/);
//     await expect(gridItem5).toHaveClass(/selected/);
//     await expect(selectionCount).toContainText('Selected: 2 items');
//   });

//   test('should clear all grid selections', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     // Select multiple items
//     await page.locator('[data-grid-id="grid-1"]').click();
//     await page.locator('[data-grid-id="grid-3"]').click();
//     await page.locator('[data-grid-id="grid-7"]').click();
    
//     const selectionCount = page.locator('#selection-count');
//     await expect(selectionCount).toContainText('Selected: 3 items');
    
//     // Clear selection
//     await page.locator('#btn-clear-selection').click();
    
//     // Verify cleared
//     await expect(selectionCount).toContainText('Selected: 0 items');
//     const selectedItems = page.locator('.grid-item.selected');
//     await expect(selectedItems).toHaveCount(0);
//   });

// });


// test.describe('Drag and Drop Tests', () => {
  
//   test('should drag item from source to target zone', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const sourceZone = page.locator('#source-zone');
//     const targetZone = page.locator('#target-zone');
//     const draggableItem = page.locator('[data-drag-id="drag-1"]');
    
//     // Perform drag and drop using Playwright's built-in method
//     await draggableItem.dragTo(targetZone);
    
//     // Wait for drop animation
//     await page.waitForTimeout(500);
    
//     // Verify item is now in target zone
//     const itemInTarget = targetZone.locator('[data-drag-id="drag-1"]');
//     await expect(itemInTarget).toBeVisible();
//   });

//   test('should drag multiple items to target zone', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const sourceZone = page.locator('#source-zone');
//     const targetZone = page.locator('#target-zone');
    
//     // Drag items 2, 3, and 4
//     const itemsToDrag = ['drag-2', 'drag-3', 'drag-4'];
    
//     for (const itemId of itemsToDrag) {
//       const draggableItem = page.locator(`[data-drag-id="${itemId}"]`);
      
//       // Drag to target using dragTo method
//       await draggableItem.dragTo(targetZone);
      
//       await page.waitForTimeout(300);
//     }
//   });

// });



//   test('should handle confirm dialog with OK', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     page.on('dialog', async dialog => {
//       expect(dialog.type()).toBe('confirm');
//       expect(dialog.message()).toBe('Do you confirm this action?');
//       await dialog.accept();
//     });
    
//     await page.locator('#btn-confirm').click();
    
//     await expect(page.locator('#alert-result')).toContainText('Confirm result: OK');
//   });

//   test('should handle confirm dialog with Cancel', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     page.on('dialog', async dialog => {
//       expect(dialog.type()).toBe('confirm');
//       await dialog.dismiss();
//     });
    
//     await page.locator('#btn-confirm').click();
    
//     await expect(page.locator('#alert-result')).toContainText('Confirm result: Cancel');
//   });

//   test('should handle prompt dialog with input', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     page.on('dialog', async dialog => {
//       expect(dialog.type()).toBe('prompt');
//       expect(dialog.message()).toBe('Please enter your name:');
//       await dialog.accept('John Doe');
//     });
    
//     await page.locator('#btn-prompt').click();
    
//     await expect(page.locator('#alert-result')).toContainText('Prompt result: John Doe');
//   });

// });

// test.describe('Progress Bar Tests', () => {
  
//   test('should start and complete progress bar', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const progressBar = page.locator('#progress-bar');
//     const startButton = page.locator('#btn-start-progress');
    
//     // Start progress
//     await startButton.click();
    
//     // Wait for progress to complete (should take about 5 seconds)
//     await page.waitForTimeout(6000);
    
//     // Verify progress reached 100%

//   });

//   test('should reset progress bar', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const progressBar = page.locator('#progress-bar');
//     const startButton = page.locator('#btn-start-progress');
//     const resetButton = page.locator('#btn-reset-progress');
    
//     // Start progress
//     await startButton.click();
//     await page.waitForTimeout(2000);
    
//     // Reset progress
//     await resetButton.click();
    
//     // Verify reset to 0%
//     await expect(progressBar).toContainText('0%');
//   });

// });

// test.describe('Scroll Tests', () => {
  
//   test('should scroll to target element', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const scrollableArea = page.locator('#scrollable-area');
//     const scrollButton = page.locator('#btn-scroll-to-target');
//     const target = page.locator('#scroll-target');
    
//     // Verify target is not in view initially
//     const initialScrollTop = await scrollableArea.evaluate(el => el.scrollTop);
//     expect(initialScrollTop).toBe(0);
    
//     // Click scroll button
//     await scrollButton.click();
    
//     // Wait for scroll animation
//     await page.waitForTimeout(1500);
    
//     // Verify scrolled down
//     const finalScrollTop = await scrollableArea.evaluate(el => el.scrollTop);
//     expect(finalScrollTop).toBeGreaterThan(0);
    
//     // Verify target is visible
//     await expect(target).toBeVisible();
//   });

//   test('should manually scroll within scrollable area', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     const scrollableArea = page.locator('#scrollable-area');
    
//     // Get initial scroll position
//     const initialScroll = await scrollableArea.evaluate(el => el.scrollTop);
    
//     // Scroll using wheel event
//     await scrollableArea.hover();
//     await page.mouse.wheel(0, 100);
    
//     await page.waitForTimeout(500);
    
//     // Verify scrolled
//     const finalScroll = await scrollableArea.evaluate(el => el.scrollTop);
//     expect(finalScroll).toBeGreaterThan(initialScroll);
//   });

// });

// test.describe('Complete Form Submission Test', () => {
  
//   test('should fill entire form and submit', async ({ page }) => {
//     await page.goto(BASE_URL);
    
//     // Setup dialog handler for form submission
//     page.on('dialog', async dialog => {
//       expect(dialog.message()).toContain('Form submitted successfully');
//       await dialog.accept();
//     });
    
//     // Fill all form fields
//     await page.locator('#input-text').fill('Automation Test');
//     await page.locator('#input-email').fill('test@example.com');
//     await page.locator('#select-dropdown').selectOption('option2');
//     await page.locator('#input-date').fill('2025-10-15');
//     await page.locator('#checkbox-1').check();
//     await page.locator('#checkbox-2').check();
//     await page.locator('#radio-1').check();
    
//     // Submit form
//     await page.locator('#btn-submit').click();
    
//     // Dialog should have been handled by the handler above
//   });