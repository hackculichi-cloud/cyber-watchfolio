import { test, expect } from '@playwright/test';

test('electrical specialties have centered emblems, relevant images and truthful training states', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/electrical#specialties');
    const cards = page.locator('#specialties [data-specialty]');
    await expect(cards).toHaveCount(3);
    const positions = [];
    for (const id of ['residential', 'industrial', 'electrical-control']) {
      const card = page.locator(`[data-specialty="${id}"]`);
      await card.scrollIntoViewIfNeeded();
      const art = card.locator('[data-specialty-art]');
      await expect.poll(() => art.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      const bounds = (await card.boundingBox())!;
      const logo = (await card.locator('[data-specialty-logo]').boundingBox())!;
      expect(Math.abs(logo.x + logo.width/2 - bounds.x - bounds.width/2)).toBeLessThanOrEqual(1);
      positions.push(bounds);
    }
    if (width === 1440) {
      expect(positions[0].y).toBe(positions[1].y);
      expect(positions[1].y).toBe(positions[2].y);
      expect(positions[1].x - positions[0].x - positions[0].width).toBeCloseTo(positions[2].x - positions[1].x - positions[1].width, 0);
    }
    await expect(page.locator('[data-specialty-art="residential"]')).toHaveAttribute('alt', /^Illustrative reference:/);
    await expect(page.locator('[data-specialty-art="residential"]')).toHaveAttribute('src', /electrical-residential/);
    await expect(page.locator('[data-specialty-art="industrial"]')).toHaveAttribute('alt', /^Illustrative reference:/);
    await expect(page.locator('[data-specialty="industrial"]')).toContainText('Currently studying');
    const control = page.locator('[data-specialty="electrical-control"]');
    await expect(control).not.toContainText('Illustrative reference');
    await expect(control).toContainText('Training & practice');
    await control.click();
    await expect(control).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#specialty-details-electrical')).toContainText('START/STOP');
    await page.getByRole('button', { name: 'All specialties', exact: true }).click();
    await expect(control).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
