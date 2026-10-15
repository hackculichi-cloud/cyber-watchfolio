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
  await expect(preview).toHaveCSS("animation-name", "mascot-ready-in");
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
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("heading", { name: "Ideas become projects. Let’s talk." })).toBeVisible();
  for (const area of areas) await expect(footer.locator(`a[data-profile="${area}"]`)).toBeVisible();
  await expect(footer.locator('a[href="mailto:christian@culichi.lat"]')).toBeVisible();
  await expect(footer.getByRole("link", { name: "Back to top" })).toHaveAttribute("href", "#main");
  await page.locator('button[lang="es"]:visible').first().click();
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("heading", { name: "Las ideas se vuelven proyectos. Hablemos." })).toBeVisible();
});

test("larger header, home characters and footer fit small screens without WebGL", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("header").getByText("aka Culichi")).toBeVisible();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.locator("footer").getByRole("link", { name: "Back to top" }).click();
  await expect(page.locator("main h1")).toBeInViewport();
});
