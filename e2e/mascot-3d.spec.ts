import { test, expect } from "@playwright/test";
const areas = ["cybersecurity", "development", "electrical", "electronics", "repair", "customer-service"];
test("all six selectors have distinct section colors, and work again inside a profile", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const home = page.locator('[data-home-mascot]');
    await home.getByRole("button").click();
    const colors = new Set<string>();
    for (const area of areas) {
        const option = home.locator(`[data-outfit="${area}"]`);
        await expect(option).toHaveAttribute("data-profile", area);
        colors.add(await option.evaluate(el => getComputedStyle(el).color));
    }
    expect(colors.size).toBe(6);
    await home.locator('[data-outfit="electrical"]').click();
    await expect(page).toHaveURL(/\/electrical$/);
    const inside = page.locator('[data-interactive-mascot="electrical"]');
    await inside.getByRole("button").click();
    await expect(inside.locator('[data-outfit]')).toHaveCount(6);
    await expect(inside.locator('[data-outfit="electrical"]')).toHaveAttribute("aria-current", "page");
    // Choosing the current outfit must not lock subsequent choices.
    await inside.locator('[data-outfit="electrical"]').click();
    await expect(page).toHaveURL(/\/electrical$/);
    await inside.getByRole("button").click();
    await inside.locator('[data-outfit="repair"]').click();
    await expect(page).toHaveURL(/\/repair$/);
    await expect(page.locator('canvas[data-mascot="repair"]')).toHaveAttribute("data-model-outfit", "repair");
});
test("WebGL has retina resolution and stops rendering in standby", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    await page.goto("/");
    const model = page.locator('canvas[data-mascot="home"]');
    await expect(model).toBeVisible();
    await expect(model).toHaveAttribute("data-model-source", "blender-gltf");
    await expect(page.locator('[data-home-mascot]')).toHaveAttribute("data-phase", "standby");
    expect(await model.evaluate((el: HTMLCanvasElement) => el.width === el.clientWidth * 2 && el.height === el.clientHeight * 2 && !!el.getContext('webgl2'))).toBe(true);
    await page.waitForTimeout(150);
    const count = await model.getAttribute('data-rendered-frames');
    await page.waitForTimeout(350);
    await expect(model).toHaveAttribute('data-rendered-frames', count!);
    await model.dispatchEvent('webglcontextlost');
    await expect(page.locator('[data-fox-renderer]')).toHaveAttribute('data-fox-renderer', 'fallback');
    await page.locator('[data-home-mascot]').getByRole('button').click();
    await page.locator('[data-outfit="electronics"]').click();
    await expect(page).toHaveURL(/\/electronics$/);
    await context.close();
});
test("without WebGL, the local illustration and outfit navigation remain available", async ({ page }) => {
    await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) { if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl')
            return null; return original.call(this, type, ...args); } as typeof original;
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto('/');
    const home = page.locator('[data-home-mascot]');
    await expect(home.locator('[data-fox-renderer]')).toHaveAttribute('data-fox-renderer', 'fallback');
    await expect(home.locator('[data-body-mascot="home"]')).toBeVisible();
    await home.getByRole('button').click();
    await home.locator('[data-outfit="development"]').click();
    await expect(page).toHaveURL(/\/software-development$/);
    const profile = page.locator('[data-interactive-mascot="development"]');
    await profile.getByRole('button').click();
    await profile.locator('[data-outfit="customer-service"]').click();
    await expect(page).toHaveURL(/\/experience$/);
});
test("each area includes a fourth, full standalone activity illustration", async ({ page }) => {
    for (const path of ['/cybersecurity', '/software-development', '/electrical', '/electronics', '/repair', '/experience']) {
        await page.goto(path);
        const illustration = page.locator('img[data-mascot-scene="detail"]');
        await illustration.scrollIntoViewIfNeeded();
        await expect(illustration).toBeVisible();
        await expect.poll(() => illustration.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth >= 1024 && img.naturalHeight >= 1300)).toBe(true);
        await expect(illustration).toHaveAttribute('alt', '');
        await expect(page.locator('main [data-mascot-scene]')).toHaveCount(4);
    }
});

test("a failed model download keeps the illustration and section navigation usable", async ({ page }) => {
    await page.route("**/models/culichi.glb", route => route.abort("failed"));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const home = page.locator("[data-home-mascot]");
    await expect(home.locator('[data-fox-renderer="fallback"] [data-body-mascot="home"]')).toBeVisible();
    await home.getByRole("button").click();
    await home.locator('[data-outfit="electrical"]').click();
    await expect(page).toHaveURL(/\/electrical$/);
    await expect(page.locator('[data-interactive-mascot="electrical"] [data-body-mascot="electrical"]')).toBeVisible();
});
