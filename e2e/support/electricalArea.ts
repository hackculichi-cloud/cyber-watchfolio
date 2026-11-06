import { expect, type Page } from '@playwright/test';
export async function openElectricalArea(page: Page, area: 'residential' | 'industrial' | 'control', _legacyTab = 'projects') {
  const id = area === 'control' ? 'electrical-control' : area;
  const card = page.locator(`[data-specialty="${id}"]`);
  await expect(card).toBeVisible();
  if (await card.getAttribute('aria-expanded') !== 'true') await card.click();
  const navigation = page.locator('.profile-section-nav');
  const jump = navigation.locator('select');
  if (await jump.isVisible()) await jump.selectOption('projects');
  else await navigation.locator('a[href="#projects"]').click();
  await expect(page.locator('[data-electrical-area-content] #projects')).toBeVisible();
  await expect(page.locator('[data-area-tab]')).toHaveCount(0);
}
