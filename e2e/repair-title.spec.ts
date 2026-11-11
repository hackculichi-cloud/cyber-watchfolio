import { test, expect } from '@playwright/test';

test('repair keeps a readable matching service-bench title and Culichi brand on phones, tablets and desktop', async ({ browser }) => {
  for (const lang of ['en', 'es']) {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    const page = await context.newPage();
    for (const width of [320, 820, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/repair');
      await page.evaluate(() => document.fonts.ready);
      const heading = page.locator('[data-repair-title]');
      await expect(heading).toHaveAccessibleName(lang === 'es' ? 'Reparación técnica' : 'Technical Repair');
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page).toHaveTitle('Christian Velasco');
      const brand = page.locator('[data-header-brand]');
      await expect(brand).toHaveAttribute('data-brand-profile', 'repair');
      await expect(brand.locator('[data-repair-wordmark]')).toHaveText('Culichi');
      const text = await heading.locator('.repair-lettering-name').boundingBox();
      expect(text!.width).toBeGreaterThan(80);
      expect(text!.x).toBeGreaterThanOrEqual(0);
      expect(text!.x + text!.width).toBeLessThanOrEqual(width);
      const menu = page.locator(width >= 1280 ? 'header nav > ul a' : 'header button[aria-controls="mobile-navigation"]').first();
      const bounds = (await brand.boundingBox())!;
      expect(bounds.x + bounds.width).toBeLessThanOrEqual((await menu.boundingBox())!.x);
      expect(await brand.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  }
});

test('home focus previews repair lettering without moving the menu and restores the home identity', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const menu = page.getByRole('navigation', { name: 'Main', exact: true });
  const initial = (await menu.boundingBox())!;
  await page.locator('[data-home-mascot] [data-outfit="repair"]').focus();
  const brand = page.locator('[data-header-brand]');
  await expect(brand).toHaveAttribute('data-brand-profile', 'repair');
  await expect(brand.locator('[data-repair-wordmark]')).toHaveText('Culichi');
  const preview = (await menu.boundingBox())!;
  expect(Math.abs(initial.x - preview.x)).toBeLessThan(1);
  expect(Math.abs(initial.y - preview.y)).toBeLessThan(1);
  expect(await brand.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.keyboard.press('Escape');
  await expect(brand).toHaveAttribute('data-brand-profile', 'emblem');
  await expect(brand.locator('[data-repair-wordmark]')).toHaveCount(0);
});
