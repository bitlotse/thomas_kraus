const { chromium } = require('@playwright/test');
(async () => {
 const browser = await chromium.launch();
 const page = await browser.newPage();
 for (const [name,width,height] of [['desktop',1440,900],['mobile',390,844],['small',320,760]]) {
  await page.setViewportSize({width,height});
  await page.goto('http://127.0.0.1:8188/');
  await page.locator('.th-region').scrollIntoViewIfNeeded();
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));document.documentElement.style.scrollBehavior="auto";window.scrollTo({top:0,behavior:"instant"})});
  await page.waitForFunction(()=>window.scrollY===0);
  await page.screenshot({path:`reports/homepage-${name}.png`,fullPage:true});
  console.log(name,await page.evaluate(()=>({hero:document.querySelector('.th-hero').getBoundingClientRect().height,viewport:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth})));
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('.th-service').first().hover();
 console.log('reduced motion',await page.locator('.th-service__icon').first().evaluate(e=>getComputedStyle(e).transform));
 await page.close();
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await nojs.goto('http://127.0.0.1:8188/');
 console.log('no-js navigation',await nojs.locator('.th-nav').isVisible());
 await browser.close();
})();

