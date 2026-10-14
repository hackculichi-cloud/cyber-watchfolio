import { test, expect } from "@playwright/test";

test("profile mascots appear between content blocks, never as floating overlays", async ({ page }) => {
  for (const path of ["/cybersecurity", "/software-development", "/electrical", "/electronics", "/repair", "/experience"]) {
    await page.goto(path);
    const interludes = page.locator("main [data-mascot-interlude]");
    await expect(interludes).toHaveCount(2);
    await interludes.first().scrollIntoViewIfNeeded();
    await expect(interludes.first()).toBeVisible();
    await expect(interludes.first()).toHaveCSS("position", "static");
    await interludes.last().scrollIntoViewIfNeeded();
    await interludes.last().getByRole("link", { name: "View CV", exact: true }).click();
    await expect(page).toHaveURL(/#cv$/);
    await page.locator("#cv").getByRole("button", { name: /^Preview CV:/ }).click();
    await expect(page.getByRole("dialog").locator("[data-mascot]")).toBeVisible();
    await page.keyboard.press("Escape");
  }
});

test("mobile interludes fit the page with reduced motion and preserve the electrical original", async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/electrical");
  const interlude = page.locator("[data-mascot-interlude]").last();
  await interlude.scrollIntoViewIfNeeded();
  await expect(interlude).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await interlude.getByRole("link", { name: "View CV", exact: true }).click();
  const original = page.locator('#cv a[href="/cv/christian-velasco-electrical-original.pdf"]');
  await expect(original).toBeVisible();
  const result = await request.get((await original.getAttribute("href"))!);
  expect(result.ok()).toBe(true);
  await expect(page.locator('#cv a[href="/cv/christian-velasco-electrical-mascot.pdf"]')).toBeVisible();
});

test("home loads the local code font and general mascot background", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.evaluate(() => document.fonts.check('16px "JetBrains Mono"'))).toBe(true);
  await expect(page.locator("body")).toHaveCSS("font-family", /JetBrains Mono/);
  const backdrop = page.locator("[data-home-background]");
  await expect.poll(() => backdrop.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(backdrop).toHaveAttribute("aria-hidden", "true");
});

test("Udemy electrical measurements is in progress with ten bilingual learning objectives", async ({ page }) => {
  await page.goto("/electrical#tracks");
  const course = page.locator("#tracks article").filter({ has: page.locator('[data-course-objectives="electrical-udemy-measurements"]') });
  await expect(course.getByText("Currently Studying", { exact: true })).toBeVisible();
  await expect(course.getByText(/Certificate pending course completion/)).toBeVisible();
  await course.locator("summary").click();
  await expect(course.locator("li")).toHaveCount(10);
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(course.getByRole("heading", { name: "Mediciones Eléctricas", exact: true })).toBeVisible();
  await expect(course.getByText("Medición de continuidad en circuitos sin energía.", { exact: true })).toBeVisible();
});
