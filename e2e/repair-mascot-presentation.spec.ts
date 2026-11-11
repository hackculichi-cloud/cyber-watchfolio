import { test, expect, type Locator } from '@playwright/test';

for (const width of [320, 820, 1440]) {
  test(`Repair companions keep slender artwork at distinct content docks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/repair');
    const document = page.locator('#certifications [data-repair-pose="document"]');
    const inspection = page.locator('#smartphones [data-repair-pose="inspection"]');
    const seated = page.locator('#cv [data-repair-pose="seated"]');
    const selectSection = async (section: string) => {
      if (width < 768) await page.goto(`/repair#${section}`);
      await expect(page.locator(`#${section}`)).toBeVisible();
    };
    for (const [section, companion] of [['certifications', document], ['smartphones', inspection], ['cv', seated]] as const) {
      await selectSection(section);
      await companion.scrollIntoViewIfNeeded();
      await expect(companion).toHaveAttribute('aria-hidden', 'true');
      await expect(companion.locator('img')).toHaveAttribute('src', /repair-content-poses.*\.webp/);
      const bounds = await companion.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.height / bounds!.width).toBeGreaterThan(1.8);
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
    const disjoint = async (first: Locator, second: Locator) => {
      const [a, b] = await Promise.all([first.boundingBox(), second.boundingBox()]);
      expect(a).not.toBeNull(); expect(b).not.toBeNull();
      expect(a!.x + a!.width <= b!.x || b!.x + b!.width <= a!.x || a!.y + a!.height <= b!.y || b!.y + b!.height <= a!.y).toBe(true);
    };
    await selectSection('certifications');
    await disjoint(document, page.locator('#certifications > div > h2'));
    await expect(page.locator('#tools [data-mascot-dock="left"]')).toHaveCount(1);
    await expect(page.locator('#cv [data-mascot-dock="right"]')).toHaveCount(1);
    await selectSection('tools');
    await disjoint(page.locator('#tools [data-mascot-scene="detail"]'), page.locator('#tools [data-mascot-content]'));
    await selectSection('cv');
    await disjoint(seated, page.locator('#cv [data-mascot-content]'));
    await expect(page.locator('[data-footer-contact] [data-mascot-atlas="practice"]')).toHaveCount(1);
    await expect(page.locator('[data-footer-contact] [data-repair-pose]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
