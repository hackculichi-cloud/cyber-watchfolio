import { expect, test } from "@playwright/test";

const areas = ["cybersecurity", "development", "electrical", "electronics", "repair", "customer-service", "barbering"];

for (const lang of ["es", "en"] as const) {
  for (const width of [768, 1440]) {
    test(`hover keeps three individually colored tools available at ${width}px in ${lang}`, async ({ page }) => {
      test.setTimeout(60000);
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width, height: 1000 });
      await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      const stage = page.locator("[data-home-mascot]");
      const observedColors = new Map<string, string>();

      for (const area of areas) {
        const option = stage.locator(`[data-outfit="${area}"]`);
        await option.hover();
        const field = stage.locator(`[data-tool-field="${area}"]`);
        await expect(field).toBeVisible();
        await expect(field).toHaveAttribute("data-tools-entered", "true");
        // Wait for the finite entrance before Playwright scrolls an absolute
        // target into view. Early-frame clearance is covered by orbit-tool-clearance.
        await field.evaluate(async element => {
          await Promise.all(element.getAnimations({ subtree: true })
            .filter(animation => animation.playState === "running" && Number.isFinite(animation.effect?.getTiming().iterations))
            .map(animation => animation.finished));
        });
        const chips = field.locator("[data-tool-chip]");
        await expect(chips).toHaveCount(3);
        await expect(field.locator("[data-tool-prop]")).toHaveCount(3);
        const styles = await chips.evaluateAll(elements => elements.map(element => {
          const style = getComputedStyle(element);
          return { id: element.getAttribute("data-tool-chip")!, border: style.borderTopColor, borderWidth: parseFloat(style.borderTopWidth), background: style.backgroundColor, text: element.textContent?.trim() ?? "" };
        }));
        expect(new Set(styles.map(style => style.id)).size).toBe(3);
        expect(new Set(styles.map(style => style.border)).size).toBe(3);
        expect(new Set(styles.map(style => style.background)).size).toBe(3);
        for (const style of styles) {
          expect(style.borderWidth).toBeGreaterThan(0);
          expect(style.border).not.toBe("rgba(0, 0, 0, 0)");
          expect(style.background).not.toBe("rgba(0, 0, 0, 0)");
          expect(style.text).not.toBe("");
          if (observedColors.has(style.id)) expect(style.border).toBe(observedColors.get(style.id));
          observedColors.set(style.id, style.border);
        }
        if (area === "electrical") {
          for (const label of lang === "es"
            ? ["Multímetro digital", "Pinzas aisladas", "Destornillador de precisión"]
            : ["Digital multimeter", "Insulated pliers", "Precision screwdriver"]) await expect(field).toContainText(label);
        }

        await field.evaluate(element => element.setAttribute("data-hover-retained", "true"));
        await chips.first().hover();
        await chips.last().hover();
        // Stay beyond the short leave delay, sampling frames instead of a sleep.
        expect(await field.evaluate(element => new Promise<boolean>(resolve => {
          let frames = 0;
          let retained = true;
          const sample = () => {
            retained &&= element.isConnected && element.getAttribute("data-hover-retained") === "true";
            if (++frames < 20) requestAnimationFrame(sample);
            else resolve(retained);
          };
          requestAnimationFrame(sample);
        }))).toBe(true);
        await expect(field).toHaveAttribute("data-hover-retained", "true");
        await expect(field.locator("[data-tool-chip]")).toHaveCount(3);
        await expect(page).toHaveURL(/\/$/);

        await page.mouse.move(0, 990);
        await expect(stage.locator("[data-tool-field]")).toHaveCount(0);
      }

      // Keyboard preview and Escape continue to work after pointer previews.
      await stage.locator('[data-outfit="electrical"]').focus();
      await expect(stage.locator('[data-tool-field="electrical"]')).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(stage.locator("[data-tool-field]")).toHaveCount(0);
      await expect(stage).toHaveAttribute("data-selector-open", "false");
      await page.reload();
      await stage.locator('[data-outfit="electrical"]').click();
      await expect(page).toHaveURL(/\/electrical$/);
      await expect(page.locator('[data-profile-workspace="electrical"]')).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
}
