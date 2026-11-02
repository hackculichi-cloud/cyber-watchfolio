import { expect, test } from "@playwright/test";

test("header omits About and CV while preserving footer access and Home styling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("header a[href='/about']")).toHaveCount(0);
  await expect(page.locator("header a[href='/cv']")).toHaveCount(0);
  await expect(page.locator("header [data-language-toggle]:visible")).toHaveCount(1);
  await expect(page.locator(".home-hero")).toHaveClass(/grid-bg/);
  await expect(page.locator("footer a[href='/about']")).toBeVisible();
  await expect(page.locator("footer a[href='/cv']")).toHaveAccessibleName("CV");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#mobile-navigation a[href='/about']")).toHaveCount(0);
  await expect(page.locator("#mobile-navigation a[href='/cv']")).toHaveCount(0);
  await expect(page.locator("#mobile-navigation [data-language-toggle]:visible")).toHaveCount(1);
  await page.getByRole("button", { name: "Close menu", exact: true }).click();
  await expect(page.locator("[data-mobile-quicknav] a[href='/cv']")).toBeVisible();
  await page.locator("footer a[href='/cv']").click();
  await expect(page).toHaveURL(/\/cv$/);
  await expect(page.locator("main h1")).toHaveText("Curriculum Vitae");
});

test("slow profile loading preserves the same header and its working controls", async ({ page }) => {
  let release: () => void = () => {};
  const hold = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/Barbering-*.js", async route => { await hold; await route.continue(); });
  await page.goto("/");
  await page.locator("header").evaluate(el => el.setAttribute("data-retained", "true"));
  await page.getByRole("navigation", { name: "Main", exact: true }).getByRole("link", { name: "Barbering", exact: true }).click();
  await expect(page).toHaveURL(/\/barbering$/);
  await expect(page.locator("main [role='status']")).toBeVisible();
  await expect(page.locator("header")).toHaveAttribute("data-retained", "true");
  await expect(page.locator("header a[href='/cv']")).toHaveCount(0);
  await expect(page.locator("header a[href='/contact']")).toBeVisible();
  release();
  await expect(page.locator("main h1")).toHaveText("Barbering");
  await expect(page.locator("header")).toHaveAttribute("data-retained", "true");
});
