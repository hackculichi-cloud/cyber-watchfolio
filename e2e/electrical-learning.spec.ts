import { test, expect } from '@playwright/test';

test('specialties can be closed from the top, bottom or selected card on a phone and desktop', async ({ browser }) => {
  for (const width of [320, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, isMobile: width < 640, hasTouch: width < 640 });
    const page = await context.newPage();
    for (const [id, close] of [['residential', 'top'], ['industrial', 'bottom'], ['electrical-control', 'card']]) {
      await page.goto(`/electrical#${id}`);
      await expect(page.locator('[data-specialty-details-for]')).toBeFocused();
      const card = page.locator(`[data-specialty="${id}"]`);
      const control = close === 'card' ? card : page.locator(`[data-close-specialty="${close}"]`);
      await control.click();
      await expect(page.locator('[data-specialty-details-for]')).toHaveCount(0);
      await expect(card).toBeFocused();
      await expect(card).toHaveAttribute('aria-expanded', 'false');
      await expect(page).toHaveURL(/#specialties$/);
    }
    await context.close();
  }
});

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
      await expect(page.locator('[data-learning-stage]')).toHaveCount(3);
      expect(await page.locator('[data-learning-stage]').evaluateAll(elements => elements.map(el => el.getAttribute('data-learning-stage')))).toEqual(['training', 'knowledge', 'practice']);
      const syllabus = page.locator('[data-area-syllabus]');
      await syllabus.locator('summary').click();
      await expect(syllabus.locator('[data-electrical-module]')).toHaveCount(8);
      await expect(syllabus.locator('[data-related-module="true"]')).toHaveCount(3);
      await expect(syllabus).toContainText(lang === 'es' ? 'Proyecto final y evaluación' : 'Final Project and Evaluation');
      await page.locator('[data-learning-jump="practice"]').click();
      await expect(page.locator('#learning-practice-title')).toBeFocused();
      await expect(page.locator('#learning-practice-title')).toBeInViewport();
      const thumbnails = page.locator('[data-area-practices] img');
      await expect(thumbnails).toHaveCount(4);
      for (const thumbnail of await thumbnails.all()) await expect(thumbnail).toHaveAttribute('src', /\/images\/electrical\/overview\/.*\.webp$/);
      await expect(page).toHaveURL(/#residential$/);
      await expect(page.locator('[data-title-circuit]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  }
});

test('syllabus, measurements and certificates keep their provider and actual state; projects stay usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/electrical#residential');
  const syllabus = page.locator('[data-area-syllabus]');
  await expect(syllabus.locator('[data-electrical-module]')).toHaveCount(0);
  await syllabus.locator('summary').click();
  await expect(syllabus.getByRole('button')).toHaveCount(8);
  await syllabus.getByRole('button', { name: /Residential Electrical Installations/ }).click();
  await expect(syllabus.getByText('Electrical load calculations')).toBeVisible();
  await syllabus.locator('summary').click();
  await syllabus.locator('summary').click();
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
  await expect(page.locator('[data-area-syllabus]').getByRole('button')).toHaveCount(8);
  await expect(page.locator('[data-area-syllabus] [data-related-module="true"]')).toHaveCount(4);
  await page.goto('/electrical#electrical-control');
  await expect(page.locator('[data-area-practices]')).toContainText('Planned');
  await expect(page.locator('[data-area-practices]')).toContainText('Float-switch Control');
  await page.locator('[data-area-syllabus] summary').click();
  await expect(page.locator('[data-area-syllabus]').getByRole('button')).toHaveCount(8);
  await expect(page.locator('[data-area-syllabus] [data-related-module="true"]')).toHaveCount(2);
});
