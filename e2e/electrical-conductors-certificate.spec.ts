import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

const pdf = "/certificates/udemy-calculo-seleccion-conductores.pdf";
const preview = "/certificates/udemy-calculo-seleccion-conductores.webp";
const credential = "UC-710efac5-b526-4e8e-a83d-b6d15ac64306";
const sectionNumbers = Array.from({ length: 10 }, (_, index) => String(index + 2).padStart(2, "0"));
const sectionSizes = [[9,34],[7,22],[9,33],[6,16],[9,42],[5,18],[9,21],[9,41],[11,36],[4,40]];

for (const lang of ["es", "en"] as const) {
  test(`the conductor certificate preserves its original and supplied partial syllabus in ${lang}`, async ({ page, request }) => {
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    const response = await request.get(pdf);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const bytes = await response.body();
    expect(bytes.length).toBe(16198);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe("011f410b4d5139f5745f2ee9d3eb66511bda75ba171496eb1c79635a3cf8d88e");
    for (const width of [320,1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/electrical#certificate");
      await page.reload();
      const gallery = page.locator('[data-certifications="electrical"]');
      const cards = gallery.locator('[data-certificate]');
      await expect(cards).toHaveCount(6);
      await expect(gallery.locator('[data-certificate-original]')).toHaveCount(5);
      await expect(gallery.locator('[data-certificate-mockup]')).toHaveCount(1);
      await expect(gallery.getByText(lang === "es" ? "Completado" : "Completed", { exact: true })).toHaveCount(5);
      await expect(gallery.getByText(lang === "es" ? "Estudiando actualmente" : "Currently Studying", { exact: true })).toHaveCount(1);
      const positions = await cards.evaluateAll(elements => elements.map(element => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: Math.round(rect.top) };
      }));
      expect(new Set(positions.map(position => position.y)).size).toBe(width >= 768 ? 3 : 6);
      for (const y of new Set(positions.map(position => position.y))) {
        const row = positions.filter(position => position.y === y);
        expect(Math.abs((row[0].x + row.at(-1)!.x) / 2 - width / 2)).toBeLessThan(2);
      }
      const card = gallery.locator('[data-certificate="electrical-conductors"]');
      await expect(card.locator('[data-certificate-placeholder]')).toHaveCount(0);
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(lang === "es" ? "Electricidad: cálculo y selección de conductores eléctricos" : "Electrical Conductor Calculations and Selection");
      const image = card.locator('[data-certificate-original] img');
      const imageBounds = (await image.boundingBox())!;
      expect(imageBounds.width / (await card.boundingBox())!.width).toBeGreaterThan(.8);
      expect(imageBounds.height).toBeGreaterThan(120);
      await expect(image).toHaveCSS('max-height', 'none');
      const information = card.locator('[data-certificate-info]');
      await expect(information).not.toHaveAttribute("open", "");
      await information.locator(':scope > summary').click();
      await expect(card).toContainText("Christian Velasco Estrada");
      await expect(card).toContainText("Irving Lopez Hernandez");
      await expect(card).toContainText(credential);
      await expect(card.getByText(lang === "es" ? "5 horas" : "5 hours", { exact: true })).toBeVisible();
      await expect(card.locator('time')).toHaveAttribute("datetime", "2026-11-05");
      const download = card.getByRole('link', { name: lang === "es" ? "Descargar PDF" : "Download PDF", exact: true });
      await expect(download).toHaveAttribute('href', pdf);
      await expect(download).toHaveAttribute('download', "");
      await expect(card.getByRole('link', { name: lang === "es" ? "Ver certificado en Udemy" : "View Udemy credential", exact: true })).toHaveAttribute('href', `https://ude.my/${credential}`);
      const syllabus = card.locator('[data-confirmed-course-syllabus="electrical-conductors"]');
      await expect(syllabus.locator('[data-confirmed-syllabus-section]')).toHaveCount(0);
      await syllabus.locator(':scope > summary').click();
      await expect(syllabus).toContainText(lang === "es" ? "Temario parcial" : "Partial syllabus");
      await expect(syllabus.locator('[data-syllabus-number]')).toHaveText(sectionNumbers);
      const sections = syllabus.locator('[data-confirmed-syllabus-section]');
      await expect(sections).toHaveCount(10);
      for (let index = 0; index < sectionSizes.length; index++) {
        const [lessons, minutes] = sectionSizes[index];
        await expect(sections.nth(index).locator('[data-syllabus-summary]')).toHaveText(`${lessons} ${lang === "es" ? "clases" : "lessons"} · ${minutes} min`);
      }
      await expect(sections.locator('ul')).toHaveCount(0);
      const opener = card.locator('[data-certificate-original] button');
      await opener.click({ trial: true });
      const scrollBefore = await page.evaluate(() => scrollY);
      await opener.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.locator('[data-language-toggle]')).toHaveCount(0);
      await expect(dialog.locator('img')).toHaveAttribute('src', preview);
      await expect.poll(() => dialog.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth)).toBe(1600);
      await page.keyboard.press('Escape');
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.goto('/electrical#certificate-electrical-conductors');
      await expect(card).toBeFocused();
      await expect(information).toHaveAttribute('open', "");
    }
  });
}
