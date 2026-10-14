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

  const gallery = page.locator("#gallery");
  await expect(gallery.locator("figure")).toHaveCount(18);
  await gallery.locator("button").first().click();
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
