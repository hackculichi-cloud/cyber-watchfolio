import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';

const preview = '/certificates/lidetec-reparacion-celulares.webp';
const pdf = '/certificates/lidetec-reparacion-celulares.pdf';
const original = '/images/repair/cert-lidetec.jpg';

for (const lang of ['en', 'es'] as const) {
  test(`LIDETEC uses the shared full-document presentation, downloadable scan and preserved source in ${lang}`, async ({ page, request }) => {
    test.setTimeout(60000);
    await page.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const width of [320, 820, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/repair#certifications');
      await page.reload();
      const card = page.locator('[data-repair-certificate]');
      const sheet = card.locator('[data-certificate-original="lidetec"]');
      await expect(sheet).toHaveAttribute('data-digitized-document', 'true');
      const image = sheet.locator('img');
      await expect(image).toHaveAttribute('src', preview);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth)).toBe(1600);
      await expect(image).toHaveCSS('rotate', 'none');
      expect((await image.boundingBox())!.width / (await card.boundingBox())!.width).toBeGreaterThan(.85);
      const download = card.getByRole('link', { name: lang === 'es' ? 'Descargar PDF' : 'Download PDF', exact: true });
      await expect(download).toHaveAttribute('href', pdf);
      await expect(download).toHaveAttribute('download', '');
      const opener = sheet.getByRole('button', { name: lang === 'es' ? 'Ver constancia' : 'View certificate', exact: true });
      await opener.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog');
      await expect(dialog.locator('img')).toHaveAttribute('src', preview);
      await expect(dialog.locator('[data-language-toggle]')).toHaveCount(0);
      await expect(dialog).toContainText(lang === 'es' ? 'Constancia de participación digitalizada' : 'Digitized participation certificate');
      const close = dialog.getByRole('button', { name: lang === 'es' ? 'Cerrar' : 'Close', exact: true });
      expect((await close.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      expect(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await card.locator('details > summary').click();
      await expect(card.locator(`a[href="${original}"]`)).toBeVisible();
      await expect(card).toContainText('Francisco Eduardo Villaseñor');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    const document = await request.get(pdf);
    expect(document.ok()).toBe(true);
    expect(document.headers()['content-type']).toContain('application/pdf');
    expect((await document.body()).subarray(0, 5).toString()).toBe('%PDF-');
    const supplied = await request.get(original);
    expect(createHash('sha256').update(await supplied.body()).digest('hex')).toBe('94adec42521bb27f89644d7696d705234528fb3ba363b8609047244130fc61b1');
  });
}

test('related courses reuse real credentials across repair and electronics without changing their states', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/repair#certifications');
    const repair = page.locator('[data-related-training="repair"]');
    await expect(repair.locator('[data-related-course]')).toHaveCount(2);
    await expect(repair.locator('[data-related-course="electrical-measurements"]')).toContainText('Completed');
    await expect(repair.locator('[data-related-course="eto-basic"]')).toContainText('Currently Studying');
    await page.goto('/electronics#certifications');
    const electronics = page.locator('[data-related-training="electronics"]');
    await expect(electronics.locator('[data-related-course]')).toHaveCount(3);
    await expect(electronics.locator('[data-related-course="lidetec"]')).toContainText('Course participation');
    await expect(electronics.locator('[data-related-course="electrical-linkedin"] a[href="/electrical#certificate-electrical-linkedin"]')).toBeVisible();
    await expect(electronics.locator('[data-related-course="electrical-measurements"] [data-certificate-original] img')).toHaveAttribute('src', '/certificates/udemy-mediciones-electricas.webp');
    const lidetec = electronics.locator('[data-related-course="lidetec"]');
    await lidetec.getByRole('button', { name: 'View certificate', exact: true }).click();
    await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', preview);
    await page.keyboard.press('Escape');
    await lidetec.locator('a[href="/repair#certifications"]').click();
    await expect(page.locator('[data-certificate-original="lidetec"] img')).toHaveAttribute('src', preview);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
