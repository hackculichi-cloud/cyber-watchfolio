import { test, expect } from '@playwright/test';

test('a fresh visit starts in Spanish, local flags stay selected and an explicit choice persists', async ({ browser }) => {
  const context = await browser.newContext({ storageState: { cookies: [], origins: [] }, viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  const selector = page.locator('header [data-selected-language]');
  await expect(selector).toHaveAttribute('data-selected-language', 'es');
  await expect(selector.getByRole('button', { name: 'Español', exact: true })).toHaveAttribute('aria-pressed', 'true');
  for (const flag of await selector.locator('img').all()) {
    await expect.poll(() => flag.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await flag.getAttribute('src')).toMatch(/^\/images\/flags\//);
  }
  await expect(page.getByRole('navigation', { name: 'Principal', exact: true }).getByRole('link', { name: 'Inicio', exact: true })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(selector.locator('.language-selection')).toHaveCSS('transition-duration', /0\.22s/);
  await selector.getByRole('button', { name: 'English', exact: true }).click();
  await expect(selector).toHaveAttribute('data-selected-language', 'en');
  await expect(selector.getByRole('button', { name: 'English', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(selector.getByRole('button', { name: 'Español', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/electrical');
  await expect(selector).toHaveAttribute('data-selected-language', 'en');
  await selector.getByRole('button', { name: 'Español', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('main h1')).toContainText('Mantenimiento eléctrico');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  const mobile = page.locator('#mobile-navigation [data-selected-language]');
  await expect(mobile).toHaveAttribute('data-selected-language', 'es');
  await mobile.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(mobile).toHaveAttribute('data-selected-language', 'en');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(parseFloat(await mobile.locator('.language-selection').evaluate(el => getComputedStyle(el).transitionDuration))).toBeLessThanOrEqual(.001);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
