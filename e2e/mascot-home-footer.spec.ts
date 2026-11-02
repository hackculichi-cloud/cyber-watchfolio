import { selectLanguage } from "./support/selectLanguage";
import { test, expect } from "@playwright/test";

const areas = ["cybersecurity", "development", "electrical", "electronics", "repair", "customer-service"];
test("hover and keyboard preview outfits without navigating; leaving restores the original", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const stage = page.locator("[data-home-mascot]");
  await stage.scrollIntoViewIfNeeded();
  await stage.getByRole("button", { name: "Greet Culichi and choose an outfit", exact: true }).click();
  await stage.locator('[data-outfit="development"]').hover();
  await expect(stage).toHaveAttribute("data-preview-outfit", "development");
  const preview = stage.locator('[data-outfit-preview="development"]');
  await expect(preview).toHaveCSS("animation-name", "mascot-quick-appear");
  await expect(page).toHaveURL(/\/$/);
  await stage.locator('[data-outfit="electrical"]').focus();
  await expect(stage).toHaveAttribute("data-preview-outfit", "electrical");
  await page.keyboard.press("Escape");
  await expect(stage).not.toHaveAttribute("data-preview-outfit");
  await expect(stage.locator("[data-outfit-preview]")).toHaveCount(0);
  await expect(stage.locator('[data-body-mascot="home"]')).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await stage.getByRole("button", { name: "Greet Culichi and choose an outfit", exact: true }).click();
  await stage.locator('[data-outfit="repair"]').click();
  await expect(page).toHaveURL(/\/repair$/);
});

test("home distributes all six full characters and the footer offers real profile and contact links", async ({ page }) => {
  await page.goto("/");
  const characters = page.locator("[data-home-character]");
  await expect(characters).toHaveCount(6);
  for (const area of areas) {
    const figure = page.locator(`[data-home-character="${area}"]`);
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toBeVisible();
    await expect(figure.locator("[data-full-body], [data-mascot-scene]")).toHaveCount(1);
  }
  for (const area of ['repair', 'customer-service']) {
    expect((await page.locator(`[data-home-character="${area}"]`).boundingBox())!.width).toBeLessThanOrEqual(144);
  }
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("heading", { name: "Ideas become projects. Let’s talk." })).toBeVisible();
  for (const area of areas) await expect(footer.getByRole("navigation", { name: "Footer", exact: true }).locator(`a[data-profile="${area}"]`)).toBeVisible();
  await expect(footer.locator('a[href="mailto:christian@culichi.lat"]')).toBeVisible();
  await expect(footer.getByRole("link", { name: "Back to top" })).toHaveAttribute("href", "#main");
  await selectLanguage(page, "es");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("heading", { name: "Las ideas se vuelven proyectos. Hablemos." })).toBeVisible();
});

test("larger header, home characters and footer fit small screens without WebGL", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(page.locator("header").getByText("Culichi.", { exact: true })).toBeVisible();
    const footer = page.locator('footer');
    const brand = footer.locator('[data-footer-brand]');
    await expect(brand).toContainText('aka Culichi');
    await footer.scrollIntoViewIfNeeded();
    const name = (await brand.boundingBox())!, portrait = (await footer.locator('[data-footer-mascot]').boundingBox())!;
    const areas = (await footer.getByRole('navigation', { name: 'Footer', exact: true }).boundingBox())!;
    const introduction = (await footer.locator('[data-footer-introduction]').boundingBox())!;
    if (width >= 1024) expect(areas.x + areas.width).toBeLessThan(introduction.x);
    else expect(areas.y + areas.height).toBeLessThan(introduction.y);
    expect(portrait.x).toBeGreaterThanOrEqual(name.x + name.width);
    expect(Math.abs((portrait.y + portrait.height / 2) - (name.y + name.height / 2))).toBeLessThan(2);
    await expect(footer.locator('.footer-area-icon')).toHaveCount(7);
    const menu = footer.locator('.footer-area-links');
    const menuBounds = (await menu.boundingBox())!;
    const centers = await menu.locator('a').evaluateAll(links => links.map(link => {
      const rect = link.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width };
    }));
    const rows = [...new Set(centers.map(center => Math.round(center.y)))];
    expect(rows).toHaveLength(width >= 1280 ? 1 : 2);
    expect(rows.map(y => centers.filter(center => Math.round(center.y) === y).length)).toEqual(width >= 1280 ? [7] : [4, 3]);
    for (const y of rows) {
      const row = centers.filter(center => Math.round(center.y) === y);
      expect(Math.abs((row[0].x + row.at(-1)!.x) / 2 - (menuBounds.x + menuBounds.width / 2))).toBeLessThan(1);
      for (let index = 1; index < row.length; index++) {
        expect(row[index].x - row[index - 1].x).toBeGreaterThanOrEqual(56);
      }
    }
    for (const link of await menu.locator('a').all()) {
      await expect(link).toHaveAccessibleName(/.+/);
      expect((await link.innerText()).trim()).toBe('');
    }
    const utilities = footer.locator('[data-footer-utilities]');
    for (const href of ['/about', '/cv', '/contact']) {
      await expect(utilities.locator(`a[href="${href}"]`)).toHaveAccessibleName(/.+/);
    }
    await expect(footer.locator(`a[href="https://github.com/ByCulichi"]`)).toHaveAccessibleName('GitHub');
    await expect(footer.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveCount(1);

    for (const link of await footer.locator('.footer-area-link').all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      expect(await link.locator('.footer-area-icon').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
    }
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await expect(page.locator("canvas")).toHaveCount(0);
  const back = page.locator('footer').getByRole('link', { name: 'Back to top' });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await back.hover();
  await expect.poll(() => back.locator('svg').evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(back.locator('svg')).toHaveCSS('transform', 'none');
  await back.click();
  await expect(page.locator("main h1")).toBeInViewport();
});
