const { chromium, firefox, webkit, devices } = require('@playwright/test');
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * TEST 1: Creating Browser and Context from Scratch
 * ==================================================
 * Shows how to manually create browser, context, and pages
 * instead of using the default fixtures.
 */
// test('Create browser context from scratch', async () => {
//   // Launch browser manually
//   const browser = await chromium.launch({
//     headless: false, // Set to true for headless mode
//     slowMo: 500 // Slow down operations by 500ms for visibility
//   });
  
//   // Create a new browser context
//   const context = await browser.newContext({
//     viewport: { width: 1280, height: 720 },
//     userAgent: 'Custom User Agent String'
//   });
  
//   // Create a new page in the context
//   const page = await context.newPage();
  
//   // Navigate to a page
//   await page.goto('https://example.com');
  
//   // Verify page loaded
//   await expect(page).toHaveTitle(/Example Domain/);
  
//   console.log('✅ Browser context created successfully');
//   console.log(`Page URL: ${page.url()}`);
//   console.log(`Page Title: ${await page.title()}`);
  
  
//   // Clean up
//   await context.close();
//   await browser.close();
// });

/**
 * TEST 2: Multiple Tabs Management
 * =================================
 * Create and manage multiple tabs within the same context
 */
// test('Work with multiple tabs', async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
  
//   // Create first tab
//   const page1 = await context.newPage();
//   await page1.goto('https://example.com');
//   console.log('Tab 1 opened: example.com');
  
//   // Create second tab
//   const page2 = await context.newPage();
//   await page2.goto('https://playwright.dev');
//   console.log('Tab 2 opened: playwright.dev');
  
//   // Create third tab
//   const page3 = await context.newPage();
//   await page3.goto('https://github.com');
//   console.log('Tab 3 opened: github.com');
  
//   // Get all pages in context
//   const allPages = context.pages();
//   console.log(`Total tabs open: ${allPages.length}`);
  
//   // Switch back to first tab
//   await page1.bringToFront();
//   await page1.waitForTimeout(1000);
//   console.log('Switched to Tab 1');
  
//   // Switch to second tab
//   await page2.bringToFront();
//   await page2.waitForTimeout(1000);
//   console.log('Switched to Tab 2');
  
//   // Switch to third tab
//   await page3.bringToFront();
//   await page3.waitForTimeout(1000);
//   console.log('Switched to Tab 3');
  
//   // Close specific tab
//   await page2.close();
//   console.log('Tab 2 closed');
//   console.log(`Tabs remaining: ${context.pages().length}`);
  
//   // Clean up
//   await context.close();
//   await browser.close();
// });

// /**
//  * TEST 3: Handle New Windows/Popups
//  * ==================================
//  * Intercept and handle new windows that open from links
//  */
test('Handle popup windows', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Set up HTML with a link that opens in new window
  await page.setContent(`
    <html>
      <body>
        <h1>Main Page</h1>
        <a href="https://example.com" target="_blank" id="popup-link">Open in New Window</a>
      </body>
    </html>
  `);
  
  // Set up listener for new page (popup)
  const popupPromise = context.waitForEvent('page');
  
  // Click the link that opens popup
  await page.click('#popup-link');
  
  // Wait for popup to open and get reference
  const popup = await popupPromise;
  await popup.waitForLoadState();
  
  console.log('✅ Popup window opened');
  console.log(`Main page URL: ${page.url()}`);
  console.log(`Popup URL: ${popup.url()}`);
  console.log(`Total windows: ${context.pages().length}`);
  
  // Work with popup
  await expect(popup).toHaveTitle(/Example Domain/);
  
  // Switch between windows
  await page.bringToFront();
  await page.waitForTimeout(1000);
  console.log('Switched to main window');
  
  await popup.bringToFront();
  await page.waitForTimeout(1000);
  console.log('Switched to popup window');
  
  // Close popup
  await popup.close();
  console.log('Popup closed');
  
  // Clean up
  await context.close();
  await browser.close();
});

// /**
//  * TEST 4: Multiple Browser Contexts (Isolation)
//  * ==============================================
//  * Create multiple isolated contexts (like incognito windows)
//  * Each context has separate cookies, storage, and sessions
//  */
// test('Multiple isolated browser contexts', async () => {
//   const browser = await chromium.launch({ headless: false });
  
//   // Create first context (User 1)
//   const context1 = await browser.newContext({
//     viewport: { width: 800, height: 600 }
//   });
//   const page1 = await context1.newPage();
//   await page1.goto('https://example.com');
  
//   // Set cookie in context 1
//   await context1.addCookies([{
//     name: 'user',
//     value: 'user1',
//     domain: 'example.com',
//     path: '/'
//   }]);
//   console.log('Context 1 created with user1 cookie');
  
