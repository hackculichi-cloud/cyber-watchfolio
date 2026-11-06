import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
import { test, expect } from "@playwright/test";

test("the workshop archive keeps all photos behind a disclosure and enlarges the correct original", async ({ page }) => {
  await page.goto('/repair#gallery');
  const gallery = page.locator('#gallery');
  const archive = gallery.locator('details');
  const photos = gallery.locator('[data-photo-gallery] img');
  await expect(archive).not.toHaveAttribute('open', '');
  await expect(photos).toHaveCount(18);
  await expect(photos.first()).toBeHidden();
  await archive.locator(':scope > summary').click();
  const opener = gallery.getByRole('button', { name: /^Open larger preview:/ }).last();
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('img:not([data-language-flag])')).toHaveAttribute('src', '/images/repair/repair-photo-18.jpg');
  await expect(dialog.getByRole('status')).toHaveText('Photo 18 of 18');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('img:not([data-language-flag])')).toHaveAttribute('src', '/images/repair/repair-photo-17.jpg');
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await archive.locator(':scope > summary').click();
  await expect(archive).not.toHaveAttribute('open', '');
  await expect(photos.first()).toBeHidden();
});

test("CVs share a compact row with their mascot and preserve localized previews", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const path of ['/electrical', '/electronics', '/repair', '/cybersecurity', '/software-development', '/experience']) {
    await page.goto(`${path}#cv`);
    const cv = page.locator('#cv');
    await cv.scrollIntoViewIfNeeded();
    const content = (await cv.locator('[data-profile-cv]').boundingBox())!;
    const mascot = (await cv.locator('[data-mascot-scene="closing"]').boundingBox())!;
    expect(mascot.y).toBeLessThan(content.y + content.height);
    expect(mascot.y + mascot.height).toBeGreaterThan(content.y);
    expect((await cv.boundingBox())!.height).toBeLessThan(500);
    await expect(cv.locator('figure img')).toHaveAttribute('src', /-en\.png$/);
    await selectLanguage(page, "es");
    await expect(cv.locator('figure img')).toHaveAttribute('src', /-es\.png$/);
    await cv.getByRole('button', { name: /^Vista previa del CV:/ }).click();
    await expect(page.getByRole('dialog').locator('img:not([data-language-flag])')).toHaveAttribute('src', await cv.locator('figure img').getAttribute('src') as string);
    await page.keyboard.press('Escape');
    await selectLanguage(page, "en");
  }
});

test("phone layouts keep named tools, gallery targets and the larger header inside the viewport", async ({ browser }) => {
  for (const width of [320, 390, 1024]) {
    const context = await browser.newContext({ storageState: englishStorageState, viewport: { width, height: 900 }, hasTouch: width < 640, isMobile: width < 640, reducedMotion: 'reduce' });
    await context.addInitScript(() => localStorage.setItem('portfolio-lang', 'es'));
    const page = await context.newPage();
    await page.goto('/electrical#tools');
    const tools = page.locator('#tools');
    await tools.scrollIntoViewIfNeeded();
    await expect(tools.locator('[data-owned-tool]')).toHaveCount(5);
    await expect(page.locator('[data-electrical-area-content]')).toHaveCount(0);
    await expect(tools).not.toContainText('Add your');
    await expect(tools).not.toContainText('Presentación retocada');
    const illustration = tools.locator('img[data-mascot-scene="detail"]');
    if (width < 640) await expect(illustration).toBeHidden();
    else await expect.poll(() => illustration.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 384)).toBe(true);
    expect((await page.locator('[data-header-mascot]').boundingBox())!.width).toBe(width < 768 ? 80 : 112);
    // Phone layouts now include the full description beneath every tool photo.
    expect((await tools.boundingBox())!.height).toBeLessThan(width < 640 ? 1600 : 1450);
    for (const id of ['tools', 'cv', 'evidence']) {
      await page.goto(`/electrical#${id}`);
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    // The old evidence link opens the same photo-led case list, without a duplicate archive.
    await expect(page.locator('#projects [data-work]')).toHaveCount(5);
    await expect(page.locator('#projects [data-photo-gallery]')).toHaveCount(0);
    await expect(page.locator('[data-area-tab]')).toHaveCount(0);
    await context.close();
  }
});
