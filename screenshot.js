/**
 * screenshot.js — Automated screenshots of all Imposter Who? app states.
 *
 * One-time setup:
 *   npm install
 *   npx playwright install chromium
 *
 * Run:
 *   node screenshot.js        (or: npm run screenshots)
 *
 * Output: screenshots/*.png   (14 images covering every screen + theme)
 */

'use strict';

const { chromium } = require('playwright');
const http = require('http');
const fs   = require('fs');
const path = require('path');

// ── Config ────────────────────────────────────────────────────────────────────
const ROOT     = __dirname;
const PORT     = 7321;
const OUT      = path.join(ROOT, 'screenshots');
const VIEWPORT = { width: 390, height: 844 };
const BASE_URL = `http://127.0.0.1:${PORT}`;

const MIMES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.jsx':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

// ── Mock server ───────────────────────────────────────────────────────────────
// The FIRST /api/* call gets a 1.5 s delay so the loading spinner can be
// captured before the word arrives. All subsequent calls respond instantly.
let apiCallCount = 0;

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      if (urlPath === '/') urlPath = '/index.html';

      // Word API — return a fixed word so cards are deterministic
      if (urlPath.startsWith('/api/')) {
        const ms = apiCallCount++ === 0 ? 1500 : 0;
        setTimeout(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ word: 'Avocado', hint: 'food & drink' }));
        }, ms);
        return;
      }

      // Static files
      const filePath = path.join(ROOT, urlPath);
      fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not found'); return; }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIMES[ext] || 'text/plain' });
        res.end(data);
      });
    });

    server.listen(PORT, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const wait = ms => new Promise(r => setTimeout(r, ms));

async function ss(page, name) {
  await page.screenshot({ path: path.join(OUT, name) });
  console.log(`  ✓  ${name}`);
}

/** Seed localStorage before the page boots so theme/players/cycle are deterministic. */
async function seedStorage(page, theme = 'marigold') {
  await page.addInitScript(t => {
    localStorage.setItem('imposter_theme', t);
    // Fixed 4-player roster
    localStorage.setItem('imposter_players',
      JSON.stringify(['Alice', 'Bob', 'Carol', 'Dave']));
    // Mark Alice/Bob/Carol as "already had a turn" → Dave (index 3) is always imposter
    localStorage.setItem('imposter_cycle', JSON.stringify(['Alice', 'Bob', 'Carol']));
    // Clear stale word history so the hardcoded fallback pool is full
    localStorage.removeItem('imposter_player_words');
  }, theme);
}

async function newPage(browser, theme = 'marigold') {
  const page = await browser.newPage();
  await page.setViewportSize(VIEWPORT);
  await seedStorage(page, theme);
  return page;
}

async function goto(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 60000 });
}

/** Wait until the HTML loader overlay is removed (React up + 1400 ms + fonts). */
async function waitForApp(page) {
  await page.waitForSelector('#app-loader', { state: 'detached', timeout: 35000 });
  await wait(150);
}

/** Click a SettingsRow (role="button") by its title and wait for the sheet to slide in. */
async function openSheet(page, rowTitle) {
  await page.locator(`[role="button"]:has-text("${rowTitle}")`).first().click();
  await wait(460); // .32 s slide + buffer
}

/** Dismiss the frontmost sheet via its × close button. */
async function closeSheet(page) {
  await page.locator('button[aria-label="close"]').first().click();
  await wait(380);
}

/** Press the player card to reveal its back face; waits for the flip animation. */
async function holdCard(page) {
  const card = page.locator('[style*="perspective"]').first();
  const box  = await card.boundingBox();
  if (!box) throw new Error('Player card not found');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await wait(540); // flip transition: .44 s + buffer
}