//   // Create second context (User 2)
//   const context2 = await browser.newContext({
//     viewport: { width: 800, height: 600 }
//   });
//   const page2 = await context2.newPage();
//   await page2.goto('https://example.com');
  
//   // Set different cookie in context 2
//   await context2.addCookies([{
//     name: 'user',
//     value: 'user2',
//     domain: 'example.com',
//     path: '/'
//   }]);
//   console.log('Context 2 created with user2 cookie');
  
//   // Verify cookies are isolated
//   const cookies1 = await context1.cookies();
//   const cookies2 = await context2.cookies();
  
//   console.log(`Context 1 cookies:`, cookies1);
//   console.log(`Context 2 cookies:`, cookies2);
  
//   expect(cookies1[0].value).toBe('user1');
//   expect(cookies2[0].value).toBe('user2');
//   console.log('✅ Contexts are properly isolated');
  
//   // Clean up
//   await context1.close();
//   await context2.close();
//   await browser.close();
// });

// /**
//  * TEST 5: Device Emulation
//  * =========================
//  * Emulate different devices (mobile, tablet, desktop)
//  */
// test('Emulate different devices', async () => {
//   const browser = await chromium.launch({ headless: false });
  
//   // Emulate iPhone 12
//   const iPhone12 = devices['iPhone 12'];
//   const mobileContext = await browser.newContext({
//     ...iPhone12
//   });
//   const mobilePage = await mobileContext.newPage();
//   await mobilePage.goto('https://example.com');
  
//   console.log('Mobile Device Emulation:');
//   console.log(`Viewport: ${iPhone12.viewport.width}x${iPhone12.viewport.height}`);
//   console.log(`User Agent: ${iPhone12.userAgent}`);
  
//   await mobilePage.waitForTimeout(2000);
  
//   // Emulate iPad Pro
//   const iPadPro = devices['iPad Pro'];
//   const tabletContext = await browser.newContext({
//     ...iPadPro
//   });
//   const tabletPage = await tabletContext.newPage();
//   await tabletPage.goto('https://example.com');
  
//   console.log('\nTablet Device Emulation:');
//   console.log(`Viewport: ${iPadPro.viewport.width}x${iPadPro.viewport.height}`);
//   console.log(`User Agent: ${iPadPro.userAgent}`);
  
//   await tabletPage.waitForTimeout(2000);
  
//   // Desktop with custom viewport
//   const desktopContext = await browser.newContext({
//     viewport: { width: 1920, height: 1080 },
//     userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//   });
//   const desktopPage = await desktopContext.newPage();
//   await desktopPage.goto('https://example.com');
  
//   console.log('\nDesktop Emulation:');
//   console.log('Viewport: 1920x1080');
  
//   await desktopPage.waitForTimeout(2000);
  
//   // Clean up
//   await mobileContext.close();
//   await tabletContext.close();
//   await desktopContext.close();
//   await browser.close();
// });

// /**
//  * TEST 6: Browser Permissions and Geolocation
//  * ============================================
//  * Grant permissions and set geolocation
//  */
// test('Set permissions and geolocation', async () => {
//   const browser = await chromium.launch({ headless: false });
  
//   const context = await browser.newContext({
//     geolocation: { latitude: 41.7151, longitude: 44.8271 }, // Tbilisi, Georgia
//     permissions: ['geolocation']
//   });
  
//   const page = await context.newPage();
  
//   // Create a test page that uses geolocation
//   await page.setContent(`
//     <html>
//       <body>
//         <h1>Geolocation Test</h1>
//         <button id="get-location">Get Location</button>
//         <div id="location-result"></div>
        
//         <script>
//           document.getElementById('get-location').addEventListener('click', () => {
//             navigator.geolocation.getCurrentPosition(
//               position => {
//                 document.getElementById('location-result').innerText = 
//                   'Lat: ' + position.coords.latitude + 
//                   ', Lon: ' + position.coords.longitude;
//               },
//               error => {
//                 document.getElementById('location-result').innerText = 'Error: ' + error.message;
//               }
//             );
//           });
//         </script>
//       </body>
//     </html>
//   `);
  
//   // Click button to get location
//   await page.click('#get-location');
//   await page.waitForTimeout(1000);
  
//   // Verify location
//   const locationText = await page.locator('#location-result').textContent();
//   console.log('Geolocation result:', locationText);
//   expect(locationText).toContain('41.7151');
//   expect(locationText).toContain('44.8271');
//   console.log('✅ Geolocation set successfully');
  
//   // Change geolocation dynamically
//   await context.setGeolocation({ latitude: 40.7128, longitude: -74.0060 }); // New York
//   await page.click('#get-location');
//   await page.waitForTimeout(1000);
  
