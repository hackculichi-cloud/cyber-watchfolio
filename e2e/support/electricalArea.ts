import { expect, type Page } from '@playwright/test';
export async function openElectricalArea(page: Page, area: 'residential' | 'industrial' | 'control', tab = 'projects') {
  const id = area === 'control' ? 'electrical-control' : area;
  const card = page.locator(`[data-specialty="${id}"]`);
  await expect(card).toBeVisible();
  if (await card.getAttribute('aria-expanded') !== 'true') await card.click();
  await page.locator(`[data-area-tab="${tab}"]`).click();
  await expect(page.locator(`[data-area-tab="${tab}"]`)).toHaveAttribute('aria-selected', 'true');
}
