import { test, expect } from '@playwright/test';
import { englishStorageState } from './support/language';

test('the electrical hero has readable copper letters in both languages and no separate circuit drawing', async ({ browser }) => {
  for (const lang of ['es', 'en']) {
    const context = await browser.newContext();
    await context.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    const page = await context.newPage();
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/electrical');
      const heading = page.locator('[data-world-hero="electrical"] h1');
      await expect(heading).toHaveAccessibleName(lang === 'es' ? 'Mantenimiento eléctrico residencial e industrial' : 'Residential & Industrial Electrical Maintenance');
      await expect(heading.locator('[data-copper-title]')).toBeVisible();
      await expect(heading.locator('[data-electron-flow]')).toHaveAttribute('aria-hidden', 'true');
      await expect(heading.locator('[data-copper-source]')).toContainText(lang === 'es' ? 'CA' : 'AC');
      await expect(heading.locator('[data-copper-load]')).toHaveCount(1);
      await expect(heading.locator('[data-copper-return]')).toHaveCount(1);
      await expect(heading.locator('.copper-conductor-glyph').first()).toHaveCSS('background-image', /repeating-linear-gradient/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.locator('[data-specialty="residential"]').click();
      await expect(page.locator('[data-title-circuit]')).toHaveCount(0);
    }
    await page.goto('/cybersecurity');
    await expect(page.locator('h1 [data-copper-title]')).toHaveCount(0);
    await context.close();
  }
});

test('the electron pulse powers the bulb and closes the title circuit, pausing offscreen and respecting reduced motion', async ({ page }) => {
  await page.goto('/electrical');
  const title = page.locator('[data-copper-title]');
  const first = title.locator('.copper-electron').first();
  const last = title.locator('[data-electron-terminal]');
  await expect(title).toHaveAttribute('data-in-view', 'true');
  await expect(first).toHaveCSS('animation-iteration-count', '1');
  await expect(first).toHaveCSS('animation-play-state', 'running');
  const timing = await title.locator('.copper-electron').evaluateAll(elements => elements.map(el => ({ delay: parseFloat(getComputedStyle(el).animationDelay), duration: parseFloat(getComputedStyle(el).animationDuration) })));
  expect(timing.at(-1)!.delay).toBeGreaterThan(timing[0].delay);
  expect(timing.at(-1)!.delay + timing.at(-1)!.duration).toBeLessThanOrEqual(5);
  await expect(last).toHaveCount(1);
  await page.locator('#cv').scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute('data-in-view', 'false');
  await expect(first).toHaveCSS('animation-play-state', 'paused');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(() => title.evaluate(el => el.getAnimations({ subtree: true }).every(animation => animation.playState === 'finished')), { timeout: 7500 }).toBe(true);
  await expect.poll(() => title.locator('[data-copper-bulb-glow]').evaluate(el => parseFloat(getComputedStyle(el).opacity))).toBeGreaterThan(0.5);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(first).toHaveCSS('animation-name', 'none');
});

test('practice categories and results are centered and selecting or closing them keeps the page and focus still', async ({ browser }) => {
  test.setTimeout(60000);
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({ storageState: englishStorageState, viewport: { width, height: 900 }, isMobile: width < 640, hasTouch: width < 640 });
    const page = await context.newPage();
    await page.goto('/electrical#projects');
    await page.evaluate(() => document.fonts.ready);
    const choices = page.locator('[data-electrical-category-choices]');
    await expect(choices.locator('button')).toHaveCount(3);
    const bounds = (await choices.boundingBox())!;
    const tiles = await choices.locator('button').evaluateAll(elements => elements.map(el => { const box = el.getBoundingClientRect(); return { x: box.x, y: box.y, width: box.width }; }));
    const last = tiles.at(-1)!;
    if (width < 640) expect(Math.abs(last.x + last.width / 2 - bounds.x - bounds.width / 2)).toBeLessThan(1);
    else expect(Math.abs((tiles[0].x + last.x + last.width) / 2 - bounds.x - bounds.width / 2)).toBeLessThan(1);
    await page.evaluate(() => document.addEventListener('click', event => {
      const button = (event.target as Element).closest('[data-electrical-group]');
      if (button) (window as typeof window & { categoryPoint: { scroll: number; top: number } }).categoryPoint = { scroll: scrollY, top: button.getBoundingClientRect().top };
    }, true));
    for (const id of ['outlets', 'lighting', 'training-boards', 'outlets', 'outlets']) {
      const button = page.locator(`[data-electrical-group="residential-${id}"]`);
      if (width < 640) await button.tap(); else await button.click();
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const change = await button.evaluate(el => { const point = (window as typeof window & { categoryPoint: { scroll: number; top: number } }).categoryPoint; return { scroll: Math.abs(scrollY - point.scroll), top: Math.abs(el.getBoundingClientRect().top - point.top) }; });
      expect(change.scroll).toBeLessThan(2);
      expect(change.top).toBeLessThan(2);
      await expect(button).toBeFocused();
      const cards = page.locator('[data-electrical-results] [data-work]');
      if (await cards.count()) {
        const centered = await page.locator('[data-electrical-results]').evaluate(el => { const parent = el.getBoundingClientRect(), boxes = [...el.querySelectorAll('[data-work]')].map(node => node.getBoundingClientRect()); return Math.abs((Math.min(...boxes.map(box => box.left)) + Math.max(...boxes.map(box => box.right))) / 2 - parent.left - parent.width / 2); });
        expect(centered).toBeLessThan(1);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  }
});
