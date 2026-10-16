import { test, expect } from '@playwright/test';
import { selectLanguage } from './support/selectLanguage';

test('one language control starts in Spanish, transitions flags and persists the explicit choice', async ({ browser }) => {
  const context = await browser.newContext({ storageState: { cookies: [], origins: [] }, viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  const selector = page.locator('header [data-selected-language]');
  await expect(selector).toHaveAttribute('data-selected-language', 'es');
  await expect(selector.getByRole('button')).toHaveCount(1);
  const toggle = selector.locator('[data-language-toggle]');
  await expect(toggle).toHaveAttribute('aria-label', 'Cambiar a inglés');
  await expect(toggle).toContainText('ES');
  for (const flag of await selector.locator('img').all()) {
    await expect.poll(() => flag.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await flag.getAttribute('src')).toMatch(/^\/images\/flags\//);
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await selectLanguage(page, 'en');
  await expect(toggle.locator('.language-flag-in')).toHaveCSS('animation-name', 'language-flag-in');
  await expect(toggle.locator('.language-flag-in img')).toHaveAttribute('src', '/images/flags/gb.svg');
  await expect(toggle).toContainText('EN');
  await expect(toggle).toHaveAttribute('aria-label', 'Switch to Spanish');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/electrical');
  await expect(selector).toHaveAttribute('data-selected-language', 'en');
  await selectLanguage(page, 'es');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('main h1')).toContainText('Mantenimiento eléctrico');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Abrir menú', exact: true }).click();
  const mobile = page.locator('#mobile-navigation [data-selected-language]');
  await expect(mobile.getByRole('button')).toHaveCount(1);
  await selectLanguage(mobile, 'en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await selectLanguage(mobile, 'es');
  await expect(mobile.locator('.language-flag-in')).toHaveCSS('animation-name', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
