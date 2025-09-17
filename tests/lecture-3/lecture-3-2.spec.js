import { test, expect } from '@playwright/test';

test.describe('Locator Examples', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to your test HTML file
    await page.goto('C:\\Users\\Nika_Tukhashvili\\Desktop\\cu-playwright\\tests\\lecture-3\\locator-test-page.html');
  });

  test('CSS Locators Demo', async ({ page }) => {
    // Basic CSS selectors
    await page.locator('#firstName').fill('John');
    await page.locator('#lastName').fill('Doe');
    
    // Multiple classes
    await page.locator('.form-control.required-field').first().fill('Updated Name');
    
    // Attribute selectors
    await page.locator('[data-testid="email-input"]').fill('test@example.com');
    await page.locator('[data-category="contact"]').fill('+1234567890');
    
    // Advanced attribute matching
    await page.locator('label[for^="age"]').first().click(); // Starts with - click label
    await page.locator('[data-testid$="-input"]').first().fill('Test'); // Ends with
    await page.locator('[class*="secure"]').first().fill('password123'); // Contains
    
    // Pseudo-selectors and position - radio buttons
    await page.locator('label[for="age2"]').click(); // Second age option (26-35)
    await page.locator('.nav-item:first-child button').click();
    
    // Sibling selectors - better examples
    await page.locator('#username + .form-text').click(); // Adjacent sibling (div after input)
    await page.locator('#username ~ input[type="hidden"]').getAttribute('value'); // General sibling
    
    // Table interactions with CSS
    await page.locator('.user-row:nth-child(1) .edit-btn').click();
    await page.locator('.user-row .delete-btn').first().click();
    
    // Multiple classes in table
    await expect(page.locator('.user-row.active-user')).toBeVisible();
    await expect(page.locator('.user-row.pending-user .user-email')).toContainText('jane@example.com');
    
    // Action buttons
    await page.locator('[data-testid="submit-button"]').click();
    await expect(page.locator('.alert-success')).toBeVisible();
    
    // Complex combinations and text matching
    await page.locator('section .list-group .list-group-item').first().click();
    await page.locator('.list-group-item:has-text("Product Name")').click(); // Playwright extension
    await page.getByText('Product Code:').click(); // Semantic locator
  });

  test('XPath Locators Demo', async ({ page }) => {
    // Basic XPath
    await page.locator('//input[@id="firstName"]').fill('Jane');
    await page.locator('//input[@id="lastName"]').fill('Smith');
    
    // Text-based selection
    await page.locator('//label[text()="Email Address"]').click();
    await page.locator('//button[contains(text(), "Submit Registration")]').click();
    
    // Attribute conditions
    await page.locator('//input[@data-testid="email-input"]').fill('jane@example.com');
    await page.locator('//input[@type="tel"]').fill('+1987654321');
    
    // Multiple conditions (AND/OR)
    await page.locator('//input[@type="password" and @data-security="high"]').first().fill('securepass123');
    await page.locator('//button[@class="btn btn-sm btn-primary edit-btn" or @class="btn btn-sm btn-danger delete-btn"]').first().click();
    
    // Axis navigation - parent/child relationships
    await page.locator('//input[@id="firstName"]/parent::div').click();
    await page.locator('//form[@id="registration-form"]//input[@type="email"]').fill('xpath@example.com');
    
    // Ancestor axis
    await page.locator('//input[@id="phone"]/ancestor::form').getAttribute('id');
    
    // Sibling navigation
    await page.locator('//div[input[@id="password"]]/following-sibling::div//input').fill('matchingpass123');
    await page.locator('//div[input[@id="confirmPassword"]]/preceding-sibling::div//input').getAttribute('type');
    
    // Advanced XPath functions - click labels for radio buttons
    await page.locator('//label[starts-with(@for, "age")]').first().click();
    await page.locator('//td[contains(text(), "john@example.com")]').click();
    await page.locator('//span[contains(@class, "badge") and contains(text(), "Active")]').click();
    
    // NOT conditions
    await page.locator('//button[not(contains(@class, "disabled"))]').first().click();
    
    // Complex table navigation
    await page.locator('//tr[@data-user-id="2"]//button[@data-action="edit"]').click();
    await page.locator('//tr[contains(@class, "pending-user")]//td[@class="user-name"]').click();
    
    // Text content with hierarchy
    await page.locator('//div[@class="list-group-item"][contains(., "Product Name")]').click();
    await page.locator('//div[@class="list-group-item"]//span[text()="Product Code:"]').click();
    
    // Dynamic content handling
    await expect(page.locator('//div[@role="alert" and contains(@class, "alert")]')).toBeVisible();
    
    // Position-based complex selection
    await page.locator('//table[@id="usersTable"]//tr[position()>1][2]//button[1]').click();
    
    // Multiple attribute matching
    await page.locator('//button[@data-category="utility" and @data-priority="low"]').click();
  });

  // BAD PRACTICE EXAMPLE - DO NOT USE
  test('Full XPath Anti-Pattern (AVOID THIS)', async ({ page }) => {
    // ❌ BAD - Full absolute path, breaks easily
    // await page.locator('/html/body/div[1]/section[1]/form/div[1]/div[1]/input').fill('Bad Practice');
    
    // ✅ GOOD - Use relative paths instead
    await page.locator('//input[@id="firstName"]').fill('Good Practice');
    
    // ❌ BAD - Complex nested absolute paths
    // await page.locator('/html/body/div/section[2]/table/tbody/tr[1]/td[5]/button[1]').click();
    
    // ✅ GOOD - Semantic and relative
    await page.locator('//tr[@data-user-id="1"]//button[@data-action="edit"]').click();
  });
});