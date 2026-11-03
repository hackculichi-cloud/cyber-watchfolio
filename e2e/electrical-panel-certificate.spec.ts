import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

const originalPdf = "/certificates/linkedin-electrical-panels-drives-transformers.pdf";
const originalImage = "/certificates/linkedin-electrical-panels-drives-transformers.webp";
const originalSha256 = "841e1f0756771c054550cf2822769078a9f0f5dd60032746bccc5b8185fd4ea1";
const certificateId = "c817c182dd2d139f1c061815cdfb7589bae0a657e50ad8f5db1c2d3f4eb56c0c";

for (const lang of ["es", "en"] as const) {
  test(`the panel boards, drives and transformers original and its own syllabus are available in ${lang}`, async ({ page, request }) => {
    test.setTimeout(60000);
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    const response = await request.get(originalPdf);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const originalBytes = await response.body();
    expect(originalBytes.length).toBe(234141);
    expect(originalBytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(createHash("sha256").update(originalBytes).digest("hex")).toBe(originalSha256);

    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/electrical#certificate");
      await page.reload();
      const records = page.locator('[data-certifications="electrical"]');
      const completed = records.locator('[data-certificate="electrical-linkedin-equipment"]');
      await expect(records.locator('[data-certificate]')).toHaveCount(5);
      await expect(records.locator('[data-certificate]').first()).toHaveAttribute("data-certificate", "electrical-linkedin-equipment");
      await expect(records.locator('[data-certificate-original]')).toHaveCount(4);
      await expect(records.locator('[data-certificate-placeholder]')).toHaveCount(1);
      await expect(records.getByText(lang === "es" ? "Completado" : "Completed", { exact: true })).toHaveCount(4);
      await expect(records.getByText(lang === "es" ? "Estudiando actualmente" : "Currently Studying", { exact: true })).toHaveCount(1);
      await expect(completed).toHaveAttribute("data-certificate-record", "electrical-linkedin-equipment");
      await expect(completed.locator('[data-certificate-placeholder]')).toHaveCount(0);
      const preview = completed.locator('[data-certificate-original] img');
      await expect(preview).toHaveAttribute("src", originalImage);
      await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);
      expect((await preview.boundingBox())!.width / (await completed.boundingBox())!.width).toBeGreaterThan(.8);

      const logo = completed.locator('[data-provider-logo]');
      await expect(logo).toHaveAccessibleName(/LinkedIn Learning/);
      await expect(logo).toHaveAttribute("href", "https://www.linkedin.com/learning/");
      const color = await logo.evaluate(element => getComputedStyle(element).color);
      const [red, green, blue] = color.match(/\d+/g)!.map(Number);
      expect(blue).toBeGreaterThan(red);
      expect(blue).toBeGreaterThan(green);

      const information = completed.locator('[data-certificate-info]');
      await expect(information).not.toHaveAttribute("open", "");
      await information.locator(":scope > summary").click();
      await expect(completed).toContainText("Christian Velasco Estrada");
      await expect(completed).toContainText(certificateId);
      await expect(completed.locator("time")).toHaveAttribute("datetime", "2026-11-02");
      await expect(completed).not.toContainText(/MOCKUP|pending|pendiente/i);
      const details = completed.locator('[data-certificate-details]');
      const credits = details.getByText(lang === "es" ? "PDUs / horas de contacto" : "PDUs / contact hours", { exact: true }).locator("..");
      await expect(credits.locator("dd")).toHaveText("0.25");
      for (const label of ["Instructor", "Course duration", "Duración del curso"]) {
        await expect(details.getByText(label, { exact: true })).toHaveCount(0);
      }
      const download = completed.getByRole("link", { name: lang === "es" ? "Descargar PDF" : "Download PDF", exact: true });
      await expect(download).toHaveAttribute("href", originalPdf);
      await expect(download).toHaveAttribute("download", "");

      const syllabus = completed.locator('[data-confirmed-course-syllabus="electrical-linkedin-equipment"]');
      await expect(syllabus.locator('[data-confirmed-syllabus-section]')).toHaveCount(0);
      await syllabus.locator(":scope > summary").click();
      const sections = syllabus.locator('[data-confirmed-syllabus-section]');
      await expect(sections).toHaveCount(3);
      await expect(sections.locator(":scope > ul > li")).toHaveCount(17);
      if (lang === "en") {
        for (const heading of ["Transformers", "Panelboards and Switchboards", "Variable Frequency Drives"]) {
          await expect(sections.getByRole("heading", { name: heading, exact: false })).toBeVisible();
        }
        await expect(syllabus.getByText("Making transformer connections", { exact: true })).toBeVisible();
        await expect(syllabus.getByText("Controlling a VFD and special sensors", { exact: true })).toBeVisible();
      }
      // The earlier course retains its own screenshot-derived syllabus.
      const drawings = records.locator('[data-certificate="electrical-linkedin"]');
      await drawings.locator('[data-certificate-info] > summary').click();
      const drawingsSyllabus = drawings.locator('[data-confirmed-course-syllabus="electrical-linkedin"]');
      await drawingsSyllabus.locator(":scope > summary").click();
      await expect(drawingsSyllabus.locator('[data-confirmed-syllabus-section]')).toHaveCount(3);
      await expect(drawingsSyllabus.locator('[data-confirmed-syllabus-section] > ul > li')).toHaveCount(16);

      const opener = completed.getByRole("button", { name: new RegExp(`^${lang === "es" ? "Ampliar certificado original" : "Enlarge original certificate"}:`) });
      await opener.click({ trial: true });
      const before = (await opener.boundingBox())!;
      const scrollBefore = await page.evaluate(() => scrollY);
      await opener.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog.locator('[data-language-toggle]')).toHaveCount(0);
      const enlarged = dialog.locator('img');
      await expect(enlarged).toHaveAttribute("src", originalImage);
      await expect.poll(() => enlarged.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
      expect((await opener.boundingBox())!.y).toBeCloseTo(before.y, 0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      await page.goto("/electrical#certificate-electrical-linkedin-equipment");
      await expect(completed).toBeFocused();
      await expect(information).toHaveAttribute("open", "");
      await expect(download).toBeVisible();
    }
  });
}
