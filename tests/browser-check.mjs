// Optional UI check: use an existing Playwright installation; no product dependency.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
const source = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(source ? pathToFileURL(source).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await mkdir('screenshots', { recursive: true });
  const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base);
  await page.getByRole('heading', { name: /情绪.*探险岛/ }).waitFor();
  assert.equal(await page.locator('.hero').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(175, 241, 246)');
  assert.ok(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'all story artwork loads');
  await page.goto(`${base}/#story/fox`);
  assert.ok(await page.locator('.story-prose').evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 20), 'story text must be at least 20px');
  await page.goto(base);
  assert.equal(await page.locator('.story-card').count(), 3);
  await page.screenshot({ path: 'screenshots/home-desktop.png', fullPage: true });
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/#home`);
    await page.getByRole('heading', { name: /情绪.*探险岛/ }).waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `home overflow ${width}`);
    for (const id of ['fox', 'bear', 'rabbit']) {
      await page.goto(`${base}/#story/${id}`);
      await page.getByRole('button', { name: '一起看看 →' }).click();
      assert.ok(await page.locator('.emotion-choice').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize) >= 20), 'emotion labels must be at least 20px');
      assert.equal(await page.locator('.emotion-choice svg').count(), 6, 'each emotion has a cartoon face');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `emotion overflow ${width}`);
      if (id === 'fox' && width !== 320) await page.screenshot({ path: `screenshots/emotions-${width}.png`, fullPage: true });
      await page.getByRole('button', { name: '紧张', exact: true }).click();
      await page.getByRole('button', { name: '难过', exact: true }).click();
      assert.equal(await page.locator('.emotion-choice[aria-pressed="true"]').count(), 2);
      await page.getByRole('button', { name: '不知道', exact: true }).click();
      assert.equal(await page.locator('.emotion-choice[aria-pressed="true"]').count(), 1);
      await page.keyboard.press('Space');
      assert.equal(await page.locator('.emotion-choice[aria-pressed="true"]').count(), 0);
      await page.getByRole('button', { name: '难过', exact: true }).click();
      await page.locator('.skip-link').focus();
      await page.keyboard.press('Enter');
      assert.match(page.url(), new RegExp(`#story/${id}$`), 'skip link must preserve story route');
      assert.equal(await page.locator('.emotion-choice').count(), 6, `skip link preserves step: ${width} ${id}; heading=${await page.locator('main h1').innerText()}`);
      assert.equal(await page.getByRole('button', { name: '难过', exact: true }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: '继续探索 →' }).click();
      await page.getByRole('button', { name: '心跳变快', exact: true }).click();
      await page.getByRole('button', { name: '没有这些感觉', exact: true }).click();
      assert.equal(await page.locator('.choice[aria-pressed="true"]').count(), 1);
      await page.getByRole('button', { name: '← 上一步', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: '难过', exact: true }).getAttribute('aria-pressed'), 'true');
      await page.getByRole('button', { name: '跳过这一步', exact: true }).click();
      await page.getByRole('button', { name: '跳过这一步', exact: true }).click();
      await page.getByRole('button', { name: '听听另一种理解', exact: true }).click();
      assert.ok(await page.locator('.feedback').innerText());
      await page.getByRole('button', { name: '继续探索 →' }).click();
      for (let i = 0; i < 3; i++) {
        await page.locator(`[data-action="${i}"]`).click();
        assert.ok((await page.locator('.feedback').innerText()).length > 15);
      }
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `game overflow ${id} ${width}`);
      await page.getByRole('button', { name: '看看这段旅程 →' }).click();
      assert.match(await page.locator('.recap').innerText(), /未选择/);
      if (width === 390 && id === 'fox') await page.screenshot({ path: 'screenshots/story-mobile.png', fullPage: true });
      await page.getByRole('button', { name: '重新陪它走一次', exact: true }).click();
      await page.getByRole('button', { name: '一起看看 →' }).click();
      assert.equal(await page.locator('.emotion-choice[aria-pressed="true"]').count(), 0);
      await page.getByRole('link', { name: '← 返回小岛 · 清除本次选择' }).click();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/#home`);
  await page.screenshot({ path: 'screenshots/home-mobile.png', fullPage: true });
  for (const section of ['parents', 'theory', 'about']) {
    await page.goto(`${base}/#${section}`);
    await page.locator('.info-page h1').waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${section} overflow`);
  }
  assert.deepEqual(await page.evaluate(() => Object.keys(localStorage)), []);
  assert.deepEqual(errors, []);
  console.log('PASS: three stories at 1440 / 390 / 320 px; multi-select, keyboard, back, skip, feedback, reset, info pages, no overflow or browser errors.');
} finally { await browser.close(); }
