import { test, expect } from "@playwright/test";

test("three confirmed repairs have bilingual facts without unrelated evidence", async ({ page }) => {
  await page.goto("/repair#smartphones");
  const section = page.locator("#smartphones");
  await expect(section.getByRole("heading", { name: "iPhone 12 Pro", exact: true })).toBeVisible();
  await expect(section.getByRole("heading", { name: "iPhone XR", exact: true })).toBeVisible();
  const iphone14 = section.locator("article").filter({ has: page.getByRole("heading", { name: "iPhone 14 Pro", exact: true }) });
  await expect(iphone14.getByText("Aftermarket self-programming battery", { exact: true })).toBeVisible();
  await expect(iphone14.getByText("Face ID", { exact: true })).toBeVisible();
  await expect(section.getByText(/100%|status Original/)).toHaveCount(0);
  await expect(section.getByText("Certificate photo pending upload", { exact: true })).toBeVisible();
  await expect(section.getByRole("button", { name: "View certificate", exact: true })).toHaveCount(0);
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(iphone14.getByText("Batería aftermarket autoprogramable", { exact: true })).toBeVisible();
  await expect(iphone14.getByText(/comprobaciones finales enumeradas/)).toBeVisible();
  const xr = section.locator("article").filter({ has: page.getByRole("heading", { name: "iPhone XR", exact: true }) });
  await expect(xr.getByText("Cambio de pantalla realizado por el titular del portafolio", { exact: true })).toBeVisible();

  for (const [model, count] of [["iPhone 12 Pro", 9], ["iPhone 14 Pro", 5], ["iPhone XR", 2]] as const) {
    const card = section.locator("article").filter({ has: page.getByRole("heading", { name: model, exact: true }) });
    await expect(card.locator("img")).toHaveCount(0);
    const toggle = card.getByRole("button", { name: `Ver fotografías: ${model}`, exact: true });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(card.locator("figure")).toHaveCount(count);
    await card.getByRole("button", { name: `Ocultar fotografías: ${model}`, exact: true }).click();
    await expect(card.locator("img")).toHaveCount(0);
  }
  await xr.getByRole("button", { name: "Ver fotografías: iPhone XR", exact: true }).click();
  await xr.getByRole("button", { name: /^Abrir vista ampliada:/ }).first().click();
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", "/images/repair/repair-photo-09.jpg");
  await page.keyboard.press("Escape");

  const gallery = page.locator("#gallery");
  await expect(gallery.locator("img")).toHaveCount(0);
  const expand = gallery.getByRole("button", { name: "Ver fotografías: Fotos del taller", exact: true });
  await expand.focus();
  await page.keyboard.press("Enter");
  await expect(gallery.locator("figure")).toHaveCount(18);
  await gallery.getByRole("button", { name: /^Abrir vista ampliada:/ }).first().click();
  const dialog = page.getByRole("dialog");
  for (let index = 1; index <= 18; index++) {
    const img = dialog.locator("img");
    await expect(img).toHaveAttribute("src", `/images/repair/repair-photo-${String(index).padStart(2, "0")}.jpg`);
    await expect.poll(() => img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
    await expect(dialog.getByRole("status")).toHaveText(`Foto ${index} de 18`);
    if (index < 18) await dialog.getByRole("button", { name: "Foto siguiente", exact: true }).click();
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("repair section remains usable on mobile without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/repair#smartphones");
  await expect(page.getByRole("heading", { name: "iPhone 14 Pro", exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("electrical evidence loads only when requested and can be hidden again", async ({ page }) => {
  await page.goto("/electrical#evidence");
  const evidence = page.locator("#evidence");
  await expect(evidence.locator("img")).toHaveCount(0);
  const toggle = evidence.getByRole("button", { name: /^View photos:/ });
  await toggle.focus();
  await page.keyboard.press("Space");
  await expect(evidence.locator("img").first()).toBeVisible();
  await evidence.getByRole("button", { name: /^Open larger preview:/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await evidence.getByRole("button", { name: /^Hide photos:/ }).click();
  await expect(evidence.locator("img")).toHaveCount(0);
});
