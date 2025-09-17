import {expect,test} from '@playwright/test'

// const { test, expect } = require('@playwright/test');
// const { defineConfig, devices } = require('@playwright/test')

//Open local file
//Make sure to add 'file:/// to the path'

test.describe("Lecture 3 examples",()=>{
    test("Open local file", async ({page})=>{
        await page.goto('file:///C:/Users/Nika_Tukhashvili/Desktop/cu-playwright/tests/lecture-3/sample-locators.html')
    })


    test('Fill form',async ({page})=>{

        await page.goto('file:///C:/Users/Nika_Tukhashvili/Desktop/cu-playwright/tests/lecture-3/sample-locators.html')
        // Basic CSS Selectors
        await page.locator('h1').textContent();
        await page.locator('.form-control').first().fill('Example text');
        await page.locator('#submit-btn').click();

        // Attribute Selectors
        await page.locator('[name="username"]').fill('johndoe');
        await page.locator('[data-test="submit-button"]').click();

        // CSS Combinators
        await page.locator('form input').first().fill('test@example.com'); // Descendant
        await page.locator('form > div > input').first().fill('password123'); // Child
        await page.locator('label + input').first().fill('John Doe'); // Adjacent sibling
        await page.locator('h2 ~ div').count(); // General sibling

        // nth-child and nth-of-type
        await page.locator('li:nth-child(2)').textContent();
        await page.locator('tr:nth-child(odd)').count();

        // Pseudo-classes
        await page.locator('button:not([disabled])').click();
        await page.locator('li:first-child').textContent();
        await page.locator('li:last-child').textContent();

        // XPath: Basic
        await page.locator('//button[@id="submit-btn"]').click();
        await page.locator('//input[@type="email"]').fill('test@example.com');

        // XPath: Text-based
        await page.locator('//button[contains(text(), "Submit")]').click();
        await page.locator('//label[text()="Username:"]/../input').fill('johndoe');

        // XPath: Sibling navigation
        await page.locator('//li[text()="Second Item"]/following-sibling::li').first().textContent();
        await page.locator('//li[text()="Third Item"]/preceding-sibling::li').first().textContent();

        // XPath: Parent and ancestor navigation
        await page.locator('//input[@name="password"]/parent::div').getAttribute('class');
        await page.locator('//button[@id="submit-btn"]/ancestor::form').evaluate(form => form.id);

        // Text-based locators
        await page.locator('text=Submit').click();
        await page.locator('text=/Submit|Cancel/').count();
        await page.locator('text=/^First/').textContent();

        // Combining strategies
        await page.locator('form').locator('input[type="email"]').fill('test@example.com');
        await page.locator('#example-list').locator('text=Third Item').click();

        // Role-based locators (added example)
        await page.locator('role=button[name="Submit"]').click();

        // Locating elements within a specific context
        const form = await page.locator('#example-form');
        await form.locator('input[name="username"]').fill('johndoe');

        // Locating elements by their position in a list
        await page.locator('#example-list li').nth(2).textContent(); // Third item (0-based index)

        // Using evaluation for complex scenarios
        const buttonText = await page.evaluate(() => {
            return document.querySelector('#hover-btn').textContent;
        });

        // Waiting for element state changes
        await page.locator('#hover-btn').hover();
        await page.locator('#hover-btn:hover').waitFor();

        // Counting elements
        const itemCount = await page.locator('#example-list li').count();

        // Extracting multiple elements' data
        const tableData = await page.locator('table tbody tr').evaluateAll(rows => 
            rows.map(row => ({
                id: row.cells[0].textContent,
                name: row.cells[1].textContent,
                email: row.cells[2].textContent
            }))
        );
        
    })

    
})


