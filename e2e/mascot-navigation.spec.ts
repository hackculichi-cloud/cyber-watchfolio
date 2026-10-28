import { test, expect } from "@playwright/test";
const areas = ["cybersecurity", "development", "electrical", "electronics", "repair", "customer-service", "barbering"];
test("all seven home selectors have distinct colors, while profiles welcome visitors without outfit controls", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const home = page.locator('[data-home-mascot]');
    await home.getByRole("button", { name: "Greet Culichi and choose an outfit", exact: true }).click();
    const colors = new Set<string>();
    for (const area of areas) {
        const option = home.locator(`[data-outfit="${area}"]`);
        await expect(option).toHaveAttribute("data-profile", area);
        colors.add(await option.evaluate(el => getComputedStyle(el).color));
    }
    expect(colors.size).toBe(7);
    await home.locator('[data-outfit="electrical"]').click();
    await expect(page).toHaveURL(/\/electrical$/);
    await expect(page.locator('[data-profile-workspace="electrical"] [data-body-mascot="electrical"]')).toBeVisible();
    await expect(page.locator('[data-interactive-mascot], [data-outfit]')).toHaveCount(0);
    const repair = page.locator('header nav a[href="/repair"]');
    await repair.hover();
    await expect(page.locator('[data-header-mascot]')).toHaveAttribute('data-header-mascot', 'electrical');
    await repair.click();
    await expect(page).toHaveURL(/\/repair$/);
    await expect(page.locator('[data-profile-workspace="repair"] [data-body-mascot="repair"]')).toBeVisible();
});
test("navigation works without WebGL and never requests the archived 3D model", async ({ page }) => {
    const requested3D: string[] = [];
    page.on("request", request => {
        if (/culichi\.glb|Fox3D|createFox|three(?:\.|_)/i.test(request.url())) requested3D.push(request.url());
    });
    await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
            if (/webgl/i.test(type)) throw new Error("WebGL blocked by privacy settings");
            return original.call(this, type, ...args);
        } as typeof original;
    });
    await page.goto("/");
    const home = page.locator("[data-home-mascot]");
    await expect(home.locator('[data-body-mascot="home"]')).toBeVisible();
    await expect(home.locator("canvas")).toHaveCount(0);
    await expect(home).not.toContainText("Meet Culichi");
    await home.getByRole("button", { name: "Greet Culichi and choose an outfit", exact: true }).click();
    await home.locator('[data-outfit="development"]').click();
    await expect(page).toHaveURL(/\/software-development$/);
    await expect(page.locator('[data-profile-workspace="development"] [data-body-mascot="development"]')).toBeVisible();
    expect(requested3D).toEqual([]);
});
test("each profile keeps a full standalone illustration with the appropriate number of interludes", async ({ page }) => {
    const profiles = [
        ["/cybersecurity", 5], ["/software-development", 5], ["/electrical#tools", 3],
        ["/electronics", 4], ["/repair", 5], ["/experience", 5], ["/barbering", 2],
    ] as const;
    for (const [path, count] of profiles) {
        await page.goto(path);
        const illustration = page.locator('img[data-mascot-scene="detail"]');
        await illustration.scrollIntoViewIfNeeded();
        await expect(illustration).toBeVisible();
        await expect.poll(() => illustration.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth >= 1024 && img.naturalHeight >= 1024)).toBe(true);
        await expect(illustration).toHaveAttribute('alt', '');
        await expect(illustration).toHaveAttribute('aria-hidden', 'true');
        await expect(illustration).toHaveCSS('position', 'static');
        await expect(page.locator('main [data-mascot-scene]')).toHaveCount(count);
        // Empty collections remain compact rather than acquiring decorative filler.
        await expect(page.locator('[data-empty-collection] [data-mascot-scene]')).toHaveCount(0);
    }
});
