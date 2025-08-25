const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 }
  });
  
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForSelector('article', { timeout: 5000 });
  
  // Take screenshot with default theme
  await page.screenshot({ path: 'theme-default.png', fullPage: false });
  console.log('✅ Default theme screenshot saved');
  
  // Open theme picker and select dark theme
  await page.click('button:has-text("Theme")');
  await page.waitForTimeout(500);
  await page.click('button:has-text("Midnight")');
  await page.waitForTimeout(1000);
  
  // Take screenshot with dark theme
  await page.screenshot({ path: 'theme-dark.png', fullPage: false });
  console.log('✅ Dark theme screenshot saved');
  
  // Select another theme
  await page.click('button:has-text("Theme")');
  await page.waitForTimeout(500);
  await page.click('button:has-text("Cyberpunk")');
  await page.waitForTimeout(1000);
  
  // Take screenshot with cyberpunk theme
  await page.screenshot({ path: 'theme-cyberpunk.png', fullPage: false });
  console.log('✅ Cyberpunk theme screenshot saved');
  
  // Keep browser open for manual inspection
  console.log('🔍 Browser will stay open for manual inspection. Close it when done.');
  
  // Wait for user to close the browser
  await page.waitForTimeout(30000);
  await browser.close();
})();