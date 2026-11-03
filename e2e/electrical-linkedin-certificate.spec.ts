import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

const originalPdf = "/certificates/linkedin-electrical-drawings-schematics.pdf";
const originalImage = "/certificates/linkedin-electrical-drawings-schematics.webp";
const originalSha256 = "334bd812e07b3a8f52825aa227075a54c3782fb785d8471739f8860e9b541c66";
const certificateId = "7f0b6b08ee714835933ca230548a28ca29db50bff8e0fb9ae0f7b6614018df29";
const visibleLessons = [
  "Symbols", "Plot and plan views", "One-line diagrams", "Electrical details", "Electrical schedules",
  "Riser diagrams and elevations", "Wiring diagrams", "Schematics symbols", "Machine and motor wiring diagrams",
  "Components of a ladder diagram", "How ladder logic works", "A more complex diagram",
  "Programmable logic controllers (PLCs)", "Next steps",
];

for (const lang of ["es", "en"] as const) {
  test(`the supplied LinkedIn certificate, credits and visible course topics are available in ${lang}`, async ({ page, request }) => {
    test.setTimeout(60000);
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    const response = await request.get(originalPdf);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const originalBytes = await response.body();
    expect(originalBytes.length).toBe(234838);
    expect(originalBytes.subarray(0, 5).toString()).toBe("%PDF-");
    expect(createHash("sha256").update(originalBytes).digest("hex")).toBe(originalSha256);

    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/electrical#certificate");
      await page.reload();
      const records = page.locator('[data-certifications="electrical"]');
      const completed = records.locator('[data-certificate="electrical-linkedin"]');
      await expect(records.locator('[data-certificate]')).toHaveCount(5);
      await expect(records.locator('[data-certificate]').first()).toHaveAttribute("data-certificate", "electrical-linkedin-equipment");
      await expect(records.locator('[data-certificate-original]')).toHaveCount(4);
      await expect(records.locator('[data-certificate-placeholder]')).toHaveCount(1);
      await expect(records.getByText(lang === "es" ? "Completado" : "Completed", { exact: true })).toHaveCount(4);
      await expect(records.getByText(lang === "es" ? "Estudiando actualmente" : "Currently Studying", { exact: true })).toHaveCount(1);
      await expect(completed).toHaveAttribute("data-certificate-record", "electrical-linkedin");
      await expect(completed.locator('[data-certificate-mockup], [data-certificate-placeholder]')).toHaveCount(0);
      const cardBounds = (await completed.boundingBox())!;
      const preview = completed.locator('[data-certificate-original] img');
      await expect(preview).toHaveAttribute("src", originalImage);
      expect((await preview.boundingBox())!.width / cardBounds.width).toBeGreaterThan(.8);
      await expect.poll(() => preview.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);

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
      await expect(completed.locator("time")).toHaveAttribute("datetime", "2026-10-30");
      await expect(completed).not.toContainText(/MOCKUP|pending|pendiente/i);
      const details = completed.locator('[data-certificate-details]');
      const credits = details.getByText(lang === "es" ? "PDUs / horas de contacto" : "PDUs / contact hours", { exact: true }).locator("..");
      await expect(credits.locator("dd")).toHaveText("0.75");
      // The document names a signatory and credits, not an instructor or a course duration.
      for (const label of ["Instructor", "Course duration", "Duración del curso"]) {
        await expect(details.getByText(label, { exact: true })).toHaveCount(0);
      }
      const download = completed.getByRole("link", { name: lang === "es" ? "Descargar PDF" : "Download PDF", exact: true });
      await expect(download).toHaveAttribute("href", originalPdf);
      await expect(download).toHaveAttribute("download", "");

      const syllabus = completed.locator('[data-confirmed-course-syllabus="electrical-linkedin"]');
      await expect(syllabus.locator('[data-confirmed-syllabus-section]')).toHaveCount(0);
      await syllabus.locator(":scope > summary").click();
      const sections = syllabus.locator('[data-confirmed-syllabus-section]');
      await expect(sections).toHaveCount(3);
      await expect(sections.locator(":scope > ul > li")).toHaveCount(16);
      await expect(syllabus.getByText(lang === "es" ? "Cuestionario del capítulo (7 preguntas)" : "Chapter Quiz (7 questions)", { exact: true })).toHaveCount(2);
      await expect(syllabus).toContainText(lang === "es" ? "Controladores lógicos programables (PLC)" : "Programmable logic controllers (PLCs)");
      if (lang === "en") {
        for (const lesson of visibleLessons) await expect(syllabus.getByText(lesson, { exact: true })).toBeVisible();
      }

      const opener = completed.getByRole("button", { name: new RegExp(`^${lang === "es" ? "Ampliar certificado original" : "Enlarge original certificate"}:`) });
      await opener.click({ trial: true });
      const before = (await opener.boundingBox())!;
      const scrollBefore = await page.evaluate(() => scrollY);
      await opener.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog.locator("[data-language-toggle]")).toHaveCount(0);
      const enlarged = dialog.locator('img:not([data-language-flag])');
      await expect(enlarged).toHaveAttribute("src", originalImage);
      await expect.poll(() => enlarged.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
      expect((await opener.boundingBox())!.y).toBeCloseTo(before.y, 0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      await page.goto("/electrical#certificate-electrical-linkedin");
      await expect(completed).toBeFocused();
      await expect(information).toHaveAttribute("open", "");
      await expect(download).toBeVisible();
    }
  });
}
