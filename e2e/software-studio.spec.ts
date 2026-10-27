import { test, expect } from '@playwright/test';
import { selectLanguage } from './support/selectLanguage';

const brand = '[data-header-brand]';
test('software lettering follows the route and Home previews without moving navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/software-development');
  await expect(page.getByRole('heading', { name: 'Full Stack Developer', exact: true })).toBeVisible();
  await expect(page.locator(`${brand} [data-code-wordmark]`)).toBeVisible();
  await page.getByRole('navigation', { name: 'Main', exact: true }).getByRole('link', { name: 'Cybersecurity', exact: true }).focus();
  await expect(page.locator(brand)).toHaveAttribute('data-brand-profile', 'development');
  await page.goto('/electrical');
  await expect(page.locator(brand)).toHaveAttribute('data-brand-profile', 'electrical');
  await expect(page.locator(`${brand} [data-copper-wordmark]`)).toBeVisible();
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main', exact: true });
  const home = nav.getByRole('link', { name: 'Home', exact: true });
  const before = await home.boundingBox();
  await nav.getByRole('link', { name: 'Software Development', exact: true }).focus();
  await expect(page.locator(`${brand} [data-code-wordmark]`)).toBeVisible();
  const after = await home.boundingBox();
  expect(Math.abs(after!.x - before!.x)).toBeLessThan(1);
  await nav.getByRole("link", { name: "Residential & Industrial Electrical Maintenance", exact: true }).hover();
  await expect(page.locator(`${brand} [data-copper-wordmark]`)).toBeVisible();
  await expect(page.locator(".profile-menu-panel")).toHaveCount(0);
});

test('code title has finite, pausable motion and remains readable in Spanish', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/software-development');
  const consoleTitle = page.locator('[data-code-title]');
  await expect(consoleTitle).toHaveAttribute('data-in-view', 'true');
  expect(await consoleTitle.locator('.code-title-cursor').evaluate(el => getComputedStyle(el).animationIterationCount)).toBe('6');
  await page.getByRole('button', { name: 'Pause code animation', exact: true }).click();
  await expect(consoleTitle).toHaveAttribute('data-motion-paused', 'true');
  await expect(consoleTitle.locator('.code-title-cursor')).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Resume code animation', exact: true }).click();
  await selectLanguage(page, 'es');
  await expect(page.getByRole('heading', { name: 'Full Stack Developer', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pausar animación de código' })).toBeVisible();
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(consoleTitle).toHaveAttribute('data-in-view', 'false');
  await expect(consoleTitle.locator('.code-title-cursor')).toHaveCSS('animation-play-state', 'paused');
});

test('featured projects open actual local desktop and mobile captures with source links', async ({ page }) => {
  await page.goto('/software-development#projects');
  const projects = page.locator('[data-software-projects]');
  await expect(projects.locator('article')).toHaveCount(2);
  await expect(projects.locator('article').first()).toHaveAttribute('data-software-project', 'ronnys-food-truck');
  const trigger = projects.locator('[data-software-project="ronnys-food-truck"] button').first();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('What I built');
  await expect(dialog.getByRole('link', { name: 'Repository', exact: true })).toHaveAttribute('href', 'https://github.com/ByCulichi/RonnysFoodTruck');
  await dialog.getByRole('button', { name: 'Ronny’s Food Truck · mobile', exact: true }).click();
  const capture = dialog.locator('figure img');
  await expect(capture).toHaveAttribute('src', '/images/software/screenshots/ronnys-home-mobile.webp');
  await expect.poll(() => capture.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 780)).toBe(true);
  await expect(dialog.locator('iframe')).toHaveCount(0);
  await selectLanguage(dialog, 'es');
  await expect(dialog).toContainText('Qué desarrollé');
  await expect(dialog).toContainText('Interfaz real capturada');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await projects.getByRole('button', { name: 'Explorar los 10 proyectos', exact: true }).click();
  await expect(projects.locator('article')).toHaveCount(10);
  await expect(projects.locator('[data-software-project="journey"]')).toContainText('HTML semántico');
});

for (const width of [320, 390]) test(`software fits ${width}px and reduced motion disables title playback`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/software-development');
  await expect(page.locator('[data-code-title]')).toBeVisible();
  await expect(page.locator('[data-code-motion]')).toBeHidden();
  await expect(page.locator('.code-title-cursor')).toHaveCSS('animation-name', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Explore my projects', exact: true }).click();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#gallery')).toBeHidden();
  await page.locator('[data-software-project="portfolio"]').getByRole('button', { name: 'Explore project', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Culichi · mobile', exact: true }).click();
  await expect.poll(() => page.getByRole('dialog').locator('figure img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
});

test('gallery filters the primary interfaces and keeps phone images inside the lightbox', async ({ page }) => {
  await page.goto('/software-development#gallery');
  const gallery = page.locator('#gallery');
  await expect(gallery.locator('li')).toHaveCount(9);
  await gallery.getByRole('button', { name: 'Mobile', exact: true }).click();
  await expect(gallery.locator('li')).toHaveCount(3);
  const trigger = gallery.locator('li button').first();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('figure img')).toHaveAttribute('src', '/images/software/screenshots/ronnys-home-mobile.webp');
  await expect.poll(() => dialog.locator('figure img').evaluate((img: HTMLImageElement) => img.complete && img.naturalHeight === 1688)).toBe(true);
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('World’s Finest Shows joins the catalog with its real repository, prototype status and local captures', async ({ page }) => {
  await page.goto('/software-development#projects');
  await page.getByRole('button', { name: 'Explore all 10 projects', exact: true }).click();
  const card = page.locator('[data-software-project="worlds-finest-shows"]');
  await expect(card.getByRole('heading', { name: 'World’s Finest Shows', exact: true })).toBeVisible();
  await expect(card.getByText('Prototype', { exact: true })).toBeVisible();
  await expect(card.getByRole('link', { name: 'Repository', exact: true })).toHaveAttribute('href', 'https://github.com/hackculichi-cloud/worldfinestshows');
  await expect(card.getByRole('link', { name: 'Live demo', exact: true })).toHaveAttribute('href', 'https://worldfinestshows.vercel.app');
  const trigger = card.getByRole('button').last();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Newsletter feedback stays local');
  await dialog.getByRole('button', { name: 'World’s Finest Shows · mobile', exact: true }).click();
  const image = dialog.locator('figure img');
  await expect(image).toHaveAttribute('src', '/images/software/screenshots/worlds-finest-home-mobile.webp');
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 780)).toBe(true);
  await selectLanguage(dialog, 'es');
  await expect(dialog).toContainText('Prototipo de desarrollo');
  await expect(dialog).toContainText('Seis categorías de atracciones');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(card.getByText('Prototipo', { exact: true })).toBeVisible();
});
