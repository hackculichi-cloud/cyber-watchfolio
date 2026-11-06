import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
import { test, expect } from '@playwright/test';

test('previewing the top menus does not move the hero or reset the intervening outfit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('main').evaluate(async element => { await Promise.all(element.getAnimations().map(animation => animation.finished)); });
  const hero = page.locator('main > section').first();
  const original = (await hero.boundingBox())!;
  const legend = page.locator('[data-mascot-legend]');
  const originalLegend = (await legend.boundingBox())!;
  for (const [href, outfit] of [['/electrical', 'electrical'], ['/software-development', 'development'], ['/repair', 'repair']]) {
    await page.locator(`header nav a[href="${href}"]`).hover();
    await expect(page.locator('[data-home-mascot]')).toHaveAttribute('data-preview-outfit', outfit);
    await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', outfit);
    const current = (await hero.boundingBox())!;
    const currentLegend = (await legend.boundingBox())!;
    expect(current.y).toBeCloseTo(original.y, 1);
    expect(current.height).toBeCloseTo(original.height, 1);
    expect(currentLegend.height).toBeCloseTo(originalLegend.height, 1);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page).toHaveURL(/\/$/);
  }
  await page.mouse.move(10, 250);
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'emblem');
});

test('the fox stays in front of decorative props and all seven controls remain reachable on a narrow phone', async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  await expect(page.locator('[data-header-brand]')).toContainText('Culichi.');
  await expect(page.locator('[data-header-brand]').locator('..')).toContainText('Christian Velasco');
  for (const outfit of ['cybersecurity', 'development', 'electrical', 'electronics', 'repair', 'customer-service', 'barbering']) {
    const control = stage.locator(`[data-outfit="${outfit}"]`);
    await control.focus();
    const layers = await stage.evaluate(element => {
      const fox = element.querySelector('.mascot-orbit-body')!;
      const tools = element.querySelector('[data-tool-field]')!;
      const bubble = element.querySelector('[data-outfit]')!;
      return { fox: Number(getComputedStyle(fox).zIndex), tools: Number(getComputedStyle(tools).zIndex), bubble: Number(getComputedStyle(bubble).zIndex), pointer: getComputedStyle(fox).pointerEvents };
    });
    expect(layers.fox).toBeGreaterThan(layers.tools);
    expect(layers.fox).toBeGreaterThan(layers.bubble);
    expect(layers.pointer).toBe('none');
    await control.tap({ trial: true });
    const labelInside = await control.evaluate(element => {
      const orb = element.getBoundingClientRect();
      const label = element.querySelector('.mascot-orbit-label')!.getBoundingClientRect();
      return label.x >= orb.x && label.right <= orb.right && label.y >= orb.y && label.bottom <= orb.bottom;
    });
    expect(labelInside).toBe(true);
  }
  await expect(page.locator('[data-footer-brand]')).toContainText('aka Culichi');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await stage.locator('[data-outfit="electrical"]').tap();
  await expect(page).toHaveURL(/\/electrical$/);
  await context.close();
});

test('electrical training links to its confirmed providers and enlarges clearly marked mockups', async ({ page }) => {
  await page.goto('/electrical#certificate');
  const records = page.locator('[data-certifications="electrical"]');
  await expect(page.locator('[data-training-providers]')).toHaveCount(0);
  await expect(records.locator('[data-provider-logo]')).toHaveCount(5);
  const platforms = [
    { id: 'udemy', count: 2, href: 'https://www.udemy.com/', symbol: 'udemy.svg' },
    { id: 'linkedin-learning', count: 2, href: 'https://www.linkedin.com/learning/', symbol: 'linkedin.svg' },
    { id: 'universidad-internacional', count: 1, href: 'https://www.facebook.com/uinternacionaloficial/?locale=es_LA' },
  ];
  const colors = new Set<string>();
  for (const platform of platforms) {
    const cards = records.locator(`[data-certificate-provider="${platform.id}"]`);
    await expect(cards).toHaveCount(platform.count);
    for (const card of await cards.all()) {
      const logo = card.locator('[data-provider-logo]');
      await expect(logo).toHaveAttribute('href', platform.href);
      await expect(logo).toHaveAccessibleName(/Udemy|LinkedIn Learning|Universidad Internacional/);
      await expect(logo).toHaveAttribute('rel', 'noopener noreferrer');
      const color = await logo.evaluate(element => getComputedStyle(element).color);
      colors.add(color);
      const rgb = color.match(/\d+/g)!.map(Number);
      if (platform.id === 'udemy') expect(rgb[2]).toBeGreaterThan(rgb[0]);
      if (platform.id === 'linkedin-learning') expect(rgb[2]).toBeGreaterThan(rgb[1]);
      if (platform.id === 'universidad-internacional') expect(rgb[0]).toBeGreaterThan(rgb[2]);
      if (platform.symbol) {
        const symbol = logo.locator('[data-provider-symbol]');
        await expect(symbol).toHaveCSS('background-color', color);
        await expect(symbol).toHaveCSS('mask-image', new RegExp(platform.symbol));
      }
    }
    if (platform.symbol) {
      const response = await page.request.get(`/images/providers/${platform.symbol}`);
      expect(response.ok()).toBe(true);
      expect(await response.text()).toContain('<svg');
    }
  }
  expect(colors.size).toBe(3);
  await expect(records.locator('[data-certificate-mockup]')).toHaveCount(1);
  const conocer = records.locator('[data-certificate="electrical-conocer"]');
  await expect(conocer).toContainText('Currently Studying');
  await conocer.getByRole('button', { name: /^Enlarge provisional certificate/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Universidad Internacional · RED CONOCER');
  await expect(dialog).toContainText('MOCKUP · Original pending');
  await expect(dialog.locator('a[download]')).toHaveCount(0);
  await expect(dialog.locator('[data-language-toggle]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await selectLanguage(page, "es");
  await conocer.getByRole('button', { name: /^Ampliar certificado provisional/ }).click();
  await expect(dialog).toContainText('MOCKUP · Original pendiente');
  await expect(dialog.locator('[data-language-toggle]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(conocer).toContainText('Estudiando actualmente');
  await page.goto('/electrical#residential');
  await expect(page.locator('[data-area-tab="projects"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-area-tab="overview"]')).toHaveCount(0);
});
