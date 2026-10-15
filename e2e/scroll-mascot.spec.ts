import { readFileSync } from "node:fs";
const localMedia: { path: string; bytes: number }[] = JSON.parse(readFileSync(new URL("../docs/local-media-provenance.json", import.meta.url), "utf8"));
import { test, expect } from "@playwright/test";

test("profile mascots appear between content blocks, never as floating overlays", async ({ page }) => {
  for (const path of ["/cybersecurity", "/software-development", "/electrical", "/electronics", "/repair", "/experience"]) {
    await page.goto(path);
    await expect(page.locator('[data-body-mascot] [data-mascot-scene="entry"]')).toBeVisible();
    const scenes = page.locator("main [data-mascot-scene]");
    await expect(scenes).toHaveCount(5);
    const sources = new Set<string>();
    for (const kind of ["entry", "practice", "action", "detail", "closing"]) {
      const scene = page.locator(`main [data-mascot-scene="${kind}"]`);
      await scene.scrollIntoViewIfNeeded();
      await expect(scene).toBeVisible();
      if (kind !== "entry") await expect(scene).toHaveCSS("position", "static");
      await expect(scene).toHaveCSS("border-top-width", "0px");
      sources.add(await scene.evaluate(el => el.tagName === "CANVAS" ? "3D" : el.getAttribute("src") ?? getComputedStyle(el).backgroundImage));
    }
    expect(sources.size).toBe(5);
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
  await expect(page.locator('#cv a[href="/cv/christian-velasco-electrical-original.pdf"]')).toHaveCount(0);
  await expect(page.locator("#cv").getByRole("link", { name: "All CV versions", exact: true })).toHaveCount(0);
  const result = await request.get("/cv/christian-velasco-electrical-original.pdf");
  expect(result.ok()).toBe(true);
  await expect(page.locator('#cv a[href="/cv/christian-velasco-electrical-en.pdf"]')).toBeVisible();
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

test("illustrated mascot reveals six outfits and transitions before navigating", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const mascot = page.locator("[data-home-mascot]");
  const box = (await mascot.boundingBox())!;
  expect(box.x + box.width).toBeLessThan(1440 / 2);
  await expect(mascot).toHaveAttribute("data-mascot-renderer", "illustration");
  await expect(mascot).toHaveAttribute("data-phase", "standby");
  await mascot.getByRole("button").hover();
  await expect(mascot.locator("[data-outfit]")).toHaveCount(6);
  await expect(page).toHaveURL(/\/$/);
  await mascot.locator('[data-outfit="electrical"]').click();
  await expect(mascot).toHaveAttribute("data-phase", "transforming");
  await expect(page).toHaveURL(/\/$/);
  await expect(mascot.locator('.mascot-target [data-body-mascot="electrical"]')).toBeVisible();
  await expect(page).toHaveURL(/\/electrical$/);
  const destination = page.locator('[data-interactive-mascot="electrical"]');
  await expect(destination).toBeVisible();
  await destination.getByRole("button").click();
  await expect(destination).toHaveAttribute("data-phase", "ready");
});

test("outfit selector supports keyboard, touch and reduced motion", async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const mascot = page.locator("[data-home-mascot]");
  const greet = mascot.getByRole("button");
  await greet.focus();
  await expect(mascot.locator("[data-outfit]")).toHaveCount(6);
  await page.keyboard.press("Tab");
  await expect(mascot.locator("[data-outfit]").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(mascot.locator("[data-outfit]")).toHaveCount(0);
  await expect(greet).toBeFocused();
  await greet.press("Enter");
  await mascot.locator('[data-outfit="electronics"]').focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/electronics$/);
  await expect(page.locator('[data-interactive-mascot="electronics"] [data-body-mascot="electronics"]')).toBeVisible();
  await expect(page.locator("main canvas")).toHaveCount(0);
  const context = await browser.newContext({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });
  const mobile = await context.newPage();
  await mobile.goto("/");
  const selector = mobile.locator("[data-home-mascot]");
  await expect(selector.locator("[data-outfit]")).toHaveCount(0);
  await selector.getByRole("button").tap();
  await expect(selector.locator("[data-outfit]")).toHaveCount(6);
  for (const link of await selector.locator("[data-outfit]").all()) {
    const rect = (await link.boundingBox())!;
    expect(rect.x).toBeGreaterThanOrEqual(0);
    expect(rect.x + rect.width).toBeLessThanOrEqual(360);
  }
  await selector.locator('[data-outfit="repair"]').tap();
  await expect(mobile).toHaveURL(/\/repair$/);
  await expect.poll(() => mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
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
  await page.locator('[data-electrical-group="control"]').click();
  await page.locator('[data-electrical-group="control-level-control"]').click();
  await page.locator("#projects article").filter({ hasText: "Float-switch Control — Course Practice" }).getByRole("button", { name: "View project", exact: true }).first().click();
  const dialog = page.getByRole("dialog").first();
  const photos = dialog.locator('img[src^="/media/portfolio/"]');
  await expect(photos.first()).toBeVisible();
  await expect.poll(() => photos.first().evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
});
