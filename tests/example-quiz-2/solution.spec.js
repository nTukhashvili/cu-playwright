import { test, expect } from '@playwright/test';

test('Playwright Exercise - Complete Solution', async ({ page }) => {
  await page.goto('file:///C:/Users/Nika_Tukhashvili/Desktop/cu-playwright/tests/example-quiz-2/playwright-exercise.html');

  // SECTION 1: Text Input Selectors (2 Points)
  await page.locator('.user-name').fill('John');
  
  await page.locator('[data-field="surname"]').fill('Doe');
  
  await page.locator('//input[contains(@placeholder, "professional")]').fill('john@company.com');
  
  await page.locator('//label[contains(text(), "Phone")]/following-sibling::input').fill('+1234567890');

  // SECTION 2: Dynamic List Selection (2 Points)
  await page.locator('(//div[@class="clickable-item"])[last()]').click();
  
  await expect(page.locator('#selection-result')).toBeVisible();
  await expect(page.locator('#selection-result')).toContainText('Correct! You selected the last item');

  // SECTION 3: Drag and Drop (2 Points)
  const draggables = page.locator('.draggable');
  const dropZone = page.locator('#drop-zone');
  
  const count = await draggables.count();
  for (let i = 0; i < count; i++) {
    await draggables.nth(i).dragTo(dropZone);
  }

  // SECTION 4: Alert & Prompt Handling (2 Points)
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('prompt');
    await dialog.dismiss();
  });
  
  await page.locator('#trigger-prompt').click();
  
  await expect(page.locator('#prompt-result')).toContainText('Prompt was dismissed');
});