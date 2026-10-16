import { test, expect } from '@playwright/test';
import { selectLanguage } from './support/selectLanguage';
import manifests from '../src/data/cvManifest.json' with { type: 'json' };

const generalPages = manifests.find(cv => cv.id === 'general')!.pageCounts;

test('the general CV exposes its real PDF pages, preserves language on page two and downloads the full document', async ({ page, request }) => {
  await page.goto('/cv');
  const general = page.locator('[data-cv-theme="general"]');
  await expect(page.locator('[data-cv-theme]')).toHaveCount(7);
  await expect(general).toContainText('7 years');
  const download = general.locator('a[download]');
  await expect(download).toHaveAttribute('href', '/cv/christian-velasco-general-en.pdf');
  const pdf = await request.get((await download.getAttribute('href'))!);
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await general.getByRole('button', { name: /^Preview CV:/ }).click();
  const dialog = page.getByRole('dialog');
  const image = dialog.locator('img:not([data-language-flag])');
  await expect(dialog.locator('[data-cv-page]')).toHaveText(`Page 1 of ${generalPages.en}`);
  await expect(dialog.getByRole('button', { name: 'Previous page', exact: true })).toBeDisabled();
  await dialog.getByRole('button', { name: 'Next page', exact: true }).click();
  await expect(dialog.locator('[data-cv-page]')).toHaveText(`Page 2 of ${generalPages.en}`);
  await expect(image).toHaveAttribute('src', '/cv/previews/christian-velasco-general-en-page-2.png');
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await selectLanguage(dialog, 'es');
  await expect(dialog.locator('[data-cv-page]')).toHaveText(`Página 2 de ${generalPages.es}`);
  await expect(image).toHaveAttribute('src', '/cv/previews/christian-velasco-general-es-page-2.png');
  await expect(dialog.locator('a[download]')).toHaveAttribute('href', '/cv/christian-velasco-general-es.pdf');
  await dialog.getByRole('button', { name: 'Página anterior', exact: true }).click();
  await expect(image).toHaveAttribute('src', '/cv/previews/christian-velasco-general-es.png');
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 320, height: 844 });
  await general.getByRole('button', { name: /^Vista previa del CV:/ }).click();
  await dialog.getByRole('button', { name: 'Página siguiente', exact: true }).click();
  await expect(dialog.locator('[data-cv-page]')).toHaveText(`Página 2 de ${generalPages.es}`);
  const bounds = (await dialog.boundingBox())!;
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
});

test('the flag-only language control retains its accessible action and fits the desktop header', async ({ page }) => {
  for (const width of [1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await selectLanguage(page, 'en');
    const toggle = page.locator('header [data-language-toggle]:visible');
    await expect(toggle).toHaveText('');
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to Spanish');
    await expect(toggle.locator('[data-language-flag]')).toHaveAttribute('data-language-flag', 'en');
    const brand = (await page.locator('[data-header-brand]').boundingBox())!;
    const first = (await page.locator('header nav > ul a').first().boundingBox())!;
    const control = (await toggle.boundingBox())!;
    expect(control.width).toBeLessThanOrEqual(88);
    expect(control.height).toBeGreaterThanOrEqual(44);
    const last = (await page.locator('header nav > ul a').last().boundingBox())!;
    expect(first.x).toBeGreaterThanOrEqual(brand.x + brand.width);
    expect(control.x).toBeGreaterThanOrEqual(last.x + last.width);
    expect(control.x + control.width).toBeLessThanOrEqual(width);
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(toggle).toHaveAttribute('aria-label', 'Cambiar a inglés');
    await expect(toggle.locator('[data-language-flag]')).toHaveAttribute('data-language-flag', 'es');
  }
});
