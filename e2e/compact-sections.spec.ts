import { englishStorageState } from "./support/language";
import { test, expect } from "@playwright/test";

test("collapsed photo strips show the collection and open the correct original image", async ({ page }) => {
  await page.goto('/repair#gallery');
  const gallery = page.locator('#gallery');
  const photos = gallery.locator('[data-photo-gallery] img');
  await expect(photos).toHaveCount(4);
  await expect(gallery).toContainText('Showing 4 of 18 photos');
  // The last representative preview is original photo 18, not the fourth photo.
  await gallery.getByRole('button', { name: /^Open larger preview:/ }).last().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('img:not([data-language-flag])')).toHaveAttribute('src', '/images/repair/repair-photo-18.jpg');
  await expect(dialog.getByRole('status')).toHaveText('Photo 18 of 18');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('img:not([data-language-flag])')).toHaveAttribute('src', '/images/repair/repair-photo-17.jpg');
  await page.keyboard.press('Escape');
  await gallery.getByRole('button', { name: /^View more photos:/ }).click();
  await expect(photos).toHaveCount(18);
  await gallery.getByRole('button', { name: /^Show fewer photos:/ }).click();
  await expect(photos).toHaveCount(4);
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
    await page.locator('button[lang="es"]:visible').first().click();
    await expect(cv.locator('figure img')).toHaveAttribute('src', /-es\.png$/);
    await cv.getByRole('button', { name: /^Vista previa del CV:/ }).click();
    await expect(page.getByRole('dialog').locator('img:not([data-language-flag])')).toHaveAttribute('src', await cv.locator('figure img').getAttribute('src') as string);
    await page.keyboard.press('Escape');
    await page.locator('button[lang="en"]:visible').first().click();
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
    await expect(tools.locator('[data-tool-catalog] li')).toHaveCount(6);
    await expect(tools).not.toContainText('Add your');
    await expect(tools).toContainText('Las fotos originales');
    const illustration = tools.locator('img[data-mascot-scene="detail"]');
    await expect.poll(() => illustration.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth === 1536)).toBe(true);
    expect((await page.locator('[data-header-mascot]').boundingBox())!.width).toBe(112);
    expect((await tools.boundingBox())!.height).toBeLessThan(850);
    for (const id of ['tools', 'cv', 'evidence']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await expect(page.locator('#evidence [data-photo-gallery] img')).toHaveCount(4);
    await context.close();
  }
});
