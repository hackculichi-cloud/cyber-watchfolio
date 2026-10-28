import { test, expect } from '@playwright/test';
import { englishStorageState } from './support/language';

const destinations = [
  ['/electrical', 'residential'], ['/electrical', 'industrial'], ['/electrical', 'electrical-control'],
  ['/electronics', 'basic-electronics'], ['/software-development', 'frontend'],
  ['/cybersecurity', 'soc'], ['/repair', 'smartphone-repairs'], ['/experience', 'operations-supervision'],
] as const;

test('a direct touch enters each specialty beneath the fixed navigation and can return to its cards', async ({ browser }) => {
  test.setTimeout(90000);
  for (const width of [320, 390]) {
    const context = await browser.newContext({ storageState: englishStorageState, viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    for (const [path, id] of destinations) {
      await page.goto(`${path}#specialties`);
      await page.locator(`[data-specialty="${id}"]`).tap();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const detail = page.locator(`[data-specialty-details-for="${id}"]`);
      await expect(detail).toBeFocused();
      await expect(page.getByRole('banner')).toHaveCSS('background-color', 'rgb(11, 17, 30)');
      const heading = detail.locator('h3').first();
      await expect.poll(async () => {
        const box = (await heading.boundingBox())!, nav = (await page.locator('.profile-section-nav').boundingBox())!;
        return box.y >= nav.y + nav.height && box.y + box.height < 760;
      }).toBe(true);
      await expect(detail).not.toContainText('Choose a specialty');
      await page.getByRole('button', { name: 'All specialties', exact: true }).tap();
      await expect(detail).toHaveCount(0);
      await expect(page.locator('#specialties h2')).toBeInViewport();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  }
});

test('specialty deep links and reload enter their content; electrical learning keeps practice and syllabus together', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/electrical#residential');
  const detail = page.locator('[data-specialty-details-for="residential"]');
  await expect(detail).toBeFocused();
  await expect(detail.locator('[data-area-learning]')).toContainText('Residential');
  await detail.locator('[data-area-syllabus] summary').click();
  await detail.locator('[data-area-syllabus]').getByRole('button', { name: /Residential Electrical Installations/ }).click();
  await expect(detail.locator('[data-area-syllabus]')).toContainText('Electrical load calculations');
  await page.locator('[data-area-tab="certificate"]').click();
  const title = page.locator('#certificate h2');
  await expect(title).toBeInViewport();
  await page.reload();
  await expect(page.locator('[data-area-tab="certificate"]')).toHaveAttribute('aria-selected', 'true');
  await expect(title).toBeInViewport();
  await page.goto('/software-development#frontend');
  await expect(page.locator('[data-specialty-details-for="frontend"]')).toBeFocused();
  await expect(page.locator('[data-specialty-knowledge]')).toContainText('React');
});

test('menu and specialty hover/focus produce a visible highlight without moving labels', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/electrical#specialties');
  const card = page.locator('[data-specialty="industrial"]');
  const before = await card.evaluate(el => getComputedStyle(el).backgroundColor);
  await card.hover();
  await expect.poll(() => card.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(before);
  await expect(card).toHaveCSS('box-shadow', /rgba/);
  await page.mouse.move(0, 0);
  await card.focus();
  await expect(card).toHaveCSS('outline-style', 'solid');
  const link = page.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'Contact', exact: true });
  await link.hover();
  await expect.poll(() => link.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
});

test('desktop keyboard and phone menu links enter the chosen detail rather than its cover', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open profile menu: Electronics', exact: true });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Specialties: Electronics', exact: true }).getByRole('link').first()).toBeFocused();
  await page.keyboard.press('Enter');
  const basic = page.locator('[data-specialty-details-for="basic-electronics"]');
  await expect(basic).toBeFocused();
  await expect(basic.locator('h3').first()).toBeInViewport();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.getByRole('button', { name: 'Open profile menu: Residential & Industrial Electrical Maintenance', exact: true }).click();
  await page.locator('header a[href="/electrical#industrial"]:visible').click();
  const industrial = page.locator('[data-specialty-details-for="industrial"]');
  await expect(industrial).toBeFocused();
  await expect(industrial.locator('h3').first()).toBeInViewport();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});
