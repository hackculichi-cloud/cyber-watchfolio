import { expect, test } from '@playwright/test';

const areas = [
  ['cybersecurity', '/cybersecurity'], ['development', '/software-development'],
  ['electrical', '/electrical'], ['electronics', '/electronics'],
  ['repair', '/repair'], ['customer-service', '/experience'], ['barbering', '/barbering'],
] as const;

for (const lang of ['es', 'en'] as const) {
  for (const width of [768, 1023]) {
    test(`tablet ${width}px ${lang}: Home keeps the introduction and seven usable choices together`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(value => localStorage.setItem('portfolio-lang', value), lang);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const copy = (await page.locator('[data-home-intro-copy]').boundingBox())!;
      const mascot = (await page.locator('[data-home-mascot]').boundingBox())!;
      expect(mascot.x).toBeGreaterThan(copy.x + copy.width);
      expect(mascot.y).toBeCloseTo(copy.y, 0);
      expect((await page.locator('.home-hero').boundingBox())!.height).toBeLessThan(800);
      for (const [slug] of areas) {
        const choice = page.locator(`[data-home-mascot] [data-outfit="${slug}"]`);
        const box = (await choice.boundingBox())!;
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.x).toBeGreaterThanOrEqual(copy.x + copy.width);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
        expect(await choice.evaluate(element => {
          const bounds = element.getBoundingClientRect();
          return document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)?.closest('[data-outfit]') === element;
        })).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('[data-home-actions] > a').evaluateAll(links => links.every(link => parseFloat(getComputedStyle(link).fontSize) >= 14))).toBe(true);
    });

    test(`tablet ${width}px ${lang}: every profile pairs its title and workspace without oversized stacking`, async ({ page }) => {
      test.setTimeout(60000);
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(value => localStorage.setItem('portfolio-lang', value), lang);
      for (const [slug, path] of areas) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        const hero = page.locator(`[data-world-hero="${slug}"]`);
        const title = (await hero.locator('h1').boundingBox())!;
        const workspace = page.locator(`[data-profile-workspace="${slug}"]`);
        await expect.poll(() => workspace.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        const figure = (await workspace.boundingBox())!;
        expect(figure.x).toBeGreaterThanOrEqual(title.x + title.width);
        expect(Math.min(title.y + title.height, figure.y + figure.height)).toBeGreaterThan(Math.max(title.y, figure.y));
        expect((await hero.boundingBox())!.height).toBeLessThan(800);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(await hero.locator('.hero-description').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(18);
        expect(await hero.locator('.hero-actions > a').evaluateAll(links => links.every(link => parseFloat(getComputedStyle(link).fontSize) >= 14 && link.getBoundingClientRect().height >= 44))).toBe(true);

        // The original stays available in the viewer, which returns to the same
        // position and control rather than shifting the surrounding introduction.
        const opener = workspace.getByRole('button');
        await opener.click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect.poll(() => dialog.locator('img:not([data-language-flag])').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1536);
        await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(opener).toBeFocused();
        const returned = (await workspace.boundingBox())!;
        expect(returned.x).toBeCloseTo(figure.x, 0);
        expect(returned.y).toBeCloseTo(figure.y, 0);
      }
      expect(errors).toEqual([]);
    });
  }
}

test('a 768px high-density tablet fetches the image for its actual workspace column', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  try {
    for (const [slug, path] of areas) {
      await page.goto(path);
      const image = page.locator(`[data-workspace-art="${slug}"]`);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await image.evaluate((element: HTMLImageElement) => element.currentSrc)).toMatch(/-small-.*\.webp$/);
    }
  } finally {
    await context.close();
  }
});
