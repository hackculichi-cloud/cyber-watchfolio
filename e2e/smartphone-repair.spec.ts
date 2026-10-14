import { test, expect } from "@playwright/test";

test("smartphone training and separate repair cases show bilingual facts and local evidence", async ({ page }) => {
  await page.goto("/repair#smartphones");
  const section = page.locator("#smartphones");
  await expect(section.getByText("Aftermarket self-programming battery", { exact: true })).toBeVisible();
  const iphone14 = section.locator("article").filter({ has: page.getByRole("heading", { name: "iPhone 14 Pro", exact: true }) });
  await expect(iphone14.getByText("Face ID", { exact: true })).toBeVisible();
  await expect(iphone14.getByText(/100%|status Original/)).toHaveCount(0);
  await section.getByRole("button", { name: "View certificate", exact: true }).last().click();
  let dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveJSProperty("naturalWidth", 1600);
  await page.keyboard.press("Escape");
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(iphone14.getByText("Batería aftermarket autoprogramable", { exact: true })).toBeVisible();
  await expect(iphone14.getByText("Encendido", { exact: true })).toBeVisible();
  await expect(iphone14.getByText(/comprobaciones finales enumeradas/)).toBeVisible();
  await section.getByRole("button", { name: "Ampliar fotografía del proceso", exact: true }).click();
  dialog = page.getByRole("dialog");
  await expect(dialog.locator("img")).toHaveJSProperty("naturalWidth", 900);
  await expect(dialog.getByRole("heading")).toHaveText("Durante: dispositivo abierto, batería y placa lógica expuestas");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.locator('#gallery button').first().click();
  dialog = page.getByRole("dialog");
  await expect(dialog.locator("img")).toHaveJSProperty("naturalWidth", 900);
  await dialog.getByRole("button", { name: "Foto siguiente", exact: true }).click();
  await expect(dialog.getByRole("status")).toHaveText("Foto 2 de 3");
  await page.keyboard.press("Escape");
});

test("repair section remains usable on mobile without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/repair#smartphones");
  await expect(page.getByRole("heading", { name: "iPhone 14 Pro", exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
