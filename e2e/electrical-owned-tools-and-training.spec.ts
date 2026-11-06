import { expect, test } from "@playwright/test";

for (const lang of ["es", "en"] as const) {
  test(`owned equipment enlarges without moving the phone or desktop page in ${lang}`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const requested: string[] = [];
      const track = (request: import("@playwright/test").Request) => { if (request.url().includes("/images/electrical/tools/")) requested.push(request.url()); };
      page.on("request", track);
      await page.goto("/electrical#residential");
      await expect(page.locator('[data-electrical-practices]')).toBeVisible();
      expect(requested).toHaveLength(0);
      await page.locator('[data-open-electrical-tools]').click();
      const catalog = page.locator('[data-owned-electrical-tools]');
      await expect(catalog).toHaveCount(1);
      await expect(page.locator('[data-electrical-area-content] [data-owned-electrical-tools]')).toHaveCount(0);
      await expect(page.locator('[data-area-tab="tools"]')).toHaveCount(0);
      await expect(catalog.locator('figure[data-owned-tool-entry]')).toHaveCount(5);
      await expect(catalog.locator('[data-owned-tool]')).toHaveCount(5);
      await expect(catalog).not.toContainText(lang === "es" ? "Presentación retocada" : "Presentation retouched");
      await expect(catalog).toContainText("Klein Tools");
      const entries = catalog.locator('figure[data-owned-tool-entry]');
      for (const entry of await entries.all()) {
        await entry.scrollIntoViewIfNeeded();
        const preview = entry.locator('[data-owned-tool]');
        const caption = entry.locator('figcaption');
        const description = caption.locator('[data-owned-tool-description]');
        await expect(caption).toBeVisible();
        await expect(description).toBeVisible();
        expect((await description.innerText()).trim().length).toBeGreaterThan(20);
        await expect(preview.locator('figcaption, [data-owned-tool-description]')).toHaveCount(0);
        await expect(preview).toHaveAccessibleName(new RegExp(lang === "es" ? '^Abrir vista.*:' : '^Open larger preview:'));
        await expect.poll(() => preview.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        await expect(preview.locator('img')).toHaveAttribute('srcset', /320\.webp 320w, .*\.webp 512w$/);
        const photoBounds = (await preview.boundingBox())!;
        const thumbnailBounds = (await preview.locator('img').boundingBox())!;
        const descriptionBounds = (await description.boundingBox())!;
        expect(descriptionBounds.y).toBeGreaterThanOrEqual(photoBounds.y + photoBounds.height);
        // Establish the click target's final scroll position before testing dialog restoration.
        await preview.click({ trial: true });
        const before = await page.evaluate(() => scrollY);
        await preview.click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).not.toContainText(lang === "es" ? "Presentación retocada" : "Presentation retouched");
        await expect(dialog).toContainText(await description.innerText());
        const image = dialog.locator('img:not([data-language-flag])');
        await expect(image).toHaveAttribute("src", `/images/electrical/tools/${await preview.getAttribute('data-owned-tool')}-retouched.webp`);
        await expect.poll(() => image.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(512);
        const enlargedBounds = (await image.boundingBox())!;
        expect(Math.min(enlargedBounds.width, enlargedBounds.height)).toBeGreaterThan(Math.min(thumbnailBounds.width, thumbnailBounds.height));
        await page.keyboard.press("Escape");
        await expect(preview).toBeFocused();
        expect(await page.evaluate(() => scrollY)).toBeCloseTo(before, 0);
      }
      await page.locator('[data-close-electrical-tools]').first().click();
      await expect(catalog).toHaveCount(0);
      await expect(page.locator('[data-open-electrical-tools]')).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/electrical#tools');
      await page.reload();
      await expect(catalog).toHaveCount(1);
      await expect(page.locator('[data-specialty-details-for]')).toHaveCount(0);
      page.off("request", track);
    }
  });

  test(`electrical certification links share one collection and keep specialty state in ${lang}`, async ({ page }) => {
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const id of ["residential", "industrial", "electrical-control"]) {
        await page.goto(`/electrical#${id}`);
        await expect(page.locator('[data-area-tab="certificate"], [data-area-tab="tools"]')).toHaveCount(0);
        await page.locator('[data-open-electrical-tools]').click();
        await expect(page.locator('[data-owned-electrical-tools]')).toHaveCount(1);
        await expect(page.locator('[data-electrical-area-content] [data-owned-electrical-tools]')).toHaveCount(0);
        await page.locator('[data-close-electrical-tools]').first().click();
        await expect(page.locator('[data-owned-electrical-tools]')).toHaveCount(0);
        await expect(page.locator('[data-open-electrical-tools]')).toBeFocused();
        await expect(page.locator('[data-certifications="electrical"]')).toHaveCount(0);
        await page.locator('[data-open-electrical-training]').click();
        await page.goto('/electrical#certificate-electrical-measurements');
        await expect(page).toHaveURL(/#certificate-electrical-measurements$/);
        const original = page.locator('[data-certificate="electrical-measurements"]');
        await expect(original).toBeFocused();
        await expect(page.locator('[data-certifications="electrical"]')).toHaveCount(1);
        await expect(page.locator('[data-electrical-area-content] [data-certifications]')).toHaveCount(0);
        await expect(page.locator('[data-specialty-details-for]')).toHaveAttribute('data-specialty-details-for', id);
        const title = (await original.locator('h3').boundingBox())!;
        const nav = (await page.locator('.profile-section-nav').boundingBox())!;
        expect(title.y).toBeGreaterThanOrEqual(nav.y + nav.height);
        await page.locator('[data-close-electrical-training]').click();
        await expect(page.locator('[data-certifications="electrical"]')).toHaveCount(0);
        await expect(page.locator('[data-open-electrical-training]')).toBeFocused();
        await expect(page.locator('[data-electrical-area-content] #projects')).toBeVisible();
        await expect(page.locator('[data-area-tab="overview"]')).toHaveCount(0);
      }
      for (const alias of ["certificate", "certifications", "tracks"]) {
        await page.goto(`/electrical#${alias}`);
        await page.reload();
        await expect(page.locator('[data-certifications="electrical"]')).toHaveCount(1);
        await expect(page.locator('[data-specialty-details-for]')).toHaveCount(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
