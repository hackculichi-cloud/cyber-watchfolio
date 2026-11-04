import { expect, test } from "@playwright/test";

const areas = ["cybersecurity", "development", "electrical", "electronics", "repair", "customer-service", "barbering"];

for (const lang of ["es", "en"] as const) {
  for (const width of [768, 1440]) {
    test(`hover keeps three floating tools in their section color at ${width}px in ${lang}`, async ({ page }) => {
      test.setTimeout(60000);
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width, height: 1000 });
      await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      const stage = page.locator("[data-home-mascot]");
      const sectionColors = new Set<string>();
      const distinctTools = new Set<string>();
      const distinctImages = new Set<string>();

      for (const area of areas) {
        const option = stage.locator(`[data-outfit="${area}"]`);
        await option.hover();
        const field = stage.locator(`[data-tool-field="${area}"]`);
        await expect(field).toBeVisible();
        await expect(field).toHaveAttribute("data-tools-entered", "true");
        // Wait only for the object's entrance; its small finite bob does not
        // move the hover target. Early-frame clearance has its own regression.
        await field.locator("[data-floating-tool]").first().evaluate(async element => {
          await Promise.all(element.getAnimations({ subtree: true })
            .filter(animation => animation.effect instanceof KeyframeEffect && animation.effect.target === element && animation.playState === "running")
            .map(animation => animation.finished));
        });
        const tools = field.locator("[data-floating-tool]");
        await expect(tools).toHaveCount(3);
        await expect(field.locator("[data-tool-prop]")).toHaveCount(3);
        await expect(field.locator("[data-tool-chip]")).toHaveCount(0);
        await expect(field).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
        await expect(field).toHaveCSS("border-top-width", "0px");
        const sectionColor = await option.evaluate(element => getComputedStyle(element).color);
        sectionColors.add(sectionColor);
        const styles = await tools.evaluateAll(elements => elements.map(element => {
          const style = getComputedStyle(element);
          return { id: element.getAttribute("data-tool-flight")!, color: style.color, filter: getComputedStyle(element.querySelector(".mascot-tool-float")!).filter };
        }));
        expect(new Set(styles.map(style => style.id)).size).toBe(3);
        for (const style of styles) {
          expect(style.color).toBe(sectionColor);
          expect(style.filter).toContain("drop-shadow");
        }
        const legend = page.locator(`[data-gear-preview="${area}"]`);
        await expect(legend).toBeVisible();
        await expect(legend.locator('[data-gear-item]')).toHaveCount(3);
        const visibleLabels = await legend.locator('[data-tool-label]').allTextContents();
        expect(visibleLabels.every(label => label.trim().length > 0)).toBe(true);
        await expect(legend.locator('[data-tool-prop], img')).toHaveCount(0);
        for (const prop of await field.locator('[data-tool-prop]').all()) {
          const toolId = (await prop.getAttribute('data-tool-prop'))!;
          expect(distinctTools.has(toolId)).toBe(false);
          distinctTools.add(toolId);
          await expect(prop).toHaveAttribute('data-tool-profile', area);
          const img = prop.locator('img');
          await img.evaluate((image: HTMLImageElement) => image.decode());
          const src = (await img.getAttribute('src'))!;
          expect(src).toContain(`/images/mascot-tools/${area}/`);
          expect(distinctImages.has(src)).toBe(false);
          distinctImages.add(src);
          const palette = await img.evaluate((image: HTMLImageElement, profile) => {
            const canvas = document.createElement('canvas'); canvas.width=64; canvas.height=64;
            const ctx=canvas.getContext('2d')!; ctx.drawImage(image,0,0,64,64);
            const pixels=ctx.getImageData(0,0,64,64).data;
            let colored=0, matching=0;
            const ranges: Record<string,[number,number]>={ cybersecurity:[170,210],development:[90,160],electrical:[30,75],electronics:[10,55],repair:[250,305],"customer-service":[155,195],barbering:[325,360] };
            const [low,high]=ranges[profile];
            for(let i=0;i<pixels.length;i+=4){
              const r=pixels[i],g=pixels[i+1],b=pixels[i+2],max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min;
              if(pixels[i+3]<128 || delta<30 || max<64 || delta/max<.35) continue;
              colored++;
              let hue=(max===r?(g-b)/delta:max===g?(b-r)/delta+2:(r-g)/delta+4)*60;
              if(hue<0) hue+=360;
              if(hue>=low && hue<=high) matching++;
            }
            return {colored,matching};
          }, area);
          expect(palette.colored).toBeGreaterThan(20);
          expect(palette.matching/palette.colored, `${area}: ${toolId} image palette`).toBeGreaterThan(.65);
        }
        if (area === "electrical") {
          for (const label of lang === "es"
            ? ["Multímetro digital", "Pinzas de electricista", "Pelacables automático"]
            : ["Digital multimeter", "Electrician's pliers", "Automatic wire stripper"]) await expect(legend).toContainText(label);
          await expect(legend).not.toContainText(lang === "es" ? "Destornillador" : "screwdriver");
        }

        await field.evaluate(element => element.setAttribute("data-hover-retained", "true"));
        await tools.first().hover();
        await tools.last().hover();
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
        await expect(field.locator("[data-floating-tool]")).toHaveCount(3);
        await expect(page).toHaveURL(/\/$/);

        await page.mouse.move(0, 990);
        await expect(stage.locator("[data-tool-field]")).toHaveCount(0);
      }
      expect(sectionColors.size).toBe(7);
      expect(distinctTools.size).toBe(21);
      expect(distinctImages.size).toBe(21);

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
