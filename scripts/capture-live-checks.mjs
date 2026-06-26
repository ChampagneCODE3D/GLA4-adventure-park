import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const outDir = 'C:/Users/jorda/GLA4/screenshots/live-checks/2026-06-26';
mkdirSync(outDir, { recursive: true });

const targets = [
  {
    name: 'jordant-home-desktop',
    url: 'https://jordantchampagne-sudo.github.io/GLA4-adventure-park/index.html?v=20260626-live',
    width: 1440,
    height: 1200,
    path: `${outDir}/jordant-home-desktop.png`,
  },
  {
    name: 'jordant-home-mobile',
    url: 'https://jordantchampagne-sudo.github.io/GLA4-adventure-park/index.html?v=20260626-live',
    width: 390,
    height: 844,
    path: `${outDir}/jordant-home-mobile.png`,
  },
  {
    name: 'champagne-about-desktop',
    url: 'https://champagnecode3d.github.io/GLA4-adventure-park/about.html',
    width: 1440,
    height: 1200,
    path: `${outDir}/champagne-about-desktop.png`,
  },
  {
    name: 'champagne-about-mobile',
    url: 'https://champagnecode3d.github.io/GLA4-adventure-park/about.html',
    width: 390,
    height: 844,
    path: `${outDir}/champagne-about-mobile.png`,
  },
];

const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext();
  for (const target of targets) {
    const page = await context.newPage();
    await page.setViewportSize({ width: target.width, height: target.height });
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.screenshot({ path: target.path, fullPage: true });
    await page.close();
    console.log(`${target.name}: saved ${target.path}`);
  }
} finally {
  await browser.close();
}
