import { test, expect } from '@playwright/test';

const areas = [
  ['cybersecurity', '/cybersecurity'], ['development', '/software-development'],
  ['electrical', '/electrical'], ['electronics', '/electronics'],
  ['repair', '/repair'], ['customer-service', '/experience'], ['barbering', '/barbering'],
] as const;

test('phone visitors see the fox, background and all seven usable area controls without scrolling or hovering', async ({ browser }) => {
  for (const [width, height] of [[320, 640], [390, 844], [430, 932]]) {
    const context = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    const stage = page.locator('[data-home-mascot]');
    await expect(stage).toHaveAttribute('data-selector-open', 'true');
    await expect(stage.locator('[data-outfit]')).toHaveCount(7);
    await expect(page.locator('[data-home-background]')).toBeVisible();
    await expect(page.locator('[data-home-mobile-art]')).toHaveCount(0);
    const header = (await page.locator('header').boundingBox())!;
    const quick = (await page.locator('[data-mobile-quicknav]').boundingBox())!;
    for (const [slug] of areas) {
      const link = stage.locator(`[data-outfit="${slug}"]`);
      const box = (await link.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(box.y).toBeGreaterThanOrEqual(header.y + header.height);
      expect(box.y + box.height).toBeLessThanOrEqual(quick.y);
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(await link.evaluate(el => {
        const b = el.getBoundingClientRect();
        return document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2)?.closest('[data-outfit]') === el;
      })).toBe(true);
    }
    await page.locator('main h1').tap();
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(stage).toHaveAttribute('data-selector-open', 'true');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  }
});

test('a compact two-column skill overview can reveal every skill and return to the short layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const grid = page.locator('#home-skills-grid');
  const cards = grid.locator('[data-personal-skills-card]');
  await expect(cards).toHaveCount(7);
  const a = (await cards.nth(0).boundingBox())!, b = (await cards.nth(1).boundingBox())!;
  expect(a.y).toBeCloseTo(b.y, 0);
  expect(b.x).toBeGreaterThan(a.x + a.width);
  expect((await grid.boundingBox())!.height).toBeLessThan(1400);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(4500);
  await expect(cards.first().locator('li').first()).toBeHidden();
  const expand = page.getByRole('button', { name: 'Show skill details', exact: true });
  await expand.click();
  await expect(grid).toHaveAttribute('data-mobile-skill-details', 'true');
  await expect(cards.first().locator('li')).toHaveCount(3);
  await expect(cards.first().locator('li').first()).toBeVisible();
  await page.getByRole('button', { name: 'Compact view', exact: true }).click();
  await expect(grid).toHaveAttribute('data-mobile-skill-details', 'false');
  await expect(cards.first().locator('li').first()).toBeHidden();
});

test('mobile profiles show a chosen content block, retain deep links and can reveal the full page', async ({ page }) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [slug, path] of areas.filter(([slug]) => slug !== 'electrical')) {
    await page.goto(path);
    const title = page.locator('main h1');
    const workspace = page.locator(`[data-profile-workspace="${slug}"]`);
    await expect(workspace).toBeVisible();
    const figure = (await workspace.boundingBox())!, heading = (await title.boundingBox())!;
    expect(figure.x).toBeGreaterThan(heading.x);
    const before = await page.evaluate(() => document.documentElement.scrollHeight);
    const firstSection = slug === 'barbering' ? '#training' : '#specialties';
    const destination = slug === 'barbering' ? 'tools' : 'cv';
    await expect(page.locator('[data-mobile-profile-section]:visible')).toHaveCount(1);
    const jump = page.getByRole('combobox', { name: 'Jump to section', exact: true });
    await jump.selectOption(destination);
    await expect(page.locator(`#${destination}`)).toBeVisible();
    await expect(page.locator(firstSection)).toBeHidden();
    await page.reload();
    await expect(page.locator(`#${destination}`)).toBeVisible();
    await expect(jump).toHaveValue(destination);
    await page.getByRole('button', { name: 'Show the entire profile', exact: true }).click();
    await expect(page.locator(firstSection)).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight)).toBeGreaterThan(before);
    await page.getByRole('button', { name: 'Show one profile section at a time', exact: true }).click();
    await expect(page.locator('[data-mobile-profile-section]:visible')).toHaveCount(1);
    await expect(page.locator(`#${destination}`)).toBeVisible();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.locator(firstSection)).toBeVisible();
    await expect(page.locator(`#${destination}`)).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
  }
});

test('every phone area control navigates with a direct touch and no preliminary greeting', async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  for (const [slug, path] of areas) {
    await page.goto('/');
    const link = page.locator(`[data-home-mascot] [data-outfit="${slug}"]`);
    const box = (await link.boundingBox())!;
    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator(`[data-profile-workspace="${slug}"]`)).toBeVisible();
  }
  await context.close();
});
