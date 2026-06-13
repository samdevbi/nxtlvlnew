import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3001";
const OUT = ".screenshots";
const ROUTES = [
  ["home", "/"],
  ["about", "/about"],
  ["members", "/members"],
  ["member", "/members/samandar-abdullayev"],
  ["meetings", "/meetings"],
  ["meeting", "/meetings/pul-psixologiyasi"],
  ["activities", "/activities"],
  ["join", "/join"],
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  await context.addInitScript(
    (t) => localStorage.setItem("nxtlvl-theme", t),
    theme
  );
  const page = await context.newPage();
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Hydration tugashini kutamiz (birinchi Reveal opacity-100 bo'lsin)
    await page
      .waitForSelector("main [class*='opacity-100']", { timeout: 8000 })
      .catch(() => {});
    // Reveal animatsiyalari tugashi uchun sahifani sekin oxirigacha aylantiramiz
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${name}-${theme}.png`, fullPage: true });
    console.log(`OK ${name}-${theme}`);
  }
  // Mobile menyu ochiq holati (faqat bosh sahifada)
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click('button[aria-label="Menyu"], button[aria-label="Menu"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/menu-${theme}.png` });
  console.log(`OK menu-${theme}`);
  await context.close();
}

await browser.close();
