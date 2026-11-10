import { test, expect, type Page } from '@playwright/test';
import { selectLanguage } from './support/selectLanguage';

async function selectPageLanguage(page: Page, lang: 'en' | 'es') {
  const mobile = page.locator('button[aria-controls="mobile-navigation"]');
  const needsMenu = await mobile.isVisible();
  if (needsMenu) await mobile.click();
  await selectLanguage(page, lang);
  if (needsMenu) await mobile.click();
}

for (const width of [320, 820, 1440]) {
  test(`repair recruiting keeps experience, evidence and localized CV reachable at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/repair');
    for (const lang of ['en', 'es'] as const) {
      await selectPageLanguage(page, lang);
      const hero = page.locator('[data-world-hero="repair"]');
      await expect(hero).toContainText('TTEC');
      await expect(hero).toContainText('TCS');
      await expect(hero.locator('a[href="#smartphones"]')).toHaveText(lang === 'es' ? 'Ver reparaciones documentadas' : 'View documented repairs');
      const download = hero.locator('[data-repair-cv-download]');
      await expect(download).toHaveAttribute('href', `/cv/christian-velasco-repair-${lang}.pdf`);
      const pdf = await request.get(await download.getAttribute('href') as string);
      expect(pdf.ok()).toBe(true);
      expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
      await expect(hero.locator('a[href="/experience#background"]')).toBeVisible();
      await expect(hero.locator('a[href="/contact"]')).toHaveText(lang === 'es' ? 'Contactarme' : 'Contact me');
      for (const link of await hero.locator('.hero-actions a').all()) expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      const career = page.locator('[data-repair-career]');
      await expect(career).toBeVisible();
      await expect(career.locator('[data-support-role]')).toHaveCount(3);
      await expect(career.locator('[data-support-role="ttec-tier2"]')).toContainText(lang === 'es' ? 'causa raíz' : 'root-cause analysis');
      await expect(career.locator('[data-support-role="tcs-operations"]')).toContainText('SLA');
      await expect(career).toContainText(lang === 'es' ? '7 años' : '7 years');
      const training = page.locator('[data-repair-development]');
      await expect(training.locator('a[href="/electronics#basic-electronics"]')).toContainText(lang === 'es' ? 'Estudiando actualmente' : 'Currently Studying');
      await expect(training.locator('a[href="/electrical#certificate-electrical-measurements"]')).toContainText(lang === 'es' ? 'Completado' : 'Completed');
      await expect(training).toContainText(lang === 'es' ? 'Objetivos de desarrollo' : 'Development goals');
      await expect(training).toContainText(lang === 'es' ? 'Tengo disposición' : 'I am willing');
      await hero.locator('a[href="#smartphones"]').click();
      await expect(page.locator('[data-repair-showcase]')).toBeVisible();
      await expect(page.locator('[data-repair-showcase] button')).toHaveCount(3);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.locator('[data-world-hero="repair"] a[href="/experience#background"]').click();
    await expect(page.locator('#background')).toBeVisible();
    if (width < 768) await page.getByRole('combobox').selectOption('transferable');
    await expect(page.locator('a[href="/repair#smartphones"]')).toHaveCount(1);
    await page.locator('a[href="/repair#smartphones"]').click();
    await expect(page.locator('[data-repair-showcase]')).toBeVisible();
  });
}

test('Samsung screen intervention and unresolved flash stay separate from confirmed iPhone evidence in ES/EN', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/repair#smartphones');
  const additional = page.locator('#smartphone-repair-groups > details');
  await additional.locator(':scope > summary').click();
  const samsung = additional.locator('[data-reported-repair="reported-s21-ultra-screen"]');
  for (const lang of ['en', 'es'] as const) {
    await selectPageLanguage(page, lang);
    await expect(samsung).toContainText(lang === 'es' ? 'Pantalla reemplazada · seguimiento pendiente' : 'Screen replaced · follow-up pending');
    await expect(samsung).toContainText(lang === 'es' ? 'Se reportó una falla del flash cuya resolución no está confirmada.' : 'A flash fault was reported; its resolution is not confirmed.');
    await expect(samsung).toContainText(lang === 'es' ? 'El resultado funcional completo sigue sin confirmar.' : 'The overall functional result remains unconfirmed.');
    const record = samsung.locator('details');
    if (!(await record.getAttribute('open') === '')) await record.locator('summary').click();
    await expect(record).toContainText(lang === 'es' ? 'una función de la interfaz' : 'an interface feature');
    await expect(record).toContainText(lang === 'es' ? 'Están pendientes las fotografías' : 'Photographs, the flash diagnosis');
    await expect(samsung.locator('img')).toHaveCount(0);
    await expect(page.locator('[data-repair-showcase]')).not.toContainText('Samsung');
  }
  await page.locator('[data-repair-group="sr-001"]').focus();
  await page.keyboard.press('Enter');
  const dialog = page.locator('[data-repair-dialog]');
  await expect(dialog.locator('[data-repair-outcome]')).toContainText('comprobaciones');
  await dialog.locator('[data-repair-technical] > summary').click();
  await expect(dialog).toContainText('Síntoma reportado sin documentar.');
  await expect(dialog).toContainText('Detalles de la inspección inicial pendientes de documentación.');
  await expect(dialog).toContainText('Detalles del diagnóstico pendientes de documentación.');
  await expect(dialog.locator('[data-photo-gallery] figure')).toHaveCount(9);
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-repair-group="sr-001"]')).toBeFocused();
});

test('supporting studies link to the existing electronics syllabus and original electrical certificate', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/repair#certifications');
  await page.locator('[data-repair-development] a[href="/electronics#basic-electronics"]').click();
  await expect(page.locator('[data-specialty-details-for="basic-electronics"]')).toBeVisible();
  await expect(page.locator('[data-specialty="basic-electronics"]')).toHaveAttribute('aria-expanded', 'true');
  await page.goto('/repair#certifications');
  await page.locator('[data-repair-development] a[href="/electrical#certificate-electrical-measurements"]').click();
  const certificate = page.locator('#certificate-electrical-measurements');
  await expect(certificate).toBeVisible();
  await expect(certificate.locator('[data-certificate-info]')).toHaveAttribute('open', '');
  await certificate.getByRole('button', { name: /^Enlarge original certificate:/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
});
