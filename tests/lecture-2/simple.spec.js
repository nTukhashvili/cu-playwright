const { test, expect } = require('@playwright/test');

test.describe('Simple Check on wikipedia', () => {

    test('Goto wikiepdia', async ({page})=>{
        await page.goto('https://www.wikipedia.org/')
        await page.fill('#searchInput','Caucasus University')
        await page.click('//button[@type="submit"]')
        await page.waitForTimeout(5000)
        await page.goBack()
        await page.goForward()
        const title = await page.title()
        console.log(title)
    })
  

});




