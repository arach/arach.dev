const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3009');
  await page.waitForLoadState('networkidle');
  
  const cardSpacing = await page.evaluate(() => {
    const cards = document.querySelectorAll('article');
    const firstCard = cards[0];
    if (!firstCard) return { error: 'No cards found' };
    
    const styles = window.getComputedStyle(firstCard);
    
    // Check CSS variable
    const rootStyles = window.getComputedStyle(document.documentElement);
    
    return {
      totalCards: cards.length,
      firstCard: {
        padding: styles.padding,
        paddingTop: styles.paddingTop,
        paddingRight: styles.paddingRight,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
        margin: styles.margin,
        width: styles.width,
        height: styles.height,
        display: styles.display,
      },
      spacingVar: rootStyles.getPropertyValue('--spacing'),
      classList: firstCard.className,
    };
  });
  
  console.log('Card spacing analysis:');
  console.log(JSON.stringify(cardSpacing, null, 2));
  
  await browser.close();
})();