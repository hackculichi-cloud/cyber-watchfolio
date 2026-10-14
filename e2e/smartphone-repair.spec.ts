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
  await section.getByRole("button", { name: "View certificate", exact: true }).last().click();
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", "/images/repair/cert-lidetec.jpg");
  await expect(page.getByRole("dialog").locator("img")).toHaveJSProperty("naturalWidth", 1600);
  await page.keyboard.press("Escape");
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(iphone14.getByText("Batería aftermarket autoprogramable", { exact: true })).toBeVisible();
  await expect(iphone14.getByText(/comprobaciones finales enumeradas/)).toBeVisible();
  const xr = section.locator("article").filter({ has: page.getByRole("heading", { name: "iPhone XR", exact: true }) });
  await expect(xr.getByText("Cambio de pantalla realizado por el titular del portafolio", { exact: true })).toBeVisible();

  for (const [model, count] of [["iPhone 12 Pro", 9], ["iPhone 14 Pro", 5], ["iPhone XR", 2]] as const) {
    const card = section.locator("article").filter({ has: page.getByRole("heading", { name: model, exact: true }) });
    await expect(card.locator("figure")).toHaveCount(count);
    await expect(card.getByRole("button", { name: /^Ver fotografías:/ })).toHaveCount(0);
    const width = await card.locator("figure").first().evaluate(node => node.getBoundingClientRect().width);
    expect(width).toBeLessThan(280);
  }
  await xr.getByRole("button", { name: /^Abrir vista ampliada:/ }).first().click();
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("src", "/images/repair/repair-photo-09.jpg");
  await page.keyboard.press("Escape");

  const gallery = page.locator("#gallery");
  await expect(gallery.locator("img")).toHaveCount(1);
  const expand = gallery.getByRole("button", { name: "Ver más fotografías: Fotos del taller", exact: true });
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
  await gallery.getByRole("button", { name: "Mostrar menos fotografías: Fotos del taller", exact: true }).click();
  await expect(gallery.locator("img")).toHaveCount(1);
});

test("repair section remains usable on mobile without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/repair#smartphones");
  await expect(page.getByRole("heading", { name: "iPhone 14 Pro", exact: true })).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("electrical evidence shows one preview and expands only when requested", async ({ page }) => {
  await page.goto("/electrical#evidence");
  const evidence = page.locator("#evidence");
  await expect(evidence.locator("img")).toHaveCount(1);
  const toggle = evidence.getByRole("button", { name: /^View more photos:/ });
  await toggle.focus();
  await page.keyboard.press("Space");
  expect(await evidence.locator("img").count()).toBeGreaterThan(1);
  await expect(evidence.locator("img").first()).toBeVisible();
  await evidence.getByRole("button", { name: /^Open larger preview:/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await evidence.getByRole("button", { name: /^Show fewer photos:/ }).click();
  await expect(evidence.locator("img")).toHaveCount(1);
});

test("LIDETEC syllabus expands in both languages and training skills remain distinct from repair cases", async ({ page }) => {
  await page.goto("/repair#smartphones");
  const curriculum = page.locator("#repair-training");
  await expect(curriculum).not.toHaveAttribute("open", "");
  await curriculum.locator("summary").click();
  await expect(curriculum.locator("ol > li")).toHaveCount(5);
  await curriculum.getByRole("button", { name: "View training details", exact: true }).click();
  await expect(curriculum.getByText("Multimeter use: speakers, earpieces, buzzers and batteries", { exact: true })).toBeVisible();
  await expect(curriculum.getByText("UnlockTool setup and software servicing (coursework)", { exact: true })).toBeVisible();
  await page.locator('button[lang="es"]:visible').first().click();
  await expect(curriculum.locator("summary")).toHaveText("Temario del curso");
  await expect(curriculum.getByText("Uso del multímetro: bocinas, auriculares, buzzer y baterías", { exact: true })).toBeVisible();
  await expect(curriculum.getByText("Introducción a la microsoldadura", { exact: true })).toBeVisible();
  await expect(page.locator("#repair-training-skills").getByText("UnlockTool (formación)", { exact: true })).toBeVisible();
  await curriculum.getByRole("button", { name: "Ocultar detalles del curso", exact: true }).click();
  await expect(curriculum.getByText("Uso del multímetro: bocinas, auriculares, buzzer y baterías", { exact: true })).not.toBeVisible();
});
