import { selectLanguage } from "./support/selectLanguage";
import { englishStorageState } from "./support/language";
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
  await page.getByRole('button', { name: 'Open profile menu: Electronics', exact: true }).hover();
  const menu = page.getByRole("dialog", { name: "Specialties: Electronics", exact: true });
  await menu.locator('a[href="/electronics#audio-radio"]').click();
  await expect(page.locator('[data-specialty="audio-radio"]')).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('#specialty-details-electronics').getByText("Upcoming", { exact: true })).toBeVisible();
  await selectLanguage(page, "es");
  await expect(page.locator('#specialty-details-electronics').getByRole("heading", { name: "Técnico en Radio Recepción y Amplificadores", exact: true })).toBeVisible();
  await page.locator('[data-specialty="basic-electronics"]').click();
  await expect(page.locator('#specialty-details-electronics').getByText(/Escuela Tecnológica de Occidente/).first()).toBeVisible();
});

test("each area preview is momentary with pointer and keyboard", async ({ page }) => {
  await page.goto("/");
  for (const [label] of areas) {
    const eye = page.getByRole("button", { name: `Preview area: ${label}`, exact: true });
    await eye.locator("..").hover();
    await page.waitForTimeout(250);
    await expect(page.locator('[data-section-preview][data-state="open"]')).toHaveCount(0);
    await eye.focus();
    await expect(page.locator('[data-section-preview][data-state="open"]')).toHaveCount(0);
    await eye.hover();
    await page.mouse.down();
    const preview = page.locator('[data-section-preview][data-state="open"]');
    await expect(preview.getByRole("heading", { name: label, exact: true })).toBeVisible();
    expect(await preview.locator("li").count()).toBeGreaterThan(1);
    await expect.poll(async () => {
      const last = await preview.locator("li").last().boundingBox();
      const panel = await preview.boundingBox();
      return Boolean(last && panel && last.y + last.height <= panel.y + panel.height);
    }).toBe(true);
    await expect(page).toHaveURL(/\/$/);
    await page.mouse.move(0, 400);
    await expect(preview).toHaveCount(1);
    await page.mouse.up();
    await expect(preview).toHaveCount(0);
    await eye.focus();
    await page.keyboard.down("Space");
    await expect(preview).toHaveCount(1);
    await page.keyboard.up("Space");
    await expect(preview).toHaveCount(0);
    await page.keyboard.down("Enter");
    await expect(preview).toHaveCount(1);
    await page.keyboard.up("Enter");
    await expect(preview).toHaveCount(0);
  }
});

for (const [label, path, id] of areas) test(`${label} has its own ES/EN CV download and actual PDF preview`, async ({ page, request }) => {
  await page.goto(`${path}#cv`);
  const block = page.locator("#cv");
  const enStem = `${id}-en`;
  const esStem = `${id}-es`;
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
  await expect(dialog.locator("img:not([data-language-flag])")).toHaveAttribute("src", `/cv/previews/christian-velasco-${enStem}.png`);
  await expect.poll(() => dialog.locator("img:not([data-language-flag])").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await dialog.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(dialog.locator("output:not([data-cv-page])")).toHaveText("125%");
  await dialog.getByRole("button", { name: "Fit width", exact: true }).click();
  await expect(dialog.locator("output:not([data-cv-page])")).toHaveText("100%");
  await selectLanguage(dialog, "es");
  await expect(dialog.locator("img:not([data-language-flag])")).toHaveAttribute("src", `/cv/previews/christian-velasco-${esStem}.png`);
  await expect(dialog.locator('a[download]')).toHaveAttribute("href", `/cv/christian-velasco-${esStem}.pdf`);
  await page.keyboard.press("Escape");
  await expect(block.locator(`a[href="/cv/christian-velasco-${esStem}.pdf"]`)).toBeVisible();
});

test("mobile specialty controls and card preview work by touch without overflowing", async ({ browser }) => {
  const context = await browser.newContext({ storageState: englishStorageState, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  const eye = page.getByRole("button", { name: "Preview area: Electronics", exact: true });
  await eye.scrollIntoViewIfNeeded();
  const box = (await eye.boundingBox())!;
  const touch = await context.newCDPSession(page);
  await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }] });
  const preview = page.locator('[data-section-preview][data-state="open"]');
  await expect(preview.getByRole("heading", { name: "Electronics", exact: true })).toBeVisible();
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(preview).toHaveCount(0);
  await page.getByRole("button", { name: "Open menu", exact: true }).tap();
  await page.getByRole("button", { name: "Open profile menu: Software Development", exact: true }).tap();
  await page.locator('header a[href="/software-development#backend"]:visible').tap();
  await expect(page.locator('[data-specialty="backend"]')).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator('#specialty-details-development').getByText(/Academlo/)).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/repair#cv");
  await page.locator("#cv").getByRole("button", { name: /^Preview CV:/ }).tap();
  const cvDialog = page.getByRole("dialog");
  for (let step = 0; step < 4; step++) await cvDialog.getByRole("button", { name: "Zoom in", exact: true }).tap();
  await expect(cvDialog.locator("output:not([data-cv-page])")).toHaveText("200%");
  await expect.poll(() => cvDialog.evaluate(el => el.getBoundingClientRect().width <= innerWidth)).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await cvDialog.getByRole("button", { name: "Close", exact: true }).tap();
  await context.close();
});

