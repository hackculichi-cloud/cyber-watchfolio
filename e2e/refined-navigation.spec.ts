import { test, expect } from '@playwright/test';
import { openElectricalArea } from './support/electricalArea';

test('profile icons preview without opening menus; only arrows open compact specialty lists', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  for (const label of ['Cybersecurity', 'Software Development', 'Residential & Industrial Electrical Maintenance', 'Electronics', 'Technical Repair', 'Call Center & Customer Service']) {
    const nav = page.getByRole('navigation', { name: 'Main', exact: true });
    await nav.getByRole('link', { name: label, exact: true }).hover();
    await expect(page.locator('.profile-menu-panel')).toHaveCount(0);
    const arrow = nav.getByRole('button', { name: `Open profile menu: ${label}`, exact: true });
    await arrow.hover();
    const menu = page.getByRole('dialog', { name: `Specialties: ${label}`, exact: true });
    await expect(menu).toBeVisible();
    await page.mouse.move(5, 600);
    await expect(menu).toHaveCount(0);
  }
});

test('the three electrical entries keep work local and use one shared certification collection', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/electrical#specialties');
  await expect(page.locator('[data-electrical-area-content]')).toHaveCount(0);
  await expect(page.locator('img[src^="/images/electrical/"]')).toHaveCount(0);
  await expect(page.locator('[data-certifications="electrical"]')).toHaveCount(0);
  await expect(page.locator('[data-specialty-art]')).toHaveCount(3);
  for (const area of ['residential', 'industrial', 'control'] as const) {
    await openElectricalArea(page, area, 'projects');
    await expect(page.locator('[data-area-tab], [role="tablist"]')).toHaveCount(0);
    const expectedWork = {
      residential: ['residential-outlet-november-2026', 'residential-outlet-october-2026', 'residential-outlet-switch-replacement', 'residential-two-luminaire-replacement', 'residential-training-board'],
      industrial: [],
      control: ['float-switch-course-practice'],
    }[area];
    const work = page.locator('#projects [data-work]');
    await expect(work).toHaveCount(expectedWork.length);
    expect(await work.evaluateAll(elements => elements.map(element => element.getAttribute('data-work')).sort())).toEqual([...expectedWork].sort());
    await page.locator('[data-open-electrical-training]').click();
    await expect(page.locator('[data-electrical-area-content]')).toHaveCount(1);
    await expect(page.locator('#projects')).toHaveCount(1);
    await expect(page.locator('[data-certificate]')).toHaveCount(6);
    await expect(page.locator('[data-electrical-area-content] [data-certificate]')).toHaveCount(0);
    await expect(work).toHaveCount(expectedWork.length);
    expect(await work.evaluateAll(elements => elements.map(element => element.getAttribute('data-work')).sort())).toEqual([...expectedWork].sort());
    await page.locator('[data-close-electrical-training]').click();
    await expect(page.locator('[data-certificate]')).toHaveCount(0);
    await expect(page.locator('[data-open-electrical-training]')).toBeFocused();
    if (area === 'residential') {
      await page.locator('[data-electrical-group="residential-outlets"]').click();
      const image = page.locator('[data-work="residential-outlet-october-2026"] img').first();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      await expect(image).toHaveAttribute('src', '/images/electrical/outlet-october-2026/16.jpeg');
    }
  }
});

test('a narrow phone filters the single work collection with visible unclipped controls', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/electrical#certificate');
  await expect(page.getByRole('combobox', { name: 'Jump to section', exact: true })).toHaveValue('certificate');
  await page.goto('/electrical#residential');
  await expect(page.locator('[data-area-tab], [role="tablist"]')).toHaveCount(0);
  await expect(page.locator('#projects [data-work]')).toHaveCount(5);
  for (const id of ['outlets', 'lighting', 'training-boards']) {
    const choice = page.locator(`[data-electrical-group="residential-${id}"]`);
    await choice.click();
    await expect(choice).toHaveAttribute('aria-pressed', 'true');
    const box = (await choice.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
    await expect(choice).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
