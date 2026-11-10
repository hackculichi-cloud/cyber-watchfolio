import { expect, test, type Locator, type Page } from '@playwright/test';

async function tapClosePadding(page: Page, dialog: Locator) {
  const close = dialog.getByRole('button', { name: 'Close', exact: true });
  await close.tap({ trial: true });
  const bounds = (await close.boundingBox())!;
  expect(bounds.width).toBeGreaterThanOrEqual(44);
  expect(bounds.height).toBeGreaterThanOrEqual(44);
  const point = { x: bounds.x + 5, y: bounds.y + bounds.height - 5 };
  expect(await close.evaluate((button, position) => button.contains(document.elementFromPoint(position.x, position.y)), point)).toBe(true);
  await page.touchscreen.tap(point.x, point.y);
  await expect(dialog).toBeHidden();
}

for (const [width, height] of [[320, 740], [820, 1180], [1024, 768]]) {
  test(`touch users can close work and certificate viewers outside the icon at ${width}x${height}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    await context.addInitScript(() => localStorage.setItem('portfolio-lang', 'en'));
    const page = await context.newPage();
    await page.goto('/electrical#projects');
    const opener = page.locator('[data-work="residential-outlet-november-2026"] button').first();
    await opener.tap();
    const work = page.locator('[role="dialog"][data-profile="electrical"]');
    const close = work.getByRole('button', { name: 'Close', exact: true });
    const language = work.locator('[data-language-toggle]');
    await close.tap({ trial: true });
    const closeBox = (await close.boundingBox())!;
    const languageBox = (await language.boundingBox())!;
    expect(languageBox.x + languageBox.width <= closeBox.x || languageBox.y >= closeBox.y + closeBox.height).toBe(true);
    await tapClosePadding(page, work);
    await expect(opener).toBeFocused();

    await page.goto('/electrical#certificate');
    const certificateOpener = page.locator('[data-certificate="electrical-conductors"] [data-certificate-original] button');
    await certificateOpener.tap();
    const certificate = page.getByRole('dialog');
    await tapClosePadding(page, certificate);
    await expect(certificateOpener).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  });
}