test("school links and CV catalog reflect confirmed institutions", async ({ page }) => {
  for (const [path, name, href] of [["/electronics", "Escuela Tecnológica de Occidente", "https://www.eto-edu.mx/"], ["/software-development", "Academlo", "https://www.academlo.com/"]]) {
    await page.goto(path);
    await expect(page.getByRole("link", { name: new RegExp(`View institution: ${name}`) })).toHaveAttribute("href", href);
    await expect(page.getByText(/UNISITE/)).toHaveCount(0);
  }
  await page.goto("/cv");
  await expect(page.locator("main article")).toHaveCount(7);
  await expect(page.getByText("Updated electrical CV · ES/EN", { exact: true })).toHaveCount(0);
});

test("electronics has seven training routes with only basic electronics in progress", async ({ page }) => {
  await page.goto("/electronics");
  await selectLanguage(page, "es");
  const routes = page.locator("#specialties");
  await expect(routes.locator("button[data-specialty]")).toHaveCount(7);
  await expect(routes.getByText("Próximamente", { exact: true })).toHaveCount(6);
  for (const id of ["microcontrollers", "microcomputers", "industrial-electronics"]) {
    await routes.locator(`[data-specialty="${id}"]`).click();
    await expect(page.locator("#specialty-details-electronics").getByText("Próximamente", { exact: true })).toBeVisible();
  }
  await routes.locator('[data-specialty="basic-electronics"]').click();
  await expect(page.locator("#specialty-details-electronics").getByText(/Escuela Tecnológica de Occidente/)).toBeVisible();
});

test("Culichi changes costume on all six profile pages without overflowing", async ({ page }) => {
  const outfits = new Set<string>();
  for (const [, path] of areas) {
    await page.goto(path);
    const mascot = page.locator("main [data-mascot-scene=entry]").first();
    await expect(mascot).toBeVisible();
    const outfit = (await mascot.getAttribute("data-mascot"))!;
    outfits.add(outfit);
    await expect(page.locator('header [data-mascot]')).toHaveAttribute("data-mascot", outfit);
  }
  expect(outfits.size).toBe(6);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("ETO syllabus stays inside basic electronics and expands in both languages", async ({ page }) => {
  await page.goto("/electronics#basic-electronics");
  const syllabus = page.locator("[data-electronics-syllabus]");
  await expect(syllabus.getByText("Expected completion: February.", { exact: true })).toBeVisible();
  await expect(syllabus.getByText("Applied Mathematics II", { exact: true })).not.toBeVisible();
  await syllabus.locator("summary").click();
  await expect(syllabus.locator("li")).toHaveCount(12);
  await expect(syllabus.getByText("Applied Mathematics II", { exact: true })).toBeVisible();
  await selectLanguage(page, "es");
  await expect(syllabus.getByText("Finalización prevista: febrero.", { exact: true })).toBeVisible();
  await expect(syllabus.getByText("Matemáticas Aplicadas II", { exact: true })).toBeVisible();
  await expect(syllabus.getByText(/punta lógica/)).toBeVisible();
  await syllabus.locator("summary").click();
  await expect(syllabus.getByText("Matemáticas Aplicadas II", { exact: true })).not.toBeVisible();
  await page.locator('[data-specialty="microcontrollers"]').click();
  await expect(syllabus).toHaveCount(0);
});
