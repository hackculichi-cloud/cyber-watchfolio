import { test, expect } from "@playwright/test";

test("home replaces the text experience block with a phone profile and bilingual skills page", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("link", { name: "Explore the Call Center & Customer Service profile", exact: true });
  await expect(card.getByRole("heading", { name: "Call Center & Customer Service", exact: true })).toBeVisible();
  await expect(card.locator("svg.lucide-phone-call")).toBeVisible();
  await expect(page.getByText("Professional strength", { exact: true })).toHaveCount(0);
  await expect(page.getByText("See how it transfers to tech", { exact: true })).toHaveCount(0);
  await card.click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.locator('main[data-profile="customer-service"], [data-profile="customer-service"] main')).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Call Center & Customer Service", exact: true })).toBeVisible();
  await expect(page.locator("#skills article")).toHaveCount(4);
  await expect(page.locator("#background").getByText("5+", { exact: true })).toBeVisible();
  await expect(page.locator("#background").getByText("Languages (EN / ES)", { exact: true })).toBeVisible();
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(page.getByRole("heading", { name: "Call Center y atención al cliente", exact: true })).toBeVisible();
  await expect(page.locator("#skills").getByRole("heading", { name: "Comunicación bilingüe", exact: true })).toBeVisible();
  await expect(page.locator("#skills").getByText("Escucho el problema, hago preguntas para aclararlo y guío al usuario en los siguientes pasos con comunicación clara y paciente.", { exact: true })).toBeVisible();
  const link = page.locator('header a[href="/experience"]:visible').first();
  await expect(link).toHaveAttribute("aria-label", "Call Center y atención al cliente");
  await expect(link.locator("svg.lucide-phone-call")).toBeVisible();
  await page.getByRole("button", { name: "Abrir menú de especialidades: Call Center y atención al cliente", exact: true }).click();
  await page.getByRole("dialog", { name: "Especialidades: Call Center y atención al cliente", exact: true }).locator('a[href="/experience#bilingual-support"]').click();
  await expect(page).toHaveURL(/\/experience#bilingual-support$/);
});

test("phone menu and customer-service skills remain usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const link = page.locator('header a[href="/experience"]:visible');
  await expect(link.locator("svg.lucide-phone-call")).toBeVisible();
  await link.click();
  await expect(page.getByRole("heading", { name: "Call Center & Customer Service", exact: true })).toBeVisible();
  await expect(page.locator("#skills article")).toHaveCount(4);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
