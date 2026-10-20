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
      await expect(page.locator('[data-world-hero="electrical"] .hero-title > .glow-ring')).toHaveCount(0);
      await expect(heading.locator('[data-copper-load]')).toHaveCount(1);
      await expect(heading.locator('[data-copper-return]')).toHaveCount(1);
      await expect(heading.locator('.copper-cable-core').first()).toHaveCSS('stroke', 'rgb(233, 169, 108)');
      await page.evaluate(() => document.fonts.ready);
      const connections = await heading.locator('[data-copper-title]').evaluate(title => {
        const origin = title.getBoundingClientRect();
        const letters = [...title.querySelectorAll('.copper-cable-core')].map(el => el.getBoundingClientRect());
        const parts = title.querySelector('.copper-connection-core')!.getAttribute('d')!.match(/M[^M]+/g)!;
        const inside = (point: DOMPoint, box: DOMRect) => point.x + origin.x >= box.left - 2 && point.x + origin.x <= box.right + 2 && point.y + origin.y >= box.top - 2 && point.y + origin.y <= box.bottom + 2;
        return { count: parts.length, letters: letters.length, touching: parts.every((part, index) => {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', part);
          return inside(path.getPointAtLength(0), letters[index]) && inside(path.getPointAtLength(path.getTotalLength()), letters[index + 1]);
        }), wordsUnbroken: [...title.querySelectorAll('.copper-conductor-word')].every(word => {
          const glyphs = [...word.querySelectorAll('.copper-conductor-glyph')];
          return Math.abs(glyphs[0].getBoundingClientRect().top - glyphs.at(-1)!.getBoundingClientRect().top) < 1;
        }) };
      });
      expect(connections.count).toBe(connections.letters - 1);
      expect(connections.touching).toBe(true);
      expect(connections.wordsUnbroken).toBe(true);
      expect((await heading.locator('[data-copper-load]').boundingBox())!.width).toBeGreaterThanOrEqual(15);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.locator('[data-specialty="residential"]').click();
      await expect(page.locator('[data-title-circuit]')).toHaveCount(0);
    }
    await page.goto('/cybersecurity');
    await expect(page.locator('h1 [data-copper-title]')).toHaveCount(0);
    await context.close();
  }
});

test('the slow dotted current powers the bulb, supports pause and stops offscreen or with reduced motion', async ({ page }) => {
  await page.goto('/electrical');
  const title = page.locator('[data-copper-title]');
  const first = title.locator('.copper-electron').first();
  const last = title.locator('[data-electron-terminal]');
  await expect(title).toHaveAttribute('data-in-view', 'true');
  await expect(first).toHaveCSS('animation-iteration-count', '1');
  await expect(first).toHaveCSS('animation-play-state', 'running');
  const timing = await title.locator('.copper-electron').evaluateAll(elements => elements.map(el => ({ delay: parseFloat(getComputedStyle(el).animationDelay), duration: parseFloat(getComputedStyle(el).animationDuration) })));
  expect(timing.at(-1)!.delay).toBeGreaterThan(timing[0].delay);
  expect(timing.at(-1)!.delay + timing.at(-1)!.duration).toBeGreaterThanOrEqual(8);
  expect(timing[0].duration).toBeGreaterThanOrEqual(1.5);
  const dots = title.locator('.copper-feed-pulse');
  await expect(dots).toHaveCSS('stroke-dasharray', '1px, 11px');
  await expect(dots).toHaveCSS('animation-duration', '3s');
  const pause = page.locator('[data-copper-motion]');
  await expect(pause).toHaveAccessibleName('Pause energy flow');
  await pause.click();
  await expect(first).toHaveCSS('animation-play-state', 'paused');
  await expect(dots).toHaveCSS('animation-play-state', 'paused');
  await expect(title.locator('.copper-connection-pulse')).toHaveCSS('animation-play-state', 'paused');
  await expect(pause).toHaveAttribute('aria-pressed', 'true');
  await expect(pause).toHaveAccessibleName('Resume energy flow');
  await pause.click();
  await expect(first).toHaveCSS('animation-play-state', 'running');
  await expect(last).toHaveCount(1);
  await page.locator('#cv').scrollIntoViewIfNeeded();
  await expect(title).toHaveAttribute('data-in-view', 'false');
  await expect(first).toHaveCSS('animation-play-state', 'paused');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(() => last.evaluate(el => el.getAnimations().every(animation => animation.playState === 'finished')), { timeout: 12000 }).toBe(true);
  await expect(title.locator('.copper-return-pulse')).toHaveCSS('animation-play-state', 'running');
  await expect.poll(() => title.locator('[data-copper-bulb-glow]').evaluate(el => parseFloat(getComputedStyle(el).opacity))).toBeGreaterThan(0.5);
  await expect.poll(() => title.locator('[data-copper-bulb-rays]').evaluate(el => parseFloat(getComputedStyle(el).opacity))).toBeGreaterThan(0.5);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(first).toHaveCSS('animation-name', 'none');
  await expect(dots).toHaveCSS('animation-name', 'none');
  await expect(pause).not.toBeVisible();
});

test('the copper header brand is static and readable beside the menu and language control', async ({ browser }) => {
  for (const lang of ['es', 'en']) {
    const context = await browser.newContext();
    await context.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    const page = await context.newPage();
    for (const width of [320, 390, 1280, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/electrical');
      const brand = page.locator('[data-header-brand]');
      await expect(brand).toHaveAttribute('data-brand-profile', 'electrical');
      await expect(brand.locator('[data-copper-wordmark]')).toBeVisible();
      expect(await brand.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
      await expect(page.locator('h1')).toHaveCount(1);
      const box = (await brand.boundingBox())!;
      const next = (await page.locator(width >= 1280 ? 'header nav > ul a' : 'header button[aria-controls="mobile-navigation"]').first().boundingBox())!;
      expect(box.x + box.width).toBeLessThanOrEqual(next.x);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  }
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
