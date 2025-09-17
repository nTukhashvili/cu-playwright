const { test, expect } = require('@playwright/test');

test.describe('Form Automation Tests', () => {
  
  test('Fill out and submit form with assertions', async ({ page }) => {


    await page.goto('C:\\Users\\Nika_Tukhashvili\\Desktop\\cu-playwright\\tests\\lecture-2\\form_page.html'); 
    
    // Wait for page to be fully loaded
    // waitForLoadState() arguments: 'load', 'domcontentloaded', 'networkidle'
    await page.waitForLoadState('networkidle');
    
    // ============== FILLING TEXT INPUTS ==============
    
    // Fill first name input
    // fill() arguments: selector (string), value (string), options (object)
    // Options: force, noWaitAfter, strict, timeout
    await page.fill('#first-name', 'John');
    
    // type() - types character by character (slower but more realistic)
    
    // Fill last name input
    await page.fill('#last-name', 'Doe');
    
    // Fill email address
    await page.fill('#email-address', 'john.doe@example.com');
    
    // Fill phone number
    await page.fill('#phone-number', '+1-555-123-4567');
    
    // ============== ASSERTIONS FOR TEXT INPUTS ==============
    
    // Assert that input values are correctly filled
    // inputValue() gets the value of input elements
    await expect(page.locator('#first-name')).toHaveValue('John');
    await expect(page.locator('#last-name')).toHaveValue('Doe');
    await expect(page.locator('#email-address')).toHaveValue('john.doe@example.com');
    await expect(page.locator('#phone-number')).toHaveValue('+1-555-123-4567');
    
    // ============== RADIO BUTTON SELECTION ==============
    
    // Select radio button
    // check() arguments: selector (string), options (object)
    // Options: force, noWaitAfter, position, strict, timeout, trial
    await page.check('#gender-male');
    
    // Alternative method:
    // await page.click('#gender-male'); // Also works for radio buttons
    
    // ============== RADIO BUTTON ASSERTIONS ==============
    
    // Assert that the correct radio button is selected
    await expect(page.locator('#gender-male')).toBeChecked();
    
    // Assert that other radio buttons are not selected
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).not.toBeChecked();
    
    // ============== DROPDOWN SELECTION ==============
    
    // Select option from dropdown
    // selectOption() arguments: selector (string), values, options (object)
    // Values can be: string, array of strings, {value: string}, {label: string}, {index: number}
    await page.selectOption('#country-select', 'us'); // Select by value
    
    // Alternative selection methods:
    // await page.selectOption('#country-select', { label: 'United States' }); // Select by label
    // await page.selectOption('#country-select', { index: 1 }); // Select by index
    // await page.selectOption('#country-select', ['us', 'uk']); // Multiple selection (if supported)
    
    // ============== DROPDOWN ASSERTIONS ==============
    
    // Assert that correct option is selected
    await expect(page.locator('#country-select')).toHaveValue('us');
    
    // Alternative assertion for dropdown text
    const selectedText = await page.locator('#country-select option:checked').textContent();
    expect(selectedText).toBe('United States');
    
    // ============== FORM SUBMISSION ==============
    
    // Click the confirm button
    // click() arguments: selector (string), options (object)
    // Options: button, clickCount, delay, force, modifiers, noWaitAfter, position, strict, timeout, trial
    await page.click('#confirm-button');
    
    // Alternative click methods:
    // await page.locator('#confirm-button').click(); // Using locator
    // await page.press('#confirm-button', 'Enter'); // Simulate Enter key
    
    // ============== POST-SUBMISSION ASSERTIONS ==============
    
    // Wait for result area to appear
    // waitForSelector() arguments: selector (string), options (object)
    // Options: state ('attached', 'detached', 'visible', 'hidden'), strict, timeout
    await page.waitForSelector('#result-area', { state: 'visible' });
    
    // Assert that result area is visible
    await expect(page.locator('#result-area')).toBeVisible();
    
    // Assert specific form data is displayed correctly
    const formDataSection = page.locator('#form-data');
    await expect(formDataSection).toContainText('John'); // First name
    await expect(formDataSection).toContainText('Doe'); // Last name
    await expect(formDataSection).toContainText('john.doe@example.com'); // Email
    await expect(formDataSection).toContainText('+1-555-123-4567'); // Phone
    await expect(formDataSection).toContainText('male'); // Gender
    await expect(formDataSection).toContainText('United States'); // Country
    
    // ============== ADDITIONAL ASSERTIONS ==============
    
    // Assert page title
    await expect(page).toHaveTitle('Simple Form Page');
    
    // Assert URL (if applicable)
    // expect(page.url()).toContain('expected-path');
    
    // Assert that success message is displayed
    await expect(page.locator('.alert-success h5')).toContainText('Form Submitted Successfully!');
    
    // ============== SCREENSHOT FOR EVIDENCE ==============
    
    // Take a screenshot after form submission (optional)
    // screenshot() arguments: options (object)
    // Options: path, quality, type ('png', 'jpeg'), clip, fullPage, mask, animations, caret
    await page.screenshot({ 
      path: 'form-submission-result.png', 
      fullPage: true 
    });
    
    // ============== CLEANUP ACTIONS (if needed) ==============
    
    // Clear form fields (if testing multiple scenarios)
    // await page.fill('#first-name', '');
    // await page.fill('#last-name', '');
    
    // Uncheck radio buttons (if needed)
    // await page.uncheck('#gender-male');
    
    // Reset dropdown (if needed)
    // await page.selectOption('#country-select', '');
  });
  
  // ============== ADDITIONAL TEST SCENARIOS ==============
  
  test('Test form validation and error handling', async ({ page }) => {
    await page.goto('.\lecture-2\\form_page.html');
    
    // Test empty form submission
    await page.click('#confirm-button');
    
    // Assert that empty values are handled gracefully
    await expect(page.locator('#result-area')).toBeVisible();
    await expect(page.locator('#form-data')).toContainText('Not selected');
    
    // Test partial form filling
    await page.fill('#first-name', 'Jane');
    await page.check('#gender-female');
    await page.click('#confirm-button');
    
    // Assert partial data is displayed correctly
    await expect(page.locator('#form-data')).toContainText('Jane');
    await expect(page.locator('#form-data')).toContainText('female');
  });
  
  test('Test all dropdown options', async ({ page }) => {
    await page.goto('C:\\Users\\Nika_Tukhashvili\\Desktop\\cu-playwright\\tests\\lecture-2\\lecture-2.spec.js');
    
    // Array of all dropdown options to test
    const countryOptions = [
      { value: 'us', text: 'United States' },
      { value: 'uk', text: 'United Kingdom' },
      { value: 'ca', text: 'Canada' },
      { value: 'au', text: 'Australia' }
    ];
    
    // Loop through each option
    for (const option of countryOptions) {
      await page.selectOption('#country-select', option.value);
      await expect(page.locator('#country-select')).toHaveValue(option.value);
      
      // Verify the displayed text
      const selectedText = await page.locator('#country-select option:checked').textContent();
      expect(selectedText).toBe(option.text);
    }
  });
  
  test('Test all radio button options', async ({ page }) => {
    await page.goto('C:\\Users\\Nika_Tukhashvili\\Desktop\\cu-playwright\\tests\\lecture-2\\form_page.html');
    
    const radioOptions = ['#gender-male', '#gender-female', '#gender-other'];
    
    // Test each radio button
    for (const radioId of radioOptions) {
      await page.check(radioId);
      await expect(page.locator(radioId)).toBeChecked();
      
      // Ensure other radio buttons are unchecked
      const otherRadios = radioOptions.filter(id => id !== radioId);
      for (const otherId of otherRadios) {
        await expect(page.locator(otherId)).not.toBeChecked();
      }
    }
  });


  // Sequential vs Parallel example
test('Sequential vs Parallel', async ({ page }) => {
  
  await page.goto('file:///path/to/your/form.html');
  
  // SEQUENTIAL (one after another)
  await page.fill('#first-name', 'Alice');
  await page.fill('#last-name', 'Smith');
  
  // Clear fields
  await page.fill('#first-name', '');
  await page.fill('#last-name', '');
  
  // PARALLEL (at the same time)
  await Promise.all([
    page.fill('#first-name', 'Bob'),
    page.fill('#last-name', 'Johnson')
  ]);
  
  await page.click('#confirm-button');
  await expect(page.locator('#form-data')).toContainText('Bob');
});
});






