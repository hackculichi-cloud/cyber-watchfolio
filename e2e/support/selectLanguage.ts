import { expect, type Page, type Locator } from '@playwright/test';

/** Use the single visible language toggle, preferring the active modal when present. */
export async function selectLanguage(scope: Page | Locator, lang: 'en' | 'es') {
  const toggles = scope.locator('[data-language-toggle]:visible');
  const toggle = toggles.last();
  await expect(toggle).toBeVisible();
  if (await toggle.getAttribute('data-current-language') !== lang) await toggle.click();
  await expect(toggle).toHaveAttribute('data-current-language', lang);
}
