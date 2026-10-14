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
    await page.getByRole("button", { name: `Preview area: ${label}`, exact: true }).click();
    const preview = page.locator('[data-section-preview][data-state="open"]');
    await expect(preview.getByRole("heading", { name: label, exact: true })).toBeVisible();
    expect(await preview.locator("li").count()).toBeGreaterThan(1);
    await expect(page).toHaveURL(/\/$/);
    await page.keyboard.press("Escape");
  }
});

for (const [label, path, id] of areas) test(`${label} has its own ES/EN CV download and actual PDF preview`, async ({ page, request }) => {
  await page.goto(`${path}#cv`);
  const block = page.locator("#cv");
  const link = block.locator(`a[href="/cv/christian-velasco-${id}-en.pdf"]`);
  await expect(link).toBeVisible();
  const pdf = await request.get(await link.getAttribute("href") ?? "");
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await block.getByRole("button", { name: /^Preview CV:/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("img")).toHaveAttribute("src", `/cv/previews/christian-velasco-${id}-en.png`);
  await expect.poll(() => dialog.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await dialog.locator('button[lang="es"]').click();
  await expect(dialog.locator("img")).toHaveAttribute("src", `/cv/previews/christian-velasco-${id}-es.png`);
  await expect(dialog.locator('a[download]')).toHaveAttribute("href", `/cv/christian-velasco-${id}-es.pdf`);
  await page.keyboard.press("Escape");
  await expect(block.locator(`a[href="/cv/christian-velasco-${id}-es.pdf"]`)).toBeVisible();
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
  await context.close();
});
