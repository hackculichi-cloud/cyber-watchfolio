import { test, expect } from "@playwright/test";

const electrical = "Residential & Industrial Electrical Maintenance";

test("desktop menus open on hover and navigate to actual specialty sections", async ({ page }) => {
  await page.goto("/");
  await page.locator(`header a[aria-label="${electrical}"]`).hover();
  const electricalMenu = page.getByRole("dialog", { name: `Specialties: ${electrical}`, exact: true });
  await expect(electricalMenu.getByRole("link", { name: "Residential Electrical Maintenance Currently studying", exact: true })).toBeVisible();
  await electricalMenu.getByRole("link", { name: "Industrial Electrical Maintenance Currently studying", exact: true }).click();
  await expect(page).toHaveURL(/\/electrical#industrial-maintenance$/);
  await expect(page.locator("#industrial-maintenance h3")).toHaveText("Industrial Electrical Maintenance");
  await page.locator('header button[aria-label="Open profile menu: Electronics"]').click();
  const electronicsMenu = page.getByRole("dialog", { name: "Specialties: Electronics", exact: true });
  await electronicsMenu.getByRole("link", { name: "Digital Systems Planned", exact: true }).click();
  await expect(page).toHaveURL(/\/electronics#digital-systems$/);
  await expect(page.locator("#digital-systems")).toContainText("Planned");
});

test("dropdown keyboard control, Escape and translations", async ({ page }) => {
  await page.goto("/");
  const trigger = page.locator('header button[aria-label="Open profile menu: Electronics"]');
  await trigger.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("dialog", { name: "Specialties: Electronics", exact: true });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.locator('header button[lang="es"]:visible').click();
  await page.locator('header button[aria-label="Abrir menú del perfil: Electrónica"]').click();
  await expect(page.getByRole("link", { name: "Audio y radio Planeado", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Electrónica básica Actualmente estudiando", exact: true })).toBeVisible();
});

test("orbit previews work with hover, keyboard, pause and navigation", async ({ page }) => {
  await page.goto("/");
  await page.locator(".orbit-stage").hover();
  await expect(page.locator("[data-profile-preview]")).toHaveCount(0);
  const node = page.getByRole("button", { name: electrical, exact: true });
  await node.hover();
  await expect(page.locator("[data-profile-preview][data-state=open] h3")).toHaveText(electrical);
  await expect(node).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Electronics", exact: true }).focus();
  await expect(page.locator("[data-profile-preview][data-state=open] h3")).toHaveText("Electronics");
  await page.locator("[data-profile-preview][data-state=open]").getByRole("link", { name: "Audio & Radio", exact: true }).focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-profile-preview][data-state=open]")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Electronics", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Pause rotation", exact: true }).click();
  await expect(page.locator(".skill-orbit")).toHaveAttribute("data-paused", "true");
  await page.getByRole("button", { name: "Resume rotation", exact: true }).click();
  await page.mouse.move(0, 0);
  await expect(page.locator(".skill-orbit")).toHaveAttribute("data-paused", "false");
  expect(await page.locator(".orbit-arm").first().evaluate((element) => getComputedStyle(element).animationPlayState)).toBe("running");
  await page.locator(".orbit-stage").hover();
  await page.getByRole("button", { name: "Electronics", exact: true }).focus();
  await page.locator("[data-profile-preview][data-state=open]").getByRole("link", { name: "Audio & Radio", exact: true }).click();
  await expect(page).toHaveURL(/\/electronics#audio-radio$/);
});

test("motion preference keeps all five orbit icons stationary and usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Reduced motion enabled", exact: true })).toBeDisabled();
  await expect(page.locator(".orbit-node")).toHaveCount(5);
  expect(await page.locator(".orbit-arm").first().evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await page.getByRole("button", { name: "Electronics", exact: true }).click();
  await expect(page.locator("[data-profile-preview][data-state=open] h3")).toHaveText("Electronics");
});

test.describe("mobile interaction", () => {
  test.use({ hasTouch: true });
  test("mobile disclosure menus, touch previews and Spanish future areas", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 850 });
    await page.goto("/");
    await page.getByRole("button", { name: "Electronics", exact: true }).tap();
    await expect(page.locator("[data-profile-preview][data-state=open] h3")).toHaveText("Electronics");
    await page.getByRole("button", { name: "Close preview", exact: true }).click();
    await expect(page.locator("[data-profile-preview][data-state=open]")).toHaveCount(0);
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const nav = page.locator("#mobile-navigation");
    await nav.locator("summary").filter({ hasText: "Electronics" }).click();
    await nav.getByRole("link", { name: "Television Planned", exact: true }).click();
    await expect(page).toHaveURL(/\/electronics#television$/);
    await expect(nav).not.toBeVisible();
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await nav.locator('button[lang="es"]').click();
    await nav.locator("summary").filter({ hasText: "Electrónica" }).click();
    await expect(nav.getByRole("link", { name: "Sistemas digitales Planeado", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(nav).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

});

test("Linux is in progress while SQL and Cisco remain future plans", async ({ page }) => {
  await page.goto("/cybersecurity#linux-training");
  await expect(page.locator("#linux-training")).toContainText("Currently studying");
  await expect(page.locator("#sql-training")).toContainText("Planned");
  await expect(page.locator("#cisco-training")).toContainText("Planned");
});
