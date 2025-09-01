const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  try {
    // Check production site
    console.log('Checking production site...');
    const prodPage = await browser.newPage();
    await prodPage.goto('https://arach.dev', { waitUntil: 'networkidle' });
    
    const prodSpacing = await prodPage.evaluate(() => {
      const container = document.querySelector('.container');
      const grid = document.querySelector('[class*="grid-cols"]');
      const firstCard = document.querySelector('article');
      
      const result = {};
      
      if (container) {
        const containerStyles = window.getComputedStyle(container);
        result.container = {
          padding: containerStyles.padding,
          maxWidth: containerStyles.maxWidth,
        };
      }
      
      if (grid) {
        const gridStyles = window.getComputedStyle(grid);
        result.grid = {
          gap: gridStyles.gap,
          className: grid.className,
        };
      }
      
      if (firstCard) {
        const cardStyles = window.getComputedStyle(firstCard);
        result.card = {
          padding: cardStyles.padding,
          className: firstCard.className.substring(0, 100), // truncate
        };
      }
      
      return result;
    });
    
    // Check local v4 site
    console.log('Checking local v4 site...');
    const localPage = await browser.newPage();
    await localPage.goto('http://localhost:3009', { waitUntil: 'networkidle' });
    
    const localSpacing = await localPage.evaluate(() => {
      const container = document.querySelector('.container');
      const grid = document.querySelector('[class*="grid-cols"]');
      const firstCard = document.querySelector('article');
      
      const result = {};
      
      if (container) {
        const containerStyles = window.getComputedStyle(container);
        result.container = {
          padding: containerStyles.padding,
          maxWidth: containerStyles.maxWidth,
        };
      }
      
      if (grid) {
        const gridStyles = window.getComputedStyle(grid);
        result.grid = {
          gap: gridStyles.gap,
          className: grid.className,
        };
      }
      
      if (firstCard) {
        const cardStyles = window.getComputedStyle(firstCard);
        result.card = {
          padding: cardStyles.padding,
          className: firstCard.className.substring(0, 100), // truncate
        };
      }
      
      return result;
    });
    
    console.log('\n=== PRODUCTION (arach.dev) ===');
    console.log(JSON.stringify(prodSpacing, null, 2));
    
    console.log('\n=== LOCAL V4 (localhost:3009) ===');
    console.log(JSON.stringify(localSpacing, null, 2));
    
    // Take screenshots
    await prodPage.screenshot({ path: 'prod-spacing.png' });
    await localPage.screenshot({ path: 'local-spacing.png' });
    console.log('\nScreenshots saved: prod-spacing.png and local-spacing.png');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();