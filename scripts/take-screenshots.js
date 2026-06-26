// Auto-screenshot script for GLA4 submission evidence
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'https://jordantchampagne-sudo.github.io/GLA4-adventure-park';
const OUT  = path.join(__dirname, '..', 'screenshots', 'final');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  // Desktop viewport — full width so everything is readable
  await page.setViewportSize({ width: 1280, height: 900 });

  /* ── 1. Home page on load ── */
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // let user cards render
  await page.screenshot({ path: path.join(OUT, '01-home-loaded.png'), fullPage: true });
  console.log('✓ 01-home-loaded.png');

  /* ── 2. User cards + stats close-up ── */
  await page.screenshot({ path: path.join(OUT, '02-users-stats.png'), fullPage: false });
  console.log('✓ 02-users-stats.png');

  /* ── 3. Search filter ── */
  await page.fill('#searchInput', 'Leanne');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, '03-search-filter.png'), fullPage: false });
  console.log('✓ 03-search-filter.png');

  /* ── 4. Booking form filled ── */
  await page.fill('#searchInput', ''); // clear search
  await page.fill('[name="name"]',    'Jordan Champagne');
  await page.fill('[name="email"]',   'jordan@adventurepark.ca');
  await page.fill('[name="tickets"]', '3');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(OUT, '04-form-filled.png'), fullPage: false });
  console.log('✓ 04-form-filled.png');

  /* ── 5. Booking confirmation ── */
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(OUT, '05-booking-confirmed.png'), fullPage: false });
  console.log('✓ 05-booking-confirmed.png');

  /* ── 6. Posts section ── */
  await page.evaluate(() => document.querySelector('#postsList, .posts-list, section:last-of-type')?.scrollIntoView());
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, '06-posts-section.png'), fullPage: false });
  console.log('✓ 06-posts-section.png');

  /* ── 7. Footer with dynamic year ── */
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.screenshot({ path: path.join(OUT, '07-footer-year.png'), fullPage: false });
  console.log('✓ 07-footer-year.png');

  /* ── 8. About page full ── */
  await page.goto(`${BASE}/about.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT, '08-about-top.png'), fullPage: false });
  console.log('✓ 08-about-top.png');

  /* ── 9. About stats banner + plan your visit ── */
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, '09-about-stats-visit.png'), fullPage: false });
  console.log('✓ 09-about-stats-visit.png');

  /* ── 10. Location map section ── */
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, '10-about-map.png'), fullPage: false });
  console.log('✓ 10-about-map.png');

  /* ── 11. Mobile home ── */
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, '11-mobile-home.png'), fullPage: true });
  console.log('✓ 11-mobile-home.png');

  /* ── 12. Mobile about ── */
  await page.goto(`${BASE}/about.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT, '12-mobile-about.png'), fullPage: true });
  console.log('✓ 12-mobile-about.png');

  await browser.close();
  console.log(`\nAll screenshots saved to: ${OUT}`);
})();