/*
COMMON PLAYWRIGHT METHODS AND THEIR ARGUMENTS:

1. NAVIGATION:
   - page.goto(url, options)
   - page.goBack(options)
   - page.goForward(options)
   - page.reload(options)

2. ELEMENT INTERACTION:
   - page.click(selector, options)
   - page.dblclick(selector, options)
   - page.fill(selector, value, options)
   - page.type(selector, text, options)
   - page.press(selector, key, options)
   - page.check(selector, options)
   - page.uncheck(selector, options)
   - page.selectOption(selector, values, options)

3. WAITING:
   - page.waitForSelector(selector, options)
   - page.waitForLoadState(state, options)
   - page.waitForTimeout(timeout)
   - page.waitForURL(url, options)
   - page.waitForFunction(pageFunction, arg, options)

4. ASSERTIONS:
   - expect(locator).toBeVisible()
   - expect(locator).toBeHidden()
   - expect(locator).toBeEnabled()
   - expect(locator).toBeDisabled()
   - expect(locator).toBeChecked()
   - expect(locator).toHaveValue(value)
   - expect(locator).toHaveText(text)
   - expect(locator).toContainText(text)
   - expect(page).toHaveTitle(title)
   - expect(page).toHaveURL(url)

5. LOCATORS:
   - page.locator(selector)
   - page.getByRole(role, options)
   - page.getByText(text, options)
   - page.getByLabel(text, options)
   - page.getByPlaceholder(text, options)
   - page.getByAltText(text, options)
   - page.getByTitle(text, options)
   - page.getByTestId(testId)

COMMON OPTIONS:
- timeout: Maximum time in milliseconds
- strict: Ensure only one element matches
- force: Bypass actionability checks
- noWaitAfter: Don't wait after action
- state: Element state to wait for
- visible: Whether element should be visible
*/