import { test, expect } from '@playwright/test';

test('the main program leads the visual overview and complementary courses in both languages on phones and desktop', async ({ browser }) => {
  for (const lang of ['es', 'en']) {
    const context = await browser.newContext();
    await context.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    const page = await context.newPage();
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/electrical#residential');
      const main = page.locator('[data-main-electrical-training]');
      const complementary = page.locator('[data-area-courses]');
      await expect(main).toContainText(lang === 'es' ? 'Formación principal' : 'Main training');
      await expect(main).toContainText('Universidad Internacional · RED CONOCER');
      await expect(main.locator('a')).toHaveAttribute('href', 'https://www.facebook.com/uinternacionaloficial/?locale=es_LA');
      expect(await main.evaluate(el => !!(el.compareDocumentPosition(document.querySelector('[data-area-courses]')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
      await expect(complementary.locator('[data-complementary-course]')).toHaveCount(3);
      await expect(complementary).not.toContainText('RED CONOCER');
      await expect(complementary.locator('[data-complementary-course="electrical-linkedin"]')).toContainText(lang === 'es' ? 'Completado' : 'Completed');
      await expect(complementary.locator('[data-complementary-course="electrical-udemy-measurements"]')).toContainText(lang === 'es' ? 'En progreso' : 'In progress');
      await expect(page.locator('[data-electrical-knowledge] article')).toHaveCount(3);
      await expect(page.getByRole('img', { name: lang === 'es' ? 'Circuito de CA: línea, carga y neutro' : 'AC circuit: line, load and neutral' })).toBeAttached();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  }
});

test('syllabus, measurements and certificates keep their provider and actual state; projects stay usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/electrical#residential');
  const syllabus = page.locator('[data-area-syllabus]');
  await syllabus.locator('summary').click();
  await expect(syllabus.getByRole('button')).toHaveCount(3);
  await syllabus.getByRole('button', { name: /Residential Electrical Installations/ }).click();
  await expect(syllabus.getByText('Electrical load calculations')).toBeVisible();
  const measurements = page.locator('[data-complementary-course="electrical-udemy-measurements"]');
  await measurements.locator('summary').click();
  await expect(measurements.getByText('Testing continuity in de-energized circuits.')).toBeVisible();
  await measurements.getByRole('button', { name: 'View course details' }).click();
  await expect(page.locator('[data-certificate="electrical-measurements"]')).toBeFocused();
  await expect(page.locator('[data-certificate]').first()).toHaveAttribute('data-certificate', 'electrical-conocer');
  await expect(page.locator('[data-certificate]').first()).toContainText('Currently Studying');
  await expect(page.locator('[data-certificate="electrical-linkedin"]')).toContainText('Completed');
  await page.locator('[data-area-tab="projects"]').click();
  await expect(page.locator('[data-electrical-group]')).toHaveCount(3);
  await page.locator('[data-electrical-group="residential-outlets"]').click();
  await expect(page.locator('[data-electrical-practices]')).toContainText('Residential Outlet Replacement');
  await page.goto('/electrical#industrial');
  await expect(page.locator('[data-area-practices]')).toContainText('No completed practices documented');
  await page.locator('[data-area-syllabus] summary').click();
  await expect(page.locator('[data-area-syllabus]').getByRole('button')).toHaveCount(4);
  await page.goto('/electrical#electrical-control');
  await expect(page.locator('[data-area-practices]')).toContainText('Planned');
  await expect(page.locator('[data-area-practices]')).toContainText('Float-switch Control');
});

test('circuit motion is brief, pauses outside the viewport and stays static with reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/electrical#residential');
  const circuit = page.locator('[data-title-circuit]');
  const charge = circuit.locator('.circuit-line-charge');
  await circuit.scrollIntoViewIfNeeded();
  await expect(circuit).toHaveAttribute('data-in-view', 'true');
  await expect(charge).toHaveCSS('animation-direction', 'alternate');
  await expect(charge).toHaveCSS('animation-iteration-count', '2');
  await expect(charge).toHaveCSS('animation-play-state', 'running');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(circuit).toHaveAttribute('data-in-view', 'false');
  await expect(charge).toHaveCSS('animation-play-state', 'paused');
  await circuit.scrollIntoViewIfNeeded();
  await expect.poll(() => charge.evaluate(el => el.getAnimations().every(animation => animation.playState === 'finished')), { timeout: 6000 }).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(charge).toHaveCSS('animation-name', 'none');
});
