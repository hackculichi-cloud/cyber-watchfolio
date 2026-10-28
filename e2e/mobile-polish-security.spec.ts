import { englishStorageState } from "./support/language";
import { test, expect } from "@playwright/test";

test("production CSP allows the app and blocks injected inline scripts", async ({ page, request }) => {
  const response = await request.get('/');
  const csp = response.headers()['content-security-policy'];
  expect(csp).toContain("script-src 'self'");
  expect(csp).not.toContain("'unsafe-eval'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(response.headers()['x-frame-options']).toBe('DENY');
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  const appErrors: string[] = [];
  page.on('pageerror', error => appErrors.push(error.message));
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  await expect(page.locator('[data-outfit]')).toHaveCount(7);
  await page.evaluate(() => {
    const probe = window as typeof window & { inlineProbe?: boolean; policyViolations?: string[] };
    probe.policyViolations = [];
    document.addEventListener('securitypolicyviolation', event => probe.policyViolations!.push(event.effectiveDirective));
    const script = document.createElement('script');
    script.textContent = 'window.inlineProbe = true';
    document.body.appendChild(script);
  });
  await expect.poll(() => page.evaluate(() => (window as typeof window & { policyViolations?: string[] }).policyViolations?.some(d => d.startsWith('script-src')))).toBe(true);
  expect(await page.evaluate(() => (window as typeof window & { inlineProbe?: boolean }).inlineProbe)).toBeUndefined();
  await page.goto('/repair#cv');
  await page.locator('#cv').getByRole('button', { name: /^Preview CV:/ }).click();
  await expect.poll(() => page.getByRole('dialog').locator('img:not([data-language-flag])').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(appErrors).toEqual([]);
});

test("phone shortcuts and native section jump work without covering the last footer link", async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  const quick = page.getByRole('navigation', { name: 'Quick navigation', exact: true });
  await quick.getByRole('link', { name: 'Areas', exact: true }).tap();
  await expect(page).toHaveURL(/\/#areas$/);
  await expect(page.locator('#areas')).toBeInViewport();
  await quick.getByRole('link', { name: 'CV', exact: true }).tap();
  await expect(page).toHaveURL(/\/cv$/);
  await expect(page.locator('[data-cv-theme]')).toHaveCount(7);
  await quick.getByRole('link', { name: 'Contact', exact: true }).tap();
  await expect(quick.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('aria-current', 'page');
  const menu = page.getByRole('button', { name: 'Open menu', exact: true });
  await menu.tap();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await page.goto('/electrical');
  await page.getByRole('combobox', { name: 'Jump to section', exact: true }).selectOption('projects');
  await expect(page).toHaveURL(/\/electrical#projects$/);
  await expect.poll(async () => (await page.locator('#projects').boundingBox())!.y >= 140).toBe(true);
  await expect(page.locator('[data-electrical-practices]')).toBeInViewport();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const lastLink = (await page.locator('footer').getByRole('link', { name: 'Back to top', exact: true }).boundingBox())!;
  const bar = (await quick.boundingBox())!;
  expect(lastLink.y + lastLink.height).toBeLessThanOrEqual(bar.y);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test("orbit moves with upright labels, pauses manually and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  await stage.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const orbit = stage.locator('[data-outfit-selector]');
  await expect(orbit).toHaveCSS('animation-name', 'outfit-orbit');
  await expect(stage.locator('[data-orbit-node]').first()).toHaveCSS('animation-name', 'outfit-counter-orbit');
  const initial = await orbit.evaluate(el => getComputedStyle(el).transform);
  await expect.poll(() => orbit.evaluate(el => getComputedStyle(el).transform)).not.toBe(initial);
  await stage.getByRole('button', { name: 'Pause orbital motion', exact: true }).click();
  await page.mouse.move(0, 0);
  await expect(orbit).toHaveCSS('animation-play-state', 'paused');
  const paused = await orbit.evaluate(el => getComputedStyle(el).transform);
  await page.waitForTimeout(250);
  expect(await orbit.evaluate(el => getComputedStyle(el).transform)).toBe(paused);
  await stage.getByRole('button', { name: 'Resume orbital motion', exact: true }).click();
  await page.mouse.move(0, 0);
  await expect(orbit).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(orbit).toHaveCSS('animation-name', 'none');
  await expect(stage.locator('[data-orbit-toggle]')).toHaveCount(0);
  await expect(stage.locator('[data-outfit]')).toHaveCount(7);
});

test("fixed phone targets stay inside the screen and accept a direct touch", async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  await stage.scrollIntoViewIfNeeded();
  // Phone choices are fixed around the fox, so touch targets do not drift.
  await expect(stage.locator('[data-outfit-selector]')).toHaveCSS('animation-name', 'none');
  for (const node of await stage.locator('[data-orbit-node]').all()) {
    const bounds = (await node.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
    expect(bounds.width).toBe(82);
    expect(bounds.height).toBeGreaterThanOrEqual(44);
  }
  const target = stage.locator('[data-outfit="electrical"] [data-orbit-node] > span:first-child');
  const point = await target.evaluate(element => { const box = element.getBoundingClientRect(); return { x: box.left + box.width / 2, y: box.top + box.height / 2 }; });
  await page.touchscreen.tap(point.x, point.y);
  await expect(page).toHaveURL(/\/electrical$/);
  await expect(page.locator('[data-profile-workspace="electrical"]')).toBeVisible();
  await context.close();
});