//   const newLocationText = await page.locator('#location-result').textContent();
//   console.log('New geolocation result:', newLocationText);
//   expect(newLocationText).toContain('40.7128');
  
//   // Clean up
//   await context.close();
//   await browser.close();
// });

// /**
//  * TEST 7: Cookies and Storage Management
//  * =======================================
//  * Work with cookies, local storage, and session storage
//  */
// test('Manage cookies and storage', async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();
  
//   await page.goto('https://example.com');
  
//   // Add cookies
//   await context.addCookies([
//     {
//       name: 'session_id',
//       value: 'abc123',
//       domain: 'example.com',
//       path: '/',
//       httpOnly: true,
//       secure: false
//     },
//     {
//       name: 'user_pref',
//       value: 'dark_mode',
//       domain: 'example.com',
//       path: '/'
//     }
//   ]);
//   console.log('✅ Cookies added');
  
//   // Get cookies
//   const cookies = await context.cookies();
//   console.log('All cookies:', cookies);
  
//   // Get specific cookie
//   const sessionCookie = cookies.find(c => c.name === 'session_id');
//   console.log('Session cookie:', sessionCookie);
  
//   // Set local storage
//   await page.evaluate(() => {
//     localStorage.setItem('theme', 'dark');
//     localStorage.setItem('language', 'en');
//   });
//   console.log('✅ Local storage items set');
  
//   // Get local storage
//   const localStorage = await page.evaluate(() => {
//     return {
//       theme: localStorage.getItem('theme'),
//       language: localStorage.getItem('language'),
//       all: { ...localStorage }
//     };
//   });
//   console.log('Local storage:', localStorage);
  
//   // Set session storage
//   await page.evaluate(() => {
//     sessionStorage.setItem('temp_data', 'test123');
//   });
//   console.log('✅ Session storage set');
  
//   // Clear specific cookie
//   await context.clearCookies({ name: 'user_pref' });
//   console.log('✅ User preference cookie cleared');
  
//   // Verify cookie was cleared
//   const remainingCookies = await context.cookies();
//   console.log('Remaining cookies:', remainingCookies.length);
  
//   // Clean up
//   await context.close();
//   await browser.close();
// });

// /**
//  * TEST 8: Screenshots and PDF Generation
//  * =======================================
//  * Capture screenshots and generate PDFs
//  */
// test('Capture screenshots and PDFs', async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext({
//     viewport: { width: 1280, height: 720 }
//   });
//   const page = await context.newPage();
  
//   await page.goto('https://example.com');
  
//   // Full page screenshot
//   await page.screenshot({ 
//     path: 'screenshots/fullpage.png',
//     fullPage: true 
//   });
//   console.log('✅ Full page screenshot saved');
  
//   // Viewport screenshot
//   await page.screenshot({ 
//     path: 'screenshots/viewport.png' 
//   });
//   console.log('✅ Viewport screenshot saved');
  
//   // Element screenshot
//   const heading = page.locator('h1');
//   await heading.screenshot({ 
//     path: 'screenshots/heading.png' 
//   });
//   console.log('✅ Element screenshot saved');
  
//   // Generate PDF (only in Chromium)
//   await page.pdf({ 
//     path: 'screenshots/page.pdf',
//     format: 'A4'
//   });
//   console.log('✅ PDF generated');
  
//   // Clean up
//   await context.close();
//   await browser.close();
// });

// /**
//  * TEST 9: Video Recording
//  * =======================
//  * Record video of browser session
//  */
// test('Record video session', async () => {
//   const browser = await chromium.launch({ headless: false });
  
//   // Enable video recording
//   const context = await browser.newContext({
//     recordVideo: {
//       dir: 'videos/',
//       size: { width: 1280, height: 720 }
//     }
//   });
  
//   const page = await context.newPage();
  
//   // Perform some actions
//   await page.goto('https://example.com');
//   await page.waitForTimeout(2000);
  
//   await page.goto('https://playwright.dev');
//   await page.waitForTimeout(2000);
  
//   // Close context to save video
//   await context.close();
//   console.log('✅ Video recorded and saved');
  
//   await browser.close();
// });

// /**
//  * TEST 10: Different Browser Engines
//  * ===================================
//  * Launch and use different browser engines (Chromium, Firefox, WebKit)
//  */
// test('Use different browser engines', async () => {
//   // Test with Chromium
//   console.log('\n=== Testing with Chromium ===');
//   const chromiumBrowser = await chromium.launch({ headless: false });
//   const chromiumContext = await chromiumBrowser.newContext();
//   const chromiumPage = await chromiumContext.newPage();
//   await chromiumPage.goto('https://example.com');
//   await chromiumPage.waitForTimeout(1500);
//   console.log('✅ Chromium test complete');
//   await chromiumContext.close();
//   await chromiumBrowser.close();
  
