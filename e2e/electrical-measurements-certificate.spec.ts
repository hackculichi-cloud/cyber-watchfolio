import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";

const certificateId = "UC-25442727-a627-4cdc-894e-d93da3bba021";
const verification = `https://www.udemy.com/certificate/${certificateId}/`;
const originalPdf = "/certificates/udemy-mediciones-electricas.pdf";
const originalSha256 = "92e509b9be513a988e374643ca3d8c11d41217fb865a7ad667b0283e06bef0d7";

for (const lang of ["es", "en"] as const) {
  test(`the completed measurements credential and supplied syllabus stay distinct from ongoing training in ${lang}`, async ({ page, request }) => {
    test.setTimeout(60000);
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/electrical#certificate");
      // Returning to the same hash retains native detail state; each viewport
      // starts with a fresh document to verify the initially collapsed syllabus.
      await page.reload();
      const records = page.locator('[data-certifications="electrical"]');
      const completed = records.locator('[data-certificate="electrical-measurements"]');
      await expect(completed).toHaveAttribute("data-certificate-record", "electrical-measurements");
      await expect(completed.getByText(lang === "es" ? "Completado" : "Completed", { exact: true })).toBeVisible();
      await expect(completed).toContainText("Christian Velasco Estrada");
      await expect(completed).toContainText("Irving Lopez Hernandez");
      await expect(completed).toContainText(certificateId);
      await expect(completed.getByText(lang === "es" ? "2 horas" : "2 hours", { exact: true })).toBeVisible();
      await expect(completed.locator("time")).toHaveAttribute("datetime", "2026-10-30");
      const official = completed.getByRole("link", { name: lang === "es" ? "Ver certificado en Udemy" : "View Udemy credential", exact: true });
      await expect(official).toHaveAttribute("href", verification);
      await expect(official).toHaveAttribute("rel", "noopener noreferrer");
      await expect(completed.locator("[data-certificate-mockup], [data-certificate-placeholder]")).toHaveCount(0);
      await expect(records.locator("[data-certificate-mockup]")).toHaveCount(3);
      await expect(records.locator('[data-certificate-original="electrical-measurements"]')).toHaveCount(1);
      const pdf = completed.getByRole("link", { name: lang === "es" ? "Descargar PDF" : "Download PDF", exact: true });
      await expect(pdf).toHaveAttribute("href", originalPdf);
      await expect(pdf).toHaveAttribute("download", "");
      const response = await request.get(originalPdf);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("application/pdf");
      const originalBytes = await response.body();
      expect(originalBytes.length).toBe(15832);
      expect(originalBytes.subarray(0, 5).toString()).toBe("%PDF-");
      expect(createHash("sha256").update(originalBytes).digest("hex")).toBe(originalSha256);

      const preview = completed.locator('[data-certificate-original] img');
      await preview.scrollIntoViewIfNeeded();
      await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);
      const opener = completed.getByRole("button", { name: new RegExp(`^${lang === "es" ? "Ampliar certificado original" : "Enlarge original certificate"}:`) });
      const before = (await opener.boundingBox())!;
      const scrollBefore = await page.evaluate(() => scrollY);
      await opener.click();
      const dialog = page.getByRole("dialog");
      const enlarged = dialog.locator('img:not([data-language-flag])');
      await expect(enlarged).toHaveAttribute("src", "/certificates/udemy-mediciones-electricas.webp");
      await expect.poll(() => enlarged.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
      expect((await opener.boundingBox())!.y).toBeCloseTo(before.y, 0);

      const primary = records.locator('[data-certificate="electrical-conocer"]');
      await expect(primary).toContainText("Universidad Internacional · RED CONOCER");
      await expect(primary.locator('[data-training-role="main"]')).toBeVisible();
      await expect(primary.getByText(lang === "es" ? "Estudiando actualmente" : "Currently Studying", { exact: true })).toBeVisible();
      const basicInstallations = records.locator('[data-certificate="electrical-udemy"]');
      await expect(basicInstallations.getByText(lang === "es" ? "Estudiando actualmente" : "Currently Studying", { exact: true })).toBeVisible();
      await expect(basicInstallations.locator("time")).toHaveCount(0);

      const syllabus = completed.locator('[data-confirmed-course-syllabus="electrical-udemy-measurements"]');
      await expect(syllabus.locator("[data-confirmed-syllabus-section]")).toHaveCount(0);
      await syllabus.locator("summary").click();
      await expect(syllabus.locator("[data-confirmed-syllabus-section]")).toHaveCount(4);
      await expect(syllabus).toContainText(lang === "es" ? "El listado es parcial" : "This list is partial");
      await expect(syllabus).toContainText(lang === "es" ? "Exactitud y precisión" : "Instrument accuracy and precision");
      await expect(syllabus).toContainText(lang === "es" ? "Categorías CAT de medición" : "CAT measurement categories");
      const objectives = completed.locator('[data-course-objectives="electrical-udemy-measurements"]');
      await objectives.locator("summary").click();
      await expect(objectives.locator("li")).toHaveCount(10);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
