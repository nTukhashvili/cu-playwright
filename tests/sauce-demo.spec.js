import {test,expect} from '@playwright/test'


test.describe('Saucde demo examples', ()=>{
    // test('Saucde Navigation Examples', async ({page})=>{
    //     await page.goto('https://www.saucedemo.com/')
    //     await page.waitForTimeout(2000)
    //     await page.reload()
    //     await page.waitForTimeout(2000)
    //     await page.goto('https://www.google.com')
    //     await page.waitForTimeout(2000)
    //     await page.goBack()
    //     await page.waitForTimeout(2000)
    //     await page.goForward()

    // })

    test('Sauce login example', async ({page})=>{
        await page.goto('https://www.saucedemo.com/')
        await page.locator('//*[@id="user-name"]').fill('standard_user')
        await page.locator('input[id="password"]').fill('secret_sauce')
        await page.locator('input[value="Login"]').click()
        const itemCount =  await page.locator('//*[contains(text(),"T-Shirt")]').count()
        console.log(itemCount)
        await page.waitForTimeout(2000)
        await page.locator('//*[text()="Sauce Labs Bike Light"]/ancestor::div[@class="inventory_item_label"]/following-sibling::div/button').click()

    })
})