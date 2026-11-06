import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1440]) test(`image-led tools and certificates keep a visible close action at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
  await page.addInitScript(() => localStorage.setItem('portfolio-lang', 'es'));
  await page.goto('/electrical');
  await page.locator('[data-open-electrical-tools]').click();
  const catalog = page.locator('[data-owned-electrical-tools]');
  const entries = catalog.locator('[data-owned-tool-entry]');
  await expect(entries).toHaveCount(5);
  await expect(entries.first().locator('[data-owned-tool]')).toBeInViewport();
  for (const entry of await entries.all()) {
    const picture = (await entry.locator('[data-owned-tool]').boundingBox())!;
    expect(picture.width / (await entry.boundingBox())!.width).toBeGreaterThan(.8);
    expect(await entry.evaluate(el => getComputedStyle(el).borderWidth)).toBe('0px');
    await expect(entry.locator('[data-owned-tool-description]')).not.toHaveCSS('-webkit-line-clamp', '2');
  }
  const centers = await entries.evaluateAll(elements => elements.map(el => {
    const rect = el.getBoundingClientRect();
    return { x:rect.x + rect.width / 2, y:Math.round(rect.y) };
  }));
  for(const y of new Set(centers.map(center => center.y))) {
    const row = centers.filter(center => center.y === y);
    expect(Math.abs((row[0].x + row.at(-1)!.x) / 2 - width / 2)).toBeLessThan(2);
  }
  await entries.last().scrollIntoViewIfNeeded();
  const closeTools = page.locator('[data-close-electrical-tools]');
  await expect(closeTools).toBeInViewport();
  await expect(closeTools).toHaveText('Cerrar');
  const nav = (await page.locator('.profile-section-nav').boundingBox())!;
  const close = (await closeTools.boundingBox())!;
  expect(close.y).toBeGreaterThanOrEqual(nav.y + nav.height - 2);
  await closeTools.click();
  await expect(page.locator('[data-open-electrical-tools]')).toBeFocused();
  await page.locator('[data-open-electrical-training]').click();
  const cards = page.locator('[data-certifications="electrical"] [data-certificate]');
  await expect(cards).toHaveCount(5);
  const rows = await cards.evaluateAll(elements => elements.map(el => Math.round(el.getBoundingClientRect().top)));
  expect(new Set(rows).size).toBe(width >= 768 ? 3 : 5); // Full-width mobile previews; two large previews per row from tablet widths.
  if(width >= 768) expect(rows[0]).toBe(rows[1]);
  for (const card of await cards.all()) {
    const image = card.locator('[data-certificate-original] img');
    if (await image.count()) {
      const bounds = (await image.boundingBox())!;
      expect(bounds.width / (await card.boundingBox())!.width).toBeGreaterThan(.8);
      expect(bounds.height).toBeGreaterThan(120);
      await expect(image).toHaveCSS('max-height', 'none');
    }
  }
  const last = cards.last();
  await last.scrollIntoViewIfNeeded();
  const closeTraining = page.locator('[data-close-electrical-training]');
  await expect(closeTraining).toBeInViewport();
  await expect(closeTraining).toHaveText('Cerrar');
  await closeTraining.click();
  await expect(page.locator('[data-open-electrical-training]')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('original-sized previews enlarge independently and keep course information optional', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/electrical#certificate');
  const record = page.locator('[data-certificate="electrical-measurements"]');
  const original = record.getByRole('button', { name: /^Enlarge original certificate:/ });
  await original.click();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', '/certificates/udemy-mediciones-electricas.webp');
  await page.keyboard.press('Escape');
  await expect(original).toBeFocused();
  const info = record.locator('[data-certificate-info]');
  await info.locator(':scope > summary').click();
  await expect(info).toHaveAttribute('open', '');
  await expect(info.getByText('Irving Lopez Hernandez', { exact:true })).toBeVisible();
});
