import { expect, test, type Page } from "@playwright/test";

const areas = ["cybersecurity", "development", "electrical", "electronics", "repair", "customer-service", "barbering"];
const viewports = [[320, 640], [390, 844], [768, 1000], [1023, 1000], [1440, 1000]] as const;
type Rect = { x: number; y: number; width: number; height: number };
type Snapshot = { profile: string | null; ids: string[]; violations: string[]; circles: Record<string, Rect>; hero: Rect; animations: number; overflow: boolean };
type CaptureWindow = Window & { orbitClearance?: { done: boolean; samples: Snapshot[] } };

/** Arm before the event so the entry transition is sampled from its first frame. */
async function selectAndSample(page: Page, area: string, mode: "focus" | "hover", frames: number) {
  await page.evaluate(({ area, frames }) => {
    const state = { done: false, samples: [] as Snapshot[] };
    (window as CaptureWindow).orbitClearance = state;
    let started = false;
    const rectangle = (element: Element): Rect => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height };
    };
    // Half a CSS pixel tolerates subpixel rounding at the eight-pixel rail gap.
    const intersects = (a: Rect, b: Rect, gap = 0) => a.x + a.width + gap > b.x + .5 && b.x + b.width + gap > a.x + .5 && a.y + a.height + gap > b.y + .5 && b.y + b.height + gap > a.y + .5;
    const sample = () => {
      const stage = document.querySelector("[data-home-mascot]")!;
      const field = stage.querySelector("[data-tool-field]");
      const buttons = [...stage.querySelectorAll("[data-outfit]")];
      const circles = Object.fromEntries(buttons.map(button => [button.getAttribute("data-outfit")!, rectangle(button)]));
      const tools = [...stage.querySelectorAll("[data-tool-flight], [data-tool-prop]")].map(element => ({ id: element.getAttribute("data-tool-flight") ?? element.getAttribute("data-tool-prop")!, box: rectangle(element) }));
      const violations: string[] = [];
      for (const tool of tools) {
        if (tool.box.width <= 0 || tool.box.height <= 0) violations.push(`Empty tool: ${tool.id}`);
        for (const [slug, button] of Object.entries(circles)) if (intersects(tool.box, button, 8)) violations.push(`${tool.id} approaches ${slug}`);
      }
      if (field) for (const [slug, button] of Object.entries(circles)) if (intersects(rectangle(field), button, 8)) violations.push(`Rail approaches ${slug}`);
      const fox = stage.querySelector(".mascot-orbit-body");
      if (field && fox && intersects(rectangle(field), rectangle(fox))) violations.push("The fox covers the tool rail");
      for (let i = 0; i < tools.length; i++) for (let j = i + 1; j < tools.length; j++) {
        if (tools[i].id !== tools[j].id && intersects(tools[i].box, tools[j].box)) violations.push(`${tools[i].id} overlaps ${tools[j].id}`);
      }
      state.samples.push({ profile: field?.getAttribute("data-tool-field") ?? null, ids: [...stage.querySelectorAll("[data-tool-flight]")].map(element => element.getAttribute("data-tool-flight")!), violations, circles, hero: rectangle(document.querySelector(".home-hero")!), animations: field?.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length ?? 0, overflow: document.documentElement.scrollWidth > innerWidth });
      if (state.samples.length < frames) requestAnimationFrame(sample);
      else state.done = true;
    };
    const begin = (event: Event) => {
      if (started || !(event.target instanceof Element) || event.target.closest("[data-outfit]")?.getAttribute("data-outfit") !== area) return;
      started = true;
      document.removeEventListener("focusin", begin, true);
      document.removeEventListener("pointerover", begin, true);
      requestAnimationFrame(sample);
    };
    document.addEventListener("focusin", begin, true);
    document.addEventListener("pointerover", begin, true);
  }, { area, frames });
  const option = page.locator(`[data-home-mascot] [data-outfit="${area}"]`);
  if (mode === "hover") await option.hover();
  else await option.evaluate((element: HTMLElement) => element.focus({ preventScroll: true }));
  await page.waitForFunction(() => (window as CaptureWindow).orbitClearance?.done);
  return page.evaluate(() => (window as CaptureWindow).orbitClearance!.samples);
}

for (const lang of ["es", "en"] as const) {
  for (const reduced of [false, true]) {
    test(`three tools stay clear of every area control: ${lang}, ${reduced ? "reduced" : "normal"} motion`, async ({ page }) => {
      test.setTimeout(90000);
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
      await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height });
        await page.goto("/");
        await page.evaluate(() => document.fonts.ready);
        // Finish the short introduction without waiting for paused orbital animations.
        await page.locator("[data-home-introduction]").evaluate(async element => {
          await Promise.all(element.getAnimations({ subtree: true }).filter(animation => animation.playState === "running" && Number.isFinite(animation.effect?.getTiming().iterations)).map(animation => animation.finished));
        });
        const before = await page.locator(".home-hero").evaluate(element => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return { x, y, width, height };
        });
        const positions = await page.locator("[data-home-mascot] [data-outfit]").evaluateAll(elements => Object.fromEntries(elements.map(element => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return [element.getAttribute("data-outfit")!, { x, y, width, height }];
        })));
        if (width >= 768) await expect(page.locator("[data-mascot-legend]")).toBeVisible();
        else await expect(page.locator("[data-mascot-legend]")).toBeHidden();
        const combinations = new Set<string>();
        for (const [index, area] of areas.entries()) {
          const mode = width >= 768 && index % 2 ? "hover" : "focus";
          const frames = !reduced && index < 2 ? 20 : 3;
          const samples = await selectAndSample(page, area, mode, frames);
          const last = samples.at(-1)!;
          expect(last.profile, `${width}px ${area}`).toBe(area);
          expect(last.ids).toHaveLength(3);
          expect(new Set(last.ids).size).toBe(3);
          combinations.add(last.ids.join(","));
          for (const sample of samples) {
            expect(sample.violations, `${width}px ${area}`).toEqual([]);
            expect(sample.overflow).toBe(false);
            expect(Math.abs(sample.hero.height - before.height)).toBeLessThan(1);
            expect(Math.abs(sample.hero.y - before.y)).toBeLessThan(1);
            for (const slug of areas) for (const key of ["x", "y", "width", "height"] as const) expect(Math.abs(sample.circles[slug][key] - positions[slug][key]), `${width}px ${area}: ${slug}.${key}`).toBeLessThan(1);
          }
          if (reduced) expect(last.animations).toBe(0);
          await expect(page.locator(`[data-home-mascot] [data-outfit="${area}"]`)).toHaveAttribute("aria-describedby", await page.locator(`[data-gear-preview="${area}"]`).getAttribute("id") ?? "");
        }
        expect(combinations.size).toBe(7);
      }
      expect(errors).toEqual([]);
    });
  }
}
