import { chromium } from 'playwright';

const SHOTS = 5;
const DELAY_MS = 3000;
const URL = 'http://localhost:4321/og';

const browser = await chromium.launch({
  channel: 'chrome',
  args: [
    '--use-gl=angle',
    '--use-angle=metal',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
  ],
});

const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.goto(URL, { waitUntil: 'networkidle' });

await page.waitForTimeout(2000);

await page.evaluate(() => {
  const toolbar = document.querySelector('astro-dev-toolbar');
  if (toolbar) toolbar.remove();
});

for (let i = 1; i <= SHOTS; i++) {
  await page.screenshot({
    path: `public/img/og-${i}.png`,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  console.log(`Saved public/img/og-${i}.png`);
  if (i < SHOTS) await page.waitForTimeout(DELAY_MS);
}

await browser.close();
console.log(`Done — ${SHOTS} screenshots saved.`);
