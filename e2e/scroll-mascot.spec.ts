import { readFileSync } from "node:fs";
const localMedia: { path: string; bytes: number }[] = JSON.parse(readFileSync(new URL("../docs/local-media-provenance.json", import.meta.url), "utf8"));
import { test, expect } from "@playwright/test";

test("profile mascots appear between content blocks, never as floating overlays", async ({ page }) => {
  for (const path of ["/cybersecurity", "/software-development", "/electrical", "/electronics", "/repair", "/experience"]) {
    await page.goto(path);
    const interludes = page.locator("main [data-mascot-interlude]");
    await expect(interludes).toHaveCount(2);
    await interludes.first().scrollIntoViewIfNeeded();
    await expect(interludes.first()).toBeVisible();
    await expect(interludes.first()).toHaveCSS("position", "static");
    await expect(interludes.first()).toHaveCSS("border-top-width", "0px");
    await expect(interludes.first().locator("[data-full-body]")).toBeVisible();
    await interludes.last().scrollIntoViewIfNeeded();
    await page.locator("#cv").scrollIntoViewIfNeeded();
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
  await page.locator("#cv").scrollIntoViewIfNeeded();
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

test("home mascot stays out of the team background and responds to a greeting", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const mascot = page.locator("[data-home-mascot]");
  const box = (await mascot.boundingBox())!;
  expect(box.x + box.width).toBeLessThan(1440 / 2);
  await mascot.click();
  await expect(mascot.locator("[data-full-body]")).toHaveClass(/culichi-greet/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(mascot.locator("[data-full-body]")).toHaveCSS("animation-name", "none");
});

test("certificate inventories distinguish missing files from unfinished courses", async ({ page }) => {
  await page.goto("/electrical#certificate");
  const inventory = page.locator('[data-certifications="electrical"]');
  await expect(inventory.locator("article")).toHaveCount(4);
  await expect(inventory.getByText("Completed", { exact: true })).toHaveCount(1);
  await expect(inventory.getByText("Currently Studying", { exact: true })).toHaveCount(3);
  await expect(inventory.getByText("Certificate confirmed; file pending upload.", { exact: true })).toBeVisible();
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(inventory.getByText("Certificado confirmado; archivo pendiente de subir.", { exact: true })).toBeVisible();
  for (const path of ["/cybersecurity", "/software-development", "/electronics", "/repair", "/experience"]) {
    await page.goto(path);
    await expect(page.locator("[data-certifications]")).toHaveCount(1);
  }
});

test("practical media and contact screenshots load with external asset requests blocked", async ({ page, request }) => {
  await page.route(/lovable\.app|__l5e/, route => route.abort());
  for (const media of localMedia) {
    const result = await request.get(media.path);
    expect(result.ok()).toBe(true);
    expect((await result.body()).length).toBe(media.bytes);
  }
  const video = await request.get("/media/portfolio/float-switch-functional-test.mp4");
  expect(video.ok()).toBe(true);
  expect(video.headers()["content-type"]).toContain("video/mp4");
  await page.goto("/electrical#projects");
  await page.locator("#projects article").filter({ hasText: "Float-switch Control — Course Practice" }).getByRole("button", { name: "View project", exact: true }).first().click();
  const dialog = page.getByRole("dialog").first();
  const photos = dialog.locator('img[src^="/media/portfolio/"]');
  await expect(photos.first()).toBeVisible();
  await expect.poll(() => photos.first().evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});
