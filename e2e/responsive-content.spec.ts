import { test, expect } from '@playwright/test';
import { englishStorageState } from './support/language';

test('a phone can open a specialty while its web font is still loading', async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/fonts/*.woff2', async route => { await gate; await route.continue(); });
  try {
    await page.goto('/electrical#specialties', { waitUntil: 'domcontentloaded' });
    const card = page.locator('[data-specialty="residential"]');
    await card.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    expect(await page.evaluate(() => document.fonts.status)).toBe('loading');
    const box = (await card.boundingBox())!;
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    const detail = page.locator('[data-specialty-details-for="residential"]');
    await expect(detail).toBeFocused({ timeout: 1500 });
    await expect(detail.locator('h3').first()).toBeInViewport();
    expect(await page.evaluate(() => document.fonts.status)).toBe('loading');
  } finally { release(); await page.unrouteAll({ behavior: 'wait' }); await context.close(); }
});

test('opening content settles within a few frames with a throttled CPU and normal motion', async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('/electrical#specialties');
  await page.evaluate(() => document.fonts.ready);
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const card = page.locator('[data-specialty="residential"]');
  await card.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.evaluate(() => {
    const state = window as typeof window & { openingFrames: { top: number; focused: boolean }[] };
    state.openingFrames = [];
    document.addEventListener('click', function clicked(event) {
      if (!(event.target as Element).closest('[data-specialty]')) return;
      document.removeEventListener('click', clicked, true);
      const sample = () => {
        const panel = document.querySelector('[data-specialty-details-for="residential"]');
        state.openingFrames.push({ top: panel?.getBoundingClientRect().top ?? -9999, focused: document.activeElement === panel });
        if (state.openingFrames.length < 8) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }, true);
  });
  await card.tap();
  await page.waitForFunction(() => (window as typeof window & { openingFrames: unknown[] }).openingFrames.length === 8);
  const frames = await page.evaluate(() => (window as typeof window & { openingFrames: { top: number; focused: boolean }[] }).openingFrames);
  expect(frames.slice(0, 4).some(frame => frame.focused && frame.top >= 140 && frame.top <= 180)).toBe(true);
  expect(Math.max(...frames.slice(-3).map(frame => frame.top)) - Math.min(...frames.slice(-3).map(frame => frame.top))).toBeLessThan(1);
  await context.close();
});

test('course expansion uses its full height immediately and photo dialogs avoid mobile blur', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/electrical#residential');
  const syllabus = page.locator('[data-area-syllabus]');
  await syllabus.locator('summary').click();
  const trigger = syllabus.getByRole('button', { name: /Residential Electrical Installations/ });
  await trigger.click();
  const region = syllabus.getByRole('region', { name: /Residential Electrical Installations/ });
  await expect(region).toBeVisible();
  await expect(region).toHaveCSS('animation-name', 'none');
  expect(await region.evaluate(el => el.clientHeight >= el.scrollHeight - 1)).toBe(true);
  await page.locator('[data-profile-workspace] button').click();
  await expect(page.getByRole('dialog')).toHaveCSS('backdrop-filter', 'none');
  await expect(page.getByRole('dialog')).toHaveCSS('animation-duration', '0.1s');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
