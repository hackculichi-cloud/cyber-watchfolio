import { test, expect } from '@playwright/test';
import { selectLanguage } from './support/selectLanguage';

const routes = ['/', '/cybersecurity', '/software-development', '/electrical', '/electronics', '/repair', '/experience'];

test('the browser tab stays Christian Velasco while profile headings retain their own names', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle('Christian Velasco');
  }
  await page.goto('/cybersecurity');
  await selectLanguage(page, 'es');
  await expect(page).toHaveTitle('Christian Velasco');
  await expect(page.getByRole('heading', { name: 'Ciberseguridad', exact: true, level: 1 })).toBeVisible();
  await selectLanguage(page, 'en');
  await expect(page.getByRole('heading', { name: 'Cybersecurity', exact: true, level: 1 })).toBeVisible();
  await expect(page).toHaveTitle('Christian Velasco');
});

test('network lettering matches the route, mask artwork and Home preview without moving navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/cybersecurity');
  await expect(page.locator('[data-network-title]')).toBeVisible();
  await expect(page.locator('header [data-network-wordmark]')).toBeVisible();
  await expect(page.locator('header [data-masked-mascot]')).toBeVisible();
  const svg = page.locator('[data-network-title] svg');
  const inkFits = await svg.evaluate((node: SVGSVGElement) => {
    const ink = node.querySelector('text')!.getBBox();
    return ink.x >= 0 && ink.x + ink.width <= node.viewBox.baseVal.width;
  });
  expect(inkFits).toBe(true);
  expect(await svg.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  await page.getByRole('button', { name: 'Enlarge workspace illustration: Networks & monitoring lab', exact: true }).click();
  const image = page.getByRole('dialog').getByRole('img', { name: 'Guy Fawkes-masked Culichi in a network monitoring laboratory', exact: true });
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 1536)).toBe(true);
  await page.keyboard.press('Escape');
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  const home = nav.getByRole('link', { name: 'Home', exact: true });
  const before = (await home.boundingBox())!;
  await nav.getByRole('link', { name: 'Cybersecurity', exact: true }).hover();
  await expect(page.locator('header [data-network-wordmark]')).toBeVisible();
  await expect(page.locator('.profile-menu-panel')).toHaveCount(0);
  expect(Math.abs((await home.boundingBox())!.x - before.x)).toBeLessThan(1);
});

for (const width of [320, 390, 1440]) test(`unpublished collections are compact and honest at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('/cybersecurity');
  if (width < 768) await page.getByRole('button', { name: 'Show the entire profile', exact: true }).click();
  for (const id of ['labs', 'projects', 'gallery']) {
    const section = page.locator(`#${id}[data-empty-collection]`);
    await expect(section).toBeVisible();
    expect((await section.boundingBox())!.height).toBeLessThan(230);
    await expect(section.locator('img, [role="img"], article, button')).toHaveCount(0);
  }
  await expect(page.locator('#investigations button')).toHaveCount(3);
  await expect(page.locator('#playbooks button')).toHaveCount(3);
  await page.goto('/repair#laptops');
  for (const id of ['laptops', 'consoles']) {
    if (width < 768) await page.getByRole('combobox', { name: 'Jump to section' }).selectOption(id);
    const section = page.locator(`#${id}[data-empty-collection]`);
    await expect(section).toBeVisible();
    expect((await section.boundingBox())!.height).toBeLessThan(230);
  }
  await page.goto('/experience#certifications');
  const certificates = page.locator('[data-certifications="customer-service"][data-empty-collection]');
  await expect(certificates).toBeVisible();
  expect((await certificates.boundingBox())!.height).toBeLessThan(230);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('Spanish copy is clean across profiles and SOC reports preserve exact evidence', async ({ page }) => {
  await page.goto('/');
  await selectLanguage(page, 'es');
  for (const route of routes.slice(1)) {
    await page.goto(route);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/&(?:quot|amp|lt|gt|#\d+);|PCB trabajo|multimetro|logotipos fallidos|posteriores al pago|medio ambiente|Estadísticas.*prácticas/);
  }
  await page.goto('/cybersecurity');
  await expect(page.locator('[data-world-hero]')).toContainText('SIEM y análisis de registros');
  for (const section of ['investigations', 'playbooks']) {
    const trigger = page.locator(`#${section} button`).first();
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: /Pasos de investigación|Procedimiento de investigación/ })).toBeVisible();
    expect(await dialog.innerText()).not.toMatch(/&[a-z]+;|pasos_de|procedimiento_de|logotipos|austeridad|timetamp/);
    if (section === 'investigations') await expect(dialog).toContainText('203.0.113.44');
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
  }
});
