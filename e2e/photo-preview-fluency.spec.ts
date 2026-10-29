import { expect, test } from "@playwright/test";
import { openElectricalArea } from "./support/electricalArea";

for (const dpr of [1, 3]) {
  test(`electrical cards and evidence choose small derivatives, with originals in the viewer at DPR ${dpr}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: dpr, isMobile: true, hasTouch: true });
    await context.addInitScript(() => localStorage.setItem("portfolio-lang", "en"));
    const page = await context.newPage();
    const requests = new Set<string>();
    page.on("request", request => requests.add(new URL(request.url()).pathname));
    try {
      await page.goto("/electrical#projects");
      await openElectricalArea(page, "residential");
      await page.locator('[data-electrical-group="residential-outlets"]').click();
      const record = page.locator('[data-work="residential-outlet-october-2026"]');
      const cardImage = record.locator("img");
      await cardImage.scrollIntoViewIfNeeded();
      await expect.poll(() => cardImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      const originalCover = "/images/electrical/outlet-october-2026/16.jpeg";
      await expect(cardImage).toHaveAttribute("src", originalCover);
      expect(await cardImage.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain("/images/previews/");
      expect(requests.has(originalCover)).toBe(false);
      await record.getByRole("button", { name: "View project", exact: true }).last().click();
      const detail = page.getByRole("dialog");
      await expect(detail.locator('[data-work-step]')).toHaveCount(5);
      const firstPhoto = detail.locator('[data-work-step] [data-photo-gallery] img').first();
      await firstPhoto.scrollIntoViewIfNeeded();
      await expect.poll(() => firstPhoto.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      const originalPhoto = "/images/electrical/outlet-october-2026/01.jpeg";
      await expect(firstPhoto).toHaveAttribute("src", originalPhoto);
      await expect(firstPhoto).toHaveAttribute("alt", "Original duplex outlet before replacement.");
      expect(await firstPhoto.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain("/images/previews/");
      expect(requests.has(originalPhoto)).toBe(false);
      await firstPhoto.locator("xpath=ancestor::button[1]").click();
      const viewer = page.locator('[data-photo-dialog] img');
      await expect(viewer).toHaveAttribute("src", originalPhoto);
      await expect(viewer).not.toHaveAttribute("srcset");
      await expect.poll(() => viewer.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      expect(requests.has(originalPhoto)).toBe(true);
      await page.keyboard.press("Escape");
      // Radix retains a closed photo dialog during its 100 ms exit animation.
      // Wait for that layer to unmount before asserting the underlying record.
      await expect(page.locator('[data-photo-dialog]')).toHaveCount(0);
      await expect(detail).toBeVisible();
    } finally { await context.close(); }
  });

  test(`repair process previews keep original evidence and load it only when enlarged at DPR ${dpr}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: dpr, isMobile: true, hasTouch: true });
    await context.addInitScript(() => localStorage.setItem("portfolio-lang", "en"));
    const page = await context.newPage();
    const requests = new Set<string>();
    page.on("request", request => requests.add(new URL(request.url()).pathname));
    try {
      await page.goto("/repair#smartphones");
      for (const group of ["iPhone", "iPhone-battery", "sr-001"]) {
        const tile = page.locator(`[data-repair-group="${group}"]`);
        if (await tile.getAttribute("aria-expanded") !== "true") await tile.click();
      }
      const record = page.locator('[data-repair-case="sr-001"]');
      await expect(record.locator('[data-work-step]')).toHaveCount(5);
      const thumbnail = record.locator('[data-photo-gallery] img').first();
      await thumbnail.scrollIntoViewIfNeeded();
      await expect.poll(() => thumbnail.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      const original = (await thumbnail.getAttribute("src"))!;
      const alt = (await thumbnail.getAttribute("alt"))!;
      expect(original).toMatch(/^\/images\/repair\/repair-photo-\d+\.jpg$/);
      expect(await thumbnail.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain("/images/previews/");
      expect(requests.has(original)).toBe(false);
      await thumbnail.locator("xpath=ancestor::button[1]").click();
      const viewer = page.locator('[data-photo-dialog] img');
      await expect(viewer).toHaveAttribute("src", original);
      await expect(viewer).toHaveAttribute("alt", alt);
      await expect(viewer).not.toHaveAttribute("srcset");
      await expect.poll(() => viewer.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      expect(requests.has(original)).toBe(true);
      await page.keyboard.press("Escape");
      await expect(record).toBeVisible();
    } finally { await context.close(); }
  });
}
