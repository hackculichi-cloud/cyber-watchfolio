import { openElectricalArea } from "./support/electricalArea";
import { selectLanguage } from "./support/selectLanguage";
import { test, expect } from "@playwright/test";

test("six outfit circles have equal radii and spacing, and preview the larger header mascot", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const stage = page.locator('[data-home-mascot]');
    await stage.getByRole('button', { name: 'Greet Culichi and choose an outfit', exact: true }).click();
    await expect(stage.locator('[data-outfit]')).toHaveCount(6);
    const geometry = await stage.evaluate(el => {
      const box = el.getBoundingClientRect();
      const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
      const points = [...el.querySelectorAll('[data-outfit] > span:first-child')].map(node => { const r = node.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
      return {
        square: Math.abs(box.width - box.height),
        radii: points.map(([x, y]) => Math.hypot(x - cx, y - cy)),
        spacing: points.map(([x, y], i) => Math.hypot(x - points[(i + 1) % points.length][0], y - points[(i + 1) % points.length][1])),
      };
    });
    expect(geometry.square).toBeLessThan(1);
    expect(Math.max(...geometry.radii) - Math.min(...geometry.radii)).toBeLessThan(1);
    expect(Math.max(...geometry.spacing) - Math.min(...geometry.spacing)).toBeLessThan(1);
    await stage.locator('[data-outfit="development"]').focus();
    await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'development');
    const head = (await page.locator('[data-header-mascot]').boundingBox())!;
    expect(head.width).toBeGreaterThanOrEqual(80);
    await expect(page).toHaveURL(/\/$/);
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'emblem');
  }
});

test("career timeline and skills reflect the supplied employers in English and Spanish", async ({ page }) => {
  await page.goto('/experience#background');
  const timeline = page.locator('[data-career-timeline]');
  await expect(timeline.locator('[data-career-role]')).toHaveCount(5);
  await expect(timeline.locator('[data-career-role="tcs-operations"]')).toContainText('Oct 2025 — Present');
  await expect(timeline.locator('[data-career-role="tcs-support"]')).toContainText('Nov 2023 — Oct 2025');
  await expect(timeline.locator('[data-career-role="alorica-logistics"]')).toContainText('Alorica');
  await expect(timeline.locator('[data-career-role="ttec-tier2"]')).toContainText('root-cause analysis');
  await expect(timeline.locator('[data-career-role="tp-support"]')).toContainText('New-hire training');
  await expect(page.locator('#skills article')).toHaveCount(8);
  await selectLanguage(page, "es");
  await expect(timeline.locator('[data-career-role="tcs-operations"]')).toContainText('Supervisor de operaciones');
  await expect(timeline.locator('[data-career-role="tcs-operations"]')).toContainText('Oct 2025 — Actualidad');
  await expect(timeline.locator('[data-career-role="ttec-tier2"]')).toContainText('análisis de causa raíz');
  await expect(timeline.locator('[data-career-role="alorica-logistics"]')).toContainText('Dic 2022 — Ago 2023');
  await expect(page.locator('#transferable')).toContainText('no se presenta como experiencia laboral en SOC');
});

test("home scatters six individual scenes and keeps social links in the footer contact block", async ({ page }) => {
  await page.goto('/');
  const scenes = page.locator('[data-home-character]');
  await expect(scenes).toHaveCount(6);
  expect(await scenes.evaluateAll(nodes => new Set(nodes.map(node => node.parentElement)).size)).toBe(6);
  await expect(page.locator('[data-home-character="cybersecurity"] img')).toHaveAttribute('src', /cybersecurity-hanging/);
  const contact = page.locator('[data-footer-contact]');
  await expect(contact.locator('a[href="https://github.com/ByCulichi"]')).toBeVisible();
  await expect(contact.locator('a[href*="linkedin.com/in/culichi"]')).toBeVisible();
  await expect(page.locator('main > section').first().locator('a[href*="github.com"], a[href*="linkedin.com"]')).toHaveCount(0);
});

test("both residential outlet cases use process and protocol instead of a comparison block", async ({ page }) => {
  await page.goto('/electrical#projects');
  await openElectricalArea(page, "residential");
  await page.locator('[data-electrical-group="residential-outlets"]').click();
  for (const id of ['residential-outlet-october-2026', 'residential-outlet-switch-replacement']) {
    const card = page.locator(`[data-work="${id}"]`);
    await expect(card).not.toContainText('Electrical review required');
    await expect(card).not.toContainText('Residential client');
    await card.getByRole('button', { name: 'View project', exact: true }).last().click();
    const detail = page.getByRole('dialog');
    await expect(detail.locator('[data-documented-steps]')).toBeVisible();
    await expect(detail.locator('[data-work-protocol]')).toContainText('Reference checklist');
    await expect(detail.getByRole('heading', { name: 'Before / After', exact: true })).toHaveCount(0);
    expect(await detail.locator('img').count()).toBeGreaterThan(2);
    await page.keyboard.press('Escape');
  }
});
