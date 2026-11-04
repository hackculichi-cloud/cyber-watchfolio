import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) test(`knowledge, certificates and equipment stay scannable and reachable at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ['/cybersecurity', '/software-development', '/electronics', '/repair']) {
    await page.goto(`${route}#overview`);
    const overview = page.locator('[data-profile-capabilities]');
    const disclosure = overview.locator('[data-content-details]').first();
    const paragraph = disclosure.locator('p').first();
    await expect(disclosure).not.toHaveAttribute('open', '');
    await expect(paragraph).not.toBeVisible();
    await disclosure.locator(':scope > summary').click();
    await expect(paragraph).toBeVisible();
    expect((await paragraph.innerText()).trim().length).toBeGreaterThan(25);
    if (route !== '/repair') {
      await page.goto(`${route}#certifications`);
      const information = page.locator('[data-certificate-info]').first();
      await expect(information).not.toHaveAttribute('open', '');
      await information.locator(':scope > summary').click();
      await expect(information.locator('[data-certificate-information-content]')).toBeVisible();
    }
  }
  for (const route of ['/electronics', '/repair']) {
    await page.goto(`${route}#tools`);
    const equipment = page.getByRole('region', { name: 'Equipment catalog' });
    await expect(equipment).toBeVisible();
    for (const group of await equipment.locator(':scope > div').all()) {
      const bounds = (await group.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width + 1);
    }
    expect(await equipment.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
