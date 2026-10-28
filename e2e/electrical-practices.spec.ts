import { openElectricalArea } from "./support/electricalArea";
import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
import { expect, test } from "@playwright/test";

test("electrical cases stay grouped, preserve original photos and keep protocol and intervention facts distinct", async ({ page, request }) => {
  await page.goto("/electrical#projects");
  const groups = page.locator("[data-electrical-practices]");
  await expect(groups.locator("article")).toHaveCount(0);
  await openElectricalArea(page, "residential");
  await groups.locator('[data-electrical-group="residential-outlets"]').click();
  await expect(groups.locator("article")).toHaveCount(2);
  const record = groups.locator('[data-work="residential-outlet-october-2026"]');
  await expect(record).not.toContainText("Electrical review required");
  await expect(record).toContainText("Residential");
  await record.getByRole("button", { name: "View project", exact: true }).last().click();
  const detail = page.getByRole("dialog");
  await expect(detail.locator("[data-documented-steps] ol > li")).toHaveCount(5);
  await expect(detail).toContainText("119.3 V AC");
  await expect(detail).toContainText("15 A outlet and 30 A circuit breaker");
  await expect(detail).toContainText("Confirmed checking polarity and protective earth");
  await expect(detail.locator("[data-work-protocol]")).toContainText("Disconnect the circuit");
  await expect(detail).toContainText("circuit energized");
  await expect(detail.getByRole("heading", { name: "Before / After", exact: true })).toHaveCount(0);
  await expect(detail.locator('img[src*="/images/repair/"]')).toHaveCount(0);
  const expand = detail.getByRole("button", { name: /^View more photos:/ });
  await expect(expand).toHaveAttribute("aria-expanded", "false");
  await expand.click();
  const sources = await detail.locator('img[src*="outlet-october-2026/"]').evaluateAll(imgs => [...new Set(imgs.map(img => img.getAttribute("src")))]);
  expect(sources).toHaveLength(16);
  for (const src of sources) {
    const response = await request.get(src!);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/jpeg");
  }
  await page.keyboard.press("Escape");
  await groups.locator('[data-electrical-group="residential-lighting"]').click();
  await expect(groups.locator("article")).toHaveCount(1);
  await expect(groups.locator("article")).toContainText("Two Ceiling Luminaires");
  await openElectricalArea(page, "industrial");
  await groups.locator('[data-electrical-group="industrial-motors"]').click();
  await expect(groups.locator("article")).toHaveCount(0);
  await expect(groups).toContainText("No completed practices documented");
  await openElectricalArea(page, "control");
  await groups.locator('[data-electrical-group="control-contactors"]').click();
  await expect(groups.locator("article")).toContainText("Planned");
});

test("courses share their certificate card with their explanations and collapsed syllabus", async ({ page }) => {
  await page.goto("/electrical#certificate");
  const certificates = page.locator('[data-certifications="electrical"]');
  await expect(certificates.locator("[data-certificate-placeholder]")).toHaveCount(4);
  const conocer = certificates.locator('[data-certificate="electrical-conocer"]');
  await expect(conocer).toContainText("MOCKUP · Original pending");
  await expect(conocer).toContainText("Training in progress; certificate pending completion.");
  const syllabus = conocer.locator('[data-course-syllabus="electrical"]');
  await expect(syllabus).not.toHaveAttribute("open", "");
  await syllabus.locator("summary").click();
  await expect(syllabus.getByRole("button", { name: /Fundamentals of Electricity/ })).toBeVisible();
  await selectLanguage(page, "es");
  await expect(conocer).toContainText("MOCKUP · Original pendiente");
  await expect(conocer.getByRole("button", { name: /Fundamentos de Electricidad/ })).toBeVisible();
  await openElectricalArea(page, "residential");
  await page.locator('[data-electrical-group="residential-outlets"]').click();
  const record = page.locator('[data-work="residential-outlet-october-2026"]');
  await expect(record).toContainText("Cambio de contacto residencial");
  await record.getByRole("button", { name: "Ver proyecto", exact: true }).last().click();
  await expect(page.getByRole("dialog")).toContainText("pruebas de polaridad y tierra de protección");
});

test("mobile groups fit and only the latest CV is offered", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/electrical#projects");
  await openElectricalArea(page, "residential");
  await page.locator('[data-electrical-group="residential-outlets"]').click();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const path of ["/electrical", "/electronics", "/repair", "/experience", "/software-development", "/cybersecurity"]) {
    await page.goto(`${path}#cv`);
    const cv = page.locator("#cv");
    await expect(cv.locator('a[download]')).toHaveCount(1);
    await expect(cv.getByRole("link", { name: "All CV versions", exact: true })).toHaveCount(0);
    await expect(cv.getByRole("link", { name: "Original PDF", exact: true })).toHaveCount(0);
    await expect(cv.locator('a[download]')).toHaveAttribute("href", /-en\.pdf$/);
  }
});

test("mobile home integrates the artwork and exposes seven choices without a greeting", async ({ browser }) => {
  for (const width of [360, 390, 430]) {
    const context = await browser.newContext({ storageState: englishStorageState, viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const selector = page.locator('[data-home-mascot]');
    await expect(page.locator('[data-home-mobile-art]')).toHaveCount(0);
    await expect(page.locator('[data-home-background]')).toBeVisible();
    await expect(selector.locator('[data-outfit]')).toHaveCount(7);
    const bar = (await page.locator('[data-mobile-quicknav]').boundingBox())!;
    for (const link of await selector.locator('[data-outfit]').all()) {
      const box = (await link.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      expect(box.y + box.height).toBeLessThanOrEqual(bar.y);
      await link.tap({ trial: true });
    }
    await page.locator('h1').tap();
    await expect(selector).toHaveAttribute('data-selector-open', 'true');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await context.close();
  }
});