//   // Test with Firefox
//   console.log('\n=== Testing with Firefox ===');
//   const firefoxBrowser = await firefox.launch({ headless: false });
//   const firefoxContext = await firefoxBrowser.newContext();
//   const firefoxPage = await firefoxContext.newPage();
//   await firefoxPage.goto('https://example.com');
//   await firefoxPage.waitForTimeout(1500);
//   console.log('✅ Firefox test complete');
//   await firefoxContext.close();
//   await firefoxBrowser.close();
  
//   // Test with WebKit (Safari)
//   console.log('\n=== Testing with WebKit ===');
//   const webkitBrowser = await webkit.launch({ headless: false });
//   const webkitContext = await webkitBrowser.newContext();
//   const webkitPage = await webkitContext.newPage();
//   await webkitPage.goto('https://example.com');
//   await webkitPage.waitForTimeout(1500);
//   console.log('✅ WebKit test complete');
//   await webkitContext.close();
//   await webkitBrowser.close();
  
//   console.log('\n✅ All browser engines tested successfully');
// });

// /**
//  * TEST 11: Browser Context State Persistence
//  * ===========================================
//  * Save and load browser context state (cookies, storage, etc.)
//  */
// test('Save and restore browser state', async () => {
//   const browser = await chromium.launch({ headless: false });
  
//   // Create context and set some state
//   console.log('Creating context and setting state...');
//   const context1 = await browser.newContext();
//   const page1 = await context1.newPage();
  
//   await page1.goto('https://example.com');
  
//   // Add cookies and storage
//   await context1.addCookies([{
//     name: 'saved_session',
//     value: 'session123',
//     domain: 'example.com',
//     path: '/'
//   }]);
  
//   await page1.evaluate(() => {
//     localStorage.setItem('saved_data', 'important_data');
//   });
  
//   // Save context state
//   const state = await context1.storageState({ path: 'browser-state.json' });
//   console.log('✅ Browser state saved to file');
  
//   await context1.close();
  
//   // Create new context and restore state
//   console.log('Creating new context and restoring state...');
//   const context2 = await browser.newContext({
//     storageState: 'browser-state.json'
//   });
//   const page2 = await context2.newPage();
  
//   await page2.goto('https://example.com');
  
//   // Verify cookies were restored
//   const cookies = await context2.cookies();
//   const savedCookie = cookies.find(c => c.name === 'saved_session');
//   expect(savedCookie).toBeDefined();
//   expect(savedCookie.value).toBe('session123');
//   console.log('✅ Cookies restored successfully');
  
//   // Verify local storage was restored
//   const savedData = await page2.evaluate(() => {
//     return localStorage.getItem('saved_data');
//   });
//   expect(savedData).toBe('important_data');
//   console.log('✅ Local storage restored successfully');
  
//   // Clean up
//   await context2.close();
//   await browser.close();
// });

// /**
//  * TEST 12: Advanced Tab Switching with Page Events
//  * =================================================
//  * Monitor and react to page events across multiple tabs
//  */
// test('Advanced tab switching with events', async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
  
//   // Create multiple tabs
//   const tabs = [];
//   const urls = [
//     'https://example.com',
//     'https://playwright.dev',
//     'https://github.com'
//   ];
  
//   for (const url of urls) {
//     const page = await context.newPage();
//     await page.goto(url);
//     tabs.push(page);
//     console.log(`Tab ${tabs.length} opened: ${url}`);
//   }
  
//   // Set up event listeners for all tabs
//   tabs.forEach((tab, index) => {
//     tab.on('load', () => console.log(`Tab ${index + 1} loaded`));
//     tab.on('console', msg => console.log(`Tab ${index + 1} console: ${msg.text()}`));
//   });
  
//   // Switch between tabs and perform actions
//   for (let i = 0; i < tabs.length; i++) {
//     await tabs[i].bringToFront();
//     console.log(`\nSwitched to Tab ${i + 1}`);
//     await tabs[i].waitForTimeout(1000);
    
//     // Get page title
//     const title = await tabs[i].title();
//     console.log(`Title: ${title}`);
    
//     // Execute JavaScript in the tab
//     await tabs[i].evaluate(() => {
//       console.log('JavaScript executed in this tab');
//     });
//   }
  
//   // Close tabs one by one
//   for (let i = tabs.length - 1; i >= 0; i--) {
//     await tabs[i].close();
//     console.log(`Tab ${i + 1} closed`);
//     await page.waitForTimeout(500);
//   }
  
//   // Clean up
//   await context.close();
//   await browser.close();
// });

