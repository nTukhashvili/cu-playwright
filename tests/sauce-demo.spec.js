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
        await page.goto('file:///C:/Users/Nika_Tukhashvili/Downloads/quiz-index1.html')
        await page.waitForTimeout(2000)


    })
})