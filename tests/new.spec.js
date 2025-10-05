const { test, expect } = require('@playwright/test');








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