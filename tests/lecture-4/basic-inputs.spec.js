import {expect,test} from '@playwright/test'

test.describe('Basic Examples', ()=>{

    //Setting base url for Test suite Context
    test.use({baseURL:'https://demoqa.com/'})

    //Addint one test 
    test('Just text inputs', async ({page})=>{
        await page.goto('/text-box')
        const middleText = await page.locator('h1[class="text-center"]').textContent()

        expect(middleText).toEqual('Text Box')

        await page.fill('#userName','Nika T')
        await page.locator('#userEmail').fill('nikat@gmail.com')
        await page.locator('#currentAddress').pressSequentially('Some Text for example', {delay:500})
        await page.locator('#permanentAddress').pressSequentially('Some Text for example')

        await page.click('button[id="submit"]')
    })

    test('Check boxes', async ({page})=>{
        await page.goto('/checkbox')
        await page.waitForTimeout(10000)
        await page.locator('label[for="tree-node-home"]').click()
        await page.locator('button[title="Toggle"]').click()
    })


    test('Radio button', async ({page})=>{
        await page.goto('/radio-button')
        await page.locator('label[for="yesRadio"]').check({force:true})
        const temp = await page.locator('span[class="text-success"]').textContent()
        expect(temp).toEqual('Yes')
    })

})