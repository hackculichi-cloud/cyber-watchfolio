import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

const pdf = "/certificates/udemy-instalaciones-electricas-basicas.pdf";
const preview = "/certificates/udemy-instalaciones-electricas-basicas.webp";
const credential = "UC-99a0711d-aef6-4471-aaf2-af4421bf0681";
const sectionNumbers = Array.from({ length: 15 }, (_, index) => String(index + 2).padStart(2, "0"));
const sectionSizes = [[7,27],[5,16],[7,23],[6,26],[13,53],[9,36],[8,42],[7,34],[10,42],[8,34],[7,22],[9,33],[6,24],[5,16],[10,23]];

for (const lang of ["es", "en"] as const) {
  test(`the completed basic installations original and partial section outline are available in ${lang}`, async ({ page, request }) => {
    await page.addInitScript(value => localStorage.setItem("portfolio-lang", value), lang);
    const response = await request.get(pdf);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const bytes = await response.body();
    expect(bytes.length).toBe(15978);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe("e8078fdf544c9f8f42a54366f1137cb54c72a947eb8e56133e2b5a6e1eeeb3dd");
    for (const width of [320,1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/electrical#certificate");
      await page.reload();
      const gallery = page.locator('[data-certifications="electrical"]');
      await expect(gallery.locator('[data-certificate]')).toHaveCount(6);
      await expect(gallery.locator('[data-certificate-original]')).toHaveCount(5);
      await expect(gallery.locator('[data-certificate-mockup]')).toHaveCount(1);
      await expect(gallery.getByText(lang === "es" ? "Completado" : "Completed", { exact: true })).toHaveCount(5);
      await expect(gallery.getByText(lang === "es" ? "Estudiando actualmente" : "Currently Studying", { exact: true })).toHaveCount(1);
      const card = gallery.locator('[data-certificate="electrical-udemy"]');
      await expect(card.locator('[data-certificate-placeholder]')).toHaveCount(0);
      const information = card.locator('[data-certificate-info]');
      await expect(information).not.toHaveAttribute("open", "");
      await information.locator(':scope > summary').click();
      await expect(card).toContainText("Christian Velasco Estrada");
      await expect(card).toContainText("Irving Lopez Hernandez");
      await expect(card).toContainText(credential);
      await expect(card.getByText(lang === "es" ? "7.5 horas" : "7.5 hours", { exact: true })).toBeVisible();
      await expect(card.locator('time')).toHaveAttribute("datetime", "2026-11-02");
      const download = card.getByRole('link', {name:lang === "es" ? "Descargar PDF" : "Download PDF",exact:true});
      await expect(download).toHaveAttribute('href',pdf);
      await expect(download).toHaveAttribute('download',"");
      await expect(card.getByRole('link',{name:lang === "es" ? "Ver certificado en Udemy" : "View Udemy credential",exact:true})).toHaveAttribute('href',`https://ude.my/${credential}`);
      const syllabus = card.locator('[data-confirmed-course-syllabus="electrical-udemy"]');
      await expect(syllabus.locator('[data-confirmed-syllabus-section]')).toHaveCount(0);
      await syllabus.locator(':scope > summary').click();
      await expect(syllabus).toContainText(lang === "es" ? "Temario parcial" : "Partial syllabus");
      await expect(syllabus.locator('[data-syllabus-number]')).toHaveText(sectionNumbers);
      const sections = syllabus.locator('[data-confirmed-syllabus-section]');
      await expect(sections).toHaveCount(15);
      for (let index=0;index<sectionSizes.length;index++) {
        const [lessons,minutes] = sectionSizes[index];
        await expect(sections.nth(index).locator('[data-syllabus-summary]')).toHaveText(`${lessons} ${lang === "es" ? "clases" : "lessons"} · ${minutes} min`);
      }
      await expect(sections.locator('ul')).toHaveCount(0);
      const opener = card.locator('[data-certificate-original] button');
      await opener.click({trial:true});
      const scrollBefore = await page.evaluate(()=>scrollY);
      await opener.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog.locator('[data-language-toggle]')).toHaveCount(0);
      await expect(dialog.locator('img')).toHaveAttribute('src',preview);
      await expect.poll(()=>dialog.locator('img').evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth)).toBe(1600);
      await page.keyboard.press('Escape');
      await expect(opener).toBeFocused();
      expect(await page.evaluate(()=>scrollY)).toBeCloseTo(scrollBefore,0);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await page.goto('/electrical#certificate-electrical-udemy');
      await expect(card).toBeFocused();
      await expect(information).toHaveAttribute('open',"");
    }
  });
}
