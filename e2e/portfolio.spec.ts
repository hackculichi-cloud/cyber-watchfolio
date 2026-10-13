import { test, expect } from "@playwright/test";

const selectLanguage = async (page: import("@playwright/test").Page, lang: "en" | "es") => {
  const root = await page.getByRole("dialog").count() ? page.getByRole("dialog").last() : page;
  await root.locator(`button[lang="${lang}"]:visible`).first().click();
  await expect(page.locator("html")).toHaveAttribute("lang", lang);
};

test("language switches while a SOC investigation is open, preserving React updates", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/cybersecurity");
  await page.locator("#investigations button").first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "VPN Unauthorized Access Attempt", exact: true })).toBeVisible();
  await expect(dialog.getByText("Educational exercise", { exact: false })).toBeVisible();
  await selectLanguage(page, "es");
  await expect(dialog.getByRole("heading", { name: "Intento de acceso no autorizado por VPN", exact: true })).toBeVisible();
  await expect(dialog.getByText("12 fallos de autenticación VPN para j.perez desde 203.0.113.44", { exact: true })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Cerrar", exact: true })).toBeVisible();
  await selectLanguage(page, "en");
  await expect(dialog.getByRole("heading", { name: "VPN Unauthorized Access Attempt", exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Close", exact: true }).click();
  await page.locator("#investigations button").nth(1).click();
  await expect(dialog.getByRole("heading", { name: "RDP Brute Force Attack Detected", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("all SOC cases and playbooks have translated details", async ({ page }) => {
  await page.goto("/cybersecurity");
  await selectLanguage(page, "es");
  for (const section of ["investigations", "playbooks"]) {
    const buttons = page.locator(`#${section} button`);
    expect(await buttons.count()).toBe(3);
    for (let index = 0;index < 3;index++) {
      await buttons.nth(index).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      if (section === "investigations") await expect(dialog.getByText("Ejercicio educativo · LetsDefend", { exact: true })).toBeVisible();
      await expect(dialog.getByRole("heading", { name: /pasos_de_investigación|procedimiento_de_investigación/ })).toBeVisible();
      await expect(dialog.getByRole("columnheader", { name: "Táctica", exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
    }
  }
});

test("electrical project photos enlarge and navigate with keyboard", async ({ page }) => {
  await page.goto("/electrical");
  await selectLanguage(page, "es");
  await page.locator("#projects").getByRole("button", { name: "Ver proyecto", exact: true }).nth(1).click();
  const details = page.getByRole("dialog").first();
  await details.getByRole("button", { name: /^Abrir vista ampliada:/ }).first().click();
  const viewer = page.getByRole("dialog").last();
  await expect(viewer.getByRole("status")).toHaveText("Foto 1 de 4");
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByRole("status")).toHaveText("Foto 2 de 4");
  expect(await viewer.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(page.locator('[role="dialog"]')).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.locator('[role="dialog"]')).toHaveCount(0);
});

test("confirmed electrical course states and future practice are honest", async ({ page }) => {
  await page.goto("/electrical");
  const tracks = page.locator("#tracks");
  await expect(tracks.getByText("Completed through RED CONOCER", { exact: false })).toHaveCount(0);
  await expect(tracks.getByText("Currently Studying", { exact: true })).toHaveCount(3);
  await expect(tracks.getByText("Electrical Systems: Reading Drawings and Schematics", { exact: true })).toBeVisible();
  const card = page.locator("#projects article").filter({ hasText: "Electrical Control — START/STOP Contactor Practice" });
  await expect(card.getByText("Planned", { exact: true })).toBeVisible();
});

for (const width of [375, 768, 1440]) {
  test(`routes fit the viewport at ${width}px and keep language preference`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width < 640) await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await selectLanguage(page, "es");
    if (width < 640) await page.getByRole("button", { name: "Cerrar menú", exact: true }).click();
    for (const route of ["/", "/about", "/cybersecurity", "/electrical", "/cv", "/contact"]) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.locator("main h1")).toBeVisible();
      if (width === 1440) await expect(page.locator('header a[aria-label="Ciberseguridad"] svg[aria-hidden="true"]')).toHaveClass(/lucide-shield/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://culichi.lat${route}`);
    }
  });
}

test("encoded and invalid CSS hashes do not crash navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/electrical#%5B");
  await expect(page.locator("main h1")).toBeVisible();
  expect(errors).toEqual([]);
});

test("React Router navigation, hashes and browser history preserve language", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.locator('header a[aria-label="About"]').click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("main h1")).toBeVisible();
  await page.locator('header a[aria-label="Cybersecurity"]').click();
  await expect(page).toHaveURL(/\/cybersecurity$/);
  await page.getByRole("navigation", { name: "Profile sections" }).getByRole("link", { name: "Playbooks", exact: true }).click();
  await expect(page).toHaveURL(/\/cybersecurity#playbooks$/);
  await selectLanguage(page, "es");
  await page.locator('header a[aria-label="Sobre mí"]').click();
  await expect(page).toHaveURL(/\/about$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/cybersecurity#playbooks$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("#playbooks h2")).toBeVisible();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("#playbooks h2")).toBeVisible();
  expect(errors).toEqual([]);
});