async function releaseCard(page) {
  await page.mouse.up();
  await wait(540); // flip-back transition
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  const server = await startServer();
  console.log(`\n🌐  Server  →  ${BASE_URL}`);

  const browser = await chromium.launch({ headless: true });
  console.log('📷  Capturing screenshots…\n');

  try {

    // ────────────────────────────────────────────────────────────────────────
    // 01 · Loading screen (capture before 1400 ms minimum elapses)
    // ────────────────────────────────────────────────────────────────────────
    {
      const page = await newPage(browser);
      await goto(page);
      // loaderUp animation: 0.38 s line-1 + 0.09 s delay line-2 → both done ~0.5 s
      await wait(700);
      await ss(page, '01-loader.png');
      await page.close();
    }

    // ────────────────────────────────────────────────────────────────────────
    // 02–06 · Setup screen + every sheet
    // ────────────────────────────────────────────────────────────────────────
    {
      const page = await newPage(browser);
      await goto(page);
      await waitForApp(page);

      // 02 · Setup screen (default state, no categories yet)
      await ss(page, '02-setup.png');

      // 03 · Players sheet
      await openSheet(page, 'PLAYERS');
      await ss(page, '03-sheet-players.png');
      await closeSheet(page);

      // 04 · Categories sheet — select two so the screenshot looks active
      await openSheet(page, 'CATEGORIES');
      await page.locator('button:has-text("Everyday Things")').first().click();
      await page.locator('button:has-text("Food & Drink")').first().click();
      await wait(150);
      await ss(page, '04-sheet-categories.png');
      // Commit the selection so START GAME is available for the next section
      await page.locator('button:has-text("SAVE SELECTION")').click();
      await wait(420);

      // 05 · Imposters sheet
      await openSheet(page, 'IMPOSTERS');
      await ss(page, '05-sheet-imposters.png');
      await closeSheet(page);

      // 06 · How To Play sheet
      await page.locator('button:has-text("?")').first().click();
      await wait(460);
      await ss(page, '06-sheet-howtoplay.png');
      await closeSheet(page);

      await page.close();
    }

    // ────────────────────────────────────────────────────────────────────────
    // 07–12 · Full reveal flow (single continuous page)
    // ────────────────────────────────────────────────────────────────────────
    {
      const page = await newPage(browser);
      await goto(page);
      await waitForApp(page);

      // Select categories so START GAME is enabled
      await openSheet(page, 'CATEGORIES');
      await page.locator('button:has-text("Everyday Things")').first().click();
      await page.locator('button:has-text("Food & Drink")').first().click();
      await page.locator('button:has-text("SAVE SELECTION")').click();
      await wait(420);

      // 07 · Reveal loading spinner
      // The first API call has a 1500 ms mock delay — screenshot during that window
      await page.locator('button:has-text("START GAME")').click();
      await wait(400);
      await ss(page, '07-reveal-loading.png');

      // Wait for word to arrive and card entrance animation to finish
      await page.waitForSelector(
        'button:has-text("NEXT PLAYER"), button:has-text("START DISCUSSION")',
        { timeout: 10000 }
      );
      await wait(640);

      // 08 · First player card — front face (Alice)
      await ss(page, '08-card-front.png');

      // 09 · Card back showing the secret word
      // 10 · Card back showing IMPOSTER (Dave, index 3)
      let gotWord = false, gotImposter = false;

      for (let i = 0; i < 4; i++) {
        await holdCard(page);

        const isImposter = (await page.locator('text=YOU ARE THE').count()) > 0;

        if (isImposter && !gotImposter) {
          await ss(page, '10-card-back-imposter.png');
          gotImposter = true;
        } else if (!isImposter && !gotWord) {
          await ss(page, '09-card-back-word.png');
          gotWord = true;
        }

        await releaseCard(page);

        const btn = page
          .locator('button:has-text("NEXT PLAYER"), button:has-text("START DISCUSSION")')
          .first();
        const btnText = await btn.textContent().catch(() => '');
        await btn.click();
        await wait(640);

        if (btnText.includes('START DISCUSSION')) break;
      }

      // 11 · Discussion screen (goes-first player shown, word not yet revealed)
      await ss(page, '11-discussion.png');

      // 12 · Results screen (truth revealed)
      await page.locator('text=REVEAL IMPOSTER & WORD').click();
      await wait(340);
      await ss(page, '12-results.png');

      await page.close();
    }

    // ────────────────────────────────────────────────────────────────────────
    // 13–14 · Theme variants (setup screen)
    // ────────────────────────────────────────────────────────────────────────
    {
      const page = await newPage(browser, 'tokyo');
      await goto(page);
      await waitForApp(page);
      await ss(page, '13-theme-tokyo.png');
      await page.close();
    }
    {
      const page = await newPage(browser, 'afterdark');
      await goto(page);
      await waitForApp(page);
      await ss(page, '14-theme-afterdark.png');
      await page.close();
    }

  } finally {
    await browser.close();
    server.close();
  }

  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\n✅  ${files.length} screenshots saved → screenshots/\n`);
  files.forEach(f => console.log(`     ${f}`));
}

run().catch(err => {
  console.error('\n💥  Fatal:', err.message);
  process.exit(1);
});
