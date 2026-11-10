import { expect, test } from '@playwright/test';

for (const lang of ['en', 'es'] as const) {
  test(`the full supplied repair syllabus and actual LIDETEC seal are available in ${lang}`, async ({ page }) => {
    await page.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/repair#certifications');
    const school = page.locator('[data-repair-school]');
    await expect(school.locator('[data-lidetec-seal]')).toBeVisible();
    await expect(school.locator('image')).toHaveAttribute('href', '/certificates/lidetec-reparacion-celulares.webp');
    const curriculum = page.locator('#repair-training');
    const expand = curriculum.getByRole('button', { name: lang === 'es' ? 'Ver detalles del curso' : 'View training details', exact: true });
    await expect(curriculum.locator('[data-training-topics]')).toHaveCount(0);
    expect((await expand.boundingBox())!.y).toBeLessThan((await curriculum.locator('ol').boundingBox())!.y);
    await expand.click();
    const groups = curriculum.locator('[data-training-topics]');
    await expect(groups).toHaveCount(5);
    for (const [index, count] of [7, 9, 10, 8, 10].entries()) await expect(groups.nth(index).locator('li')).toHaveCount(count);
    await expect(curriculum).toContainText(lang === 'es' ? 'Uso de blindajes' : 'Use of shielding');
    await expect(curriculum).toContainText(lang === 'es' ? 'Conceptos de liberación por servidor' : 'Server-based unlocking concepts');
    await expect(curriculum).toContainText(lang === 'es' ? '¿Qué contiene un celular?' : 'What is inside a smartphone?');
    await expect(curriculum).not.toContainText('haz el logo');
    await expect(curriculum).not.toContainText('anade los certificados');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test(`the removed footer legends stay absent across every area in ${lang}`, async ({ page }) => {
    test.setTimeout(60000);
    await page.addInitScript(language => localStorage.setItem('portfolio-lang', language), lang);
    for (const [index, path] of ['/', '/cybersecurity', '/software-development', '/electrical', '/electronics', '/repair', '/experience', '/barbering', '/contact'].entries()) {
      await page.setViewportSize({ width: [320, 820, 1440][index % 3], height: 900 });
      await page.goto(path);
      await expect(page.getByText('Available for junior roles, internships and collaborative technical projects.', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Disponible para funciones junior, pasantías y proyectos técnicos colaborativos.', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Learning, building and solving across technology and technical trades.', { exact: true })).toHaveCount(0);
      await expect(page.getByText('Aprender, construir y resolver entre tecnología y oficios técnicos.', { exact: true })).toHaveCount(0);
      await expect(page.locator('footer [data-contact-grid] > a')).toHaveCount(4);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
