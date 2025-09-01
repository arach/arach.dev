const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Check production site
  const prodPage = await browser.newPage();
  await prodPage.goto('https://arach.dev');
  await prodPage.waitForLoadState('networkidle');
  
  const prodSpacing = await prodPage.evaluate(() => {
    const firstCard = document.querySelector('article');
    if (!firstCard) return null;
    
    const styles = window.getComputedStyle(firstCard);
    const container = document.querySelector('.container');
    const containerStyles = container ? window.getComputedStyle(container) : null;
    
    return {
      card: {
        padding: styles.padding,
        margin: styles.margin,
        borderRadius: styles.borderRadius,
        height: styles.height,
      },
      container: containerStyles ? {
        padding: containerStyles.padding,
        margin: containerStyles.margin,
        maxWidth: containerStyles.maxWidth,
      } : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
    };
  });
  
  // Check local v4 site
  const localPage = await browser.newPage();
  await localPage.goto('http://localhost:3009');
  await localPage.waitForLoadState('networkidle');
  
  const localSpacing = await localPage.evaluate(() => {
    const firstCard = document.querySelector('article');
    if (!firstCard) return null;
    
    const styles = window.getComputedStyle(firstCard);
    const container = document.querySelector('.container');
    const containerStyles = container ? window.getComputedStyle(container) : null;
    
    return {
      card: {
        padding: styles.padding,
        margin: styles.margin,
        borderRadius: styles.borderRadius,
        height: styles.height,
      },
      container: containerStyles ? {
        padding: containerStyles.padding,
        margin: containerStyles.margin,
        maxWidth: containerStyles.maxWidth,
      } : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
    };
  });
  
  console.log('Production (arach.dev):');
  console.log(JSON.stringify(prodSpacing, null, 2));
  console.log('\nLocal v4 (localhost:3009):');
  console.log(JSON.stringify(localSpacing, null, 2));
  
  // Take screenshots for visual comparison
  await prodPage.screenshot({ path: 'prod-site.png', fullPage: false });
  await localPage.screenshot({ path: 'local-v4.png', fullPage: false });
  
  console.log('\nScreenshots saved: prod-site.png and local-v4.png');
  
  await browser.close();
})();