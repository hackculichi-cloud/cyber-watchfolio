import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
import { test, expect } from "@playwright/test";

test("illustrated tools approach the fox and equip before navigating", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  await stage.locator('[data-outfit="electrical"]').focus();
  const tool = stage.locator('[data-tool-flight="multimeter"]');
  await expect(stage.locator('[data-tool-prop="multimeter"]')).toBeVisible();
  const initial = await tool.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => tool.evaluate(element => getComputedStyle(element).transform)).not.toBe(initial);
  await expect(tool).toHaveCSS('opacity', '1');
  await expect(tool.locator('[data-tool-prop]')).toHaveCSS('background-image', /culichi-tool-props.*\.png/);
  await stage.locator('[data-outfit="electrical"]').click();
  await expect(stage.locator('[data-tool-field]')).toHaveAttribute('data-equipping', 'true');
  // The shorter transition navigates after 720 ms; observe the fade before unmount.
  await expect.poll(() => tool.evaluate(element => Number(getComputedStyle(element).opacity)), { intervals:[50, 50, 50] }).toBeLessThan(.01);
  await expect(page).toHaveURL(/\/electrical$/);
  await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'electrical');
});

test("all six profiles have distinct illustrated props and reduced motion stops their floating", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const stage = page.locator('[data-home-mascot]');
  for (const [area, prop] of [['cybersecurity', 'router'], ['development', 'laptop'], ['electrical', 'multimeter'], ['electronics', 'oscilloscope'], ['repair', 'phone'], ['customer-service', 'headset']]) {
    await stage.locator(`[data-outfit="${area}"]`).focus();
    await expect(stage.locator(`[data-tool-field="${area}"] [data-tool-prop="${prop}"]`)).toBeVisible();
    await expect(stage.locator('.mascot-tool-float').first()).toHaveCSS('animation-name', 'none');
  }
  await page.keyboard.press('Escape');
  await expect(stage.locator('[data-tool-field]')).toHaveCount(0);
});

test("GitHub projects expand on demand and AWS remains exam preparation in both profiles", async ({ page }) => {
  await page.goto('/software-development#projects');
  const projects = page.locator('[data-software-projects]');
  await expect(projects.locator('article')).toHaveCount(4);
  await expect(projects.getByRole('link', { name: /Repository/ }).filter({ has: page.locator('svg') }).first()).toHaveAttribute('href', 'https://github.com/ByCulichi/Mirror');
  await projects.getByRole('button', { name: 'Explore all 9 projects', exact: true }).click();
  await expect(projects.locator('article')).toHaveCount(9);
  await expect(projects.locator('[data-software-project="culichi-metrics"]')).toContainText('Python');
  await expect(projects.locator('[data-software-project="calculator"]')).toContainText('TypeScript');
  for (const path of ['/software-development', '/cybersecurity']) {
    await page.goto(path + '#certifications');
    const aws = page.locator('[data-certificate="aws-preparation"]');
    await expect(aws).toContainText('In preparation');
    await expect(aws).toContainText('Exam not passed');
    await selectLanguage(page, "es");
    await expect(aws).toContainText('En preparación');
    await expect(aws).toContainText('Examen aún no aprobado');
    await selectLanguage(page, "en");
  }
  await expect(page.locator('[data-complementary-code] a')).toHaveAttribute('href', 'https://github.com/ByCulichi/Culichi-Metrics');
});

test("phone layouts emphasize area titles with logos and show seven years of service", async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 320, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/#areas');
  const title = page.locator('[data-personal-skills-card="electrical"] h3');
  await expect(title).toHaveText('Electricity');
  await expect(title.locator('..').locator('..').locator('svg')).toHaveCount(1);
  await expect(title).toHaveCSS('font-size', '14px');
  await page.goto('/software-development#projects');
  await page.getByRole('button', { name: 'Explore all 9 projects', exact: true }).tap();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/experience#background');
  await expect(page.locator('#background').getByText('7', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
  await selectLanguage(page, "es");
  await page.getByRole('button', { name: 'Cerrar menú', exact: true }).tap();
  await expect(page.locator('#background')).toContainText('Siete años');
  await context.close();
});
