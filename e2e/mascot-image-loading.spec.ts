import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

const scenes = JSON.parse(readFileSync(new URL("../src/data/mascotScenes.json", import.meta.url), "utf8")) as Record<string, { width: number; height: number; regions: Record<string, number[]> }>;

for (const width of [390, 1440]) {
  test(`atlas images preserve the approved crop and cell ratio at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/software-development");
    // The phone's explicit overview makes all existing interludes available.
    if (width < 768) await page.getByRole("button", { name: "Show the entire profile" }).click();
    const crops = page.locator("main [data-mascot-atlas]");
    await expect(crops).toHaveCount(3);
    for (const crop of await crops.all()) {
      await crop.scrollIntoViewIfNeeded();
      const kind = (await crop.getAttribute("data-mascot-atlas"))!;
      const atlas = scenes[kind];
      const [x, y, cellWidth, cellHeight] = atlas.regions.development;
      const image = crop.locator("img");
      await expect(image).toHaveAttribute("loading", "lazy");
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      const geometry = await crop.evaluate(el => {
        const crop = el.getBoundingClientRect();
        const image = el.querySelector("img")!.getBoundingClientRect();
        return { width: crop.width, height: crop.height, imageWidth: image.width, imageHeight: image.height, offsetX: crop.left - image.left, offsetY: crop.top - image.top, overflow: getComputedStyle(el).overflow, background: getComputedStyle(el).backgroundImage };
      });
      expect(geometry.background).toBe("none");
      expect(geometry.overflow).toBe("hidden");
      expect(geometry.width / geometry.height).toBeCloseTo(cellWidth / cellHeight, 2);
      expect(Math.abs(geometry.imageWidth - geometry.width * atlas.width / cellWidth)).toBeLessThan(1);
      expect(Math.abs(geometry.imageHeight - geometry.height * atlas.height / cellHeight)).toBeLessThan(1);
      expect(Math.abs(geometry.offsetX - geometry.width * x / cellWidth)).toBeLessThan(1);
      expect(Math.abs(geometry.offsetY - geometry.height * y / cellHeight)).toBeLessThan(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("a distant closing atlas waits until its section approaches the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 500 });
  const requestedAtlases: string[] = [];
  page.on("request", request => { if (request.resourceType() === "image" && /culichi-closing-scenes/.test(request.url())) requestedAtlases.push(request.url()); });
  await page.goto("/software-development");
  const crop = page.locator('[data-mascot-atlas="closing"]');
  const initial = (await crop.boundingBox())!;
  expect(initial.y).toBeGreaterThan(3500);
  expect(requestedAtlases).toEqual([]);
  await crop.scrollIntoViewIfNeeded();
  await expect.poll(() => crop.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(requestedAtlases.length).toBeGreaterThan(0);
  const loaded = (await crop.boundingBox())!;
  expect(Math.abs(loaded.width - initial.width)).toBeLessThan(1);
  expect(Math.abs(loaded.height - initial.height)).toBeLessThan(1);
});

test("small Home figures use responsive derivatives on a DPR3 phone", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  for (const profile of ["cybersecurity", "electronics", "repair", "customer-service"]) {
    const image = page.locator(`[data-home-character="${profile}"] > img`);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const loaded = await image.evaluate((img: HTMLImageElement) => ({ src: img.currentSrc, loading: img.loading, width: img.getBoundingClientRect().width }));
    expect(loaded.src).toMatch(/-384-[^/]+\.webp$/);
    expect(loaded.loading).toBe("lazy");
    expect(loaded.width).toBeLessThanOrEqual(144);
  }
  await context.close();
});
