import { test, expect } from "@playwright/test";

const areas = [
  ["Cybersecurity", "/cybersecurity", "cybersecurity"],
  ["Software Development", "/software-development", "software"],
  ["Residential & Industrial Electrical Maintenance", "/electrical", "electrical"],
  ["Electronics", "/electronics", "electronics"],
  ["Technical Repair", "/repair", "repair"],
  ["Call Center & Customer Service", "/experience", "customer-service"],
] as const;

test("top dropdowns use specialties, support keyboard/Escape and navigate to a real detail", async ({ page }) => {
  await page.goto("/");
  for (const [label] of areas) {
    const toggle = page.getByRole("button", { name: `Open profile menu: ${label}`, exact: true });
    await toggle.focus();
    await page.keyboard.press("Enter");
    const popup = page.getByRole("dialog", { name: `Specialties: ${label}`, exact: true });
    await expect(popup).toBeVisible();
    await expect(popup.getByRole("link", { name: "Projects", exact: true })).toHaveCount(0);
    await expect(popup.getByRole("link", { name: "CV", exact: true })).toHaveCount(0);
    await expect(popup.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
  }
  await page.locator('header a[href="/electronics"]').hover();
  const menu = page.getByRole("dialog", { name: "Specialties: Electronics", exact: true });
  await menu.locator('a[href="/electronics#audio-radio"]').click();
  await expect(page.locator('[data-specialty="audio-radio"]')).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('#specialty-details-electronics').getByText("Planned", { exact: true })).toBeVisible();
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(page.locator('#specialty-details-electronics').getByRole("heading", { name: "Audio y radio", exact: true })).toBeVisible();
  await page.locator('[data-specialty="basic-electronics"]').click();
  await expect(page.locator('#specialty-details-electronics').getByText(/Escuela Tecnológica de Occidente/).first()).toBeVisible();
});

test("each of the six home cards has a small usable preview without navigating", async ({ page }) => {
  await page.goto("/");
  for (const [label] of areas) {
    const eye = page.getByRole("button", { name: `Preview area: ${label}`, exact: true });
    await eye.locator("..").hover();
    await page.waitForTimeout(250);
    await expect(page.locator('[data-section-preview][data-state="open"]')).toHaveCount(0);
    await eye.focus();
    await expect(page.locator('[data-section-preview][data-state="open"]')).toHaveCount(0);
    await eye.click();
    const preview = page.locator('[data-section-preview][data-state="open"]');
    await expect(preview.getByRole("heading", { name: label, exact: true })).toBeVisible();
    expect(await preview.locator("li").count()).toBeGreaterThan(1);
    await expect(page).toHaveURL(/\/$/);
    await page.mouse.move(0, 400);
    await page.keyboard.press("Escape");
    await expect(preview).toHaveCount(0);
  }
});

for (const [label, path, id] of areas) test(`${label} has its own ES/EN CV download and actual PDF preview`, async ({ page, request }) => {
  await page.goto(`${path}#cv`);
  const block = page.locator("#cv");
  const original = id === "electrical";
  const enStem = original ? "electrical-original" : `${id}-en`;
  const esStem = original ? "electrical-original" : `${id}-es`;
  const link = block.locator(`a[href="/cv/christian-velasco-${enStem}.pdf"]`);
  await expect(link).toBeVisible();
  await link.hover();
  await link.focus();
  await expect(page.locator('[data-cv-preview]')).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const pdf = await request.get(await link.getAttribute("href") ?? "");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await block.getByRole("button", { name: /^Preview CV:/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("img")).toHaveAttribute("src", `/cv/previews/christian-velasco-${enStem}.png`);
  await expect.poll(() => dialog.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await dialog.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(dialog.locator("output")).toHaveText("125%");
  await dialog.getByRole("button", { name: "Fit width", exact: true }).click();
  await expect(dialog.locator("output")).toHaveText("100%");
  if (!original) await dialog.locator('button[lang="es"]').click();
  await expect(dialog.locator("img")).toHaveAttribute("src", `/cv/previews/christian-velasco-${esStem}.png`);
  await expect(dialog.locator('a[download]')).toHaveAttribute("href", `/cv/christian-velasco-${esStem}.pdf`);
  await page.keyboard.press("Escape");
  await expect(block.locator(`a[href="/cv/christian-velasco-${esStem}.pdf"]`)).toBeVisible();
});

test("mobile specialty controls and card preview work by touch without overflowing", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Preview area: Electronics", exact: true }).tap();
  const preview = page.locator('[data-section-preview][data-state="open"]');
  await preview.locator('a[href="/electronics#digital-systems"]').tap();
  await expect(page.locator('[data-specialty="digital-systems"]')).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Open menu", exact: true }).tap();
  await page.getByRole("button", { name: "Open profile menu: Software Development", exact: true }).tap();
  await page.locator('header a[href="/software-development#backend"]:visible').tap();
  await expect(page.locator('[data-specialty="backend"]')).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('#specialty-details-development').getByText(/UNISITE/)).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/repair#cv");
  await page.locator("#cv").getByRole("button", { name: /^Preview CV:/ }).tap();
  const cvDialog = page.getByRole("dialog");
  for (let step = 0; step < 4; step++) await cvDialog.getByRole("button", { name: "Zoom in", exact: true }).tap();
  await expect(cvDialog.locator("output")).toHaveText("200%");
  await expect.poll(() => cvDialog.evaluate(el => el.getBoundingClientRect().width <= innerWidth)).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await cvDialog.getByRole("button", { name: "Close", exact: true }).tap();
  await context.close();
});
