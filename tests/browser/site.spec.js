const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const representativeRoutes = ["/", "/kontakt/", "/leistungen/", "/leistungen/musterleistung/", "/einblicke/", "/impressum/", "/akkreditierung/", "/datenschutz/", "/ueber-uns/", "/kontakt/erfolg/"];

for (const route of representativeRoutes) {
  test(`${route} ist fehlerfrei und zugänglich`, async ({ page }) => {
    const failures = [];
    page.on("console", (message) => { if (message.type() === "error") failures.push(`console: ${message.text()}`); });
    page.on("pageerror", (error) => failures.push(`page: ${error.message}`));
    page.on("requestfailed", (request) => failures.push(`request: ${request.url()}`));
    const response = await page.goto(route);
    expect(response.status()).toBe(200);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    const results = await new AxeBuilder({ page }).analyze();
    const severe = results.violations.filter((item) => ["serious", "critical"].includes(item.impact));
    expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
    expect(failures).toEqual([]);
  });
}

test("320px bleibt ohne horizontalen Overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  for (const route of representativeRoutes) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} overflow`).toBeLessThanOrEqual(1);
  }
});

test("Tastaturfokus und Navigation funktionieren", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await expect(page.locator(".skip-link")).toHaveCSS("outline-style", "solid");
  if (isMobile) {
    const toggle = page.locator("[data-nav-toggle]");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("[data-navigation]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
});

test("Kontakt entspricht der Originalseite ohne Formular", async ({ page }) => {
  await page.goto("/kontakt/");
  await expect(page.locator('a[href="mailto:kraus@probenahme-bayern.de"]')).toBeVisible();
  await expect(page.locator('a[href="tel:+4986561625"]')).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
  await page.goto("/kontakt/erfolg/");
  await expect(page.locator("main")).toContainText("keine Nachricht versendet");
});

test("Reduced Motion wird respektiert", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const duration = await page.locator(".th-button").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

test("unbekannte Route liefert 404", async ({ page }) => {
  const response = await page.goto("/nicht-vorhanden/");
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("gibt es nicht");
});


test("Header und Hero füllen gemeinsam die erste Bildschirmhöhe", async ({ page }) => {
  for (const [width,height] of [[2560,1440],[1920,1080],[1920,650],[1680,900],[1600,900],[1440,900],[1440,751],[1366,768],[1366,650],[1536,864],[1280,720],[1280,600],[1024,768],[1024,600],[864,600],[768,1024],[390,844],[320,760]]) {
    await page.setViewportSize({width,height});
    await page.goto("/");
    await page.evaluate(()=>document.fonts.ready);
    const sizes = await page.evaluate(()=>({header:document.querySelector('.th-header').getBoundingClientRect().height, bottom:document.querySelector('.th-hero').getBoundingClientRect().bottom, viewport:innerHeight}));
    expect(sizes.header).toBeLessThanOrEqual(65);
    expect(Math.abs(sizes.bottom-sizes.viewport),`${width}x${height}: ${JSON.stringify(sizes)}`).toBeLessThanOrEqual(2);
    const content = await page.locator('.th-hero__grid').boundingBox();
    expect(content.y).toBeGreaterThanOrEqual(sizes.header);
    expect(content.y + content.height).toBeLessThanOrEqual(height);
  }
});

test("Hero-Video spielt stumm, lässt sich pausieren und respektiert Reduced Motion", async ({ page }) => {
  await page.goto('/');
  const video = page.locator('[data-hero-video]');
  await expect.poll(() => video.evaluate(v => !v.paused && v.currentTime > 0)).toBe(true);
  expect(await video.evaluate(v => v.muted && v.loop && v.playsInline)).toBe(true);
  await page.getByRole('button', {name:'Video pausieren'}).click();
  expect(await video.evaluate(v => v.paused)).toBe(true);
  await page.getByRole('button', {name:'Video abspielen'}).click();
  await expect.poll(() => video.evaluate(v => v.paused)).toBe(false);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect.poll(() => video.evaluate(v => v.paused)).toBe(true);
  await page.reload();
  expect(await video.evaluate(v => v.paused && !v.querySelector('source').hasAttribute('src'))).toBe(true);
});

test("PDFs sind lokal und unverändert erreichbar; Webvolley-Link vorhanden", async ({ page, request }) => {
  const fs = require('node:fs');
  await page.goto('/akkreditierung/');
  const links=await page.locator('.th-document-link').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
  expect(links).toHaveLength(3);
  for(const link of links){
    const response=await request.get(link);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect((await response.body()).equals(fs.readFileSync(`src${link}`))).toBe(true);
  }
  await page.goto('/');
  await expect(page.locator('.th-footer__bottom a')).toHaveAttribute('href','https://www.webvolley.de/');
});

test("Keine Tracking-Requests oder Browser-Speicher",async({page,context,baseURL})=>{
 const external=[];
 page.on('request',r=>{if(new URL(r.url()).origin!==new URL(baseURL).origin) external.push(r.url());});
 await page.goto('/');
 expect(external).toEqual([]);
 expect(await context.cookies()).toEqual([]);
 expect(await page.evaluate(()=>localStorage.length+sessionStorage.length)).toBe(0);
});

