import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
import { test, expect } from '@playwright/test';

const areas = [
  ['cybersecurity', '/cybersecurity', 'Networks & monitoring lab'],
  ['development', '/software-development', 'Development studio'],
  ['electrical', '/electrical', 'Electrical workshop'],
  ['electronics', '/electronics', 'Electronics laboratory'],
  ['repair', '/repair', 'Repair workbench'],
  ['customer-service', '/experience', 'Customer support workspace'],
];

test('each profile has its own static workplace, footer outfit and brand color', async ({ page }) => {
  const colors = new Set<string>();
  for (const [outfit, path, title] of areas) {
    await page.goto(path);
    const workspace = page.locator(`[data-profile-workspace="${outfit}"]`);
    await expect(workspace).toContainText(title);
    await expect(workspace.getByRole('img')).toBeVisible();
    const artwork = workspace.locator('img[data-workspace-art]');
    await expect(artwork).toHaveAttribute('srcset', /768w, .*1536w/);
    // Width-descriptor srcsets report density-corrected naturalWidth (for example 640 for a 768 px file).
    await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(workspace.locator('[data-body-mascot]')).toHaveAttribute('data-body-mascot', outfit);
    await expect(workspace.locator('figcaption [data-body-mascot]')).toHaveCount(0);
    expect(await artwork.evaluate(el => el.matches('[data-body-mascot]'))).toBe(true);
    const world = page.locator('[data-world]');
    await expect(world).toHaveAttribute('data-world', outfit);
    const roomLayer = await page.locator('main').evaluate(el => getComputedStyle(el).backgroundImage);
    expect(roomLayer).toContain(outfit === 'customer-service' ? 'data:image/svg+xml' : 'hero-');
    await page.locator('#cv').scrollIntoViewIfNeeded();
    expect(await page.locator('main').evaluate(el => getComputedStyle(el).backgroundImage)).toBe(roomLayer);
    expect(await page.locator('footer').evaluate(el => getComputedStyle(el).backgroundImage)).toContain(outfit === 'customer-service' ? 'data:image/svg+xml' : 'hero-');

    expect(await workspace.evaluate(element => element.getAnimations({ subtree:true }).length)).toBe(0);
    await expect(page.locator('[data-interactive-mascot], [data-outfit], [data-tool-field]')).toHaveCount(0);
    await expect(page.locator('[data-footer-mascot]')).toHaveAttribute('data-footer-mascot', outfit);
    await expect(page.locator('[data-footer-mascot] [data-mascot]')).toHaveAttribute('data-mascot', outfit);
    const dot = page.locator('[data-brand-dot]');
    colors.add(await dot.evaluate(element => getComputedStyle(element).color));
    await page.locator('header nav a[href="/electrical"]').hover();
    await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', outfit);
    await expect(dot).toHaveAttribute('data-profile', outfit);
  }
  expect(colors.size).toBe(6);
  await page.goto('/electrical#evidence');
  await expect(page.getByRole('navigation', { name:'Profile sections' }).getByRole('link', {name:'Completed work', exact:true})).toHaveAttribute('href', '#evidence');
  await expect(page.locator('#evidence')).toContainText('Work & practical experience');
});

test('complete workspace illustrations enlarge without leaving the profile', async ({ page }) => {
  await page.goto('/electrical');
  await page.locator('[data-profile-workspace]').getByRole('button', {name:'Enlarge workspace illustration: Electrical workshop',exact:true}).click();
  const dialog = page.getByRole('dialog', {name:/^(Electrical workshop|Taller de electricidad)$/});
  const image = dialog.locator('img:not([data-language-flag])');
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth === 1536)).toBe(true);
  await expect(dialog).toContainText('Illustrated workspace · Culichi');
  await selectLanguage(dialog, "es");
  await expect(dialog).toContainText('Espacio de trabajo ilustrado · Culichi');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/\/electrical$/);
});

test('the home fox sits beside the introduction on desktop and follows it on phones', async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, reducedMotion:'reduce' });
  const page = await context.newPage();
  for (const width of [1440, 320, 390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto('/');
    const copy = (await page.locator('[data-home-intro-copy]').boundingBox())!;
    const character = (await page.locator('[data-home-mascot]').boundingBox())!;
    await expect(page.locator('[data-culichi-origins]')).toHaveCount(0);
    if (width >= 1024) {
      expect(character.x).toBeGreaterThanOrEqual(copy.x + copy.width);
      expect(character.y).toBeCloseTo(copy.y, 0);
    } else {
      expect(character.y).toBeGreaterThanOrEqual(copy.y + copy.height);
    }
    await expect(page.locator('[data-outfit]')).toHaveCount(6);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.goto('/electrical');
    await expect(page.locator('[data-profile-workspace="electrical"]')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await context.close();
});
