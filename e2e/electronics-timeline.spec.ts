import { test, expect } from '@playwright/test';
import { selectLanguage } from './support/selectLanguage';

const order = ['basic-electronics', 'television-video', 'audio-radio', 'digital-systems', 'microcontrollers', 'microcomputers', 'industrial-electronics'];

test('electronics lettering is soldered onto a PCB and follows the profile in both languages', async ({ page }) => {
  await page.goto('/electronics');
  await expect(page.getByRole('heading', { level: 1, name: 'Electronics', exact: true })).toBeVisible();
  const title = page.locator('[data-pcb-title]');
  await expect(title.locator('[data-pcb-component]')).toHaveCount(1);
  await expect(title.locator('[data-pcb-solder-joint]')).toHaveCount(8);
  await expect(page.locator('header [data-pcb-wordmark]')).toBeVisible();
  await selectLanguage(page, 'es');
  await expect(page.getByRole('heading', { level: 1, name: 'Electrónica', exact: true })).toBeVisible();
  await expect(title.locator('[data-pcb-solder-text]')).toHaveText('Electrónica');
  const inkFits = await title.locator('svg').evaluate((svg: SVGSVGElement) => {
    const bounds = svg.querySelector('text')!.getBBox();
    return bounds.x >= 0 && bounds.x + bounds.width <= svg.viewBox.baseVal.width && bounds.y >= 0 && bounds.y + bounds.height <= svg.viewBox.baseVal.height;
  });
  expect(inkFits).toBe(true);
  expect(await title.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
});

test('seven chronological courses keep actual statuses and open and close their details', async ({ page }) => {
  await page.goto('/electronics#specialties');
  const timeline = page.locator('ol[data-electronics-timeline]');
  await expect(timeline.locator('li[data-training-stage]')).toHaveCount(7);
  expect(await timeline.locator('[data-specialty]').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-specialty')))).toEqual(order);
  await expect(timeline.getByText('Currently studying', { exact: true })).toHaveCount(1);
  await expect(timeline.getByText('Upcoming', { exact: true })).toHaveCount(6);
  for (const id of order.slice(1)) {
    const button = timeline.locator(`[data-specialty="${id}"]`);
    await button.click();
    const detail = page.locator(`[data-specialty-details-for="${id}"]`);
    await expect(detail).toBeFocused();
    await expect(detail.getByText('Upcoming', { exact: true })).toBeVisible();
    await detail.locator('[data-close-specialty="top"]').click();
    await expect(detail).toHaveCount(0);
    await expect(button).toBeFocused();
  }
  await timeline.locator('[data-specialty="basic-electronics"]').click();
  const syllabus = page.locator('[data-electronics-syllabus]');
  await syllabus.locator('summary').click();
  await expect(syllabus.locator('li')).toHaveCount(12);
  await selectLanguage(page, 'es');
  await expect(page.getByRole('heading', { name: 'Mi ruta de formación en electrónica', exact: true })).toBeVisible();
  await expect(syllabus.getByText('Matemáticas Aplicadas II', { exact: true })).toBeVisible();
});

for (const width of [320, 390]) test(`electronics keeps a compact pending state and navigable learning path at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/electronics');
  await page.getByRole('link', { name: 'Explore my training', exact: true }).click();
  await expect(page.locator('[data-electronics-timeline]')).toBeVisible();
  await expect(page.locator('#gallery')).toBeHidden();
  for (const id of ['projects', 'gallery']) {
    await page.getByRole('combobox', { name: 'Jump to section' }).selectOption(id);
    const pending = page.locator(`[data-compact-pending="${id}"]`);
    await expect(pending).toBeVisible();
    expect((await pending.boundingBox())!.height).toBeLessThan(180);
    await expect(pending.locator('img, button')).toHaveCount(0);
  }
  await page.goto('/electronics#tracks');
  await expect(page.locator('[data-electronics-timeline]')).toBeVisible();
  await expect(page.locator('#tracks')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const svg = (await page.locator('[data-pcb-title] svg').boundingBox())!;
  expect(svg.width).toBeGreaterThan(width - 40);
});

test('PCB branding fits the desktop menu and previews on Home without opening a dropdown', async ({ page }) => {
  for (const width of [1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main', exact: true });
    const home = nav.getByRole('link', { name: 'Home', exact: true });
    const before = (await home.boundingBox())!;
    await nav.getByRole('link', { name: 'Electronics', exact: true }).hover();
    await expect(page.locator('header [data-pcb-wordmark]')).toBeVisible();
    await expect(page.locator('.profile-menu-panel')).toHaveCount(0);
    const brand = (await page.locator('[data-header-brand]').boundingBox())!;
    const after = (await home.boundingBox())!;
    expect(Math.abs(before.x - after.x)).toBeLessThan(1);
    expect(brand.x + brand.width).toBeLessThanOrEqual(after.x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
