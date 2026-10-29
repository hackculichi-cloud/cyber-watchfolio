import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
import { test, expect } from "@playwright/test";

test("skills introduce Christian's actions and their evidence in both languages", async ({ page }) => {
  await page.goto('/#areas');
  const areas = page.locator('#areas');
  await expect(areas.getByRole('heading', { name: 'These are my skills', exact: true })).toBeInViewport();
  const cards = areas.locator('[data-personal-skills-card]');
  await expect(cards).toHaveCount(7);
  for (const card of await cards.all()) {
    await expect(card.locator('li')).toHaveCount(3);
    await expect(card.getByText('See my work', { exact: true })).toBeVisible();
  }
  await expect(cards.filter({ hasText: 'I investigate alerts in training labs' })).toContainText('3 documented training investigations');
  await expect(areas.locator('[data-personal-skills-card="electronics"]')).toContainText('Basic Electronics at ETO · In progress');
  await expect(areas.locator('[data-personal-skills-card="customer-service"]')).toContainText('7 years of professional experience');
  await selectLanguage(page, "es");
  await expect(areas.getByRole('heading', { name: 'Estas son mis habilidades', exact: true })).toBeVisible();
  await expect(areas.locator('[data-personal-skills-card="development"]')).toContainText('React, Next.js y TypeScript');
  const repair = areas.locator('[data-personal-skills-card="repair"]');
  await expect(repair).toContainText('Reparo y pruebo celulares');
  await expect(repair).toContainText('3 reparaciones de iPhone realizadas');
  await repair.click();
  await expect(page).toHaveURL(/\/repair$/);
  await expect(page.locator('main h1')).toBeVisible();
});

test("outfit focus reveals matching tools, transforms both figures and restores without navigating", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  const morph = stage.locator('[data-morph-to]');
  await stage.locator('[data-outfit="electrical"]').focus();
  await expect(stage.locator('[data-tool-field="electrical"] [data-tool-prop]')).toHaveCount(3);
  const gear = page.locator('[data-gear-preview="electrical"]').first();
  await expect(gear).toContainText('Digital multimeter');
  await expect(gear).toContainText('Insulated pliers');
  await expect(morph.locator('.mascot-current')).toHaveCSS('animation-name', 'mascot-quick-appear');
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'electrical');
  await stage.locator('[data-outfit="repair"]').focus();
  await expect(stage.locator('[data-tool-field="electrical"]')).toHaveCount(0);
  await expect(page.locator('[data-gear-preview="repair"]')).toContainText('Precision screwdriver');
  await expect(morph).toHaveAttribute('data-morph-to', 'repair');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-gear-preview]')).toHaveCount(0);
  await expect(morph).toHaveAttribute('data-morph-to', 'home');
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'emblem');
  await expect(page).toHaveURL(/\/$/);
});

test("desktop profile menus have seven distinct neon accents and concise links", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  const icons = nav.locator('.area-nav-icon:visible');
  await expect(icons).toHaveCount(7);
  const colors = await icons.evaluateAll(elements => elements.map(element => getComputedStyle(element).color));
  expect(new Set(colors).size).toBe(7);
  await nav.getByRole('link', { name: 'Cybersecurity', exact: true }).hover();
  await nav.getByRole('button', { name: 'Open profile menu: Electronics', exact: true }).hover();
  const menu = page.getByLabel('Specialties: Electronics', { exact: true });
  await expect(menu.locator('img, [data-gear-preview]')).toHaveCount(0);
  await expect(menu.getByRole('link')).toHaveCount(7);
  const bounds = (await menu.boundingBox())!;
  expect(bounds.width).toBeLessThanOrEqual(288);
  expect(bounds.height).toBeLessThanOrEqual(400);
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'electronics');
  // A previous menu's delayed close must not reset the currently hovered outfit.
  await page.waitForTimeout(300);
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'electronics');
  const portrait = page.locator('[data-header-mascot] .mascot-current svg');
  await expect(portrait).toHaveAttribute('viewBox', '452 420 350 350');
  await page.mouse.move(0, 120);
  await expect(menu).not.toBeVisible();
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'emblem');
  for (const [path, outfit] of [['/development', 'development'], ['/electrical-electronics', 'electrical'], ['/labs', 'cybersecurity']]) {
    await page.goto(path);
    await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', outfit);
  }
});

test("reduced motion and phone menu keep previews usable without animated scans or a stuck outfit", async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  await stage.locator('[data-outfit="repair"]').focus();
  await expect(stage.locator('.mascot-current')).toHaveCSS('animation-name', 'none');
  await expect(stage.locator('.mascot-morph-sweep, .mascot-morph-target')).toHaveCount(0);
  await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
  await page.locator('#mobile-navigation').getByRole('button', { name: 'Open profile menu: Electronics', exact: true }).tap();
  await expect(page.locator('#mobile-navigation [data-gear-preview]')).toHaveCount(0);
  await expect(page.locator('#mobile-specialties-electronics a')).toHaveCount(7);
  await expect(page.locator('#mobile-specialties-electronics')).toContainText('Audio & radio');
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'electronics');
  await page.getByRole('button', { name: 'Close menu', exact: true }).tap();
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'emblem');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('navigation', { name: 'Quick navigation', exact: true }).getByRole('link', { name: 'Areas', exact: true }).tap();
  await expect(page.locator('#areas h2')).toBeInViewport();
  await page.getByRole('button', { name: 'Show skill details', exact: true }).tap();
  await expect(page.locator('[data-personal-skills-card="cybersecurity"] li').first()).toBeInViewport();
  await context.close();
});
