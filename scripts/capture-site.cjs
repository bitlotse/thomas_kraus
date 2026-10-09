const { chromium } = require('@playwright/test');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch();
 const page=await browser.newPage();
 const results=[];
 for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844],['small',320,760]]){
  await page.setViewportSize({width,height});
  for(const route of ['/','/leistungen/','/akkreditierung/','/kontakt/','/impressum/','/datenschutz/']){
   await page.goto('http://127.0.0.1:8195'+route);
   await page.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';await document.fonts.ready;for(const i of document.images){i.loading='eager';await i.decode().catch(()=>{});}window.scrollTo({top:0,behavior:'instant'});});
   const slug=route==='/'?'home':route.replaceAll('/','');
   await page.screenshot({path:`reports/${slug}-${name}-v2.png`,fullPage:true});
   const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,header:document.querySelector('.th-header').getBoundingClientRect().height,heroBottom:document.querySelector('.th-hero')?.getBoundingClientRect().bottom,viewport:innerHeight}));
   results.push({name,route,...metrics});
  }
 }
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await nojs.goto('http://127.0.0.1:8195/');
 results.push({nojsNavigation:await nojs.locator('.th-nav').isVisible()});
 fs.writeFileSync('reports/site-browser-metrics.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results));
 await browser.close();
})();
