import { expect, test, type Page } from '@playwright/test';

const seenKey = 'culichi-welcome-seen';

/** Model a new visitor once; later reloads must keep the real dismissal flag. */
async function newVisitor(page: Page, language: 'en' | 'es' = 'en') {
  await page.addInitScript(({ key, lang }) => {
    if (!sessionStorage.getItem('welcome-test-initialized')) {
      localStorage.removeItem(key);
      localStorage.setItem('portfolio-lang', lang);
      sessionStorage.setItem('welcome-test-initialized', '1');
    }
  }, { key: seenKey, lang: language });
}

for (const width of [320, 390, 1440]) {
  test(`a first visitor sees the electrical measurement, then a greeting, before entering at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await newVisitor(page, 'es');
    await page.goto('/');
    const intro = page.locator('[data-fox-welcome]');
    await expect(intro).toBeVisible();
    await expect(intro).toHaveAttribute('data-ready', 'true', { timeout: 10000 });
    await expect(intro).toHaveAttribute('data-stage', 'measuring');
    expect(await intro.locator('.welcome-fox-sprite').evaluate(el => el.getAnimations().some(animation => animation.playState === 'running'))).toBe(true);
    await expect(intro).toHaveAccessibleName(/.+/);
    const skip = intro.getByRole('button', { name: 'Saltar bienvenida', exact: true });
    const enter = intro.getByRole('button', { name: 'Entrar al portafolio', exact: true });
    await expect(skip).toBeInViewport();
    await expect(enter).toBeInViewport();
    for (const button of [skip, enter]) {
      const bounds = (await button.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      expect(bounds.height).toBeGreaterThanOrEqual(44);
    }
    expect(await intro.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await expect(intro).toHaveAttribute('data-stage', 'welcome', { timeout: 4000 });
    await expect(intro).toContainText(/bienvenid/i);
    await expect(intro).toHaveCount(0, { timeout: 3500 });
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.evaluate(key => localStorage.getItem(key), seenKey)).toBe('1');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('skip is persistent, and an intentional replay returns keyboard focus to its trigger', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await newVisitor(page);
  await page.goto('/');
  const intro = page.locator('[data-fox-welcome]');
  await intro.getByRole('button', { name: 'Skip welcome', exact: true }).click();
  await expect(intro).toHaveCount(0);
  expect(await page.evaluate(key => localStorage.getItem(key), seenKey)).toBe('1');
  await page.reload();
  await expect(intro).toHaveCount(0);
  const replay = page.getByRole('button', { name: 'Replay welcome', exact: true });
  await replay.click();
  await expect(intro).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(intro).toHaveCount(0);
  await expect(replay).toBeFocused();
  await page.locator('header a[href="/electrical"]').first().click();
  await expect(page).toHaveURL(/\/electrical$/);
  await page.locator('header a[href="/"]').first().click();
  await expect(page).toHaveURL(/\/$/);
  await expect(intro).toHaveCount(0);
});

test('reduced motion presents a static greeting and waits for the visitor to enter', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 700 });
  await newVisitor(page, 'es');
  await page.goto('/');
  const intro = page.locator('[data-fox-welcome]');
  await expect(intro).toHaveAttribute('data-ready', 'true', { timeout: 10000 });
  await expect(intro).toHaveAttribute('data-stage', 'welcome');
  expect(await intro.locator('.welcome-scene').evaluate(el => el.getAnimations({ subtree: true }).some(animation => animation.playState === 'running'))).toBe(false);
  await expect(intro).toContainText(/bienvenid/i);
  // A static greeting must not disappear on the ordinary autoplay deadline.
  await page.waitForTimeout(5100);
  await expect(intro).toBeVisible();
  const enter = intro.getByRole('button', { name: 'Entrar al portafolio', exact: true });
  await expect(enter).toBeInViewport();
  await enter.click();
  await expect(intro).toHaveCount(0);
  await expect(page.locator('main h1')).toBeInViewport();
});

test('deep-linked sections and professional pages never interrupt visitors with the intro', async ({ page }) => {
  await newVisitor(page);
  for (const path of ['/#areas', '/electrical', '/repair', '/contact']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('[data-fox-welcome]')).toHaveCount(0);
  }
});

test('leaving Home while the intro is active cleans up its overlay and timers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await newVisitor(page);
  await page.goto('/');
  await expect(page.locator('[data-fox-welcome]')).toBeVisible();
  // Exercise SPA unmount while active; an overlay intentionally blocks pointer
  // navigation, so invoke the existing router link without a pointer event.
  await page.locator('header a[href="/electrical"]').first().evaluate((link: HTMLAnchorElement) => link.click());
  await expect(page).toHaveURL(/\/electrical$/);
  await expect(page.locator('[data-fox-welcome]')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('pointer-events', 'none');
  await page.waitForTimeout(5100);
  await expect(page).toHaveURL(/\/electrical$/);
  await expect(page.locator('[data-fox-welcome]')).toHaveCount(0);
  await expect(page.locator('[data-profile-workspace="electrical"]')).toBeVisible();
});


test('a visitor can intentionally replay the welcome from a Home section link', async ({ page }) => {
  await newVisitor(page);
  await page.goto('/#areas');
  const intro = page.locator('[data-fox-welcome]');
  await expect(intro).toHaveCount(0);
  const replay = page.getByRole('button', { name: 'Replay welcome', exact: true });
  await replay.click();
  await expect(intro).toBeVisible();
  await expect(page).toHaveURL(/#areas$/);
  await intro.getByRole('button', { name: 'Skip welcome', exact: true }).click();
  await expect(intro).toHaveCount(0);
  await expect(replay).toBeFocused();
});
