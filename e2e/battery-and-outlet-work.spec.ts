import { createHash } from 'node:crypto';
import { test, expect, type Locator } from '@playwright/test';
import evidence from '../docs/battery-and-outlet-photo-sources.json' with { type: 'json' };

test('all 24 uploaded work photographs keep their original bytes and separate case assignments', async ({ request }) => {
  expect(evidence.photos).toHaveLength(24);
  for (const photo of evidence.photos) {
    const response = await request.get(photo.asset);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/jpeg');
    expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(photo.sha256);
  }
});

for (const lang of ['en', 'es'] as const) for (const width of [320, 820, 1440]) {
  test(`the iPhone 13 battery and separate outlet work open with all originals at ${width}px in ${lang}`, async ({ browser }) => {
    test.setTimeout(60000);
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 1024, isMobile: width < 768, reducedMotion: 'reduce' });
    await context.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    const page = await context.newPage();
    const activate = (locator: Locator) => width < 1024 ? locator.tap() : locator.click();
    await page.goto('/repair#smartphones');
    await expect(page.locator('[data-repair-showcase] button')).toHaveCount(4);
    const trigger = page.locator('[data-repair-group="sr-004"]');
    await expect(trigger.locator('img')).toHaveAttribute('src', '/images/repair/iphone-13-battery/07.jpeg');
    await activate(trigger);
    const repair = page.locator('[data-repair-dialog]');
    const gallery = repair.locator('[data-photo-gallery]');
    const phoneSources = evidence.photos.filter(photo => photo.case === 'sr-004').map(photo => photo.asset);
    await expect(gallery.locator('figure')).toHaveCount(11);
    expect(await gallery.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')))).toEqual(phoneSources);
    await expect(gallery.locator('img').first()).toHaveAttribute('srcset', /previews\/images\/repair\/iphone-13-battery/);
    await activate(gallery.locator('button').first());
    const viewer = page.locator('[data-photo-dialog]');
    for (const [index, source] of phoneSources.entries()) {
      await expect(viewer.locator('img')).toHaveAttribute('src', source);
      await expect.poll(() => viewer.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(viewer.getByRole('status')).toHaveText(lang === 'es' ? `Foto ${index + 1} de 11` : `Photo ${index + 1} of 11`);
      if (index < phoneSources.length - 1) await page.keyboard.press('ArrowRight');
    }
    await page.keyboard.press('Escape');
    await expect(gallery.locator('button').first()).toBeFocused();
    await activate(repair.locator('[data-repair-technical] > summary'));
    await expect(repair).toContainText(lang === 'es' ? 'resultados de las pruebas funcionales finales' : 'final functional test results');
    await expect(repair.locator('[data-work-step]')).toHaveCount(4);
    await expect(repair).not.toContainText(lang === 'es' ? 'confirma que realizó todas las comprobaciones' : 'confirms that all listed post-repair checks');
    expect(await repair.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await page.locator('#smartphone-repair-groups > details > summary').click();
    await expect(page.locator('[data-reported-repair="reported-iphone13-battery"]')).toHaveCount(0);
    await expect(page.locator('[data-reported-repair]')).toHaveCount(2);

    await page.goto('/electrical#projects');
    const card = page.locator('[data-work="residential-outlet-switch-white-plate"]');
    const outletTrigger = card.getByRole('button').first();
    await expect(outletTrigger.locator('img')).toHaveAttribute('src', '/images/electrical/outlet-switch-white-plate/08.jpeg');
    await activate(outletTrigger);
    const work = page.getByRole('dialog');
    await expect(work).toContainText('124.4 V');
    await expect(work).not.toContainText('119.3');
    await expect(work).not.toContainText('122.0');
    const outletGallery = work.locator('[data-photo-gallery]');
    await expect(outletGallery.locator('figure')).toHaveCount(13);
    const outletSources = await outletGallery.locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')));
    expect(new Set(outletSources)).toEqual(new Set(evidence.photos.filter(photo => photo.case === 'residential-outlet-switch-white-plate').map(photo => photo.asset)));
    await expect(outletGallery.locator('img').first()).toHaveAttribute('srcset', /previews\/images\/electrical\/outlet-switch-white-plate/);
    await activate(outletGallery.locator('button').first());
    for (const [index, source] of outletSources.entries()) {
      await expect(viewer.locator('img')).toHaveAttribute('src', source!);
      await expect.poll(() => viewer.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(viewer.getByRole('status')).toHaveText(lang === 'es' ? `Foto ${index + 1} de 13` : `Photo ${index + 1} of 13`);
      if (index < outletSources.length - 1) await page.keyboard.press('ArrowRight');
    }
    await page.keyboard.press('Escape');
    await expect(outletGallery.locator('button').first()).toBeFocused();
    await work.locator('[data-content-details] > summary').click();
    await expect(work.locator('[data-work-step]')).toHaveCount(4);
    await expect(work).toContainText(lang === 'es' ? 'No se han proporcionado resultados de polaridad' : 'Polarity and protective-earth results have not been supplied');
    expect(await work.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.keyboard.press('Escape');
    await expect(outletTrigger).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  });
}
