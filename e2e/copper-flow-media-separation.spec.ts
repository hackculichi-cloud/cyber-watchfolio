import { expect, test } from '@playwright/test';

test('the finite current overlaps neighboring letters and fades its terminal highlight cleanly', async ({ page }) => {
  await page.goto('/electrical');
  const title = page.locator('[data-copper-title]');
  await expect(title).toHaveAttribute('data-in-view', 'true');
  const timing = await title.locator('.copper-electron').evaluateAll(letters => letters.map(letter => {
    const style = getComputedStyle(letter);
    return { delay: parseFloat(style.animationDelay), duration: parseFloat(style.animationDuration), repeats: style.animationIterationCount };
  }));
  for (let index = 1; index < timing.length; index++) {
    expect(timing[index].delay - timing[index - 1].delay).toBeLessThan(timing[index].duration / 3);
    expect(timing[index].repeats).toBe('1');
  }
  const terminal = title.locator('[data-electron-terminal]');
  await terminal.evaluate(letter => letter.getAnimations().forEach(animation => animation.finish()));
  await expect(terminal).toHaveCSS('opacity', '0');
});

for (const width of [320, 390, 1440]) {
  test(`copper decoration stays in its title and gives photographs a clear viewer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/electrical');
    await page.evaluate(() => document.fonts.ready);
    for (const heading of await page.locator('.copper-heading').all()) {
      await expect(heading).toHaveCSS('contain', 'paint');
      const load = heading.locator('[data-copper-load]');
      await expect(load).toBeVisible();
      const bounds = (await heading.boundingBox())!;
      const bulb = (await load.boundingBox())!;
      expect(bulb.x).toBeGreaterThanOrEqual(bounds.x);
      expect(bulb.y).toBeGreaterThanOrEqual(bounds.y);
      expect(bulb.x + bulb.width).toBeLessThanOrEqual(bounds.x + bounds.width);
      expect(bulb.y + bulb.height).toBeLessThanOrEqual(bounds.y + bounds.height);
    }
    await page.goto('/electrical#projects');
    const card = page.locator('[data-work="residential-outlet-october-2026"]');
    await card.getByRole('button').first().click();
    const opener = page.locator('[data-photo-gallery] button').first();
    await opener.click();
    const viewer = page.locator('[data-photo-dialog]');
    await expect(viewer).toBeVisible();
    for (const bulb of await page.locator('[data-copper-load]').all()) await expect(bulb).toBeHidden();
    const picture = viewer.locator('img');
    await picture.evaluate((image: HTMLImageElement) => image.decode());
    await expect(picture).toBeVisible();
    const unobstructed = await picture.evaluate(image => {
      const box = image.getBoundingClientRect();
      const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      return Boolean(hit?.closest('[data-photo-dialog]'));
    });
    expect(unobstructed).toBe(true);
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
    // The outer work dialog also keeps the decorative bulb hidden.
    for (const bulb of await page.locator('[data-copper-load]').all()) await expect(bulb).toBeHidden();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-copper-wordmark] [data-copper-load]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
