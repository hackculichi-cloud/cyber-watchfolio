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

test('the shared training keeps the full main syllabus and complementary course states in both languages', async ({ browser }) => {
  for (const lang of ['es', 'en']) {
    const context = await browser.newContext();
    await context.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    const page = await context.newPage();
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/electrical#certificate');
      await page.reload();
      const records = page.locator('[data-certifications="electrical"]');
      const main = records.locator('[data-certificate="electrical-conocer"]');
      await expect(main).toContainText('Universidad Internacional · RED CONOCER');
      await expect(main).toContainText(lang === 'es' ? 'Formación principal' : 'Main training');
      await expect(records.locator('[data-training-role="complementary"]')).toHaveCount(5);
      for (const id of ['electrical-conductors', 'electrical-linkedin-equipment', 'electrical-linkedin', 'electrical-measurements', 'electrical-udemy']) await expect(records.locator(`[data-certificate="${id}"]`)).toContainText(lang === 'es' ? 'Completado' : 'Completed');
      await main.locator('[data-certificate-info] > summary').click();
      const syllabus = main.locator('[data-course-syllabus="electrical"]');
      await syllabus.locator('summary').click();
      await expect(syllabus.locator('[data-electrical-module]')).toHaveCount(8);
      await expect(syllabus).toContainText(lang === 'es' ? 'Proyecto final y evaluación' : 'Final Project and Evaluation');
      await expect(page.locator('[data-specialty-details-for]')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  }
});

test('specialties enter one work collection and legacy summary links remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  for (const id of ['residential', 'industrial', 'electrical-control', 'overview', 'skills']) {
    await page.goto(`/electrical#${id}`);
    await expect(page.locator('[data-area-tab]')).toHaveCount(0);
    await expect(page.locator('[data-area-tab="overview"], [data-area-learning]')).toHaveCount(0);
    await expect(page.locator('#projects')).toBeVisible();
    if (id === 'overview' || id === 'skills') await expect(page.locator('#projects h2')).toBeInViewport();
  }
  await page.goto('/electrical#residential');
  await page.locator('[data-electrical-group="residential-outlets"]').click();
  await expect(page.locator('[data-electrical-practices]')).toContainText('Residential Outlet Replacement');
  await page.goto('/electrical#industrial');
  await page.locator('[data-electrical-group="industrial-motors"]').click();
  await expect(page.locator('[data-electrical-practices]')).toContainText('No completed practices documented');
  await page.goto('/electrical#electrical-control');
  await page.locator('[data-electrical-group="control-contactors"]').click();
  await expect(page.locator('[data-electrical-practices]')).toContainText('Planned');
});
