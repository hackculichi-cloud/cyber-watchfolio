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
    expect(areas.y + areas.height).toBeLessThan(introduction.y);
    expect(portrait.y + portrait.height).toBeLessThan(name.y);
    for (const bounds of [areas, introduction, name, portrait]) {
      expect(Math.abs(bounds.x + bounds.width / 2 - width / 2)).toBeLessThan(2);
    }
    await expect(footer.locator('.footer-area-icon')).toHaveCount(7);
    const menu = footer.locator('.footer-area-links');
    const menuBounds = (await menu.boundingBox())!;
    const centers = await menu.locator('a').evaluateAll(links => links.map(link => {
      const rect = link.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width };
    }));
    const rows = [...new Set(centers.map(center => Math.round(center.y)))];
    expect(rows).toHaveLength(width >= 768 ? 1 : 3);
    expect(rows.map(y => centers.filter(center => Math.round(center.y) === y).length)).toEqual(width >= 768 ? [7] : [3, 3, 1]);
    for (const y of rows) {
      const row = centers.filter(center => Math.round(center.y) === y);
      expect(Math.abs((row[0].x + row.at(-1)!.x) / 2 - (menuBounds.x + menuBounds.width / 2))).toBeLessThan(1);
      for (let index = 1; index < row.length; index++) {
        expect(row[index].x - row[index - 1].x).toBeGreaterThanOrEqual(48);
      }
    }
    for (const link of await menu.locator('a').all()) {
      await expect(link).toHaveAccessibleName(/.+/);
      expect((await link.innerText()).trim()).not.toBe('');
    }
    const utilities = footer.locator('[data-footer-utilities]');
    for (const href of ['/about', '/cv', '/contact']) {
      const utility = utilities.locator(`a[href="${href}"]`);
      await expect(utility).toHaveAccessibleName(/.+/);
      expect((await utility.innerText()).trim()).not.toBe('');
    }
    await expect(footer.locator(`a[href="https://github.com/ByCulichi"]`)).toHaveAccessibleName('GitHub');
    await expect(footer.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveCount(1);

    const contact = footer.locator('[data-contact-grid]');
    const channelLinks = contact.locator('a');
    await expect(channelLinks).toHaveCount(4);
    const channelBounds = await channelLinks.evaluateAll(links => links.map(link => {
      const rect = link.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    }));
    expect(new Set(channelBounds.map(bounds => Math.round(bounds.y))).size).toBe(width >= 640 ? 1 : 2);
    expect(Math.max(...channelBounds.map(bounds => bounds.height)) - Math.min(...channelBounds.map(bounds => bounds.height))).toBeLessThan(1);
    const gridBounds = (await contact.boundingBox())!;
    expect(Math.abs(gridBounds.x + gridBounds.width / 2 - width / 2)).toBeLessThan(2);
    for (const [index, label] of ['Email', 'LinkedIn', 'GitHub', 'WhatsApp'].entries()) {
      const link = channelLinks.nth(index);
      await expect(link).toHaveAccessibleName(label);
      await expect(link.getByText(label, { exact: true })).toBeVisible();
      expect(channelBounds[index].width).toBeCloseTo(channelBounds[0].width, 0);
      expect(channelBounds[index].height).toBeCloseTo(channelBounds[0].height, 0);
      const value = link.locator('[data-contact-value]');
      await expect(value).toHaveText(['christian@culichi.lat', '@culichi', '@ByCulichi', '+52 33 1752 2176'][index]);
      const valueBounds = (await value.boundingBox())!;
      expect(valueBounds.x).toBeGreaterThanOrEqual(channelBounds[index].x);
      expect(valueBounds.x + valueBounds.width).toBeLessThanOrEqual(channelBounds[index].x + channelBounds[index].width + 1);
    }
    const whatsapp = contact.getByRole('link', { name: 'WhatsApp', exact: true });
    await expect(whatsapp).toHaveAttribute('href', 'https://wa.me/523317522176');
    await expect(whatsapp).toHaveAttribute('target', '_blank');
    await expect(whatsapp).toHaveAttribute('rel', /noopener/);

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


test("contact channels remain named in Spanish on profiles and the contact page", async ({ page }) => {
  await page.goto('/electrical');
  await selectLanguage(page, 'es');
  const contact = page.locator('[data-footer-contact]');
  await contact.scrollIntoViewIfNeeded();
  for (const [channel, value] of [['Correo electrónico', 'christian@culichi.lat'], ['LinkedIn', '@culichi'], ['GitHub', '@ByCulichi'], ['WhatsApp', '+52 33 1752 2176']]) {
    await expect(contact.getByRole('link', { name: channel, exact: true }).locator('[data-contact-value]')).toHaveText(value);
  }
  await expect(contact.getByText('christian@culichi.lat', { exact: true })).toHaveCount(1);
  for (const action of ['Enviar correo', 'Ver mi perfil', 'Ver mis proyectos', 'Enviar mensaje']) {
    await expect(contact.getByText(action, { exact: true })).toHaveCount(0);
  }
  const fox = (await contact.locator('.footer-contact-fox').boundingBox())!;
  const grid = (await contact.locator('[data-contact-grid]').boundingBox())!;
  expect(Math.abs(fox.x + fox.width / 2 - grid.x - grid.width / 2)).toBeLessThan(2);
  await page.goto('/contact');
  await expect(page.locator('main').getByText('@ByCulichi', { exact: true })).toBeVisible();
  await expect(page.locator('main').getByText('@culichi', { exact: true })).toBeVisible();
  await expect(page.locator('main a[href="https://wa.me/523317522176"]')).toContainText('+52 33 1752 2176');
});
