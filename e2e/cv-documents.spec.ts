import { test, expect } from '@playwright/test';
import manifests from '../src/data/cvManifest.json' with { type: 'json' };
import { selectLanguage } from './support/selectLanguage';

for (const cv of manifests) {
  test(`${cv.id}: every localized CV page is available and the viewer respects its boundaries`, async ({ page, request }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/cv');
    await page.locator(`[data-cv-theme="${cv.id}"]`).getByRole('button', { name: /^Preview CV:/ }).click();
    const dialog = page.getByRole('dialog');
    const image = dialog.locator('img:not([data-language-flag])');
    for (const lang of ['en', 'es'] as const) {
      await selectLanguage(dialog, lang);
      const pages = cv.pageCounts[lang];
      const next = dialog.getByRole('button', { name: lang === 'es' ? 'Página siguiente' : 'Next page', exact: true });
      const previous = dialog.getByRole('button', { name: lang === 'es' ? 'Página anterior' : 'Previous page', exact: true });
      while (!(await previous.isDisabled())) await previous.click();
      const download = dialog.locator('a[download]');
      const file = `/cv/christian-velasco-${cv.id}-${lang}.pdf`;
      await expect(download).toHaveAttribute('href', file);
      const response = await request.get(file);
      expect(response.ok()).toBe(true);
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
      for (let index = 1; index <= pages; index++) {
        await expect(dialog.locator('[data-cv-page]')).toHaveText(lang === 'es' ? `Página ${index} de ${pages}` : `Page ${index} of ${pages}`);
        await expect(image).toHaveAttribute('src', `/cv/previews/christian-velasco-${cv.id}-${lang}${index > 1 ? `-page-${index}` : ''}.png`);
        await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
        if (index < pages) await next.click();
      }
      await expect(next).toBeDisabled();
      await expect(previous).toBeEnabled();
      expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
    await dialog.getByRole('button', { name: 'Acercar', exact: true }).click();
    await expect(dialog.locator('output:not([data-cv-page])')).toHaveText('125%');
    if (cv.id === 'general') {
      const zoomIn = dialog.getByRole('button', { name: 'Acercar', exact: true });
      for (let step = 0; step < 11; step++) await zoomIn.click();
      await expect(dialog.locator('output:not([data-cv-page])')).toHaveText('400%');
      await expect(zoomIn).toBeDisabled();
      const viewport = dialog.getByRole('region', { name: 'Vista previa del CV', exact: true });
      await expect.poll(() => viewport.evaluate(el => el.scrollWidth > el.clientWidth * 3)).toBe(true);
      await viewport.evaluate(el => { el.scrollLeft = 100; });
      await expect.poll(() => viewport.evaluate(el => el.scrollLeft)).toBe(100);
    }
    await dialog.getByRole('button', { name: 'Página anterior', exact: true }).click();
    await expect(dialog.locator('output:not([data-cv-page])')).toHaveText('100%');
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
}
